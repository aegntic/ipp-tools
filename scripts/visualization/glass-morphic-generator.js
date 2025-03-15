// glass-morphic-generator.js
const fs = require('fs').promises;
const path = require('path');

/**
 * Glass Morphic Visualization Generator
 * Creates sophisticated glass-style visualizations with embedded psychological triggers
 * for maximum conversion optimization within the IPP.TOOLS ecosystem
 */
class GlassMorphicGenerator {
  constructor(config) {
    this.config = config;
    this.outputDir = config.outputDir || 'dist/assets/visualizations';
  }

  /**
   * Generate all glass morphic visualizations
   */
  async generateVisualizations() {
    console.log(`🔍 Generating glass morphic visualizations to: ${this.outputDir}`);
    
    // Create output directory if it doesn't exist
    await fs.mkdir(this.outputDir, { recursive: true });
    
    // Generate different visualization types
    await this.generateDashboardVisualization();
    await this.generateContentAnalysisVisualization();
    await this.generateQualityFallacyVisualization();
    
    console.log(`✅ Glass morphic visualizations generated successfully`);
  }
  
  /**
   * Generate dashboard visualization (inspired by reference image 1)
   */
  async generateDashboardVisualization() {
    const fileName = 'dashboard.svg';
    const outputPath = path.join(this.outputDir, fileName);
    
    console.log(`  ⚙️ Generating: ${fileName}`);
    
    // Define gradients and effects for glass morphic style
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" class="viz-dashboard">
      <!-- Definitions for glass morphic effects -->
      <defs>
        <!-- Main glass effect -->
        <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.4)" />
          <stop offset="50%" stop-color="rgba(255, 255, 255, 0.1)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 0.2)" />
        </linearGradient>
        
        <!-- Glass reflection highlight -->
        <linearGradient id="glass-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.5)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
        </linearGradient>
        
        <!-- Data visualization gradients -->
        <linearGradient id="data-gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(84, 104, 255, 0.8)" />
          <stop offset="100%" stop-color="rgba(84, 104, 255, 0.2)" />
        </linearGradient>
        
        <linearGradient id="data-gradient-orange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 159, 64, 0.8)" />
          <stop offset="100%" stop-color="rgba(255, 159, 64, 0.2)" />
        </linearGradient>
        
        <!-- Wave pattern for background -->
        <filter id="wave-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="wave-blur" />
        </filter>
        
        <!-- Glass panel filter -->
        <filter id="glass-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>
      
      <!-- Background gradient -->
      <rect width="1200" height="800" fill="#f8f9fa" />
      
      <!-- Abstract wave background pattern -->
      <g filter="url(#wave-blur)" opacity="0.7">
        <!-- Blue wave -->
        <path class="viz-wave" d="M-100,500 C200,400 400,600 600,500 C800,400 1000,600 1300,500 L1300,800 L-100,800 Z" fill="rgba(84, 104, 255, 0.3)" />
        
        <!-- Orange accent wave -->
        <path class="viz-wave" d="M-100,550 C150,500 300,650 500,600 C700,550 900,650 1300,550 L1300,800 L-100,800 Z" fill="rgba(255, 159, 64, 0.2)" />
        
        <!-- Data point grid -->
        <g opacity="0.3">
          ${Array(200).fill().map((_, i) => {
            const x = Math.random() * 1200;
            const y = 400 + Math.random() * 400;
            const size = Math.random() * 2 + 1;
            return `<circle class="viz-data-point" cx="${x}" cy="${y}" r="${size}" fill="#5468ff" />`;
          }).join('\n          ')}
        </g>
      </g>
      
      <!-- Main glass dashboard panel -->
      <g transform="translate(150, 100)">
        <!-- Glass panel -->
        <rect x="0" y="0" width="900" height="600" rx="20" ry="20" fill="url(#glass-gradient)" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1" />
        
        <!-- Reflection highlight -->
        <path d="M20,20 L880,20 L850,70 L50,70 Z" fill="url(#glass-highlight)" opacity="0.3" />
        
