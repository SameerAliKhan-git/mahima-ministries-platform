# 🚀 Mahima Ministries Platform - Quick Start Guide

## ✅ All-in-One Startup

### **Single Command to Start Everything:**

Simply **double-click** the file:
```
START-ALL.bat
```

This will start:
- ✅ **Backend API** (Express + PostgreSQL) on `http://localhost:3000`
- ✅ **Frontend** (React + Vite) on `http://localhost:5173`
- ✅ **Database** (PostgreSQL) connection

---

## 📋 Prerequisites (Already Configured)

- ✅ PostgreSQL installed and running on port 5432
- ✅ Database: `nonprofit_db`
- ✅ Username: `postgres`
- ✅ Password: `Mahima@123`
- ✅ Node.js and npm installed
- ✅ All dependencies installed

---

## 🎯 How to Use

### **Step 1: Start the Platform**
Double-click `START-ALL.bat` in the project root folder

### **Step 2: Access the Application**
- **Frontend Website**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/health

### **Step 3: Test the Contact Form**
1. Navigate to the Contact page
2. Fill in the form with:
   - **Name**: Your name
   - **Email**: Valid email (e.g., test@example.com)
   - **Phone**: Select country code and enter number
   - **Subject**: At least 5 characters
   - **Message**: At least 20 characters
3. Click "Send Message"
4. You'll see a success dialog!

---

## 🛑 How to Stop

Press `Ctrl + C` in the command window that opened, or simply close the window.

---

## 📂 Project Structure

```
nonprofit-donation-platform/
├── START-ALL.bat          ← Double-click this to start everything
├── frontend/              ← React + Vite frontend
│   ├── src/
│   │   ├── pages/         ← All pages including ContactPage
│   │   ├── components/    ← Reusable components
│   │   └── styles/        ← Global styles
│   └── package.json
├── backend/               ← Express + Prisma backend
│   ├── src/
│   │   ├── controllers/   ← API logic (contact, partnership)
│   │   ├── routes/        ← API routes
│   │   ├── services/      ← Email & WhatsApp notifications
│   │   └── config/        ← Configuration
│   ├── prisma/            ← Database schema
│   └── .env               ← Backend configuration
└── package.json           ← Root package.json with unified scripts
```

---

## 🔧 Manual Commands (If Needed)

If you prefer to run things separately:

### **Install Dependencies:**
```bash
npm install
```

### **Start Backend Only:**
```bash
cd backend
npm run dev
```

### **Start Frontend Only:**
```bash
cd frontend
npm run dev
```

### **Database Migrations:**
```bash
cd backend
npx prisma migrate dev
```

### **View Database:**
```bash
cd backend
npx prisma studio
```

---

## 📧 Contact Form Features

- ✅ Phone input with 201 countries and flag emojis
- ✅ Real-time validation
- ✅ Success/error messages
- ✅ Email notifications (sender + admin)
- ✅ WhatsApp notification preparation
- ✅ Database storage of all inquiries

---

## 🌐 API Endpoints

### **Public Endpoints:**
- `POST /api/contact` - Submit contact form
- `POST /api/partnerships/apply` - Submit partnership application

### **Admin Endpoints:**
- `GET /api/contact/inquiries` - List all inquiries
- `PATCH /api/contact/inquiries/:id` - Update inquiry status
- `GET /api/partnerships/applications` - List all applications
- `PATCH /api/partnerships/applications/:id` - Update application status

### **Health Check:**
- `GET /health` - Server health status

---

## 🎨 Updated Features

### **Contact Page:**
- ✅ Updated email addresses (mahimaministriesindia@gmail.com, rdmaharaju@gmail.com)
- ✅ Updated phone numbers (040-23032675, +91 9246272675, +91 9246332264)
- ✅ WhatsApp button with pre-filled message
- ✅ Google Maps link for address
- ✅ Clickable phone and email links

### **PhoneInput Component:**
- ✅ 201 countries with SVG flags (react-country-flag)
- ✅ Default country: India 🇮🇳 (+91)
- ✅ Searchable dropdown
- ✅ Real-time full number display

---

## ⚠️ Troubleshooting

### **Backend won't start:**
- Ensure PostgreSQL is running on port 5432
- Check credentials in `backend/.env`
- Run: `cd backend && npx prisma migrate dev`

### **Frontend shows network error:**
- Ensure backend is running on port 3000
- Check `VITE_API_URL` in frontend config

### **Port already in use:**
- Stop any existing Node processes:
  ```bash
  Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
  ```

### **Database connection error:**
- Check PostgreSQL service is running
- Verify credentials: `postgres` / `Mahima@123`
- Verify database exists: `nonprofit_db`

---

## 🎉 Success!

When you see these messages, everything is working:

```
[Backend] 🚀 Server running on port 3000 in development mode
[Backend] 📍 Frontend URL: http://localhost:5173
[Backend] 🔐 Database: PostgreSQL

[Frontend] VITE v5.x.x ready
[Frontend] ➜  Local:   http://localhost:5173/
```

---

## 📞 Contact Information

**Mahima Ministries**
- 📧 Email: mahimaministriesindia@gmail.com, rdmaharaju@gmail.com
- 📱 Phone: 040-23032675, +91 9246272675, +91 9246332264
- 💬 WhatsApp: +91 9246272675
- 📍 Address: 2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Ameenpur, Sangareddy, Telangana - 502032

---

**Made with ❤️ for Mahima Ministries**
