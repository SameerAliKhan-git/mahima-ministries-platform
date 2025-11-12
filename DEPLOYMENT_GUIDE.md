# 🚀 Production Deployment Guide
## Mahima Ministries Platform - Complete Deployment to mahimaministries.org

This guide will help you deploy your new website to replace the old one on **mahimaministries.org** with **minimal costs** (₹0-400/month).

---

## 📋 Pre-Deployment Checklist

- [x] Code pushed to GitHub
- [ ] Have GoDaddy account access
- [ ] Have Razorpay/Paytm API keys ready
- [ ] Gmail/SMTP credentials (optional)
- [ ] 30-45 minutes of focused time

---

## 💰 Cost Breakdown (Optimized for Low Cost)

| Service | Purpose | Monthly Cost | Annual Cost |
|---------|---------|--------------|-------------|
| **Vercel** | Frontend hosting | ₹0 (FREE) | ₹0 |
| **Supabase** | PostgreSQL database | ₹0 (FREE) | ₹0 |
| **Railway** | Backend API server | ₹400-650 | ₹4,800-7,800 |
| **GoDaddy** | Domain (owned) | ₹0 | ₹0 |
| **SSL Certificate** | HTTPS security | ₹0 (auto) | ₹0 |
| **Total** | | **₹400-650/mo** | **₹4,800-7,800/yr** |

**After GCS Migration (with nonprofit credits):** ₹0/month for 1-2 years

---

## 🎯 Deployment Strategy

```
Step 1: Deploy Database (Supabase) - FREE
   ↓
Step 2: Deploy Backend (Railway) - $5 trial then ~₹400-650/mo
   ↓
Step 3: Deploy Frontend (Vercel) - FREE forever
   ↓
Step 4: Test on temporary URLs
   ↓
Step 5: Update GoDaddy DNS → OLD site replaced with NEW site
```

---

## 📝 Step-by-Step Instructions

### **Step 1: Deploy PostgreSQL Database on Supabase (FREE)**

#### 1.1 Sign Up for Supabase
1. Visit: https://supabase.com/
2. Click **"Start your project"**
3. Sign in with GitHub (use same account as your code)
4. Click **"New project"**

#### 1.2 Create Database Project
```
Organization: Create new or use existing
Name: mahima-ministries-db
Database Password: [SAVE THIS - you'll need it]
Region: Mumbai (ap-south-1) - closest to India
Pricing Plan: FREE (500MB database, 2GB bandwidth/month)
```

Click **"Create new project"** (takes 2-3 minutes)

#### 1.3 Get Database Connection String
1. In Supabase dashboard, go to **Settings → Database**
2. Scroll to **Connection String → URI**
3. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
4. **SAVE THIS** - you'll need it for Railway

#### 1.4 Run Database Migrations
On your local machine:
```powershell
# Navigate to backend
cd "d:\MM CusrtoṁDemo\New folder\backend"

# Update .env with Supabase DATABASE_URL
# Edit backend/.env and replace DATABASE_URL with Supabase connection string

# Run migrations to create all tables
npx prisma migrate deploy

# (Optional) Seed initial data
npm run prisma:seed
```

**Verify in Supabase:**
- Go to **Table Editor** in Supabase dashboard
- You should see tables: User, Donation, Report, etc.

---

### **Step 2: Deploy Backend API on Railway**

#### 2.1 Sign Up for Railway
1. Visit: https://railway.app/
2. Click **"Start a New Project"**
3. **Sign in with GitHub** (same account)
4. You get **$5 free trial credit** (no card required initially)

#### 2.2 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. **Authorize Railway** to access your GitHub
4. Select repository: **`mahima-ministries-platform`**
5. Railway detects it's a monorepo

#### 2.3 Configure Backend Service
1. Click **"Add Service"** → **"GitHub Repo"**
2. Select **`backend`** directory as root
3. Railway auto-detects Node.js

#### 2.4 Set Environment Variables
Click on your service → **Variables** tab → Add these:

```bash
NODE_ENV=production
PORT=3000

# Database (paste Supabase connection string)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres

# JWT (generate strong random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# CORS (temporary Railway URL, will update later)
CORS_ORIGIN=https://mahimaministries.org

# Razorpay (your keys)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key

# Paytm (your keys)
PAYTM_MID=your_merchant_id
PAYTM_KEY=your_merchant_key
PAYTM_WEBSITE=WEBSTAGING
PAYTM_INDUSTRY_TYPE=Retail
PAYTM_CHANNEL_ID=WEB

# Email (optional - use Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=noreply@mahimaministries.org

# Admin
ADMIN_EMAIL=admin@mahimaministries.org
ADMIN_PASSWORD=strong-secure-password-here
```

