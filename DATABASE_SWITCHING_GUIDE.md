# 🗄️ Database Configuration Guide (Local + Supabase)

This guide explains how to set up both **Local PostgreSQL** and **Supabase (Cloud)** and switch between them.

## 1. 🏠 Local PostgreSQL Setup (Recommended for Development)

You have the installer ready in your folder.

### Step 1: Install

1.  **Double-click** `PostgreSQL_16.1.exe` in the root folder.
2.  Follow the installation wizard.
3.  **IMPORTANT**: When asked for a password, enter: `nonprofit123`
    - _If you choose a different password, you must update `backend/.env`._
4.  Keep the default port `5432`.

### Step 2: Initialize

Once installed, run this command in your terminal:

```powershell
.\setup-database.ps1
```

---

## 2. ☁️ Supabase Setup (Cloud)

Use this if you want the database to be accessible from anywhere (e.g., for a demo).

### Step 1: Create Project

1.  Go to [Supabase.com](https://supabase.com) and sign up/login.
2.  Click **"New Project"**.
3.  Enter a Name (e.g., "Nonprofit Platform") and Database Password.
4.  Wait for the project to be created.

### Step 2: Get Connection String

1.  Go to **Project Settings** (gear icon) -> **Database**.
2.  Under "Connection String", select **Node.js**.
3.  Copy the string. It will look like:
    `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`
4.  Replace `[password]` with the password you created in Step 1.

---

## 3. 🔄 How to Switch Databases

The application uses the `DATABASE_URL` inside `backend/.env` to decide which database to connect to.

### To use Local:

Open `backend/.env` and ensure this line is active:

```env
DATABASE_URL="postgresql://postgres:nonprofit123@localhost:5432/nonprofit_db?schema=public"
# DATABASE_URL="postgresql://postgres.xxxx:pass@aws-0-region.pooler.supabase.com:6543/postgres"
```

### To use Supabase:

Open `backend/.env` and comment out the local URL and add your Supabase URL:

```env
# DATABASE_URL="postgresql://postgres:nonprofit123@localhost:5432/nonprofit_db?schema=public"
DATABASE_URL="postgresql://postgres.your-ref:your-password@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### ⚠️ Important After Switching

Whenever you switch databases, you must run these commands to sync the schema:

```powershell
cd backend
npm run prisma:migrate
npm run prisma:seed
```
