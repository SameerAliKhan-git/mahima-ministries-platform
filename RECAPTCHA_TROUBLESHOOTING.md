# reCAPTCHA "Invalid Site Key" Troubleshooting Guide

## Current Configuration
- **Site Key**: `6LdA_AgsAAAAALRivd_OcSo0WIZfKv6sz7ZezE7b`
- **Secret Key**: `6LdA_AgsAAAAACNH-gxUYRxb3vHX9n1xl5ZSsLFH`
- **Current Domain**: `localhost:5173`

## The Problem: "ERROR for site owner: Invalid site key"

This error occurs when:
1. The site key doesn't exist
2. The site key is for a different domain
3. The domain is not whitelisted in Google reCAPTCHA settings
4. Browser is caching old keys

## SOLUTION STEPS

### Step 1: Verify Google reCAPTCHA Admin Settings

1. **Go to Google reCAPTCHA Admin Console**:
   - URL: https://www.google.com/recaptcha/admin
   - Login with your Google account

2. **Find Your Site**:
   - Look for the site with key: `6LdA_AgsAAAAALRivd_OcSo0WIZfKv6sz7ZezE7b`
   
3. **Check Domain Settings**:
   - Click on the site name/key
   - Under "Domains" section, you MUST have:
     ```
     localhost
     ```
   - If not present, click "+" and add: `localhost`
   - Click "Save"

4. **Verify reCAPTCHA Type**:
   - Make sure it's **reCAPTCHA v2** with "I'm not a robot" Checkbox
   - NOT v3 or invisible

### Step 2: Clear ALL Caches

#### A. Clear Browser Cache (CRITICAL)
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

OR

1. Open Browser Settings
2. Privacy → Clear Browsing Data
3. Select "Cached images and files"
4. Clear data

#### B. Clear Vite Cache
In your terminal, run:
```powershell
cd "d:\MM CusrtoṁDemo\New folder\frontend"
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```

### Step 3: Restart Servers

```powershell
# Kill all Node processes
taskkill /F /IM node.exe /T

# Start frontend (new terminal)
cd "d:\MM CusrtoṁDemo\New folder\frontend"
npm run dev

# Start backend (new terminal)
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run dev
```

### Step 4: Verify in Browser

1. Open: http://localhost:5173/login
2. Open DevTools Console (F12)
3. Look for the log: `reCAPTCHA Site Key: 6LdA_AgsAAAAALRivd_OcSo0WIZfKv6sz7ZezE7b`
4. Check for any errors in the Console

## Alternative Solution: Check Domain Format

In Google reCAPTCHA admin, try adding domains in different formats:

```
localhost
127.0.0.1
localhost:5173
```

## Still Not Working?

### Option 1: Create a New reCAPTCHA Site
If your current site key has issues:

1. Go to: https://www.google.com/recaptcha/admin/create
2. Create new reCAPTCHA v2 site
3. Add domain: `localhost`
4. Copy the new keys
5. Update frontend/src/pages/auth/LoginPage.tsx with new site key
6. Update backend/.env with new secret key

### Option 2: Use Google Test Keys (Development Only)
For testing purposes ONLY:

**Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
**Secret Key**: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

These keys work on ANY domain including localhost but ALWAYS pass validation.

## Expected Result

When working correctly, you should see:
- ✅ A reCAPTCHA checkbox with Google logo
- ✅ "I'm not a robot" text
- ✅ No red error messages
- ✅ Checkbox becomes checked when clicked
- ✅ Login works after checking the box

## Current File Locations

- Frontend config: `frontend/src/pages/auth/LoginPage.tsx` (line 14-18)
- Backend config: `backend/.env` (RECAPTCHA_SECRET_KEY)
- Frontend env: `frontend/.env` (VITE_RECAPTCHA_SITE_KEY)

## Support

If issue persists after all steps:
1. Screenshot of Google reCAPTCHA admin "Domains" section
2. Browser console errors (F12)
3. Check if the site key is actually yours (you created it)
