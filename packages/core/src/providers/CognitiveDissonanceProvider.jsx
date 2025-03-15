import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { trackingSystem } from '../tracking/trackingInitializer';
import { identifyVisitorSegment } from '../tracking/visitorSegmentation';

// Create context for cognitive dissonance state
export const CognitiveDissonanceContext = createContext({
  cognitiveIntensity: 0.7,
  dissonancePatterns: [],
  addDissonancePattern: () => {},
  removeDissonancePattern: () => {},
  updateIntensity: () => {}
});

/**
 * CognitiveDissonanceProvider Component
 * 
 * Provides global cognitive dissonance state management and
 * intensity calibration for psychological triggers.
 */
const CognitiveDissonanceProvider = ({ children, initialIntensity }) => {
  // Intensity of cognitive effects (0-1)
  const [cognitiveIntensity, setCognitiveIntensity] = useState(
    initialIntensity || 
    parseFloat(localStorage.getItem('ipp_psychological_intensity') || '0.7')
  );
  
  // Active dissonance patterns
  const [dissonancePatterns, setDissonancePatterns] = useState([]);
  
  // Initialize visitor segmentation
  useEffect(() => {
    identifyVisitorSegment.initialize();
    
    // Apply recommended intensity based on visitor segment
    const recommendations = identifyVisitorSegment.getRecommendedTriggers();
    const segmentIntensity = cognitiveIntensity * recommendations.intensityMultiplier;
    
    // Only update if significantly different
    if (Math.abs(segmentIntensity - cognitiveIntensity) > 0.1) {
      updateIntensity(segmentIntensity);
    }
  }, [cognitiveIntensity]);
  
  /**
   * Add a new dissonance pattern to the active patterns
   * 
   * @param {Object} pattern - Dissonance pattern to add
   */
  const addDissonancePattern = (pattern) => {
    setDissonancePatterns(prevPatterns => {
      // Check if pattern with this ID already exists
      const existingIndex = prevPatterns.findIndex(p => 
        p.elementId === pattern.elementId
      );
      
      if (existingIndex >= 0) {
        // Update existing pattern
        const updatedPatterns = [...prevPatterns];
        updatedPatterns[existingIndex] = {
          ...updatedPatterns[existingIndex],
          ...pattern,
          updatedAt: Date.now()
        };
        return updatedPatterns;
      } else {
        // Add new pattern
        return [...prevPatterns, {
          ...pattern,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }];
      }
    });
  };
  
  /**
   * Remove a dissonance pattern from active patterns
   * 
   * @param {string} patternId - ID of pattern to remove
   */
  const removeDissonancePattern = (patternId) => {
    setDissonancePatterns(prevPatterns => 
      prevPatterns.filter(pattern => pattern.elementId !== patternId)
    );
  };
  
  /**
   * Update the cognitive intensity level
   * 
   * @param {number} newIntensity - New intensity value (0-1)
   */
  const updateIntensity = (newIntensity) => {
    // Ensure intensity is within valid range
    const validIntensity = Math.max(0, Math.min(1, newIntensity));
    
    // Update state
    setCognitiveIntensity(validIntensity);
    
    // Persist intensity preference
    localStorage.setItem('ipp_psychological_intensity', validIntensity.toString());
    
    // Track intensity adjustment
    trackingSystem.updatePsychologicalIntensity(validIntensity);
  };
  
  // Provide context value to children
  const contextValue = {
    cognitiveIntensity,
    dissonancePatterns,
    addDissonancePattern,
    removeDissonancePattern,
    updateIntensity
  };
  
  return (
    <CognitiveDissonanceContext.Provider value={contextValue}>
      {children}
    </CognitiveDissonanceContext.Provider>
  );
};

CognitiveDissonanceProvider.propTypes = {
  /** Child components */
  children: PropTypes.node.isRequired,
  
  /** Initial intensity level (0-1) */
  initialIntensity: PropTypes.number
};

export default CognitiveDissonanceProvider;