import React, { useState, useEffect } from 'react';
import tracking from '../../utils/tracking';

const WaitlistForm = ({ frameworkName = '', frameworkDescription = '', estimatedLaunch = '' }) => {
  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Psychological trigger states
  const [signupCount, setSignupCount] = useState(1234);
  const [countdown, setCountdown] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [spotsLeft, setSpotsLeft] = useState(Math.floor(Math.random() * 16) + 5);

  // Dynamic social proof simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSignupCount(prevCount => prevCount + Math.floor(Math.random() * 5) + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newSeconds = prev.seconds - 1;
        
        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1;
          
          if (newMinutes < 0) {
            const newHours = prev.hours - 1;
            
            if (newHours < 0) {
              clearInterval(timer);
              return { hours: 0, minutes: 0, seconds: 0 };
            }
            
            return { hours: newHours, minutes: 59, seconds: 59 };
          }
          
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        
        return { ...prev, seconds: newSeconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // View tracking on component mount
  useEffect(() => {
    // Track form view with framework context
    tracking.trackEvent('waitlist_view', {
      framework: frameworkName || 'main',
      spots_left: spotsLeft,
    });
  }, [frameworkName, spotsLeft]);

  // Form submission handler with psychological feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Track conversion with framework context
    tracking.trackWaitlistSignup(
      frameworkName || 'main',
      email
    );
    
    // Additional tracking with rich metadata
    tracking.trackConversion('waitlist_signup', {
      framework: frameworkName || 'main',
      spots_remaining: spotsLeft - 1,
      time_on_page: Math.floor((new Date() - window.performance.timeOrigin) / 1000),
    });
    
    setSubmitted(true);
    setSpotsLeft(prev => Math.max(1, prev - 1));
  };

  return (
    <section className="waitlist-section">
      <div className="container">
        {!submitted ? (
          <>
            <h1>{frameworkName ? `Join the ${frameworkName} Waitlist` : 'Join Our Waitlist'}</h1>
            <p>{frameworkDescription || 'Be the first to experience our revolutionary frameworks. Limited spots available!'}</p>
            
            {/* Social Proof */}
            <div className="social-proof">
              <p><span id="signup-count">{signupCount.toLocaleString()}</span> people have joined in the last 24 hours</p>
            </div>
            
            {/* Scarcity */}
            <div className="scarcity">
              <p>Hurry! Offer ends in <span id="countdown">
                {`${countdown.hours.toString().padStart(2, '0')}:${countdown.minutes.toString().padStart(2, '0')}:${countdown.seconds.toString().padStart(2, '0')}`}
              </span></p>
              <p>Only <span className="spots-count">{spotsLeft}</span> spots left!</p>
              
              {estimatedLaunch && (
                <p>Expected launch: {estimatedLaunch}</p>
              )}
            </div>
            
            {/* Form */}
            <form id="waitlist-form" onSubmit={handleSubmit}>
              <input 
                type="text"
                name="name"
                placeholder="Your name (optional)"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  // Track form interaction
                  if (e.target.value.length === 1) {
                    tracking.trackEvent('form_interaction', {
                      field: 'name',
                      framework: frameworkName || 'main'
                    });
                  }
                }}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email to join" 
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  // Track form interaction
                  if (e.target.value.length === 1) {
                    tracking.trackEvent('form_interaction', {
                      field: 'email',
                      framework: frameworkName || 'main'
                    });
                  }
                }}
                required 
              />
              <button 
                type="submit"
                onClick={() => {
                  // Track button click before form submission
                  tracking.trackEvent('submit_button_click', {
                    framework: frameworkName || 'main'
                  });
                }}
              >
                Join Waitlist
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div id="success-state">
            <h2>Thank You!</h2>
            <p>You've secured your spot on the {frameworkName || 'IPP.TOOLS'} waitlist!</p>
            <p>We'll email you with next steps soon.</p>
            
            <div className="next-steps">
              <h3>What happens next:</h3>
              <ol>
                <li>Check your email for confirmation</li>
                <li>You'll receive early-access notification before public launch</li>
                <li>Priority access to the framework with special founding member benefits</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WaitlistForm;