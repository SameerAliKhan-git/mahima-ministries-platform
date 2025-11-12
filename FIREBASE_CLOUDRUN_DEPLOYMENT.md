# 🚀 Firebase + Google Cloud Run Deployment Guide

## Prerequisites
- Google Cloud account (free tier)
- Firebase project
- Docker installed (for local testing)
- gcloud CLI installed

## Part 1: Deploy Backend to Google Cloud Run

### Step 1: Install Google Cloud SDK

**Windows:**
Download and install from: https://cloud.google.com/sdk/docs/install

**Verify installation:**
```powershell
gcloud --version
```

### Step 2: Login and Set Up Project

```powershell
# Login to Google Cloud
gcloud auth login

# Create new project or use existing
gcloud projects create mahima-ministries --name="Mahima Ministries"

# Set active project
gcloud config set project mahima-ministries

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Step 3: Build and Deploy to Cloud Run

```powershell
# Navigate to backend directory
cd "d:\MM CusrtoṁDemo\New folder\backend"

# Deploy to Cloud Run (builds automatically)
gcloud run deploy mahima-backend `
  --source . `
  --region asia-south1 `
  --platform managed `
  --allow-unauthenticated `
  --port 8080 `
  --memory 512Mi `
  --min-instances 0 `
  --max-instances 10 `
  --set-env-vars "NODE_ENV=production,PORT=8080"
```

### Step 4: Set Environment Variables

After initial deployment, set all environment variables:

```powershell
gcloud run services update mahima-backend `
  --region asia-south1 `
  --update-env-vars "DATABASE_URL=postgresql://postgres:Mahima%40123%40@db.kjvkfmesztykidqxsohw.supabase.co:5432/postgres?sslmode=require,JWT_SECRET=3a5b21c49c7372858fde3954a831e989253fcea7108ec7cb1d6b4714666de477,JWT_REFRESH_SECRET=7d03a8ac09961b0f31b3784fe0d6b0ed464640e0186923fcbbda3a6d4f8fa220,JWT_EXPIRES_IN=15m,JWT_REFRESH_EXPIRES_IN=7d,SESSION_SECRET=d18494208f41c9bbed85fd1e824de2926f882b9d8d1b2f9b1106b68d0fc2d73d,SESSION_MAX_AGE=86400000,CORS_ORIGIN=https://mahimaministries.org,SMTP_HOST=smtp.gmail.com,SMTP_PORT=587,SMTP_USER=chekarsamopt@gmail.com,SMTP_PASSWORD=ubxrvudslowomvae,EMAIL_FROM=chekarsamopt@gmail.com,ADMIN_EMAIL=chekarsamopt@gmail.com,PAYTM_MERCHANT_ID=your_merchant_id,PAYTM_MERCHANT_KEY=your_merchant_key,PAYTM_WEBSITE=WEBSTAGING"
```

**Your Cloud Run URL will be:**
```
https://mahima-backend-<hash>-uc.a.run.app
```

**SAVE THIS URL** - you'll need it for frontend deployment!

---

## Part 2: Deploy Frontend to Firebase Hosting

### Step 1: Install Firebase CLI

```powershell
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```powershell
firebase login
```

### Step 3: Initialize Firebase in Frontend

```powershell
# Navigate to frontend directory
cd "d:\MM CusrtoṁDemo\New folder\frontend"

# Initialize Firebase
firebase init hosting
```

**When prompted:**
- **Use existing project or create new?** → Create new project or select existing
- **Public directory:** `dist`
- **Configure as single-page app:** `Yes`
- **Set up automatic builds with GitHub:** `No` (we'll deploy manually first)
- **Overwrite index.html:** `No`

### Step 4: Update Frontend Environment Variable

Create `.env.production` file in frontend directory:

```bash
VITE_API_URL=https://mahima-backend-<hash>-uc.a.run.app
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_APP_NAME=Mahima Ministries
VITE_APP_URL=https://mahimaministries.org
```

**Replace `<hash>` with actual Cloud Run URL!**

### Step 5: Build and Deploy

```powershell
# Build production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

**Your Firebase URL will be:**
```
https://mahima-ministries.web.app
OR
https://mahima-ministries.firebaseapp.com
```

---

## Part 3: Connect Custom Domain (mahimaministries.org)

### Step 1: Add Custom Domain in Firebase Console

1. Go to **Firebase Console** → **Hosting**
2. Click **"Add custom domain"**
3. Enter: `mahimaministries.org`
4. Firebase will provide DNS records

### Step 2: Update GoDaddy DNS

Firebase will show you records like:

```
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195
```

Add these in GoDaddy DNS settings.

### Step 3: Wait for SSL Provisioning

- DNS propagation: 10-60 minutes
- SSL certificate: Automatic (provided by Firebase)
- Verify at: https://mahimaministries.org

---

## 💰 Cost Breakdown

### Google Cloud Run (Backend)
- **FREE Tier:** 2 million requests/month, 360,000 GB-seconds
- **Your Usage:** ~10k-50k requests/month = ₹0
- **After Free Tier:** ~₹100-300/month

### Firebase Hosting (Frontend)
- **FREE Tier:** 10GB storage, 360MB/day bandwidth
- **Your Usage:** Well within free tier = ₹0
- **After Free Tier:** Never (your traffic is too low)

### Supabase (Database)
- **FREE:** 500MB database, 2GB bandwidth = ₹0

### **Total Monthly Cost: ₹0-300** (likely ₹0 with free tiers)

---

## 🔧 Troubleshooting

### Cloud Run Deployment Fails
```powershell
# Check logs
gcloud run services logs read mahima-backend --region asia-south1

# View service details
gcloud run services describe mahima-backend --region asia-south1
```

### Firebase Hosting Issues
```powershell
# View hosting releases
firebase hosting:channel:list

# Rollback if needed
firebase hosting:clone <source-site>:<channel> <destination-site>:<channel>
```

### Database Connection Issues
- Verify DATABASE_URL in Cloud Run env vars
- Check Supabase connection string format
- Ensure SSL mode is set: `?sslmode=require`

---

## 🎯 Quick Commands Reference

### Redeploy Backend
```powershell
cd backend
gcloud run deploy mahima-backend --source . --region asia-south1
```

### Redeploy Frontend
```powershell
cd frontend
npm run build
firebase deploy --only hosting
```

### View Logs
```powershell
# Cloud Run logs
gcloud run services logs read mahima-backend --region asia-south1 --limit 50

# Firebase logs
firebase hosting:channel:open <channel-id>
```

---

## ✅ Success Checklist

- [ ] Cloud Run backend deployed and accessible
- [ ] Environment variables set correctly
- [ ] Frontend built with correct API_URL
- [ ] Firebase hosting deployed
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] All features tested (login, donations, admin panel)
- [ ] Database connected and working
- [ ] Payment gateways in test mode

---

## 📞 Support

- **Cloud Run Docs:** https://cloud.google.com/run/docs
- **Firebase Hosting Docs:** https://firebase.google.com/docs/hosting
- **Pricing Calculator:** https://cloud.google.com/products/calculator

**Deployment Date:** ___________________
**Cloud Run URL:** ___________________
**Firebase URL:** ___________________
**Custom Domain:** https://mahimaministries.org
