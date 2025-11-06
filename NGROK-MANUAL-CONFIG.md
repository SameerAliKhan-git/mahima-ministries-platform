# 🚀 Manual ngrok Configuration Steps

## Step 1: Start ngrok Tunnels

Open **TWO NEW PowerShell windows** and run these commands:

### Window 1 - Frontend Tunnel:
```powershell
ngrok http 5173
```

### Window 2 - Backend Tunnel:
```powershell
ngrok http 3000
```

## Step 2: Copy Your URLs

From each ngrok window, copy the **HTTPS** URL (it will look like this):

```
Forwarding    https://abc123-456-789.ngrok-free.app -> http://localhost:5173
```

**Frontend URL Example:** `https://abc123-456-789.ngrok-free.app` (from port 5173)
**Backend URL Example:** `https://def456-789-012.ngrok-free.app` (from port 3000)

## Step 3: Configure Backend

Edit `backend/.env` and update this line:

```env
FRONTEND_URL=https://YOUR-FRONTEND-URL-HERE.ngrok-free.app
```

Replace `YOUR-FRONTEND-URL-HERE` with your actual frontend ngrok URL (the one from port 5173).

## Step 4: Configure Frontend

Create a new file `frontend/.env.local` with this content:

```env
VITE_API_URL=https://YOUR-BACKEND-URL-HERE.ngrok-free.app
```

Replace `YOUR-BACKEND-URL-HERE` with your actual backend ngrok URL (the one from port 3000).

## Step 5: Restart Your Servers

1. Stop the current servers (press `Ctrl+C` in the terminal running START-ALL.bat)
2. Start them again:
   ```powershell
   START-ALL.bat
   ```
   Or:
   ```powershell
   npm run dev
   ```

## Step 6: Share Your Website!

Now you can share your **frontend ngrok URL** with anyone!

Example: `https://abc123-456-789.ngrok-free.app`

They can access your Mahima Ministries platform from:
- Any computer
- Mobile phones
- Tablets
- Anywhere in the world

## 🎯 Quick Visual Guide:

```
┌─────────────────────────────────────────┐
│  Terminal 1: START-ALL.bat              │
│  ├── Frontend: localhost:5173           │
│  └── Backend:  localhost:3000           │
└─────────────────────────────────────────┘
            ▼
┌─────────────────────────────────────────┐
│  Terminal 2: ngrok http 5173            │
│  └── https://abc123.ngrok-free.app      │ ← Frontend URL (share this!)
└─────────────────────────────────────────┘
            ▼
┌─────────────────────────────────────────┐
│  Terminal 3: ngrok http 3000            │
│  └── https://def456.ngrok-free.app      │ ← Backend URL (for config)
└─────────────────────────────────────────┘
```

## ✅ Verification Checklist:

- [ ] ngrok tunnels are running (2 separate windows)
- [ ] Copied frontend URL from port 5173 tunnel
- [ ] Copied backend URL from port 3000 tunnel
- [ ] Updated `backend/.env` with frontend URL
- [ ] Created `frontend/.env.local` with backend URL
- [ ] Restarted servers with START-ALL.bat
- [ ] Tested frontend URL in browser
- [ ] Tested form submission works

## 🆘 Troubleshooting:

**Problem:** Can't see ngrok URLs
- **Solution:** Look for the line that says "Forwarding" in the ngrok window

**Problem:** ngrok says "Session Expired" or "ERR_NGROK_3200"
- **Solution:** Sign up for free account at https://dashboard.ngrok.com/signup
- Then run: `ngrok config add-authtoken YOUR_TOKEN_HERE`

**Problem:** Forms don't submit or get CORS errors
- **Solution:** Make sure you updated BOTH backend/.env AND frontend/.env.local
- Restart servers after updating

**Problem:** ngrok URLs keep changing
- **Solution:** This is normal for free tier. URLs change every restart.
- Upgrade to paid tier ($8/month) for permanent custom URLs

## 📱 Testing on Mobile:

1. Make sure ngrok tunnels are running
2. Open your phone's browser
3. Navigate to your frontend ngrok URL
4. Test all features!

---

**Need help?** See NGROK-SETUP-GUIDE.md for more details.
