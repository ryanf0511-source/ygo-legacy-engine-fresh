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


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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
    deck_types: List[Dict[str, int]]
    popular_cards: List[Dict[str, int]]
    events: List[str]

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
    return {"events": sorted([e for e in events if e])}

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
        # Search in card usage collection and get matching deck keys
        card_matches = await db.card_usage.find(
            {"card_name": {"$regex": card_name, "$options": "i"}},
            {"deck_key": 1}
        ).to_list(None)
        
        if card_matches:
            deck_keys = list(set([match["deck_key"] for match in card_matches]))
            # Match against player-deck combination
            query["$or"] = [
                {"$expr": {"$in": [{"$concat": ["$player_name", "-", "$deck_name"]}, deck_keys]}}
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
    deck_name: Optional[str] = None
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
    
    # Get total count
    total = await db.card_usage.count_documents(query)
    
    # Calculate pagination
    skip = (page - 1) * page_size
    total_pages = (total + page_size - 1) // page_size
    
    # Fetch paginated results
    items = await db.card_usage.find(query, {"_id": 0}).sort(
        "card_name", 1
    ).skip(skip).limit(page_size).to_list(page_size)
    
    # For each item, try to find the matching decklist ID
    for item in items:
        # Try to find the decklist by matching player_name and deck_name
        decklist = await db.decklists.find_one(
            {
                "player_name": item["player_name"],
                "deck_name": item["deck_name"],
                "event": item["event"]
            },
            {"id": 1}
        )
        if decklist:
            item["decklist_id"] = decklist["id"]
        else:
            item["decklist_id"] = None
    
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
    
    return StatsResponse(
        total_decks=total_decks,
        total_events=total_events,
        total_players=total_players,
        deck_types=deck_types,
        popular_cards=popular_cards,
        events=sorted(events)
    )

# Include the router in the main app
app.include_router(api_router)

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
