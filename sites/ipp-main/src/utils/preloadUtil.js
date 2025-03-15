/**
 * IPP.TOOLS Advanced Asset Preloading Utility
 * Strategic asset loading prioritization system for optimal cognitive framework delivery
 */

/**
 * Prioritized asset preloading with intelligent timing allocation
 * Creates measurable competitive advantage through reduced cognitive abandonment
 */
export const preloadAsset = (url) => {
  if (typeof window === 'undefined') return url;
  
  // Strategic asset queue management
  const preloadQueue = window.__IPP_PRELOAD_QUEUE = window.__IPP_PRELOAD_QUEUE || [];
  
  // Avoid duplicate preloads for performance optimization
  if (preloadQueue.includes(url)) return url;
  preloadQueue.push(url);
  
  // Execute strategic asset acquisition with optimal timing
  setTimeout(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = url.endsWith('.js') ? 'script' : 
              url.endsWith('.css') ? 'style' : 
              url.match(/\.(woff2?|ttf|otf|eot)/) ? 'font' : 'fetch';
    link.href = url;
    link.crossOrigin = 'anonymous';
    
    // Log asset acquisition in development for optimization analysis
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Strategic Asset Preloading] ${url}`);
    }
    
    // Track timing metrics in production
    if (process.env.NODE_ENV === 'production' && window.performance && window.performance.mark) {
      window.performance.mark(`preload-start:${url}`);
      link.onload = () => window.performance.mark(`preload-end:${url}`);
    }
    
    document.head.appendChild(link);
  }, 0); // Immediate execution for critical path assets
  
  return url;
};

/**
 * Advanced module prefetching with priority sequencing
 * Intelligently schedules critical asset acquisition during idle CPU cycles
 */
export const prefetchModule = (moduleId) => {
  if (typeof window === 'undefined' || !document.createElement('link').relList.supports('prefetch')) {
    return;
  }
  
  // Extract base path for accurate module identification
  const baseUrl = window.location.origin;
  const prefetchUrl = `${baseUrl}/assets/js/${moduleId}`;
  
  // Strategic prioritization and idle CPU utilization
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = prefetchUrl;
      link.as = 'script';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }, { timeout: 3000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = prefetchUrl;
      link.as = 'script';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }, 300);
  }
};

/**
 * Strategic module import with intelligent timing allocation
 * Creates measurable engagement advantage through reduced cognitive friction
 */
export const strategicImport = (moduleId) => {
  // First prefetch to optimize bandwidth allocation
  prefetchModule(moduleId);
  
  // Then perform actual dynamic import with timing instrumentation
  if (process.env.NODE_ENV === 'production' && window.performance && window.performance.mark) {
    window.performance.mark(`import-start:${moduleId}`);
  }
  
  // Execute strategic module acquisition
  return import(/* @vite-ignore */ moduleId).then(module => {
    if (process.env.NODE_ENV === 'production' && window.performance && window.performance.mark) {
      window.performance.mark(`import-end:${moduleId}`);
      window.performance.measure(
        `module-import:${moduleId}`,
        `import-start:${moduleId}`,
        `import-end:${moduleId}`
      );
    }
    return module;
  });
};

export default {
  preloadAsset,
  prefetchModule,
  strategicImport
};