/**
 * IPP.TOOLS Cross-Domain Attribution Architecture
 * 
 * This system enables precise attribution tracking across all platform frameworks
 * through a combination of shared cookies, local storage persistence, and server-side
 * event aggregation. The implementation maintains user journey continuity across
 * multiple domains while preserving attribution data integrity.
 */

const TRACKING_SERVER = process.env.VITE_API_URL || 'https://api.ipp.tools';
const TRACKING_ENDPOINT = `${TRACKING_SERVER}/v1/track`;
const COOKIE_NAME = 'ipp_tracking_id';
const COOKIE_DOMAIN = '.ipp.tools';
const LOCAL_STORAGE_KEY = 'ipp_tracking_events';

// Initialize tracking system
export const initializeTracking = () => {
  // Get or generate tracking ID
  let trackingId = getCookie(COOKIE_NAME);
  if (!trackingId) {
    trackingId = generateUniqueId();
    setCookie(COOKIE_NAME, trackingId, 365);
    
    // Store first touchpoint data
    trackEvent('first_visit', {
      referrer: document.referrer,
      landing_page: window.location.href,
      utm_source: getUrlParam('utm_source'),
      utm_medium: getUrlParam('utm_medium'),
      utm_campaign: getUrlParam('utm_campaign')
    });
  }
  
  // Track page view on initialization
  trackEvent('page_view', {
    page_url: window.location.href,
    page_title: document.title
  });
  
  // Attempt to sync any cached events
  syncCachedEvents();
  
  return trackingId;
};

/**
 * Track an event with the attribution system
 * 
 * @param {string} eventType - Type of event (e.g., 'page_view', 'click', 'form_submit')
 * @param {object} eventData - Additional data for the event
 * @param {boolean} immediate - Whether to send immediately or batch
 */
export const trackEvent = (eventType, eventData = {}, immediate = true) => {
  const trackingId = getCookie(COOKIE_NAME) || generateUniqueId();
  
  // Create event payload
  const payload = {
    tracking_id: trackingId,
    event_type: eventType,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    framework: getCurrentFramework(),
    page_url: window.location.href,
    ...eventData
  };
  
  // Store event locally as backup
  storeEventLocally(payload);
  
  // Send to server if immediate
  if (immediate) {
    sendEventToServer(payload);
  }
  
  return payload;
};

/**
 * Track a framework-specific event
 * 
 * @param {string} framework - Framework identifier (e.g., 'vibecascade')
 * @param {string} eventType - Type of event
 * @param {object} eventData - Additional data
 */
export const trackFrameworkEvent = (framework, eventType, eventData = {}) => {
  return trackEvent(eventType, {
    ...eventData,
    framework
  });
};

/**
 * Track a conversion event with monetary value
 * 
 * @param {string} conversionType - Type of conversion (e.g., 'purchase', 'signup')
 * @param {object} conversionData - Conversion details
 */
export const trackConversion = (conversionType, conversionData = {}) => {
  return trackEvent('conversion', {
    conversion_type: conversionType,
    ...conversionData
  });
};

/**
 * Track a waitlist signup event
 * 
 * @param {string} framework - Framework the user signed up for
 * @param {string} email - User's email (hashed for privacy)
 */
export const trackWaitlistSignup = (framework, email) => {
  // Hash email for privacy before sending
  const hashedEmail = hashString(email);
  
  return trackEvent('waitlist_signup', {
    framework,
    email_hash: hashedEmail,
    signup_page: window.location.href
  });
};

/**
 * Track user engagement with a specific framework
 * 
 * @param {string} framework - Framework identifier
 * @param {string} engagementType - Type of engagement
 * @param {object} engagementData - Additional data
 */
export const trackFrameworkEngagement = (framework, engagementType, engagementData = {}) => {
  return trackEvent('framework_engagement', {
    framework,
    engagement_type: engagementType,
    ...engagementData
  });
};

// Helper: Send event to tracking server
const sendEventToServer = (payload) => {
  fetch(TRACKING_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.VITE_API_KEY || ''
    },
    body: JSON.stringify(payload)
  })
  .catch(error => {
    console.error('Tracking failed, event cached locally:', error);
    // Already stored locally, so no additional action needed
  });
};

// Helper: Store event in local storage
const storeEventLocally = (event) => {
  try {
    let events = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    events.push(event);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to store event locally:', error);
  }
};

// Helper: Sync cached events with server
const syncCachedEvents = () => {
  try {
    const events = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    if (events.length === 0) return;
    
    // Send events in batches
    const batchSize = 10;
    for (let i = 0; i < events.length; i += batchSize) {
      const batch = events.slice(i, i + batchSize);
      
      fetch(`${TRACKING_ENDPOINT}/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.VITE_API_KEY || ''
        },
        body: JSON.stringify({ events: batch })
      })
      .then(response => {
        if (response.ok) {
          // Remove successfully sent events
          const remainingEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
            .filter(e => !batch.some(b => 
              b.tracking_id === e.tracking_id && 
              b.timestamp === e.timestamp && 
              b.event_type === e.event_type
            ));
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remainingEvents));
        }
      })
      .catch(() => {
        // Keep events in storage if failed to send
      });
    }
  } catch (error) {
    console.error('Failed to sync cached events:', error);
  }
};

// Helper: Get cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Helper: Set cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; domain=${COOKIE_DOMAIN}; SameSite=Lax`;
};

// Helper: Generate unique ID
const generateUniqueId = () => {
  return 'ipp_' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

// Helper: Get session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('ipp_session_id');
  if (!sessionId) {
    sessionId = generateUniqueId();
    sessionStorage.setItem('ipp_session_id', sessionId);
  }
  return sessionId;
};

// Helper: Get current framework from URL or data attribute
const getCurrentFramework = () => {
  // Check for hostname-based framework
  const hostname = window.location.hostname;
  if (hostname.startsWith('vibecascade.')) return 'vibecascade';
  if (hostname.startsWith('neuralnarrative.')) return 'neuralnarrative';
  if (hostname.startsWith('primalposition.')) return 'primalposition';
  if (hostname.startsWith('quantumconversion.')) return 'quantumconversion';
  
  // Check for data attribute on body
  const framework = document.body.getAttribute('data-framework');
  if (framework) return framework;
  
  // Default to main hub
  return 'ipp-hub';
};

// Helper: Get URL parameter
const getUrlParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

// Helper: Simple hash function for email privacy
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

// Export a ready-to-use tracking instance
export default {
  initialize: initializeTracking,
  trackEvent,
  trackFrameworkEvent,
  trackConversion,
  trackWaitlistSignup,
  trackFrameworkEngagement
};