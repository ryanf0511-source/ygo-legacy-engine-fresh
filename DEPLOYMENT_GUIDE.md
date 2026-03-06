# YGO Legacy Engine - Railway Deployment Guide

## Database Migration Steps

Due to SSL/TLS restrictions in the development environment, we need to import the database manually. Here are your options:

### Option 1: MongoDB Atlas Web Interface (Easiest)

1. Go to your MongoDB Atlas dashboard
2. Click on your cluster → "Collections"
3. Click "Add My Own Data" or "Create Database"
4. Database name: `ygo_legacy_db`
5. Create these 4 collections:
   - `decklists`
   - `card_usage`
   - `master_2p_list`
   - `master_extra_deck_list`

6. For each collection, click "INSERT DOCUMENT" → "Import JSON or CSV file"
7. Upload the corresponding JSON file from `/app/db_export/`:
   - `decklists.json` → 911 documents
   - `card_usage.json` → 30,224 documents
   - `master_2p_list.json` → 510 documents
   - `master_extra_deck_list.json` → 123 documents

### Option 2: MongoDB Compass (Desktop App)

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect using your connection string:
   ```
   mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db
   ```
3. Create database `ygo_legacy_db` and the 4 collections
4. For each collection, click "ADD DATA" → "Import JSON or CSV file"
5. Import the JSON files from your local machine

### Option 3: mongoimport from Your Local Machine

If you have MongoDB tools installed locally:

```bash
mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=decklists --file=decklists.json --jsonArray

mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=card_usage --file=card_usage.json --jsonArray

mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=master_2p_list --file=master_2p_list.json --jsonArray

mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=master_extra_deck_list --file=master_extra_deck_list.json --jsonArray
```

---

## Railway Deployment Steps

### 1. Push Code to GitHub

1. Use Emergent's "Save to GitHub" feature in the chat interface
2. Create a new repository or update an existing one
3. Name it something like "ygo-legacy-engine"

### 2. Set Up Railway Project

1. Go to https://railway.app/
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your "ygo-legacy-engine" repository
5. Railway will automatically detect the configuration

### 3. Configure Environment Variables

In Railway, go to your project → Variables tab and add:

```
MONGO_URL=mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db?retryWrites=true&w=majority
DB_NAME=ygo_legacy_db
CORS_ORIGINS=*
```

### 4. Deploy

1. Railway will automatically build and deploy your app
2. You'll get a URL like: `https://your-app.up.railway.app`
3. The backend will be accessible at: `https://your-app.up.railway.app/api/`

### 5. Update Frontend URL (Important!)

Once you have your Railway URL:

1. Update `/app/frontend/.env`:
   ```
   REACT_APP_BACKEND_URL=https://your-app.up.railway.app
   ```
2. Push the change to GitHub
3. Railway will automatically redeploy

---

## Verification

Once deployed, test these endpoints:

- `https://your-app.up.railway.app/api/events` → Should return 75 events
- `https://your-app.up.railway.app/api/decklists` → Should return paginated decklists
- `https://your-app.up.railway.app/api/master-2p-list` → Should return 510 cards
- `https://your-app.up.railway.app/api/master-extra-deck-list` → Should return 123 cards

---

## Future Updates

To update your deployed app:

1. Come back to Emergent and continue this session
2. Make your code changes
3. I'll connect to your MongoDB Atlas (you provide the connection string)
4. Push changes to GitHub using "Save to GitHub"
5. Railway automatically redeploys!

---

## Database Files Location

All exported JSON files are in: `/app/db_export/`

- `decklists.json` (2.8 MB - 911 records)
- `card_usage.json` (9.8 MB - 30,224 records)
- `master_2p_list.json` (74 KB - 510 records)
- `master_extra_deck_list.json` (17 KB - 123 records)

**Total: ~12.7 MB of data**

---

## Need Help?

If you run into issues during deployment, come back to this Emergent session and I can help troubleshoot!
