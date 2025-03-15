import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/main.scss';

// Initialize cognitive tracking system with optimized loading
import { initializeCognitiveTracking } from '@ipp-tools/core';
import { prefetchModule } from './utils/preloadUtil';

// Critical path optimization: Preload high-value engagement modules during idle CPU cycles
if (typeof window !== 'undefined') {
  // Mark the entry point performance for conversion optimization analysis
  if (window.performance && window.performance.mark) {
    window.performance.mark('app-init-start');
  }
  
  // Strategic module preloading for engagement acceleration
  const criticalModules = [
    'page-home',
    'page-frameworks',
    'ui-components',
    'core-framework'
  ];
  
  // Execute preloading with priority sequencing
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      criticalModules.forEach(module => prefetchModule(module));
    }, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      criticalModules.forEach(module => prefetchModule(module));
    }, 200);
  }
  
  // Add performance observer for strategic optimization
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics in development for optimization analysis
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
      }
    });
    observer.observe({ entryTypes: ['measure'] });
  }
}

// Initialize cognitive tracking with optimized configuration
initializeCognitiveTracking({
  siteId: 'ipp-main',
  trackingDomains: ['ipp.tools', 'vibecascade.ipp.tools'],
  cognitiveIdentifiers: true,
  psychologicalTriggers: {
    cognitiveDissonance: true,
    identityReinforcement: true,
    algorithmicResonance: true,
    precisionCommunication: true,
    sustainedEngagement: true,
    authorityPositioning: true
  },
  // Enable high-performance mode for optimal trigger delivery
  performance: {
    highPriority: true,
    triggerDeliveryOptimization: true,
    batchedEventProcessing: true
  }
});

// Create application root with performance tracking
const appRoot = ReactDOM.createRoot(document.getElementById('root'));

// Render application with performance measurement
appRoot.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Measure total initialization time
if (typeof window !== 'undefined' && window.performance && window.performance.mark) {
  window.performance.mark('app-init-end');
  window.performance.measure('app-initialization', 'app-init-start', 'app-init-end');
}