from fastapi import FastAPI, APIRouter, Query, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import certifi


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with error handling and SSL certificates
try:
    mongo_url = os.environ.get('MONGO_URL') or os.getenv('MONGO_URL')
    db_name = os.environ.get('DB_NAME') or os.getenv('DB_NAME', 'ygo_legacy_db')
    
    if not mongo_url:
        raise ValueError("MONGO_URL environment variable is not set")
    
    print(f"Connecting to MongoDB: {mongo_url[:50]}...")  # Log first 50 chars for debugging
    
    # Create MongoDB client with SSL certificate verification
    client = AsyncIOMotorClient(
        mongo_url,
        tlsCAFile=certifi.where(),  # Use certifi for SSL certificates
        serverSelectionTimeoutMS=10000  # 10 second timeout
    )
    
    db = client[db_name]
    print(f"MongoDB client created for database: {db_name}")
except Exception as e:
    print(f"ERROR: Failed to initialize MongoDB connection: {e}")
    raise

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Card(BaseModel):
    name: str
    quantity: int
    card_type: Optional[str] = None

class Decklist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_name: str
    deck_name: str
    event: str
    main_deck: List[Card] = []
    extra_deck: List[Card] = []
    side_deck: List[Card] = []
    raw_decklist: Optional[str] = None

class CardUsage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    player_name: str
    deck_name: str
    event: str
    card_name: str
    card_type: str
    quantity: int
    main_extra: str
    card_id: Optional[str] = None
    deck_key: str

class FilterResponse(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    items: List[Dict[str, Any]]

class StatsResponse(BaseModel):
    total_decks: int
    total_events: int
    total_players: int
    deck_types: List[Dict]
    popular_cards: List[Dict]
    events: List[str]
    most_successful_decks: List[Dict]
    card_type_distribution: Dict[str, int]

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Yu-Gi-Oh SJC Decklist Database API"}

# Get all unique deck types for filtering
@api_router.get("/deck-types")
async def get_deck_types():
    deck_types = await db.decklists.distinct("deck_name")
    return {"deck_types": sorted([dt for dt in deck_types if dt])}

# Get all unique events for filtering
@api_router.get("/events")
async def get_events():
    events = await db.decklists.distinct("event")
    # Sort by year (extracted from event name) then alphabetically
    def sort_key(event):
        # Extract year from event name (e.g., "SJC Anaheim 2004" -> 2004)
        parts = event.split()
        year = next((int(p) for p in parts if p.isdigit() and len(p) == 4), 9999)
        return (year, event)
    
    sorted_events = sorted([e for e in events if e], key=sort_key)
    return {"events": sorted_events}

# Get all unique players for filtering
@api_router.get("/players")
async def get_players():
    players = await db.decklists.distinct("player_name")
    return {"players": sorted([p for p in players if p])}

# Advanced filtering endpoint for decklists
@api_router.get("/decklists", response_model=FilterResponse)
async def get_decklists(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    player_name: Optional[str] = None,
    deck_types: Optional[str] = Query(None, description="Comma-separated deck types"),
    events: Optional[str] = Query(None, description="Comma-separated events"),
    card_name: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: str = Query("player_name", regex="^(player_name|deck_name|event)$"),
    sort_order: str = Query("asc", regex="^(asc|desc)$")
):
    # Build filter query
    query = {}
    
    if player_name:
        query["player_name"] = {"$regex": player_name, "$options": "i"}
    
    if deck_types:
        deck_type_list = [dt.strip() for dt in deck_types.split(",")]
        query["deck_name"] = {"$in": deck_type_list}
    
    if events:
        event_list = [e.strip() for e in events.split(",")]
        query["event"] = {"$in": event_list}
    
    if card_name:
        # Search in card usage collection and get unique deck keys directly
        # Using distinct() is more efficient than loading all records and deduplicating in Python
        deck_keys = await db.card_usage.distinct(
            "deck_key",
            {"card_name": {"$regex": card_name, "$options": "i"}}
        )
        
        if deck_keys:
            # deck_key format is "player_name-deck_name | event"
            # Match against the same format in decklists
            query["$or"] = [
                {"$expr": {"$in": [{"$concat": ["$player_name", "-", "$deck_name", " | ", "$event"]}, deck_keys]}}
            ]
    
    if search:
        query["$or"] = [
            {"player_name": {"$regex": search, "$options": "i"}},
            {"deck_name": {"$regex": search, "$options": "i"}},
            {"event": {"$regex": search, "$options": "i"}}
        ]
    
    # Get total count
    total = await db.decklists.count_documents(query)
    
    # Calculate pagination
    skip = (page - 1) * page_size
    total_pages = (total + page_size - 1) // page_size
    
    # Sort order
    sort_direction = 1 if sort_order == "asc" else -1
    
    # Fetch paginated results
    items = await db.decklists.find(query, {"_id": 0}).sort(
        sort_by, sort_direction
    ).skip(skip).limit(page_size).to_list(page_size)
    
    return FilterResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        items=items
    )

