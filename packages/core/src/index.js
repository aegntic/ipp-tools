/**
 * IPP.TOOLS Core Package
 * This package provides core functionality for the IPP.TOOLS ecosystem.
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Cognitive Tracking System
export const initializeCognitiveTracking = (config = {}) => {
  console.log('Initializing cognitive tracking with config:', config);
  
  // Store configuration
  window.ippTools = window.ippTools || {};
  window.ippTools.cognitiveTracking = config;
  
  // Initialize visitor ID if not exists
  if (!localStorage.getItem('ipp_visitor_id')) {
    const visitorId = generateRandomId();
    localStorage.setItem('ipp_visitor_id', visitorId);
  }
  
  // Track initialization
  trackEvent('cognitive_tracking_initialized', {
    siteId: config.siteId,
    visitorId: localStorage.getItem('ipp_visitor_id'),
    timestamp: new Date().toISOString()
  });
  
  return {
    trackEvent,
    trackPageView,
    trackConversion
  };
};

// Event Tracking
export const trackEvent = (eventName, eventData = {}) => {
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[IPP.TOOLS Tracking] ${eventName}`, eventData);
  }
  
  // Send to tracking endpoint in production
  if (process.env.NODE_ENV === 'production' && window.ippTools?.cognitiveTracking?.trackingEnabled) {
    try {
      const trackerEndpoint = 'https://tracking.ipp.tools/event';
      const payload = {
        event: eventName,
        data: eventData,
        visitorId: localStorage.getItem('ipp_visitor_id'),
        timestamp: new Date().toISOString(),
        siteId: window.ippTools?.cognitiveTracking?.siteId || 'unknown'
      };
      
      // Using beacon API for performance if available
      if (navigator.sendBeacon) {
        navigator.sendBeacon(trackerEndpoint, JSON.stringify(payload));
      } else {
        // Fallback to fetch
        fetch(trackerEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(e => console.error('Tracking error:', e));
      }
    } catch (e) {
      // Silent fail in production
      if (process.env.NODE_ENV !== 'production') {
        console.error('Tracking error:', e);
      }
    }
  }
};

// Page View Tracking
export const trackPageView = (pathname, pageData = {}) => {
  trackEvent('page_view', {
    pathname,
    referrer: document.referrer,
    ...pageData
  });
};

// Conversion Tracking
export const trackConversion = (conversionType, conversionData = {}) => {
  trackEvent('conversion', {
    type: conversionType,
    ...conversionData
  });
};

// Utility function to generate random ID
const generateRandomId = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Cognitive Dissonance Context
const CognitiveDissonanceContext = createContext({
  activeTriggers: {},
  activateTrigger: () => {},
  deactivateTrigger: () => {}
});

// Cognitive Dissonance Provider
export const CognitiveDissonanceProvider = ({ children }) => {
  const [activeTriggers, setActiveTriggers] = useState({
    cognitiveDissonance: false,
    identityReinforcement: false,
    algorithmicResonance: false,
    precisionCommunication: false,
    sustainedEngagement: false,
    authorityPositioning: false
  });
  
  const activateTrigger = (triggerName, intensity = 'medium') => {
    setActiveTriggers(prev => ({
      ...prev,
      [triggerName]: { active: true, intensity }
    }));
    
    trackEvent('trigger_activated', {
      trigger: triggerName,
      intensity
    });
  };
  
  const deactivateTrigger = (triggerName) => {
    setActiveTriggers(prev => ({
      ...prev,
      [triggerName]: false
    }));
    
    trackEvent('trigger_deactivated', {
      trigger: triggerName
    });
  };
  
  return (
    <CognitiveDissonanceContext.Provider value={{
      activeTriggers,
      activateTrigger,
      deactivateTrigger
    }}>
      {children}
    </CognitiveDissonanceContext.Provider>
  );
};

// Cognitive Dissonance Hook
export const useCognitiveDissonance = () => {
  const context = useContext(CognitiveDissonanceContext);
  
  if (!context) {
    throw new Error('useCognitiveDissonance must be used within a CognitiveDissonanceProvider');
  }
  
  return context;
};

// Export all components
export default {
  initializeCognitiveTracking,
  trackEvent,
  trackPageView,
  trackConversion,
  CognitiveDissonanceProvider,
  useCognitiveDissonance
};
