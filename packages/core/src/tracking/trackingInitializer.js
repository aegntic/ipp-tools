/**
 * IPP.TOOLS Cognitive Tracking Initializer
 * 
 * Initializes the cross-domain psychological tracking system that
 * measures engagement metrics across all framework implementations.
 */

// Tracking configuration with default values
let trackingConfig = {
  siteId: null,
  trackingDomains: [],
  // Psychological trigger configuration
  cognitiveIdentifiers: true,
  psychologicalTriggers: {
    cognitiveDissonance: true,
    identityReinforcement: true,
    algorithmicResonance: true,
    precisionCommunication: true,
    sustainedEngagement: true,
    authorityPositioning: true
  },
  // Analytics configuration
  trackingEndpoint: 'https://analytics.ipp.tools/collect',
  debugMode: false,
  consentRequired: true,
  // Cross-domain attribution
  crossDomainTracking: true,
  attributionWindow: 30, // days
  // Storage configuration
  storageMethod: 'localStorage',
  storageTTL: 2592000, // 30 days in seconds
};

// Session metrics trackers
const sessionMetrics = {
  startTime: null,
  triggerExposures: 0,
  triggerInteractions: 0,
  engagementDepth: 0,
  maxScrollDepth: 0,
  psychologicalIntensity: 0.5,
  sessionId: null,
  visitorId: null,
  crossDomainEvents: [],
};

/**
 * Generate a pseudorandom visitor ID that persists across sessions
 * but doesn't contain personally identifiable information
 */
const generateVisitorId = () => {
  // Check if ID already exists in storage
  const existingId = localStorage.getItem('ipp_visitor_id');
  if (existingId) return existingId;
  
  // Generate a new ID if none exists
  const newId = 'v' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
  
  // Store the ID for future sessions
  localStorage.setItem('ipp_visitor_id', newId);
  return newId;
};

/**
 * Generate a session ID for the current browsing session
 */
const generateSessionId = () => {
  return 's' + Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

/**
 * Setup cross-domain tracking to measure user journey across frameworks
 */
const setupCrossDomainTracking = () => {
  if (!trackingConfig.crossDomainTracking) return;
  
  // Store domain information
  sessionStorage.setItem('ipp_current_domain', window.location.hostname);
  
  // Read any incoming cross-domain data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('ipp_vid') && urlParams.has('ipp_sid')) {
    sessionMetrics.visitorId = urlParams.get('ipp_vid');
    
    // Record cross-domain transition
    const previousDomain = urlParams.get('ipp_domain');
    if (previousDomain) {
      recordCrossDomainTransition(previousDomain);
    }
  }
  
  // Modify outgoing links to other IPP domains to include tracking IDs
  if (trackingConfig.trackingDomains.length > 0) {
    document.addEventListener('click', handleLinkClicks, true);
  }
};

/**
 * Handle link clicks to add tracking parameters for cross-domain tracking
 */
const handleLinkClicks = (event) => {
  // Check if the click is on a link
  const link = event.target.closest('a');
  if (!link) return;
  
  try {
    // Check if the link points to a tracked domain
    const linkUrl = new URL(link.href);
    const linkDomain = linkUrl.hostname;
    
    if (trackingConfig.trackingDomains.includes(linkDomain)) {
      // Add tracking parameters
      linkUrl.searchParams.set('ipp_vid', sessionMetrics.visitorId);
      linkUrl.searchParams.set('ipp_sid', sessionMetrics.sessionId);
      linkUrl.searchParams.set('ipp_domain', window.location.hostname);
      
      // Update the link with tracking parameters
      link.href = linkUrl.toString();
    }
  } catch (error) {
    // URL parsing failed, ignore
    if (trackingConfig.debugMode) {
      console.warn('IPP Tracking: Failed to parse URL for cross-domain tracking', error);
    }
  }
};

/**
 * Record a cross-domain transition for attribution tracking
 */
const recordCrossDomainTransition = (previousDomain) => {
  const timestamp = Date.now();
  const transitionData = {
    from: previousDomain,
    to: window.location.hostname,
    timestamp,
    path: window.location.pathname
  };
  
  // Add to session metrics
  sessionMetrics.crossDomainEvents.push(transitionData);
  
  // Store in persistent storage for attribution
  try {
    const existingData = JSON.parse(localStorage.getItem('ipp_cross_domain_events') || '[]');
    existingData.push(transitionData);
    
    // Limit to last 50 events to prevent storage bloat
    if (existingData.length > 50) {
      existingData.shift();
    }
    
    localStorage.setItem('ipp_cross_domain_events', JSON.stringify(existingData));
  } catch (error) {
    if (trackingConfig.debugMode) {
      console.warn('IPP Tracking: Failed to store cross-domain event', error);
    }
  }
};

/**
 * Setup scroll depth tracking for engagement measurement
 */
const setupScrollDepthTracking = () => {
  let previousDepth = 0;
  
  // Throttled scroll handler
  let scrollTimeout = null;
  const handleScroll = () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate scroll depth as percentage
      const currentDepth = Math.min(100, Math.round((scrollTop + windowHeight) / documentHeight * 100));
      
      // Update max scroll depth if current depth is greater
      if (currentDepth > sessionMetrics.maxScrollDepth) {
        sessionMetrics.maxScrollDepth = currentDepth;
        
        // Only track depth increases of at least 10%
        if (currentDepth - previousDepth >= 10) {
          previousDepth = currentDepth;
          
          // Update engagement depth based on scroll depth
          updateEngagementDepth(currentDepth);
        }
      }
      
      scrollTimeout = null;
    }, 200);
  };
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });
};

/**
 * Update engagement depth based on scroll depth and other metrics
 */