**How to generate JWT_SECRET:**
```powershell
# On Windows PowerShell:
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

#### 2.5 Configure Build Settings
Railway should auto-detect, but verify:
- **Build Command:** `npm install && npx prisma generate`
- **Start Command:** `npm start`

#### 2.6 Add Persistent Volume (for file uploads)
1. In Railway service settings, click **"Volumes"**
2. Click **"New Volume"**
3. **Mount Path:** `/app/uploads`
4. **Size:** 5GB (included in free tier)
5. This makes uploaded reports persist across deployments

#### 2.7 Deploy Backend
1. Click **"Deploy"** (or it auto-deploys)
2. Wait 3-5 minutes for deployment
3. Check **"Deployments"** tab for status
4. Once complete, click **"Settings"** → **"Networking"**
5. Click **"Generate Domain"**
6. **SAVE YOUR BACKEND URL:** 
   ```
   https://mahima-backend-production-xxxx.up.railway.app
   ```

#### 2.8 Test Backend
Visit: `https://your-railway-url.up.railway.app/api/health`

Expected response:
```json
{"status":"ok","timestamp":"2025-11-12T..."}
```

---

### **Step 3: Deploy Frontend on Vercel (FREE)**

#### 3.1 Sign Up for Vercel
1. Visit: https://vercel.com/
2. Click **"Start Deploying"**
3. **Sign up with GitHub** (same account)
4. **100% FREE forever** for personal/nonprofit projects

#### 3.2 Import GitHub Repository
1. Click **"Add New..."** → **"Project"**
2. **Import Git Repository**
3. Select: **`mahima-ministries-platform`**
4. Click **"Import"**

#### 3.3 Configure Project Settings
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 3.4 Add Environment Variables
Click **"Environment Variables"** and add:

```bash
VITE_API_URL=https://your-railway-backend-url.up.railway.app
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
VITE_APP_NAME=Mahima Ministries
VITE_APP_URL=https://mahimaministries.org
```

**Important:** Replace `your-railway-backend-url` with actual Railway URL from Step 2.7

#### 3.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Vercel gives you temporary URL:
   ```
   https://mahima-ministries-xxxx.vercel.app
   ```
4. **SAVE THIS URL** for testing

---

### **Step 4: Test on Temporary URLs**

#### 4.1 Test Frontend
Visit: `https://your-project.vercel.app`

**Test these features:**
- [ ] Homepage loads correctly
- [ ] Navigation works (About, Mission, Donate, etc.)
- [ ] Images load (check browser console for errors)
- [ ] Click "Donate Now" button
- [ ] Check browser console for API errors

#### 4.2 Test Backend Integration
1. **Test Registration:**
   - Click "Sign Up"
   - Create test account
   - Check if successful

2. **Test Login:**
   - Login with test account
   - Verify JWT token stored

3. **Test Admin Panel:**
   - Login as admin (use ADMIN_EMAIL and ADMIN_PASSWORD from env)
   - Visit: `https://your-project.vercel.app/admin`
   - Check dashboard loads
   - Try uploading a test report

4. **Test Donations (Test Mode):**
   - Try making a test donation
   - Use Razorpay test cards: `4111 1111 1111 1111`
   - Verify donation appears in admin panel

#### 4.3 Check Browser Console
- Press F12 → Console tab
- Look for red errors
- Common issues:
  - CORS errors → Update CORS_ORIGIN in Railway
  - API not found → Check VITE_API_URL in Vercel
  - 500 errors → Check Railway logs

#### 4.4 Fix Issues Before DNS Change
**If you find issues:**
1. Update environment variables in Railway/Vercel
2. Redeploy (automatic on save)
3. Test again

**Common Fixes:**
```bash
# CORS Error → In Railway, update:
CORS_ORIGIN=https://your-project.vercel.app,https://mahimaministries.org

# API URL Error → In Vercel, verify:
VITE_API_URL=https://your-exact-railway-url.up.railway.app
```

---

### **Step 5: Connect Custom Domain (mahimaministries.org)**

#### 5.1 Add Domain in Vercel
1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter: `mahimaministries.org`
5. Click **"Add"**
6. Also add: `www.mahimaministries.org`

Vercel will show DNS configuration needed.

#### 5.2 Update GoDaddy DNS Records
**⚠️ This replaces your old website with the new one**

1. Login to **GoDaddy Account**
2. Go to **"My Products"** → **"Domains"**
3. Click **"DNS"** next to mahimaministries.org
4. **Backup old records** (screenshot recommended)

**Update these records:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | 600 |
| CNAME | www | `cname.vercel-dns.com` | 600 |

**How to update:**
1. **Delete old A record** pointing to old website
2. **Add new A record:**
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   - TTL: 600 seconds
3. **Update/Add CNAME record:**
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
   - TTL: 600 seconds

**Save changes**

#### 5.3 Wait for DNS Propagation
- **Time:** 10-60 minutes (usually 10-15 min)
- **Check status:** https://dnschecker.org/#A/mahimaministries.org
- Should show Vercel's IP globally

#### 5.4 Verify in Vercel
1. Go back to Vercel → Domains
2. Wait for green checkmark ✓ next to domain
3. Vercel automatically provisions **FREE SSL certificate**

---

### **Step 6: Final Verification**

