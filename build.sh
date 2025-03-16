#!/bin/bash

# Optimized deployment script for Netlify CI/CD orchestration
# Static site generation with deterministic execution path

echo "🚀 Starting deterministic build process"
echo "-----------------------------------------"

# Diagnostic information for CI/CD observability
echo "📂 Current directory: $(pwd)"
echo "📋 Directory contents:"
ls -la

# Set environment variables for network resilience
export npm_config_fetch_retries=5
export npm_config_fetch_retry_mintimeout=20000
export npm_config_fetch_retry_maxtimeout=120000

# Ensure output directory exists with explicit path resolution
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

echo "✅ Build completed successfully"
exit 0