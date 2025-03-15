// SVG Asset Generator for IPP.TOOLS
// This utility helps generate consistent SVG assets for the psychological engagement framework

const fs = require('fs');
const path = require('path');

/**
 * Create SVG Asset Generator class
 * Centralizes creation of all visual assets with consistent styling
 */
class SVGAssetGenerator {
  constructor(config = {}) {
    this.config = {
      colorPrimary: config.colorPrimary || '#5468ff',
      colorSecondary: config.colorSecondary || '#8400ff',
      colorLight: config.colorLight || '#f8f9fa',
      colorDark: config.colorDark || '#0f172a',
      outputDir: config.outputDir || './output',
      ...config
    };
    
    // Create output directory if it doesn't exist
    try {
      if (!fs.existsSync(this.config.outputDir)) {
        fs.mkdirSync(this.config.outputDir, { recursive: true });
        console.log(`Created output directory: ${this.config.outputDir}`);
      }
    } catch (error) {
      console.error(`Error creating output directory: ${error.message}`);
      console.log('Will attempt to continue with asset generation...');
    }
  }
  
  /**
   * Generate logo with gradient
   * @param {Object} options - Logo generation options
   * @returns {string} SVG content
   */
  generateLogo(options = {}) {
    const {
      variant = 'primary', // primary, horizontal, mark
      width = 200,
      height = 80,
      includeText = true
    } = options;
    
    // Base SVG wrapper
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;
    
    // Add defs with gradient
    svg += `
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${this.config.colorPrimary}" />
          <stop offset="100%" stop-color="${this.config.colorSecondary}" />
        </linearGradient>
      </defs>
    `;
    
    if (variant === 'mark') {
      // Just the logomark
      svg += `
        <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height)/2.5}" fill="url(#brandGradient)" />
        <path d="M${width/2-width/10} ${height/2} L${width/2} ${height/2-height/6} L${width/2+width/10} ${height/2} L${width/2} ${height/2+height/6}Z" fill="${this.config.colorLight}" />
      `;
    } else {
      // Full logo with potential text
      svg += `
        <circle cx="${height/2}" cy="${height/2}" r="${height/2.5}" fill="url(#brandGradient)" />
        <path d="M${height/2-height/10} ${height/2} L${height/2} ${height/2-height/6} L${height/2+height/10} ${height/2} L${height/2} ${height/2+height/6}Z" fill="${this.config.colorLight}" />
      `;
      
      if (includeText) {
        if (variant === 'primary') {
          // Stacked text arrangement
          svg += `
            <text x="${height + 10}" y="${height/2-10}" font-family="Manrope, sans-serif" font-weight="700" font-size="${height/4}" fill="${this.config.colorDark}">CASCADE</text>
            <text x="${height + 10}" y="${height/2+15}" font-family="Manrope, sans-serif" font-weight="300" font-size="${height/4}" fill="${this.config.colorPrimary}">VIBE</text>
          `;
        } else if (variant === 'horizontal') {
          // Horizontal text arrangement
          svg += `
            <text x="${height + 10}" y="${height/2+height/8}" font-family="Manrope, sans-serif" font-weight="700" font-size="${height/3}" fill="${this.config.colorDark}">CASCADE<tspan font-weight="300" fill="${this.config.colorPrimary}">VIBE</tspan></text>
          `;
        }
      }
    }
    
    // Close SVG tag
    svg += '</svg>';
    
    return svg;
  }
  
