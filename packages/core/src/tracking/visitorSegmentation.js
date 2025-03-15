/**
 * IPP.TOOLS Visitor Segmentation System
 * 
 * Creates and manages psychographically segmented audience groups
 * for optimized trigger deployment and personalization.
 */

// Segmentation configuration
const segmentationConfig = {
  enableBehavioralSegmentation: true,
  enableDemographicSegmentation: false, // No PII collection
  enablePsychographicSegmentation: true,
  minDataPointsForSegmentation: 3,
  segmentRefreshInterval: 86400000, // 24 hours in ms
  storageKey: 'ipp_visitor_segments'
};

// Psychological segment definitions
const psychographicSegments = {
  // Primary cognitive processing style segments
  cognitiveStyle: {
    analytical: {
      triggers: ['research', 'expert', 'results'],
      contentPreference: 'detailed',
      psychologicalTraits: ['methodical', 'logical', 'evidence-driven']
    },
    intuitive: {
      triggers: ['identity', 'social', 'emotional'],
      contentPreference: 'narrative',
      psychologicalTraits: ['holistic', 'pattern-seeking', 'story-driven']
    },
    pragmatic: {
      triggers: ['results', 'scarcity', 'authority'],
      contentPreference: 'actionable',
      psychologicalTraits: ['practical', 'efficiency-focused', 'outcome-oriented']
    }
  },
  
  // Primary motivation segments
  motivationDrivers: {
    achievement: {
      triggers: ['results', 'authority', 'competition'],
      contentPreference: 'metrics-focused',
      psychologicalTraits: ['goal-oriented', 'status-conscious', 'success-driven']
    },
    belonging: {
      triggers: ['identity', 'social', 'community'],
      contentPreference: 'community-focused',
      psychologicalTraits: ['connection-seeking', 'relationship-oriented', 'consensus-driven']
    },
    autonomy: {
      triggers: ['curiosity', 'exclusivity', 'mastery'],
      contentPreference: 'exploratory',
      psychologicalTraits: ['independence-seeking', 'self-directed', 'freedom-oriented']
    }
  },
  
  // Decision-making style segments
  decisionStyle: {
    deliberate: {
      triggers: ['research', 'expert', 'results'],
      contentPreference: 'comprehensive',
      psychologicalTraits: ['thorough', 'risk-averse', 'detail-oriented']
    },
    spontaneous: {
      triggers: ['urgency', 'scarcity', 'emotion'],
      contentPreference: 'concise',
      psychologicalTraits: ['impulsive', 'opportunity-focused', 'risk-tolerant']
    },
    collaborative: {
      triggers: ['social', 'community', 'consensus'],
      contentPreference: 'testimonial-rich',
      psychologicalTraits: ['advice-seeking', 'validation-oriented', 'socially-influenced']
    }
  }
};

// Behavioral segment definitions  
const behavioralSegments = {
  // Engagement level segments
  engagementLevel: {
    lurker: {
      thresholds: { 
        interactions: [0, 1], 
        scrollDepth: [0, 30], 
        averageTimeOnPage: [0, 30]
      },
      recommendedTriggers: ['curiosity', 'scarcity'],
      intensityMultiplier: 0.7
    },
    casual: {
      thresholds: { 
        interactions: [2, 5], 
        scrollDepth: [31, 70], 
        averageTimeOnPage: [31, 120]
      },
      recommendedTriggers: ['identity', 'reciprocity'],
      intensityMultiplier: 0.9
    },
    engaged: {
      thresholds: { 
        interactions: [6, 20], 
        scrollDepth: [71, 90], 
        averageTimeOnPage: [121, 300]
      },
      recommendedTriggers: ['authority', 'commitment'],
      intensityMultiplier: 1.0
    },
    super: {
      thresholds: { 
        interactions: [21, Infinity], 
        scrollDepth: [91, 100], 
        averageTimeOnPage: [301, Infinity]
      },
      recommendedTriggers: ['identity', 'exclusivity'],
      intensityMultiplier: 1.2
    }
  },
  
  // Visit frequency segments
  visitFrequency: {
    new: {
      thresholds: { visitCount: [1, 1] },
      recommendedTriggers: ['curiosity', 'reciprocity'],
      intensityMultiplier: 0.8
    },
    returning: {
      thresholds: { visitCount: [2, 5] },
      recommendedTriggers: ['identity', 'commitment'],
      intensityMultiplier: 1.0
    },
    frequent: {
      thresholds: { visitCount: [6, 20] },
      recommendedTriggers: ['authority', 'exclusivity'],
      intensityMultiplier: 1.1
    },
    loyal: {
      thresholds: { visitCount: [21, Infinity] },
      recommendedTriggers: ['insider', 'exclusivity'],
      intensityMultiplier: 1.2
    }
  },
  
  // Conversion proximity segments
  conversionProximity: {
    cold: {
      signals: ['first visit', 'low engagement', 'no framework views'],
      recommendedTriggers: ['curiosity', 'cognitive dissonance'],
      intensityMultiplier: 0.7
    },
    warming: {
      signals: ['framework page views', 'moderate engagement', 'email subscription'],
      recommendedTriggers: ['identity', 'authority'],
      intensityMultiplier: 0.9
    },
    hot: {
      signals: ['pricing page views', 'high engagement', 'cart interaction'],
      recommendedTriggers: ['scarcity', 'urgency'],
      intensityMultiplier: 1.1
    },
    converted: {
      signals: ['purchase completed', 'login activity', 'member area access'],
      recommendedTriggers: ['identity', 'exclusivity'],
      intensityMultiplier: 1.0
    }
  }
};

