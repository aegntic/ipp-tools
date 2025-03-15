/**
 * IPP.TOOLS Core Psychological Framework
 * 
 * The core psychological engagement patterns that power the IPP.TOOLS
 * ecosystem across all frameworks.
 */

// Psychological Trigger Components
export { default as CognitiveDissonanceActivator } from './triggers/CognitiveDissonanceActivator';
export { default as IdentityReinforcementTrigger } from './triggers/IdentityReinforcementTrigger';
export { default as AuthorityPositioningTrigger } from './triggers/AuthorityPositioningTrigger';
export { default as AlgorithmicResonanceTrigger } from './triggers/AlgorithmicResonanceTrigger';
export { default as SustainedEngagementLoop } from './triggers/SustainedEngagementLoop';

// Context Providers
export { default as CognitiveDissonanceProvider } from './providers/CognitiveDissonanceProvider';
export { default as PsychologicalTriggerProvider } from './providers/PsychologicalTriggerProvider';

// Tracking and Analytics
export { initializeCognitiveTracking } from './tracking/trackingInitializer';
export { trackPsychologicalEvent } from './tracking/eventTracking';
export { identifyVisitorSegment } from './tracking/visitorSegmentation';

// Hooks
export { useCognitiveDissonance } from './hooks/useCognitiveDissonance';
export { usePsychologicalTriggers } from './hooks/usePsychologicalTriggers';
export { useIdentityReinforcement } from './hooks/useIdentityReinforcement';
export { useAuthorityPositioning } from './hooks/useAuthorityPositioning';

// Utilities
export { 
  calculateCognitiveIntensity,
  getOptimalTriggerTiming,
  generatePersonalizedTriggerMatrix,
  buildCrossFrameworkEngagementPath
} from './utils/psychologicalUtils';