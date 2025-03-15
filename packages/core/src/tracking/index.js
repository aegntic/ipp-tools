/**
 * IPP.TOOLS Cross-Domain Attribution System
 * 
 * This module implements a sophisticated tracking system that works across 
 * all IPP.TOOLS domains and subdomains while maintaining user privacy.
 * 
 * Key features:
 * - Cross-domain identity synchronization
 * - Local storage persistence for offline/return visits
 * - Framework-specific attribution
 * - Conversion funnel tracking
 */

class IPPTracker {
  constructor(config = {}) {
    // Configuration with defaults
    this.config = {
      trackingEndpoint: 'https://api.ipp.tools/track',
      cookieDomain: '.ipp.tools',
      cookieName: 'ipp_tracking_id',
      localStorageKey: 'ipp_tracking_data',
      debug: false,
      ...config
    };

    // Initialize tracking ID
    this.trackingId = this.getOrCreateTrackingId();
    
    // Initialize tracking cache
    this.eventCache = this.loadEventCache();
    
    // Track page view on initialization
    this.trackPageView();
    
    // Sync cached events
    this.syncCachedEvents();
    
    // Debug info
    if (this.config.debug) {
      console.log(`[IPPTracker] Initialized with ID: ${this.trackingId}`);
      console.log(`[IPPTracker] Current domain: ${window.location.hostname}`);
    }
  }

  /**
   * Get existing tracking ID from cookie or create new one
   */
  getOrCreateTrackingId() {
    // Try to get from cookie first
    const existingId = this.getCookie(this.config.cookieName);
    
    if (existingId) {
      return existingId;
    }
    
    // Create new ID if none exists
    const newId = this.generateUUID();
    
    // Set as cookie on top-level domain
    this.setCookie(this.config.cookieName, newId, 365, this.config.cookieDomain);
    
    return newId;
  }

  /**
   * Generate a UUID v4
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Get cookie value by name
   */
  getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  /**
   * Set cookie with domain and expiration
   */
  setCookie(name, value, days, domain) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    
    let cookieString = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
    
    if (domain) {
      cookieString += ` domain=${domain};`;
    }
    
    // Use Secure and SameSite attributes in production
    if (window.location.protocol === 'https:') {
      cookieString += ' Secure; SameSite=Lax;';
    }
    
    document.cookie = cookieString;
  }

  /**
   * Load event cache from localStorage
   */
  loadEventCache() {
    try {
      const cached = localStorage.getItem(this.config.localStorageKey);
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      console.error('[IPPTracker] Error loading event cache:', e);
      return [];
    }
  }

  /**
   * Save event cache to localStorage
   */
  saveEventCache() {
    try {
      localStorage.setItem(this.config.localStorageKey, JSON.stringify(this.eventCache));
    } catch (e) {
      console.error('[IPPTracker] Error saving event cache:', e);
    }
  }

  /**
   * Track a specific event
   */
  trackEvent(eventType, eventData = {}) {
    const event = {
      tracking_id: this.trackingId,
      event_type: eventType,
      event_data: {
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        domain: window.location.hostname,
        ...eventData
      },
      queued_at: new Date().toISOString()
    };
    
    // Always cache event first
    this.eventCache.push(event);
    this.saveEventCache();
    
    // Then try to send
    this.sendEvent(event);
    
    if (this.config.debug) {
      console.log(`[IPPTracker] Tracked event: ${eventType}`, eventData);
    }
    
    return event;
  }

  /**
   * Send event to tracking API
   */
  async sendEvent(event) {
    try {
      const response = await fetch(this.config.trackingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event),
        // Used to allow the request to continue even if the page is closed
        keepalive: true
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Remove from cache if successfully sent
      this.eventCache = this.eventCache.filter(e => e !== event);
      this.saveEventCache();
      
      return true;
    } catch (error) {
      console.error('[IPPTracker] Error sending event:', error);
      return false;
    }
  }

  /**
   * Sync cached events (retry sending)
   */
  async syncCachedEvents() {
    if (this.eventCache.length === 0) return;
    
    if (this.config.debug) {
      console.log(`[IPPTracker] Syncing ${this.eventCache.length} cached events`);
    }
    
    // Copy the event cache to prevent mutation during iteration
    const eventsToSync = [...this.eventCache];
    
    for (const event of eventsToSync) {
      await this.sendEvent(event);
    }
  }

  /**
   * Track page view (convenience method)
   */
  trackPageView(additionalData = {}) {
    return this.trackEvent('page_view', additionalData);
  }

  /**
   * Track framework-specific view (convenience method)
   */
  trackFrameworkView(frameworkId, additionalData = {}) {
    return this.trackEvent('framework_view', {
      framework_id: frameworkId,
      ...additionalData
    });
  }

  /**
   * Track waitlist submission (convenience method)
   */
  trackWaitlistSubmission(frameworkId, additionalData = {}) {
    return this.trackEvent('waitlist_submission', {
      framework_id: frameworkId,
      ...additionalData
    });
  }

  /**
   * Track framework subscription (convenience method)
   */
  trackSubscription(frameworkId, plan, additionalData = {}) {
    return this.trackEvent('subscription', {
      framework_id: frameworkId,
      plan,
      ...additionalData
    });
  }
  
  /**
   * Track user engagement (convenience method)
   */
  trackEngagement(engagementType, additionalData = {}) {
    return this.trackEvent('engagement', {
      engagement_type: engagementType,
      ...additionalData
    });
  }
  
  /**
   * Special handling for CascadeVibe.com domain
   * This ensures proper tracking across the standalone domain and ipp.tools ecosystem
   */
  handleCascadeVibeDomain() {
    // Check if we're on cascadevibe.com
    if (window.location.hostname.includes('cascadevibe.com')) {
      // Set additional cookie for cross-domain tracking with standalone domain
      const trackingId = this.getOrCreateTrackingId();
      
      // Set cookie on cascadevibe.com domain (no subdomain)
      this.setCookie(this.config.cookieName, trackingId, 365, 'cascadevibe.com');
      
      if (this.config.debug) {
        console.log(`[IPPTracker] Set tracking cookie for CascadeVibe standalone domain`);
      }
    }
  }
}

// Create and export a global instance
window.ippTracker = new IPPTracker({
  debug: window.location.hostname.includes('localhost') || window.location.hostname.includes('staging')
});

// Special handling for CascadeVibe.com
window.ippTracker.handleCascadeVibeDomain();

// Module exports for direct import
export default window.ippTracker;
