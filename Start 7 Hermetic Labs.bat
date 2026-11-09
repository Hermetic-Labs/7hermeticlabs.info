@echo off
setlocal
title 7 Hermetic Labs Local Preview

set "SEVEN_LABS_ROOT=%~dp0"
cd /d "%SEVEN_LABS_ROOT%"
if errorlevel 1 goto :directory_error

echo.
echo  7 Hermetic Labs - Public Communications
echo  Product truth, made public with care.
echo  ------------------------------------------------
echo.

where node.exe >nul 2>nul
if errorlevel 1 goto :node_missing

where npm.cmd >nul 2>nul
if errorlevel 1 goto :npm_missing

for /f "tokens=1 delims=." %%V in ('node -p "process.versions.node" 2^>nul') do set "SEVEN_LABS_NODE_MAJOR=%%V"
if not defined SEVEN_LABS_NODE_MAJOR goto :node_missing
if %SEVEN_LABS_NODE_MAJOR% LSS 20 goto :node_old

if not exist "package.json" goto :project_missing

echo  Node: 
node --version
echo  npm:  
call npm.cmd --version
if errorlevel 1 goto :npm_missing
echo.
echo  No runtime package installation is needed for this preview.
echo  Starting the migrated local site. It does not publish or write externally.
echo.
echo  Building the local preview. The public page will open when it is ready.
echo  The server will print the URLs using its selected port.
echo.
echo  Keep this window open while using the communications site.
echo  Press Ctrl+C to stop the preview.
echo.

call npm.cmd run build
if errorlevel 1 goto :build_error

call npm.cmd run serve -- --open
set "SEVEN_LABS_EXIT_CODE=%ERRORLEVEL%"
if "%SEVEN_LABS_EXIT_CODE%"=="0" goto :finished

echo.
echo  The 7 Hermetic Labs preview could not start or stopped unexpectedly.
echo  npm exited with code %SEVEN_LABS_EXIT_CODE%.
echo  Review the message above, then press any key to close this window.
pause >nul
exit /b %SEVEN_LABS_EXIT_CODE%

:directory_error
echo.
echo  The launcher could not open its project folder:
echo  %SEVEN_LABS_ROOT%
goto :failure_pause

:node_missing
echo.
echo  Node.js was not found.
echo  Install Node.js 20 or newer, then double-click this launcher again.
goto :failure_pause

:node_old
echo.
echo  This site requires Node.js 20 or newer.
echo  The detected major version is %SEVEN_LABS_NODE_MAJOR%.
goto :failure_pause

:npm_missing
echo.
echo  npm was not found or could not run.
echo  Install Node.js 20 or newer with npm, then try again.
goto :failure_pause

:project_missing
echo.
echo  package.json was not found in:
echo  %SEVEN_LABS_ROOT%
echo  Keep Start 7 Hermetic Labs.bat in the project folder.
goto :failure_pause

:build_error
echo.
echo  The 7 Hermetic Labs site could not build the local preview. Review the error above.
echo  The server was not started and no browser page was opened.
goto :failure_pause

:failure_pause
echo.
echo  Press any key to close this window.
pause >nul
exit /b 1

:finished
echo.
echo  7 Hermetic Labs preview stopped normally.
exit /b 0
