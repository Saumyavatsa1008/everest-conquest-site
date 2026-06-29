@echo off
title Everest Conquest - Website
cd /d "%~dp0"

echo ============================================
echo    EVEREST CONQUEST  -  Local Website
echo ============================================
echo.

if not exist "node_modules" (
  echo First run: installing dependencies, please wait...
  call npm install
  echo.
)

echo Starting the website...
echo When you see "Ready", open your browser at:
echo.
echo        http://localhost:3000
echo.
echo (Keep this window open. Press Ctrl+C to stop.)
echo ============================================
echo.

start "" http://localhost:3000
call npm run dev
pause
