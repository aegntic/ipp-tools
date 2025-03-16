#!/usr/bin/env node

/**
 * IPP.TOOLS Lerna Availability Check
 * 
 * This script ensures that lerna is available in the execution environment
 * for deployment and build processes.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔍 Ensuring lerna is available for build processes...');

// Check if lerna is installed globally
try {
  const result = execSync('npx lerna --version', { stdio: ['pipe', 'pipe', 'pipe'] });
  console.log(`✅ Lerna is available: ${result.toString().trim()}`);
} catch (error) {
  console.warn('⚠️ Lerna is not available via npx. Installing locally...');
  
  try {
    // Install lerna locally if not already installed
    execSync('npm install --save-dev lerna@8.1.2', { stdio: 'inherit' });
    console.log('✅ Lerna installed successfully');
    
    // Verify installation
    const localLernaPath = path.join(__dirname, '..', 'node_modules', '.bin', 'lerna');
    if (fs.existsSync(localLernaPath)) {
      console.log('✅ Verified local lerna installation');
    } else {
      throw new Error('Local lerna binary not found after installation');
    }
  } catch (installError) {
    console.error('❌ Failed to install lerna:', installError.message);
    console.error('Please run: npm install --save-dev lerna@8.1.2');
    process.exit(1);
  }
}

// Create a local binary link to ensure availability in path
const localBinDir = path.join(__dirname, '..', 'node_modules', '.bin');
const projectBinDir = path.join(__dirname, '..', 'bin');

try {
  if (!fs.existsSync(projectBinDir)) {
    fs.mkdirSync(projectBinDir, { recursive: true });
  }
  
  const lernaSource = path.join(localBinDir, 'lerna');
  const lernaTarget = path.join(projectBinDir, 'lerna');
  
  if (fs.existsSync(lernaSource) && !fs.existsSync(lernaTarget)) {
    // Create symlink on Unix systems or copy on Windows
    if (process.platform === 'win32') {
      fs.copyFileSync(lernaSource, lernaTarget);
    } else {
      fs.symlinkSync(lernaSource, lernaTarget);
    }
    console.log('✅ Created local lerna binary link for improved availability');
  }
} catch (linkError) {
  console.warn(`⚠️ Note: Could not create local binary link: ${linkError.message}`);
  console.log('This is not critical but may affect some deployment environments');
}

console.log('✅ Lerna availability check completed successfully');

// Export a validation function for use in other scripts
module.exports = {
  validateLerna: function() {
    try {
      execSync('npx lerna --version', { stdio: ['pipe', 'pipe', 'pipe'] });
      return true;
    } catch (error) {
      return false;
    }
  }
};