@echo off
echo Starting Mahima Ministries with ngrok...

REM Get current directory
set CURRENT_DIR=%~dp0

REM Kill existing processes
echo Cleaning up existing processes...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM npm.exe >nul 2>&1
taskkill /F /IM ngrok.exe >nul 2>&1

REM Wait for processes to clean up
timeout /t 2 /nobreak >nul

REM Start Backend
echo Starting Backend...
start "Mahima Backend" cmd /c "cd backend && npm run dev"

REM Wait for backend to start
timeout /t 5 /nobreak >nul

REM Start Frontend
echo Starting Frontend...
start "Mahima Frontend" cmd /c "cd frontend && npm run dev"

REM Wait for frontend to start
timeout /t 5 /nobreak >nul

REM Start ngrok tunnels
echo Starting ngrok tunnels...
start "Mahima ngrok Frontend" cmd /c "ngrok http --config ngrok.yml 5173"
timeout /t 2 /nobreak >nul
start "Mahima ngrok Backend" cmd /c "ngrok http 3000"

echo.
echo =============================================
echo Mahima Ministries Platform is starting up...
echo.
echo Local URLs:
echo - Frontend: http://localhost:5173
echo - Backend: http://localhost:3000
echo - ngrok Dashboard: http://localhost:4040
echo.
echo Remote URLs will be available at:
echo http://localhost:4040
echo =============================================
echo.
echo Press Ctrl+C in individual windows to stop services