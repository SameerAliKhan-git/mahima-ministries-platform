# Non-Profit Donation Platform - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 25+ and npm
- **PostgreSQL** 14+ (for production) or use SQLite for development
- **Redis** (for session management)
- **Git**

Optional:
- **Docker** and Docker Compose (for containerized deployment)
- **Stripe Account** (for payment processing)
- **AWS Account** (for S3 file storage)

## 🚀 Quick Start (Development)

### 1. Clone the Repository

```powershell
git clone <repository-url>
cd nonprofit-donation-platform
```

### 2. Install Dependencies

From the root directory:

```powershell
npm install
```

This will install dependencies for both frontend and backend due to the workspace configuration.

### 3. Backend Setup

#### a. Environment Configuration

```powershell
cd backend
copy .env.example .env.development
```

Edit `.env.development` and update the following minimum required variables:

```env
DATABASE_URL="file:./dev.db"
JWT_ACCESS_SECRET="<generate-random-string>"
JWT_REFRESH_SECRET="<generate-random-string>"
SESSION_SECRET="<generate-random-string>"
```

**Generate secrets:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### b. Database Setup

```powershell
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed the database with sample data
npm run prisma:seed
```

#### c. Start Backend Server

```powershell
npm run dev
```

The backend will start on http://localhost:3000

### 4. Frontend Setup

Open a new terminal window:

```powershell
cd frontend
copy .env.example .env.development
```

Edit `.env.development`:

```env
VITE_API_URL="http://localhost:3000/api"
```

#### Start Frontend Development Server

```powershell
npm run dev
```

The frontend will start on http://localhost:5173

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 📦 Installation Steps Explained

### Root Directory

```powershell
# Install all workspace dependencies
npm install

# Start both frontend and backend concurrently
npm run dev

# Build both applications
npm run build

# Run tests for all workspaces
npm test

# Lint all code
npm run lint

# Format all code
npm run format
```

### Backend Commands

```powershell
cd backend

# Development
npm run dev              # Start development server with hot reload

# Build
npm run build           # Compile TypeScript to JavaScript
npm start               # Run production build

# Database
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate  # Run database migrations
npm run prisma:studio   # Open Prisma Studio (DB GUI)
npm run prisma:seed     # Seed database with sample data

# Testing
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
```

### Frontend Commands

```powershell
cd frontend

# Development
npm run dev             # Start development server

# Build
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
```

## 🔧 Detailed Configuration

### Database Configuration

#### Option 1: SQLite (Development)

Easiest option for local development:

```env
DATABASE_URL="file:./dev.db"
```

#### Option 2: PostgreSQL (Production-like)

1. Install PostgreSQL
2. Create a database:

```sql
CREATE DATABASE nonprofit_dev;
CREATE USER nonprofit_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE nonprofit_dev TO nonprofit_user;
```

3. Update `.env.development`:

```env
DATABASE_URL="postgresql://nonprofit_user:your_password@localhost:5432/nonprofit_dev"
```

### Redis Configuration

#### Install Redis (Windows)

```powershell
# Using Chocolatey
choco install redis-64

# Or download from: https://github.com/microsoftarchive/redis/releases

# Start Redis
redis-server
```

Update `.env.development`:

```env
REDIS_URL="redis://localhost:6379"
```

### Email Configuration

#### Development: Use Ethereal Email (Fake SMTP)

1. Go to https://ethereal.email/
2. Create a free account
3. Copy the SMTP credentials to `.env.development`:

```env
SMTP_HOST="smtp.ethereal.email"
SMTP_PORT="587"
SMTP_USER="your-ethereal-username"
SMTP_PASS="your-ethereal-password"
```

#### Production: Use SendGrid

1. Sign up at https://sendgrid.com/
2. Generate an API key
3. Update `.env.production`:

```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

### Payment Configuration (Stripe)

1. Sign up at https://stripe.com/
2. Get your test API keys from the Dashboard
3. Update `.env.development`:

```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

4. Update `frontend/.env.development`:

```env
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### File Storage (AWS S3)

#### Development: Skip S3 Setup

For development, you can skip S3 and use local storage.

#### Production: Configure AWS S3

1. Create an AWS account
2. Create an S3 bucket
3. Create an IAM user with S3 access
4. Update `.env.production`:

```env
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"
```

## 🐳 Docker Setup

### Development with Docker Compose

```powershell
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

Services:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## 🧪 Testing

### Backend Tests

```powershell
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Frontend Tests

```powershell
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Database Migrations

### Creating a New Migration

```powershell
cd backend

# After modifying schema.prisma
npm run prisma:migrate

# Enter a descriptive name for the migration
# Example: add_campaign_status_field
```

### Applying Migrations

```powershell
# Development
npm run prisma:migrate

# Production
npx prisma migrate deploy
```

### Resetting Database

```powershell
# ⚠️ This will delete all data!
npx prisma migrate reset

# Confirm and re-seed
npm run prisma:seed
```

## 🔐 Security Checklist

Before deployment:

- [ ] Change all default secrets in `.env`
- [ ] Enable HTTPS in production
- [ ] Configure CORS allowed origins
- [ ] Set up rate limiting
- [ ] Enable Helmet security headers
- [ ] Configure CSRF protection
- [ ] Set up database backups
- [ ] Enable error tracking (Sentry)
- [ ] Review and update dependencies

## 🚢 Deployment

### Production Build

```powershell
# Build backend
cd backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

### Deployment Options

1. **Vercel** (Frontend + Serverless Backend)
2. **AWS Elastic Beanstalk** (Full-stack)
3. **Heroku** (Full-stack)
4. **Digital Ocean App Platform**
5. **Self-hosted with Docker**

See detailed deployment guides in `docs/deployment/`.

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```powershell
# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### Prisma Client Not Generated

```powershell
cd backend
npm run prisma:generate
```

#### Database Connection Error

1. Check PostgreSQL is running
2. Verify `DATABASE_URL` in `.env.development`
3. Ensure database exists
4. Check firewall settings

#### Redis Connection Error

1. Check Redis is running: `redis-cli ping`
2. Verify `REDIS_URL` in `.env.development`

#### Module Not Found Errors

```powershell
# Clean install
rm -rf node_modules
npm install

# Or from root
npm install
```

## 📚 Additional Resources

- [Backend API Documentation](../api/openapi.yaml)
- [System Design](../system_design/system_design.md)
- [Deployment Guide](../deployment/)
- [User Guides](../user-guides/)

## 🆘 Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the logs: `docker-compose logs` or check terminal output
3. Open an issue on GitHub
4. Contact support: support@nonprofit.org

## 🔄 Development Workflow

### Daily Development

```powershell
# 1. Pull latest changes
git pull origin develop

# 2. Install any new dependencies
npm install

# 3. Run migrations (if schema changed)
cd backend
npm run prisma:migrate

# 4. Start development servers
cd ..
npm run dev
```

### Making Changes

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Test your changes: `npm test`
4. Lint and format: `npm run lint && npm run format`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Create Pull Request

## ✅ Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No linting errors
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Secrets rotated
- [ ] HTTPS configured
- [ ] CDN configured
- [ ] Monitoring set up
- [ ] Backup strategy implemented
- [ ] Documentation updated

---

Happy coding! 🎉
