# Railway Deployment Fix

## Problem
Railway deployment failed with "Repository snapshot operation timed out" error. This was caused by large unnecessary files being included in the GitHub repository.

## What Was Fixed

✅ **Updated `.gitignore` to exclude:**
- `/db_export/` folder (13 MB of JSON files - not needed in production)
- `/database1_final/` folder (1.5 MB)
- `/database2_final/` folder (135 MB)
- All `.csv` files (1.5 MB)
- Migration scripts
- Test result files

✅ **Optimized `nixpacks.toml`:**
- Added `--frozen-lockfile` to yarn install for faster builds

## Repository Size Before/After
- **Before**: ~740 MB (with node_modules, databases, exports)
- **After**: ~20 MB (just source code)

## Steps to Fix Your Deployment

### Option 1: Create New GitHub Repository (Recommended)

1. **Save to NEW GitHub repository** using Emergent's "Save to GitHub" button
2. Create a fresh repo (e.g., "ygo-legacy-engine-v2")
3. This will only push the necessary files (thanks to updated .gitignore)
4. In Railway, delete the old deployment
5. Create new Railway project pointing to the new GitHub repo

### Option 2: Update Existing Repository

If you want to keep the same repo:

1. **Save to GitHub** using Emergent (this will push the updated .gitignore)
2. In Railway dashboard:
   - Go to your project Settings
   - Click "Redeploy" or "Trigger Deploy"
3. Railway should now clone successfully

### Option 3: Force Push (If familiar with Git)

If you have the repo cloned locally:
```bash
git rm -r --cached db_export/ database1_final/ database2_final/ *.csv
git commit -m "Remove large unnecessary files"
git push
```

## Verify Repository Size

After pushing to GitHub:
1. Go to your GitHub repository
2. Check the repository size (should be ~20 MB or less)
3. Verify these folders are NOT present:
   - ❌ db_export/
   - ❌ database1_final/
   - ❌ database2_final/
   - ❌ node_modules/

## Railway Environment Variables

Make sure these are set in Railway → Variables:

```env
MONGO_URL=mongodb+srv://ryanf0511_db_user:JVSrPVhD6OLhFKdo@cluster0.fujail9.mongodb.net/ygo_legacy_db?retryWrites=true&w=majority
DB_NAME=ygo_legacy_db
CORS_ORIGINS=*
PORT=8001
```

## Expected Build Time

After fixing:
- Repository clone: ~10-30 seconds
- Build process: ~3-5 minutes
- Total deployment: ~5-8 minutes

## Next Steps

1. ✅ Save to GitHub with updated .gitignore
2. ✅ Deploy or redeploy on Railway
3. ✅ Wait for successful build
4. ✅ Get your Railway URL
5. ✅ Update frontend/.env with Railway URL
6. ✅ Push again to trigger final deployment
7. ✅ Test and enjoy!

---

**The fix is ready! Just push to GitHub and redeploy.** 🚀