#### 6.1 Visit Your Domain
1. Visit: **https://mahimaministries.org**
2. Should see **NEW website** (not old one)
3. Check for green padlock 🔒 (SSL active)

#### 6.2 Test All Features
- [ ] Homepage loads
- [ ] All pages accessible
- [ ] User registration/login works
- [ ] Donations work (test mode)
- [ ] Admin panel accessible
- [ ] Reports upload/download works
- [ ] Analytics dashboard loads
- [ ] Mobile responsive
- [ ] HTTPS on all pages

#### 6.3 Test from Multiple Devices
- Desktop browser
- Mobile phone
- Different browsers (Chrome, Firefox, Safari)
- Incognito/private mode

---

## ✅ Post-Deployment Tasks

### Update CORS Origin (Important!)
Now that domain is live, update Railway environment variable:
```bash
CORS_ORIGIN=https://mahimaministries.org,https://www.mahimaministries.org
```

### Enable Production Payment Gateways
When ready for real donations:
1. **Razorpay:** Change from test keys to live keys
2. **Paytm:** Change PAYTM_WEBSITE from "WEBSTAGING" to "DEFAULT"
3. Update in Railway environment variables
4. Redeploy

### Monitor Costs
- **Railway Dashboard:** Check usage and credits
- **Supabase Dashboard:** Monitor database size (500MB limit)
- **Vercel Dashboard:** Check bandwidth (100GB/month limit)

### Set Up Monitoring (Optional)
- **Vercel Analytics:** Enable in project settings (FREE)
- **Railway Logs:** Check for errors regularly
- **Supabase Logs:** Monitor database queries

---

## 🎉 Success Checklist

- [ ] Old website replaced with new website on mahimaministries.org
- [ ] HTTPS working (green padlock)
- [ ] All pages load correctly
- [ ] Donations work in test mode
- [ ] Admin panel accessible
- [ ] Reports management working
- [ ] Database connected
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Monthly cost: ₹0-650 (within budget)

---

## 🔧 Troubleshooting

### Issue: "Failed to fetch" errors
**Solution:**
1. Check VITE_API_URL in Vercel environment variables
2. Verify Railway backend is running (check logs)
3. Update CORS_ORIGIN in Railway to include your domain

### Issue: Database connection failed
**Solution:**
1. Verify DATABASE_URL in Railway matches Supabase
2. Check Supabase database is active (not paused)
3. Test connection from Railway logs

### Issue: Donations not working
**Solution:**
1. Verify Razorpay/Paytm keys in Railway environment
2. Check browser console for errors
3. Use test cards in test mode first

### Issue: Reports not uploading
**Solution:**
1. Verify Railway volume is mounted at `/app/uploads`
2. Check Railway logs for permission errors
3. Verify file size is under 10MB

### Issue: Domain not updating
**Solution:**
1. Wait longer (DNS can take up to 24 hours)
2. Clear browser cache (Ctrl + Shift + Delete)
3. Check DNS with: https://dnschecker.org/
4. Verify GoDaddy records exactly match Vercel instructions

---

## 💡 Cost Optimization Tips

1. **Supabase Free Tier (500MB):**
   - Regularly clean old donation records
   - Archive old reports
   - Monitor size in dashboard

2. **Railway Credits:**
   - First $5 is FREE
   - After that, ~$5-8/month
   - Turn off dev environments when not needed

3. **Vercel (Always Free):**
   - No optimization needed
   - 100GB bandwidth is generous

4. **Future: GCS Migration (₹0 with nonprofit credits):**
   - After Google nonprofit approval
   - Migrate reports to GCS
   - Remove Railway volume (save costs)

---

## 📞 Support

- **Railway Discord:** https://discord.gg/railway
- **Vercel Discord:** https://vercel.com/discord
- **Supabase Discord:** https://discord.supabase.com/

---

## 🎯 Next Steps After Deployment

1. **Switch to Production Payment Keys** (when ready for real donations)
2. **Apply for Google for Nonprofits** (for GCS credits)
3. **Set up email notifications** (SMTP configured)
4. **Monitor traffic and optimize**
5. **Backup database regularly** (Supabase has auto-backups)

---

**Deployment Date:** ___________________
**Deployed By:** ___________________
**Production URL:** https://mahimaministries.org
**Backend URL:** https://_____________________.up.railway.app
**Database:** Supabase (FREE)
**Hosting:** Vercel (FREE) + Railway (~₹400-650/mo)

---

## 🎊 Congratulations!

Your new Mahima Ministries website is now live on **mahimaministries.org** with:
- ✅ Modern React frontend
- ✅ Secure Node.js backend
- ✅ PostgreSQL database
- ✅ Payment gateway integration
- ✅ Reports management system
- ✅ Admin panel
- ✅ Analytics dashboard
- ✅ HTTPS security
- ✅ Low monthly cost (₹400-650)

Total setup time: ~30-45 minutes
Monthly cost: ₹400-650 (₹0 after GCS migration)
