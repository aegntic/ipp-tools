/**
 * Visual Asset Generator Script for CascadeVibe
 * 
 * This script generates all visual assets required for the CascadeVibe framework
 * based on the asset-config.json configuration file.
 */

const fs = require('fs');
const path = require('path');
const SVGAssetGenerator = require('./svg-asset-generator');

// Load configuration
let config;
try {
  const configPath = path.join(__dirname, '../asset-config.json');
  const configFile = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configFile);
  console.log('Loaded asset configuration');
} catch (error) {
  console.error('Error loading configuration:', error);
  // Use default config as fallback
  config = {
    colorPrimary: "#5468ff",
    colorSecondary: "#8400ff",
    colorLight: "#f8f9fa",
    colorDark: "#0f172a",
    typography: {
      fontPrimary: "Inter, sans-serif",
      fontHeading: "Manrope, sans-serif"
    }
  };
  console.log('Using default configuration as fallback');
}

// Setup output directory
const outputDir = path.join(__dirname, '../sites/cascadevibe/public/assets/images');
try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }
} catch (error) {
  console.error(`Error creating output directory: ${error.message}`);
  console.log('Will attempt to continue with generation...');
}

// Initialize the generator
const generator = new SVGAssetGenerator({
  ...config,
  outputDir
});

console.log('Initialized SVG Asset Generator with configuration:');
console.log(`- Primary Color: ${config.colorPrimary}`);
console.log(`- Secondary Color: ${config.colorSecondary}`);
console.log(`- Output Directory: ${outputDir}`);

// Generate all assets
console.log('Generating assets...');
try {
  generator.generateAllAssets();
} catch (error) {
  console.error(`Error generating assets: ${error.message}`);
  console.log('Continuing with specialized framework visualizations...');
}

// Generate specialized framework visualizations
console.log('Generating specialized framework visualizations...');

// Ensure the framework directories exist
const frameworkDir = path.join(outputDir, 'framework');
const socialProofResultsDir = path.join(outputDir, 'social-proof/results');

try {
  if (!fs.existsSync(frameworkDir)) {
    fs.mkdirSync(frameworkDir, { recursive: true });
  }
  if (!fs.existsSync(socialProofResultsDir)) {
    fs.mkdirSync(socialProofResultsDir, { recursive: true });
  }
} catch (error) {
  console.error(`Error creating visualization subdirectories: ${error.message}`);
}

