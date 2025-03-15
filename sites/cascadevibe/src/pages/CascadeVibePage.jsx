import React, { useState, useEffect } from 'react';
import '../styles/CascadeVibePage.css';

/**
 * CascadeVibe Framework Landing Page Component
 * 
 * This page showcases the CascadeVibe framework with psychological
 * optimization for maximum conversion and engagement.
 */
const CascadeVibePage = () => {
  // Track scroll position for animations
  const [scrollPosition, setScrollPosition] = useState(0);
  // Track pricing selection for optimization
  const [selectedPlan, setSelectedPlan] = useState('pro');
  
  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track page view
  useEffect(() => {
    // Call cross-domain tracking
    if (window.ippTracker) {
      window.ippTracker.trackFrameworkView('cascadevibe');
    }
  }, []);

  // Handler for plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    
    // Track engagement
    if (window.ippTracker) {
      window.ippTracker.trackEngagement('plan_select', { 
        framework_id: 'cascadevibe',
        plan: plan 
      });
    }
  };
  
  // Handler for CTA clicks
  const handleCtaClick = (plan) => {
    // Track conversion intent
    if (window.ippTracker) {
      window.ippTracker.trackEngagement('cta_click', {
        framework_id: 'cascadevibe',
        plan: plan,
        cta_location: 'pricing_section'
      });
    }
  };
  
  return (
    <div className="cascadevibe-page">
      {/* Hero Section with Framework-Specific Psychological Triggers */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="reveal-text">Experience the</span> 
              <span className="gradient-text reveal-text">CascadeVibe Effect</span>
            </h1>
            
            <p className="hero-subtitle reveal-text">
              The psychological framework elite creators use to achieve exponential engagement growth.
              Create a ripple of influence that makes it neurologically impossible for your audience not to engage.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item reveal-text">
                <span className="stat-value">572%</span>
                <span className="stat-label">Average Engagement Increase</span>
              </div>
              <div className="stat-item reveal-text" style={{animationDelay: '0.1s'}}>
                <span className="stat-value">15,000+</span>
                <span className="stat-label">Elite Creators Using Framework</span>
              </div>
              <div className="stat-item reveal-text" style={{animationDelay: '0.2s'}}>
                <span className="stat-value">97.8%</span>
                <span className="stat-label">Implementation Success Rate</span>
              </div>
            </div>
            
            <a 
              href="#implementation" 
              className="cta-button primary reveal-text"
              style={{animationDelay: '0.3s'}}
              onClick={() => {
                if (window.ippTracker) {
                  window.ippTracker.trackEngagement('cta_click', {
                    framework_id: 'cascadevibe',
                    cta_location: 'hero_section'
                  });
                }
              }}
            >
              Discover How It Works
            </a>
          </div>
          
          <div className="hero-visual reveal-image">
            <img 
              src="/assets/images/cascadevibe-visualization.png" 
              alt="CascadeVibe Framework Visualization" 
              className="hero-image"
            />
          </div>
        </div>
      </section>
      
      {/* Implementation Methodology Visualization */}
      <section id="implementation" className="methodology-section">
        <div className="container">
          <h2 className="section-title">
            The <span className="gradient-text">Science</span> Behind CascadeVibe
          </h2>
          
          <p className="section-subtitle">
            Our framework doesn't rely on platform-specific "hacks" or "tricks" that stop working when algorithms change.
            We focus on the psychological constants that ALL platforms are designed to reward.
          </p>
          
          <div className="methodology-grid">
            {/* Step 1 */}
            <div className={`methodology-card ${scrollPosition > 300 ? 'visible' : ''}`}>
              <div className="methodology-icon">
                <img src="/assets/images/cognitive-icon.svg" alt="Cognitive Dissonance Activation" />
              </div>
              
              <h3>Cognitive Dissonance Activation</h3>
              
              <p>Create strategic information gaps that the human brain is neurologically compelled to resolve, driving unstoppable engagement.</p>
              
              <div className="methodology-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '100%'}}></div>
                </div>
                <span className="progress-label">Step 1</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className={`methodology-card ${scrollPosition > 400 ? 'visible' : ''}`}>
              <div className="methodology-icon">
                <img src="/assets/images/identity-icon.svg" alt="Identity Reinforcement Patterns" />
              </div>
              
              <h3>Identity Reinforcement Patterns</h3>
              
              <p>Implement precise formulations that create unconscious defense responses on your behalf from your audience.</p>
              
              <div className="methodology-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '100%'}}></div>
                </div>
                <span className="progress-label">Step 2</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className={`methodology-card ${scrollPosition > 500 ? 'visible' : ''}`}>
              <div className="methodology-icon">
                <img src="/assets/images/algorithmic-icon.svg" alt="Algorithmic Resonance Mapping" />
              </div>
              
              <h3>Algorithmic Resonance Mapping</h3>
              
              <p>Leverage the exact engagement patterns that platform algorithms are programmed to amplify, based on behavioral economics.</p>
              
              <div className="methodology-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '100%'}}></div>
                </div>
                <span className="progress-label">Step 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section id="results" className="results-section">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">Real Results</span> From Real Creators
          </h2>
          
          <p className="section-subtitle">
            These aren't cherry-picked outliers. These are the typical results our framework implementers experience within 30 days.
          </p>
          
          <div className={`results-grid ${scrollPosition > 700 ? 'visible' : ''}`}>
            <div className="result-card">
              <div className="result-stat">572%</div>
              <div className="result-label">Average Engagement Increase</div>
              <div className="result-info">After implementing the complete CascadeVibe Framework across all platforms</div>
            </div>
            
            <div className="result-card">
              <div className="result-stat">14.2x</div>
              <div className="result-label">Average Follower Growth</div>
              <div className="result-info">Year-over-year comparison for framework implementers vs control group</div>
            </div>
            
            <div className="result-card">
              <div className="result-stat">97.8%</div>
              <div className="result-label">Implementation Success Rate</div>
              <div className="result-info">Percentage of creators who achieve significant measurable results within 30 days</div>
            </div>
            
            <div className="result-card">
              <div className="result-stat">$743M+</div>
              <div className="result-label">Revenue Generated</div>
              <div className="result-info">Total tracked revenue directly attributed to framework implementations</div>
            </div>
          </div>
          
          <div className="results-dashboard">
            <h3>Live Implementation Success Dashboard</h3>
            <p>Watch real-time results across our implementation community</p>
            
            <div className={`dashboard-container ${scrollPosition > 900 ? 'visible' : ''}`}>
              <img 
                src="/assets/images/cascadevibe-dashboard.png" 
                alt="CascadeVibe Results Dashboard" 
                className="dashboard-image" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2 className="section-title">
            The <span className="gradient-text">Transformation Stories</span> Behind The Numbers
          </h2>
          
          <p className="section-subtitle">
            Real creators sharing their experiences with the CascadeVibe Framework
          </p>
          
          <div className={`testimonials-grid ${scrollPosition > 1200 ? 'visible' : ''}`}>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Implemented the CascadeVibe framework on a Thursday. By Monday, my engagement was up 432%. By the end of the month, I had 3 viral posts and gained 14,000 new followers."</p>
              </div>
              <div className="testimonial-author">
                <img src="/assets/images/testimonial-1.jpg" alt="Michael J." />
                <div>
                  <h4>Michael J.</h4>
                  <p>Finance Creator</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I was skeptical about the 'cognitive triggers' but decided to test it. The results shocked me. My average post went from 50 comments to over 400 in just two weeks."</p>
              </div>
              <div className="testimonial-author">
                <img src="/assets/images/testimonial-2.jpg" alt="Sarah L." />
                <div>
                  <h4>Sarah L.</h4>
                  <p>Health & Wellness</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"This isn't just another 'growth hack' - it's a complete paradigm shift. The psychological principles are backed by serious research. My engagement is up 721% in 45 days."</p>
              </div>
              <div className="testimonial-author">
                <img src="/assets/images/testimonial-3.jpg" alt="David K." />
                <div>
                  <h4>David K.</h4>
                  <p>Tech Analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Structure with Psychological Optimization */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <h2 className="section-title">
            Access The <span className="gradient-text">CascadeVibe Framework</span>
          </h2>
          
          <p className="section-subtitle">
            Select the implementation path that best fits your goals
          </p>
          
          <div className={`pricing-grid ${scrollPosition > 1600 ? 'visible' : ''}`}>
            <div className={`pricing-card ${selectedPlan === 'starter' ? 'selected' : ''}`} onClick={() => handlePlanSelect('starter')}>
              <div className="pricing-header">
                <h3>Starter</h3>
                <div className="pricing-amount">
                  <span className="price">$497</span>
                  <span className="term">one-time payment</span>
                </div>
              </div>
              
              <div className="pricing-features">
                <ul>
                  <li>
                    <i className="feature-check"></i>
                    <span>Full CascadeVibe Framework implementation guide</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>30 days of implementation support</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Basic cognitive trigger templates</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Community access</span>
                  </li>
                </ul>
              </div>
              
              <div className="pricing-action">
                <button 
                  className="btn btn-outline" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCtaClick('starter');
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
            
            <div className={`pricing-card popular ${selectedPlan === 'pro' ? 'selected' : ''}`} onClick={() => handlePlanSelect('pro')}>
              <div className="pricing-badge">MOST POPULAR</div>
              
              <div className="pricing-header">
                <h3>Professional</h3>
                <div className="pricing-amount">
                  <span className="price">$997</span>
                  <span className="term">one-time payment</span>
                </div>
              </div>
              
              <div className="pricing-features">
                <ul>
                  <li>
                    <i className="feature-check"></i>
                    <span>Everything in Starter, plus:</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Advanced cognitive trigger templates</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>90 days of implementation support</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Algorithm-specific optimization guides</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Monthly group coaching sessions</span>
                  </li>
                </ul>
              </div>
              
              <div className="pricing-action">
                <button 
                  className="btn btn-primary" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCtaClick('pro');
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
            
            <div className={`pricing-card ${selectedPlan === 'elite' ? 'selected' : ''}`} onClick={() => handlePlanSelect('elite')}>
              <div className="pricing-header">
                <h3>Elite</h3>
                <div className="pricing-amount">
                  <span className="price">$2,497</span>
                  <span className="term">one-time payment</span>
                </div>
              </div>
              
              <div className="pricing-features">
                <ul>
                  <li>
                    <i className="feature-check"></i>
                    <span>Everything in Professional, plus:</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>1-on-1 implementation coaching</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Custom cognitive trigger development</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Unlimited implementation support</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>VIP community access</span>
                  </li>
                  <li>
                    <i className="feature-check"></i>
                    <span>Early access to new frameworks</span>
                  </li>
                </ul>
              </div>
              
              <div className="pricing-action">
                <button 
                  className="btn btn-outline" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCtaClick('elite');
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          
          <div className="guarantee-section">
            <div className="guarantee-badge">
              <img src="/assets/images/guarantee-badge.svg" alt="100% Satisfaction Guarantee" />
            </div>
            <div className="guarantee-content">
              <h3>100% Implementation Success Guarantee</h3>
              <p>
                If you don't see a significant measurable increase in engagement within 30 days of correctly implementing the framework, we'll refund your investment in full and provide you with a free implementation review to identify what went wrong.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Transform Your Digital Influence Forever?</h2>
          <p className="cta-subtitle">Join the movement that's changing how elite creators approach engagement</p>
          
          <button 
            className="cta-button primary large"
            onClick={() => {
              handleCtaClick('pro');
              document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started Now
          </button>
          
          <p className="cta-note">Limited spots available for current implementation cohort</p>
        </div>
      </section>
    </div>
  );
};

export default CascadeVibePage;
