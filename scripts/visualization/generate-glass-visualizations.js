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
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');

// Check for visualization-config.json
const configPath = path.resolve(process.cwd(), 'visualization-config.json');
let config = {
  visualizationTypes: [
    "dashboard",
    "chart",
    "analysis",
    "fallacy",
    "logo",
    "error",
    "particles"
  ],
  colorSchemes: {
    primary: {
      main: "#5468ff",
      light: "#7d8bff",
      dark: "#3a4eef",
      gradient: ["#5468ff", "#8400ff"]
    }
  }
};

// Try to load config file if it exists
if (fs.existsSync(configPath)) {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log('✅ Loaded visualization configuration from visualization-config.json');
  } catch (error) {
    console.warn('⚠️ Error loading visualization configuration, using defaults:', error.message);
  }
}

// Setup command-line interface
program
  .option('-o, --output <dir>', 'Output directory for visualizations', './public/assets/visualizations')
  .option('-t, --types <types>', 'Visualization types to generate (comma-separated)', 'all')
  .option('-v, --variant <variant>', 'Variant style (glass, subtle, standard, dark)', 'all')
  .option('-f, --force', 'Force regeneration of all assets', false)
  .option('-h, --help', 'Show help')
  .parse(process.argv);

const options = program.opts();

// Set up SVG.js with svgdom
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

// Visualization types
const visualizationTypes = {
  'dashboard': generateDashboardVisualization,
  'chart': generateChartVisualization,
  'analysis': generateAnalysisVisualization,
  'fallacy': generateFallacyVisualization,
  'logo': generateLogoVisualization,
  'error': generateErrorVisualization,
  'particles': generateParticlesVisualization
};

// Variant styles
const variants = ['glass', 'subtle', 'standard', 'dark'];

// Color schemes from config
const colorSchemes = config.colorSchemes || {
  'primary': {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff']
  }
};

// Create output directory if it doesn't exist
const outputDir = path.resolve(process.cwd(), options.output);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

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
          // Create SVG document
          const svg = SVG(document.documentElement).size(800, 600);
          
          // Generate the visualization using a defensive execution pattern
          try {
            await generator(svg, variant, colorScheme || {
              main: '#5468ff',
              light: '#7d8bff',
              dark: '#3a4eef',
              gradient: ['#5468ff', '#8400ff']
            });
          } catch (error) {
            console.error(`  ⚠️ Error in ${type} visualization generation:`, error);
            // Draw fallback visualization
            drawFallbackVisualization(svg, type, variant, colorScheme || {
              main: '#5468ff',
              light: '#7d8bff',
              dark: '#3a4eef',
              gradient: ['#5468ff', '#8400ff']
            });
          }
          
          // Save to file
          fs.writeFileSync(outputPath, svg.svg());
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
 * Creates a fallback visualization when the primary generator fails
 */
