import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { 
  CognitiveDissonanceActivator, 
  IdentityReinforcementTrigger,
  SustainedEngagementLoop,
  AuthorityPositioningTrigger,
  useCognitiveDissonance,
  useIdentityReinforcement,
  trackPsychologicalEvent
} from '@ipp-tools/core';

/**
 * WaitlistForm Component
 * 
 * A conversion-optimized form component that implements multiple
 * psychological triggers for maximum waitlist conversion rates.
 */
const WaitlistForm = ({
  frameworkName,
  onSubmitSuccess,
  className,
  simplified = false,
  conversionIntensity = 'medium',
  ...props
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldFocus, setFieldFocus] = useState(null);
  const formRef = useRef(null);
  
  // Access psychological hooks
  const { cognitiveIntensity, getOptimizedIntensity } = useCognitiveDissonance();
  const { getDominantIdentityType, identityIntensity } = useIdentityReinforcement();
  
  // Track initial form view
  useEffect(() => {
    trackPsychologicalEvent({
      triggerType: 'conversion',
      triggerSubtype: 'waitlist_form',
      intensity: getOptimizedIntensity('conversion'),
      effect: 'form-impression',
      elementId: `waitlist-form-${frameworkName || 'general'}`
    });
  }, [frameworkName, getOptimizedIntensity]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Track form submission attempt
      trackPsychologicalEvent({
        triggerType: 'conversion',
        triggerSubtype: 'waitlist_form',
        intensity: getOptimizedIntensity('conversion'),
        effect: 'form-submission',
        elementId: `waitlist-form-${frameworkName || 'general'}`
      });
      
      // Simulated API call - in real implementation this would connect to backend
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store in localStorage for demonstration
      localStorage.setItem('ipp_waitlist_email', email);
      localStorage.setItem('ipp_waitlist_name', name);
      localStorage.setItem(`ipp_waitlist_${frameworkName || 'general'}`, 'true');
      localStorage.setItem('ipp_email_subscriber', 'true');
      
      // Track successful conversion
      trackPsychologicalEvent({
        triggerType: 'conversion',
        triggerSubtype: 'waitlist_form',
        intensity: getOptimizedIntensity('conversion', 'success'),
        effect: 'form-success',
        elementId: `waitlist-form-${frameworkName || 'general'}`
      });
      
      // Call success callback
      if (onSubmitSuccess) {
        onSubmitSuccess({ name, email, framework: frameworkName });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      
      // Track error
      trackPsychologicalEvent({
        triggerType: 'conversion',
        triggerSubtype: 'waitlist_form',
        intensity: getOptimizedIntensity('conversion', 'error'),
        effect: 'form-error',
        elementId: `waitlist-form-${frameworkName || 'general'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Track field focus for micro-conversions
  const handleFieldFocus = (fieldName) => {
    setFieldFocus(fieldName);
    
    trackPsychologicalEvent({
      triggerType: 'micro_conversion',
      triggerSubtype: 'field_focus',
      intensity: getOptimizedIntensity('micro_conversion'),
      effect: `field-focus-${fieldName}`,
      elementId: `waitlist-form-${frameworkName || 'general'}`
    });
  };
  
  // Get appropriate identity type for reinforcement
  const identityType = getDominantIdentityType();
  
  // Intensity mapping
  const intensityMap = {
    low: 0.4,
    medium: 0.7,
    high: 0.9
  };
  
  // Normalized conversion intensity
  const normalizedIntensity = intensityMap[conversionIntensity] || intensityMap.medium;
  
  return (
    <SustainedEngagementLoop
      type="commitment"
      intensity={conversionIntensity}
      className={`waitlist-form-container ${className || ''}`}
      {...props}
    >
      <form 
        className="waitlist-form" 
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <CognitiveDissonanceActivator 
          type="identity" 
          intensity={conversionIntensity}
        >
          <h2 className="form-title">
            {frameworkName 
              ? `Join the ${frameworkName} Waitlist`
              : 'Join the IPP.TOOLS Priority Waitlist'}
          </h2>
        </CognitiveDissonanceActivator>
        
        <IdentityReinforcementTrigger
          identityType={identityType}
          intensity="medium"
        >
          <p className="form-subtitle">
            {frameworkName 
              ? `Be among the first to access the ${frameworkName} when it launches.`
              : 'Get first access to all new frameworks and exclusive insights.'}
          </p>
        </IdentityReinforcementTrigger>
        
        {!simplified && (
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFieldFocus('name')}
              placeholder="Enter your name"
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email Address <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFieldFocus('email')}
            placeholder="Enter your email"
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <SustainedEngagementLoop 
          type="scarcity"
          intensity={conversionIntensity}
        >
          <button 
            type="submit" 
            className="btn btn-gradient btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? 'Processing...' 
              : simplified 
                ? 'Join Waitlist' 
                : 'Secure Your Priority Access'}
          </button>
        </SustainedEngagementLoop>
        
        <AuthorityPositioningTrigger 
          authorityType="social"
          intensity="low"
        >
          <div className="form-note">
            <i className="fas fa-shield-alt"></i>
            <p>Your information is secure and will never be shared with third parties.</p>
          </div>
        </AuthorityPositioningTrigger>
      </form>
    </SustainedEngagementLoop>
  );
};

WaitlistForm.propTypes = {
  /** Name of the framework for the waitlist */
  frameworkName: PropTypes.string,
  
  /** Callback function on successful submission */
  onSubmitSuccess: PropTypes.func,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Whether to show a simplified version (email-only) */
  simplified: PropTypes.bool,
  
  /** Intensity of conversion triggers */
  conversionIntensity: PropTypes.oneOf(['low', 'medium', 'high'])
};

export default WaitlistForm;