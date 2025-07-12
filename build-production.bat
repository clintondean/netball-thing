@echo off
REM Build script for Netball Thing production release (Windows)

echo 🏐 Building Netball Thing Production Release...

REM Clean up previous builds
if exist dist rmdir /s /q dist
if exist netball-thing-*.zip del /q netball-thing-*.zip

REM Create distribution directory
mkdir dist\netball-thing

REM Copy essential files
echo 📁 Copying application files...
copy server.js dist\netball-thing\
copy package.json dist\netball-thing\
copy healthcheck.js dist\netball-thing\
xcopy /e /i views dist\netball-thing\views
xcopy /e /i public dist\netball-thing\public

REM Create production package.json
echo 📦 Creating production package.json...
node -e "const pkg = require('./package.json'); delete pkg.devDependencies; pkg.scripts = { 'start': 'node server.js', 'health': 'node healthcheck.js' }; require('fs').writeFileSync('dist/netball-thing/package.json', JSON.stringify(pkg, null, 2));"

REM Create start script
echo 🚀 Creating start scripts...
echo @echo off > dist\netball-thing\start.bat
echo echo Starting Netball Thing... >> dist\netball-thing\start.bat
echo npm install --production >> dist\netball-thing\start.bat
echo npm start >> dist\netball-thing\start.bat

REM Create deployment README
echo # Netball Thing - Production Deployment > dist\netball-thing\DEPLOYMENT.md
echo. >> dist\netball-thing\DEPLOYMENT.md
echo ## Quick Start >> dist\netball-thing\DEPLOYMENT.md
echo 1. Ensure Node.js (v16+) is installed >> dist\netball-thing\DEPLOYMENT.md
echo 2. Run: `start.bat` >> dist\netball-thing\DEPLOYMENT.md
echo. >> dist\netball-thing\DEPLOYMENT.md
echo ## Manual Start >> dist\netball-thing\DEPLOYMENT.md
echo 1. `npm install --production` >> dist\netball-thing\DEPLOYMENT.md
echo 2. `npm start` >> dist\netball-thing\DEPLOYMENT.md
echo. >> dist\netball-thing\DEPLOYMENT.md
echo ## Access >> dist\netball-thing\DEPLOYMENT.md
echo Open your browser to: http://localhost:3000 >> dist\netball-thing\DEPLOYMENT.md

REM Create ZIP archive (requires PowerShell)
echo 📚 Creating ZIP archive...
powershell -command "Compress-Archive -Path 'dist\netball-thing\*' -DestinationPath 'netball-thing-production-%date:~10,4%%date:~4,2%%date:~7,2%.zip' -Force"

echo ✅ Production build complete!
echo 📦 Archive created in current directory
echo.
echo 🐳 To build Docker image:
echo    docker build -t netball-thing:latest .
echo.
echo 🚀 To run Docker container:
echo    docker run -p 3000:3000 netball-thing:latest

pause
