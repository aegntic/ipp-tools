import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  CognitiveDissonanceActivator, 
  SustainedEngagementLoop,
  trackPsychologicalEvent
} from '@ipp-tools/core';

/**
 * FrameworkCard Component
 * 
 * A high-conversion card component that presents framework information
 * with optimized psychological triggers for maximum engagement.
 */
const FrameworkCard = ({
  framework,
  className,
  expanded = false,
  animationDelay = 0,
  showMetrics = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation entrance effect with progressive reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Track impression
      trackPsychologicalEvent({
        triggerType: 'framework_card',
        triggerSubtype: framework.status.toLowerCase(),
        intensity: 0.7,
        effect: 'card-impression',
        elementId: `framework-card-${framework.name}`
      });
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [animationDelay, framework.name, framework.status]);
  
  // Handle click on card to expand/collapse
  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
    
    // Track interaction
    trackPsychologicalEvent({
      triggerType: 'framework_card',
      triggerSubtype: framework.status.toLowerCase(),
      intensity: 0.8,
      effect: isExpanded ? 'card-collapse' : 'card-expand',
      elementId: `framework-card-${framework.name}`
    });
  };
  
  // Handle mouse enter/leave for hover effects
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Track hover interaction
    trackPsychologicalEvent({
      triggerType: 'micro_conversion',
      triggerSubtype: 'hover',
      intensity: 0.5,
      effect: 'card-hover',
      elementId: `framework-card-${framework.name}`
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Handle CTA click
  const handleCtaClick = (e) => {
    // Prevent card expansion when clicking CTA
    e.stopPropagation();
    
    // Track CTA click
    trackPsychologicalEvent({
      triggerType: 'conversion',
      triggerSubtype: framework.status.toLowerCase(),
      intensity: 0.9,
      effect: 'cta-click',
      elementId: `framework-card-${framework.name}-cta`
    });
  };
  
  // Define color scheme based on framework properties
  const getColorScheme = () => {
    const colorSchemes = {
      primary: {
        badge: 'bg-primary text-white',
        title: 'text-primary-600',
        border: 'border-primary-100',
        hover: 'shadow-primary-100',
        button: 'bg-primary-600 hover:bg-primary-700 text-white',
        outlineButton: 'border-primary-600 text-primary-600 hover:bg-primary-50'
      },
      secondary: {
        badge: 'bg-secondary text-white',
        title: 'text-secondary-600',
        border: 'border-secondary-100',
        hover: 'shadow-secondary-100',
        button: 'bg-secondary-600 hover:bg-secondary-700 text-white',
        outlineButton: 'border-secondary-600 text-secondary-600 hover:bg-secondary-50'
      },
      warning: {
        badge: 'bg-amber-500 text-white',
        title: 'text-amber-600',
        border: 'border-amber-100',
        hover: 'shadow-amber-100',
        button: 'bg-amber-500 hover:bg-amber-600 text-white',
        outlineButton: 'border-amber-500 text-amber-500 hover:bg-amber-50'
      },
      identity: {
        badge: 'bg-orange-500 text-white',
        title: 'text-orange-600',
        border: 'border-orange-100',
        hover: 'shadow-orange-100',
        button: 'bg-orange-500 hover:bg-orange-600 text-white',
        outlineButton: 'border-orange-500 text-orange-500 hover:bg-orange-50'
      },
      authority: {
        badge: 'bg-sky-500 text-white',
        title: 'text-sky-600',
        border: 'border-sky-100',
        hover: 'shadow-sky-100',
        button: 'bg-sky-500 hover:bg-sky-600 text-white',
        outlineButton: 'border-sky-500 text-sky-500 hover:bg-sky-50'
      },
      exclusive: {
        badge: 'bg-purple-500 text-white',
        title: 'text-purple-600',
        border: 'border-purple-100',
        hover: 'shadow-purple-100',
        button: 'bg-purple-500 hover:bg-purple-600 text-white',
        outlineButton: 'border-purple-500 text-purple-500 hover:bg-purple-50'
      }
    };
    
    return colorSchemes[framework.colorScheme] || colorSchemes.primary;
  };
  
  // Get status-specific styling
  const getStatusClasses = () => {
    const statusClasses = {
      'ACTIVE': 'framework-card-active',
      'FREE': 'framework-card-free',
      'WAITLIST': 'framework-card-waitlist'
    };
    
    return statusClasses[framework.status] || '';
  };
  
  // Get status-based button text and URL
  const getCtaConfig = () => {
    switch (framework.status) {
      case 'ACTIVE':
        return {
          text: 'Access Framework',
          url: framework.url || '#',
          variant: 'primary'
        };
      case 'FREE':
        return {
          text: 'Join Waitlist',
          url: `/waitlist/${framework.name.toLowerCase().replace(/\s+/g, '')}`,
          variant: 'outline'
        };
      case 'WAITLIST':
      default:
        return {
          text: 'Join Waitlist',
          url: `/waitlist/${framework.name.toLowerCase().replace(/\s+/g, '')}`,
          variant: 'outline'
        };
    }
  };
  
  const colorScheme = getColorScheme();
  const statusClass = getStatusClasses();
  const ctaConfig = getCtaConfig();
  
  return (
    <SustainedEngagementLoop
      type="curiosity"
      intensity="medium"
    >
      <div 
        className={`
          framework-card 
          ${statusClass} 
          ${colorScheme.border} 
          ${isVisible ? 'visible' : 'invisible opacity-0 translate-y-4'}
          ${isHovered ? `${colorScheme.hover} scale-[1.02] -translate-y-1` : ''}
          ${className || ''}
        `}
        onClick={handleToggleExpand}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: `${animationDelay}ms`
        }}
        {...props}
      >
        {/* Status Badge - Scarcity/Exclusivity Trigger */}
        <div className={`framework-badge ${colorScheme.badge}`}>
          {framework.status}
        </div>
        
        {/* Framework Header - Cognitive Dissonance Trigger */}
        <div className="framework-header">
          <CognitiveDissonanceActivator type="identity" intensity="medium">
            <h3 className={`framework-title ${colorScheme.title}`}>
              {framework.name}
            </h3>
          </CognitiveDissonanceActivator>
          
          <p className="framework-subtitle">
            {framework.description}
          </p>
        </div>
        
        {/* Framework Content */}
        <div className="framework-content">
          {/* Features - Identity Reinforcement through Elite Knowledge */}
          <ul className="framework-features">
            {framework.features.map((feature, index) => (
              <li key={index}>
                <i className="fas fa-check-circle"></i>
                <CognitiveDissonanceActivator 
                  type={index === 0 ? "cognitive" : index === 1 ? "authority" : "identity"}
                  intensity={index === 0 ? "high" : "medium"}
                >
                  <span>{feature}</span>
                </CognitiveDissonanceActivator>
              </li>
            ))}
          </ul>
          
          {/* Pricing - Anchoring Effect */}
          <div className="framework-pricing">
            <div className="price">{framework.price}</div>
            {framework.status === 'FREE' && (
              <div className="price-note">limited functionality</div>
            )}
            {framework.status === 'WAITLIST' && framework.expectedLaunch && (
              <div className="launch-date">Expected {framework.expectedLaunch}</div>
            )}
          </div>
          
          {/* Metrics - Social Proof (Conditionally Rendered) */}
          {showMetrics && framework.metrics && (
            <div className="framework-metrics">
              {framework.metrics.map((metric, index) => (
                <div key={index} className="metric-item">
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* CTA Button - Psychological Triggers in Button Text */}
          <a 
            href={ctaConfig.url}
            className={`btn btn-block ${ctaConfig.variant === 'primary' ? colorScheme.button : colorScheme.outlineButton}`}
            onClick={handleCtaClick}
          >
            {ctaConfig.text}
          </a>
          
          {/* Testimonials - Social Proof (Only When Expanded) */}
          {isExpanded && framework.testimonials && (
            <div className="framework-testimonials">
              {framework.testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-item">
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <div className="testimonial-author">
                    <span className="author-name">{testimonial.name}</span>
                    {testimonial.role && (
                      <span className="author-role">{testimonial.role}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SustainedEngagementLoop>
  );
};

FrameworkCard.propTypes = {
  /** Framework data object */
  framework: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['ACTIVE', 'FREE', 'WAITLIST']).isRequired,
    price: PropTypes.string.isRequired,
    url: PropTypes.string,
    upsellTo: PropTypes.string,
    expectedLaunch: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorScheme: PropTypes.oneOf(['primary', 'secondary', 'warning', 'identity', 'authority', 'exclusive']),
    testimonials: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string,
        quote: PropTypes.string.isRequired
      })
    ),
    metrics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Whether the card starts expanded */
  expanded: PropTypes.bool,
  
  /** Delay before animating in (ms) */
  animationDelay: PropTypes.number,
  
  /** Whether to show metrics */
  showMetrics: PropTypes.bool
};

export default FrameworkCard;