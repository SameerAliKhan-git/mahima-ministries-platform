# 🚀 Project Setup & Launch Guide

## Current Status

✅ **Completed:**
- Dependencies installed (874 packages)
- Environment files created (`.env` for backend and frontend)
- JWT secrets generated and configured
- Authentication controller implemented (register, login, refresh, logout)
- Donation controller implemented (create, get, webhook handling)
- Email service implemented (verification, confirmation, password reset)
- Route handlers connected to controllers

⚠️ **Pending:**
- PostgreSQL database setup (Docker not installed)
- Database migration
- Frontend UI implementation
- Server startup

---

## 🔧 Required Prerequisites

### Option 1: Install Docker (Recommended)
Docker provides an isolated PostgreSQL database without system-wide installation.

**Download Docker Desktop:**
- Windows: https://www.docker.com/products/docker-desktop
- After installation, restart your computer
- Open Docker Desktop and ensure it's running

**Then run:**
```powershell
cd "d:\MM CusrtoṁDemo\New folder"
docker compose up -d postgres redis
```

### Option 2: Install PostgreSQL Directly
If you prefer not to use Docker:

**Download PostgreSQL:**
- https://www.postgresql.org/download/windows/
- Install version 14 or higher
- Remember the password you set for the `postgres` user

**Create database:**
```powershell
# Open PostgreSQL shell (psql) and run:
CREATE DATABASE nonprofit_db;
CREATE USER nonprofit WITH PASSWORD 'nonprofit123';
GRANT ALL PRIVILEGES ON DATABASE nonprofit_db TO nonprofit;
```

**Update backend/.env if using different credentials:**
```
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/nonprofit_db?schema=public"
```

---

## 📝 Step-by-Step Launch Instructions

### Step 1: Start PostgreSQL

**If using Docker:**
```powershell
cd "d:\MM CusrtoṁDemo\New folder"
docker compose up -d postgres redis
```

**If using local PostgreSQL:**
Ensure the PostgreSQL service is running (check Services app or Task Manager)

### Step 2: Run Database Migrations

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run prisma:generate
npm run prisma:migrate
```

This will:
- Generate the Prisma Client
- Create all database tables
- Set up relationships and indexes

### Step 3: Seed the Database (Optional but Recommended)

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run prisma:seed
```

This creates:
- Admin user: `admin@nonprofit.org` / `Admin123!`
- Donor user: `donor@example.com` / `Donor123!`
- Sample campaign and donations

### Step 4: Start the Backend Server

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run dev
```

The backend will start on: **http://localhost:3000**

**Verify it's working:**
```powershell
curl http://localhost:3000/health
```

You should see: `{"status":"ok","timestamp":"..."}`

### Step 5: Start the Frontend

Open a **new terminal** window:

```powershell
cd "d:\MM CusrtoṁDemo\New folder\frontend"
npm run dev
```

The frontend will start on: **http://localhost:5173**

---

## 🧪 Testing the Application

### Test Authentication

**Register a new user:**
```powershell
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User",
    "role": "DONOR"
  }'
```

**Login:**
```powershell
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

Save the `accessToken` from the response for authenticated requests.

### Test Donations

**Create a donation** (replace TOKEN with your access token):
```powershell
curl -X POST http://localhost:3000/api/donations `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" `
  -d '{
    "amount": 50.00,
    "currency": "USD",
    "isRecurring": false,
    "message": "Keep up the great work!"
  }'
```

**Get your donations:**
```powershell
curl http://localhost:3000/api/donations/my-donations `
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔐 Important Configuration Notes

### Email Service
Currently configured for Gmail SMTP. To enable email notifications:

1. **Using Gmail:**
   - Enable 2-Factor Authentication on your Google account
   - Generate an "App Password": https://myaccount.google.com/apppasswords
   - Update `backend/.env`:
     ```
     SMTP_USER=your-email@gmail.com
     SMTP_PASSWORD=your-16-character-app-password
     ```

2. **Using Other Providers:**
   Update SMTP settings in `backend/.env`:
   ```
   SMTP_HOST=smtp.yourprovider.com
   SMTP_PORT=587
   SMTP_USER=your-email
   SMTP_PASSWORD=your-password
   ```

### Stripe Payment Processing
To enable actual payments:

