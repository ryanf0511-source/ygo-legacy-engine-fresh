from pymongo import MongoClient
import certifi

# Source (local MongoDB)
source_uri = "mongodb://localhost:27017"
source_db_name = "test_database"

# Destination (MongoDB Atlas) with SSL cert
dest_uri = "mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db?retryWrites=true&w=majority"
dest_db_name = "ygo_legacy_db"

def migrate_data():
    print("Connecting to source database...")
    source_client = MongoClient(source_uri)
    source_db = source_client[source_db_name]
    
    print("Connecting to MongoDB Atlas...")
    try:
        dest_client = MongoClient(dest_uri, tlsCAFile=certifi.where())
        dest_db = dest_client[dest_db_name]
        
        # Test connection
        dest_client.admin.command('ping')
        print("✓ Successfully connected to MongoDB Atlas!")
    except Exception as e:
        print(f"✗ Failed to connect to MongoDB Atlas: {e}")
        return
    
    # Collections to migrate
    collections = ["decklists", "card_usage", "master_2p_list", "master_extra_deck_list"]
    
    total_docs = 0
    for collection_name in collections:
        print(f"\nMigrating {collection_name}...")
        source_collection = source_db[collection_name]
        dest_collection = dest_db[collection_name]
        
        # Get all documents
        documents = list(source_collection.find({}))
        
        if documents:
            # Clear existing data in destination
            dest_collection.delete_many({})
            
            # Insert all documents
            dest_collection.insert_many(documents)
            total_docs += len(documents)
            print(f"✓ Migrated {len(documents)} documents to {collection_name}")
        else:
            print(f"⚠ No documents found in {collection_name}")
    
    print("\n" + "="*50)
    print(f"Migration Complete! Total: {total_docs} documents")
    print("="*50)
    
    # Verify counts
    print("\nVerifying data in MongoDB Atlas:")
    for collection_name in collections:
        count = dest_collection = dest_db[collection_name].count_documents({})
        print(f"  {collection_name}: {count} documents")
    
    source_client.close()
    dest_client.close()

if __name__ == "__main__":
    migrate_data()
