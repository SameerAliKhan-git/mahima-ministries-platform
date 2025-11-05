# Database Setup Instructions

Since Docker is not available, you have two options to set up PostgreSQL:

## Option 1: Install PostgreSQL Locally (Recommended)

1. **Download PostgreSQL**
   - Visit: https://www.postgresql.org/download/windows/
   - Download the installer (version 14 or higher)
   - Run the installer and follow the setup wizard

2. **During Installation**
   - Set password for postgres user: `nonprofit123`
   - Port: `5432` (default)
   - Remember these credentials!

3. **Create Database**
   ```powershell
   # Open PowerShell and run:
   psql -U postgres
   # When prompted, enter password: nonprofit123
   
   # In psql prompt:
   CREATE DATABASE nonprofit_db;
   CREATE USER nonprofit WITH PASSWORD 'nonprofit123';
   GRANT ALL PRIVILEGES ON DATABASE nonprofit_db TO nonprofit;
   \q
   ```

4. **Verify Connection**
   Your DATABASE_URL is already configured in backend/.env:
   ```
   DATABASE_URL="postgresql://nonprofit:nonprofit123@localhost:5432/nonprofit_db?schema=public"
   ```

5. **Run Migrations**
   ```powershell
   cd "d:\MM CusrtoṁDemo\New folder\backend"
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

## Option 2: Use PostgreSQL Cloud Service (Quick Start)

### Supabase (Free Tier)
1. Go to https://supabase.com/
2. Create free account
3. Create new project
4. Copy connection string from Settings > Database
5. Update `backend/.env` DATABASE_URL with your connection string

### Neon (Free Tier)
1. Go to https://neon.tech/
2. Create free account
3. Create new project
4. Copy connection string
5. Update `backend/.env` DATABASE_URL with your connection string

### Railway (Free Tier)
1. Go to https://railway.app/
2. Create free account
3. Create new PostgreSQL database
4. Copy connection string
5. Update `backend/.env` DATABASE_URL with your connection string

## After Database Setup

Once your database is ready, run:

```powershell
cd "d:\MM CusrtoṁDemo\New folder\backend"

# Generate Prisma Client
npm run prisma:generate

# Create database tables
npm run prisma:migrate

# Seed with test data
npm run prisma:seed
```

## Test Credentials After Seeding

- **Admin**: admin@nonprofit.org / Admin123!
- **Donor**: donor@example.com / Donor123!

## Verify Setup

```powershell
# Start backend server
cd "d:\MM CusrtoṁDemo\New folder\backend"
npm run dev

# In another terminal, start frontend
cd "d:\MM CusrtoṁDemo\New folder\frontend"
npm run dev
```

Visit http://localhost:5173 to see your application!
