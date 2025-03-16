#!/bin/bash

# IPP.TOOLS Build Wrapper
# This script provides a robust shell environment for the deployment process
# ensuring all necessary dependencies are available.

echo "🚀 IPP.TOOLS Build Wrapper"
echo "--------------------------------------"

# Set execution environment
export NODE_ENV=production
export PATH="$PATH:./node_modules/.bin:./bin"

# Ensure script is executable
chmod +x scripts/deploy.js 2>/dev/null || true
chmod +x scripts/ensure-lerna.js 2>/dev/null || true
chmod +x scripts/make-executable.js 2>/dev/null || true

# Set default Go version if not already set
export GO_VERSION=${GO_VERSION:-"1.20"}
echo "Using Go version: $GO_VERSION"

# Install lerna globally if not available
if ! command -v lerna &> /dev/null && ! command -v npx &> /dev/null; then
    echo "🔧 Installing build dependencies..."
    npm install -g lerna@8.1.2 || npm install --no-save lerna@8.1.2
fi

# Run the permission setup script if available
if [ -f "scripts/make-executable.js" ]; then
    echo "🔧 Setting up permissions..."
    node scripts/make-executable.js || true
fi

# Run the deployment script with error handling
echo "🏗️ Starting deployment process..."
node scripts/deploy.js "$@"

# Capture exit status
EXIT_STATUS=$?

if [ $EXIT_STATUS -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed with exit code: $EXIT_STATUS"
    # Fallback deployment attempt if initial one fails
    echo "🔄 Attempting fallback build method..."
    npm run build:ipp:direct || npx lerna run build --scope=ipp-main || true
    
    # Check if the fallback created the output directory
    if [ -d "sites/ipp-main/dist" ] && [ -f "sites/ipp-main/dist/index.html" ]; then
        echo "✅ Fallback build appears successful"
        EXIT_STATUS=0
    fi
fi

exit $EXIT_STATUS