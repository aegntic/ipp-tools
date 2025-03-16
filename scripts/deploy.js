#!/usr/bin/env node

/**
 * IPP.TOOLS Netlify Deployment Script
 * 
 * This script handles the deployment of the IPP.TOOLS ecosystem in a monorepo structure.
 * It ensures proper building and configuration for each site in the ecosystem.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { createDeploymentLock, releaseDeploymentLock } = require('./deployment-lock');

// Determine which site to deploy based on environment variable
const site = process.env.SITE_DOMAIN || 'ipp.tools';
console.log(`🚀 Deploying site: ${site}`);

// Check for recursive deployment - abort if detected
if (!createDeploymentLock(site)) {
  console.error('⛔ Deployment aborted due to recursive loop detection');
  process.exit(1);
}

// Map domains to site directories and build commands
const siteConfig = {
  'ipp.tools': {
    buildCommand: 'npx lerna run build --scope=ipp-main',
    directory: 'sites/ipp-main',
    outputDir: 'sites/ipp-main/dist'
  },
  'cascadevibe.com': {
    buildCommand: 'npm run generate:visualizations:cascadevibe && npx lerna run build --scope=cascadevibe',
    directory: 'sites/cascadevibe',
    outputDir: 'sites/cascadevibe/dist'
  },
  'neuralnarrative.ipp.tools': {
    buildCommand: 'npx lerna run build --scope=neuralnarrative',
    directory: 'sites/neuralnarrative',
    outputDir: 'sites/neuralnarrative/dist'
  },
  'primalposition.ipp.tools': {
    buildCommand: 'npx lerna run build --scope=primalposition',
    directory: 'sites/primalposition',
    outputDir: 'sites/primalposition/dist'
  },
  'quantumconversion.ipp.tools': {
    buildCommand: 'npx lerna run build --scope=quantumconversion',
    directory: 'sites/quantumconversion',
    outputDir: 'sites/quantumconversion/dist'
  }
};

// Default to ipp.tools if the domain is not found in the config
const config = siteConfig[site] || siteConfig['ipp.tools'];

try {
  // Ensure required directories exist
  if (!fs.existsSync(config.directory)) {
    console.warn(`⚠️ Site directory not found: ${config.directory}. Creating it...`);
    try {
      fs.mkdirSync(config.directory, { recursive: true });
      console.log(`✅ Created site directory: ${config.directory}`);
    } catch (dirError) {
      console.error(`❌ Failed to create site directory: ${dirError.message}`);
      releaseDeploymentLock(); // Release lock on error
      process.exit(1);
    }
  }

  // Create visualization output directory if it doesn't exist
  const visualizationDir = path.join(config.directory, 'public/assets/visualizations');
  try {
    if (!fs.existsSync(visualizationDir)) {
      fs.mkdirSync(visualizationDir, { recursive: true });
      console.log(`✅ Created visualization directory: ${visualizationDir}`);
    }
  } catch (visualizationDirError) {
    console.error(`⚠️ Warning: Could not create visualization directory: ${visualizationDirError.message}`);
    console.log('Will attempt to continue with installation...');
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (installError) {
    console.error(`❌ Error installing dependencies: ${installError.message}`);
    console.log('Will attempt to continue with build...');
  }

  // Ensure lerna is available
  console.log('🔍 Verifying lerna availability...');
  try {
    execSync('node scripts/ensure-lerna.js', { stdio: 'inherit' });
  } catch (lernaError) {
    console.error(`❌ Lerna verification failed: ${lernaError.message}`);
    console.log('Attempting to continue with build...');
  }

  // Generate visualizations first - with force flag set to false to prevent regeneration
  console.log('🎨 Generating visualizations...');
  try {
    execSync(`node scripts/visualization/generate-glass-visualizations.js -o ${visualizationDir}`, { 
      stdio: 'inherit',
      env: { ...process.env, VISUALIZATION_OUTPUT_DIR: visualizationDir }
    });
    console.log('✅ Visualizations generated successfully');
  } catch (visualizationError) {
    console.warn('⚠️ Warning: Visualization generation encountered issues, but proceeding with build');
    console.error(`Visualization error details: ${visualizationError.message}`);
  }

  // Build the site - using npx to ensure lerna is available
  console.log(`🏗️ Building site with command: ${config.buildCommand}`);
  try {
    // First attempt with npx
    execSync(config.buildCommand, { stdio: 'inherit' });
    console.log(`✅ Build completed successfully. Output directory: ${config.outputDir}`);
  } catch (buildError) {
    console.error(`❌ Build failed: ${buildError.message}`);
    console.log('🔄 Attempting fallback build method...');
    
    try {
      // Fallback to direct node_modules path
      const localLernaBin = path.join(__dirname, '..', 'node_modules', '.bin', 'lerna');
      const fallbackCommand = config.buildCommand.replace('npx lerna', `node "${localLernaBin}"`);
      console.log(`🔄 Executing fallback command: ${fallbackCommand}`);
      
      execSync(fallbackCommand, { stdio: 'inherit' });
      console.log(`✅ Fallback build completed successfully. Output directory: ${config.outputDir}`);
    } catch (fallbackError) {
      console.error(`❌ Fallback build also failed: ${fallbackError.message}`);
      releaseDeploymentLock(); // Release lock on error
      process.exit(1);
    }
  }

  // Copy the _redirects file if needed
  const redirectsSource = path.join(config.directory, '_redirects');
  const redirectsTarget = path.join(config.outputDir, '_redirects');
  
  try {
    if (fs.existsSync(redirectsSource) && !fs.existsSync(redirectsTarget)) {
      fs.copyFileSync(redirectsSource, redirectsTarget);
      console.log('✅ Copied _redirects file');
    }
  } catch (redirectsError) {
    console.warn(`⚠️ Warning: Could not copy _redirects file: ${redirectsError.message}`);
  }

  console.log('🚀 Deployment preparation complete!');
  
  // Release the deployment lock when everything is done
  releaseDeploymentLock();
  
} catch (error) {
  console.error('❌ Deployment script failed:', error.message);
  
  // Make sure to release the lock on any error
  releaseDeploymentLock();
  
  process.exit(1);
}