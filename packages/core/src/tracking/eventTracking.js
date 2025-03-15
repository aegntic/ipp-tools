/**
 * IPP.TOOLS Psychological Event Tracking
 * 
 * Tracks psychological events and user interactions to measure
 * the effectiveness of engagement triggers.
 */

import { trackingSystem } from './trackingInitializer';

// Local tracking storage to prevent duplicate events
const trackingCache = {
  exposures: new Set(),
  interactions: new Set(),
  lastEvents: []
};

// Maximum number of events to track in history (for patterns)
const MAX_EVENT_HISTORY = 50;

/**
 * Track a psychological event triggered by any component
 * 
 * @param {Object} eventData - Data describing the psychological event
 * @param {string} eventData.triggerType - Type of psychological trigger (e.g., 'cognitive_dissonance')
 * @param {string} eventData.triggerSubtype - Subtype of the trigger (e.g., 'curiosity')
 * @param {number} eventData.intensity - Normalized intensity value (0-1)
 * @param {string} eventData.effect - Specific effect being triggered (e.g., 'information-gap')
 * @param {string} [eventData.elementId] - Optional unique identifier for the triggering element
 * @param {number} [eventData.loopCount] - For sustained engagement loops, the current loop count
 * @param {Object} [eventData.metadata] - Additional metadata about the event
 */
export const trackPsychologicalEvent = (eventData) => {
  // Create unique identifier for this event to prevent duplicates
  const eventId = generateEventId(eventData);
  
  // If we've already tracked this exact event, skip it
  if (trackingCache.exposures.has(eventId)) {
    return;
  }
  
  // Mark event as tracked
  trackingCache.exposures.add(eventId);
  
  // Record the event in our history
  recordEventInHistory(eventData);
  
  // Increment trigger exposure count
  trackingSystem.recordTriggerExposure();
  
  // Prepare tracking data
  const trackingData = {
    type: 'psychological_trigger',
    triggerType: eventData.triggerType,
    triggerSubtype: eventData.triggerSubtype,
    intensity: eventData.intensity,
    effect: eventData.effect,
    timestamp: Date.now(),
    loopCount: eventData.loopCount || null,
    elementId: eventData.elementId || null,
    url: window.location.href,
    path: window.location.pathname,
    sessionMetrics: trackingSystem.getSessionMetrics(),
    metadata: eventData.metadata || {}
  };
  
  // Send to DataLayer if available
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'psychological_trigger',
      trigger_type: eventData.triggerType,
      trigger_subtype: eventData.triggerSubtype,
      intensity: eventData.intensity,
      effect: eventData.effect
    });
  }
  
  // Add event listener to track interaction (if not already added)
  if (eventData.elementId && !trackingCache.interactions.has(eventData.elementId)) {
    trackingCache.interactions.add(eventData.elementId);
    
    // Try to find the element by ID or data attribute
    const element = 
      document.getElementById(eventData.elementId) || 
      document.querySelector(`[data-trigger-id="${eventData.elementId}"]`);
    
    if (element) {
      // Add interaction tracking
      element.addEventListener('click', () => {
        trackInteractionWithTrigger(eventData);
      });
    }
  }
  
  return trackingData;
};

/**
 * Track user interaction with a psychological trigger
 * 
 * @param {Object} eventData - The original event data for the trigger
 */
export const trackInteractionWithTrigger = (eventData) => {
  // Create interaction event ID
  const interactionId = generateEventId({...eventData, interaction: true});
  
  // If we've already tracked this interaction, skip it
  if (trackingCache.interactions.has(interactionId)) {
    return;
  }
  
  // Mark interaction as tracked
  trackingCache.interactions.add(interactionId);
  
  // Increment trigger interaction count
  trackingSystem.recordTriggerInteraction();
  
  // Prepare tracking data
  const trackingData = {
    type: 'psychological_interaction',
    triggerType: eventData.triggerType,
    triggerSubtype: eventData.triggerSubtype,
    intensity: eventData.intensity,
    effect: eventData.effect,
    timestamp: Date.now(),
    elementId: eventData.elementId || null,
    url: window.location.href,
    path: window.location.pathname,
    timeFromExposure: eventData.timestamp 
      ? Date.now() - eventData.timestamp 
      : null,
    sessionMetrics: trackingSystem.getSessionMetrics()
  };
  
  // Send to DataLayer if available
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'psychological_interaction',
      trigger_type: eventData.triggerType,
      trigger_subtype: eventData.triggerSubtype,
      intensity: eventData.intensity,
      effect: eventData.effect
    });
  }
  
  return trackingData;
};