        <!-- Dashboard header -->
        <text x="40" y="60" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#333">CID Reach - Advanced Analytics</text>
        
        <!-- Content by Region/Demographic -->
        <g transform="translate(40, 100)">
          <text x="0" y="0" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#333">Content by Analysis Percentile</text>
          <text x="0" y="25" font-family="Arial, sans-serif" font-size="14" fill="#666">Framework effectiveness by content type</text>
          
          <!-- Area chart -->
          <g transform="translate(0, 50)">
            <!-- Grid lines -->
            <line x1="0" y1="0" x2="0" y2="200" stroke="#e1e5eb" stroke-width="1" />
            <line x1="0" y1="200" x2="600" y2="200" stroke="#e1e5eb" stroke-width="1" />
            
            ${Array(6).fill().map((_, i) => {
              const y = i * 40;
              return `<line x1="0" y1="${y}" x2="600" y2="${y}" stroke="#e1e5eb" stroke-width="0.5" stroke-dasharray="5,5" />`;
            }).join('\n            ')}
            
            ${Array(7).fill().map((_, i) => {
              const x = i * 100;
              return `<line x1="${x}" y1="0" x2="${x}" y2="200" stroke="#e1e5eb" stroke-width="0.5" stroke-dasharray="5,5" />`;
            }).join('\n            ')}
            
            <!-- Area chart data -->
            <path class="viz-wave" d="M0,200 L0,150 C100,130 200,100 300,80 C400,60 500,50 600,60 L600,200 Z" fill="url(#data-gradient-blue)" />
            <path class="viz-chart" d="M0,150 C100,130 200,100 300,80 C400,60 500,50 600,60" fill="none" stroke="#5468ff" stroke-width="2" />
            
            <!-- Data points -->
            <circle class="viz-data-point" cx="0" cy="150" r="4" fill="#5468ff" />
            <circle class="viz-data-point" cx="100" cy="130" r="4" fill="#5468ff" />
            <circle class="viz-data-point" cx="200" cy="100" r="4" fill="#5468ff" />
            <circle class="viz-data-point" cx="300" cy="80" r="4" fill="#5468ff" />
            <circle class="viz-data-point" cx="400" cy="60" r="4" fill="#5468ff" />
            <circle class="viz-data-point" cx="500" cy="50" r="4" fill="#5468ff" />
            <circle class="viz-data-point" cx="600" cy="60" r="4" fill="#5468ff" />
            
            <!-- X-axis labels -->
            <text x="0" y="220" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Jan</text>
            <text x="100" y="220" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Feb</text>
            <text x="200" y="220" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Mar</text>
            <text x="300" y="220" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Apr</text>
            <text x="400" y="220" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">May</text>
            <text x="500" y="220" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Jun</text>
            <text x="600" y="220" font-family="Arial, sans-serif" font-size="12" fill="#666" text-anchor="middle">Jul</text>
          </g>
        </g>
        
        <!-- Stats cards -->
        <g transform="translate(680, 100)">
          <!-- Card 1 -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="180" height="90" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            <text x="20" y="30" font-family="Arial, sans-serif" font-size="14" fill="#666">Average Engagement</text>
            <text x="20" y="60" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#5468ff">572%</text>
          </g>
          
          <!-- Card 2 -->
          <g transform="translate(0, 110)">
            <rect x="0" y="0" width="180" height="90" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            <text x="20" y="30" font-family="Arial, sans-serif" font-size="14" fill="#666">Implementation Rate</text>
            <text x="20" y="60" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#5468ff">97.8%</text>
          </g>
          
          <!-- Card 3 -->
          <g transform="translate(0, 220)">
            <rect x="0" y="0" width="180" height="90" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            <text x="20" y="30" font-family="Arial, sans-serif" font-size="14" fill="#666">Total Creators</text>
            <text x="20" y="60" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#5468ff">15,000+</text>
          </g>
        </g>
        
