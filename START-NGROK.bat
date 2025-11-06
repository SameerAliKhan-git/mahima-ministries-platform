@echo off
echo ========================================
echo   Mahima Ministries - ngrok Setup
echo ========================================
echo.
echo This script will help you expose your platform remotely.
echo.
echo IMPORTANT: You need 3 terminal windows:
echo   1. Terminal 1: Run START-ALL.bat (platform running)
echo   2. Terminal 2: Expose Frontend (this window)
echo   3. Terminal 3: Expose Backend (another window)
echo.
echo ========================================
echo.

:menu
echo Please select:
echo   1. Expose Frontend (Port 5173)
echo   2. Expose Backend (Port 3000)
echo   3. Both (requires ngrok account with authtoken)
echo   4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto frontend
if "%choice%"=="2" goto backend
if "%choice%"=="3" goto both
if "%choice%"=="4" goto exit
goto menu

:frontend
echo.
echo Starting ngrok tunnel for Frontend (Port 5173)...
echo Copy the HTTPS URL from below and update backend/.env FRONTEND_URL
echo.
ngrok http 5173
goto end

:backend
echo.
echo Starting ngrok tunnel for Backend (Port 3000)...
echo Copy the HTTPS URL from below and update frontend/.env.local VITE_API_URL
echo.
ngrok http 3000
goto end

:both
echo.
echo Starting ngrok tunnels for both Frontend and Backend...
echo NOTE: This requires an ngrok account and authtoken.
echo.
echo If you haven't set up your authtoken:
echo   1. Sign up at: https://dashboard.ngrok.com/signup
echo   2. Get token: https://dashboard.ngrok.com/get-started/your-authtoken
echo   3. Run: ngrok config add-authtoken YOUR_TOKEN_HERE
echo.
start cmd /k "echo Frontend Tunnel && ngrok http 5173"
timeout /t 2 /nobreak >nul
start cmd /k "echo Backend Tunnel && ngrok http 3000"
echo.
echo Two new windows opened with ngrok tunnels!
echo.
goto menu

:exit
echo.
echo Exiting ngrok setup...
goto end

:end
pause
