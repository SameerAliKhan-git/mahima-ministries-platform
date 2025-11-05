@echo off
echo ========================================
echo  Starting Mahima Ministries Platform
echo ========================================
echo.
echo Starting Backend Server (PostgreSQL + API)...
echo Starting Frontend Server (Vite + React)...
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop all servers
echo ========================================
echo.

cd /d "%~dp0"
npm run dev