        <!-- User avatars grid -->
        <g transform="translate(40, 400)">
          <text x="0" y="0" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#333">Recent Framework Implementers</text>
          
          <g transform="translate(0, 30)">
            ${Array(40).fill().map((_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              return `
              <g transform="translate(${col * 40}, ${row * 40})">
                <circle class="viz-data-point" cx="15" cy="15" r="15" fill="#5468ff" opacity="${0.7 + Math.random() * 0.3}" />
                <text x="15" y="20" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle">${String.fromCharCode(65 + Math.floor(Math.random() * 26))}</text>
              </g>`;
            }).join('\n            ')}
          </g>
        </g>
      </g>
    </svg>`;
    
    // Write SVG file
    await fs.writeFile(outputPath, svgContent);
    console.log(`    ✓ Generated: ${fileName}`);
    
    return outputPath;
  }
  
  /**
   * Generate content analysis visualization (inspired by reference image 2)
   */
  async generateContentAnalysisVisualization() {
    const fileName = 'analysis.svg';
    const outputPath = path.join(this.outputDir, fileName);
    
    console.log(`  ⚙️ Generating: ${fileName}`);
    
    // Define SVG content for content analysis wave visualization
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" class="viz-analysis">
      <!-- Definitions for visualization effects -->
      <defs>
        <!-- Glass panel gradient -->
        <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.2)" />
          <stop offset="50%" stop-color="rgba(255, 255, 255, 0.1)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 0.15)" />
        </linearGradient>
        
        <!-- Data wave gradients -->
        <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(84, 104, 255, 0.7)" />
          <stop offset="100%" stop-color="rgba(84, 104, 255, 0)" />
        </linearGradient>
        
        <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(0, 196, 255, 0.7)" />
          <stop offset="100%" stop-color="rgba(0, 196, 255, 0)" />
        </linearGradient>
        
        <!-- Glow effect for highlighted elements -->
        <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="0 0 0 0 0.33  0 0 0 0 0.41  0 0 0 0 1  0 0 0 1 0" result="blue-glow" />
          <feMerge>
            <feMergeNode in="blue-glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <!-- Background particle effect -->
        <filter id="particle-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>
      
      <!-- Dark background -->
      <rect width="1200" height="800" fill="#1e293b" />
      
      <!-- Background particle network -->
      <g opacity="0.3">
        ${Array(300).fill().map((_, i) => {
          const x = Math.random() * 1200;
          const y = Math.random() * 800;
          return `<circle class="viz-data-point" cx="${x}" cy="${y}" r="${Math.random() * 1.5 + 0.5}" fill="#5468ff" opacity="${Math.random() * 0.5 + 0.3}" />`;
        }).join('\n        ')}
        
        ${Array(100).fill().map((_, i) => {
          const x1 = Math.random() * 1200;
          const y1 = Math.random() * 800;
          const x2 = x1 + (Math.random() * 200 - 100);
          const y2 = y1 + (Math.random() * 200 - 100);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#5468ff" stroke-width="0.5" opacity="${Math.random() * 0.2 + 0.1}" />`;
        }).join('\n        ')}
      </g>
      
      <!-- Main visualization panel -->
      <g transform="translate(150, 150)">
        <!-- Glass panel with blue border glow -->
        <rect x="0" y="0" width="900" height="500" rx="20" ry="20" fill="url(#glass-gradient)" stroke="#5468ff" stroke-width="1" filter="url(#blue-glow)" />
        
        <!-- Title and controls -->
        <g transform="translate(40, 40)">
          <text x="0" y="0" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Content Analysis</text>
          <text x="0" y="30" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">Algorithm Response Analysis</text>
          
          <!-- Controls and filters -->
          <g transform="translate(600, 0)">
            <rect x="0" y="-20" width="80" height="30" rx="15" ry="15" fill="rgba(84, 104, 255, 0.3)" stroke="#5468ff" stroke-width="1" />
            <text x="40" y="0" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Filter</text>
            
            <rect x="100" y="-20" width="80" height="30" rx="15" ry="15" fill="rgba(84, 104, 255, 0.3)" stroke="#5468ff" stroke-width="1" />
            <text x="140" y="0" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">Export</text>
          </g>
        </g>
        
        <!-- Main visualization area -->
        <g transform="translate(40, 100)">
          <!-- Content performance metric -->
          <g>
            <text x="0" y="0" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#5468ff">+572%</text>
            <text x="160" y="0" font-family="Arial, sans-serif" font-size="16" fill="#94a3b8">Average engagement <br />improvement</text>
          </g>
          
          <!-- Wave visualization -->
          <g transform="translate(0, 80)">
            <!-- Grid lines -->
            ${Array(6).fill().map((_, i) => {
              const y = i * 40;
              return `<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="#2d3748" stroke-width="1" stroke-dasharray="5,5" />`;
            }).join('\n            ')}
            
            ${Array(9).fill().map((_, i) => {
              const x = i * 100;
              return `<line x1="${x}" y1="0" x2="${x}" y2="200" stroke="#2d3748" stroke-width="1" stroke-dasharray="5,5" />`;
            }).join('\n            ')}
            
            <!-- Data waves -->
            <path class="viz-wave" d="M0,150 C100,130 200,100 300,130 C400,160 500,80 600,60 C700,40 800,60 800,60 L800,200 L0,200 Z" fill="url(#wave-gradient-1)" />
            <path class="viz-chart" d="M0,150 C100,130 200,100 300,130 C400,160 500,80 600,60 C700,40 800,60 800,60" fill="none" stroke="#5468ff" stroke-width="2" />
            
            <path class="viz-wave" d="M0,170 C100,160 200,140 300,170 C400,200 500,150 600,130 C700,110 800,120 800,120 L800,200 L0,200 Z" fill="url(#wave-gradient-2)" opacity="0.7" />
            <path class="viz-chart" d="M0,170 C100,160 200,140 300,170 C400,200 500,150 600,130 C700,110 800,120 800,120" fill="none" stroke="#00c4ff" stroke-width="2" />
            
            <!-- Data points with glow -->
            <circle class="viz-data-point" cx="300" cy="130" r="6" fill="#5468ff" filter="url(#blue-glow)" />
            <circle class="viz-data-point" cx="600" cy="60" r="6" fill="#5468ff" filter="url(#blue-glow)" />
            
            <!-- Connection to floating metric -->
            <line x1="600" y1="60" x2="650" y2="20" stroke="#5468ff" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- Floating metric -->
            <g transform="translate(650, 20)">
              <rect x="-40" y="-20" width="120" height="40" rx="5" ry="5" fill="rgba(84, 104, 255, 0.2)" stroke="#5468ff" stroke-width="1" />
              <text x="20" y="5" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">+210.7%</text>
            </g>
          </g>
          
          <!-- Small chart data -->
          <g transform="translate(600, -20)">
            <rect x="0" y="0" width="180" height="80" rx="5" ry="5" fill="rgba(0, 0, 0, 0.2)" />
            
            <!-- Mini bar chart -->
            ${Array(10).fill().map((_, i) => {
              const x = 20 + i * 15;
              const height = 10 + Math.random() * 30;
              return `<rect class="viz-bar" x="${x}" y="${50 - height}" width="8" height="${height}" fill="#5468ff" opacity="${0.5 + Math.random() * 0.5}" />`;
            }).join('\n            ')}
            
            <text x="20" y="70" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">Algorithm Analysis</text>
          </g>
        </g>
      </g>
    </svg>`;
    
    // Write SVG file
    await fs.writeFile(outputPath, svgContent);
    console.log(`    ✓ Generated: ${fileName}`);
    
    return outputPath;
  }
  
  /**
   * Generate quality fallacy visualization (inspired by reference image 3)
   */
  async generateQualityFallacyVisualization() {
    const fileName = 'fallacy.svg';
    const outputPath = path.join(this.outputDir, fileName);
    
    console.log(`  ⚙️ Generating: ${fileName}`);
    
    // Define SVG content for dashboard visualization
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" class="viz-fallacy">
      <!-- Definitions -->
      <defs>
        <!-- Glass effect -->
        <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.25)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 0.1)" />
        </linearGradient>
        
        <!-- Chart gradients -->
        <linearGradient id="chart-gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(84, 104, 255, 0.8)" />
          <stop offset="100%" stop-color="rgba(84, 104, 255, 0.1)" />
        </linearGradient>
        
        <linearGradient id="chart-gradient-light-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(84, 104, 255, 0.6)" />
          <stop offset="100%" stop-color="rgba(84, 104, 255, 0.05)" />
        </linearGradient>
        
        <!-- Reflection highlight -->
        <linearGradient id="glass-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.4)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
        </linearGradient>
      </defs>
      
      <!-- Light background -->
      <rect width="1200" height="800" fill="#f8f9fa" />
      
      <!-- Main glass dashboard -->
      <g transform="translate(100, 100)">
        <!-- Main glass panel -->
        <rect x="0" y="0" width="1000" height="600" rx="15" ry="15" fill="url(#glass-gradient)" stroke="#e1e5eb" stroke-width="1" />
        
        <!-- Glass reflection -->
        <path d="M15,15 L985,15 L965,50 L35,50 Z" fill="url(#glass-highlight)" opacity="0.5" />
        
        <!-- Dashboard title -->
        <text x="40" y="70" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#0f172a">THE QUALITY FALLACY</text>
        
        <!-- Top metrics row -->
        <g transform="translate(40, 120)">
          <!-- Metric 1: Engagement metric -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="200" height="200" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            
            <!-- Line chart -->
            <g transform="translate(20, 50)">
              <!-- Grid lines -->
              <line x1="0" y1="0" x2="0" y2="100" stroke="#e1e5eb" stroke-width="1" />
              <line x1="0" y1="100" x2="160" y2="100" stroke="#e1e5eb" stroke-width="1" />
              
              <!-- Chart line -->
              <path class="viz-chart" d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,30 C140,10 160,20 160,20" fill="none" stroke="#5468ff" stroke-width="2" />
              
              <!-- Area fill -->
              <path class="viz-wave" d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,30 C140,10 160,20 160,20 L160,100 L0,100 Z" fill="url(#chart-gradient-light-blue)" />
            </g>
            
            <text x="20" y="30" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Engagement Growth</text>
            <text x="100" y="170" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Last 60 days</text>
          </g>
          
          <!-- Metric 2: Central percentage -->
          <g transform="translate(220, 0)">
            <rect x="0" y="0" width="200" height="200" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            
            <!-- Circle percentage -->
            <circle cx="100" cy="100" r="70" fill="none" stroke="#e1e5eb" stroke-width="8" />
            <circle class="viz-chart" cx="100" cy="100" r="70" fill="none" stroke="#5468ff" stroke-width="8" stroke-dasharray="439.6 439.6" stroke-dashoffset="110" transform="rotate(-90 100 100)" />
            
            <text x="100" y="100" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#0f172a" text-anchor="middle" dominant-baseline="middle">75%</text>
            
            <text x="100" y="170" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Framework Adoption</text>
          </g>
          
          <!-- Metric 3 & 4: Combined metrics -->
          <g transform="translate(440, 0)">
            <rect x="0" y="0" width="520" height="200" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            
            <!-- Content metrics -->
            <g transform="translate(20, 20)">
              <text x="0" y="0" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Content Analysis</text>
              
              <!-- Metric cards -->
              <g transform="translate(0, 30)">
                <!-- Sessions -->
                <g transform="translate(0, 0)">
                  <rect x="0" y="0" width="110" height="60" rx="5" ry="5" fill="rgba(84, 104, 255, 0.1)" stroke="#e1e5eb" stroke-width="1" />
                  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Total Sessions</text>
                  <text x="10" y="45" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">10,568</text>
                </g>
                
                <!-- Engagement -->
                <g transform="translate(120, 0)">
                  <rect x="0" y="0" width="110" height="60" rx="5" ry="5" fill="rgba(84, 104, 255, 0.1)" stroke="#e1e5eb" stroke-width="1" />
                  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Avg. Time</text>
                  <text x="10" y="45" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">7:52</text>
                </g>
                
                <!-- Conversion -->
                <g transform="translate(240, 0)">
                  <rect x="0" y="0" width="110" height="60" rx="5" ry="5" fill="rgba(84, 104, 255, 0.1)" stroke="#e1e5eb" stroke-width="1" />
                  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Conversion</text>
                  <text x="10" y="45" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">5.8%</text>
                </g>
                
                <!-- Revenue -->
                <g transform="translate(360, 0)">
                  <rect x="0" y="0" width="110" height="60" rx="5" ry="5" fill="rgba(84, 104, 255, 0.1)" stroke="#e1e5eb" stroke-width="1" />
                  <text x="10" y="20" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Revenue</text>
                  <text x="10" y="45" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">$9,584</text>
                </g>
              </g>
              
              <!-- Bar chart -->
              <g transform="translate(0, 100)">
                ${Array(12).fill().map((_, i) => {
                  const x = i * 40;
                  const height = 20 + Math.random() * 50;
                  return `
                  <g transform="translate(${x}, 0)">
                    <rect class="viz-bar" x="0" y="${70 - height}" width="25" height="${height}" fill="url(#chart-gradient-blue)" rx="2" ry="2" />
                    <text x="12.5" y="85" font-family="Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">${String.fromCharCode(65 + i)}</text>
                  </g>`;
                }).join('\n                ')}
              </g>
            </g>
          </g>
        </g>
        
        <!-- Bottom row charts -->
        <g transform="translate(40, 340)">
          <!-- Engagement Growth chart -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="460" height="240" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            
            <text x="20" y="30" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Content Engagement</text>
            
            <!-- Bar chart -->
            <g transform="translate(20, 50)">
              <!-- Grid lines -->
              ${Array(6).fill().map((_, i) => {
                const y = i * 30;
                return `<line x1="0" y1="${150 - y}" x2="420" y2="${150 - y}" stroke="#e1e5eb" stroke-width="0.5" stroke-dasharray="3,3" />`;
              }).join('\n              ')}
              
              <!-- X and Y axes -->
              <line x1="0" y1="150" x2="420" y2="150" stroke="#64748b" stroke-width="1" />
              <line x1="0" y1="0" x2="0" y2="150" stroke="#64748b" stroke-width="1" />
              
              <!-- Bars -->
              ${Array(14).fill().map((_, i) => {
                const x = i * 30;
                // Create two-stage growth pattern to reinforce the psychological trigger
                const height = i < 7 ? 20 + i * 5 : 60 + (i - 7) * 12;
                return `
                <g transform="translate(${x}, 0)">
                  <rect class="viz-bar" x="3" y="${150 - height}" width="24" height="${height}" fill="${i < 7 ? '#cbd5e1' : 'url(#chart-gradient-blue)'}" rx="2" ry="2" />
                  <text x="15" y="165" font-family="Arial, sans-serif" font-size="10" fill="#64748b" text-anchor="middle">${i + 1}</text>
                </g>`;
              }).join('\n              ')}
              
              <!-- Annotations -->
              <line x1="210" y1="0" x2="210" y2="150" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3" />
              <text x="210" y="185" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#5468ff" text-anchor="middle">Framework Implementation</text>
              
              <!-- Label -->
              <text x="210" y="205" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Week Number</text>
            </g>
          </g>
          
          <!-- Performance chart -->
          <g transform="translate(480, 0)">
            <rect x="0" y="0" width="460" height="240" rx="10" ry="10" fill="rgba(255, 255, 255, 0.3)" stroke="#e1e5eb" stroke-width="1" />
            
            <text x="20" y="30" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Algorithm Performance</text>
            
            <!-- Combination chart -->
            <g transform="translate(20, 50)">
              <!-- Grid lines -->
              ${Array(6).fill().map((_, i) => {
                const y = i * 30;
                return `<line x1="0" y1="${150 - y}" x2="420" y2="${150 - y}" stroke="#e1e5eb" stroke-width="0.5" stroke-dasharray="3,3" />`;
              }).join('\n              ')}
              
              <!-- X and Y axes -->
              <line x1="0" y1="150" x2="420" y2="150" stroke="#64748b" stroke-width="1" />
              <line x1="0" y1="0" x2="0" y2="150" stroke="#64748b" stroke-width="1" />
              
              <!-- Line chart -->
              <path class="viz-chart" d="M0,120 C50,110 100,100 150,95 C200,90 250,60 300,30 C350,10 400,5 420,0" fill="none" stroke="#5468ff" stroke-width="2" />
              
              <!-- Data points -->
              ${[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => {
                // Create curve points along the path
                const y = i < 3 ? 120 - i * 10 : 90 - Math.min(85, (i - 3) * 25);
                return `<circle class="viz-data-point" cx="${x}" cy="${y}" r="4" fill="#5468ff" />`;
              }).join('\n              ')}
              
              <!-- Annotation for quality fallacy point -->
              <circle class="viz-data-point" cx="200" cy="90" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="1" />
              <line x1="200" y1="90" x2="240" y2="50" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3" />
              <rect x="240" y="30" width="160" height="40" rx="5" ry="5" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" stroke-width="1" />
              <text x="320" y="55" font-family="Arial, sans-serif" font-size="12" fill="#ef4444" text-anchor="middle">Quality Fallacy Point</text>
              
              <!-- Label -->
              <text x="210" y="180" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Psychological Trigger Implementation Progress</text>
            </g>
          </g>
        </g>
        
        <!-- World map small visualization -->
        <g transform="translate(720, 120)">
          <text x="100" y="210" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a" text-anchor="middle">Global Implementation Map</text>
          
          <!-- Simplified world map outline -->
          <path d="M10,100 Q50,80 80,90 T150,100 T200,90 T240,100 Q270,110 300,100 T350,90 T380,100" fill="none" stroke="#64748b" stroke-width="1" />
          <path d="M50,120 Q80,110 120,120 T180,110 T230,120 T270,110" fill="none" stroke="#64748b" stroke-width="1" />
          <path d="M100,130 Q130,140 160,130 T220,140" fill="none" stroke="#64748b" stroke-width="1" />
          
          <!-- Implementation hotspots -->
          <circle class="viz-data-point" cx="80" cy="90" r="8" fill="#5468ff" opacity="0.7" />
          <circle class="viz-data-point" cx="190" cy="110" r="6" fill="#5468ff" opacity="0.7" />
          <circle class="viz-data-point" cx="270" cy="90" r="10" fill="#5468ff" opacity="0.7" />
          <circle class="viz-data-point" cx="150" cy="120" r="5" fill="#5468ff" opacity="0.7" />
          <circle class="viz-data-point" cx="350" cy="100" r="7" fill="#5468ff" opacity="0.7" />
        </g>
      </g>
    </svg>`;
    
    // Write SVG file
    await fs.writeFile(outputPath, svgContent);
    console.log(`    ✓ Generated: ${fileName}`);
    
    return outputPath;
  }
}

module.exports = { GlassMorphicGenerator };

// CLI interface for direct usage
if (require.main === module) {
  const { program } = require('commander');
  
  program
    .name('glass-morphic-generator')
    .description('Generate glass morphic visualizations for IPP.TOOLS')
    .option('-o, --output <directory>', 'Output directory for visualizations', 'public/assets/visualizations')
    .parse(process.argv);
  
  const options = program.opts();
  
  const config = {
    outputDir: options.output
  };
  
  const generator = new GlassMorphicGenerator(config);
  generator.generateVisualizations()
    .then(() => {
      console.log('✅ All visualizations generated successfully.');
    })
    .catch(error => {
      console.error('❌ Error generating visualizations:', error);
      process.exit(1);
    });
}