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
chmod +x scripts/deploy.js
chmod +x scripts/ensure-lerna.js

# Install lerna globally if not available
if ! command -v lerna &> /dev/null && ! command -v npx &> /dev/null; then
    echo "🔧 Installing build dependencies..."
    npm install -g lerna@8.1.2
    
    if [ $? -ne 0 ]; then
        echo "⚠️ Global installation failed, installing locally..."
        npm install --no-save lerna@8.1.2
    fi
fi

# Run the deployment script
echo "🏗️ Starting deployment process..."
node scripts/deploy.js "$@"

# Capture exit status
EXIT_STATUS=$?

if [ $EXIT_STATUS -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed with exit code: $EXIT_STATUS"
fi

exit $EXIT_STATUS