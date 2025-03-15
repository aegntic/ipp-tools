#!/usr/bin/env node

/**
 * IPP.TOOLS Glass Morphic Visualization Generator
 * 
 * This script generates psychologically-optimized SVG visualizations
 * that implement the glass morphic design system with embedded
 * cognitive triggers.
 * 
 * Usage:
 *   node generate-glass-visualizations.js [options]
 * 
 * Options:
 *   -o, --output <dir>    Output directory for visualizations
 *   -t, --types <types>   Visualization types to generate (comma-separated)
 *   -v, --variant <var>   Variant style (glass, subtle, standard, dark)
 *   -f, --force           Force regeneration of all assets
 *   -h, --help            Show help
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Set up commander for command line arguments
program
  .option('-o, --output <dir>', 'Output directory for visualizations', './public/assets/visualizations')
  .option('-t, --types <types>', 'Visualization types to generate (comma-separated)', 'all')
  .option('-v, --variant <variant>', 'Variant style (glass, subtle, standard, dark)', 'all')
  .option('-f, --force', 'Force regeneration of all assets', false)
  .option('-h, --help', 'Show help')
  .parse(process.argv);

const options = program.opts();

// Create output directory if it doesn't exist
const outputDir = path.resolve(process.cwd(), options.output);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create SVG functions - Using direct string generation for maximum compatibility
function generateSVG(width, height, content) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${content}
</svg>`;
}

// Color schemes 
const colorSchemes = {
  'primary': {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff']
  },
  'secondary': {
    main: '#8400ff',
    light: '#9b33ff',
    dark: '#6800cc',
    gradient: ['#8400ff', '#5468ff']
  },
  'authority': {
    main: '#0ea5e9',
    light: '#38bdf8',
    dark: '#0284c7',
    gradient: ['#0ea5e9', '#2563eb']
  }
};

// Visualization types
const visualizationTypes = {
  'dashboard': generateDashboardVisualization,
  'chart': generateChartVisualization,
  'error': generateErrorVisualization,
  'logo': generateLogoVisualization
};

// Variant styles
const variants = ['glass', 'subtle', 'standard', 'dark'];

/**
 * Main function to generate all visualizations
 */
async function generateVisualizations() {
  console.log('🚀 IPP.TOOLS Glass Morphic Visualization Generator');
  console.log('------------------------------------------------');
  console.log(`Output directory: ${outputDir}`);
  
  // Determine which types to generate
  const typesToGenerate = options.types === 'all' 
    ? Object.keys(visualizationTypes)
    : options.types.split(',');
  
  // Determine which variants to generate
  const variantsToGenerate = options.variant === 'all'
    ? variants
    : [options.variant];
  
  console.log(`Generating ${typesToGenerate.length} visualization types`);
  console.log(`Variants: ${variantsToGenerate.join(', ')}`);
  console.log('------------------------------------------------');
  
  // Generate each type in each variant
  let totalGenerated = 0;
  
  for (const type of typesToGenerate) {
    const generator = visualizationTypes[type];
    
    if (!generator) {
      console.warn(`⚠️  Unknown visualization type: ${type}`);
      continue;
    }
    
    console.log(`\n📊 Generating ${type} visualizations...`);
    
    for (const variant of variantsToGenerate) {
      // Generate for each color scheme
      for (const [colorName, colorScheme] of Object.entries(colorSchemes)) {
        const filename = `${type}-visualization-${variant}${colorName !== 'primary' ? `-${colorName}` : ''}.svg`;
        const outputPath = path.join(outputDir, filename);
        
        // Skip if file exists and force flag is not set
        if (fs.existsSync(outputPath) && !options.force) {
          console.log(`  ⏩ Skipping ${filename} (already exists)`);
          continue;
        }
        
        try {
          // Generate the visualization content
          const svgContent = generator(variant, colorScheme);
          
          // Save to file
          fs.writeFileSync(outputPath, svgContent);
          console.log(`  ✅ Generated ${filename}`);
          totalGenerated++;
        } catch (error) {
          console.error(`  ❌ Error generating ${filename}:`, error);
        }
      }
    }
  }
  
  console.log('\n------------------------------------------------');
  console.log(`🎉 Generated ${totalGenerated} visualizations`);
}

/**
 * Generate a dashboard visualization with cognitive triggers
 */