function drawFallbackVisualization(svg, type, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Set a safe background color based on variant
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Add error text
  svg.text(`Visualization Generation: ${type}`)
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(50, 50);
  
  // Add error card
  const errorCard = svg.group().transform('translate(50, 100)');
  
  errorCard.rect(700, 100)
    .radius(10)
    .fill(variant === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb');
  
  errorCard.text("This visualization is being regenerated for optimal performance")
    .font({
      family: 'Arial, sans-serif',
      size: 18
    })
    .fill(safeColorScheme.main)
    .move(50, 40);
  
  // Add a sample shape related to the visualization type
  const shapeGroup = svg.group().transform('translate(350, 300)');
  
  if (type === 'dashboard') {
    // Draw a simple dashboard icon
    shapeGroup.rect(100, 70).radius(5).fill('none').stroke({color: safeColorScheme.main, width: 2});
    shapeGroup.rect(30, 20).radius(2).fill(safeColorScheme.main).move(10, 10);
    shapeGroup.rect(30, 20).radius(2).fill(safeColorScheme.light).move(60, 10);
    shapeGroup.rect(80, 20).radius(2).fill(safeColorScheme.dark).move(10, 40);
  } else if (type === 'chart') {
    // Draw a simple chart icon
    shapeGroup.polyline([0,50, 20,30, 40,40, 60,10, 80,25]).fill('none').stroke({color: safeColorScheme.main, width: 2});
    shapeGroup.line(0, 60, 80, 60).stroke({color: safeColorScheme.dark, width: 2});
    shapeGroup.line(0, 0, 0, 60).stroke({color: safeColorScheme.dark, width: 2});
  } else {
    // Generic shape for other types
    shapeGroup.circle(80).fill('none').stroke({color: safeColorScheme.main, width: 2});
    shapeGroup.rect(60, 60).fill('none').stroke({color: safeColorScheme.light, width: 2}).move(10, 10);
  }
  
  // Add footer text
  svg.text("© IPP.TOOLS 2025")
    .font({
      family: 'Arial, sans-serif',
      size: 12
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .move(50, 550);
}

/**
 * Error visualization with cognitive gap framing
 */
function generateErrorVisualization(svg, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Create cognitive gap title with proper apostrophe escape
  svg.text("You've Discovered A Cognitive Gap")
    .font({
      family: 'Arial, sans-serif',
      size: 32,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(200, 150);
  
  // 404 with cognitive styling
  svg.text('404')
    .font({
      family: 'Arial, sans-serif',
      size: 160,
      weight: 'bold'
    })
    .fill('none')
    .stroke({
      color: safeColorScheme.main,
      width: 2,
      opacity: 0.5
    })
    .move(275, 200);
  
  // Create abstract pattern for visual intrigue
  const patternGroup = svg.group().transform('translate(250, 340)');
  
  // Draw abstract neural network pattern
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const x = i * 60;
      const y = j * 30;
      
      // Only draw some nodes for an incomplete pattern (cognitive gap)
      if ((i + j) % 3 !== 0) {
        patternGroup
          .circle(8)
          .fill(safeColorScheme.main)
          .opacity((i + j) % 2 === 0 ? 0.7 : 0.4)
          .move(x, y);
      }
      
      // Draw only some connections for an incomplete pattern
      if (i < 4 && (i + j) % 2 === 0) {
        patternGroup
          .line(x + 8, y + 4, x + 60, y + 4)
          .stroke({
            color: safeColorScheme.main,
            width: 1,
            opacity: 0.3
          });
      }
      
      if (j < 4 && (i + j) % 3 !== 0) {
        patternGroup
          .line(x + 4, y + 8, x + 4, y + 30)
          .stroke({
            color: safeColorScheme.main,
            width: 1,
            opacity: 0.2
          });
      }
    }
  }
  
  // Subtext with identity reinforcement
  svg.text("The path you're looking for doesn't exist, but like any elite creator, you can quickly pivot to a new opportunity.")
    .font({
      family: 'Arial, sans-serif',
      size: 16
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .attr('text-anchor', 'middle')
    .move(400, 480);
}

/**
 * Generate a dashboard visualization with cognitive triggers
 */
function generateDashboardVisualization(svg, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Background with subtle gradient
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Draw dashboard elements
  svg.text('Cognitive Engagement Framework')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(50, 50);
  
  svg.text('Analysis of high-performing psychological content')
    .font({
      family: 'Arial, sans-serif',
      size: 16
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .move(50, 80);
  
  // Key metrics
  const metricsGroup = svg.group().transform('translate(50, 150)');
  
  // Engagement metric
  const metric1 = metricsGroup.group();
  metric1.rect(200, 100).radius(10).fill(variant === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)').stroke('#e1e5eb').move(0, 0);
  metric1.text('572%').font({ family: 'Arial', size: 32, weight: 'bold' }).fill(safeColorScheme.main).move(20, 30);
  metric1.text('Average Engagement').font({ family: 'Arial', size: 14 }).fill(variant === 'dark' ? '#94a3b8' : '#666').move(20, 70);
  
  // Creators metric
  const metric2 = metricsGroup.group();
  metric2.rect(200, 100).radius(10).fill(variant === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)').stroke('#e1e5eb').move(220, 0);
  metric2.text('15,000+').font({ family: 'Arial', size: 32, weight: 'bold' }).fill(safeColorScheme.main).move(240, 30);
  metric2.text('Elite Creators').font({ family: 'Arial', size: 14 }).fill(variant === 'dark' ? '#94a3b8' : '#666').move(240, 70);
  
  // Success metric
  const metric3 = metricsGroup.group();
  metric3.rect(200, 100).radius(10).fill(variant === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)').stroke('#e1e5eb').move(440, 0);
  metric3.text('97.8%').font({ family: 'Arial', size: 32, weight: 'bold' }).fill(safeColorScheme.main).move(460, 30);
  metric3.text('Implementation Success').font({ family: 'Arial', size: 14 }).fill(variant === 'dark' ? '#94a3b8' : '#666').move(460, 70);
  
  // Bottom copyright info
  svg.text('© IPP.TOOLS 2025')
    .font({
      family: 'Arial, sans-serif',
      size: 12
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .move(50, 550);
}

/**
 * Generate a chart visualization
 */
function generateChartVisualization(svg, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Create title with identity reinforcement
  svg.text('Performance Analysis: Elite Framework Implementation')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(50, 50);
  
  // Cognitive dissonance in subtitle
  svg.text('Why 93% of creators using traditional methods are being left behind')
    .font({
      family: 'Arial, sans-serif',
      size: 16
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .move(50, 85);
  
  // Draw a sample chart
  const chartGroup = svg.group().transform('translate(50, 150)');
  
  // Chart background
  chartGroup.rect(700, 300)
    .radius(10)
    .fill(variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb');
  
  // Chart axes
  chartGroup.line(50, 50, 50, 250).stroke({ width: 1, color: '#94a3b8' });
  chartGroup.line(50, 250, 650, 250).stroke({ width: 1, color: '#94a3b8' });
  
  // Draw chart lines
  // IPP Framework line (exponential growth)
  const ippPoints = [];
  for (let i = 0; i < 600; i += 60) {
    const x = 50 + i;
    const y = 250 - (Math.pow(i/60, 1.5) * 20);
    ippPoints.push([x, y]);
  }
  
  chartGroup.polyline(ippPoints.flat())
    .fill('none')
    .stroke({ width: 3, color: safeColorScheme.main });
  
  // Traditional methods line (linear growth)
  const tradPoints = [];
  for (let i = 0; i < 600; i += 60) {
    const x = 50 + i;
    const y = 250 - (i/60 * 10);
    tradPoints.push([x, y]);
  }
  
  chartGroup.polyline(tradPoints.flat())
    .fill('none')
    .stroke({ width: 3, color: '#94a3b8', dasharray: '5,5' });
  
  // Add legend
  const legendGroup = chartGroup.group().transform('translate(500, 70)');
  
  legendGroup.line(0, 0, 20, 0).stroke({ width: 3, color: safeColorScheme.main });
  legendGroup.text('IPP Framework').font({ family: 'Arial', size: 14 }).fill(variant === 'dark' ? '#f1f5f9' : '#333').move(30, -5);
  
  legendGroup.line(0, 25, 20, 25).stroke({ width: 3, color: '#94a3b8', dasharray: '5,5' });
  legendGroup.text('Traditional Methods').font({ family: 'Arial', size: 14 }).fill(variant === 'dark' ? '#f1f5f9' : '#333').move(30, 20);
}

/**
 * Generate an analysis wave visualization
 */
function generateAnalysisVisualization(svg, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Draw analysis elements - simplified version
  svg.text('Content Analysis: The Invisible Engagement Patterns')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(50, 50);
  
  // Create an analysis visualization
  const vizGroup = svg.group().transform('translate(50, 120)');
  
  vizGroup.rect(700, 400)
    .radius(10)
    .fill(variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb');
  
  // Draw wave patterns
  const waveGroup = vizGroup.group().transform('translate(50, 50)');
  
  // Create multiple wave patterns
  for (let i = 0; i < 3; i++) {
    const points = [];
    const amplitude = 60 - i * 15;
    const phase = i * Math.PI / 4;
    const frequency = 0.02 + i * 0.01;
    
    for (let x = 0; x <= 600; x += 5) {
      const y = 150 + amplitude * Math.sin(x * frequency + phase);
      points.push(x, y);
    }
    
    waveGroup.polyline(points)
      .fill('none')
      .stroke({ 
        width: 2 - i * 0.5, 
        color: i === 0 ? safeColorScheme.main : 
               i === 1 ? safeColorScheme.light :
               safeColorScheme.dark,
        opacity: 0.8 - i * 0.2
      });
  }
}

/**
 * Generate a fallacy visualization
 */
function generateFallacyVisualization(svg, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Draw fallacy visualization
  svg.text('The Quality Fallacy: Why "Just Create Great Content" is Failing')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(50, 50);
  
  // Create a fallacy visualization
  const vizGroup = svg.group().transform('translate(50, 120)');
  
  vizGroup.rect(700, 400)
    .radius(10)
    .fill(variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb');
  
  // Draw scatter plot for content quality vs. success
  const plotGroup = vizGroup.group().transform('translate(50, 50)');
  
  // Axes
  plotGroup.line(0, 0, 0, 300).stroke({ width: 1, color: '#94a3b8' });
  plotGroup.line(0, 300, 600, 300).stroke({ width: 1, color: '#94a3b8' });
  
  // Labels
  plotGroup.text('Content Quality')
    .font({ family: 'Arial', size: 14 })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(250, 330);
  
  plotGroup.text('Success')
    .font({ family: 'Arial', size: 14 })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(-50, 150)
    .transform({ rotate: -90 });
  
  // Plot points - random scatter with no correlation
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 550 + 20;
    const y = Math.random() * 250 + 20;
    
    plotGroup.circle(8)
      .fill('#94a3b8')
      .opacity(0.7)
      .center(x, y);
  }
  
  // Plot points - IPP Framework showing correlation
  for (let i = 0; i < 15; i++) {
    const x = i * 40 + 20;
    const y = 280 - (i * 15 + Math.random() * 20);
    
    plotGroup.circle(8)
      .fill(safeColorScheme.main)
      .opacity(0.7)
      .center(x, y);
  }
  
  // Legend
  const legendGroup = plotGroup.group().transform('translate(400, 50)');
  
  legendGroup.circle(8).fill(safeColorScheme.main).center(10, 10);
  legendGroup.text('IPP Framework Users')
    .font({ family: 'Arial', size: 14 })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(25, 5);
  
  legendGroup.circle(8).fill('#94a3b8').center(10, 35);
  legendGroup.text('Traditional Methods')
    .font({ family: 'Arial', size: 14 })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(25, 30);
}

/**
 * Generate a logo visualization
 */
function generateLogoVisualization(svg, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Set dimensions for logo
  svg.size(180, 60);
  
  // Clear background (transparent)
  svg.rect(180, 60).fill('none');
  
  // Logo text
  const textColor = variant === 'dark' ? '#f1f5f9' : 
                   (variant === 'white' ? '#0f172a' : '#334155');
  
  // Draw a simple logo
  const logoGroup = svg.group().transform('translate(10, 10)');
  
  // Logo icon - stylized "IPP" in a box
  logoGroup.rect(40, 40)
    .radius(5)
    .fill(safeColorScheme.main);
  
  logoGroup.text('IPP')
    .font({
      family: 'Arial, sans-serif',
      size: 20,
      weight: 'bold'
    })
    .fill('#ffffff')
    .center(20, 20)
    .transform({ translate: [0, 10] });
  
  // Logo text
  logoGroup.text('IPP.TOOLS')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(textColor)
    .move(60, 15);
}

/**
 * Generate particles visualization
 */
function generateParticlesVisualization(svg, variant, colorScheme) {
  // Ensure colorScheme has all required properties
  const safeColorScheme = {
    main: '#5468ff',
    light: '#7d8bff',
    dark: '#3a4eef',
    gradient: ['#5468ff', '#8400ff'],
    ...(colorScheme || {})
  };
  
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Create particle group
  const particleGroup = svg.group();
  
  // Generate particles - simplified version
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 600;
    const size = Math.random() * 4 + 1;
    const opacity = Math.random() * 0.3 + 0.1;
    
    particleGroup.circle(size)
      .fill(safeColorScheme.main)
      .opacity(opacity)
      .center(x, y);
    
    // Add connecting lines for some particles
    if (i > 0 && i % 3 === 0 && i < particleCount - 1) {
      const nextX = Math.random() * 800;
      const nextY = Math.random() * 600;
      
      // Only connect if they're not too far apart
      const distance = Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2));
      
      if (distance < 150) {
        particleGroup.line(x, y, nextX, nextY)
          .stroke({
            color: safeColorScheme.main,
            width: 0.5,
            opacity: 0.1
          });
      }
    }
  }
}

/**
 * Helper function to convert hex color to RGB
 */
function hexToRgb(hex) {
  if (!hex) return '0, 0, 0'; // Failsafe default
  
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex color
  try {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  } catch (e) {
    // Return a default if parsing fails
    return '0, 0, 0';
  }
}

// Run the main function
generateVisualizations();