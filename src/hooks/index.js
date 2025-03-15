/**
 * Psychological Engagement Hooks Index
 * 
 * This file centralizes all psychological engagement hooks for easy importing.
 * Each hook implements a specific cognitive or psychological framework for
 * maximizing engagement, conversion, and retention.
 * 
 * These hooks are designed to be composable and can be combined for
 * multi-dimensional psychological effects.
 */

import useCognitiveDissonance from './useCognitiveDissonance';
import useIdentityReinforcement from './useIdentityReinforcement';

// Export all hooks
export {
  useCognitiveDissonance,
  useIdentityReinforcement
};

// Export hook constants
export { default as IDENTITY_PATTERNS } from './useIdentityReinforcement';

// Default export for easier destructuring
export default {
  useCognitiveDissonance,
  useIdentityReinforcement
};