import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import json
from bson import json_util

# Source (local MongoDB)
source_uri = "mongodb://localhost:27017"
source_db_name = "test_database"

# Destination (MongoDB Atlas)
dest_uri = "mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db?retryWrites=true&w=majority"
dest_db_name = "ygo_legacy_db"

async def migrate_data():
    print("Connecting to source database...")
    source_client = AsyncIOMotorClient(source_uri)
    source_db = source_client[source_db_name]
    
    print("Connecting to MongoDB Atlas...")
    dest_client = AsyncIOMotorClient(dest_uri)
    dest_db = dest_client[dest_db_name]
    
    # Test connection
    try:
        await dest_client.admin.command('ping')
        print("✓ Successfully connected to MongoDB Atlas!")
    except Exception as e:
        print(f"✗ Failed to connect to MongoDB Atlas: {e}")
        return
    
    # Collections to migrate
    collections = ["decklists", "card_usage", "master_2p_list", "master_extra_deck_list"]
    
    for collection_name in collections:
        print(f"\nMigrating {collection_name}...")
        source_collection = source_db[collection_name]
        dest_collection = dest_db[collection_name]
        
        # Get all documents
        documents = await source_collection.find({}).to_list(None)
        
        if documents:
            # Clear existing data in destination
            await dest_collection.delete_many({})
            
            # Insert all documents
            await dest_collection.insert_many(documents)
            print(f"✓ Migrated {len(documents)} documents to {collection_name}")
        else:
            print(f"⚠ No documents found in {collection_name}")
    
    print("\n" + "="*50)
    print("Migration Complete!")
    print("="*50)
    
    # Verify counts
    print("\nVerifying data in MongoDB Atlas:")
    for collection_name in collections:
        count = await dest_db[collection_name].count_documents({})
        print(f"  {collection_name}: {count} documents")
    
    source_client.close()
    dest_client.close()

if __name__ == "__main__":
    asyncio.run(migrate_data())
