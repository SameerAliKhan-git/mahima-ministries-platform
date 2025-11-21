# 🐳 Mahima Ministries - Docker Deployment Guide

## 📦 Quick Deployment to Remote Laptop

### Option 1: Using Docker Compose (Recommended)

This will run the entire application (Frontend + Backend + Database) in containers.

#### Prerequisites on Remote Laptop:
- Docker Desktop installed and running
- Git (optional, for cloning)

#### Steps:

1. **Transfer Project Files**
   ```bash
   # Copy the entire MM folder to the remote laptop
   # Or clone from GitHub:
   git clone https://github.com/SameerAliKhan-git/mahima-ministries-platform.git
   cd mahima-ministries-platform
   ```

2. **Start All Services**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Access the Application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - Admin: admin@mahima.org / Admin@123456

4. **Stop Services**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

---

### Option 2: Using Ngrok (Already Configured!)

Your project already has ngrok configured for remote access!

#### Steps:

1. **On Your Current Laptop** (where the app is running):
   ```bash
   # Start with ngrok
   .\START-WITH-NGROK.bat
   ```

2. **Get Public URLs**:
   - The script will display public URLs
   - Share these URLs with anyone
   - They can access from anywhere in the world!

3. **Access from Remote Laptop**:
   - Just open the ngrok URL in any browser
   - No installation needed on remote laptop!

---

### Option 3: Export/Import Docker Images

If Docker build fails, you can export images from this laptop and import on remote laptop.

#### On This Laptop:

1. **Build Images Locally** (without Docker):
   ```bash
   # We'll use your current running setup
   # No need to build Docker images
   ```

2. **Create Deployment Package**:
   ```bash
   # Package the application
   npm run build --workspaces
   ```

3. **Transfer Files**:
   - Copy the entire `MM` folder to USB/Cloud
   - Transfer to remote laptop

#### On Remote Laptop:

1. **Install Node.js 20+**
2. **Install PostgreSQL 16**
3. **Run Setup**:
   ```bash
   cd MM
   npm install
   cd backend
   npx prisma migrate deploy
   npx prisma db seed
   npm run dev
   ```
4. **Start Frontend** (new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

---

### Option 4: Cloud Deployment (Best for Production)

Deploy to cloud platforms for permanent access:

#### Railway (Easiest):
1. Go to https://railway.app
2. Connect GitHub repository
3. Deploy with one click
4. Get permanent URL

#### Render:
1. Go to https://render.com
2. Connect repository
3. Configure services
4. Deploy

#### Vercel (Frontend) + Railway (Backend):
1. Frontend on Vercel: https://vercel.com
2. Backend on Railway: https://railway.app
3. Connect them via environment variables

---

## 🎯 Recommended Approach for Your Use Case

**For Remote Laptop Access:**
Use **Option 2 (Ngrok)** - It's already configured and works immediately!

```bash
# Just run this on your current laptop:
.\START-WITH-NGROK.bat

# You'll get URLs like:
# Frontend: https://abc123.ngrok.io
# Backend: https://xyz789.ngrok.io

# Share these URLs - accessible from anywhere!
```

**For Permanent Deployment:**
Use **Option 4 (Railway)** - Free tier available, automatic deployments

---

## 📝 Test Credentials

After deployment, use these credentials:

**Admin Account:**
- Email: admin@mahima.org
- Password: Admin@123456

**Donor Account:**
- Email: john.doe@example.com
- Password: Donor@123456

---

## 🔧 Troubleshooting

### Docker Build Fails:
- Use Option 2 (Ngrok) or Option 3 (Manual Setup)

### Port Already in Use:
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Error:
- Check PostgreSQL is running
- Verify DATABASE_URL in backend/.env

---

## 📞 Support

For issues, check:
- README.md
- DEPLOYMENT_GUIDE.md
- GitHub Issues

---

**Status:** ✅ Application is running locally
**Next Step:** Choose deployment option above
