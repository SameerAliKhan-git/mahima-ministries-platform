# 🙏 Mahima Ministries Platform

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive full-stack donation platform built for **Mahima Ministries** to support underprivileged communities in India. Features include online donations, partnership applications, contact management, and complete Indian NGO compliance (80G, 12A, FCRA).

**🌐 Live Demo**: [Coming Soon]  
**📧 Contact**: mahimaministriesindia@gmail.com

---

## ✨ Key Features

### 🎯 For Donors
- � Secure donation system with DANAMOJO integration
- 🔄 Recurring donations (monthly/quarterly/annually)
- 📧 Automated 80G tax receipt generation
- 📊 Personal donor dashboard
- 📱 Fully mobile-responsive design

### 🤝 For Organizations
- 📝 Partnership application system
- 📞 Multi-channel contact forms (Email, Phone, WhatsApp)
- 🌍 International phone input (201 countries with flags)
- 📈 Campaign and donor management
- 👥 Admin dashboard with analytics

### 🔒 Compliance & Security
- ✅ Indian NGO compliance (80G, 12A, FCRA)
- 🛡️ JWT authentication & authorization
- � Rate limiting & security headers
- 📝 Comprehensive audit logging
- 🌐 CORS & CSRF protection

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ and npm
- PostgreSQL 16
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SameerAliKhan-git/mahima-ministries-platform.git
   cd mahima-ministries-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL database**
   ```sql
   CREATE DATABASE nonprofit_db;
   ```

4. **Configure environment variables**
   ```bash
   # Copy and update backend/.env with your credentials
   cp backend/.env.example backend/.env
   ```

5. **Run database migrations**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Start the application**
   ```bash
   # From root directory
   npm run dev
   
   # Or use the quick start script (Windows)
   # Double-click: START-ALL.bat
   ```

7. **Access the application**
   - 🌐 Frontend: http://localhost:5173
   - 🔌 Backend API: http://localhost:3000
   - ❤️ Health Check: http://localhost:3000/health

📖 **Detailed Setup Guide**: See [QUICK-START-GUIDE.md](./QUICK-START-GUIDE.md)

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **UI Components** | Custom components, Lucide React icons, react-country-flag |
| **Backend** | Node.js 20, Express.js, TypeScript |
| **Database** | PostgreSQL 16, Prisma ORM |
| **Authentication** | JWT, bcrypt |
| **Email** | Nodemailer (Gmail SMTP) |
| **Validation** | Zod |
| **Logging** | Winston |
| **Security** | Helmet, CORS, Rate Limiting |
| **Payments** | DANAMOJO (Indian NGO payment gateway) |

## 📋 Prerequisites

- Node.js 25+ and npm
- PostgreSQL 14+ (for production)
- Redis (for session management)
- Git

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd nonprofit-donation-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

#### Backend Environment Variables

Create `backend/.env.development`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nonprofit_dev"
# For development with SQLite:
# DATABASE_URL="file:./dev.db"

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_ACCESS_SECRET="your-access-secret-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"

# Session
SESSION_SECRET="your-session-secret-here"
REDIS_URL="redis://localhost:6379"

# Email (for development, use Ethereal or Mailtrap)
SMTP_HOST="smtp.ethereal.email"
SMTP_PORT="587"
SMTP_USER="your-email@ethereal.email"
SMTP_PASS="your-password"

# Payment Gateway (Stripe test mode)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# File Storage (AWS S3 or local)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="nonprofit-uploads"

# App Configuration
NODE_ENV="development"
PORT="3000"
FRONTEND_URL="http://localhost:5173"
```

#### Frontend Environment Variables

Create `frontend/.env.development`:

```env
VITE_API_URL="http://localhost:3000/api"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 4. Database Setup

