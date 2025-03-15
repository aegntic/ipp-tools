/**
 * IPP.TOOLS UI Package
 * This package provides shared UI components for the IPP.TOOLS ecosystem.
 */

import React, { useEffect, useState } from 'react';
import { useCognitiveDissonance } from '@ipp-tools/core';

// Psychological Visualization Loader Component
export const PsychologicalVisualizationLoader = ({ variant = 'glass', colorScheme = 'primary' }) => {
  const [visualizations, setVisualizations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { activeTriggers } = useCognitiveDissonance();
  
  useEffect(() => {
    // Load visualizations
    const loadVisualizations = async () => {
      setIsLoading(true);
      
      try {
        // Map of visualization types to load
        const visualizationTypes = [
          'dashboard',
          'analysis',
          'fallacy',
          'particles'
        ];
        
        // Create a mapping of visualization types to their SVG content
        const visualizationMap = {};
        
        // Load each visualization type
        await Promise.all(visualizationTypes.map(async (type) => {
          try {
            const visualizationPath = `/assets/visualizations/${type}-visualization-${variant}${colorScheme !== 'primary' ? `-${colorScheme}` : ''}.svg`;
            const response = await fetch(visualizationPath);
            
            if (response.ok) {
              const svgContent = await response.text();
              visualizationMap[type] = svgContent;
            } else {
              console.warn(`Failed to load visualization: ${visualizationPath}`);
            }
          } catch (error) {
            console.error(`Error loading visualization for ${type}:`, error);
          }
        }));
        
        setVisualizations(visualizationMap);
      } catch (error) {
        console.error('Failed to load visualizations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVisualizations();
  }, [variant, colorScheme]);
  
  // Preload visualizations without displaying them
  return null;
};

// Example Card Component
export const FrameworkCard = ({ 
  title, 
  description, 
  features = [], 
  price, 
  priceNote,
  status = 'active',
  buttonText = 'Access Framework',
  buttonUrl = '#',
  onClick,
  className = ''
}) => {
  const { activeTriggers, activateTrigger } = useCognitiveDissonance();
  
  useEffect(() => {
    // Activate cognitive triggers for the card
    activateTrigger('identityReinforcement', 'medium');
    
    // Cleanup
    return () => {
      // No cleanup needed
    };
  }, [activateTrigger]);
  
  const handleClick = (e) => {
    // Track engagement
    if (window.ippTools?.trackEvent) {
      window.ippTools.trackEvent('framework_card_click', {
        title,
        price,
        status
      });
    }
    
    // Call onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <div className={`framework-card ${status} ${className}`}>
      {status && (
        <div className="framework-badge">{status.toUpperCase()}</div>
      )}
      
      <div className="framework-header">
        <h3 className="framework-title">{title}</h3>
        <p className="framework-subtitle">{description}</p>
      </div>
      
      <div className="framework-content">
        {features.length > 0 && (
          <ul className="framework-features">
            {features.map((feature, index) => (
              <li key={index}>
                <i className="fas fa-check-circle"></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {price && (
          <div className="framework-pricing">
            <div className="price">{price}</div>
            {priceNote && (
              <div className="price-note">{priceNote}</div>
            )}
          </div>
        )}
        
        <a 
          href={buttonUrl} 
          className="btn btn-primary btn-block"
          onClick={handleClick}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

// Export all components
export default {
  PsychologicalVisualizationLoader,
  FrameworkCard
};