function generateDashboardVisualization(variant, colorScheme) {
  // Ensure colorScheme is defined with fallbacks
  colorScheme = colorScheme || colorSchemes.primary;
  
  // Background colors based on variant
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  const textColor = variant === 'dark' ? '#f1f5f9' : '#333333';
  const subTextColor = variant === 'dark' ? '#94a3b8' : '#666666';
  const cardBgColor = variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const borderColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  
  // SVG content generation - using explicit string manipulation for maximum compatibility
  let content = `
  <!-- Background -->
  <rect width="800" height="600" fill="${bgColor}" />
  
  <!-- Dashboard title -->
  <text x="50" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${textColor}">Cognitive Engagement Framework</text>
  <text x="50" y="80" font-family="Arial, sans-serif" font-size="16" fill="${subTextColor}">Analysis of high-performing psychological content</text>
  
  <!-- Metrics Cards -->
  <!-- Engagement Metric -->
  <g transform="translate(50, 120)">
    <rect x="0" y="0" width="200" height="100" rx="10" ry="10" fill="${cardBgColor}" stroke="${borderColor}" />
    <text x="20" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${colorScheme.main}">572%</text>
    <text x="20" y="70" font-family="Arial, sans-serif" font-size="14" fill="${subTextColor}">Average Engagement</text>
  </g>
  
  <!-- Creators Metric -->
  <g transform="translate(270, 120)">
    <rect x="0" y="0" width="200" height="100" rx="10" ry="10" fill="${cardBgColor}" stroke="${borderColor}" />
    <text x="20" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${colorScheme.main}">15,000+</text>
    <text x="20" y="70" font-family="Arial, sans-serif" font-size="14" fill="${subTextColor}">Elite Creators</text>
  </g>
  
  <!-- Success Metric -->
  <g transform="translate(490, 120)">
    <rect x="0" y="0" width="200" height="100" rx="10" ry="10" fill="${cardBgColor}" stroke="${borderColor}" />
    <text x="20" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${colorScheme.main}">97.8%</text>
    <text x="20" y="70" font-family="Arial, sans-serif" font-size="14" fill="${subTextColor}">Implementation Success</text>
  </g>
  
  <!-- Framework Effectiveness Chart -->
  <g transform="translate(50, 240)">
    <rect x="0" y="0" width="640" height="300" rx="10" ry="10" fill="${cardBgColor}" stroke="${borderColor}" />
    <text x="20" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${textColor}">Framework Performance Analysis</text>
    
    <!-- Chart Axes -->
    <line x1="50" y1="250" x2="590" y2="250" stroke="${subTextColor}" />
    <line x1="50" y1="80" x2="50" y2="250" stroke="${subTextColor}" />
    
    <!-- IPP Framework Line -->
    <path d="M50,250 L110,220 L170,180 L230,130 L290,90 L350,60 L410,40 L470,30 L530,25" fill="none" stroke="${colorScheme.main}" stroke-width="3" />
    
    <!-- Traditional Methods Line -->
    <path d="M50,250 L110,240 L170,230 L230,220 L290,210 L350,200 L410,190 L470,180 L530,170" fill="none" stroke="${subTextColor}" stroke-width="2" stroke-dasharray="5,5" />
    
    <!-- Legend -->
    <rect x="450" y="80" width="12" height="4" fill="${colorScheme.main}" />
    <text x="470" y="85" font-family="Arial, sans-serif" font-size="12" fill="${textColor}">IPP Framework</text>
    
    <rect x="450" y="100" width="12" height="4" fill="${subTextColor}" />
    <text x="470" y="105" font-family="Arial, sans-serif" font-size="12" fill="${textColor}">Traditional Methods</text>
  </g>
  
  <!-- Footer -->
  <text x="50" y="570" font-family="Arial, sans-serif" font-size="12" fill="${subTextColor}">© IPP.TOOLS 2025</text>
  `;
  
  return generateSVG(800, 600, content);
}

/**
 * Generate a chart visualization
 */
