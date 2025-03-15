/**
 * Components Index
 * 
 * This file exports all components from different modules for easy importing.
 * Components are categorized by their domain/purpose for better organization
 * and dependency management.
 */

// Import all component categories
import * as common from './common';
import * as ipp from './ipp';
import * as visualizations from './visualizations';

// Export everything
export {
  common,
  ipp,
  visualizations
};

// Re-export specific components for direct imports
export { FrameworkCard } from './common';
export { FrameworksSection } from './ipp';

// Default export for easier destructuring
export default {
  common,
  ipp,
  visualizations
};