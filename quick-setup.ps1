# Quick Setup Script - Automated Database Setup
Write-Host "`n╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║    🎉 Non-Profit Donation Platform - Quick Setup    ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

$backendPath = "d:\MM CusrtoṁDemo\New folder\backend"

# Check if DATABASE_URL is set
$envContent = Get-Content "$backendPath\.env" -Raw
if ($envContent -match 'DATABASE_URL="postgresql://nonprofit:nonprofit123@localhost') {
    Write-Host "⚠️  WARNING: Still using local PostgreSQL configuration!" -ForegroundColor Yellow
    Write-Host "`nIt looks like you haven't updated the DATABASE_URL yet.`n" -ForegroundColor Yellow
    
    Write-Host "Please follow these steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://neon.tech/ and create a FREE account" -ForegroundColor White
    Write-Host "2. Create a new project" -ForegroundColor White
    Write-Host "3. Copy your connection string" -ForegroundColor White
    Write-Host "4. Edit backend\.env and replace DATABASE_URL with your connection string`n" -ForegroundColor White
    
    $continue = Read-Host "Have you updated the DATABASE_URL? (y/n)"
    if ($continue -ne 'y') {
        Write-Host "`n❌ Setup cancelled. Please update DATABASE_URL first.`n" -ForegroundColor Red
        exit
    }
}

Write-Host "🔍 Step 1: Checking environment..." -ForegroundColor Yellow
Set-Location $backendPath

Write-Host "✅ Environment ready!`n" -ForegroundColor Green

Write-Host "📦 Step 2: Generating Prisma Client..." -ForegroundColor Yellow
npm run prisma:generate 2>&1 | Out-Host

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Failed to generate Prisma Client!" -ForegroundColor Red
    Write-Host "Please check your DATABASE_URL in backend\.env`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n✅ Prisma Client generated!`n" -ForegroundColor Green

Write-Host "🗄️  Step 3: Running database migrations..." -ForegroundColor Yellow
Write-Host "This will create all tables and structure...`n" -ForegroundColor Gray

# Run migration with name
$env:DATABASE_URL = (Get-Content "$backendPath\.env" | Where-Object { $_ -match '^DATABASE_URL=' }) -replace 'DATABASE_URL=', '' -replace '"', ''
npm run prisma:migrate 2>&1 | Out-Host

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Migration failed!" -ForegroundColor Red
    Write-Host "`nCommon issues:" -ForegroundColor Yellow
    Write-Host "  • Database connection string is incorrect" -ForegroundColor White
    Write-Host "  • Database service is not accessible" -ForegroundColor White
    Write-Host "  • Network/firewall blocking connection`n" -ForegroundColor White
    exit 1
}

Write-Host "`n✅ Database migrations completed!`n" -ForegroundColor Green

Write-Host "🌱 Step 4: Seeding database with test data..." -ForegroundColor Yellow
npm run prisma:seed 2>&1 | Out-Host

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Database seeded successfully!`n" -ForegroundColor Green
    Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║              🔑 Test Credentials Created                ║" -ForegroundColor Cyan
    Write-Host "╠══════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
    Write-Host "║  Admin: admin@nonprofit.org / Admin123!                 ║" -ForegroundColor White
    Write-Host "║  Donor: donor@example.com / Donor123!                   ║" -ForegroundColor White
    Write-Host "╚══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan
} else {
    Write-Host "`n⚠️  Seeding had some issues, but database is ready`n" -ForegroundColor Yellow
}

Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              🎉 SETUP COMPLETE!                         ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "✅ Frontend:  http://localhost:5173 (already running)" -ForegroundColor Cyan
Write-Host "⏳ Backend:   http://localhost:3000 (starting now...)`n" -ForegroundColor Yellow

Write-Host "🚀 Starting backend server..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Gray

# Start backend server
npm run dev
