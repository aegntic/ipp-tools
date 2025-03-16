#!/usr/bin/env node

/**
 * IPP.TOOLS Permission Fixer
 * 
 * This script ensures all required scripts have proper execution permissions
 * for deployment environments.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Scripts that need executable permissions
const executableScripts = [
  'scripts/deploy.js',
  'scripts/ensure-lerna.js',
  'scripts/build-wrapper.sh',
  'scripts/make-executable.js'
];

console.log('🔧 Setting executable permissions on critical scripts...');

// Make files executable
executableScripts.forEach(scriptPath => {
  const fullPath = path.join(__dirname, '..', scriptPath);
  
  try {
    if (fs.existsSync(fullPath)) {
      // For Unix systems, set executable permissions
      if (process.platform !== 'win32') {
        fs.chmodSync(fullPath, '755');
        console.log(`✅ Set executable permissions on ${scriptPath}`);
      } else {
        // On Windows, we don't need to set permissions but can verify the file exists
        console.log(`✅ Verified ${scriptPath} exists (permissions not required on Windows)`);
      }
    } else {
      console.warn(`⚠️ Script not found: ${scriptPath}`);
    }
  } catch (error) {
    console.error(`❌ Error setting permissions on ${scriptPath}: ${error.message}`);
  }
});

// Create missing directories for visualizations
const visualizationDirs = [
  'sites/ipp-main/public/assets/visualizations',
  'sites/cascadevibe/public/assets/visualizations'
];

console.log('\n🔧 Creating visualization directories if needed...');

visualizationDirs.forEach(dirPath => {
  const fullPath = path.join(__dirname, '..', dirPath);
  
  try {
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      // Create a .gitkeep file to ensure the directory is committed
      fs.writeFileSync(path.join(fullPath, '.gitkeep'), '');
      console.log(`✅ Created directory ${dirPath}`);
    } else {
      console.log(`✅ Directory ${dirPath} already exists`);
    }
  } catch (error) {
    console.error(`❌ Error creating directory ${dirPath}: ${error.message}`);
  }
});

// On Unix systems, execute the shell command to ensure permissions are set
if (process.platform !== 'win32') {
  try {
    console.log('\n🔧 Applying executable permissions via shell command for additional reliability...');
    execSync('chmod +x scripts/*.js scripts/*.sh', { stdio: 'inherit' });
    console.log('✅ Applied permissions via shell command');
  } catch (error) {
    console.warn(`⚠️ Shell permission command failed, but individual permissions were still set: ${error.message}`);
  }
}

// Verify lerna is available
console.log('\n🔍 Verifying lerna availability...');
try {
  const lernaVersion = execSync('npx lerna --version', { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
  console.log(`✅ Lerna is available: ${lernaVersion}`);
} catch (error) {
  console.warn('⚠️ Lerna is not available via npx. Attempting to install...');
  try {
    execSync('npm install --save-dev lerna@^8.0.0', { stdio: 'inherit' });
    console.log('✅ Lerna installed successfully');
  } catch (installError) {
    console.error(`❌ Failed to install lerna: ${installError.message}`);
  }
}

// Create the bin directory for local binary links
try {
  const binDir = path.join(__dirname, '..', 'bin');
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
    console.log('✅ Created bin directory for local binary links');
  }
} catch (error) {
  console.warn(`⚠️ Could not create bin directory: ${error.message}`);
}

console.log('\n✅ Permission and directory validation complete!');
console.log('The deployment system is now configured for maximum compatibility across environments.');
