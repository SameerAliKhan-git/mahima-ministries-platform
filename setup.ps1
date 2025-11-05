# Non-Profit Donation Platform - Quick Start Script
# Run this script to set up the project for the first time

Write-Host "🚀 Non-Profit Donation Platform - Quick Start" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
$nodeVersion = node --version
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green

# Check npm version
$npmVersion = npm --version
Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Create environment files for backend
Write-Host "🔧 Setting up backend environment..." -ForegroundColor Yellow
if (-Not (Test-Path "backend\.env.development")) {
    Copy-Item "backend\.env.example" "backend\.env.development"
    Write-Host "✅ Created backend\.env.development (please edit with your values)" -ForegroundColor Green
} else {
    Write-Host "ℹ️  backend\.env.development already exists" -ForegroundColor Blue
}

# Create environment files for frontend
Write-Host "🔧 Setting up frontend environment..." -ForegroundColor Yellow
if (-Not (Test-Path "frontend\.env.development")) {
    Copy-Item "frontend\.env.example" "frontend\.env.development"
    Write-Host "✅ Created frontend\.env.development" -ForegroundColor Green
} else {
    Write-Host "ℹ️  frontend\.env.development already exists" -ForegroundColor Blue
}
Write-Host ""

# Generate Prisma Client
Write-Host "🗄️  Generating Prisma Client..." -ForegroundColor Yellow
Set-Location backend
npm run prisma:generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Write-Host "✅ Prisma Client generated" -ForegroundColor Green
Set-Location ..
Write-Host ""

# Summary
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Edit environment variables:" -ForegroundColor White
Write-Host "   - backend\.env.development" -ForegroundColor Gray
Write-Host "   - frontend\.env.development" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Generate JWT secrets (run this 3 times):" -ForegroundColor White
Write-Host '   node -e "console.log(require(''crypto'').randomBytes(32).toString(''hex''))"' -ForegroundColor Gray
Write-Host ""
Write-Host "3. Run database migrations:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run prisma:migrate" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Start development servers:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Access the application:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Gray
Write-Host "   Backend:  http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "   - PROJECT_STATUS.md (quick overview)" -ForegroundColor Gray
Write-Host "   - docs\SETUP.md (complete setup guide)" -ForegroundColor Gray
Write-Host "   - README.md (project documentation)" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Happy coding!" -ForegroundColor Cyan