1. Create a Stripe account: https://dashboard.stripe.com/register
2. Get your test API keys from: https://dashboard.stripe.com/test/apikeys
3. Update `backend/.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_your_actual_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key
   ```
4. Update `frontend/.env`:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key
   ```

5. Set up webhook endpoint:
   - Install Stripe CLI: https://stripe.com/docs/stripe-cli
   - Forward webhooks: `stripe listen --forward-to localhost:3000/api/donations/webhook`
   - Copy the webhook secret to `backend/.env`

---

## 🛠️ Development Commands

### Backend Commands

```powershell
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed

# Run linter
npm run lint

# Format code
npm run format
```

### Frontend Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

### Root Commands

```powershell
# Install all dependencies
npm install

# Run backend and frontend concurrently
npm run dev

# Build both applications
npm run build

# Lint all code
npm run lint

# Format all code
npm run format
```

---

## 📊 Database Management

### View Database with Prisma Studio

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run prisma:studio
```

This opens a web interface at http://localhost:5555 where you can:
- View all database tables
- Edit records
- Run queries
- Explore relationships

### Create New Migration

After modifying `backend/prisma/schema.prisma`:

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run prisma:migrate -- --name your_migration_name
```

### Reset Database

⚠️ **Warning:** This deletes all data!

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npx prisma migrate reset
```

---

## 🐛 Troubleshooting

### "Cannot connect to database"

**Check PostgreSQL is running:**
```powershell
# If using Docker:
docker ps

# If using local PostgreSQL:
# Check Services app or Task Manager
```

**Verify connection string in `backend/.env`:**
```
DATABASE_URL="postgresql://nonprofit:nonprofit123@localhost:5432/nonprofit_db?schema=public"
```

### "Port 3000 already in use"

```powershell
# Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Or change the port in backend/.env
PORT=3001
```

### "Module not found" errors

```powershell
# Reinstall dependencies
cd "d:\MM CusrtoṁDemo\New folder"
Remove-Item -Recurse -Force node_modules, backend/node_modules, frontend/node_modules
npm install
```

### TypeScript compilation errors

```powershell
# Rebuild TypeScript
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run build
```

### Prisma Client out of sync

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run prisma:generate
```

---

## 🎯 Next Development Steps

### Immediate Priorities

1. **Complete Frontend UI (Week 3-4)**
   - Install shadcn/ui components
   - Build login/register pages
   - Create donation form with Stripe Elements
   - Build donor dashboard
   - Implement admin panel

2. **Implement Missing Auth Features (Week 2)**
   - Email verification flow
   - Password reset functionality
   - OAuth integration (Google, Facebook)

3. **Complete Donation Features (Week 5-6)**
   - Stripe webhook testing
   - Recurring donation management
   - Donation receipts (PDF generation)
   - Campaign management

4. **Testing (Week 7)**
   - Unit tests (Jest)
   - Integration tests (Supertest)
   - E2E tests (Playwright)

5. **Deployment (Week 8)**
   - Production database setup
   - Environment configuration
   - CI/CD pipeline execution
   - Domain and SSL setup

### Feature Roadmap

See `docs/ROADMAP.md` for complete 12-week development plan.

---

## 📚 Useful Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **Express.js Guide:** https://expressjs.com/en/guide/routing.html
- **React Documentation:** https://react.dev
- **Stripe Payments:** https://stripe.com/docs/payments
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com

---

## 🎉 Success Criteria

Your application is ready when:

✅ Backend server starts without errors  
✅ Frontend loads at http://localhost:5173  
✅ Health check returns `{"status":"ok"}`  
✅ Can register and login users  
✅ Can create donations (with test Stripe key)  
✅ Prisma Studio shows database tables  
✅ No console errors in browser developer tools  

---

## 💡 Tips

- **Keep terminals organized:** Run backend in one terminal, frontend in another
- **Use Prisma Studio** for quick database inspection
- **Check logs:** Backend logs show detailed error messages
- **Browser DevTools:** F12 to see network requests and errors
- **Hot reload:** Both servers automatically restart on code changes

---

## 🆘 Getting Help

- Check `GETTING_STARTED.md` for general guidance
- Review `docs/SETUP.md` for detailed setup instructions
- See `CONTRIBUTING.md` for development guidelines
- Check GitHub Issues for known problems
- Email: support@nonprofit.org

---

**Ready to launch? Start with Step 1 above!** 🚀
