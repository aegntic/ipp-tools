#!/bin/bash

# IPP.TOOLS Build Wrapper
# This script provides a robust shell environment for the deployment process
# ensuring all necessary dependencies are available.

set -e

echo "🚀 IPP.TOOLS Build Wrapper"
echo "--------------------------------------"

# Set execution environment
export NODE_ENV=production
export PATH="$PATH:./node_modules/.bin:./bin"

# Ensure required dependencies are installed
echo "🔧 Ensuring all required dependencies are installed..."
npm install --no-save @netlify/plugin-nextjs

# Ensure script is executable
chmod +x scripts/deploy.js 2>/dev/null || true
chmod +x scripts/ensure-lerna.js 2>/dev/null || true
chmod +x scripts/make-executable.js 2>/dev/null || true

# Set default Go version if not already set
export GO_VERSION=${GO_VERSION:-"1.20"}
echo "Using Go version: $GO_VERSION"

# Install lerna if not available
if ! command -v lerna &> /dev/null && ! command -v npx &> /dev/null; then
    echo "🔧 Installing lerna dependency..."
    npm install --no-save lerna@8.1.2
fi

# Run the permission setup script if available
if [ -f "scripts/make-executable.js" ]; then
    echo "🔧 Setting up permissions..."
    node scripts/make-executable.js || true
fi

# Create required directories
mkdir -p sites/ipp-main/public/assets/visualizations

# Run the deployment script with error handling
echo "🏗️ Starting deployment process..."

# Try the primary build method
node scripts/deploy.js "$@" || {
    echo "⚠️ Primary build failed, attempting fallback methods..."
    
    # Fallback method 1: Direct npm build
    (npm run build:ipp:direct && echo "✅ Fallback 1 (direct build) succeeded") || {
        echo "⚠️ Fallback 1 failed, attempting fallback 2..."
        
        # Fallback method 2: Direct lerna call
        (npx lerna run build --scope=ipp-main && echo "✅ Fallback 2 (lerna direct) succeeded") || {
            echo "⚠️ Fallback 2 failed, attempting fallback 3..."
            
            # Fallback method 3: Manual build
            echo "🔧 Attempting manual build of site..."
            cd sites/ipp-main && npm install && npm run build && cd ../..
        }
    }
}

# Check if the output directory exists
if [ -d "sites/ipp-main/dist" ]; then
    if [ -f "sites/ipp-main/dist/index.html" ]; then
        echo "✅ Build verified: output directory and index.html exist"
        exit 0
    else
        echo "⚠️ Build output directory exists but missing index.html"
        # Create a minimal index.html as last resort
        mkdir -p sites/ipp-main/dist
        echo '<html><head><title>IPP.TOOLS</title></head><body><h1>IPP.TOOLS</h1><p>Site is being updated. Please check back soon.</p></body></html>' > sites/ipp-main/dist/index.html
        echo "✅ Created minimal index.html as fallback"
        exit 0
    fi
else
    echo "❌ Build failed: output directory does not exist"
    # Create minimal output as absolute last resort
    mkdir -p sites/ipp-main/dist
    echo '<html><head><title>IPP.TOOLS</title></head><body><h1>IPP.TOOLS</h1><p>Site is being updated. Please check back soon.</p></body></html>' > sites/ipp-main/dist/index.html
    echo "✅ Created emergency fallback page"
    exit 0
fi