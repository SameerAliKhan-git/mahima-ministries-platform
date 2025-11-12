# 🔐 Demo Credentials for Mahima Ministries Platform

## Test Accounts

### 👨‍💼 Admin Account
- **Email:** `admin@mahima.org`
- **Password:** `Admin@123456`
- **Dashboard:** http://localhost:5174/admin/dashboard
- **Features:** Full admin access, user management, donation management, reports

### 👤 Donor Account 1
- **Email:** `john.doe@example.com`
- **Password:** `Donor@123456`
- **Dashboard:** http://localhost:5174/donor/dashboard
- **Profile:** John Doe from Mumbai, Maharashtra

### 👤 Donor Account 2
- **Email:** `jane.smith@example.com`
- **Password:** `Donor@123456`
- **Dashboard:** http://localhost:5174/donor/dashboard
- **Profile:** Jane Smith from Delhi

---

## Quick Start

### 1. Start Backend Server
```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run dev
```
Server will run on: **http://localhost:3000**

### 2. Start Frontend Server
```powershell
cd "d:\MM CusrtoṁDemo\New folder\frontend"
npm run dev
```
Frontend will run on: **http://localhost:5174**

### 3. Access Prisma Studio (Database Management)
```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npx prisma studio
```
Prisma Studio will open on: **http://localhost:5555**

---

## Login Steps

1. **Navigate to Login Page:**
   - Go to http://localhost:5174/login

2. **For Admin Access:**
   - Enter email: `admin@mahima.org`
   - Enter password: `Admin@123456`
   - Click "Sign In"
   - You'll be redirected to `/admin/dashboard`

3. **For Donor Access:**
   - Enter email: `john.doe@example.com` or `jane.smith@example.com`
   - Enter password: `Donor@123456`
   - Click "Sign In"
   - You'll be redirected to `/donor/dashboard`

---

## Features Available

### Admin Dashboard Features
✅ View statistics (donations, amount, donors, campaigns)
✅ Manage users (view, edit, delete)
✅ Manage donations (view, search, filter, export)
✅ View recent activity
✅ Generate reports

### Donor Dashboard Features
✅ View donation history
✅ Make new donations
✅ Track impact score
✅ Update profile
✅ View receipts

---

## Password Visibility
- Click the **Eye icon** (👁️) next to password field to show/hide password
- Both login and register pages have this feature

---

## Sample Data in Database
- **1 Admin User:** admin@mahima.org
- **2 Donor Users:** john.doe@example.com, jane.smith@example.com
- **1 Campaign:** Winter Relief Fund ($50,000 goal, $12,500 raised)
- **2 Donations:** One-time ($8,000) and Recurring monthly ($4,000)
- **1 Partnership Application**
- **1 Contact Inquiry**

---

## Database Management with Prisma Studio

Access http://localhost:5555 to:
- View all users, donations, campaigns
- Edit data directly
- Add new records
- Delete records
- Export data

---

## Troubleshooting

### Login Not Working?
1. Make sure backend is running on port 3000
2. Check if database is seeded: `cd backend && npx prisma db seed`
3. Clear browser cache and localStorage
4. Try again with exact credentials above

### Prisma Studio Error?
Always run from backend directory:
```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npx prisma studio
```

### Port Already in Use?
Kill the process:
```powershell
# For port 3000 (backend)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# For port 5174 (frontend)
netstat -ano | findstr :5174
taskkill /PID <PID_NUMBER> /F
```

---

## Important Notes

⚠️ **Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

⚠️ **Email Format:**
- Must be a valid email format
- Case-insensitive

⚠️ **Security:**
- Passwords are hashed with BCrypt (12 rounds)
- JWT tokens used for authentication
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days

---

## Next Steps

1. ✅ Test login with provided credentials
2. ✅ Explore admin dashboard features
3. ✅ Explore donor dashboard
4. ✅ Test making a donation
5. ✅ Test user management (admin only)
6. ✅ Test donation management (admin only)
7. ✅ Verify database in Prisma Studio

---

**Last Updated:** November 11, 2025
**Status:** ✅ All systems operational