/**
 * Generate a unique ID for a psychological event
 * 
 * @param {Object} eventData - The event data
 * @return {string} A unique identifier for the event
 */
const generateEventId = (eventData) => {
  const baseId = [
    eventData.triggerType,
    eventData.triggerSubtype,
    eventData.effect,
    eventData.elementId || '',
    eventData.interaction ? 'interaction' : 'exposure'
  ].join('|');
  
  return baseId;
};

/**
 * Record event in history for pattern analysis
 * 
 * @param {Object} eventData - The event data to record
 */
const recordEventInHistory = (eventData) => {
  // Add timestamp to event data
  const eventWithTimestamp = {
    ...eventData,
    timestamp: Date.now()
  };
  
  // Add to event history
  trackingCache.lastEvents.push(eventWithTimestamp);
  
  // Trim history if it exceeds maximum length
  if (trackingCache.lastEvents.length > MAX_EVENT_HISTORY) {
    trackingCache.lastEvents.shift();
  }
};

/**
 * Get session-level psychological pattern metrics
 * 
 * @return {Object} Pattern metrics for the current session
 */
export const getPsychologicalPatternMetrics = () => {
  const events = trackingCache.lastEvents;
  
  // Skip if not enough events to analyze
  if (events.length < 5) {
    return {
      dominantTriggerType: null,
      triggerDiversity: 0,
      patternComplexity: 0,
      patternVelocity: 0,
      effectivenessScore: 0
    };
  }
  
  // Count trigger types
  const triggerTypeCounts = events.reduce((counts, event) => {
    const key = event.triggerType;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
  
  // Find dominant trigger type
  let dominantTriggerType = null;
  let maxCount = 0;
  
  Object.entries(triggerTypeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantTriggerType = type;
    }
  });
  
  // Calculate trigger diversity (0-1)
  const uniqueTriggers = Object.keys(triggerTypeCounts).length;
  const maxPossibleTriggers = 6; // We have 6 trigger types
  const triggerDiversity = uniqueTriggers / maxPossibleTriggers;
  
  // Calculate pattern complexity (based on transitions between different triggers)
  let transitions = 0;
  for (let i = 1; i < events.length; i++) {
    if (events[i].triggerType !== events[i - 1].triggerType) {
      transitions++;
    }
  }
  const patternComplexity = transitions / (events.length - 1);
  
  // Calculate pattern velocity (average time between triggers)
  let totalTimeBetween = 0;
  let timeComparisons = 0;
  
  for (let i = 1; i < events.length; i++) {
    const timeDiff = events[i].timestamp - events[i - 1].timestamp;
    totalTimeBetween += timeDiff;
    timeComparisons++;
  }
  
  const avgTimeBetween = timeComparisons > 0 ? totalTimeBetween / timeComparisons : 0;
  const patternVelocity = avgTimeBetween > 0 ? 10000 / avgTimeBetween : 0; // Normalized velocity (higher is faster)
  
  // Calculate estimated effectiveness score
  // This is a proprietary formula based on our psychological research
  const diversityWeight = 0.3;
  const complexityWeight = 0.4;
  const velocityWeight = 0.3;
  
  const normalizedVelocity = Math.min(1, patternVelocity / 5); // Cap at 5 (one trigger every 2 seconds)
  
  const effectivenessScore = 
    (triggerDiversity * diversityWeight) + 
    (patternComplexity * complexityWeight) + 
    (normalizedVelocity * velocityWeight);
  
  return {
    dominantTriggerType,
    triggerDiversity: parseFloat(triggerDiversity.toFixed(2)),
    patternComplexity: parseFloat(patternComplexity.toFixed(2)),
    patternVelocity: parseFloat(normalizedVelocity.toFixed(2)),
    effectivenessScore: parseFloat(effectivenessScore.toFixed(2)),
    triggerCounts: triggerTypeCounts,
    totalTriggers: events.length
  };
};

/**
 * Clear tracking history while preserving configuration
 */
export const clearTrackingHistory = () => {
  trackingCache.exposures.clear();
  trackingCache.interactions.clear();
  trackingCache.lastEvents = [];
};

/**
 * Export tracking utilities
 */
export const trackingUtils = {
  getEventHistory: () => [...trackingCache.lastEvents],
  getPatternMetrics: getPsychologicalPatternMetrics,
  clearHistory: clearTrackingHistory
};