const updateEngagementDepth = (scrollDepth) => {
  // Basic engagement depth algorithm
  // - 30% from scroll depth
  // - 30% from time spent
  // - 40% from interactions
  
  const timeWeight = 0.3;
  const scrollWeight = 0.3;
  const interactionWeight = 0.4;
  
  // Time component (max out at 5 minutes)
  const sessionTime = (Date.now() - sessionMetrics.startTime) / 1000;
  const timeScore = Math.min(1, sessionTime / 300);
  
  // Scroll component
  const scrollScore = scrollDepth / 100;
  
  // Interaction component (max out at 10 interactions)
  const interactionScore = Math.min(1, sessionMetrics.triggerInteractions / 10);
  
  // Calculate overall engagement
  const engagementScore = 
    (timeScore * timeWeight) + 
    (scrollScore * scrollWeight) + 
    (interactionScore * interactionWeight);
  
  // Update engagement depth (0-100 scale)
  sessionMetrics.engagementDepth = Math.round(engagementScore * 100);
  
  // Debug logging
  if (trackingConfig.debugMode) {
    console.log(`IPP Tracking: Engagement Depth updated to ${sessionMetrics.engagementDepth}`);
    console.log(`- Time: ${sessionTime.toFixed(1)}s (score: ${timeScore.toFixed(2)})}`);
    console.log(`- Scroll: ${scrollDepth}% (score: ${scrollScore.toFixed(2)})`);
    console.log(`- Interactions: ${sessionMetrics.triggerInteractions} (score: ${interactionScore.toFixed(2)})`);
  }
};

/**
 * Track psychological intensity adjustments
 */
const trackIntensityAdjustment = (newIntensity) => {
  sessionMetrics.psychologicalIntensity = newIntensity;
  
  // Persist intensity preference
  localStorage.setItem('ipp_psychological_intensity', newIntensity.toString());
};

/**
 * Initialize cognitive tracking system
 */
export const initializeCognitiveTracking = (config = {}) => {
  // Merge provided config with defaults
  trackingConfig = {
    ...trackingConfig,
    ...config,
    psychologicalTriggers: {
      ...trackingConfig.psychologicalTriggers,
      ...(config.psychologicalTriggers || {})
    }
  };
  
  // Initialize session metrics
  sessionMetrics.startTime = Date.now();
  sessionMetrics.sessionId = generateSessionId();
  sessionMetrics.visitorId = generateVisitorId();
  
  // Load saved psychological intensity
  const savedIntensity = localStorage.getItem('ipp_psychological_intensity');
  if (savedIntensity !== null) {
    sessionMetrics.psychologicalIntensity = parseFloat(savedIntensity);
  }
  
  // Setup cross-domain tracking
  setupCrossDomainTracking();
  
  // Setup scroll depth tracking
  setupScrollDepthTracking();
  
  // Initialize page view tracking
  trackPageView();
  
  // Debug mode logging
  if (trackingConfig.debugMode) {
    console.log('IPP Cognitive Tracking Initialized', {
      visitorId: sessionMetrics.visitorId,
      sessionId: sessionMetrics.sessionId,
      siteId: trackingConfig.siteId,
      psychologicalIntensity: sessionMetrics.psychologicalIntensity
    });
  }
  
  // Return the session data for use in components
  return {
    sessionId: sessionMetrics.sessionId,
    visitorId: sessionMetrics.visitorId,
    psychologicalIntensity: sessionMetrics.psychologicalIntensity,
    trackingConfig
  };
};

/**
 * Track page view with psychological context
 */
const trackPageView = () => {
  // Check for DataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: window.location.pathname,
      psychological_intensity: sessionMetrics.psychologicalIntensity,
      visitor_id: sessionMetrics.visitorId,
      session_id: sessionMetrics.sessionId
    });
  }
  
  // Always implement our own tracking
  const pageViewData = {
    type: 'page_view',
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    referrer: document.referrer,
    psychologicalIntensity: sessionMetrics.psychologicalIntensity,
    timestamp: Date.now(),
    visitorId: sessionMetrics.visitorId,
    sessionId: sessionMetrics.sessionId,
    siteId: trackingConfig.siteId
  };
  
  // Send to tracking endpoint
  sendTrackingData(pageViewData);
};

/**
 * Send tracking data to collection endpoint
 */
const sendTrackingData = (data) => {
  // Skip if consent not given and required
  if (trackingConfig.consentRequired && !hasTrackingConsent()) {
    return;
  }
  
  // Debug mode logging
  if (trackingConfig.debugMode) {
    console.log('IPP Tracking: Sending data', data);
  }
  
  // Skip actual sending in debug mode
  if (trackingConfig.debugMode) {
    return;
  }
  
  // Send tracking data
  try {
    fetch(trackingConfig.trackingEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      // Use keepalive to ensure data is sent even if page is unloading
      keepalive: true
    }).catch(error => {
      // Silently fail - tracking should never break the main app
      console.warn('IPP Tracking: Failed to send tracking data', error);
    });
  } catch (error) {
    // Silently fail
    console.warn('IPP Tracking: Failed to send tracking data', error);
  }
};

/**
 * Check if user has given tracking consent
 */
const hasTrackingConsent = () => {
  // Check for consent cookie or localStorage item
  return localStorage.getItem('ipp_tracking_consent') === 'true';
};

/**
 * Export key metrics tracking functions
 */
export const trackingSystem = {
  recordTriggerExposure: () => {
    sessionMetrics.triggerExposures++;
  },
  recordTriggerInteraction: () => {
    sessionMetrics.triggerInteractions++;
  },
  updatePsychologicalIntensity: (intensity) => {
    trackIntensityAdjustment(intensity);
  },
  getSessionMetrics: () => ({...sessionMetrics}),
  getTrackingConfig: () => ({...trackingConfig}),
};