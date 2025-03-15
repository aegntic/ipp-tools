import React, { useState, useEffect } from 'react';
import './FrameworkCard.css';

/**
 * FrameworkCard Component
 * 
 * A psychologically-optimized card component for displaying framework information
 * with built-in conversion triggers:
 * 
 * 1. Framework-specific psychological triggers
 * 2. Benefit-focused feature structuring
 * 3. Scarcity signaling with waitlist status
 * 4. Visual hierarchy aligned with conversion objectives
 */
const FrameworkCard = ({ 
  framework = {}, 
  highlighted = false,
  onJoinWaitlist = () => {},
  onLearnMore = () => {},
}) => {
  const [spotsLeft, setSpotsLeft] = useState(getRandomSpots());
  const [isHovered, setIsHovered] = useState(false);
  
  // Default values
  const {
    id = '',
    name = 'Framework',
    description = 'Description of the framework',
    status = 'waitlist', // 'active', 'waitlist', 'free'
    primaryColor = '#5468ff',
    sellingPoints = [],
    price = '',
    expectedLaunch = '',
  } = framework;
  
  // Generate random number of spots between 3-20 based on framework ID
  // This creates a consistent count for the same framework but varies between frameworks
  function getRandomSpots() {
    // Use the first character of the ID as a seed
    const seed = id.charCodeAt(0) || 65;
    return Math.max(3, Math.min(20, seed % 17 + 3));
  }
  
  // Reduce spots occasionally to create urgency
  useEffect(() => {
    if (status === 'waitlist') {
      const interval = setInterval(() => {
        // 30% chance to decrease by 1 every minute
        if (Math.random() > 0.7) {
          setSpotsLeft(prev => Math.max(1, prev - 1));
        }
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [status]);
  
  // Psychological color adjustment - slightly increase saturation on hover
  const getBackgroundStyle = () => {
    if (!isHovered) {
      return { borderColor: primaryColor };
    }
    
    // Increase perceived value with subtle shadow and border effect on hover
    return {
      borderColor: primaryColor,
      boxShadow: `0 8px 30px rgba(${hexToRgb(primaryColor)}, 0.2)`,
      transform: 'translateY(-5px)'
    };
  };
  
  // Helper to convert hex to rgb for shadow effect
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };
  
  // Track framework card view
  useEffect(() => {
    // If tracking is available, log the framework card impression
    if (window.ippTracker) {
      window.ippTracker.trackEvent('framework_card_view', { 
        framework_id: id,
        framework_name: name,
        framework_status: status
      });
    }
  }, [id, name, status]);
  
  return (
    <div 
      className={`framework-card ${highlighted ? 'highlighted' : ''} ${status}`}
      style={getBackgroundStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-framework-id={id}
    >
      {/* Status Badge - Creates exclusivity */}
      <div 
        className="framework-badge"
        style={{ backgroundColor: primaryColor }}
      >
        {status === 'active' ? 'ACTIVE' : 
         status === 'waitlist' ? 'COMING SOON' : 'FREE ACCESS'}
      </div>
      
      <div className="framework-header">
        <h3 className="framework-title">{name}</h3>
        <p className="framework-subtitle">{description}</p>
      </div>
      
      <div className="framework-content">
        {/* Benefit-focused features - Structures value proposition */}
        <ul className="framework-features">
          {sellingPoints.map((point, index) => (
            <li key={index}>
              <i className="feature-check-icon" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        {/* Pricing/Launch Info - Establishes value anchoring */}
        <div className="framework-pricing">
          {status === 'active' && (
            <>
              <div className="price">{price}</div>
              <div className="price-note">one-time payment</div>
            </>
          )}
          
          {status === 'waitlist' && (
            <>
              {expectedLaunch && (
                <div className="launch-date">Expected {expectedLaunch}</div>
              )}
              {price && <div className="price">{price}</div>}
            </>
          )}
        </div>
        
        {/* Scarcity Signal - Creates psychological urgency */}
        {status === 'waitlist' && (
          <div className="scarcity-signal">
            <div className="spots-bar">
              <div 
                className="spots-progress" 
                style={{ 
                  width: `${Math.max(5, Math.min(95, 100 - (spotsLeft / 20) * 100))}%`,
                  backgroundColor: primaryColor
                }}
              />
            </div>
            <p className="spots-text">
              Only <span className="spots-count">{spotsLeft}</span> early access spots remaining
            </p>
          </div>
        )}
        
        {/* Action Button - Direct conversion point */}
        {status === 'active' && (
          <button 
            onClick={() => {
              if (window.ippTracker) {
                window.ippTracker.trackEvent('framework_access_click', { 
                  framework_id: id,
                  framework_name: name
                });
              }
              onLearnMore(id);
            }}
            className="btn btn-primary btn-block"
            style={{ backgroundColor: primaryColor }}
          >
            Access Framework
          </button>
        )}
        
        {status === 'waitlist' && (
          <button 
            onClick={() => {
              if (window.ippTracker) {
                window.ippTracker.trackEvent('waitlist_click', { 
                  framework_id: id,
                  framework_name: name
                });
              }
              onJoinWaitlist(id);
            }}
            className="btn btn-outline btn-block"
            style={{ borderColor: primaryColor, color: primaryColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = primaryColor;
            }}
          >
            Join Waitlist
          </button>
        )}
        
        {status === 'free' && (
          <button 
            onClick={() => {
              if (window.ippTracker) {
                window.ippTracker.trackEvent('free_tool_access_click', { 
                  framework_id: id,
                  framework_name: name
                });
              }
              onLearnMore(id);
            }}
            className="btn btn-outline btn-block"
            style={{ borderColor: primaryColor, color: primaryColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = primaryColor;
            }}
          >
            Access Free Tool
          </button>
        )}
      </div>
      
      {/* Shimmer effect for highlighted card - Creates perceived premium value */}
      {highlighted && (
        <div className="shimmer-effect" aria-hidden="true"></div>
      )}
    </div>
  );
};

export default FrameworkCard;
