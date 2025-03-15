import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { usePsychologicalTriggers } from '../hooks/usePsychologicalTriggers';
import { trackPsychologicalEvent } from '../tracking/eventTracking';

/**
 * SustainedEngagementLoop Component
 * 
 * Creates self-reinforcing psychological loops that maintain 
 * engagement beyond initial exposure, using progressive 
 * engagement patterns.
 * 
 * This is one of the six core psychological triggers used across
 * the IPP.TOOLS framework ecosystem.
 */
const SustainedEngagementLoop = ({
  children,
  type,
  intensity,
  className,
  loopDelay,
  reinforcementInterval,
  trackingId,
  maxLoops = 3,
  ...props
}) => {
  const ref = useRef(null);
  const loopCountRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const { globalIntensity, registerEngagementLoop } = usePsychologicalTriggers();
  
  // Loop types for different psychological patterns
  const loopTypes = {
    scarcity: {
      className: 'scarcity-loop',
      triggerEffect: 'diminishing-availability',
      reinforcementPattern: 'accelerating'
    },
    urgency: {
      className: 'urgency-loop',
      triggerEffect: 'time-pressure',
      reinforcementPattern: 'consistent'
    },
    curiosity: {
      className: 'curiosity-loop',
      triggerEffect: 'information-gap',
      reinforcementPattern: 'expanding'
    },
    reciprocity: {
      className: 'reciprocity-loop',
      triggerEffect: 'value-exchange',
      reinforcementPattern: 'alternating'
    },
    commitment: {
      className: 'commitment-loop',
      triggerEffect: 'consistency-bias',
      reinforcementPattern: 'progressive'
    }
  };
  
  // Map intensity levels to numerical values
  const intensityMap = {
    low: 0.35,
    medium: 0.65,
    high: 0.9
  };
  
  // Get the appropriate loop pattern
  const loopPattern = loopTypes[type] || loopTypes.curiosity;
  
  // Set a normalized intensity based on user preferences and specified level
  const normalizedIntensity = intensityMap[intensity] * (globalIntensity || 0.8);
  
  // Register this engagement loop with the context provider
  useEffect(() => {
    if (type && intensity) {
      registerEngagementLoop({
        type,
        intensity: normalizedIntensity,
        pattern: loopPattern.reinforcementPattern,
        maxLoops,
        elementId: trackingId || `loop-${Math.random().toString(36).substr(2, 9)}`
      });
    }
  }, [type, normalizedIntensity, registerEngagementLoop, loopPattern.reinforcementPattern, maxLoops, trackingId]);
  
  // Track visibility for optimal loop initialization
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);
  
  // Initialize the engagement loop after delay
  useEffect(() => {
    if (isVisible && !hasInitialized) {
      const timer = setTimeout(() => {
        setHasInitialized(true);
        setCurrentLoop(1);
        loopCountRef.current = 1;
        
        // Track the loop initialization
        trackPsychologicalEvent({
          triggerType: 'sustained_engagement',
          triggerSubtype: type,
          intensity: normalizedIntensity,
          effect: `${loopPattern.triggerEffect}-init`,
          elementId: trackingId,
          loopCount: 1
        });
      }, loopDelay || 200);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasInitialized, loopDelay, normalizedIntensity, type, loopPattern.triggerEffect, trackingId]);
  
  // Create the reinforcement loop at specified intervals
  useEffect(() => {
    if (!hasInitialized || currentLoop >= maxLoops) return;
    
    // Calculate the dynamic interval based on the reinforcement pattern
    const getNextInterval = () => {
      const baseInterval = reinforcementInterval || 3000;
      
      switch (loopPattern.reinforcementPattern) {
        case 'accelerating':
          // Intervals get shorter (creates urgency)
          return baseInterval * (1 - (currentLoop / maxLoops) * 0.7);
        case 'expanding':
          // Intervals get longer (builds anticipation)
          return baseInterval * (1 + (currentLoop / maxLoops) * 0.5);
        case 'alternating':
          // Alternates between shorter and longer intervals
          return currentLoop % 2 === 0 
            ? baseInterval * 0.7 
            : baseInterval * 1.3;
        case 'progressive':
          // Gradual reduction in time (builds momentum)
          return baseInterval * (1 - (currentLoop / maxLoops) * 0.4);
        default:
          // Consistent intervals
          return baseInterval;
      }
    };
    
    const interval = getNextInterval();
    
    const timer = setTimeout(() => {
      const nextLoop = currentLoop + 1;
      setCurrentLoop(nextLoop);
      loopCountRef.current = nextLoop;
      
      // Track each loop cycle
      trackPsychologicalEvent({
        triggerType: 'sustained_engagement',
        triggerSubtype: type,
        intensity: normalizedIntensity * (1 + (nextLoop / maxLoops) * 0.2), // Intensity increases with loops
        effect: `${loopPattern.triggerEffect}-reinforce`,
        elementId: trackingId,
        loopCount: nextLoop
      });
    }, interval);
    
    return () => clearTimeout(timer);
  }, [currentLoop, hasInitialized, maxLoops, reinforcementInterval, type, normalizedIntensity, loopPattern, trackingId]);
  
  // Build the class names based on the loop pattern and state
  const getClassNames = () => {
    const baseClasses = [
      'sustained-engagement-loop',
      loopPattern.className,
      `intensity-${intensity || 'medium'}`,
      `loop-${currentLoop}`,
      className || ''
    ];
    
    if (hasInitialized) {
      baseClasses.push('initialized');
    }
    
    if (isVisible) {
      baseClasses.push('visible');
    }
    
    return baseClasses.filter(Boolean).join(' ');
  };
  
  // Calculate animation and style based on loop state
  const getStyle = () => {
    if (!isVisible || !hasInitialized) return {};
    
    // Base styles for the engagement loop
    const style = {
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    };
    
    // Apply different styles based on the loop type and current state
    switch(type) {
      case 'scarcity':
        // Scarcity loops use visual emphasis that increases with each loop
        style.boxShadow = currentLoop > 1 
          ? `0 0 0 ${currentLoop}px rgba(255, 90, 95, ${0.1 * normalizedIntensity})` 
          : 'none';
        style.position = 'relative';
        style.zIndex = '1';
        break;
      case 'urgency':
        // Urgency loops use subtle animation that increases with each loop
        style.transform = currentLoop > 1 
          ? `scale(${1 + (currentLoop * 0.01 * normalizedIntensity)})` 
          : 'scale(1)';
        break;
      case 'curiosity':
        // Curiosity loops use subtle visual cues
        style.position = 'relative';
        break;
      default:
        // Default styling for other loop types
    }
    
    return style;
  };
  
  // Get the data attributes for tracking and debugging
  const getDataAttributes = () => {
    return {
      'data-loop-type': type,
      'data-loop-intensity': normalizedIntensity.toFixed(2),
      'data-loop-count': currentLoop,
      'data-loop-max': maxLoops,
      'data-loop-pattern': loopPattern.reinforcementPattern
    };
  };
  
  return (
    <div
      ref={ref}
      className={getClassNames()}
      style={getStyle()}
      {...getDataAttributes()}
      {...props}
    >
      {children}
    </div>
  );
};

SustainedEngagementLoop.propTypes = {
  /** Content to wrap with the engagement loop effect */
  children: PropTypes.node.isRequired,
  
  /** Type of engagement loop to create */
  type: PropTypes.oneOf([
    'scarcity',
    'urgency',
    'curiosity',
    'reciprocity',
    'commitment'
  ]),
  
  /** Intensity level of the loop effect */
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Delay before initializing the loop (ms) */
  loopDelay: PropTypes.number,
  
  /** Time between loop reinforcements (ms) */
  reinforcementInterval: PropTypes.number,
  
  /** Maximum number of reinforcement loops */
  maxLoops: PropTypes.number,
  
  /** Unique ID for tracking this loop */
  trackingId: PropTypes.string
};

SustainedEngagementLoop.defaultProps = {
  type: 'curiosity',
  intensity: 'medium',
  loopDelay: 200,
  reinforcementInterval: 3000,
  maxLoops: 3
};

export default SustainedEngagementLoop;