  /**
   * Generate framework component visualization
   * @param {Object} options - Component options
   * @returns {string} SVG content
   */
  generateFrameworkComponent(options = {}) {
    const {
      componentName = 'cognitive-dissonance',
      width = 200,
      height = 200,
    } = options;
    
    // Base SVG wrapper
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;
    
    // Add defs with gradients
    svg += `
      <defs>
        <linearGradient id="componentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${this.config.colorPrimary}" />
          <stop offset="100%" stop-color="${this.config.colorSecondary}" />
        </linearGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    `;
    
    // Different visualizations based on component name
    switch(componentName) {
      case 'cognitive-dissonance':
        svg += `
          <circle cx="${width/3}" cy="${height/3}" r="${width/6}" fill="${this.config.colorLight}" stroke="${this.config.colorPrimary}" stroke-width="2" />
          <circle cx="${width*2/3}" cy="${height*2/3}" r="${width/6}" fill="${this.config.colorLight}" stroke="${this.config.colorSecondary}" stroke-width="2" />
          <path d="M${width/3} ${height/3} L${width*2/3} ${height*2/3}" stroke="url(#componentGradient)" stroke-width="3" stroke-dasharray="5,5" />
          <circle cx="${width/2}" cy="${height/2}" r="${width/12}" fill="url(#componentGradient)" filter="url(#glow)" />
        `;
        break;
        
      case 'identity-reinforcement':
        svg += `
          <polygon points="${width/2},${height/6} ${width*5/6},${height/2} ${width/2},${height*5/6} ${width/6},${height/2}" fill="none" stroke="${this.config.colorPrimary}" stroke-width="2" />
          <circle cx="${width/2}" cy="${height/2}" r="${width/4}" fill="none" stroke="${this.config.colorSecondary}" stroke-width="2" stroke-dasharray="8,4" />
          <circle cx="${width/2}" cy="${height/2}" r="${width/8}" fill="url(#componentGradient)" />
        `;
        break;
        
      case 'algorithmic-resonance':
        svg += `
          <rect x="${width/6}" y="${height/6}" width="${width*2/3}" height="${height*2/3}" rx="${width/20}" fill="none" stroke="${this.config.colorPrimary}" stroke-width="2" />
          <line x1="${width/6}" y1="${height/2}" x2="${width*5/6}" y2="${height/2}" stroke="${this.config.colorSecondary}" stroke-width="3" />
          <circle cx="${width/3}" cy="${height/2}" r="${width/15}" fill="${this.config.colorLight}" stroke="url(#componentGradient)" stroke-width="2" />
          <circle cx="${width/2}" cy="${height/2}" r="${width/15}" fill="${this.config.colorLight}" stroke="url(#componentGradient)" stroke-width="2" />
          <circle cx="${width*2/3}" cy="${height/2}" r="${width/15}" fill="${this.config.colorLight}" stroke="url(#componentGradient)" stroke-width="2" />
        `;
        break;
        
      default:
        svg += `
          <circle cx="${width/2}" cy="${height/2}" r="${width/3}" fill="none" stroke="url(#componentGradient)" stroke-width="2" />
          <text x="${width/2}" y="${height/2+5}" font-family="Inter, sans-serif" font-size="${width/10}" text-anchor="middle" fill="${this.config.colorDark}">${componentName}</text>
        `;
    }
    
    // Close SVG tag
    svg += '</svg>';
    
    return svg;
  }

  /**
   * Save SVG to file
   * @param {string} svg - SVG content
   * @param {string} filename - Output filename
   */
  saveSVG(svg, filename) {
    try {
      // Create directory for file if it doesn't exist
      const dirPath = path.dirname(path.join(this.config.outputDir, filename));
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      const filePath = path.join(this.config.outputDir, filename);
      fs.writeFileSync(filePath, svg);
      console.log(`SVG saved to ${filePath}`);
    } catch (error) {
      console.error(`Error saving SVG to ${filename}: ${error.message}`);
    }
  }
  
  /**
   * Generate all assets at once
   */
  generateAllAssets() {
    // Create directory structure
    const directories = [
      'branding',
      'framework',
      'framework/trigger-icons',
      'social-proof',
      'social-proof/testimonials',
      'social-proof/results',
      'triggers',
      'triggers/scarcity-indicators',
      'triggers/social-validation',
      'triggers/authority-markers'
    ];
    
    // Create directories with error handling
    directories.forEach(dir => {
      try {
        const dirPath = path.join(this.config.outputDir, dir);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
      } catch (error) {
        console.error(`Error creating directory ${dir}: ${error.message}`);
      }
    });
    
    // Generate branding assets with error handling
    try {
      this.saveSVG(this.generateLogo({ variant: 'primary' }), 'branding/logo-primary.svg');
      this.saveSVG(this.generateLogo({ variant: 'horizontal' }), 'branding/logo-horizontal.svg');
      this.saveSVG(this.generateLogo({ variant: 'mark', width: 100, height: 100 }), 'branding/logo-mark-only.svg');
    } catch (error) {
      console.error(`Error generating branding assets: ${error.message}`);
    }
    
    // Generate framework components
    const components = [
      'cognitive-dissonance',
      'identity-reinforcement',
      'algorithmic-resonance',
      'precision-communication',
      'sustained-engagement',
      'authority-positioning'
    ];
    
    components.forEach(component => {
      try {
        const svg = this.generateFrameworkComponent({ componentName: component });
        this.saveSVG(svg, `framework/trigger-icons/${component}.svg`);
      } catch (error) {
        console.error(`Error generating component ${component}: ${error.message}`);
      }
    });
    
    console.log('Asset generation complete (errors may have occurred)');
  }
}

module.exports = SVGAssetGenerator;