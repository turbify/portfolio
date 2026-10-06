@echo off
rem Local preview: starts the static server and opens the site in the default browser.
rem YouTube embeds need a real http:// address, they do not work when index.html is opened from disk.
title Podglad portfolio - http://localhost:8080
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8080/"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 8080
