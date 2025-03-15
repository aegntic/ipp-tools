import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useCognitiveDissonance } from '../hooks/useCognitiveDissonance';
import { trackPsychologicalEvent } from '../tracking/eventTracking';

/**
 * CognitiveDissonanceActivator Component
 * 
 * Creates a psychological gap that the brain is compelled to resolve,
 * increasing engagement through cognitive dissonance activation.
 * 
 * This is one of the six core psychological triggers used across
 * the IPP.TOOLS framework ecosystem.
 */
const CognitiveDissonanceActivator = ({
  children,
  type,
  intensity,
  className,
  dissonanceDelay,
  trackingId,
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { cognitiveIntensity, addDissonancePattern } = useCognitiveDissonance();
  
  // Map intensity levels to numerical values
  const intensityMap = {
    low: 0.3,
    medium: 0.6,
    high: 0.9
  };
  
  // Map dissonance types to their psychological patterns
  const dissonanceTypeMap = {
    cognitive: {
      className: 'cognitive-gap',
      triggerEffect: 'gap-creation'
    },
    identity: {
      className: 'identity-conflict',
      triggerEffect: 'identity-challenge'
    },
    authority: {
      className: 'authority-contradiction',
      triggerEffect: 'truth-questioning'
    },
    scarcity: {
      className: 'scarcity-trigger',
      triggerEffect: 'loss-aversion'
    },
    curiosity: {
      className: 'curiosity-gap',
      triggerEffect: 'information-seeking'
    }
  };
  
  // Set a normalized intensity based on user preferences and specified level
  const normalizedIntensity = intensityMap[intensity] * (cognitiveIntensity || 0.7);
  
  // Get the appropriate dissonance pattern
  const dissonancePattern = dissonanceTypeMap[type] || dissonanceTypeMap.cognitive;
  
  // Register this dissonance pattern with the context provider
  useEffect(() => {
    if (type && intensity) {
      addDissonancePattern({
        type,
        intensity: normalizedIntensity,
        elementId: trackingId || `dissonance-${Math.random().toString(36).substr(2, 9)}`
      });
    }
  }, [type, normalizedIntensity, addDissonancePattern, trackingId]);
  
  // Track visibility for optimal trigger timing
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
  
  // Trigger the cognitive dissonance effect after delay
  useEffect(() => {
    if (isVisible && !hasTriggered) {
      const timer = setTimeout(() => {
        setHasTriggered(true);
        
        // Track the psychological event
        trackPsychologicalEvent({
          triggerType: 'cognitive_dissonance',
          triggerSubtype: type,
          intensity: normalizedIntensity,
          effect: dissonancePattern.triggerEffect,
          elementId: trackingId
        });
      }, dissonanceDelay || 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasTriggered, dissonanceDelay, normalizedIntensity, type, dissonancePattern.triggerEffect, trackingId]);
  
  // Build the class names based on the dissonance pattern and intensity
  const getClassNames = () => {
    const baseClasses = [
      'cognitive-dissonance-activator',
      dissonancePattern.className,
      `intensity-${intensity || 'medium'}`,
      `type-${type || 'cognitive'}`,
      className || ''
    ];
    
    if (hasTriggered) {
      baseClasses.push('triggered');
    }
    
    if (isVisible) {
      baseClasses.push('visible');
    }
    
    return baseClasses.filter(Boolean).join(' ');
  };
  
  // Apply the inline style based on the dissonance intensity
  const getStyle = () => {
    // Only apply psychological styling if the element is visible
    // and the dissonance has been triggered
    if (!isVisible || !hasTriggered) return {};
    
    // Base styles that subtly enhance the cognitive effect
    const style = {
      // Subtle transition to enhance the cognitive effect without being distracting
      transition: 'color 0.4s ease, transform 0.4s ease, text-shadow 0.4s ease'
    };
    
    // Apply different styles based on the type of cognitive dissonance
    switch(type) {
      case 'identity':
        // Identity-based triggers use stronger color contrast
        style.color = 'var(--identity-accent, #f59e0b)';
        style.fontWeight = '600';
        break;
      case 'authority':
        // Authority-based triggers use subtle emphasis
        style.color = 'var(--authority-accent, #0ea5e9)';
        style.textShadow = '0 0 1px rgba(14, 165, 233, 0.2)';
        break;
      case 'scarcity':
        // Scarcity triggers create subtle urgency signals
        style.color = 'var(--cognitive-accent, #ff5a5f)';
        break;
      case 'curiosity':
        // Curiosity triggers create a subtle visual "gap"
        style.textDecoration = 'underline';
        style.textDecorationStyle = 'dotted';
        style.textUnderlineOffset = '3px';
        break;
      default:
        // Default cognitive triggers use subtle emphasis
        style.fontWeight = normalizedIntensity > 0.7 ? '600' : 'inherit';
    }
    
    return style;
  };
  
  return (
    <div
      ref={ref}
      className={getClassNames()}
      style={getStyle()}
      data-cognitive-type={type}
      data-cognitive-intensity={normalizedIntensity.toFixed(2)}
      {...props}
    >
      {children}
    </div>
  );
};

CognitiveDissonanceActivator.propTypes = {
  /** Content to wrap with the cognitive dissonance effect */
  children: PropTypes.node.isRequired,
  
  /** Type of cognitive dissonance to create */
  type: PropTypes.oneOf([
    'cognitive',
    'identity',
    'authority',
    'scarcity',
    'curiosity'
  ]),
  
  /** Intensity level of the dissonance effect */
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Delay before applying the dissonance effect (ms) */
  dissonanceDelay: PropTypes.number,
  
  /** Unique ID for tracking this trigger */
  trackingId: PropTypes.string
};

CognitiveDissonanceActivator.defaultProps = {
  type: 'cognitive',
  intensity: 'medium',
  dissonanceDelay: 100
};

export default CognitiveDissonanceActivator;