# 🚀 Quick Start Guide - Mahima Ministries Platform

## ⚡ Get Started in 5 Minutes!

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend  
```bash
cd frontend
npm install
npm install @radix-ui/react-tabs
```

### Step 2: Setup Environment Files

#### Backend `.env` (create in `/backend` folder)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mahima_db"
JWT_SECRET="mahima-super-secret-jwt-key-2024"
JWT_REFRESH_SECRET="mahima-super-secret-refresh-key-2024"
PORT=3000
NODE_ENV="development"

# Email (Optional - for forgot password)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FROM_EMAIL="noreply@mahima.org"
FRONTEND_URL="http://localhost:5173"
```

#### Frontend `.env` (create in `/frontend` folder)
```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
```

### Step 3: Setup Database

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed with test data
npx prisma db seed
```

You should see:
```
========================================
📝 Test Credentials
========================================

👨‍💼 ADMIN ACCOUNT:
   Email: admin@mahima.org
   Password: Admin@123456
   Dashboard: /admin/dashboard

👤 DONOR ACCOUNT 1:
   Email: john.doe@example.com
   Password: Donor@123456
   Dashboard: /donor/dashboard

👤 DONOR ACCOUNT 2:
   Email: jane.smith@example.com
   Password: Donor@123456
   Dashboard: /donor/dashboard

========================================
```

### Step 4: Start Servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ Backend running on: http://localhost:3000

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running on: http://localhost:5173

### Step 5: Login and Test!

1. Open browser: `http://localhost:5173`
2. Click **"Login"** in header
3. Use test credentials:

#### Test as Admin:
```
Email: admin@mahima.org
Password: Admin@123456
```
✅ You'll see: Admin Dashboard with statistics, user management, donations management

#### Test as Donor:
```
Email: john.doe@example.com
Password: Donor@123456
```
✅ You'll see: Donor Dashboard with donation history and personal stats

---

## 🎯 Test All Features

### ✅ Registration
1. Go to `/register`
2. Fill form:
   - First Name: `Test`
   - Last Name: `User`
   - Email: `test@example.com`
   - Phone: `+91 98765 43210`
   - Password: `Test@123456`
3. Click **Create Account**
4. ✅ Auto-login → Donor Dashboard

### ✅ Forgot Password
1. Go to `/login`
2. Click **"Forgot password?"**
3. Enter email: `john.doe@example.com`
4. Click **"Send Reset Link"**
5. Check console/email for reset link
6. Click link → Reset password page
7. Enter new password
8. ✅ Success → Login with new password

### ✅ Admin Features
Login as admin, then test:
- `/admin/dashboard` - View statistics
- `/admin/users` - Manage all users
- `/admin/donations` - View all donations
- Search and filter functionality
- User role badges
- Status indicators

### ✅ Donor Features  
Login as donor, then test:
- `/donor/dashboard` - View personal stats
- Donation history table
- Impact score
- Make donation button
- Status tracking

---

## 🔧 Troubleshooting

### Database Issues
```bash
# Reset database
cd backend
npx prisma migrate reset
npx prisma db seed
```

### Port Already in Use
```bash
# Backend (change PORT in .env)
PORT=3001

# Frontend (use different port)
npm run dev -- --port 5174
```

### Module Not Found
```bash
# Frontend
npm install @radix-ui/react-tabs lucide-react

# Backend  
npm install
npx prisma generate
```

### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → TypeScript: Restart TS Server
```

---

## 📂 Project Structure

```
mahima-ministries-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth, error handling
│   │   ├── routes/          # API endpoints
│   │   └── app.ts          # Express app
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Test data
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── auth/       # Login, Register, Forgot/Reset Password
│   │   │   ├── admin/      # Admin Dashboard, Users, Donations
│   │   │   ├── donor/      # Donor Dashboard
│   │   │   └── public/     # Public pages
│   │   ├── components/
│   │   │   ├── layout/     # Header, Footer
│   │   │   └── ui/         # Button, Card, Input, etc.
│   │   └── App.tsx         # Routes
│   └── .env
│
└── LOGIN_CREDENTIALS.md    # Full documentation
```

---

## 🎨 Key Pages

### Public (No Login Required)
- `/` - Home
- `/about-us` - About
- `/contact` - Contact
- `/login` - Login
- `/register` - Register
- `/forgot-password` - Forgot Password
- `/reset-password?token=xxx` - Reset Password

### Protected (Login Required)
**Admin:**
- `/admin/dashboard` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/donations` - Donations Management

**Donor:**
- `/donor/dashboard` - Donor Dashboard
- `/donate` - Make Donation

---

## 🔐 Test Credentials Summary

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| Admin | admin@mahima.org | Admin@123456 | /admin/dashboard |
| Donor | john.doe@example.com | Donor@123456 | /donor/dashboard |
| Donor | jane.smith@example.com | Donor@123456 | /donor/dashboard |

---

## 📞 Need Help?

1. Check `LOGIN_CREDENTIALS.md` for detailed documentation
2. Review browser console for errors
3. Check backend terminal for API errors
4. Verify `.env` files are configured correctly
5. Ensure database is running and seeded

---

## ✨ What's Working

✅ User Registration with validation
✅ User Login with JWT tokens
✅ Forgot Password flow
✅ Reset Password flow
✅ Admin Dashboard with statistics
✅ Donor Dashboard with history
✅ User Management (search, filter, CRUD)
✅ Donations Management (search, filter, export)
✅ Protected Routes
✅ Role-based access control
✅ Auto-redirect based on role
✅ Logout functionality
✅ Responsive design
✅ Beautiful UI with gradients
✅ Form validation
✅ Error handling
✅ Success messages

---

**Ready to go! 🚀**

Start both servers and login with the credentials above!
