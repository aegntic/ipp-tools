import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthorityPositioning } from '../hooks/useAuthorityPositioning';
import { trackPsychologicalEvent } from '../tracking/eventTracking';

/**
 * AuthorityPositioningTrigger Component
 * 
 * Implements evolutionary psychology-based authority positioning
 * strategies that create immediate contextual expertise signals.
 * 
 * This is one of the six core psychological triggers used across
 * the IPP.TOOLS framework ecosystem.
 */
const AuthorityPositioningTrigger = ({
  children,
  intensity,
  authorityType,
  className,
  activationDelay,
  trackingId,
  researchBased = true,
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { authorityIntensity, registerAuthorityPattern } = useAuthorityPositioning();
  
  // Authority types for positioning
  const authorityTypes = {
    research: {
      className: 'research-authority',
      triggerEffect: 'scientific-validation',
      attributes: ['data-driven', 'evidence-based', 'methodological']
    },
    expert: {
      className: 'expert-authority',
      triggerEffect: 'credential-validation',
      attributes: ['specialized', 'experienced', 'credentialed']
    },
    social: {
      className: 'social-authority',
      triggerEffect: 'social-proof',
      attributes: ['proven', 'adopted', 'validated']
    },
    insider: {
      className: 'insider-authority',
      triggerEffect: 'exclusive-knowledge',
      attributes: ['confidential', 'privileged', 'inside']
    },
    results: {
      className: 'results-authority',
      triggerEffect: 'achievement-validation',
      attributes: ['effective', 'measurable', 'proven']
    }
  };
  
  // Map intensity levels to numerical values
  const intensityMap = {
    low: 0.3,
    medium: 0.65,
    high: 0.9
  };
  
  // Get the appropriate authority pattern
  const authorityPattern = authorityTypes[authorityType] || authorityTypes.research;
  
  // Set a normalized intensity based on user preferences and specified level
  const normalizedIntensity = intensityMap[intensity] * (authorityIntensity || 0.75);
  
  // Register this authority pattern with the context provider
  useEffect(() => {
    if (authorityType && intensity) {
      registerAuthorityPattern({
        type: authorityType,
        intensity: normalizedIntensity,
        researchBased,
        attributes: authorityPattern.attributes,
        elementId: trackingId || `authority-${Math.random().toString(36).substr(2, 9)}`
      });
    }
  }, [authorityType, normalizedIntensity, registerAuthorityPattern, researchBased, authorityPattern.attributes, trackingId]);
  
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
  
  // Trigger the authority positioning effect after delay
  useEffect(() => {
    if (isVisible && !hasTriggered) {
      const timer = setTimeout(() => {
        setHasTriggered(true);
        
        // Track the psychological event
        trackPsychologicalEvent({
          triggerType: 'authority_positioning',
          triggerSubtype: authorityType,
          intensity: normalizedIntensity,
          effect: authorityPattern.triggerEffect,
          elementId: trackingId
        });
      }, activationDelay || 120);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasTriggered, activationDelay, normalizedIntensity, authorityType, authorityPattern.triggerEffect, trackingId]);
  
  // Build the class names based on the authority pattern and intensity
  const getClassNames = () => {
    const baseClasses = [
      'authority-positioning-trigger',
      authorityPattern.className,
      `intensity-${intensity || 'medium'}`,
      className || ''
    ];
    
    if (hasTriggered) {
      baseClasses.push('triggered');
    }
    
    if (isVisible) {
      baseClasses.push('visible');
    }
    
    if (researchBased) {
      baseClasses.push('research-based');
    }
    
    return baseClasses.filter(Boolean).join(' ');
  };
  
  // Apply the inline style based on the authority intensity
  const getStyle = () => {
    // Only apply psychological styling if the element is visible
    // and the authority trigger has been activated
    if (!isVisible || !hasTriggered) return {};
    
    // Base styles that subtly enhance the authority effect
    const style = {
      transition: 'all 0.4s ease'
    };
    
    // Apply different styles based on the authority type
    switch(authorityType) {
      case 'research':
        if (normalizedIntensity > 0.7) {
          style.backgroundColor = 'rgba(14, 165, 233, 0.05)';
          style.padding = '0.5rem 1rem';
          style.borderRadius = '0.25rem';
        }
        break;
      case 'expert':
        style.borderBottom = normalizedIntensity > 0.6 ? '1px solid var(--authority-accent, #0ea5e9)' : 'none';
        style.paddingBottom = normalizedIntensity > 0.6 ? '2px' : '0';
        break;
      case 'social':
        // Social proof authority uses subtle visual cues
        style.position = 'relative';
        break;
      case 'results':
        // Results-based authority uses emphasis
        style.fontWeight = normalizedIntensity > 0.5 ? '600' : 'inherit';
        break;
      default:
        // Default styling for other authority types
    }
    
    return style;
  };
  
  // Get the data attributes for tracking and debugging
  const getDataAttributes = () => {
    return {
      'data-authority-type': authorityType,
      'data-authority-intensity': normalizedIntensity.toFixed(2),
      'data-authority-research': researchBased.toString(),
      'data-authority-attributes': authorityPattern.attributes.join(',')
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

AuthorityPositioningTrigger.propTypes = {
  /** Content to wrap with the authority positioning effect */
  children: PropTypes.node.isRequired,
  
  /** Type of authority positioning to apply */
  authorityType: PropTypes.oneOf([
    'research',
    'expert',
    'social',
    'insider',
    'results'
  ]),
  
  /** Intensity level of the authority effect */
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
  
  /** Whether the authority is research-based (more effective) */
  researchBased: PropTypes.bool,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Delay before applying the authority positioning effect (ms) */
  activationDelay: PropTypes.number,
  
  /** Unique ID for tracking this trigger */
  trackingId: PropTypes.string
};

AuthorityPositioningTrigger.defaultProps = {
  authorityType: 'research',
  intensity: 'medium',
  researchBased: true,
  activationDelay: 120
};

export default AuthorityPositioningTrigger;