// Local state for visitor segmentation
let visitorSegments = {
  psychographic: {},
  behavioral: {},
  confidenceScores: {},
  lastUpdated: null,
  dataPoints: 0
};

/**
 * Initialize visitor segmentation system
 */
export const initializeVisitorSegmentation = () => {
  // Try to load existing segments from storage
  loadSegmentsFromStorage();
  
  // Check if segments need updating
  const now = Date.now();
  const needsRefresh = !visitorSegments.lastUpdated || 
    (now - visitorSegments.lastUpdated > segmentationConfig.segmentRefreshInterval);
  
  if (needsRefresh) {
    // Refresh segmentation
    updateVisitorSegments();
  }
};

/**
 * Load visitor segments from localStorage if available
 */
const loadSegmentsFromStorage = () => {
  try {
    const storedSegments = localStorage.getItem(segmentationConfig.storageKey);
    
    if (storedSegments) {
      visitorSegments = JSON.parse(storedSegments);
    }
  } catch (error) {
    // Fail silently and use default empty segments
    console.warn('Failed to load visitor segments from storage', error);
  }
};

/**
 * Save visitor segments to localStorage
 */
const saveSegmentsToStorage = () => {
  try {
    localStorage.setItem(segmentationConfig.storageKey, JSON.stringify(visitorSegments));
  } catch (error) {
    // Fail silently
    console.warn('Failed to save visitor segments to storage', error);
  }
};

/**
 * Update visitor segments based on behavior and interaction data
 */
export const updateVisitorSegments = () => {
  // Get behavioral data
  const behavioralData = collectBehavioralData();
  
  // Skip if not enough data points
  if (behavioralData.dataPoints < segmentationConfig.minDataPointsForSegmentation) {
    return;
  }
  
  // Perform segmentation
  if (segmentationConfig.enableBehavioralSegmentation) {
    updateBehavioralSegments(behavioralData);
  }
  
  if (segmentationConfig.enablePsychographicSegmentation) {
    updatePsychographicSegments(behavioralData);
  }
  
  // Update metadata
  visitorSegments.lastUpdated = Date.now();
  visitorSegments.dataPoints = behavioralData.dataPoints;
  
  // Save updated segments
  saveSegmentsToStorage();
  
  // Update DataLayer with segmentation info
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'visitor_segmentation_updated',
      visitor_segments: getSegmentNames()
    });
  }
  
  return visitorSegments;
};

/**
 * Collect behavioral data for segmentation
 */
const collectBehavioralData = () => {
  // Page view and visit data
  const visitCount = parseInt(localStorage.getItem('ipp_visit_count') || '0', 10) + 1;
  localStorage.setItem('ipp_visit_count', visitCount.toString());
  
  // Get cross-domain activity
  let crossDomainVisits = 0;
  try {
    const crossDomainEvents = JSON.parse(localStorage.getItem('ipp_cross_domain_events') || '[]');
    crossDomainVisits = crossDomainEvents.length;
  } catch (error) {
    // Ignore parsing errors
  }
  
  // Page view tracking
  const pageViews = {
    total: visitCount,
    framework: localStorage.getItem('ipp_framework_views') || 0,
    pricing: localStorage.getItem('ipp_pricing_views') || 0,
    waitlist: localStorage.getItem('ipp_waitlist_views') || 0
  };
  
  // Psychological response data
  const psychologicalResponses = {
    // Collect top trigger responses from localStorage if available
    topTriggers: JSON.parse(localStorage.getItem('ipp_top_triggers') || '{}'),
    preferredIntensity: parseFloat(localStorage.getItem('ipp_psychological_intensity') || '0.5')
  };
  
  // Interaction metrics
  const interactionMetrics = {
    clickRate: parseFloat(localStorage.getItem('ipp_click_rate') || '0'),
    scrollDepth: parseFloat(localStorage.getItem('ipp_max_scroll_depth') || '0'),
    averageTimeOnPage: parseFloat(localStorage.getItem('ipp_avg_time_on_page') || '0')
  };
  
  // Count data points for confidence calculation
  const dataPoints = Object.keys(pageViews).length + 
    Object.keys(psychologicalResponses.topTriggers).length + 
    Object.keys(interactionMetrics).length;
  
  return {
    visitCount,
    crossDomainVisits,
    pageViews,
    psychologicalResponses,
    interactionMetrics,
    dataPoints
  };
};

