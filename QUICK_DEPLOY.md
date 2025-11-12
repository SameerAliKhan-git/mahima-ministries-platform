# 🚀 QUICK DEPLOYMENT REFERENCE

## 📝 Deployment Order (30-45 minutes total)

```
1. Supabase (Database) → 5 min
2. Railway (Backend) → 10 min
3. Vercel (Frontend) → 5 min
4. Test Everything → 10 min
5. GoDaddy DNS → 2 min
6. Wait & Verify → 10-60 min
```

---

## 🔗 Sign-Up Links (Open in Browser)

| Service | URL | Cost | Purpose |
|---------|-----|------|---------|
| **Supabase** | https://supabase.com/ | FREE | PostgreSQL Database |
| **Railway** | https://railway.app/ | $5 trial → ~₹400-650/mo | Backend API |
| **Vercel** | https://vercel.com/ | FREE | Frontend Website |
| **GoDaddy** | https://godaddy.com/ | Owned | Domain DNS |

---

## 🎯 Supabase Setup (5 min)

1. **Sign up** → GitHub login
2. **New Project:**
   - Name: `mahima-ministries-db`
   - Password: [SAVE IT]
   - Region: **Mumbai (ap-south-1)**
   - Plan: **FREE**
3. **Get connection string:**
   - Settings → Database → Connection String → URI
   - Copy: `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres`
4. **Run migrations locally:**
   ```powershell
   cd "d:\MM CusrtoṁDemo\New folder\backend"
   # Update .env with Supabase DATABASE_URL
   npx prisma migrate deploy
   ```

---

## 🎯 Railway Setup (10 min)

1. **Sign up** → GitHub login
2. **New Project** → Deploy from GitHub
3. **Select:** `mahima-ministries-platform` repo
4. **Add Service** → GitHub Repo → Root: `backend`
5. **Add Volume:**
   - Mount path: `/app/uploads`
   - Size: 5GB
6. **Environment Variables:**
   ```bash
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=<paste Supabase connection string>
   JWT_SECRET=<generate random 32+ chars>
   CORS_ORIGIN=https://mahimaministries.org
   RAZORPAY_KEY_ID=<your key>
   RAZORPAY_KEY_SECRET=<your secret>
   PAYTM_MID=<your merchant id>
   PAYTM_KEY=<your key>
   PAYTM_WEBSITE=WEBSTAGING
   ADMIN_EMAIL=admin@mahimaministries.org
   ADMIN_PASSWORD=<strong password>
   ```
7. **Generate Domain** → Save URL: `https://xxxx.up.railway.app`
8. **Test:** Visit `https://your-url.up.railway.app/api/health`

### Generate JWT_SECRET (PowerShell):
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

---

## 🎯 Vercel Setup (5 min)

1. **Sign up** → GitHub login
2. **New Project** → Import Git Repository
3. **Select:** `mahima-ministries-platform`
4. **Configure:**
   - Framework: **Vite**
   - Root: **frontend**
   - Build: `npm run build`
   - Output: `dist`
5. **Environment Variables:**
   ```bash
   VITE_API_URL=https://your-railway-url.up.railway.app
   VITE_RAZORPAY_KEY_ID=<your public key>
   VITE_APP_NAME=Mahima Ministries
   VITE_APP_URL=https://mahimaministries.org
   ```
6. **Deploy** → Save URL: `https://xxxx.vercel.app`

---

## 🧪 Testing Checklist (10 min)

Visit: `https://your-project.vercel.app`

- [ ] Homepage loads
- [ ] Click all navigation links
- [ ] Try Sign Up (create test account)
- [ ] Try Login
- [ ] Make test donation (use `4111 1111 1111 1111`)
- [ ] Login as admin (ADMIN_EMAIL/ADMIN_PASSWORD)
- [ ] Upload test report in admin panel
- [ ] Download report from Reports page
- [ ] Check browser console (F12) - no red errors

**If errors → Fix in Railway/Vercel env variables → Redeploy → Test again**

---

## 🌐 GoDaddy DNS Update (2 min)

**⚠️ This replaces old website with new website**

1. **GoDaddy** → My Products → Domains → **DNS**
2. **Backup current records** (screenshot)
3. **Update/Add:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | 600 |
| CNAME | www | `cname.vercel-dns.com` | 600 |

4. **Save** → Wait 10-60 minutes

---

## ✅ Final Verification (after DNS propagation)

1. Visit: **https://mahimaministries.org**
2. See **NEW website** (not old one)
3. Green padlock 🔒 (SSL working)
4. Test all features again
5. Test on mobile phone
6. Test from different browser

---

## 🎉 Success!

**Old website → Replaced**
**New website → Live on mahimaministries.org**
**Monthly cost → ₹400-650 (₹0 after GCS migration)**

---

## 🆘 Quick Troubleshooting

### "Failed to fetch" errors
→ Check `VITE_API_URL` in Vercel
→ Check `CORS_ORIGIN` in Railway

### Database connection failed
→ Verify `DATABASE_URL` in Railway = Supabase URL

### Domain not updating
→ Wait longer (can take up to 24 hours)
→ Clear browser cache
→ Check: https://dnschecker.org/#A/mahimaministries.org

### Reports not uploading
→ Verify Railway volume mounted at `/app/uploads`
→ Check Railway logs

---

## 📊 Cost Summary

| Service | Monthly | Annual |
|---------|---------|--------|
| Vercel | ₹0 | ₹0 |
| Supabase | ₹0 | ₹0 |
| Railway | ₹400-650 | ₹4,800-7,800 |
| **Total** | **₹400-650** | **₹4,800-7,800** |

**After GCS + Nonprofit Credits:** ₹0/month for 1-2 years

---

## 🔗 Useful Links

- **Railway Dashboard:** https://railway.app/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard
- **DNS Checker:** https://dnschecker.org/
- **Deployment Guide:** See DEPLOYMENT_GUIDE.md (detailed steps)

---

**Ready to deploy? Start with Supabase! 🚀**