# Get single decklist by ID
@api_router.get("/decklists/{deck_id}")
async def get_decklist(deck_id: str):
    decklist = await db.decklists.find_one({"id": deck_id}, {"_id": 0})
    if not decklist:
        raise HTTPException(status_code=404, detail="Decklist not found")
    return decklist

# Get card usage statistics (aggregated)
@api_router.get("/card-usage")
async def get_card_usage(
    limit: int = Query(50, ge=1, le=200),
    card_type: Optional[str] = None,
    main_extra: Optional[str] = Query(None, regex="^(Main|Extra)$")
):
    query = {}
    if card_type:
        query["card_type"] = card_type
    if main_extra:
        query["main_extra"] = main_extra
    
    # Aggregate card usage
    pipeline = [
        {"$match": query},
        {"$group": {
            "_id": "$card_name",
            "total_copies": {"$sum": "$quantity"},
            "deck_count": {"$sum": 1},
            "card_type": {"$first": "$card_type"}
        }},
        {"$sort": {"deck_count": -1}},
        {"$limit": limit},
        {"$project": {
            "_id": 0,
            "card_name": "$_id",
            "total_copies": 1,
            "deck_count": 1,
            "card_type": 1
        }}
    ]
    
    results = await db.card_usage.aggregate(pipeline).to_list(limit)
    return {"cards": results}

# Get individual card usage records (Notion-style)
@api_router.get("/card-records")
async def get_card_records(
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    search: Optional[str] = None,
    card_type: Optional[str] = None,
    main_extra: Optional[str] = None,
    event: Optional[str] = None,
    deck_name: Optional[str] = None,
    quantity: Optional[int] = None
):
    # Build filter query
    query = {}
    
    if search:
        query["card_name"] = {"$regex": search, "$options": "i"}
    
    if card_type:
        query["card_type"] = card_type
    
    if main_extra:
        query["main_extra"] = main_extra
    
    if event:
        query["event"] = {"$regex": event, "$options": "i"}
    
    if deck_name:
        query["$or"] = [
            {"player_name": {"$regex": deck_name, "$options": "i"}},
            {"deck_name": {"$regex": deck_name, "$options": "i"}}
        ]
    
    if quantity is not None:
        query["quantity"] = quantity
    
    # Get total count
    total = await db.card_usage.count_documents(query)
    
    # Calculate pagination
    skip = (page - 1) * page_size
    total_pages = (total + page_size - 1) // page_size
    
    # Fetch paginated results
    items = await db.card_usage.find(query, {"_id": 0}).sort(
        "card_name", 1
    ).skip(skip).limit(page_size).to_list(page_size)
    
    # Batch lookup: Get all decklist IDs in one query
    if items:
        # Build lookup conditions for all items at once
        lookup_conditions = [
            {
                "player_name": item["player_name"],
                "deck_name": item["deck_name"],
                "event": item["event"]
            }
            for item in items
        ]
        
        # Single batch query for all decklists
        decklists = await db.decklists.find(
            {"$or": lookup_conditions},
            {"id": 1, "player_name": 1, "deck_name": 1, "event": 1}
        ).to_list(None)
        
        # Create lookup map for O(1) access
        decklist_map = {
            (d["player_name"], d["deck_name"], d["event"]): d["id"]
            for d in decklists
        }
        
        # Assign decklist IDs using the map
        for item in items:
            key = (item["player_name"], item["deck_name"], item["event"])
            item["decklist_id"] = decklist_map.get(key)
    
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,
        "items": items
    }