/**
 * Update behavioral segments based on user behavior
 */
const updateBehavioralSegments = (behavioralData) => {
  const segments = {};
  const confidence = {};
  
  // Determine engagement level segment
  const engagementScore = calculateEngagementScore(behavioralData);
  segments.engagementLevel = determineSegmentByThresholds(
    engagementScore,
    behavioralSegments.engagementLevel
  );
  confidence.engagementLevel = calculateConfidenceScore(behavioralData, 'engagement');
  
  // Determine visit frequency segment
  segments.visitFrequency = determineSegmentByThresholds(
    { visitCount: behavioralData.visitCount },
    behavioralSegments.visitFrequency
  );
  confidence.visitFrequency = calculateConfidenceScore(behavioralData, 'visits');
  
  // Determine conversion proximity
  segments.conversionProximity = determineConversionProximity(behavioralData);
  confidence.conversionProximity = calculateConfidenceScore(behavioralData, 'conversion');
  
  // Update visitor segments
  visitorSegments.behavioral = segments;
  visitorSegments.confidenceScores = {
    ...visitorSegments.confidenceScores,
    ...confidence
  };
};

/**
 * Update psychographic segments based on psychological responses
 */
const updatePsychographicSegments = (behavioralData) => {
  const segments = {};
  const confidence = {};
  
  // Extract psychological response data
  const { topTriggers, preferredIntensity } = behavioralData.psychologicalResponses;
  
  // Determine cognitive style based on trigger responses
  segments.cognitiveStyle = determinePsychographicSegment(
    topTriggers,
    psychographicSegments.cognitiveStyle
  );
  confidence.cognitiveStyle = calculateConfidenceScore(behavioralData, 'cognitive');
  
  // Determine motivation drivers based on trigger responses
  segments.motivationDrivers = determinePsychographicSegment(
    topTriggers,
    psychographicSegments.motivationDrivers
  );
  confidence.motivationDrivers = calculateConfidenceScore(behavioralData, 'motivation');
  
  // Determine decision style based on behavior and triggers
  segments.decisionStyle = determinePsychographicSegment(
    topTriggers,
    psychographicSegments.decisionStyle
  );
  confidence.decisionStyle = calculateConfidenceScore(behavioralData, 'decision');
  
  // Update visitor segments
  visitorSegments.psychographic = segments;
  visitorSegments.confidenceScores = {
    ...visitorSegments.confidenceScores,
    ...confidence
  };
};

/**
 * Calculate engagement score from behavioral data
 */
const calculateEngagementScore = (behavioralData) => {
  return {
    interactions: behavioralData.interactionMetrics.clickRate * 10, // Scale to reasonable range
    scrollDepth: behavioralData.interactionMetrics.scrollDepth,
    averageTimeOnPage: behavioralData.interactionMetrics.averageTimeOnPage
  };
};

/**
 * Determine segment by thresholds
 */
const determineSegmentByThresholds = (metrics, segmentDefinitions) => {
  // Get all available segments
  const segmentNames = Object.keys(segmentDefinitions);
  
  // Find matching segment
  for (const segmentName of segmentNames) {
    const segment = segmentDefinitions[segmentName];
    let matches = true;
    
    // Check all thresholds
    for (const [metric, [min, max]] of Object.entries(segment.thresholds)) {
      const value = metrics[metric];
      
      if (value < min || value > max) {
        matches = false;
        break;
      }
    }
    
    if (matches) {
      return segmentName;
    }
  }
  
  // Default to first segment if no match
  return segmentNames[0];
};

/**
 * Determine psychographic segment based on trigger responses
 */
