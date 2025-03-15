#!/usr/bin/env node

/**
 * IPP.TOOLS Glass Morphic Visualization Generator
 * 
 * This script manages the generation and deployment of glass morphic
 * visualizations within the IPP.TOOLS conversion architecture.
 * 
 * Usage:
 *   node scripts/visualization/generate-glass-visualizations.js
 *   
 * Options:
 *   --output, -o  Output directory (default: public/assets/visualizations)
 *   --config, -c  Configuration file (default: visualization-config.json)
 */

const fs = require('fs').promises;
const path = require('path');
const { GlassMorphicGenerator } = require('./glass-morphic-generator');

// CLI configuration
const { program } = require('commander');

program
  .name('generate-glass-visualizations')
  .description('Generate glass morphic visualizations for IPP.TOOLS')
  .option('-o, --output <directory>', 'Output directory for visualizations', 'public/assets/visualizations')
  .option('-c, --config <path>', 'Path to configuration file', 'visualization-config.json')
  .parse(process.argv);

const options = program.opts();

// Default configuration
let config = {
  outputDir: options.output,
  variants: ['light', 'dark'],
  reactComponentDir: 'src/components/visualizations'
};

/**
 * Load custom configuration if provided
 */
async function loadConfig(configPath) {
  try {
    if (await fileExists(configPath)) {
      const configData = await fs.readFile(configPath, 'utf8');
      const customConfig = JSON.parse(configData);
      return { ...config, ...customConfig };
    }
  } catch (error) {
    console.warn(`⚠️ Warning: Could not load config file ${configPath}:`, error.message);
    console.log('Continuing with default configuration...');
  }
  
  return config;
}

/**
 * Check if a file exists
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensure a directory exists
 */
async function ensureDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    return true;
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
    return true;
  }
}

/**
 * Create dark variants of light visualizations
 */
async function createDarkVariants(directory) {
  console.log('\n🎨 Creating dark variants...');
  
  const files = await fs.readdir(directory);
  const svgFiles = files.filter(file => 
    file.endsWith('.svg') && 
    !file.endsWith('-dark.svg')
  );
  
  for (const file of svgFiles) {
    const filePath = path.join(directory, file);
    const svgContent = await fs.readFile(filePath, 'utf8');
    
    // Create dark variant filename
    const darkVariant = file.replace('.svg', '-dark.svg');
    const darkPath = path.join(directory, darkVariant);
    
    // Replace light colors with dark colors
    const darkContent = svgContent
      .replace(/#f8f9fa/g, '#1e293b')
      .replace(/#e9ecef/g, '#0f172a')
      .replace(/#0f172a/g, '#f1f5f9')
      .replace(/#333/g, '#f1f5f9')
      .replace(/#666/g, '#94a3b8')
      .replace(/#e1e5eb/g, '#2d3748')
      .replace(/rgba\(255, 255, 255/g, 'rgba(30, 41, 59')
      .replace(/rgba\(0, 0, 0/g, 'rgba(255, 255, 255');
    
    await fs.writeFile(darkPath, darkContent);
    console.log(`  ✓ Created dark variant: ${darkVariant}`);
  }
}

/**
 * Main function to generate and process visualizations
 */
async function main() {
  try {
    // Load configuration
    config = await loadConfig(options.config);
    console.log('🚀 Starting IPP.TOOLS Glass Morphic Visualization Generator');
    console.log('===========================================================');
    console.log(`Output directory: ${config.outputDir}`);
    
    // Ensure output directory exists
    await ensureDirectoryExists(config.outputDir);
    
    // Generate visualizations
    const generator = new GlassMorphicGenerator({
      outputDir: config.outputDir
    });
    
    await generator.generateVisualizations();
    
    // Create dark variants if enabled
    if (config.variants.includes('dark')) {
      await createDarkVariants(config.outputDir);
    }
    
    // Final message with usage information
    console.log('\n✅ All visualizations generated successfully!');
    console.log('===========================================================');
    console.log(`
The following SVG visualizations are now available in ${config.outputDir}:

- dashboard.svg / dashboard-dark.svg
  Advanced analytics dashboard visualization

- analysis.svg / analysis-dark.svg
  Content analysis wave visualization with glowing data points

- fallacy.svg / fallacy-dark.svg
  Quality fallacy visualization with psychological trigger points

To use these visualizations in your React application:

1. Import the GlassMorphicVisualization component from ${config.reactComponentDir}
2. Use it as follows:

   <GlassMorphicVisualization 
     type="dashboard"
     variant="light"
     onHover={(type) => console.log(\`Viewed: \${type}\`)}
     onClick={(type) => console.log(\`Clicked: \${type}\`)}
   />
`);
    
  } catch (error) {
    console.error('\n❌ Error generating visualizations:', error);
    process.exit(1);
  }
}

// Execute main function
main();