function generateChartVisualization(variant, colorScheme) {
  // Ensure colorScheme is defined with fallbacks
  colorScheme = colorScheme || colorSchemes.primary;
  
  // Background colors based on variant
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  const textColor = variant === 'dark' ? '#f1f5f9' : '#333333';
  const subTextColor = variant === 'dark' ? '#94a3b8' : '#666666';
  const cardBgColor = variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const borderColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  
  // Generate SVG content
  let content = `
  <!-- Background -->
  <rect width="800" height="600" fill="${bgColor}" />
  
  <!-- Chart Title -->
  <text x="50" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${textColor}">Performance Analysis: Elite Framework Implementation</text>
  <text x="50" y="80" font-family="Arial, sans-serif" font-size="16" fill="${subTextColor}">Why 93% of creators using traditional methods are being left behind</text>
  
  <!-- Main Chart -->
  <g transform="translate(50, 120)">
    <rect x="0" y="0" width="700" height="400" rx="10" ry="10" fill="${cardBgColor}" stroke="${borderColor}" />
    
    <!-- Chart Axes -->
    <line x1="50" y1="350" x2="650" y2="350" stroke="${subTextColor}" stroke-width="1" />
    <line x1="50" y1="50" x2="50" y2="350" stroke="${subTextColor}" stroke-width="1" />
    
    <!-- X Axis Labels -->
    <text x="350" y="380" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="${subTextColor}">Implementation Time (Days)</text>
    
    <!-- Y Axis Labels -->
    <text x="30" y="200" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="${subTextColor}" transform="rotate(-90 30,200)">Engagement Growth (%)</text>
    
    <!-- Data Points - IPP Framework -->
    <path d="M50,350 L110,300 L170,240 L230,170 L290,110 L350,70 L410,50 L470,40 L530,35 L590,30 L650,25" fill="none" stroke="${colorScheme.main}" stroke-width="3" />
    
    <!-- Data Points - Traditional Methods -->
    <path d="M50,350 L110,340 L170,330 L230,325 L290,320 L350,315 L410,310 L470,305 L530,300 L590,295 L650,290" fill="none" stroke="${subTextColor}" stroke-width="2" stroke-dasharray="5,5" />
    
    <!-- Legend -->
    <rect x="500" y="80" width="15" height="3" fill="${colorScheme.main}" />
    <text x="520" y="85" font-family="Arial, sans-serif" font-size="14" fill="${textColor}">IPP Framework</text>
    
    <rect x="500" y="110" width="15" height="3" fill="${subTextColor}" />
    <text x="520" y="115" font-family="Arial, sans-serif" font-size="14" fill="${textColor}">Traditional Methods</text>
  </g>
  `;
  
  return generateSVG(800, 600, content);
}

/**
 * Generate an error visualization
 */
function generateErrorVisualization(variant, colorScheme) {
  // Ensure colorScheme is defined with fallbacks
  colorScheme = colorScheme || colorSchemes.primary;
  
  // Background colors based on variant
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  const textColor = variant === 'dark' ? '#f1f5f9' : '#333333';
  const subTextColor = variant === 'dark' ? '#94a3b8' : '#666666';
  
  // Generate SVG content
  let content = `
  <!-- Background -->
  <rect width="800" height="600" fill="${bgColor}" />
  
  <!-- Error Title -->
  <text x="200" y="150" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${textColor}">You've Discovered A Cognitive Gap</text>
  
  <!-- 404 Text -->
  <text x="275" y="300" font-family="Arial, sans-serif" font-size="160" font-weight="bold" fill="none" stroke="${colorScheme.main}" stroke-width="2" stroke-opacity="0.5">404</text>
  
  <!-- Abstract Pattern -->
  <g transform="translate(250, 340)">
  `;
  
  // Generate abstract pattern
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const x = i * 60;
      const y = j * 30;
      
      // Only draw some nodes for an incomplete pattern
      if ((i + j) % 3 !== 0) {
        content += `<circle cx="${x + 4}" cy="${y + 4}" r="4" fill="${colorScheme.main}" opacity="${(i + j) % 2 === 0 ? 0.7 : 0.4}" />`;
      }
      
      // Draw only some connections
      if (i < 4 && (i + j) % 2 === 0) {
        content += `<line x1="${x + 8}" y1="${y + 4}" x2="${x + 60}" y2="${y + 4}" stroke="${colorScheme.main}" stroke-width="1" stroke-opacity="0.3" />`;
      }
      
      if (j < 4 && (i + j) % 3 !== 0) {
        content += `<line x1="${x + 4}" y1="${y + 8}" x2="${x + 4}" y2="${y + 30}" stroke="${colorScheme.main}" stroke-width="1" stroke-opacity="0.2" />`;
      }
    }
  }
  
  content += `
  </g>
  
  <!-- Subtext -->
  <text x="400" y="480" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="${subTextColor}">The path you're looking for doesn't exist, but like any elite creator, you can quickly pivot to a new opportunity.</text>
  `;
  
  return generateSVG(800, 600, content);
}

/**
 * Generate a logo visualization
 */
function generateLogoVisualization(variant, colorScheme) {
  // Ensure colorScheme is defined with fallbacks
  colorScheme = colorScheme || colorSchemes.primary;
  
  // Background colors based on variant
  const textColor = variant === 'dark' ? '#f1f5f9' : 
                   (variant === 'white' ? '#0f172a' : '#334155');
  
  // Generate SVG content
  let content = `
  <!-- Logo Box -->
  <rect x="10" y="10" width="40" height="40" rx="5" ry="5" fill="${colorScheme.main}" />
  
  <!-- Logo Text in Box -->
  <text x="30" y="35" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#ffffff">IPP</text>
  
  <!-- Logo Text -->
  <text x="70" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${textColor}">IPP.TOOLS</text>
  `;
  
  return generateSVG(180, 60, content);
}

// Run the main function
generateVisualizations();