const determinePsychographicSegment = (triggerResponses, segmentDefinitions) => {
  // Get trigger types sorted by response strength
  const sortedTriggers = Object.entries(triggerResponses)
    .sort(([, a], [, b]) => b - a)
    .map(([trigger]) => trigger);
  
  // If no trigger data, return default
  if (sortedTriggers.length === 0) {
    return Object.keys(segmentDefinitions)[0];
  }
  
  // Score each segment based on trigger alignment
  const segmentScores = {};
  
  for (const [segmentName, segment] of Object.entries(segmentDefinitions)) {
    segmentScores[segmentName] = 0;
    
    // Score based on trigger preferences
    for (let i = 0; i < sortedTriggers.length; i++) {
      const trigger = sortedTriggers[i];
      const position = i + 1; // 1-indexed position
      const weight = 1 / position; // Weigh early triggers more heavily
      
      if (segment.triggers.includes(trigger)) {
        segmentScores[segmentName] += weight;
      }
    }
  }
  
  // Find highest scoring segment
  let highestScore = 0;
  let topSegment = Object.keys(segmentDefinitions)[0];
  
  for (const [segmentName, score] of Object.entries(segmentScores)) {
    if (score > highestScore) {
      highestScore = score;
      topSegment = segmentName;
    }
  }
  
  return topSegment;
};

/**
 * Determine conversion proximity based on behavioral signals
 */
const determineConversionProximity = (behavioralData) => {
  // Simple signal matching algorithm
  let signalMatches = {
    cold: 0,
    warming: 0,
    hot: 0,
    converted: 0
  };
  
  // Check for cold signals
  if (behavioralData.visitCount === 1) signalMatches.cold++;
  if (behavioralData.interactionMetrics.scrollDepth < 30) signalMatches.cold++;
  if (behavioralData.pageViews.framework === 0) signalMatches.cold++;
  
  // Check for warming signals
  if (behavioralData.pageViews.framework > 0) signalMatches.warming++;
  if (behavioralData.interactionMetrics.scrollDepth >= 30 && 
      behavioralData.interactionMetrics.scrollDepth < 70) signalMatches.warming++;
  if (localStorage.getItem('ipp_email_subscriber') === 'true') signalMatches.warming++;
  
  // Check for hot signals
  if (behavioralData.pageViews.pricing > 0) signalMatches.hot++;
  if (behavioralData.interactionMetrics.scrollDepth >= 70) signalMatches.hot++;
  if (localStorage.getItem('ipp_cart_interaction') === 'true') signalMatches.hot++;
  
  // Check for converted signals
  if (localStorage.getItem('ipp_customer') === 'true') signalMatches.converted++;
  if (localStorage.getItem('ipp_logged_in') === 'true') signalMatches.converted++;
  if (localStorage.getItem('ipp_member_access') === 'true') signalMatches.converted++;
  
  // Find segment with most matches
  let topSegment = 'cold';
  let maxMatches = 0;
  
  for (const [segment, matches] of Object.entries(signalMatches)) {
    if (matches > maxMatches) {
      maxMatches = matches;
      topSegment = segment;
    }
  }
  
  return topSegment;
};

/**
 * Calculate confidence score for a segment determination
 */
const calculateConfidenceScore = (behavioralData, segmentType) => {
  // Base confidence on data points and validity
  let baseConfidence = 0.5; // Start at 50%
  
  // Adjust for data points - more data = higher confidence
  const dataPointsScore = Math.min(0.3, behavioralData.dataPoints / 30);
  baseConfidence += dataPointsScore;
  
  // Segment-specific confidence adjustments
  switch (segmentType) {
    case 'engagement':
      // More interaction data = higher confidence
      baseConfidence += Math.min(0.2, behavioralData.interactionMetrics.clickRate / 10);
      break;
    case 'visits':
      // More visits = higher confidence
      baseConfidence += Math.min(0.2, behavioralData.visitCount / 20);
      break;
    case 'conversion':
      // View of key pages = higher confidence
      if (behavioralData.pageViews.pricing > 0) baseConfidence += 0.1;
      if (behavioralData.pageViews.framework > 0) baseConfidence += 0.1;
      break;
    default:
      // Default small bonus
      baseConfidence += 0.05;
  }
  
  // Cap at 0.95 maximum confidence
  return Math.min(0.95, baseConfidence).toFixed(2);
};

/**
 * Get simplified list of segment names for targeting
 */
export const getSegmentNames = () => {
  const segments = [];
  
  // Add behavioral segments
  for (const [category, segment] of Object.entries(visitorSegments.behavioral)) {
    segments.push(`${category}:${segment}`);
  }
  
  // Add psychographic segments
  for (const [category, segment] of Object.entries(visitorSegments.psychographic)) {
    segments.push(`${category}:${segment}`);
  }
  
  return segments;
};

