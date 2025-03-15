import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CognitiveDissonanceActivator,
  IdentityReinforcementTrigger,
  SustainedEngagementLoop
} from '@ipp-tools/core';
import {
  WaitlistForm,
  Countdown,
  SocialProof,
  PsychologicalVisualizer
} from '@ipp-tools/ui';

const WaitlistPage = () => {
  const { framework } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(getRandomSpots());
  const [recentSignups, setRecentSignups] = useState([]);
  const [countdownEnd] = useState(() => {
    // Set countdown to 14 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    endDate.setHours(endDate.getHours() + 7);
    endDate.setMinutes(endDate.getMinutes() + 32);
    return endDate;
  });
  
  // Generate random number of spots between 5-20
  function getRandomSpots() {
    return Math.floor(Math.random() * 16) + 5;
  }
  
  // Get framework details
  const getFrameworkDetails = () => {
    const frameworks = {
      vibecascade: {
        name: "VibeCascade Framework",
        description: "The psychological framework elite creators use to achieve exponential engagement growth",
        expectedLaunch: "Available Now",
        primaryColor: "#5468ff"
      },
      neuralnarrative: {
        name: "NeuralNarrative",
        description: "Craft stories that bypass conscious filtering and speak directly to the limbic system",
        expectedLaunch: "Q3 2025",
        primaryColor: "#00c4cc"
      },
      primalposition: {
        name: "PrimalPositioning",
        description: "Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms",
        expectedLaunch: "Q2 2025",
        primaryColor: "#ff5a5f"
      },
      quantumconversion: {
        name: "QuantumConversion",
        description: "Multi-dimensional conversion frameworks that work across all psychological profiles",
        expectedLaunch: "Q3 2025",
        primaryColor: "#34d399"
      },
      default: {
        name: "IPP.TOOLS Priority Access",
        description: "Get priority access to our advanced psychological frameworks that are changing how elite creators approach digital growth",
        expectedLaunch: null,
        primaryColor: "#5468ff"
      }
    };
    
    return frameworks[framework] || frameworks.default;
  };
  
  const frameworkDetails = getFrameworkDetails();
  
  // Simulated recent signups
  useEffect(() => {
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
      'Sophia G.'
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
    
    return () => clearInterval(signupInterval);
  }, []);
  
  // Handle form submission success
  const handleSubmitSuccess = () => {
    setSubmitted(true);
    setSpotsLeft(prev => Math.max(1, prev - 1));
    
    // Track conversion
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'waitlist_submission',
        framework: framework || 'all',
        remainingSpots: spotsLeft - 1
      });
    }
  };
  
  return (
    <div className="waitlist-page">
      <section className="waitlist-hero">
        <div className="container">
          <div className="waitlist-content">
            {!submitted ? (
              <>
                <div className="waitlist-intro">
                  <CognitiveDissonanceActivator type="identity" intensity="high">
                    <h1 className="waitlist-title">
                      {frameworkDetails.name}
                    </h1>
                  </CognitiveDissonanceActivator>
                  
                  <IdentityReinforcementTrigger intensity="medium" identityType="creator">
                    <p className="waitlist-description">
                      {frameworkDetails.description}
                    </p>
                  </IdentityReinforcementTrigger>
                  
                  <div className="waitlist-details">
                    <SustainedEngagementLoop type="scarcity" intensity="high">
                      <div className="waitlist-spots">
                        <div className="spots-indicator">
                          <div className="spots-count">{spotsLeft}</div>
                        </div>
                        <p>Priority spots remaining</p>
                      </div>
                    </SustainedEngagementLoop>
                    
                    {frameworkDetails.expectedLaunch && (
                      <div className="waitlist-timeline">
                        <div className="timeline-indicator">
                          <i className="fas fa-calendar-alt"></i>
                        </div>
                        <p>Expected launch: {frameworkDetails.expectedLaunch}</p>
                      </div>
                    )}
                  </div>
                  
                  <SustainedEngagementLoop type="urgency" intensity="medium">
                    <div className="countdown-container">
                      <p className="countdown-label">Waitlist closing in:</p>
                      <Countdown 
                        endDate={countdownEnd} 
                        onComplete={() => setSpotsLeft(3)} 
                      />
                    </div>
                  </SustainedEngagementLoop>
                </div>
                
                <div className="waitlist-form-container">
                  <WaitlistForm 
                    frameworkName={frameworkDetails.name}
                    onSubmitSuccess={handleSubmitSuccess}
                  />
                </div>
              </>
            ) : (
              <div className="success-container">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                
                <h2 className="success-title">You're on the List!</h2>
                
                <IdentityReinforcementTrigger intensity="high" identityType="insider">
                  <p className="success-message">
                    We've saved your spot on the waitlist. You'll be among the first to know when we launch.
                  </p>
                </IdentityReinforcementTrigger>
                
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
            <AuthorityPositioningTrigger intensity="low">
              <h3 className="social-proof-title">Recent Signups</h3>
            </AuthorityPositioningTrigger>
            
            <SocialProof
              recentSignups={recentSignups}
              animated={true}
            />
          </div>
        </div>
      </section>
      
      {/* Visualization background */}
      <div className="waitlist-visualization-background">
        <PsychologicalVisualizer
          type="particles"
          variant="subtle"
          color={frameworkDetails.primaryColor}
          density={0.3}
        />
      </div>
    </div>
  );
};

export default WaitlistPage;