// Cognitive Map Visualization
function generateCognitiveMap() {
  const width = 600;
  const height = 400;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;
  
  // Add defs with gradients
  svg += `
    <defs>
      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${config.colorPrimary}" />
        <stop offset="100%" stop-color="${config.colorSecondary}" />
      </linearGradient>
      
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;
  
  // Define nodes
  const nodes = [
    { id: 'cognitive', label: 'Cognitive Dissonance', x: width * 0.5, y: height * 0.2 },
    { id: 'identity', label: 'Identity Reinforcement', x: width * 0.2, y: height * 0.4 },
    { id: 'algorithmic', label: 'Algorithmic Resonance', x: width * 0.8, y: height * 0.4 },
    { id: 'precision', label: 'Precision Communication', x: width * 0.3, y: height * 0.7 },
    { id: 'sustained', label: 'Sustained Engagement', x: width * 0.7, y: height * 0.7 },
    { id: 'authority', label: 'Authority Positioning', x: width * 0.5, y: height * 0.9 }
  ];
  
  // Define connections
  const connections = [
    { source: 'cognitive', target: 'identity', strength: 0.8 },
    { source: 'cognitive', target: 'algorithmic', strength: 0.7 },
    { source: 'identity', target: 'precision', strength: 0.9 },
    { source: 'algorithmic', target: 'sustained', strength: 0.8 },
    { source: 'precision', target: 'authority', strength: 0.7 },
    { source: 'sustained', target: 'authority', strength: 0.7 },
    { source: 'cognitive', target: 'authority', strength: 0.6 },
    { source: 'identity', target: 'algorithmic', strength: 0.5 },
    { source: 'precision', target: 'sustained', strength: 0.6 }
  ];
  
  // Draw connections
  connections.forEach(conn => {
    const source = nodes.find(n => n.id === conn.source);
    const target = nodes.find(n => n.id === conn.target);
    
    if (source && target) {
      // Calculate connection path
      const curveFactor = 30;
      const midX = (source.x + target.x) / 2;
      const midY = (source.y + target.y) / 2 - curveFactor;
      
      svg += `
        <path 
          d="M${source.x},${source.y} Q${midX},${midY} ${target.x},${target.y}" 
          fill="none" 
          stroke="url(#connectionGradient)" 
          stroke-width="${2 + conn.strength * 3}" 
          stroke-opacity="${0.4 + conn.strength * 0.3}" 
          stroke-dasharray="${conn.strength < 0.7 ? '5,5' : ''}"  
        />
      `;
    }
  });
  
  // Draw nodes
  nodes.forEach(node => {
    svg += `
      <circle 
        cx="${node.x}" 
        cy="${node.y}" 
        r="40" 
        fill="${config.colorLight}" 
        stroke="${config.colorPrimary}" 
        stroke-width="2" 
        filter="url(#glow)" 
      />
      
      <text 
        x="${node.x}" 
        y="${node.y}" 
        font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
        font-size="12" 
        text-anchor="middle" 
        alignment-baseline="middle" 
        font-weight="600" 
        fill="${config.colorDark}"
      >
        ${node.label.split(' ')[0]}
      </text>
      
      <text 
        x="${node.x}" 
        y="${node.y + 15}" 
        font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
        font-size="12" 
        text-anchor="middle" 
        alignment-baseline="middle" 
        font-weight="600" 
        fill="${config.colorDark}"
      >
        ${node.label.split(' ')[1] || ''}
      </text>
    `;
  });
  
  // Add central hub
  svg += `
    <circle 
      cx="${width / 2}" 
      cy="${height / 2}" 
      r="50" 
      fill="url(#connectionGradient)" 
      fill-opacity="0.2" 
      stroke="url(#connectionGradient)" 
      stroke-width="3" 
      filter="url(#glow)" 
    />
    
    <text 
      x="${width / 2}" 
      y="${height / 2 - 10}" 
      font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
      font-size="16" 
      text-anchor="middle" 
      alignment-baseline="middle" 
      font-weight="700" 
      fill="${config.colorDark}"
    >
      CASCADE
    </text>
    
    <text 
      x="${width / 2}" 
      y="${height / 2 + 10}" 
      font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
      font-size="16" 
      text-anchor="middle" 
      alignment-baseline="middle" 
      font-weight="700" 
      fill="${config.colorPrimary}"
    >
      VIBE
    </text>
  `;
  
  // Close SVG tag
  svg += '</svg>';
  
  return svg;
}

// Implementation Process Visualization
function generateImplementationProcess() {
  const width = 600;
  const height = 500;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;
  
  // Add defs with gradients
  svg += `
    <defs>
      <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${config.colorPrimary}" />
        <stop offset="100%" stop-color="${config.colorSecondary}" />
      </linearGradient>
    </defs>
  `;
  
  // Define implementation steps
  const steps = [
    { id: 'analysis', label: 'Pattern Analysis', description: 'Analyze existing engagement patterns' },
    { id: 'framework', label: 'Framework Selection', description: 'Select appropriate psychological triggers' },
    { id: 'content', label: 'Content Adaptation', description: 'Adapt content to implementation framework' },
    { id: 'deployment', label: 'Strategic Deployment', description: 'Deploy at optimal timing intervals' },
    { id: 'measurement', label: 'Response Measurement', description: 'Measure psychological response patterns' },
    { id: 'optimization', label: 'Framework Optimization', description: 'Optimize based on response data' }
  ];
  
  // Draw hexagonal implementation process
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 150;
  
  // Draw connecting lines
  steps.forEach((step, index) => {
    const angle = (Math.PI * 2 * index) / steps.length - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    svg += `
      <line 
        x1="${centerX}" 
        y1="${centerY}" 
        x2="${x}" 
        y2="${y}" 
        stroke="${config.colorPrimary}" 
        stroke-width="2" 
        stroke-opacity="0.5" 
        stroke-dasharray="5,5" 
      />
    `;
  });
  
  // Draw central hub
  svg += `
    <circle 
      cx="${centerX}" 
      cy="${centerY}" 
      r="60" 
      fill="url(#processGradient)" 
      fill-opacity="0.2" 
      stroke="url(#processGradient)" 
      stroke-width="3" 
    />
    
    <text 
      x="${centerX}" 
      y="${centerY - 15}" 
      font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
      font-size="18" 
      text-anchor="middle" 
      alignment-baseline="middle" 
      font-weight="700" 
      fill="${config.colorDark}"
    >
      Implementation
    </text>
    
    <text 
      x="${centerX}" 
      y="${centerY + 15}" 
      font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
      font-size="18" 
      text-anchor="middle" 
      alignment-baseline="middle" 
      font-weight="700" 
      fill="${config.colorPrimary}"
    >
      Process
    </text>
  `;
  
  // Draw step nodes
  steps.forEach((step, index) => {
    const angle = (Math.PI * 2 * index) / steps.length - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    // Create step node
    svg += `
      <circle 
        cx="${x}" 
        cy="${y}" 
        r="40" 
        fill="${config.colorLight}" 
        stroke="${config.colorPrimary}" 
        stroke-width="2" 
      />
      
      <text 
        x="${x}" 
        y="${y - 10}" 
        font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
        font-size="14" 
        text-anchor="middle" 
        alignment-baseline="middle" 
        font-weight="600" 
        fill="${config.colorDark}"
      >
        Step ${index + 1}
      </text>
      
      <text 
        x="${x}" 
        y="${y + 10}" 
        font-family="${config.typography?.fontPrimary || 'Inter, sans-serif'}" 
        font-size="12" 
        text-anchor="middle" 
        alignment-baseline="middle" 
        fill="${config.colorPrimary}"
        font-weight="600"
      >
        ${step.label}
      </text>
    `;
    
    // Add description
    const descX = x + 70 * Math.cos(angle);
    const descY = y + 70 * Math.sin(angle);
    
    svg += `
      <text 
        x="${descX}" 
        y="${descY}" 
        font-family="${config.typography?.fontPrimary || 'Inter, sans-serif'}" 
        font-size="11" 
        text-anchor="${index > 2 ? 'end' : 'start'}" 
        alignment-baseline="middle" 
        fill="${config.colorDark}"
      >
        ${step.description}
      </text>
    `;
  });
  
  // Add title
  svg += `
    <text 
      x="${width / 2}" 
      y="30" 
      font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
      font-size="24" 
      text-anchor="middle" 
      font-weight="700" 
      fill="${config.colorDark}"
    >
      CascadeVibe Implementation Framework
    </text>
  `;
  
  // Close SVG tag
  svg += '</svg>';
  
  return svg;
}

// Generate engagement metrics visualization
function generateMetricsVisualization() {
  const width = 800;
  const height = 400;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;
  
  // Add defs with gradients
  svg += `
    <defs>
      <linearGradient id="metricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${config.colorPrimary}" />
        <stop offset="100%" stop-color="${config.colorSecondary}" />
      </linearGradient>
    </defs>
  `;
  
  // Draw background
  svg += `
    <rect x="0" y="0" width="${width}" height="${height}" fill="${config.colorLight}" rx="10" ry="10" />
  `;
  
  // Add title
  svg += `
    <text 
      x="${width / 2}" 
      y="40" 
      font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
      font-size="24" 
      text-anchor="middle" 
      font-weight="700" 
      fill="${config.colorDark}"
    >
      Framework Implementation Results
    </text>
    
    <text 
      x="${width / 2}" 
      y="70" 
      font-family="${config.typography?.fontPrimary || 'Inter, sans-serif'}" 
      font-size="16" 
      text-anchor="middle" 
      fill="${config.colorDark}"
    >
      Analysis of 250,000+ high-performing posts
    </text>
  `;
  
  // Define metrics to display
  const metricCards = [
    { label: 'Average Engagement', value: '572%', description: '↑ 124% from baseline' },
    { label: 'Creators Analyzed', value: '15,000+', description: 'Across 27 content categories' },
    { label: 'Implementation Success', value: '97.8%', description: 'Based on 60-day tracking data' },
    { label: 'Growth Multiplier', value: '14.2x', description: 'Year-over-year comparison' },
    { label: 'Revenue Generated', value: '$743M+', description: 'Directly attributed to framework' },
    { label: 'Conversion Increase', value: '247%', description: 'Higher conversion rates' }
  ];
  
  // Draw metric cards
  const cardWidth = 230;
  const cardHeight = 120;
  const cardsPerRow = 3;
  const startX = (width - cardsPerRow * cardWidth) / 2 + cardWidth / 2;
  const startY = 130;
  const cardSpacingX = cardWidth + 20;
  const cardSpacingY = cardHeight + 20;
  
  metricCards.forEach((metric, index) => {
    const row = Math.floor(index / cardsPerRow);
    const col = index % cardsPerRow;
    const x = startX + col * cardSpacingX;
    const y = startY + row * cardSpacingY;
    
    // Draw card
    svg += `
      <rect 
        x="${x - cardWidth / 2}" 
        y="${y - cardHeight / 2}" 
        width="${cardWidth}" 
        height="${cardHeight}" 
        rx="10" 
        ry="10" 
        fill="${config.colorLight}" 
        stroke="${config.colorPrimary}" 
        stroke-opacity="0.3" 
        stroke-width="1" 
      />
      
      <text 
        x="${x}" 
        y="${y - 30}" 
        font-family="${config.typography?.fontPrimary || 'Inter, sans-serif'}" 
        font-size="14" 
        text-anchor="middle" 
        font-weight="600" 
        fill="${config.colorDark}"
      >
        ${metric.label}
      </text>
      
      <text 
        x="${x}" 
        y="${y + 10}" 
        font-family="${config.typography?.fontHeading || 'Manrope, sans-serif'}" 
        font-size="28" 
        text-anchor="middle" 
        font-weight="700" 
        fill="url(#metricGradient)"
      >
        ${metric.value}
      </text>
      
      <text 
        x="${x}" 
        y="${y + 35}" 
        font-family="${config.typography?.fontPrimary || 'Inter, sans-serif'}" 
        font-size="12" 
        text-anchor="middle" 
        fill="${config.colorDark}"
      >
        ${metric.description}
      </text>
    `;
  });
  
  // Add footer
  svg += `
    <text 
      x="30" 
      y="${height - 20}" 
      font-family="${config.typography?.fontPrimary || 'Inter, sans-serif'}" 
      font-size="12" 
      fill="${config.colorDark}"
    >
      Research period: 2022-2025
    </text>
    
    <text 
      x="${width - 30}" 
      y="${height - 20}" 
      font-family="${config.typography?.fontPrimary || 'Inter, sans-serif'}" 
      font-size="12" 
      text-anchor="end" 
      fill="${config.colorPrimary}"
    >
      Updated Mar 2025
    </text>
  `;
  
  // Close SVG tag
  svg += '</svg>';
  
  return svg;
}

// Create specialized framework visualizations with error handling
try {
  const cognitiveMapSVG = generateCognitiveMap();
  try {
    fs.writeFileSync(
      path.join(frameworkDir, 'cognitive-map.svg'),
      cognitiveMapSVG
    );
    console.log('Generated cognitive map visualization');
  } catch (error) {
    console.error(`Error writing cognitive map: ${error.message}`);
  }
} catch (error) {
  console.error(`Error generating cognitive map: ${error.message}`);
}

try {
  const implementationProcessSVG = generateImplementationProcess();
  try {
    fs.writeFileSync(
      path.join(frameworkDir, 'implementation-process.svg'),
      implementationProcessSVG
    );
    console.log('Generated implementation process visualization');
  } catch (error) {
    console.error(`Error writing implementation process: ${error.message}`);
  }
} catch (error) {
  console.error(`Error generating implementation process: ${error.message}`);
}

try {
  const metricsVisualizationSVG = generateMetricsVisualization();
  try {
    fs.writeFileSync(
      path.join(socialProofResultsDir, 'metrics-visualization.svg'),
      metricsVisualizationSVG
    );
    console.log('Generated metrics visualization');
  } catch (error) {
    console.error(`Error writing metrics visualization: ${error.message}`);
  }
} catch (error) {
  console.error(`Error generating metrics visualization: ${error.message}`);
}

console.log('Visualization generation complete!');