```bash
# Navigate to backend directory
cd backend

# Run Prisma migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### 5. Start Development Servers

From the root directory:

```bash
# Start both frontend and backend concurrently
npm run dev
```

Or start them individually:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## � Project Structure

```
mahima-ministries-platform/
├── frontend/                   # React 18 + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # PhoneInput (201 countries), XLogo
│   │   │   ├── layout/        # Header, Footer, Navbar
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── public/        # 31+ pages (all Indian-localized)
│   │   │   │   ├── ContactPage.tsx
│   │   │   │   ├── PartnershipPage.tsx
│   │   │   │   ├── SponsorshipPage.tsx
│   │   │   │   └── ...
│   │   │   └── admin/         # Admin dashboard
│   │   ├── services/          # API client (axios)
│   │   └── types/             # TypeScript interfaces
│   └── package.json
│
├── backend/                    # Express + TypeScript + Prisma
│   ├── prisma/
│   │   ├── schema.prisma      # PostgreSQL schema (INR default)
│   │   └── migrations/        # Database migrations
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── contact.controller.ts
│   │   │   ├── partnership.controller.ts
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── notification.service.ts  # Email + WhatsApp
│   │   ├── routes/
│   │   │   ├── contact.routes.ts
│   │   │   └── partnership.routes.ts
│   │   └── config/
│   │       └── env.ts
│   ├── .env                   # PostgreSQL credentials
│   └── package.json
│
├── START-ALL.bat              # Windows: Start frontend + backend
├── QUICK-START-GUIDE.md
├── EMAIL-SETUP-GUIDE.md
└── README.md
```

## 🔌 API Endpoints

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "subject": "Donation inquiry",
  "message": "I would like to know more about your programs..."
}
```

### Partnership Application
```http
POST /api/partnerships/apply
Content-Type: application/json

{
  "organizationName": "ABC Corporation",
  "contactName": "Jane Smith",
  "contactEmail": "jane@abc.com",
  "contactPhone": "+919123456789",
  "partnershipType": "CORPORATE",
  "proposalDetails": "We would like to sponsor education programs..."
}
```

### Admin Endpoints (Authentication Required)
- `GET /api/contact/inquiries` - View all contact inquiries
- `PATCH /api/contact/inquiries/:id` - Update inquiry status
- `GET /api/partnerships/applications` - View all partnership applications
- `PATCH /api/partnerships/applications/:id` - Update application status

## 🔒 Security

- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: Zod schemas for all inputs
- **Rate Limiting**: Protection against brute-force attacks
- **Security Headers**: Helmet.js for HTTP headers
- **CORS**: Configured for frontend-backend communication
- **SQL Injection**: Prisma ORM parameterized queries
- **Sensitive Data**: .env files excluded from Git

## � Deployment

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build
```

### Environment Variables (Production)

Update `backend/.env` with production values:
- `DATABASE_URL`: Production PostgreSQL connection string
- `SMTP_PASSWORD`: Gmail App Password (see EMAIL-SETUP-GUIDE.md)
- `NODE_ENV`: Set to `production`
- `FRONTEND_URL`: Your production domain

## � Documentation

- **[Quick Start Guide](QUICK-START-GUIDE.md)** - Detailed installation instructions
- **[Email Setup Guide](EMAIL-SETUP-GUIDE.md)** - Gmail SMTP configuration
- **[GitHub Push Guide](GITHUB-PUSH-GUIDE.md)** - Repository management

## 📧 Contact

**Mahima Ministries**
- 📧 Email: mahimaministriesindia@gmail.com, rdmaharaju@gmail.com
- 📞 Phone: 040-23032675, +91 9246272675, +91 9246332264
- 💬 WhatsApp: [+91 9246272675](https://wa.me/919246272675)
- 📍 Address: 2-38/8/2/9/4/1, NTR Nagar Colony, Chandanagar, Ameenpur, Sangareddy, Telangana - 502032
- 🔗 GitHub: [SameerAliKhan-git](https://github.com/SameerAliKhan-git)

## 🗺️ Roadmap

**Completed:**
- ✅ Indian localization (31+ pages)
- ✅ Contact & Partnership forms with email notifications
- ✅ PhoneInput component (201 countries with flags)
- ✅ PostgreSQL database integration
- ✅ Backend API with validation
- ✅ Unified startup script

**In Progress:**
- 🔄 Email SMTP configuration (needs Gmail App Password)
- 🔄 Admin dashboard UI

**Planned:**
- ⏳ DANAMOJO payment gateway integration
- ⏳ WhatsApp API (Twilio)
- ⏳ More form integrations (Sponsorship, etc.)
- ⏳ Mobile app (React Native)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ for Mahima Ministries - Supporting underprivileged communities in India**
- Integration with accounting software

## 👥 Team

- Project Manager: [Name]
- Lead Developer: [Name]
- Frontend Developer: [Name]
- Backend Developer: [Name]
- UI/UX Designer: [Name]

## 🙏 Acknowledgments

- shadcn/ui for beautiful UI components
- Prisma for excellent ORM
- Vite for blazing-fast development experience
- All open-source contributors

---

Built with ❤️ for non-profit organizations making a difference in the world.
#   m a h i m a - m i n i s t r i e s - p l a t f o r m 
 
 