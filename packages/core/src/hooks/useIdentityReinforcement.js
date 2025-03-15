import { useState, useEffect } from 'react';
import { identifyVisitorSegment } from '../tracking/visitorSegmentation';
import { trackPsychologicalEvent } from '../tracking/eventTracking';

/**
 * Hook for implementing identity reinforcement patterns
 * 
 * Enables components to access and leverage identity-based
 * psychological triggers based on visitor segmentation.
 * 
 * @returns {Object} Identity reinforcement utilities and state
 */
export const useIdentityReinforcement = () => {
  // Identity intensity (0-1)
  const [identityIntensity, setIdentityIntensity] = useState(
    parseFloat(localStorage.getItem('ipp_identity_intensity') || '0.75')
  );
  
  // Active identity patterns
  const [identityPatterns, setIdentityPatterns] = useState([]);
  
  // Current identity segments
  const [identitySegments, setIdentitySegments] = useState({});
  
  // Initialize on mount
  useEffect(() => {
    loadIdentitySegments();
    
    // Load identity intensity
    const savedIntensity = localStorage.getItem('ipp_identity_intensity');
    if (savedIntensity !== null) {
      setIdentityIntensity(parseFloat(savedIntensity));
    }
  }, []);
  
  /**
   * Load identity segments from visitor segmentation
   */
  const loadIdentitySegments = () => {
    // Initialize visitor segmentation
    identifyVisitorSegment.initialize();
    
    // Get relevant segments
    const allSegments = identifyVisitorSegment.getSegments();
    
    // Extract identity-related segments
    const identityRelated = {
      cognitiveStyle: allSegments.psychographic.cognitiveStyle,
      motivationDrivers: allSegments.psychographic.motivationDrivers,
      tribe: allSegments.behavioral.engagementLevel
    };
    
    setIdentitySegments(identityRelated);
  };
  
  /**
   * Register an identity reinforcement pattern
   * 
   * @param {Object} pattern - Identity pattern to register
   */
  const registerIdentityPattern = (pattern) => {
    setIdentityPatterns(prevPatterns => {
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
        // Add new pattern and track event
        trackPsychologicalEvent({
          triggerType: 'identity_reinforcement',
          triggerSubtype: pattern.type,
          intensity: pattern.intensity,
          effect: 'identity-pattern-registered',
          elementId: pattern.elementId,
          metadata: {
            attributes: pattern.attributes
          }
        });
        
        // Add to active patterns
        return [...prevPatterns, {
          ...pattern,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }];
      }
    });
  };
  
  /**
   * Update identity intensity setting
   * 
   * @param {number} newIntensity - New intensity value (0-1)
   */
  const updateIdentityIntensity = (newIntensity) => {
    // Ensure intensity is within valid range
    const validIntensity = Math.max(0, Math.min(1, newIntensity));
    
    // Update state
    setIdentityIntensity(validIntensity);
    
    // Persist intensity preference
    localStorage.setItem('ipp_identity_intensity', validIntensity.toString());
    
    // Track event
    trackPsychologicalEvent({
      triggerType: 'identity_reinforcement',
      triggerSubtype: 'system',
      intensity: validIntensity,
      effect: 'identity-intensity-updated'
    });
  };
  
  /**
   * Get the dominant identity type based on patterns and segments
   * 
   * @returns {string} Dominant identity type
   */
  const getDominantIdentityType = () => {
    // First try to get from segments
    if (identitySegments.motivationDrivers) {
      return identitySegments.motivationDrivers;
    }
    
    // Fall back to cognitive style
    if (identitySegments.cognitiveStyle) {
      return identitySegments.cognitiveStyle;
    }
    
    // Default to creator identity
    return 'creator';
  };
  
  /**
   * Get optimal identity attributes for the current visitor
   * 
   * @returns {Array} Array of identity attributes
   */
  const getOptimalIdentityAttributes = () => {
    const identityType = getDominantIdentityType();
    
    // Map identity types to attributes
    const attributeMap = {
      analytical: ['methodical', 'logical', 'evidence-driven'],
      intuitive: ['holistic', 'pattern-seeking', 'story-driven'],
      pragmatic: ['practical', 'efficiency-focused', 'outcome-oriented'],
      achievement: ['goal-oriented', 'status-conscious', 'success-driven'],
      belonging: ['connection-seeking', 'relationship-oriented', 'consensus-driven'],
      autonomy: ['independence-seeking', 'self-directed', 'freedom-oriented'],
      creator: ['innovative', 'expressive', 'influential'],
      expert: ['knowledgeable', 'authoritative', 'respected'],
      insider: ['exclusive', 'informed', 'connected']
    };
    
    return attributeMap[identityType] || attributeMap.creator;
  };
  
  /**
   * Calculate identity resonance score for content
   * 
   * @param {string} content - Content to analyze
   * @returns {number} Resonance score (0-1)
   */
  const calculateIdentityResonance = (content) => {
    if (!content) return 0;
    
    // Get optimal attributes
    const attributes = getOptimalIdentityAttributes();
    
    // Search for attribute mentions in content
    let matchCount = 0;
    attributes.forEach(attribute => {
      if (content.toLowerCase().includes(attribute.toLowerCase())) {
        matchCount++;
      }
    });
    
    // Calculate resonance score (0-1)
    return matchCount / attributes.length;
  };
  
  return {
    identityIntensity,
    identityPatterns,
    identitySegments,
    registerIdentityPattern,
    updateIdentityIntensity,
    getDominantIdentityType,
    getOptimalIdentityAttributes,
    calculateIdentityResonance
  };
};
