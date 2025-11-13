import csv
import os
import re
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import asyncio
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def parse_decklist(raw_text):
    """Parse raw decklist text into structured format with card types"""
    main_deck = []
    extra_deck = []
    side_deck = []
    
    current_section = None
    current_card_type = None
    lines = raw_text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect sections and card types
        if 'Main Deck' in line and 'Monsters' in line:
            current_section = 'main'
            current_card_type = 'Monster'
        elif 'Main Deck' in line and 'Spells' in line:
            current_section = 'main'
            current_card_type = 'Spell'
        elif 'Main Deck' in line and 'Traps' in line:
            current_section = 'main'
            current_card_type = 'Trap'
        elif 'Extra Deck' in line and 'Fusions' in line:
            current_section = 'extra'
            current_card_type = 'Fusion'
        elif 'Extra Deck' in line:
            current_section = 'extra'
            current_card_type = 'Fusion'
        elif 'Side Deck' in line:
            current_section = 'side'
            current_card_type = None
        else:
            # Parse card line (format: "3x Card Name" or "1x Card Name")
            match = re.match(r'(\d+)x\s+(.+)', line)
            if match and current_section:
                quantity = int(match.group(1))
                card_name = match.group(2).strip()
                card = {
                    "name": card_name, 
                    "quantity": quantity,
                    "card_type": current_card_type
                }
                
                if current_section == 'main':
                    main_deck.append(card)
                elif current_section == 'extra':
                    extra_deck.append(card)
                elif current_section == 'side':
                    side_deck.append(card)
    
    return main_deck, extra_deck, side_deck

async def import_csv_decklists():
    """Import decklists from CSV file"""
    csv_path = Path('/app/database1_final/YGO_SJC_Decklists_Grouped_Main_Extra ebaf865acdac4ac3b8dac401d66b0096.csv')
    
    if not csv_path.exists():
        print(f"CSV file not found at {csv_path}")
        return
    
    print("Reading CSV file...")
    decklists = []
    
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            deck_name = row.get('Deck Name', '')
            event = row.get('Event', '')
            raw_decklist = row.get('Decklist', '')
            
            # Parse player name and deck type from "Deck Name" field
            if '-' in deck_name:
                parts = deck_name.split('-', 1)
                player_name = parts[0].strip()
                deck_type = parts[1].strip() if len(parts) > 1 else 'Unknown'
            else:
                player_name = deck_name
                deck_type = 'Unknown'
            
            # Parse the decklist
            main_deck, extra_deck, side_deck = await parse_decklist(raw_decklist)
            
            decklist = {
                "id": str(uuid.uuid4()),
                "player_name": player_name,
                "deck_name": deck_type,
                "event": event,
                "main_deck": main_deck,
                "extra_deck": extra_deck,
                "side_deck": side_deck,
                "raw_decklist": raw_decklist
            }
            decklists.append(decklist)
    
    if decklists:
        print(f"Importing {len(decklists)} decklists...")
        # Clear existing data
        await db.decklists.delete_many({})
        # Insert new data
        await db.decklists.insert_many(decklists)
        print(f"Successfully imported {len(decklists)} decklists!")
    else:
        print("No decklists found to import")

async def import_card_usage():
    """Import card usage data from MD files and CSV"""
    csv_path = Path('/app/database2_final/YGO_SJC_Main_Extra_Only_Deck_Card_Usage_Notion_FIN 57ab801eed8a44c0ba41efc7f446cf5e_all.csv')
    
    if not csv_path.exists():
        print(f"Card usage CSV file not found at {csv_path}")
        return
    
    print("Reading card usage CSV file...")
    card_usage_list = []
    
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Extract data directly from CSV columns
            full_deck_name = row.get('Deck Name', '')
            card_name = row.get('Card Name', '')
            card_type = row.get('Card Type', '')
            quantity_str = row.get('Quantity', '0')
            try:
                quantity = int(quantity_str) if quantity_str else 0
            except ValueError:
                quantity = 0
            main_extra = row.get('Main/Extra', 'Main')
            card_id = row.get('Card ID', '')
            event = row.get('Event', '')
            deck_key = row.get('Deck Key', '')
            
            # Parse player name and deck type from full_deck_name
            # Format is typically "Player Name-Deck Type"
            if '-' in full_deck_name:
                parts = full_deck_name.split('-', 1)
                player_name = parts[0].strip()
                deck_name = parts[1].strip() if len(parts) > 1 else 'Unknown'
            else:
                # If no dash, treat entire name as player name
                player_name = full_deck_name.strip()
                deck_name = 'Unknown'
            
            card_usage = {
                "id": str(uuid.uuid4()),
                "player_name": player_name,
                "deck_name": deck_name,
                "event": event,
                "card_name": card_name,
                "card_type": card_type,
                "quantity": quantity,
                "main_extra": main_extra,
                "card_id": card_id,
                "deck_key": deck_key
            }
            card_usage_list.append(card_usage)
    
    if card_usage_list:
        print(f"Importing {len(card_usage_list)} card usage records...")
        # Clear existing data
        await db.card_usage.delete_many({})
        # Insert in batches for better performance
        batch_size = 1000
        for i in range(0, len(card_usage_list), batch_size):
            batch = card_usage_list[i:i+batch_size]
            await db.card_usage.insert_many(batch)
            print(f"Imported {i+len(batch)}/{len(card_usage_list)} records...")
        print(f"Successfully imported {len(card_usage_list)} card usage records!")
    else:
        print("No card usage records found to import")

async def create_indexes():
    """Create indexes for better query performance"""
    print("Creating indexes...")
    
    # Decklists indexes
    await db.decklists.create_index("player_name")
    await db.decklists.create_index("deck_name")
    await db.decklists.create_index("event")
    await db.decklists.create_index("id", unique=True)
    
    # Card usage indexes
    await db.card_usage.create_index("card_name")
    await db.card_usage.create_index("deck_key")
    await db.card_usage.create_index("player_name")
    await db.card_usage.create_index("deck_name")
    await db.card_usage.create_index("card_type")
    
    print("Indexes created successfully!")

async def main():
    print("Starting data import...")
    print("=" * 50)
    
    # Import decklists
    await import_csv_decklists()
    print("\n" + "=" * 50 + "\n")
    
    # Import card usage
    await import_card_usage()
    print("\n" + "=" * 50 + "\n")
    
    # Create indexes
    await create_indexes()
    
    print("\n" + "=" * 50)
    print("Data import completed successfully!")
    print("=" * 50)
    
    # Close connection
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
