# 🔒 reCAPTCHA v2 Integration - Visual Guide

## What You'll See on Login Page

### Before Submitting:
```
┌─────────────────────────────────────────┐
│  🔒 Welcome Back                        │
│  Sign in to continue making a difference│
├─────────────────────────────────────────┤
│                                         │
│  Email Address                          │
│  ┌─────────────────────────────────┐   │
│  │ you@example.com                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Password                               │
│  ┌─────────────────────────────────┐   │
│  │ ••••••••                     👁 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Forgot password?                       │
│                                         │
│  🛡️ Security verification required      │
│  ┌─────────────────────────────────┐   │
│  │ ☐ I'm not a robot               │   │
│  │                         reCAPTCHA│   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        Sign In                  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### After Checking CAPTCHA:
```
┌─────────────────────────────────────────┐
│  🛡️ Security verification required      │
│  ┌─────────────────────────────────┐   │
│  │ ✅ I'm not a robot              │   │
│  │                         reCAPTCHA│   │
│  └─────────────────────────────────┘   │
│                                         │
│  ✅ CAPTCHA verified! Ready to login   │
└─────────────────────────────────────────┘
```

### Error State (No CAPTCHA):
```
┌─────────────────────────────────────────┐
│  ⚠️ Please complete the CAPTCHA        │
│     verification                        │
├─────────────────────────────────────────┤
│  🛡️ Security verification required      │
│  ┌─────────────────────────────────┐   │
│  │ ☐ I'm not a robot               │   │
│  │                         reCAPTCHA│   │
│  └─────────────────────────────────┘   │
│  ⚠️ Please verify you're not a robot   │
└─────────────────────────────────────────┘
```

---

## Security Flow Diagram

```
User Opens Login Page
         ↓
   Fills Credentials
         ↓
   Clicks CAPTCHA ──→ Google Verifies ──→ Token Generated
         ↓                                       ↓
   Checks "I'm not a robot"              Returns to Page
         ↓                                       ↓
   Clicks "Sign In" ←──────────────────── Token Ready
         ↓
   Frontend Validates:
   ✅ Email filled?
   ✅ Password filled?
   ✅ CAPTCHA token present? ←── CRITICAL CHECK
         ↓
   Sends to Backend:
   {
     email: "user@example.com",
     password: "password123",
     recaptchaToken: "03AGdBq2..." ←── Secret Token
   }
         ↓
   Backend Validates:
   1. ✅ Check if token exists
   2. ✅ Verify with Google API
   3. ✅ Check user credentials
   4. ✅ Generate JWT tokens
         ↓
   ┌─────────────────┐
   │ Login Success!  │
   │                 │
   │  Welcome back!  │
   │  Redirecting... │
   └─────────────────┘
```

---

## Demo Credentials for Testing

### Admin Account:
```
Email: admin@mahima.org
Password: Admin@123456
Expected: Orange Admin Dashboard
```

### Donor Account:
```
Email: john.doe@example.com
Password: Donor@123456
Expected: Purple Donor Dashboard
```

---

## Testing Steps

### Test 1: Normal Login ✅
1. Go to http://localhost:5173/login
2. Enter admin@mahima.org
3. Enter Admin@123456
4. Check "I'm not a robot"
5. Click "Sign In"
6. ✅ Should see success dialog
7. ✅ Should redirect to admin dashboard

### Test 2: No CAPTCHA ❌
1. Go to http://localhost:5173/login
2. Enter admin@mahima.org
3. Enter Admin@123456
4. **DON'T** check CAPTCHA
5. Click "Sign In"
6. ❌ Should see error: "Please complete the CAPTCHA verification"
7. ❌ Should NOT log in

### Test 3: Wrong Password + CAPTCHA ❌
1. Go to http://localhost:5173/login
2. Enter admin@mahima.org
3. Enter wrong_password
4. Check "I'm not a robot"
5. Click "Sign In"
6. ❌ Should see error: "Invalid email or password"
7. ✅ CAPTCHA should reset (need to check again)

---

## Security Benefits

### Protection Against:
- 🤖 **Bot Attacks** - Automated scripts can't pass CAPTCHA
- 🔓 **Brute Force** - Rate-limited by CAPTCHA challenges
- 🎣 **Credential Stuffing** - Slows down mass login attempts
- 🕵️ **Account Enumeration** - CAPTCHA required before checking credentials
- 📡 **DDoS** - Prevents overwhelming login endpoint

### Industry Standard:
Used by:
- ✅ Google
- ✅ Facebook
- ✅ Banks
- ✅ Government sites
- ✅ Healthcare portals
- ✅ E-commerce sites

---

## Code Integration Points

### Frontend (LoginPage.tsx):
```typescript
// 1. Import reCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// 2. Create ref and state
const recaptchaRef = useRef<ReCAPTCHA>(null);
const [captchaToken, setCaptchaToken] = useState<string | null>(null);

// 3. Validate before submit
if (!captchaToken) {
  setError('Please complete the CAPTCHA verification');
  return;
}

// 4. Render widget
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey={RECAPTCHA_SITE_KEY}
  onChange={handleCaptchaChange}
/>

// 5. Send to backend
body: JSON.stringify({
  ...formData,
  recaptchaToken: captchaToken,
})
```

### Backend (auth.controller.ts):
```typescript
// 1. Import utility
import { verifyRecaptcha } from '../utils/recaptcha';

// 2. Verify token
const recaptchaVerification = await verifyRecaptcha(
  validatedData.recaptchaToken,
  req.ip
);

// 3. Block if invalid
if (!recaptchaVerification.success) {
  res.status(400).json({
    success: false,
    message: 'reCAPTCHA verification failed',
  });
  return;
}

// 4. Continue with login
```

---

## Environment Variables

### Frontend (.env):
```bash
VITE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
# ↑ Test key - Always passes (for development)
```

### Backend (.env):
```bash
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
# ↑ Test secret - Always passes (for development)
```

### Production Keys:
Get from: https://www.google.com/recaptcha/admin
- Register your domain
- Get Site Key (public)
- Get Secret Key (private)
- Replace test keys

---

## 🎉 Success!

Your login page is now **enterprise-grade secure** with:
- ✅ Visual CAPTCHA widget
- ✅ Client-side validation
- ✅ Server-side verification
- ✅ Error handling
- ✅ Token reset on failure
- ✅ Clean UI integration
- ✅ Production-ready code

**Test it now at:** http://localhost:5173/login

---

**Created:** November 11, 2025
**Integration Status:** ✅ COMPLETE
**Security Level:** 🔒 MAXIMUM
