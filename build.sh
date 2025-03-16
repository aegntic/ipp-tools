#!/bin/bash

# Ultra-simple deploy script with zero dependencies
# Created specifically for Netlify deployment environment

echo "🚀 Starting minimal build process"
echo "--------------------------------"

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
  <style>
    body { 
      background: #0f172a; 
      color: white; 
      font-family: sans-serif; 
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
      font-size: 3rem;
    }
    p { 
      margin-top: 1rem; 
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
  echo "✅ Created minimal index.html"
fi

echo "✅ Build completed successfully"
exit 0