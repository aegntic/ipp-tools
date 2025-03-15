import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCognitiveDissonance } from '@ipp-tools/core';

// Framework configuration data - in a real app, this would come from an API or context
const frameworkConfig = {
  neuralnarrative: {
    name: 'NeuralNarrative',
    description: 'Craft stories that bypass conscious filtering and speak directly to the limbic system',
    estimatedLaunch: 'Q3 2025',
    price: '$1,997'
  },
  primalposition: {
    name: 'PrimalPositioning',
    description: 'Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms',
    estimatedLaunch: 'Q2 2025',
    price: '$1,497'
  },
  quantumconversion: {
    name: 'QuantumConversion',
    description: 'Multi-dimensional conversion frameworks that work across all psychological profiles',
    estimatedLaunch: 'Q3 2025',
    price: '$2,497'
  },
  algodecoder: {
    name: 'AlgoDecoder',
    description: 'Decode the exact psychological patterns each social algorithm rewards',
    type: 'free',
    upsellFramework: 'cascadevibe'
  },
  neurocopy: {
    name: 'NeuroCopy',
    description: 'Test your copy against the 17 neurological triggers that drive action',
    type: 'free',
    upsellFramework: 'quantumconversion'
  },
  identitymapper: {
    name: 'IdentityMapper',
    description: 'Map the exact identity triggers that activate tribal responses in your audience',
    type: 'free',
    upsellFramework: 'primalposition'
  },
  default: {
    name: 'IPP.TOOLS Framework Access',
    description: 'Get priority access to our advanced psychological frameworks that are changing how elite creators approach digital growth.'
  }
};

