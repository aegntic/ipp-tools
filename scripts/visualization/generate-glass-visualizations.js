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

// Load visualization configuration
const configPath = path.resolve(process.cwd(), 'visualization-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

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
  },
  'identity': {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    gradient: ['#f59e0b', '#ef4444']
  },
  'exclusive': {
    main: '#8b5cf6',
    light: '#a78bfa',
    dark: '#7c3aed',
    gradient: ['#8b5cf6', '#ec4899']
  },
  'warning': {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    gradient: ['#f59e0b', '#fb7185']
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
          
          // Generate the visualization
          await generator(svg, variant, colorScheme);
          
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
 * Generate a dashboard visualization with cognitive triggers
 */
async function generateDashboardVisualization(svg, variant, colorScheme) {
  // Background with subtle gradient
  const bgGradient = svg.gradient('linear', add => {
    add.stop(0, variant === 'dark' ? '#1e293b' : '#f8f9fa');
    add.stop(100, variant === 'dark' ? '#0f172a' : '#e9ecef');
  });
  bgGradient.from(0, 0).to(100, 100).attr('id', 'bg-gradient');
  svg.rect(800, 600).fill(bgGradient);
  
  // Glass effect gradient
  const glassGradient = svg.gradient('linear', add => {
    if (variant === 'dark') {
      add.stop(0, 'rgba(15, 23, 42, 0.7)');
      add.stop(100, 'rgba(15, 23, 42, 0.3)');
    } else {
      add.stop(0, 'rgba(255, 255, 255, 0.7)');
      add.stop(100, 'rgba(255, 255, 255, 0.3)');
    }
  });
  glassGradient.from(0, 0).to(100, 100).attr('id', 'glass-gradient');
  
  // Holographic highlights gradient
  const holoGradient = svg.gradient('linear', add => {
    add.stop(0, `rgba(${hexToRgb(colorScheme.main)}, 0.1)`);
    add.stop(50, `rgba(${hexToRgb(colorScheme.gradient[1])}, 0.1)`);
    add.stop(100, `rgba(${hexToRgb(colorScheme.main)}, 0.1)`);
  });
  holoGradient.from(0, 0).to(100, 100).attr('id', 'holographic-gradient');
  
  // Chart gradient
  const chartGradient = svg.gradient('linear', add => {
    add.stop(0, `rgba(${hexToRgb(colorScheme.main)}, 0.8)`);
    add.stop(100, `rgba(${hexToRgb(colorScheme.main)}, 0.2)`);
  });
  chartGradient.from(0, 0).to(0, 100).attr('id', 'chart-gradient');
  
  // Main glass dashboard panel - Authority trigger through design
  const mainPanel = svg.group().transform('translate(50, 50)');
  
  // Glass panel background
  mainPanel
    .rect(700, 500)
    .radius(15)
    .fill(glassGradient)
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb')
    .strokeWidth(1);
  
  // Holographic overlay
  mainPanel
    .rect(700, 500)
    .radius(15)
    .fill(holoGradient);
  
  // Dashboard header - Identity reinforcement through titling
  mainPanel
    .text('Cognitive Engagement Framework')
    .font({
      family: 'Arial, sans-serif',
      size: 22,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(30, 50);
  
  mainPanel
    .text('Analysis of 250,000+ high-performing posts')
    .font({
      family: 'Arial, sans-serif',
      size: 14
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .move(30, 80);
  
  // Main metrics section - Cognitive dissonance through unexpected numbers
  const metricsGroup = mainPanel.group().transform('translate(30, 100)');
  
  // Metrics cards
  createMetricCard(metricsGroup, 0, 0, 'Average Engagement', '572%', '↑ 124% from baseline', variant, colorScheme);
  createMetricCard(metricsGroup, 220, 0, 'Creators Analyzed', '15,000+', 'Across 27 content categories', variant, colorScheme);
  createMetricCard(metricsGroup, 440, 0, 'Implementation Success', '97.8%', 'Based on 60-day tracking data', variant, colorScheme);
  
  // Cognitive frameworks visualization - Sustained engagement through complexity
  const frameworksGroup = mainPanel.group().transform('translate(30, 240)');
  createVisualizationCard(
    frameworksGroup, 
    0, 0, 320, 220, 
    'Cognitive Framework Effectiveness',
    drawBarChart,
    variant,
    colorScheme
  );
  
  // Growth chart - Authority reinforcement through data visualization
  const growthGroup = mainPanel.group().transform('translate(370, 240)');
  createVisualizationCard(
    growthGroup, 
    0, 0, 300, 220, 
    'Growth Analysis',
    drawLineChart,
    variant,
    colorScheme
  );
  
  // Bottom stats row
  const statsGroup = mainPanel.group().transform('translate(30, 480)');
  statsGroup
    .text('Research period: 2022-2025')
    .font({
      family: 'Arial, sans-serif',
      size: 12
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .move(0, 10);
  
  statsGroup
    .text('Updated Mar 2025')
    .font({
      family: 'Arial, sans-serif',
      size: 12
    })
    .fill(colorScheme.main)
    .attr('text-anchor', 'end')
    .move(550, 10);
  
  // Holographic elements - Visual intrigue through subtle animation cues
  const holoElements = svg.group().opacity(0.6);
  
  // Floating data points
  [
    [200, 140],
    [320, 90],
    [450, 180],
    [600, 120],
    [720, 220]
  ].forEach(([x, y], i) => {
    holoElements.circle(i % 2 === 0 ? 3 : 4).fill(colorScheme.main).center(x, y);
  });
  
  // Connection lines
  holoElements
    .line(200, 140, 320, 90)
    .stroke({ color: colorScheme.main, width: 1, opacity: 0.3 });
  holoElements
    .line(320, 90, 450, 180)
    .stroke({ color: colorScheme.main, width: 1, opacity: 0.3 });
  holoElements
    .line(450, 180, 600, 120)
    .stroke({ color: colorScheme.main, width: 1, opacity: 0.3 });
  holoElements
    .line(600, 120, 720, 220)
    .stroke({ color: colorScheme.main, width: 1, opacity: 0.3 });
}

/**
 * Generate a chart visualization
 */
async function generateChartVisualization(svg, variant, colorScheme) {
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
  
  // Main chart area
  const chartGroup = svg.group().transform('translate(50, 120)');
  
  // Chart background
  chartGroup
    .rect(700, 400)
    .radius(10)
    .fill(variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb')
    .strokeWidth(1);
  
  // Draw comparison line chart
  drawComparisonChart(chartGroup, 50, 50, 600, 300, variant, colorScheme);
  
  // Stats row for authority positioning
  const statsGroup = svg.group().transform('translate(50, 540)');
  
  // Stats cards
  const cardWidth = 220;
  const gap = 20;
  
  createCompactStatsCard(statsGroup, 0, 0, '572%', 'Average Engagement', variant, colorScheme);
  createCompactStatsCard(statsGroup, cardWidth + gap, 0, '14.2x', 'Follower Growth', variant, colorScheme);
  createCompactStatsCard(statsGroup, (cardWidth + gap) * 2, 0, '97.8%', 'Success Rate', variant, colorScheme);
}

/**
 * Generate an analysis wave visualization
 */
async function generateAnalysisVisualization(svg, variant, colorScheme) {
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Create title with cognitive dissonance
  svg.text('Content Analysis: The Invisible Engagement Patterns')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(50, 50);
  
  // Main visualization area
  const vizGroup = svg.group().transform('translate(50, 120)');
  
  // Visualization background
  vizGroup
    .rect(700, 400)
    .radius(10)
    .fill(variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb')
    .strokeWidth(1);
  
  // Draw wave patterns
  drawWavePatterns(vizGroup, 50, 50, 600, 300, variant, colorScheme);
  
  // Control panel - identity reinforcement through expert UI
  const controlsGroup = svg.group().transform('translate(50, 540)');
  
  // Controls background
  controlsGroup
    .rect(700, 40)
    .radius(6)
    .fill(variant === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb')
    .strokeWidth(1);
  
  // Add control elements
  const controlLabels = ['Cognitive', 'Identity', 'Authority', 'Algorithm', 'All Patterns'];
  
  controlLabels.forEach((label, i) => {
    const x = 50 + i * 140;
    
    controlsGroup
      .circle(12)
      .fill(i === 4 ? colorScheme.main : variant === 'dark' ? '#1e293b' : '#e2e8f0')
      .move(x, 14);
    
    controlsGroup
      .text(label)
      .font({
        family: 'Arial, sans-serif',
        size: 14
      })
      .fill(variant === 'dark' ? '#f1f5f9' : '#334155')
      .move(x + 18, 16);
  });
}

/**
 * Generate a quality fallacy visualization for cognitive dissonance
 */
async function generateFallacyVisualization(svg, variant, colorScheme) {
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Create title with strong cognitive dissonance
  svg.text('The Quality Fallacy: Why "Just Create Great Content" is Failing')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#333')
    .move(50, 50);
  
  // Main visualization area
  const vizGroup = svg.group().transform('translate(50, 120)');
  
  // Visualization background
  vizGroup
    .rect(700, 400)
    .radius(10)
    .fill(variant === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb')
    .strokeWidth(1);
  
  // Draw quality vs. success scatter plot - cognitive dissonance through unexpected correlation
  drawScatterPlot(vizGroup, 50, 50, 600, 300, variant, colorScheme);
  
  // Legend with identity reinforcement
  const legendGroup = svg.group().transform('translate(50, 540)');
  
  // Legend background
  legendGroup
    .rect(700, 40)
    .radius(6)
    .fill(variant === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.8)')
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb')
    .strokeWidth(1);
  
  // First legend item
  legendGroup
    .circle(12)
    .fill(colorScheme.main)
    .move(50, 14);
  
  legendGroup
    .text('High Psychological Trigger Content')
    .font({
      family: 'Arial, sans-serif',
      size: 14
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#334155')
    .move(68, 16);
  
  // Second legend item
  legendGroup
    .circle(12)
    .fill(variant === 'dark' ? '#475569' : '#94a3b8')
    .move(350, 14);
  
  legendGroup
    .text('High Quality, Low Psychological Trigger Content')
    .font({
      family: 'Arial, sans-serif',
      size: 14
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#334155')
    .move(368, 16);
}

/**
 * Generate an error visualization
 */
async function generateErrorVisualization(svg, variant, colorScheme) {
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Create cognitive gap title
  svg.text('You've Discovered A Cognitive Gap')
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
      color: colorScheme.main,
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
          .fill(colorScheme.main)
          .opacity((i + j) % 2 === 0 ? 0.7 : 0.4)
          .move(x, y);
      }
      
      // Draw only some connections for an incomplete pattern
      if (i < 4 && (i + j) % 2 === 0) {
        patternGroup
          .line(x + 8, y + 4, x + 60, y + 4)
          .stroke({
            color: colorScheme.main,
            width: 1,
            opacity: 0.3
          });
      }
      
      if (j < 4 && (i + j) % 3 !== 0) {
        patternGroup
          .line(x + 4, y + 8, x + 4, y + 30)
          .stroke({
            color: colorScheme.main,
            width: 1,
            opacity: 0.2
          });
      }
    }
  }
  
  // Subtext with identity reinforcement
  svg.text('The path you're looking for doesn't exist, but like any elite creator, you can quickly pivot to a new opportunity.')
    .font({
      family: 'Arial, sans-serif',
      size: 16
    })
    .fill(variant === 'dark' ? '#94a3b8' : '#666')
    .attr('text-anchor', 'middle')
    .move(400, 480);
}

/**
 * Generate a logo visualization
 */
async function generateLogoVisualization(svg, variant, colorScheme) {
  // Set dimensions for logo
  svg.size(180, 60);
  
  // Background (transparent)
  svg.rect(180, 60).fill('none');
  
  // Create logo group
  const logoGroup = svg.group().transform('translate(10, 10)');
  
  // Logo mark - neural network nodes
  const markGroup = logoGroup.group();
  
  // Define nodes
  const nodes = [
    {x: 5, y: 20, size: 6},
    {x: 20, y: 10, size: 8},
    {x: 20, y: 30, size: 8},
    {x: 35, y: 5, size: 6},
    {x: 35, y: 20, size: 10},
    {x: 35, y: 35, size: 6}
  ];
  
  // Draw connections first (under nodes)
  // Connect first layer to second
  markGroup.line(nodes[0].x, nodes[0].y, nodes[1].x, nodes[1].y)
    .stroke({color: colorScheme.main, width: 1.5, opacity: 0.6});
  markGroup.line(nodes[0].x, nodes[0].y, nodes[2].x, nodes[2].y)
    .stroke({color: colorScheme.main, width: 1.5, opacity: 0.6});
  
  // Connect second layer to third
  markGroup.line(nodes[1].x, nodes[1].y, nodes[3].x, nodes[3].y)
    .stroke({color: colorScheme.main, width: 1.5, opacity: 0.6});
  markGroup.line(nodes[1].x, nodes[1].y, nodes[4].x, nodes[4].y)
    .stroke({color: colorScheme.main, width: 1.5, opacity: 0.6});
  markGroup.line(nodes[2].x, nodes[2].y, nodes[4].x, nodes[4].y)
    .stroke({color: colorScheme.main, width: 1.5, opacity: 0.6});
  markGroup.line(nodes[2].x, nodes[2].y, nodes[5].x, nodes[5].y)
    .stroke({color: colorScheme.main, width: 1.5, opacity: 0.6});
  
  // Draw nodes
  nodes.forEach(node => {
    markGroup.circle(node.size)
      .fill(colorScheme.main)
      .center(node.x, node.y);
  });
  
  // Logo text
  const textColor = variant === 'dark' ? '#f1f5f9' : 
                   (variant === 'white' ? '#0f172a' : '#334155');
  
  logoGroup.text('IPP.TOOLS')
    .font({
      family: 'Arial, sans-serif',
      size: 24,
      weight: 'bold'
    })
    .fill(textColor)
    .move(50, 14);
}

/**
 * Generate a particles visualization for backgrounds
 */
async function generateParticlesVisualization(svg, variant, colorScheme) {
  // Set background
  const bgColor = variant === 'dark' ? '#0f172a' : '#f8f9fa';
  svg.rect(800, 600).fill(bgColor);
  
  // Create particle group
  const particleGroup = svg.group();
  
  // Density parameter (0.1 to 1.0)
  const density = variant === 'subtle' ? 0.3 : 0.6;
  
  // Generate particles
  const particleCount = Math.floor(300 * density);
  
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 600;
    const size = Math.random() * 4 + 1;
    const opacity = Math.random() * 0.3 + 0.1;
    
    particleGroup.circle(size)
      .fill(colorScheme.main)
      .opacity(opacity)
      .center(x, y);
    
    // Add connecting lines for some particles (cognitive pattern formation)
    if (i > 0 && i % 3 === 0 && i < particleCount - 1) {
      const nextX = Math.random() * 800;
      const nextY = Math.random() * 600;
      
      // Only connect if they're not too far apart
      const distance = Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2));
      
      if (distance < 150) {
        particleGroup.line(x, y, nextX, nextY)
          .stroke({
            color: colorScheme.main,
            width: 0.5,
            opacity: 0.1
          });
      }
    }
  }
  
  // Add a few brighter particles for visual emphasis
  for (let i = 0; i < particleCount / 10; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 600;
    const size = Math.random() * 3 + 2;
    
    particleGroup.circle(size)
      .fill(colorScheme.main)
      .opacity(0.4)
      .center(x, y);
  }
}

/**
 * Create a metric card for the dashboard
 */
function createMetricCard(parent, x, y, label, value, detail, variant, colorScheme) {
  const bgColor = variant === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)';
  const borderColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  const textColor = variant === 'dark' ? '#f1f5f9' : '#333';
  const detailColor = variant === 'dark' ? '#94a3b8' : '#666';
  
  // Card background
  parent
    .rect(200, 120)
    .radius(10)
    .fill(bgColor)
    .stroke(borderColor)
    .strokeWidth(1)
    .move(x, y);
  
  // Label
  parent
    .text(label)
    .font({
      family: 'Arial, sans-serif',
      size: 14,
      weight: 'bold'
    })
    .fill(textColor)
    .move(x + 20, y + 30);
  
  // Value - cognitive dissonance through unexpected precision
  parent
    .text(value)
    .font({
      family: 'Arial, sans-serif',
      size: 28,
      weight: 'bold'
    })
    .fill(colorScheme.main)
    .move(x + 20, y + 70);
  
  // Detail
  parent
    .text(detail)
    .font({
      family: 'Arial, sans-serif',
      size: 12
    })
    .fill(detailColor)
    .move(x + 20, y + 95);
}

/**
 * Create a compact stats card
 */
function createCompactStatsCard(parent, x, y, value, label, variant, colorScheme) {
  const bgColor = variant === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)';
  const borderColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  const textColor = variant === 'dark' ? '#f1f5f9' : '#333';
  const detailColor = variant === 'dark' ? '#94a3b8' : '#666';
  
  // Card background
  parent
    .rect(220, 50)
    .radius(8)
    .fill(bgColor)
    .stroke(borderColor)
    .strokeWidth(1)
    .move(x, y);
  
  // Value
  parent
    .text(value)
    .font({
      family: 'Arial, sans-serif',
      size: 22,
      weight: 'bold'
    })
    .fill(colorScheme.main)
    .move(x + 20, y + 16);
  
  // Label
  parent
    .text(label)
    .font({
      family: 'Arial, sans-serif',
      size: 14
    })
    .fill(detailColor)
    .move(x + 90, y + 20);
}

/**
 * Create a visualization card
 */
function createVisualizationCard(parent, x, y, width, height, title, drawFn, variant, colorScheme) {
  const bgColor = variant === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)';
  const borderColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  const textColor = variant === 'dark' ? '#f1f5f9' : '#333';
  
  // Card background
  parent
    .rect(width, height)
    .radius(10)
    .fill(bgColor)
    .stroke(borderColor)
    .strokeWidth(1)
    .move(x, y);
  
  // Title
  parent
    .text(title)
    .font({
      family: 'Arial, sans-serif',
      size: 14,
      weight: 'bold'
    })
    .fill(textColor)
    .move(x + 20, y + 30);
  
  // Draw the visualization
  const vizGroup = parent.group().transform(`translate(${x + 20}, ${y + 50})`);
  drawFn(vizGroup, variant, colorScheme);
}

/**
 * Draw a bar chart
 */
function drawBarChart(parent, variant, colorScheme) {
  const chartGradient = parent.parent().parent().findOne('#chart-gradient');
  const textColor = variant === 'dark' ? '#94a3b8' : '#666';
  
  // Bars - cognitive dissonance through unexpected pattern
  parent.rect(30, 140).fill(chartGradient).opacity(0.8).move(0, 0);
  parent.rect(30, 120).fill(chartGradient).opacity(0.8).move(40, 20);
  parent.rect(30, 105).fill(chartGradient).opacity(0.8).move(80, 35);
  parent.rect(30, 90).fill(chartGradient).opacity(0.8).move(120, 50);
  parent.rect(30, 75).fill(chartGradient).opacity(0.8).move(160, 65);
  parent.rect(30, 60).fill(chartGradient).opacity(0.8).move(200, 80);
  
  // X-axis labels with cognitive abbreviations (creates curiosity gap)
  const labels = ['CDA', 'IRP', 'ARM', 'PCA', 'SEL', 'APF'];
  
  labels.forEach((label, i) => {
    parent
      .text(label)
      .font({
        family: 'Arial, sans-serif',
        size: 9
      })
      .fill(textColor)
      .attr('text-anchor', 'middle')
      .move(i * 40 + 15, 160);
  });
  
  // Legend with cognitive dissonance through abbreviation explanation
  parent
    .text('CDA: Cognitive Dissonance Activation')
    .font({
      family: 'Arial, sans-serif',
      size: 10
    })
    .fill(textColor)
    .move(0, 180);
  
  parent
    .text('IRP: Identity Reinforcement Patterns')
    .font({
      family: 'Arial, sans-serif',
      size: 10
    })
    .fill(textColor)
    .move(0, 195);
}

/**
 * Draw a line chart
 */
function drawLineChart(parent, variant, colorScheme) {
  const textColor = variant === 'dark' ? '#94a3b8' : '#666';
  
  // Grid lines
  parent
    .line(0, 0, 0, 130)
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb');
  
  parent
    .line(0, 130, 260, 130)
    .stroke(variant === 'dark' ? '#2e3b4e' : '#e1e5eb');
  
  // Chart lines (framework users vs control group) - cognitive dissonance through divergence
  parent
    .polyline([0, 130, 40, 120, 80, 100, 120, 70, 160, 40, 200, 20, 240, 5])
    .fill('none')
    .stroke({ color: colorScheme.main, width: 2 });
  
  parent
    .polyline([0, 130, 40, 125, 80, 115, 120, 105, 160, 90, 200, 70, 240, 45])
    .fill('none')
    .stroke({ color: colorScheme.gradient[1], width: 2, dasharray: '5,5' });
  
  // Data points
  [0, 40, 80, 120, 160, 200, 240].forEach((x, i) => {
    const y1 = i === 0 ? 130 : [120, 100, 70, 40, 20, 5][i-1];
    parent.circle(3).fill(colorScheme.main).center(x, y1);
  });
  
  // X-axis labels
  [0, 40, 80, 120, 160, 200, 240].forEach((x, i) => {
    parent
      .text(i * 10)
      .font({
        family: 'Arial, sans-serif',
        size: 9
      })
      .fill(textColor)
      .attr('text-anchor', 'middle')
      .move(x, 145);
  });
  
  // Legend
  const legendGroup = parent.group().transform('translate(0, 160)');
  
  // Framework users
  legendGroup
    .line(0, 5, 15, 5)
    .stroke({ color: colorScheme.main, width: 2 });
  
  legendGroup
    .text('Framework Users')
    .font({
      family: 'Arial, sans-serif',
      size: 10
    })
    .fill(textColor)
    .move(20, 9);
  
  // Control group
  legendGroup
    .line(120, 5, 135, 5)
    .stroke({ color: colorScheme.gradient[1], width: 2, dasharray: '5,5' });
  
  legendGroup
    .text('Control Group')
    .font({
      family: 'Arial, sans-serif',
      size: 10
    })
    .fill(textColor)
    .move(140, 9);
}

/**
 * Draw a comparison chart
 */
function drawComparisonChart(parent, x, y, width, height, variant, colorScheme) {
  const chartGroup = parent.group().transform(`translate(${x}, ${y})`);
  const textColor = variant === 'dark' ? '#94a3b8' : '#666';
  const gridColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  
  // Draw grid
  for (let i = 0; i <= 5; i++) {
    const yPos = (i / 5) * height;
    
    chartGroup
      .line(0, yPos, width, yPos)
      .stroke({ color: gridColor, width: 1, dasharray: i === 5 ? '0' : '5,5' });
    
    // Y-axis labels
    chartGroup
      .text((100 - i * 20) + '%')
      .font({
        family: 'Arial, sans-serif',
        size: 12
      })
      .fill(textColor)
      .attr('text-anchor', 'end')
      .move(-10, yPos - 6);
  }
  
  for (let i = 0; i <= 6; i++) {
    const xPos = (i / 6) * width;
    
    chartGroup
      .line(xPos, 0, xPos, height)
      .stroke({ color: gridColor, width: 1, dasharray: i === 0 ? '0' : '5,5' });
    
    // X-axis labels (months)
    chartGroup
      .text('Month ' + i)
      .font({
        family: 'Arial, sans-serif',
        size: 12
      })
      .fill(textColor)
      .attr('text-anchor', 'middle')
      .move(xPos, height + 15);
  }
  
  // Draw framework implementation line - cognitive dissonance through exponential growth
  const frameworkLine = [
    [0, height],                 // 0% at start
    [width/6, height * 0.8],     // 20% after 1 month
    [width/3, height * 0.5],     // 50% after 2 months
    [width/2, height * 0.3],     // 70% after 3 months
    [width*2/3, height * 0.15],  // 85% after 4 months
    [width*5/6, height * 0.05],  // 95% after 5 months
    [width, 0]                   // 100% after 6 months
  ];
  
  chartGroup
    .polyline(frameworkLine.flat())
    .fill('none')
    .stroke({ color: colorScheme.main, width: 3 });
  
  // Draw traditional methods line - cognitive dissonance through contrast
  const traditionalLine = [
    [0, height],                 // 0% at start
    [width/6, height * 0.95],    // 5% after 1 month
    [width/3, height * 0.85],    // 15% after 2 months
    [width/2, height * 0.75],    // 25% after 3 months
    [width*2/3, height * 0.65],  // 35% after 4 months
    [width*5/6, height * 0.55],  // 45% after 5 months
    [width, height * 0.5]        // 50% after 6 months
  ];
  
  chartGroup
    .polyline(traditionalLine.flat())
    .fill('none')
    .stroke({ color: variant === 'dark' ? '#475569' : '#94a3b8', width: 3, dasharray: '5,5' });
  
  // Add data points
  frameworkLine.forEach(([x, y]) => {
    chartGroup.circle(8).fill(colorScheme.main).center(x, y);
  });
  
  traditionalLine.forEach(([x, y]) => {
    chartGroup.circle(8).fill(variant === 'dark' ? '#475569' : '#94a3b8').center(x, y);
  });
  
  // Add legend
  const legendGroup = chartGroup.group().transform(`translate(${width * 0.05}, ${height * 0.1})`);
  
  // Legend background
  legendGroup
    .rect(280, 60)
    .radius(5)
    .fill(variant === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)')
    .stroke(gridColor)
    .strokeWidth(1);
  
  // Framework implementation
  legendGroup
    .line(15, 20, 45, 20)
    .stroke({ color: colorScheme.main, width: 3 });
  
  legendGroup
    .circle(8)
    .fill(colorScheme.main)
    .center(30, 20);
  
  legendGroup
    .text('IPP.TOOLS Framework Implementation')
    .font({
      family: 'Arial, sans-serif',
      size: 14
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#334155')
    .move(55, 16);
  
  // Traditional methods
  legendGroup
    .line(15, 45, 45, 45)
    .stroke({ color: variant === 'dark' ? '#475569' : '#94a3b8', width: 3, dasharray: '5,5' });
  
  legendGroup
    .circle(8)
    .fill(variant === 'dark' ? '#475569' : '#94a3b8')
    .center(30, 45);
  
  legendGroup
    .text('Traditional Engagement Methods')
    .font({
      family: 'Arial, sans-serif',
      size: 14
    })
    .fill(variant === 'dark' ? '#f1f5f9' : '#334155')
    .move(55, 41);
}

/**
 * Draw wave patterns for analysis visualization
 */
function drawWavePatterns(parent, x, y, width, height, variant, colorScheme) {
  const chartGroup = parent.group().transform(`translate(${x}, ${y})`);
  const gridColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  
  // Draw grid
  for (let i = 0; i <= 4; i++) {
    const yPos = (i / 4) * height;
    
    chartGroup
      .line(0, yPos, width, yPos)
      .stroke({ color: gridColor, width: 1, dasharray: '5,5' });
  }
  
  // Draw cognitive wave pattern - creates visual cognitive dissonance
  const cognitivePoints = [];
  
  for (let i = 0; i <= width; i += 5) {
    // Complex waveform with multiple frequencies
    const y1 = height / 2 + 
               Math.sin(i * 0.05) * height * 0.2 + 
               Math.sin(i * 0.02) * height * 0.15;
    
    cognitivePoints.push(i, y1);
  }
  
  chartGroup
    .polyline(cognitivePoints)
    .fill('none')
    .stroke({ color: colorScheme.main, width: 2 });
  
  // Draw identity wave pattern
  const identityPoints = [];
  
  for (let i = 0; i <= width; i += 5) {
    // Different waveform that occasionally converges with cognitive
    const y2 = height / 2 + 
               Math.cos(i * 0.03) * height * 0.25 + 
               Math.sin(i * 0.07) * height * 0.1;
    
    identityPoints.push(i, y2);
  }
  
  chartGroup
    .polyline(identityPoints)
    .fill('none')
    .stroke({ color: colorScheme.gradient[1], width: 2, dasharray: '3,2' });
  
  // Draw intersection points - cognitive dissonance through pattern convergence
  cognitivePoints.forEach((_, i) => {
    if (i % 2 === 0) {
      const x = cognitivePoints[i];
      const y1 = cognitivePoints[i + 1];
      const y2 = identityPoints[i + 1];
      
      // Check if the waves are close to intersecting
      if (Math.abs(y1 - y2) < 5) {
        chartGroup
          .circle(6)
          .fill(colorScheme.main)
          .opacity(0.8)
          .center(x, (y1 + y2) / 2);
      }
    }
  });
}

/**
 * Draw a scatter plot showing quality vs. success
 */
function drawScatterPlot(parent, x, y, width, height, variant, colorScheme) {
  const chartGroup = parent.group().transform(`translate(${x}, ${y})`);
  const textColor = variant === 'dark' ? '#94a3b8' : '#666';
  const gridColor = variant === 'dark' ? '#2e3b4e' : '#e1e5eb';
  
  // Draw grid
  for (let i = 0; i <= 4; i++) {
    const yPos = (i / 4) * height;
    
    chartGroup
      .line(0, yPos, width, yPos)
      .stroke({ color: gridColor, width: 1, dasharray: i === 4 ? '0' : '5,5' });
    
    // Y-axis labels
    chartGroup
      .text((100 - i * 25) + '% Success')
      .font({
        family: 'Arial, sans-serif',
        size: 12
      })
      .fill(textColor)
      .attr('text-anchor', 'end')
      .move(-10, yPos - 6);
  }
  
  for (let i = 0; i <= 4; i++) {
    const xPos = (i / 4) * width;
    
    chartGroup
      .line(xPos, 0, xPos, height)
      .stroke({ color: gridColor, width: 1, dasharray: i === 0 ? '0' : '5,5' });
    
    // X-axis labels (quality)
    chartGroup
      .text((i * 25) + '% Quality')
      .font({
        family: 'Arial, sans-serif',
        size: 12
      })
      .fill(textColor)
      .attr('text-anchor', 'middle')
      .move(xPos, height + 15);
  }
  
  // Add cognitive dissonance through unexpected correlation
  // Higher quality doesn't always mean higher success
  
  // Traditional content (high quality, variable success)
  const traditionalPoints = [
    [0.3 * width, 0.1 * height],  // 30% quality, 90% success
    [0.4 * width, 0.15 * height], // 40% quality, 85% success
    [0.55 * width, 0.25 * height], // 55% quality, 75% success
    [0.6 * width, 0.3 * height],  // 60% quality, 70% success
    [0.7 * width, 0.45 * height], // 70% quality, 55% success
    [0.75 * width, 0.5 * height], // 75% quality, 50% success
    [0.8 * width, 0.55 * height], // 80% quality, 45% success
    [0.85 * width, 0.6 * height], // 85% quality, 40% success
    [0.9 * width, 0.65 * height], // 90% quality, 35% success
    [0.95 * width, 0.7 * height], // 95% quality, 30% success
  ];
  
  // Framework content (variable quality, high success)
  const frameworkPoints = [
    [0.3 * width, 0.9 * height],  // 30% quality, 10% success
    [0.35 * width, 0.15 * height], // 35% quality, 85% success
    [0.4 * width, 0.2 * height],  // 40% quality, 80% success
    [0.45 * width, 0.1 * height], // 45% quality, 90% success
    [0.5 * width, 0.05 * height], // 50% quality, 95% success
    [0.55 * width, 0.1 * height], // 55% quality, 90% success
    [0.6 * width, 0.15 * height], // 60% quality, 85% success
    [0.7 * width, 0.1 * height],  // 70% quality, 90% success
    [0.8 * width, 0.05 * height], // 80% quality, 95% success
    [0.9 * width, 0.1 * height],  // 90% quality, 90% success
  ];
  
  // Random noise for traditional points (cognitive dazzle camouflage)
  for (let i = 0; i < 30; i++) {
    const x = (0.3 + Math.random() * 0.7) * width;
    const y = (0.45 + Math.random() * 0.4) * height;
    
    traditionalPoints.push([x, y]);
  }
  
  // Draw points
  traditionalPoints.forEach(([x, y]) => {
    chartGroup
      .circle(8)
      .fill(variant === 'dark' ? '#475569' : '#94a3b8')
      .opacity(0.7)
      .center(x, y);
  });
  
  frameworkPoints.forEach(([x, y]) => {
    chartGroup
      .circle(8)
      .fill(colorScheme.main)
      .opacity(0.7)
      .center(x, y);
  });
  
  // Add trend lines - cognitive dissonance through negative correlation
  
  // Traditional trend line (negative correlation)
  chartGroup
    .line(0.3 * width, 0.3 * height, 0.95 * width, 0.7 * height)
    .stroke({
      color: variant === 'dark' ? '#475569' : '#94a3b8',
      width: 2,
      dasharray: '5,5'
    });
  
  // Framework trend line (consistently high success)
  chartGroup
    .line(0.3 * width, 0.15 * height, 0.95 * width, 0.1 * height)
    .stroke({
      color: colorScheme.main,
      width: 2
    });
}

/**
 * Helper function to convert hex color to RGB
 */
function hexToRgb(hex) {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex color
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

// Run the main function
generateVisualizations();
