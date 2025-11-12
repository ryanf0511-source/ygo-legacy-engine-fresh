import csv
import os
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def import_extra_deck_master_list():
    """Import Extra Deck Master List"""
    csv_path = Path('/app/extra_deck_master.csv')
    
    if not csv_path.exists():
        print(f"Extra Deck Master CSV file not found at {csv_path}")
        return
    
    print("Reading Extra Deck Master CSV file...")
    cards = []
    
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            card = {
                "card_name": row.get('Card Name', ''),
                "card_type": row.get('Card Type', ''),
                "max_qty": int(row.get('Max Qty Needed (1 Player)', 0)),
                "list_type": "extra_deck"
            }
            cards.append(card)
    
    if cards:
        print(f"Importing {len(cards)} cards...")
        # Clear existing extra deck data
        await db.master_extra_deck_list.delete_many({})
        # Insert new data
        await db.master_extra_deck_list.insert_many(cards)
        print(f"Successfully imported {len(cards)} Extra Deck Master cards!")
    else:
        print("No cards found to import")
    
    # Create index
    await db.master_extra_deck_list.create_index("card_name")
    print("Index created successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(import_extra_deck_master_list())
