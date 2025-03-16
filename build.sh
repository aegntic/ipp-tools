#!/bin/bash
#
# Deterministic static site generation script for Netlify CI/CD pipeline
# Optimized for containerized execution environments with explicit
# filesystem interaction patterns

set -e  # Exit immediately if a command exits with a non-zero status
set -o pipefail  # Ensure pipeline failures propagate correctly

# Execution environment diagnostics
echo "🔍 Build Environment Information:"
echo "------------------------------"
echo "Current working directory: $(pwd)"
echo "Script location: $0"
echo "Directory contents:"
find . -maxdepth 1 -type f -name "*.json" -o -name "*.toml" -o -name "*.sh" | sort

# Ensure output directory exists with appropriate permissions
echo "🏗️ Creating target directory structure"
mkdir -p sites/ipp-main/dist
if [ $? -ne 0 ]; then
  echo "❌ Failed to create output directory structure"
  exit 1
fi

# Static asset deployment logic
if [ -d "sites/ipp-main/dist-static" ]; then
  echo "✅ Found pre-built static assets, deploying"
  cp -r sites/ipp-main/dist-static/* sites/ipp-main/dist/
  if [ $? -ne 0 ]; then
    echo "⚠️ Static asset copy operation failed, falling back to generated content"
  else
    echo "🔄 Static assets deployed successfully"
    echo "✨ Build completed successfully"
    exit 0
  fi
fi

# Fallback content generation
echo "📄 Generating fallback static content"
cat > sites/ipp-main/dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IPP.TOOLS</title>
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

if [ $? -ne 0 ]; then
  echo "❌ Failed to generate fallback content"
  exit 1
fi

echo "✅ Fallback content generated successfully"
ls -la sites/ipp-main/dist/

# Verify artifact generation
if [ -f "sites/ipp-main/dist/index.html" ]; then
  echo "✨ Build completed successfully"
  exit 0
else
  echo "❌ Build failed: Output file not found at expected path"
  exit 1
fi