# 🌐 ngrok Setup Guide - Remote Access to Mahima Ministries Platform

## What is ngrok?
ngrok creates a secure tunnel to your local development server, allowing you to:
- Share your website with clients/stakeholders remotely
- Test on mobile devices without being on the same network
- Demo your platform from anywhere in the world
- Test webhooks and third-party integrations

## 📋 Prerequisites

✅ ngrok installed globally (already done!)
✅ Your platform running locally (frontend + backend)

## 🚀 Quick Start

### Step 1: Start Your Platform

```bash
# Option 1: Use the unified startup script
START-ALL.bat

# Option 2: Use npm
npm run dev
```

Wait for both servers to start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Step 2: Create ngrok Tunnels

Open **TWO NEW TERMINAL WINDOWS** (keep your platform running in the first terminal):

**Terminal 2 - Expose Frontend:**
```bash
ngrok http 5173
```

**Terminal 3 - Expose Backend:**
```bash
ngrok http 3000
```

### Step 3: Get Your Public URLs

ngrok will display something like:

```
Forwarding    https://abc123.ngrok-free.app -> http://localhost:5173
```

You'll get TWO URLs:
- **Frontend URL**: https://[random].ngrok-free.app (port 5173)
- **Backend URL**: https://[random].ngrok-free.app (port 3000)

### Step 4: Update Frontend Configuration

Your frontend needs to know the backend's public URL.

**Option A: Environment Variable (Recommended)**

Create `frontend/.env.local`:
```env
VITE_API_URL=https://[your-backend-ngrok-url].ngrok-free.app
```

**Option B: Update API Service**

Edit `frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://[your-backend-ngrok-url].ngrok-free.app';
```

### Step 5: Restart Frontend

Stop the frontend (Ctrl+C) and restart:
```bash
cd frontend
npm run dev
```

### Step 6: Update Backend CORS

Edit `backend/.env`:
```env
FRONTEND_URL=https://[your-frontend-ngrok-url].ngrok-free.app
```

Restart the backend:
```bash
cd backend
npm run dev
```

## 🎯 Using Your Remote Platform

1. **Share the frontend URL** with anyone:
   - Example: `https://abc123.ngrok-free.app`
   
2. **They can access your platform** from:
   - Any computer/laptop
   - Mobile phones (Android/iOS)
   - Tablets
   - Different networks/locations

3. **Features that work remotely:**
   - ✅ All 31+ pages
   - ✅ Contact form submissions
   - ✅ Partnership applications
   - ✅ PhoneInput with 201 countries
   - ✅ Email notifications (if SMTP configured)
   - ✅ Database interactions

## 🔐 ngrok Free vs Paid

### Free Tier (What You Have Now):
- ✅ Unlimited tunnels (one at a time)
- ✅ Random URLs that change each restart
- ✅ HTTPS support
- ⚠️ URLs expire when ngrok stops
- ⚠️ "ngrok warning" banner on pages

### Paid Tier ($8/month):
- Custom subdomains (e.g., `mahima-ministries.ngrok.app`)
- Reserved domains that don't change
- No warning banner
- Multiple tunnels simultaneously
- More connection limits

**Sign up at:** https://ngrok.com/

## 📱 Testing on Mobile

1. Start ngrok tunnels (both frontend & backend)
2. Open your **frontend ngrok URL** on your phone's browser
3. Test all features:
   - Navigation
   - Contact form
   - PhoneInput dropdown
   - WhatsApp button
   - Form submissions

## 🛠️ Troubleshooting

### Problem: "ERR_NGROK_3200" or "Tunnel not found"
**Solution:** ngrok free tier only allows one tunnel at a time per account.
- Sign up for ngrok account: https://dashboard.ngrok.com/signup
- Get your authtoken: https://dashboard.ngrok.com/get-started/your-authtoken
- Run: `ngrok config add-authtoken YOUR_TOKEN_HERE`

### Problem: Frontend can't connect to backend
**Solution:** 
- Make sure both tunnels are running
- Update `VITE_API_URL` with backend ngrok URL
- Restart frontend after updating .env.local

### Problem: CORS errors
**Solution:**
- Update `backend/.env` FRONTEND_URL with frontend ngrok URL
- Restart backend

### Problem: Forms submit but no emails sent
**Solution:**
- ngrok doesn't affect email functionality
- Check `backend/.env` SMTP_PASSWORD is configured
- See EMAIL-SETUP-GUIDE.md

### Problem: ngrok URL keeps changing
**Solution:**
- Free tier generates random URLs on each restart
- Upgrade to paid tier for custom domains
- Alternative: Use `ngrok http 5173 --subdomain=your-name` (requires paid)

## 🎬 Demo Workflow

**For Client Presentations:**

1. **Preparation (5 minutes before demo):**
   ```bash
   # Terminal 1: Start your platform
   npm run dev
   
   # Terminal 2: Expose frontend
   ngrok http 5173
   
   # Terminal 3: Expose backend
   ngrok http 3000
   ```

2. **Update configurations** with ngrok URLs

3. **Restart servers** with new configuration

4. **Share frontend URL** with your client:
   - Send via WhatsApp/Email
   - Share screen and show them accessing it
   - They can test on their devices

5. **Demo features:**
   - Homepage with all information
   - Contact form (test submission)
   - PhoneInput with 201 countries
   - Partnership application
   - Mobile responsiveness

## 🔄 Quick Reference Commands

```bash
# Install ngrok (already done)
npm install -g ngrok

# Authenticate ngrok (optional, removes some limits)
ngrok config add-authtoken YOUR_TOKEN_HERE

# Start frontend tunnel
ngrok http 5173

# Start backend tunnel
ngrok http 3000

# Start tunnel with custom label (easier to identify)
ngrok http 5173 --log=stdout

# Check ngrok version
ngrok version

# View active tunnels in web interface
# Open: http://localhost:4040
```

## 🌟 Pro Tips

1. **Save Your URLs**: Copy ngrok URLs to a text file during demos
2. **Use Labels**: Run `ngrok http 5173 --log=stdout` to see all requests
3. **Monitor Traffic**: Visit `http://localhost:4040` to see live traffic
4. **Test First**: Always test the ngrok URLs yourself before sharing
5. **Backup Plan**: Have screenshots ready in case of connection issues

## 📞 Support

If you encounter issues:
- ngrok Documentation: https://ngrok.com/docs
- ngrok Community: https://github.com/inconshreveable/ngrok/discussions
- Mahima Ministries Platform: mahimaministriesindia@gmail.com

---

**Made with ❤️ for Mahima Ministries**