const WaitlistPage = () => {
  const { framework } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState({
    days: 14,
    hours: 7,
    minutes: 32,
    seconds: 11
  });
  const [spotsLeft, setSpotsLeft] = useState(getRandomSpots());
  const [recentSignups, setRecentSignups] = useState([]);
  
  const { activateTrigger } = useCognitiveDissonance();
  const frameworkData = framework ? frameworkConfig[framework] || frameworkConfig.default : frameworkConfig.default;
  
  // Generate random number of spots between 5-20
  function getRandomSpots() {
    return Math.floor(Math.random() * 16) + 5;
  }
  
  // Countdown timer
  useEffect(() => {
    // Activate psychological triggers
    activateTrigger('scarcity', 'high');
    activateTrigger('socialProof', 'medium');
    activateTrigger('authorityPositioning', 'medium');
    
    // Track page view
    if (window.ippTools?.trackPageView) {
      window.ippTools.trackPageView(`/waitlist/${framework || ''}`, {
        framework: framework || 'general',
        frameworkName: frameworkData.name
      });
    }
    
    // Set up countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newSeconds = prev.seconds - 1;
        
        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1;
          
          if (newMinutes < 0) {
            const newHours = prev.hours - 1;
            
            if (newHours < 0) {
              const newDays = prev.days - 1;
              
              if (newDays < 0) {
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
              
              return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
            }
            
            return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
          }
          
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        
        return { ...prev, seconds: newSeconds };
      });
    }, 1000);
    
    // Simulated recent signups data
    const fakeNames = [
      'Michael J.',
      'Sarah T.',
      'Alex R.',
      'Emma L.',
      'David K.',
      'Jessica M.',
      'Ryan P.',
      'Olivia S.',
      'Daniel W.',
      'Sophia G.',
      'James H.',
      'Ava B.',
      'Benjamin F.',
      'Mia C.',
      'Ethan N.'
    ];
    
    const locations = [
      'New York',
      'San Francisco',
      'London',
      'Toronto',
      'Sydney',
      'Berlin',
      'Tokyo',
      'Paris',
      'Austin',
      'Chicago'
    ];
    
    // Generate initial signups
    const initialSignups = Array(5).fill().map(() => ({
      name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      time: Math.floor(Math.random() * 30) + 1
    }));
    
    setRecentSignups(initialSignups);
    
    // Add new random signups occasionally
    const signupInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const newSignup = {
          name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          time: 'just now'
        };
        
        setRecentSignups(prev => [newSignup, ...prev.slice(0, 4)]);
        
        // Random chance to decrease available spots
        if (Math.random() > 0.7) {
          setSpotsLeft(prev => Math.max(1, prev - 1));
        }
      }
    }, 25000);
    
    return () => {
      clearInterval(timer);
      clearInterval(signupInterval);
    };
  }, [framework, frameworkData.name, activateTrigger]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Track conversion
    if (window.ippTools?.trackConversion) {
      window.ippTools.trackConversion('waitlist_signup', {
        framework: framework || 'general',
        frameworkName: frameworkData.name,
        email: email,
        name: name
      });
    }
    
    // Set success state
    setSubmitted(true);
    setError('');
    setSpotsLeft(prev => Math.max(1, prev - 1));
  };
  
  return (
    <div className="waitlist-page">
      <div className="container">
        <div className="waitlist-content">
          {!submitted ? (
            <>
              <div className="waitlist-intro">
                <h1 className="waitlist-title">
                  {frameworkData.name || 'Join the IPP.TOOLS Waitlist'}
                </h1>
                
                <p className="waitlist-description">
                  {frameworkData.description}
                </p>
                
                <div className="waitlist-details">
                  <div className="waitlist-spots">
                    <div className="spots-indicator">
                      <div className="spots-count">{spotsLeft}</div>
                    </div>
                    <p>Priority spots remaining</p>
                  </div>
                  
                  {frameworkData.estimatedLaunch && (
                    <div className="waitlist-timeline">
                      <div className="timeline-indicator">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <p>Expected launch: {frameworkData.estimatedLaunch}</p>
                    </div>
                  )}
                </div>
                
                <div className="countdown-container">
                  <p className="countdown-label">Waitlist closing in:</p>
                  <div className="countdown-timer">
                    <div className="countdown-item">
                      <div className="countdown-value">{countdown.days}</div>
                      <div className="countdown-unit">Days</div>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-value">{countdown.hours}</div>
                      <div className="countdown-unit">Hours</div>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-value">{countdown.minutes}</div>
                      <div className="countdown-unit">Minutes</div>
                    </div>
                    <div className="countdown-item">
                      <div className="countdown-value">{countdown.seconds}</div>
                      <div className="countdown-unit">Seconds</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="waitlist-form-container">
                <form className="waitlist-form" onSubmit={handleSubmit}>
                  <h2 className="form-title">Reserve Your Spot</h2>
                  
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  {error && <div className="error-message">{error}</div>}
                  
                  <button type="submit" className="btn btn-gradient btn-lg btn-block">
                    Get Priority Access
                  </button>
                  
                  <div className="form-note">
                    <i className="fas fa-shield-alt"></i>
                    <p>Your information is secure and will never be shared with third parties.</p>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="success-container">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              
              <h2 className="success-title">You're on the List!</h2>
              
              <p className="success-message">
                Thanks for joining, {name || 'there'}! We've saved your spot on the waitlist. You'll be among the first to know when we launch.
              </p>
              
              <div className="next-steps">
                <h3>What happens next:</h3>
                
                <ul className="steps-list">
                  <li>
                    <div className="step-number">1</div>
                    <p>Check your email for confirmation</p>
                  </li>
                  <li>
                    <div className="step-number">2</div>
                    <p>You'll receive early-access notification before public launch</p>
                  </li>
                  <li>
                    <div className="step-number">3</div>
                    <p>Priority access to the framework with special founding member benefits</p>
                  </li>
                </ul>
              </div>
              
              <Link to="/" className="btn btn-outline btn-lg">
                Back to IPP.TOOLS
              </Link>
            </div>
          )}
        </div>
        
        <div className="waitlist-social-proof">
          <h3 className="social-proof-title">Recent Signups</h3>
          
          <div className="signups-list">
            {recentSignups.map((signup, index) => (
              <div key={index} className="signup-item">
                <div className="signup-avatar">
                  {signup.name.charAt(0)}
                </div>
                <div className="signup-details">
                  <p className="signup-name">{signup.name}</p>
                  <p className="signup-meta">
                    from {signup.location} • {signup.time} {typeof signup.time === 'number' ? 'minutes ago' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;