# Get statistics dashboard data
@api_router.get("/stats", response_model=StatsResponse)
async def get_stats():
    # Get counts
    total_decks = await db.decklists.count_documents({})
    total_events = len(await db.decklists.distinct("event"))
    total_players = len(await db.decklists.distinct("player_name"))
    
    # Get deck type distribution
    deck_type_pipeline = [
        {"$group": {"_id": "$deck_name", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 20},
        {"$project": {"_id": 0, "deck_type": "$_id", "count": 1}}
    ]
    deck_types = await db.decklists.aggregate(deck_type_pipeline).to_list(20)
    
    # Get most popular cards
    popular_cards_pipeline = [
        {"$group": {
            "_id": "$card_name",
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": -1}},
        {"$limit": 20},
        {"$project": {"_id": 0, "card_name": "$_id", "count": 1}}
    ]
    popular_cards = await db.card_usage.aggregate(popular_cards_pipeline).to_list(20)
    
    # Get all events
    events = await db.decklists.distinct("event")
    
    # Get most successful decks (by count of appearances)
    most_successful_pipeline = [
        {
            "$group": {
                "_id": "$deck_name",
                "appearances": {"$sum": 1},
                "unique_players": {"$addToSet": "$player_name"},
                "events": {"$addToSet": "$event"}
            }
        },
        {"$sort": {"appearances": -1}},
        {"$limit": 10},
        {
            "$project": {
                "_id": 0,
                "deck_name": "$_id",
                "appearances": 1,
                "unique_players": {"$size": "$unique_players"},
                "events": 1
            }
        }
    ]
    most_successful_decks = await db.decklists.aggregate(most_successful_pipeline).to_list(10)
    
    # Get card type distribution
    card_type_pipeline = [
        {
            "$group": {
                "_id": "$card_type",
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"count": -1}}
    ]
    card_type_results = await db.card_usage.aggregate(card_type_pipeline).to_list(10)
    card_type_distribution = {item["_id"]: item["count"] for item in card_type_results if item["_id"]}
    
    return StatsResponse(
        total_decks=total_decks,
        total_events=total_events,
        total_players=total_players,
        deck_types=deck_types,
        popular_cards=popular_cards,
        events=sorted(events),
        most_successful_decks=most_successful_decks,
        card_type_distribution=card_type_distribution
    )

# Get Master 2P List (Main Deck)
@api_router.get("/master-2p-list")
async def get_master_2p_list():
    cards = await db.master_2p_list.find({}, {"_id": 0}).sort("card_name", 1).to_list(None)
    return {"cards": cards}

# Get Master Extra Deck List
@api_router.get("/master-extra-deck-list")
async def get_master_extra_deck_list():
    cards = await db.master_extra_deck_list.find({}, {"_id": 0}).sort("card_name", 1).to_list(None)
    return {"cards": cards}

# Get decklists by specific event (for Head-to-Head Builder)
@api_router.get("/decklists-by-event/{event}")
async def get_decklists_by_event(event: str):
    decklists = await db.decklists.find(
        {"event": event},
        {"_id": 0}
    ).sort("player_name", 1).to_list(None)
    
    if not decklists:
        raise HTTPException(status_code=404, detail="No decklists found for this event")
    
    return {"decklists": decklists, "event": event, "count": len(decklists)}

# Include the router in the main app
app.include_router(api_router)

# Add root health check endpoint
@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "YGO Legacy Engine API is running",
        "api_docs": "/docs",
        "api_base": "/api"
    }

# Add health check endpoint
@app.get("/health")
async def health_check():
    try:
        # Test database connection
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected",
            "message": "All systems operational"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
