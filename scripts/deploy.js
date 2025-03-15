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

// Determine which site to deploy based on environment variable
const site = process.env.SITE_DOMAIN || 'ipp.tools';
console.log(`🚀 Deploying site: ${site}`);

// Map domains to site directories and build commands
const siteConfig = {
  'ipp.tools': {
    buildCommand: 'npm run build:ipp',
    directory: 'sites/ipp-main',
    outputDir: 'sites/ipp-main/dist'
  },
  'cascadevibe.com': {
    buildCommand: 'npm run build:cascadevibe',
    directory: 'sites/cascadevibe',
    outputDir: 'sites/cascadevibe/dist'
  },
  'neuralnarrative.ipp.tools': {
    buildCommand: 'npm run build:neuralnarrative',
    directory: 'sites/neuralnarrative',
    outputDir: 'sites/neuralnarrative/dist'
  },
  'primalposition.ipp.tools': {
    buildCommand: 'npm run build:primalposition',
    directory: 'sites/primalposition',
    outputDir: 'sites/primalposition/dist'
  },
  'quantumconversion.ipp.tools': {
    buildCommand: 'npm run build:quantumconversion',
    directory: 'sites/quantumconversion',
    outputDir: 'sites/quantumconversion/dist'
  }
};

// Default to ipp.tools if the domain is not found in the config
const config = siteConfig[site] || siteConfig['ipp.tools'];

try {
  // Ensure required directories exist
  if (!fs.existsSync(config.directory)) {
    console.error(`❌ Site directory not found: ${config.directory}`);
    process.exit(1);
  }

  // Create visualization output directory if it doesn't exist
  const visualizationDir = path.join(config.directory, 'public/assets/visualizations');
  if (!fs.existsSync(visualizationDir)) {
    fs.mkdirSync(visualizationDir, { recursive: true });
    console.log(`✅ Created visualization directory: ${visualizationDir}`);
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Generate visualizations first
  console.log('🎨 Generating visualizations...');
  try {
    execSync('node scripts/visualization/generate-glass-visualizations.js -o ' + visualizationDir, { 
      stdio: 'inherit',
      env: { ...process.env, VISUALIZATION_OUTPUT_DIR: visualizationDir }
    });
    console.log('✅ Visualizations generated successfully');
  } catch (error) {
    console.warn('⚠️ Warning: Visualization generation encountered issues, but proceeding with build');
  }

  // Build the site
  console.log(`🏗️ Building site with command: ${config.buildCommand}`);
  execSync(config.buildCommand, { stdio: 'inherit' });

  // If we get here, the build was successful
  console.log(`✅ Build completed successfully. Output directory: ${config.outputDir}`);

  // Copy the _redirects file if needed
  const redirectsSource = path.join(config.directory, '_redirects');
  const redirectsTarget = path.join(config.outputDir, '_redirects');
  
  if (fs.existsSync(redirectsSource) && !fs.existsSync(redirectsTarget)) {
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('✅ Copied _redirects file');
  }

  console.log('🚀 Deployment preparation complete!');
} catch (error) {
  console.error('❌ Deployment script failed:', error.message);
  process.exit(1);
}
