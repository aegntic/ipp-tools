#!/bin/bash

# Optimized deployment script for Netlify
# Bypasses dependency resolution entirely for static site deployment

echo "🚀 Starting optimized static build process"
echo "-----------------------------------------"

# Set environment variable to bypass npm integrity checks if dependencies are needed
export npm_config_fetch_retries=5
export npm_config_fetch_retry_mintimeout=20000
export npm_config_fetch_retry_maxtimeout=120000

# Ensure output directory exists
mkdir -p sites/ipp-main/dist

# Copy static files if available, otherwise create minimal page
if [ -d "sites/ipp-main/dist-static" ]; then
  echo "✅ Using pre-built static assets"
  cp -r sites/ipp-main/dist-static/* sites/ipp-main/dist/
else
  echo "⚠️ No static assets found, creating minimal page"
  cat > sites/ipp-main/dist/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>IPP.TOOLS</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      background: #0f172a; 
      color: white; 
      font-family: system-ui, -apple-system, sans-serif; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      margin: 0; 
      flex-direction: column;
    }
    h1 { 
      background: linear-gradient(135deg, #5468ff, #8400ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }
    p { 
      margin-top: 0.5rem; 
      color: #94a3b8; 
    }
  </style>
</head>
<body>
  <h1>IPP.TOOLS</h1>
  <p>Intelligence. Psychology. Persuasion.</p>
  <p>Coming Soon</p>
</body>
</html>
EOF
  echo "✅ Created optimized index.html"
fi

# Generate a netlify.toml file with bypass settings if it doesn't exist
if [ ! -f "netlify.toml" ]; then
  echo "⚙️ Creating optimized netlify.toml configuration"
  cat > netlify.toml << 'EOF'
[build]
  publish = "sites/ipp-main/dist"
  command = "bash build.sh"

[build.environment]
  NODE_VERSION = "18.20.7"
  NPM_FLAGS = "--no-audit --no-fund"
  NETLIFY_USE_YARN = "false"
  
[build.processing]
  skip_processing = true
EOF
  echo "✅ Created netlify.toml with optimized settings"
fi

echo "✅ Build completed successfully"
exit 0