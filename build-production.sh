#!/bin/bash

# Build script for Netball Thing production release
# This script creates a production-ready package

echo "🏐 Building Netball Thing Production Release..."

# Clean up previous builds
rm -rf dist/
rm -f netball-thing-*.tgz
rm -f netball-thing-*.zip

# Create distribution directory
mkdir -p dist/netball-thing

# Copy essential files
echo "📁 Copying application files..."
cp server.js dist/netball-thing/
cp package.json dist/netball-thing/
cp healthcheck.js dist/netball-thing/
cp -r views/ dist/netball-thing/views/
cp -r public/ dist/netball-thing/public/

# Create production package.json (without dev dependencies)
echo "📦 Creating production package.json..."
node -e "
const pkg = require('./package.json');
delete pkg.devDependencies;
pkg.scripts = {
  'start': 'node server.js',
  'health': 'node healthcheck.js'
};
require('fs').writeFileSync('dist/netball-thing/package.json', JSON.stringify(pkg, null, 2));
"

# Create start script for different platforms
echo "🚀 Creating start scripts..."

# Windows batch file
cat > dist/netball-thing/start.bat << 'EOF'
@echo off
echo Starting Netball Thing...
npm install --production
npm start
EOF

# Unix shell script
cat > dist/netball-thing/start.sh << 'EOF'
#!/bin/bash
echo "Starting Netball Thing..."
npm install --production
npm start
EOF

chmod +x dist/netball-thing/start.sh

# Create README for deployment
cat > dist/netball-thing/DEPLOYMENT.md << 'EOF'
# Netball Thing - Production Deployment

## Quick Start

### Windows
1. Ensure Node.js (v16+) is installed
2. Run: `start.bat`

### Linux/Mac
1. Ensure Node.js (v16+) is installed
2. Run: `chmod +x start.sh && ./start.sh`

### Manual Start
1. `npm install --production`
2. `npm start`

## Configuration
- Default port: 3000
- Set PORT environment variable to change port
- Example: `PORT=8080 npm start`

## Access
Open your browser to: http://localhost:3000
EOF

# Create ZIP archive
echo "📚 Creating ZIP archive..."
cd dist/
zip -r ../netball-thing-production-$(date +%Y%m%d).zip netball-thing/
cd ..

echo "✅ Production build complete!"
echo "📦 Archive created: netball-thing-production-$(date +%Y%m%d).zip"
echo ""
echo "🐳 To build Docker image:"
echo "   docker build -t netball-thing:latest ."
echo ""
echo "🚀 To run Docker container:"
echo "   docker run -p 3000:3000 netball-thing:latest"
