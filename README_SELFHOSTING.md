# 🎴 YGO Legacy Engine - Self-Hosting Guide

Complete guide for deploying the YGO Legacy Engine to Railway with MongoDB Atlas.

## 📋 Prerequisites

- GitHub account (for code hosting)
- Railway account (https://railway.app)
- MongoDB Atlas account ✓ (already set up)
- Database credentials ✓ (already configured)

## 🗄️ Database Migration

Your database has been exported and is ready to import to MongoDB Atlas.

### Files Ready for Import:
- ✅ `decklists.json` - 911 tournament decklists (2.8 MB)
- ✅ `card_usage.json` - 30,224 card records (9.8 MB)
- ✅ `master_2p_list.json` - 510 Master 2P cards (74 KB)
- ✅ `master_extra_deck_list.json` - 123 Extra Deck cards (17 KB)

**Total: 31,768 documents (~12.7 MB)**

### Import Methods (Choose ONE):

#### Option 1: MongoDB Compass (Recommended - Visual & Easy)

1. **Download MongoDB Compass**: https://www.mongodb.com/try/download/compass
2. **Connect** using your connection string:
   ```
   mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db
   ```
3. **Create Database**: `ygo_legacy_db`
4. **Create Collections**: decklists, card_usage, master_2p_list, master_extra_deck_list
5. **Import Data**: For each collection, click "ADD DATA" → "Import JSON or CSV file"
6. **Upload** the corresponding JSON file from `/app/db_export/`

#### Option 2: MongoDB Atlas Web Interface

1. Go to MongoDB Atlas Dashboard
2. Click on your cluster → "Collections"
3. Click "Create Database" → Name it `ygo_legacy_db`
4. Create each of the 4 collections
5. For each collection, use "INSERT DOCUMENT" → "Import File"
6. Upload the JSON files

#### Option 3: Command Line (mongoimport)

Download the JSON files to your local machine, then run:

```bash
# Navigate to where you saved the JSON files
cd /path/to/db_export/

# Run the import script
python3 import_to_atlas.py

# Or manually import each file:
mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=decklists --file=decklists.json --jsonArray --drop

mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=card_usage --file=card_usage.json --jsonArray --drop

mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=master_2p_list --file=master_2p_list.json --jsonArray --drop

mongoimport --uri="mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db" --collection=master_extra_deck_list --file=master_extra_deck_list.json --jsonArray --drop
```

---

## 🚂 Railway Deployment

### Step 1: Push Code to GitHub

1. In Emergent, use the **"Save to GitHub"** button in the chat
2. Create a new repository (e.g., "ygo-legacy-engine")
3. All code will be pushed automatically

### Step 2: Create Railway Project

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select your **ygo-legacy-engine** repository
4. Railway will auto-detect the configuration

### Step 3: Configure Environment Variables

In your Railway project, go to **Variables** tab and add:

```env
MONGO_URL=mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db?retryWrites=true&w=majority
DB_NAME=ygo_legacy_db
CORS_ORIGINS=*
PORT=8001
```

### Step 4: Deploy Backend

1. Railway will automatically start building
2. Wait for deployment to complete (~3-5 minutes)
3. You'll get a URL like: `https://ygo-legacy-engine-production.up.railway.app`

### Step 5: Update Frontend Configuration

**IMPORTANT:** After deployment, you need to update the frontend URL:

1. Copy your Railway deployment URL
2. In Emergent or your code editor, update `/app/frontend/.env`:
   ```env
   REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app
   ```
3. Push the change to GitHub
4. Railway will auto-redeploy

---

## ✅ Verify Deployment

Test these endpoints to confirm everything works:

### API Health Check
```
GET https://your-app.up.railway.app/api/events
→ Should return 75 SJC events
```

### Database Check
```
GET https://your-app.up.railway.app/api/decklists?page=1&page_size=5
→ Should return 5 decklists with pagination info
```

### Master Lists Check
```
GET https://your-app.up.railway.app/api/master-2p-list
→ Should return 510 Master 2P cards

GET https://your-app.up.railway.app/api/master-extra-deck-list
→ Should return 123 Extra Deck cards
```

---

## 🔄 Making Updates After Deployment

You can always come back to Emergent to make updates:

### Process:
1. **Return to Emergent** and continue this session
2. **Make your changes** (new features, bug fixes, etc.)
3. **Test locally** to ensure everything works
4. **Push to GitHub** using "Save to GitHub"
5. **Railway auto-deploys** the changes

### Database Updates:
If you need to update the database:
1. Come back to Emergent
2. Provide your MongoDB connection string
3. I'll connect and make the updates directly
4. Changes are immediately live!

---

## 📊 Railway Project Structure

```
Your Railway Project
├── Backend (FastAPI)
│   ├── Port: $PORT (Railway assigns)
│   ├── Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
│   └── Environment: MONGO_URL, DB_NAME, CORS_ORIGINS
│
└── Frontend (React - served from backend)
    ├── Built during deployment
    ├── Served as static files
    └── Connects to backend via REACT_APP_BACKEND_URL
```

---

## 🛠️ Troubleshooting

### Database Connection Issues
- **Error:** "Server selection timeout"
  - **Fix:** Check that your MongoDB Atlas Network Access allows connections from anywhere (0.0.0.0/0)
  - Go to Atlas → Network Access → Add IP Address → Allow Access from Anywhere

### Frontend Can't Reach Backend
- **Error:** "Network Error" or "404"
  - **Fix:** Ensure `REACT_APP_BACKEND_URL` in frontend/.env matches your Railway URL
  - Must NOT include `/api` suffix

### Railway Build Fails
- **Error:** Build process errors
  - **Fix:** Check Railway logs for specific errors
  - Ensure all dependencies are in requirements.txt and package.json

---

## 💰 Cost Estimate

### Railway Free Tier:
- ✅ 500 hours/month (enough for 1 app 24/7)
- ✅ 1GB RAM
- ✅ 1GB disk space
- ✅ Free custom domain support

### MongoDB Atlas Free Tier (M0):
- ✅ 512 MB storage (your data: ~12.7 MB = plenty of room)
- ✅ Shared RAM
- ✅ Unlimited connections

**Your setup should run completely free!** 🎉

---

## 📁 Files & Configurations Created

### Railway Configuration:
- ✅ `/Procfile` - Process commands
- ✅ `/railway.json` - Railway-specific settings
- ✅ `/nixpacks.toml` - Build configuration
- ✅ `/.railwayignore` - Exclude unnecessary files

### Backend Configuration:
- ✅ `/backend/.env` - Environment variables (MongoDB connection)

### Database Exports:
- ✅ `/app/db_export/*.json` - All database collections

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check Railway Logs**: Railway Dashboard → Your Project → Logs
2. **Check MongoDB Atlas**: Atlas Dashboard → Database → Collections
3. **Come Back to Emergent**: I can help troubleshoot and fix issues

---

## 🎯 Next Steps

1. ✅ Import database to MongoDB Atlas (use MongoDB Compass - easiest!)
2. ✅ Push code to GitHub via Emergent's "Save to GitHub"
3. ✅ Create Railway project and connect GitHub repo
4. ✅ Add environment variables in Railway
5. ✅ Deploy and get your URL
6. ✅ Update frontend with Railway URL
7. ✅ Test and enjoy your self-hosted YGO Legacy Engine!

---

**Questions? Come back to this Emergent session anytime for help!** 🚀
