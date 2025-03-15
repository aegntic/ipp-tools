// GlassMorphicVisualization.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Glass Morphic Visualization Component
 * 
 * Sophisticated visualization component that implements advanced psychological triggers
 * to increase engagement and conversion rates within the IPP.TOOLS ecosystem.
 * 
 * This component renders SVG visualizations with glass-like effects and animations
 * designed to create unconscious engagement patterns.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.type - Visualization type ('dashboard', 'analysis', 'fallacy')
 * @param {string} props.variant - Color variant ('light', 'dark')
 * @param {number} props.height - Visualization height in pixels
 * @param {number} props.width - Visualization width in pixels
 * @param {boolean} props.animationEnabled - Whether animations are enabled
 * @param {Function} props.onHover - Callback when visualization is hovered
 * @param {Function} props.onClick - Callback when visualization is clicked
 */
const GlassMorphicVisualization = ({ 
  type = 'dashboard',
  variant = 'light',
  height = 500,
  width = 800,
  animationEnabled = true,
  onHover = () => {},
  onClick = () => {}
}) => {
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadError, setLoadError] = useState(null);
  
  // Load the appropriate SVG based on type and variant
  useEffect(() => {
    const loadVisualization = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        
        // Construct filename based on type and variant
        const svgFile = variant === 'dark' 
          ? `${type}-dark.svg` 
          : `${type}.svg`;
        
        // Dynamically load the SVG file
        const response = await fetch(`/assets/visualizations/${svgFile}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load visualization: ${response.statusText}`);
        }
        
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading visualization:', error);
        setLoadError(error.message);
        
        // Fallback to a simple placeholder SVG
        setSvgContent(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${variant === 'dark' ? '#1e293b' : '#f8f9fa'}" />
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
                fill="${variant === 'dark' ? '#f1f5f9' : '#0f172a'}" text-anchor="middle">
            Visualization ${loadError ? 'error: ' + loadError : 'loading...'}
          </text>
        </svg>`);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVisualization();
  }, [type, variant, width, height]);
  
  // Apply animations when visualization is visible
  useEffect(() => {
    if (!animationEnabled || !svgContent || isLoading || loadError) return;
    
    // Reference to the container element and SVG document
    const container = document.getElementById(`glass-viz-${type}`);
    if (!container) return;
    
    // Function to find and animate SVG elements
    const animateElements = () => {
      // Wait a bit for SVG to be fully rendered
      setTimeout(() => {
        try {
          const svgDocument = container.querySelector('svg');
          if (!svgDocument) return;
          
          // Animation configurations based on visualization type
          const animations = {
            // Dashboard visualization animations
            dashboard: () => {
              // Data points animation with staggered delay
              const dataPoints = Array.from(svgDocument.querySelectorAll('.viz-data-point'));
              dataPoints.forEach((point, index) => {
                point.style.opacity = '0';
                point.style.transform = 'scale(0.5)';
                
                setTimeout(() => {
                  point.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                  point.style.opacity = '1';
                  point.style.transform = 'scale(1)';
                }, index * 50);
              });
              
              // Chart lines animation
              const charts = Array.from(svgDocument.querySelectorAll('.viz-chart'));
              charts.forEach(chart => {
                const length = chart.getTotalLength ? chart.getTotalLength() : 1000;
                chart.style.strokeDasharray = length;
                chart.style.strokeDashoffset = length;
                
                setTimeout(() => {
                  chart.style.transition = 'stroke-dashoffset 1.5s ease-out';
                  chart.style.strokeDashoffset = '0';
                }, 300);
              });
              
              // Wave fills animation
              const waves = Array.from(svgDocument.querySelectorAll('.viz-wave'));
              waves.forEach(wave => {
                wave.style.opacity = '0';
                
                setTimeout(() => {
                  wave.style.transition = 'opacity 1s ease-out';
                  wave.style.opacity = '1';
                }, 800);
              });
            },
            
            // Analysis visualization animations
            analysis: () => {
              // Wave animations
              const waves = Array.from(svgDocument.querySelectorAll('.viz-wave'));
              waves.forEach((wave, index) => {
                wave.style.opacity = '0';
                wave.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                  wave.style.transition = 'opacity 1s ease-out, transform 1.5s ease-out';
                  wave.style.opacity = '1';
                  wave.style.transform = 'translateY(0)';
                }, 300 + index * 200);
              });
              
              // Data points animation
              const dataPoints = Array.from(svgDocument.querySelectorAll('.viz-data-point'));
              dataPoints.forEach((point, index) => {
                point.style.opacity = '0';
                point.style.transform = 'scale(0.5)';
                
                setTimeout(() => {
                  point.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                  point.style.opacity = '1';
                  point.style.transform = 'scale(1)';
                }, 500 + index * 150);
              });
              
              // Chart lines animation
              const charts = Array.from(svgDocument.querySelectorAll('.viz-chart'));
              charts.forEach((chart, index) => {
                const length = chart.getTotalLength ? chart.getTotalLength() : 1000;
                chart.style.strokeDasharray = length;
                chart.style.strokeDashoffset = length;
                
                setTimeout(() => {
                  chart.style.transition = 'stroke-dashoffset 2s ease-out';
                  chart.style.strokeDashoffset = '0';
                }, 300 + index * 300);
              });
            },
            
            // Fallacy visualization animations
            fallacy: () => {
              // Bar chart animation
              const bars = Array.from(svgDocument.querySelectorAll('.viz-bar'));
              bars.forEach((bar, index) => {
                const originalHeight = bar.getAttribute('height');
                bar.setAttribute('height-original', originalHeight);
                bar.setAttribute('height', '0');
                bar.setAttribute('y-original', bar.getAttribute('y'));
                bar.setAttribute('y', parseFloat(bar.getAttribute('y')) + parseFloat(originalHeight));
                
                setTimeout(() => {
                  bar.style.transition = 'height 1s ease-out, y 1s ease-out';
                  bar.setAttribute('height', originalHeight);
                  bar.setAttribute('y', bar.getAttribute('y-original'));
                }, 100 + index * 50);
              });
              
              // Chart lines animation
              const charts = Array.from(svgDocument.querySelectorAll('.viz-chart'));
              charts.forEach((chart, index) => {
                const length = chart.getTotalLength ? chart.getTotalLength() : 1000;
                chart.style.strokeDasharray = length;
                chart.style.strokeDashoffset = length;
                
                setTimeout(() => {
                  chart.style.transition = 'stroke-dashoffset 1.5s ease-out';
                  chart.style.strokeDashoffset = '0';
                }, 800);
              });
              
              // Data points animation
              const dataPoints = Array.from(svgDocument.querySelectorAll('.viz-data-point'));
              dataPoints.forEach((point, index) => {
                point.style.opacity = '0';
                point.style.transform = 'scale(0.5)';
                
                setTimeout(() => {
                  point.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                  point.style.opacity = '1';
                  point.style.transform = 'scale(1)';
                }, 1200 + index * 100);
              });
            }
          };
          
          // Execute animation based on visualization type
          if (animations[type]) {
            animations[type]();
          }
        } catch (error) {
          console.warn('Animation error:', error);
        }
      }, 100);
    };
    
    // Start animations when content is loaded
    animateElements();
  }, [svgContent, isLoading, animationEnabled, type, loadError]);
  
  // Handle interaction events
  const handleMouseEnter = () => {
    if (!hasInteracted && !isLoading && !loadError) {
      setHasInteracted(true);
      onHover(type);
      
      // Implement psychological conversion tracking
      if (window.IPP && window.IPP.trackPsychologicalTrigger) {
        window.IPP.trackPsychologicalTrigger({
          type: 'visualization_engagement',
          triggerType: type,
          interactionStage: 'view',
          timestamp: new Date().toISOString()
        });
      }
    }
  };
  
  const handleClick = () => {
    if (!isLoading && !loadError) {
      onClick(type);
      
      // Implement psychological conversion tracking
      if (window.IPP && window.IPP.trackPsychologicalTrigger) {
        window.IPP.trackPsychologicalTrigger({
          type: 'visualization_engagement',
          triggerType: type,
          interactionStage: 'click',
          timestamp: new Date().toISOString(),
          conversionPotential: type === 'fallacy' ? 'high' : 'medium'
        });
      }
    }
  };
  
  // Create safe inner HTML with proper SVG content
  const createMarkup = () => {
    return { __html: svgContent };
  };
  
  // Handle loading state with psychological cues
  if (isLoading) {
    return (
      <div 
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: variant === 'dark' ? '#1e293b' : '#f8f9fa',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <div className="loading-pulse" style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#5468ff',
          opacity: 0.7,
          animation: 'pulse 1.5s infinite ease-in-out'
        }} />
        <style>{`
          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 0.9; }
            100% { transform: scale(0.95); opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div 
      id={`glass-viz-${type}`}
      className={`glass-morphic-visualization glass-viz-${type} ${variant === 'dark' ? 'glass-viz-dark' : 'glass-viz-light'}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        transform: hasInteracted ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hasInteracted 
          ? `0 10px 25px rgba(84, 104, 255, 0.15), 0 5px 10px rgba(84, 104, 255, 0.1)` 
          : loadError 
            ? '0 5px 15px rgba(239, 68, 68, 0.15)'
            : '0 5px 15px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div dangerouslySetInnerHTML={createMarkup()} />
      
      {/* Add subtle hover effect for psychological response */}
      <style>{`
        .glass-morphic-visualization::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, transparent 0%, rgba(84, 104, 255, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease-out;
          pointer-events: none;
        }
        
        .glass-morphic-visualization:hover::after {
          opacity: 1;
        }
        
        /* Animation base styles */
        .glass-morphic-visualization svg {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

GlassMorphicVisualization.propTypes = {
  type: PropTypes.oneOf(['dashboard', 'analysis', 'fallacy']),
  variant: PropTypes.oneOf(['light', 'dark']),
  height: PropTypes.number,
  width: PropTypes.number,
  animationEnabled: PropTypes.bool,
  onHover: PropTypes.func,
  onClick: PropTypes.func
};

export default GlassMorphicVisualization;