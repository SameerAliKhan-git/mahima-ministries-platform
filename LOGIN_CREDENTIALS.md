# 🔐 Mahima Ministries - Login System Documentation

## 📋 Table of Contents
1. [Test Credentials](#test-credentials)
2. [Features Overview](#features-overview)
3. [User Roles](#user-roles)
4. [Authentication Flow](#authentication-flow)
5. [API Endpoints](#api-endpoints)
6. [Setup Instructions](#setup-instructions)
7. [Testing Guide](#testing-guide)

---

## 🔑 Test Credentials

### Admin Account
```
Email: admin@mahima.org
Password: Admin@123456
Role: ADMIN
Dashboard: /admin/dashboard
```

### Donor Account 1
```
Email: john.doe@example.com
Password: Donor@123456
Role: DONOR
Dashboard: /donor/dashboard
```

### Donor Account 2
```
Email: jane.smith@example.com
Password: Donor@123456
Role: DONOR
Dashboard: /donor/dashboard
```

> **Note:** These credentials will work once you run the database seed command (see Setup Instructions below)

---

## ✨ Features Overview

### 1. **Complete Authentication System**
- ✅ User Registration (with email and phone validation)
- ✅ User Login (with JWT tokens)
- ✅ Forgot Password (email-based reset)
- ✅ Reset Password (with token validation)
- ✅ Email Verification (optional)
- ✅ Auto-redirect based on user role
- ✅ Protected routes with middleware
- ✅ Session management (Access & Refresh tokens)
- ✅ Logout functionality

### 2. **Admin Dashboard** (`/admin/dashboard`)
- ✅ Overview statistics (Donations, Amount, Donors, Campaigns)
- ✅ Monthly revenue tracking
- ✅ Growth metrics
- ✅ Quick action buttons
- ✅ Tabbed interface (Overview, Donations, Users, Reports)
- ✅ Real-time notifications
- ✅ User management access
- ✅ Donations management access

### 3. **Donor Dashboard** (`/donor/dashboard`)
- ✅ Personal donation statistics
- ✅ Impact score calculation
- ✅ Complete donation history
- ✅ Status tracking (Completed, Pending, Failed)
- ✅ Recurring donation indicators
- ✅ Quick donate button
- ✅ Beautiful data visualization

### 4. **User Management** (`/admin/users`)
- ✅ Complete user list with search
- ✅ Filter by role (Admin, Donor)
- ✅ Edit user functionality
- ✅ Delete user functionality
- ✅ Add new user
- ✅ Role badges and status indicators
- ✅ User details (name, email, phone, join date)

### 5. **Donations Management** (`/admin/donations`)
- ✅ All donations list with search
- ✅ Filter by status (All, Completed, Pending, Failed)
- ✅ Statistics dashboard
- ✅ Export to CSV functionality
- ✅ Donation details (donor, campaign, amount, method, type, status)
- ✅ Color-coded status badges

---

## 👥 User Roles

### ADMIN
- Full access to admin dashboard
- Can view and manage all users
- Can view and manage all donations
- Can generate reports
- Can manage campaigns
- Can access all administrative features

### DONOR
- Access to personal donor dashboard
- Can view own donation history
- Can make new donations
- Can update profile information
- Limited to donor-specific features

### PARTNER (Future)
- Corporate partnership dashboard
- Partnership management
- Custom reporting for partners

---

## 🔄 Authentication Flow

### Registration Flow
1. User visits `/register`
2. Fills in registration form (First Name, Last Name, Email, Phone, Password)
3. System validates input:
   - Email format validation
   - Phone number validation (Indian format)
   - Password strength check (min 8 chars)
   - Password confirmation match
4. Creates user account with DONOR role by default
5. Sends verification email (optional)
6. Auto-login and redirect to `/donor/dashboard`

### Login Flow
1. User visits `/login`
2. Enters email and password
3. System validates credentials
4. Generates JWT tokens (Access + Refresh)
5. Stores tokens in localStorage
6. Redirects based on role:
   - ADMIN → `/admin/dashboard`
   - DONOR → `/donor/dashboard`

### Forgot Password Flow
1. User clicks "Forgot Password" on login page
2. Enters email address at `/forgot-password`
3. System sends password reset email with token
4. User receives email with reset link
5. Clicks link to visit `/reset-password?token=xxx`
6. Enters new password (twice for confirmation)
7. System validates token and updates password
8. Auto-redirect to login page
9. User logs in with new password

### Protected Routes
- All dashboard routes require authentication
- Middleware checks for valid JWT token
- Expired tokens trigger auto-logout
- Invalid requests redirect to `/login`

---

## 🛠️ API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password with token
POST   /api/auth/refresh           - Refresh access token
POST   /api/auth/logout            - Logout user
GET    /api/auth/me                - Get current user info
POST   /api/auth/verify-email      - Verify email address
```

### Admin
```
GET    /api/admin/dashboard-stats  - Get admin dashboard statistics
GET    /api/admin/users            - Get all users (with filters)
GET    /api/admin/users/:id        - Get specific user
POST   /api/admin/users            - Create new user
PUT    /api/admin/users/:id        - Update user
DELETE /api/admin/users/:id        - Delete user
GET    /api/admin/donations        - Get all donations (with filters)
GET    /api/admin/campaigns        - Get all campaigns
POST   /api/admin/reports          - Generate reports
```

### Donor
```
GET    /api/donations/my-donations - Get current user's donations
POST   /api/donations              - Create new donation
GET    /api/donations/:id          - Get donation details
PUT    /api/donations/:id          - Update donation
```

---

## 🚀 Setup Instructions

### 1. Environment Setup

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mahima_db"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"

# Email Configuration (for forgot password)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
FROM_EMAIL="noreply@mahima.org"

# Frontend URL (for email links)
FRONTEND_URL="http://localhost:5173"

# Server
PORT=3000
NODE_ENV="development"
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### 2. Database Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database with test users
npx prisma db seed
```

### 3. Start Backend Server

```bash
# In backend directory
npm run dev

# Server will start on http://localhost:3000
```

### 4. Start Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# App will open on http://localhost:5173
```

### 5. Install Missing Dependencies

If you get any errors, install these:

#### Backend
```bash
npm install @radix-ui/react-tabs
```

#### Frontend
```bash
npm install @radix-ui/react-tabs lucide-react
```

---

## 🧪 Testing Guide

### Test Scenario 1: Admin Login
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `admin@mahima.org`
   - Password: `Admin@123456`
3. Click "Sign In"
4. Should redirect to `/admin/dashboard`
5. Verify you see:
   - Total Donations count
   - Total Amount
   - Total Donors
   - Active Campaigns
   - Quick action buttons
   - Tabs for Overview, Donations, Users, Reports

### Test Scenario 2: Donor Login
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `john.doe@example.com`
   - Password: `Donor@123456`
3. Click "Sign In"
4. Should redirect to `/donor/dashboard`
5. Verify you see:
   - Total Donated amount
   - Total Donations count
   - Impact Score
   - Donation history table
   - Make a Donation button

### Test Scenario 3: Forgot Password Flow
1. Go to `http://localhost:5173/login`
2. Click "Forgot password?"
3. Enter email: `john.doe@example.com`
4. Click "Send Reset Link"
5. Check email inbox (or check backend logs for reset link)
6. Click the reset link in email
7. Should redirect to `/reset-password?token=xxx`
8. Enter new password (twice)
9. Click "Reset Password"
10. Should show success message
11. Redirects to login page
12. Login with new password

### Test Scenario 4: User Management (Admin)
1. Login as admin
2. Click "Manage Users" from dashboard
3. Should navigate to `/admin/users`
4. Verify you see:
   - List of all users
   - Search functionality
   - Filter buttons (All, Donors, Admins)
   - User details (name, email, phone, role, status, join date)
   - Edit and Delete buttons

### Test Scenario 5: Donations Management (Admin)
1. Login as admin
2. Click "View All Donations" from dashboard
3. Should navigate to `/admin/donations`
4. Verify you see:
   - Statistics cards (Total, Completed, Pending, Failed, Total Amount)
   - Search and filter options
   - Donations table with all details
   - Export CSV button

### Test Scenario 6: Registration
1. Go to `http://localhost:5173/register`
2. Fill in all fields:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: +91 98765 43210
   - Password: Test@123456
   - Confirm Password: Test@123456
3. Click "Create Account"
4. Should auto-login and redirect to `/donor/dashboard`

### Test Scenario 7: Logout
1. From any dashboard
2. Click "Logout" button
3. Should clear tokens from localStorage
4. Should redirect to `/login`
5. Verify can't access protected routes without logging in

### Test Scenario 8: Protected Routes
1. Logout or clear localStorage
2. Try to access `/admin/dashboard` directly
3. Should redirect to `/login`
4. Try to access `/donor/dashboard` directly
5. Should redirect to `/login`

---

## 🔧 Troubleshooting

### Error: "Property 'env' does not exist on type 'ImportMeta'"
**Solution:** The `vite-env.d.ts` file has been created. Restart VS Code or TypeScript server.

### Error: "Cannot find module '@/components/ui/tabs'"
**Solution:** The tabs component has been created. Make sure you have:
```bash
npm install @radix-ui/react-tabs
```

### Error: Database connection failed
**Solution:** 
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env file
3. Run `npx prisma migrate dev`

### Error: Email not sending
**Solution:**
1. Check SMTP configuration in .env
2. For Gmail, use App-Specific Password
3. Check backend logs for email errors

### Error: 401 Unauthorized
**Solution:**
1. Check if JWT_SECRET is set in backend .env
2. Clear localStorage and login again
3. Check if token is expired

---

## 📱 Pages Overview

### Public Pages (No Auth Required)
- `/` - Home Page
- `/about-us` - About Us
- `/programmes` - Programmes
- `/contact` - Contact
- `/login` - Login Page
- `/register` - Registration Page
- `/forgot-password` - Forgot Password Page
- `/reset-password` - Reset Password Page (requires token)
- And all other public pages...

### Protected Pages (Auth Required)
#### Donor Pages
- `/donor/dashboard` - Donor Dashboard
- `/donate` - Make Donation

#### Admin Pages
- `/admin/dashboard` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/donations` - Donations Management
- `/admin/campaigns` - Campaigns Management (future)
- `/admin/reports` - Reports (future)

---

## 🎨 Design System

### Color Scheme
- **Admin Theme:** Orange (#F97316) to Amber (#FBBF24) gradients
- **Donor Theme:** Purple (#9333EA) to Emerald (#10B981) gradients
- **Success:** Emerald (#10B981)
- **Error:** Red (#EF4444)
- **Warning:** Amber (#FBBF24)

### UI Components (shadcn/ui)
- Button
- Input
- Card
- Badge
- Table
- Alert
- Tabs
- Select
- Label

### Icons (Lucide React)
- All icons from lucide-react library
- Consistent sizing and styling

---

## 🔐 Security Features

1. **Password Hashing:** BCrypt with salt rounds
2. **JWT Tokens:** Access (15min) + Refresh (7days)
3. **Token Storage:** localStorage (client-side)
4. **Protected Routes:** Middleware authentication
5. **Input Validation:** Zod schemas on backend
6. **Email Verification:** Optional verification flow
7. **Password Reset:** Time-limited tokens (1 hour)
8. **CORS:** Configured for frontend origin
9. **Rate Limiting:** API rate limiting (future)
10. **SQL Injection:** Prisma ORM protection

---

## 📞 Support

For issues or questions:
- Check this documentation first
- Review error messages in browser console
- Check backend logs
- Verify environment variables
- Ensure all dependencies are installed

---

**Last Updated:** November 11, 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready
