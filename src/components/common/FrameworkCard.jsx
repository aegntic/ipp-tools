import React from 'react';

/**
 * Persuasion-Optimized Framework Card Component
 * Designed with psychological triggers, benefit-focused structure,
 * scarcity signals, and optimized visual hierarchy for maximum
 * conversion potential.
 * 
 * @param {Object} props
 * @param {string} props.title - Framework name
 * @param {string} props.description - Framework description
 * @param {Array} props.benefits - List of key benefits
 * @param {number} props.spotsLeft - Number of spots remaining
 * @param {string} props.status - Framework status (ACTIVE, WAITLIST, COMING_SOON)
 * @param {string} props.price - Framework price
 * @param {string} props.estimatedLaunch - When the framework will launch (for upcoming)
 * @param {Function} props.onCtaClick - Function to call when CTA button is clicked
 */
const FrameworkCard = ({
  title,
  description,
  benefits = [],
  spotsLeft = 0,
  status = 'WAITLIST',
  price = '',
  estimatedLaunch = '',
  onCtaClick
}) => {
  // Determine card styling and messaging based on status
  const getStatusInfo = () => {
    switch (status) {
      case 'ACTIVE':
        return {
          badgeText: 'ACTIVE',
          badgeClass: 'badge-active',
          ctaText: 'Access Framework',
          cardClass: 'framework-card-active'
        };
      case 'COMING_SOON':
        return {
          badgeText: 'COMING SOON',
          badgeClass: 'badge-coming-soon',
          ctaText: 'Join Waitlist',
          cardClass: 'framework-card-coming-soon'
        };
      case 'WAITLIST':
      default:
        return {
          badgeText: 'WAITLIST OPEN',
          badgeClass: 'badge-waitlist',
          ctaText: 'Join Waitlist',
          cardClass: 'framework-card-waitlist'
        };
    }
  };

  const { badgeText, badgeClass, ctaText, cardClass } = getStatusInfo();
  
  // Calculate if spots are critically low for enhanced scarcity
  const isCriticallyLow = spotsLeft <= 3 && spotsLeft > 0;

  return (
    <div className={`framework-card ${cardClass}`}>
      <div className={`framework-badge ${badgeClass}`}>{badgeText}</div>
      
      <div className="framework-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      <div className="framework-benefits">
        <ul>
          {benefits.map((benefit, index) => (
            <li key={index}>
              <span className="benefit-icon">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="framework-footer">
        {/* Price Information */}
        {price && (
          <div className="price-container">
            <span className="price">{price}</span>
            {status === 'ACTIVE' && <span className="price-note">one-time payment</span>}
          </div>
        )}
        
        {/* Scarcity Signals */}
        {status !== 'ACTIVE' && estimatedLaunch && (
          <div className="launch-date">
            Expected launch: {estimatedLaunch}
          </div>
        )}
        
        {spotsLeft > 0 && (
          <div className={`scarcity-signal ${isCriticallyLow ? 'critical' : ''}`}>
            <p>Only <span>{spotsLeft}</span> spots left!</p>
          </div>
        )}
        
        {/* Call to Action */}
        <button 
          className={`cta-button ${isCriticallyLow ? 'cta-urgent' : ''}`}
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default FrameworkCard;