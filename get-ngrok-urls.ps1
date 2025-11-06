# Get ngrok URLs and configure the project
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Fetching ngrok Tunnel URLs" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    Start-Sleep -Seconds 2
    
    $response = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get
    $tunnels = $response.tunnels
    
    if ($tunnels.Count -eq 0) {
        Write-Host "No ngrok tunnels found. Please start ngrok first." -ForegroundColor Red
        exit
    }
    
    $frontendTunnel = $tunnels | Where-Object { $_.config.addr -like "*5173*" } | Select-Object -First 1
    $backendTunnel = $tunnels | Where-Object { $_.config.addr -like "*3000*" } | Select-Object -First 1
    
    Write-Host "Found Tunnels:" -ForegroundColor Green
    Write-Host ""
    
    $frontendUrl = ""
    $backendUrl = ""
    
    if ($frontendTunnel) {
        $frontendUrl = $frontendTunnel.public_url
        Write-Host "Frontend (Port 5173):" -ForegroundColor Cyan
        Write-Host "   $frontendUrl" -ForegroundColor Yellow
        Write-Host ""
    }
    
    if ($backendTunnel) {
        $backendUrl = $backendTunnel.public_url
        Write-Host "Backend (Port 3000):" -ForegroundColor Cyan
        Write-Host "   $backendUrl" -ForegroundColor Yellow
        Write-Host ""
    }
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    $configure = Read-Host "Do you want to automatically configure these URLs? (Y/N)"
    
    if ($configure -eq "Y" -or $configure -eq "y") {
        Write-Host ""
        Write-Host "Configuring..." -ForegroundColor Cyan
        
        if ($frontendUrl -and (Test-Path "backend\.env")) {
            $envContent = Get-Content "backend\.env" -Raw
            $envContent = $envContent -replace 'FRONTEND_URL=.*', "FRONTEND_URL=$frontendUrl"
            Set-Content "backend\.env" -Value $envContent
            Write-Host "Updated backend/.env with FRONTEND_URL" -ForegroundColor Green
        }
        
        if ($backendUrl) {
            $frontendEnvPath = "frontend\.env.local"
            $content = "VITE_API_URL=$backendUrl"
            Set-Content $frontendEnvPath -Value $content
            Write-Host "Created frontend/.env.local with VITE_API_URL" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "IMPORTANT: Restart your servers!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Stop the current servers (Ctrl+C)" -ForegroundColor White
        Write-Host "2. Run: START-ALL.bat" -ForegroundColor White
        Write-Host ""
        Write-Host "Then share your frontend URL:" -ForegroundColor Cyan
        Write-Host "   $frontendUrl" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Cyan
    }
    else {
        Write-Host ""
        Write-Host "Manual Configuration Steps:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Update backend/.env:" -ForegroundColor White
        Write-Host "   FRONTEND_URL=$frontendUrl" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "2. Create frontend/.env.local:" -ForegroundColor White
        Write-Host "   VITE_API_URL=$backendUrl" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "3. Restart both servers" -ForegroundColor White
        Write-Host ""
    }
    
} catch {
    Write-Host "Error: Could not connect to ngrok API" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure ngrok is running:" -ForegroundColor Yellow
    Write-Host "  1. Open new terminal: ngrok http 5173" -ForegroundColor White
    Write-Host "  2. Open another terminal: ngrok http 3000" -ForegroundColor White
    Write-Host ""
}
