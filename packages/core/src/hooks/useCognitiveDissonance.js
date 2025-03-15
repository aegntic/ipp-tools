import { useContext } from 'react';
import { CognitiveDissonanceContext } from '../providers/CognitiveDissonanceProvider';

/**
 * Hook for accessing and manipulating cognitive dissonance state
 * 
 * Provides access to the global cognitive dissonance context,
 * enabling components to participate in the psychological
 * engagement ecosystem.
 * 
 * @returns {Object} Cognitive dissonance context and utilities
 */
export const useCognitiveDissonance = () => {
  const context = useContext(CognitiveDissonanceContext);
  
  if (!context) {
    throw new Error('useCognitiveDissonance must be used within a CognitiveDissonanceProvider');
  }
  
  /**
   * Get optimized intensity for a specific trigger type
   * 
   * @param {string} triggerType - Type of psychological trigger
   * @param {string} [subtype] - Optional subtype of the trigger
   * @returns {number} Optimized intensity value (0-1)
   */
  const getOptimizedIntensity = (triggerType, subtype) => {
    const baseIntensity = context.cognitiveIntensity;
    
    // Apply specific intensity modifiers based on trigger type
    const typeModifiers = {
      'cognitive_dissonance': 1.1,  // Slightly amplify cognitive dissonance
      'identity': 0.95,            // Slightly reduce identity triggers
      'authority': 1.05,           // Slightly amplify authority triggers
      'scarcity': 0.9,             // Reduce scarcity triggers
      'curiosity': 1.15            // Amplify curiosity triggers
    };
    
    // Get type modifier or default to 1.0
    const typeModifier = typeModifiers[triggerType] || 1.0;
    
    // Calculate optimized intensity (capped at 0-1)
    return Math.min(1.0, Math.max(0, baseIntensity * typeModifier));
  };
  
  /**
   * Calculate psychological synchronization score between patterns
   * 
   * @param {Array} patternTypes - Types of patterns to evaluate
   * @returns {number} Synchronization score (0-1)
   */
  const calculateSynchronizationScore = (patternTypes) => {
    // Get active patterns of specified types
    const filteredPatterns = context.dissonancePatterns.filter(pattern => 
      patternTypes.includes(pattern.type)
    );
    
    if (filteredPatterns.length === 0) return 0;
    
    // Calculate average intensity
    const avgIntensity = filteredPatterns.reduce(
      (sum, pattern) => sum + pattern.intensity, 
      0
    ) / filteredPatterns.length;
    
    // Calculate pattern diversity (0-1)
    const uniqueTypes = new Set(filteredPatterns.map(p => p.type)).size;
    const typeDiversity = uniqueTypes / patternTypes.length;
    
    // Synchronization formula: balance intensity with diversity
    return (avgIntensity * 0.7) + (typeDiversity * 0.3);
  };
  
  /**
   * Check if a specific psychological pattern is active
   * 
   * @param {string} patternType - Type of pattern to check
   * @returns {boolean} Whether pattern is active
   */
  const isPatternActive = (patternType) => {
    return context.dissonancePatterns.some(pattern => 
      pattern.type === patternType
    );
  };
  
  return {
    ...context,
    getOptimizedIntensity,
    calculateSynchronizationScore,
    isPatternActive
  };
};