/**
 * Get recommended triggers for this visitor based on segments
 */
export const getRecommendedTriggers = () => {
  const recommendations = {
    primary: [],
    secondary: [],
    avoid: [],
    intensityMultiplier: 1.0
  };
  
  // Get behavioral segment recommendations if available
  if (visitorSegments.behavioral.engagementLevel) {
    const engagementSegment = behavioralSegments.engagementLevel[visitorSegments.behavioral.engagementLevel];
    recommendations.primary.push(...engagementSegment.recommendedTriggers);
    recommendations.intensityMultiplier *= engagementSegment.intensityMultiplier;
  }
  
  if (visitorSegments.behavioral.conversionProximity) {
    const proximitySegment = behavioralSegments.conversionProximity[visitorSegments.behavioral.conversionProximity];
    recommendations.primary.push(...proximitySegment.recommendedTriggers);
    recommendations.intensityMultiplier *= proximitySegment.intensityMultiplier;
  }
  
  // Get psychographic segment recommendations if available
  if (visitorSegments.psychographic.cognitiveStyle) {
    const cognitiveSegment = psychographicSegments.cognitiveStyle[visitorSegments.psychographic.cognitiveStyle];
    recommendations.secondary.push(...cognitiveSegment.triggers);
  }
  
  if (visitorSegments.psychographic.motivationDrivers) {
    const motivationSegment = psychographicSegments.motivationDrivers[visitorSegments.psychographic.motivationDrivers];
    recommendations.secondary.push(...motivationSegment.triggers);
  }
  
  // Calculate triggers to avoid (those not in primary or secondary)
  const allPossibleTriggers = [
    'cognitive', 'identity', 'authority', 'social', 
    'scarcity', 'urgency', 'curiosity', 'reciprocity', 
    'commitment', 'exclusivity', 'research', 'results'
  ];
  
  recommendations.avoid = allPossibleTriggers.filter(trigger => 
    !recommendations.primary.includes(trigger) && 
    !recommendations.secondary.includes(trigger)
  );
  
  // Remove duplicates
  recommendations.primary = [...new Set(recommendations.primary)];
  recommendations.secondary = [...new Set(recommendations.secondary)];
  recommendations.avoid = [...new Set(recommendations.avoid)];
  
  return recommendations;
};

/**
 * Get visitor's optimal content preferences based on segments
 */
export const getContentPreferences = () => {
  const preferences = {
    contentTypes: [],
    formatPreferences: {},
    confidenceScore: 0
  };
  
  // Add content preferences from cognitive style
  if (visitorSegments.psychographic.cognitiveStyle) {
    const cognitiveSegment = psychographicSegments.cognitiveStyle[visitorSegments.psychographic.cognitiveStyle];
    preferences.contentTypes.push(cognitiveSegment.contentPreference);
    
    // Set format preferences based on cognitive style
    switch (visitorSegments.psychographic.cognitiveStyle) {
      case 'analytical':
        preferences.formatPreferences.detail = 'high';
        preferences.formatPreferences.organization = 'structured';
        preferences.formatPreferences.dataVisualization = 'charts';
        break;
      case 'intuitive':
        preferences.formatPreferences.detail = 'medium';
        preferences.formatPreferences.organization = 'narrative';
        preferences.formatPreferences.dataVisualization = 'infographics';
        break;
      case 'pragmatic':
        preferences.formatPreferences.detail = 'low';
        preferences.formatPreferences.organization = 'actionable';
        preferences.formatPreferences.dataVisualization = 'dashboards';
        break;
    }
    
    // Add confidence score
    preferences.confidenceScore = 
      parseFloat(visitorSegments.confidenceScores.cognitiveStyle || 0.5);
  }
  
  // Add content preferences from motivation drivers
  if (visitorSegments.psychographic.motivationDrivers) {
    const motivationSegment = psychographicSegments.motivationDrivers[visitorSegments.psychographic.motivationDrivers];
    preferences.contentTypes.push(motivationSegment.contentPreference);
    
    // Update confidence score (average with existing)
    preferences.confidenceScore = (preferences.confidenceScore + 
      parseFloat(visitorSegments.confidenceScores.motivationDrivers || 0.5)) / 2;
  }
  
  return preferences;
};

/**
 * Export visitor identification and segmentation utilities
 */
export const identifyVisitorSegment = {
  initialize: initializeVisitorSegmentation,
  updateSegments: updateVisitorSegments,
  getSegments: () => ({...visitorSegments}),
  getSegmentNames,
  getRecommendedTriggers,
  getContentPreferences
};