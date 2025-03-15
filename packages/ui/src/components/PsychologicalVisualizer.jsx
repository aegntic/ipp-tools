import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * PsychologicalVisualizer Component
 * 
 * Renders psychologically optimized SVG visualizations that implement
 * different cognitive triggers based on type and variant.
 */
const PsychologicalVisualizer = ({
  type,
  variant,
  className,
  width,
  height,
  alt,
  animationDuration,
  density,
  color,
  ...props
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Generate path to SVG based on type and variant
  const getVisualizationPath = () => {
    const baseTypes = {
      'dashboard': 'dashboard-visualization',
      'chart': 'chart-visualization',
      'particles': 'particle-visualization',
      'logo': 'ipp-logo',
      'error': 'error-visualization',
      'fallacy': 'fallacy-visualization',
      'analysis': 'analysis-visualization'
    };
    
    const basePath = baseTypes[type] || 'fallback-visualization';
    
    // If using a specific color scheme, add it to the path
    const colorSuffix = color ? `-${color}` : '';
    
    return `/assets/visualizations/${basePath}-${variant}${colorSuffix}.svg`;
  };
  
  // Detect visibility for lazy loading and entrance animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  // Handle loading state
  const handleLoaded = () => {
    setIsLoaded(true);
  };
  
  // Dynamic styles based on properties
  const getContainerStyles = () => {
    const styles = {
      opacity: isLoaded ? 1 : 0,
      transition: `opacity ${animationDuration || 500}ms ease-in-out, transform ${animationDuration || 500}ms ease-in-out`,
    };
    
    if (width) styles.width = typeof width === 'number' ? `${width}px` : width;
    if (height) styles.height = typeof height === 'number' ? `${height}px` : height;
    
    return styles;
  };
  
  return (
    <div 
      ref={containerRef}
      className={`psychological-visualizer ${type}-visualizer ${variant}-variant ${className || ''}`}
      style={getContainerStyles()}
      data-psychology-type={type}
      data-psychology-variant={variant}
      {...props}
    >
      {isVisible && (
        <img
          src={getVisualizationPath()}
          alt={alt || `${type} visualization`}
          onLoad={handleLoaded}
          width={width}
          height={height}
          className="visualization-image"
        />
      )}
    </div>
  );
};

PsychologicalVisualizer.propTypes = {
  /** Type of visualization (dashboard, chart, particles, logo, etc.) */
  type: PropTypes.oneOf([
    'dashboard',
    'chart',
    'particles',
    'logo',
    'error',
    'fallacy',
    'analysis'
  ]).isRequired,
  
  /** Variant of the visualization (glass, subtle, standard, etc.) */
  variant: PropTypes.string.isRequired,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Width of the visualization */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /** Height of the visualization */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /** Alternative text for accessibility */
  alt: PropTypes.string,
  
  /** Duration of entrance animation in milliseconds */
  animationDuration: PropTypes.number,
  
  /** Density setting for particle-based visualizations (0-1) */
  density: PropTypes.number,
  
  /** Primary color for the visualization (can be a specific framework color) */
  color: PropTypes.string
};

export default PsychologicalVisualizer;