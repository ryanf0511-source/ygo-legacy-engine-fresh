#!/usr/bin/env python3
"""
YGO Legacy Engine - MongoDB Atlas Import Script
Run this script from your local machine to import data to MongoDB Atlas
"""

import subprocess
import os
import sys

# Your MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db"

# Collections to import
COLLECTIONS = [
    ("decklists.json", "decklists", 911),
    ("card_usage.json", "card_usage", 30224),
    ("master_2p_list.json", "master_2p_list", 510),
    ("master_extra_deck_list.json", "master_extra_deck_list", 123)
]

def check_mongoimport():
    """Check if mongoimport is installed"""
    try:
        subprocess.run(["mongoimport", "--version"], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def import_collection(json_file, collection_name, expected_count):
    """Import a single collection"""
    if not os.path.exists(json_file):
        print(f"✗ Error: {json_file} not found!")
        return False
    
    print(f"\nImporting {collection_name}...")
    print(f"  File: {json_file}")
    print(f"  Expected: {expected_count} documents")
    
    try:
        cmd = [
            "mongoimport",
            f"--uri={MONGO_URI}",
            f"--collection={collection_name}",
            f"--file={json_file}",
            "--jsonArray",
            "--drop"  # Drop existing collection before import
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✓ Successfully imported {collection_name}")
            return True
        else:
            print(f"✗ Error importing {collection_name}:")
            print(result.stderr)
            return False
            
    except Exception as e:
        print(f"✗ Exception during import: {e}")
        return False

def main():
    print("="*60)
    print("YGO Legacy Engine - MongoDB Atlas Data Import")
    print("="*60)
    
    # Check if mongoimport is available
    if not check_mongoimport():
        print("\n✗ Error: mongoimport not found!")
        print("\nPlease install MongoDB Database Tools:")
        print("  https://www.mongodb.com/try/download/database-tools")
        print("\nOr use MongoDB Compass to import the JSON files manually.")
        sys.exit(1)
    
    print("\n✓ mongoimport found")
    print(f"\nTarget Database: ygo_legacy_db")
    print(f"Cluster: cluster0.fujail9.mongodb.net")
    
    # Import each collection
    success_count = 0
    for json_file, collection_name, expected_count in COLLECTIONS:
        if import_collection(json_file, collection_name, expected_count):
            success_count += 1
    
    # Summary
    print("\n" + "="*60)
    if success_count == len(COLLECTIONS):
        print("✓ All collections imported successfully!")
        print("\nYour MongoDB Atlas database is ready!")
        print("You can now deploy to Railway.")
    else:
        print(f"⚠ Imported {success_count}/{len(COLLECTIONS)} collections")
        print("Please check the errors above and try again.")
    print("="*60)

if __name__ == "__main__":
    main()
