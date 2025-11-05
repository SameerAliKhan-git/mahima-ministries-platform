# Quick Database Setup Script
# Run this after installing PostgreSQL

Write-Host "`n🚀 Non-Profit Platform - Database Quick Setup" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Check if PostgreSQL is installed
$psqlInstalled = Get-Command psql -ErrorAction SilentlyContinue

if (-not $psqlInstalled) {
    Write-Host "❌ PostgreSQL not found!" -ForegroundColor Red
    Write-Host "`n📥 Please install PostgreSQL first:" -ForegroundColor Yellow
    Write-Host "   Option 1 (Local): https://www.postgresql.org/download/windows/" -ForegroundColor White
    Write-Host "   Option 2 (Cloud): https://neon.tech/ (Free tier, 2 minutes)" -ForegroundColor White
    Write-Host "   Option 3 (Cloud): https://supabase.com/ (Free tier, 2 minutes)`n" -ForegroundColor White
    
    $useCloud = Read-Host "Do you want instructions for cloud setup? (y/n)"
    
    if ($useCloud -eq 'y') {
        Write-Host "`n☁️  Cloud Database Setup (Recommended - 2 minutes):`n" -ForegroundColor Cyan
        Write-Host "1. Go to https://neon.tech/" -ForegroundColor White
        Write-Host "2. Click 'Sign Up' and create free account" -ForegroundColor White
        Write-Host "3. Create new project" -ForegroundColor White
        Write-Host "4. Copy the connection string (looks like: postgresql://user:pass@host/db)" -ForegroundColor White
        Write-Host "5. Edit backend\.env and replace DATABASE_URL with your connection string" -ForegroundColor White
        Write-Host "6. Run this script again`n" -ForegroundColor White
    }
    
    exit
}

Write-Host "✅ PostgreSQL found!`n" -ForegroundColor Green

# Navigate to backend directory
Set-Location -Path "d:\MM CusrtoṁDemo\New folder\backend"

Write-Host "📦 Step 1: Generating Prisma Client..." -ForegroundColor Yellow
npm run prisma:generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Failed to generate Prisma Client" -ForegroundColor Red
    Write-Host "Please check your DATABASE_URL in backend\.env`n" -ForegroundColor Yellow
    exit
}

Write-Host "`n✅ Prisma Client generated!`n" -ForegroundColor Green

Write-Host "🔄 Step 2: Running database migrations..." -ForegroundColor Yellow
npm run prisma:migrate

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Migration failed!" -ForegroundColor Red
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - PostgreSQL server not running" -ForegroundColor White
    Write-Host "  - Incorrect DATABASE_URL in backend\.env" -ForegroundColor White
    Write-Host "  - Database doesn't exist (create it first)`n" -ForegroundColor White
    exit
}

Write-Host "`n✅ Migrations completed!`n" -ForegroundColor Green

Write-Host "🌱 Step 3: Seeding database with test data..." -ForegroundColor Yellow
npm run prisma:seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⚠️  Seeding failed, but database is ready" -ForegroundColor Yellow
} else {
    Write-Host "`n✅ Database seeded successfully!`n" -ForegroundColor Green
    
    Write-Host "🔑 Test Credentials Created:" -ForegroundColor Cyan
    Write-Host "   Admin: admin@nonprofit.org / Admin123!" -ForegroundColor White
    Write-Host "   Donor: donor@example.com / Donor123!`n" -ForegroundColor White
}

Write-Host "🎉 Database setup complete!`n" -ForegroundColor Green

Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Start backend: cd backend && npm run dev" -ForegroundColor White
Write-Host "   2. Frontend is already running at: http://localhost:5173" -ForegroundColor White
Write-Host "   3. Backend will be at: http://localhost:3000`n" -ForegroundColor White

$startBackend = Read-Host "Start backend server now? (y/n)"

if ($startBackend -eq 'y') {
    Write-Host "`n🚀 Starting backend server...`n" -ForegroundColor Cyan
    npm run dev
} else {
    Write-Host "`n✅ Run 'npm run dev' in the backend folder when ready!`n" -ForegroundColor Green
}
