import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIdentityReinforcement } from '../hooks/useIdentityReinforcement';
import { trackPsychologicalEvent } from '../tracking/eventTracking';

/**
 * IdentityReinforcementTrigger Component
 * 
 * Creates powerful identity-based psychological resonance that activates
 * tribal defense mechanisms and unconscious loyalty.
 * 
 * This is one of the six core psychological triggers used across
 * the IPP.TOOLS framework ecosystem.
 */
const IdentityReinforcementTrigger = ({
  children,
  intensity,
  identityType,
  className,
  activationDelay,
  trackingId,
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { identityIntensity, registerIdentityPattern } = useIdentityReinforcement();
  
  // Identity segments for targeting
  const identityTypes = {
    creator: {
      className: 'creator-identity',
      triggerEffect: 'creator-reinforcement',
      attributes: ['innovative', 'expressive', 'influential']
    },
    marketer: {
      className: 'marketer-identity',
      triggerEffect: 'marketer-reinforcement',
      attributes: ['strategic', 'analytical', 'results-driven']
    },
    entrepreneur: {
      className: 'entrepreneur-identity',
      triggerEffect: 'entrepreneur-reinforcement',
      attributes: ['visionary', 'resourceful', 'ambitious']
    },
    expert: {
      className: 'expert-identity',
      triggerEffect: 'expert-reinforcement',
      attributes: ['knowledgeable', 'authoritative', 'respected']
    },
    insider: {
      className: 'insider-identity',
      triggerEffect: 'insider-reinforcement',
      attributes: ['exclusive', 'informed', 'connected']
    }
  };
  
  // Map intensity levels to numerical values
  const intensityMap = {
    low: 0.3,
    medium: 0.6,
    high: 0.9
  };
  
  // Get the appropriate identity pattern
  const identityPattern = identityTypes[identityType] || identityTypes.creator;
  
  // Set a normalized intensity based on user preferences and specified level
  const normalizedIntensity = intensityMap[intensity] * (identityIntensity || 0.7);
  
  // Register this identity pattern with the context provider
  useEffect(() => {
    if (identityType && intensity) {
      registerIdentityPattern({
        type: identityType,
        intensity: normalizedIntensity,
        attributes: identityPattern.attributes,
        elementId: trackingId || `identity-${Math.random().toString(36).substr(2, 9)}`
      });
    }
  }, [identityType, normalizedIntensity, registerIdentityPattern, identityPattern.attributes, trackingId]);
  
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
  
  // Trigger the identity reinforcement effect after delay
  useEffect(() => {
    if (isVisible && !hasTriggered) {
      const timer = setTimeout(() => {
        setHasTriggered(true);
        
        // Track the psychological event
        trackPsychologicalEvent({
          triggerType: 'identity_reinforcement',
          triggerSubtype: identityType,
          intensity: normalizedIntensity,
          effect: identityPattern.triggerEffect,
          elementId: trackingId
        });
      }, activationDelay || 150);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasTriggered, activationDelay, normalizedIntensity, identityType, identityPattern.triggerEffect, trackingId]);
  
  // Build the class names based on the identity pattern and intensity
  const getClassNames = () => {
    const baseClasses = [
      'identity-reinforcement-trigger',
      identityPattern.className,
      `intensity-${intensity || 'medium'}`,
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
  
  // Apply the inline style based on the identity intensity
  const getStyle = () => {
    // Only apply psychological styling if the element is visible
    // and the identity trigger has been activated
    if (!isVisible || !hasTriggered) return {};
    
    // Base styles that subtly enhance the identity effect
    const style = {
      transition: 'all 0.4s ease'
    };
    
    // Apply different styles based on the identity type
    switch(identityType) {
      case 'creator':
        style.borderLeft = normalizedIntensity > 0.6 ? '2px solid var(--identity-accent, #f59e0b)' : 'none';
        style.paddingLeft = normalizedIntensity > 0.6 ? '10px' : '0';
        break;
      case 'expert':
        style.fontWeight = normalizedIntensity > 0.5 ? '600' : 'inherit';
        break;
      case 'insider':
        style.fontStyle = normalizedIntensity > 0.7 ? 'italic' : 'normal';
        break;
      default:
        // Default styling for other identity types
    }
    
    return style;
  };
  
  // Get the data attributes for tracking and debugging
  const getDataAttributes = () => {
    return {
      'data-identity-type': identityType,
      'data-identity-intensity': normalizedIntensity.toFixed(2),
      'data-identity-attributes': identityPattern.attributes.join(',')
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

IdentityReinforcementTrigger.propTypes = {
  /** Content to wrap with the identity reinforcement effect */
  children: PropTypes.node.isRequired,
  
  /** Type of identity to reinforce */
  identityType: PropTypes.oneOf([
    'creator',
    'marketer',
    'entrepreneur',
    'expert',
    'insider'
  ]),
  
  /** Intensity level of the identity effect */
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Delay before applying the identity reinforcement effect (ms) */
  activationDelay: PropTypes.number,
  
  /** Unique ID for tracking this trigger */
  trackingId: PropTypes.string
};

IdentityReinforcementTrigger.defaultProps = {
  identityType: 'creator',
  intensity: 'medium',
  activationDelay: 150
};

export default IdentityReinforcementTrigger;