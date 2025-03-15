import React, { useState, useEffect } from 'react';
import { useCognitiveDissonance } from '@ipp-tools/core';
import { FrameworkCard } from '@ipp-tools/ui';

// Mock data - This would typically come from an API or config
const frameworksData = {
  premium: [
    {
      id: 'cascadevibe',
      title: 'VibeCascade Framework',
      description: 'The psychological framework elite creators use to achieve exponential engagement growth',
      status: 'ACTIVE',
      price: '$997',
      priceNote: 'one-time payment',
      features: [
        'Advanced cognitive triggers that make it neurologically impossible for users not to engage',
        'Algorithm-proof system based on psychological constants that all platforms reward',
        '572% average engagement increase for implementing creators'
      ],
      buttonText: 'Access Framework',
      buttonUrl: 'https://vibecascade.ipp.tools'
    }
  ],
  upcoming: [
    {
      id: 'neuralnarrative',
      title: 'NeuralNarrative',
      description: 'Craft stories that bypass conscious filtering and speak directly to the limbic system',
      status: 'COMING SOON',
      price: '$1,997',
      launchDate: 'Expected Q3 2025',
      features: [
        'The exact narrative structures that create neural synchronization between creator and audience',
        'Advanced psycholinguistic frameworks derived from 3.7M analyzed viral stories',
        'Memory implantation techniques that make your content impossible to forget'
      ],
      buttonText: 'Join Waitlist',
      buttonUrl: '/waitlist/neuralnarrative'
    },
    {
      id: 'primalposition',
      title: 'PrimalPositioning',
      description: 'Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms',
      status: 'COMING SOON',
      price: '$1,497',
      launchDate: 'Expected Q2 2025',
      features: [
        'The exact positioning framework that turns audience members into tribal defenders',
        'Identity-resonance techniques that create unconscious loyalty and advocacy',
        'Competitor neutralization patterns based on evolutionary threat response'
      ],
      buttonText: 'Join Waitlist',
      buttonUrl: '/waitlist/primalposition'
    },
    {
      id: 'quantumconversion',
      title: 'QuantumConversion',
      description: 'Multi-dimensional conversion frameworks that work across all psychological profiles',
      status: 'COMING SOON',
      price: '$2,497',
      launchDate: 'Expected Q3 2025',
      features: [
        'The elite persuasion architecture used by the world's highest-converting offers',
        'Advanced probability field manipulation for 247% higher conversion rates',
        'Pattern interruption sequences that make sales resistance neurologically impossible'
      ],
      buttonText: 'Join Waitlist',
      buttonUrl: '/waitlist/quantumconversion'
    }
  ],
  free: [
    {
      id: 'algodecoder',
      title: 'AlgoDecoder',
      description: 'Decode the exact psychological patterns each social algorithm rewards',
      status: 'FREE',
      features: [
        'Basic algorithm analysis for one platform',
        'Monthly report on platform changes',
        'Simplified engagement pattern suggestions'
      ],
      premiumFeatures: [
        'Real-time algorithm change detection across all platforms',
        'Custom pattern generation based on your specific content',
        'Advanced psychological trigger mapping'
      ],
      buttonText: 'Join Waitlist',
      buttonUrl: '/waitlist/algodecoder'
    },
    {
      id: 'neurocopy',
      title: 'NeuroCopy',
      description: 'Test your copy against the 17 neurological triggers that drive action',
      status: 'FREE',
      features: [
        'Basic neural engagement scoring',
        'Analysis of 3 core triggers',
        'Simple rewording suggestions'
      ],
      premiumFeatures: [
        'Full 17-trigger analysis with specific improvement recommendations',
        'Psychological profile targeting options',
        'Pattern matching against 50,000+ proven high-converting examples'
      ],
      buttonText: 'Join Waitlist',
      buttonUrl: '/waitlist/neurocopy'
    },
    {
      id: 'identitymapper',
      title: 'IdentityMapper',
      description: 'Map the exact identity triggers that activate tribal responses in your audience',
      status: 'FREE',
      features: [
        'Basic identity resonance analysis',
        'Simple audience segment identification',
        'Core belief mapping'
      ],
      premiumFeatures: [
        'Full identity alignment architecture',
        'Cross-tribal positioning strategies',
        'Defense mechanism activation frameworks'
      ],
      buttonText: 'Join Waitlist',
      buttonUrl: '/waitlist/identitymapper'
    }
  ]
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('premium');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { activateTrigger } = useCognitiveDissonance();
  
  useEffect(() => {
    // Activate psychological triggers on page load
    activateTrigger('cognitiveDissonance', 'high');
    activateTrigger('identityReinforcement', 'medium');
    activateTrigger('authorityPositioning', 'high');
    
    // Track page view
    if (window.ippTools?.trackPageView) {
      window.ippTools.trackPageView('/');
    }
  }, [activateTrigger]);
  
  // Handle waitlist signup
  const handleWaitlistSignup = (e) => {
    e.preventDefault();
    
    if (email) {
      // Track conversion
      if (window.ippTools?.trackConversion) {
        window.ippTools.trackConversion('waitlist_signup', {
          email,
          location: 'homepage'
        });
      }
      
      // Close modal and reset form
      setShowModal(false);
      setEmail('');
      
      // Show success message (normally would be handled by a toast component)
      alert('Thank you for joining the waitlist! We\'ll keep you updated on our framework releases.');
    }
  };
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">The <span className="text-gradient">UNCOMFORTABLE TRUTH</span> About Digital Growth in 2025</h1>
            <p className="hero-subtitle">93% of content creators and marketers are fighting a losing battle using outdated tactics from 2023. The elite 7% are using advanced psychological frameworks that make platform algorithms irrelevant.</p>
            
            <div className="hero-cta">
              <button 
                className="btn btn-gradient btn-lg"
                onClick={() => setShowModal(true)}
              >
                Access Elite Frameworks
              </button>
              <a href="#frameworks" className="btn btn-outline btn-lg">
                Explore Frameworks
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">572%</span>
                <span className="stat-label">Average Engagement Increase</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">15,000+</span>
                <span className="stat-label">Elite Creators Using IPP Frameworks</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">97.8%</span>
                <span className="stat-label">Implementation Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Frameworks Section */}
      <section className="frameworks-section" id="frameworks">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Psychological Frameworks That <span className="text-gradient">Actually Work</span> in 2025</h2>
            <p className="section-subtitle">Each framework is built on extensive research and real-world validation across multiple platforms and niches.</p>
            
            <div className="framework-tabs">
              <button 
                className={`tab-btn ${activeTab === 'premium' ? 'active' : ''}`}
                onClick={() => setActiveTab('premium')}
              >
                Premium Frameworks
              </button>
              <button 
                className={`tab-btn ${activeTab === 'free' ? 'active' : ''}`}
                onClick={() => setActiveTab('free')}
              >
                Free Tools
              </button>
              <button 
                className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Coming Soon
              </button>
            </div>
          </div>
          
          <div className="frameworks-grid">
            {frameworksData[activeTab].map((framework) => (
              <FrameworkCard
                key={framework.id}
                title={framework.title}
                description={framework.description}
                features={framework.features}
                price={framework.price}
                priceNote={framework.priceNote}
                status={framework.status}
                buttonText={framework.buttonText}
                buttonUrl={framework.buttonUrl}
                onClick={() => {
                  // Track click event
                  if (window.ippTools?.trackEvent) {
                    window.ippTools.trackEvent('framework_click', {
                      id: framework.id,
                      type: activeTab,
                      location: 'homepage'
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="philosophy-section" id="philosophy">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Intelligence. Psychology. Persuasion.</h2>
            <p className="section-subtitle">Our frameworks don't rely on 'hacks' or 'tricks' that stop working when algorithms change. We focus on the psychological constants that ALL platforms are designed to reward.</p>
          </div>
          
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Intelligence</h3>
              <p>Data-driven frameworks based on analysis of 250,000+ high-performing content pieces across all major platforms.</p>
            </div>
            
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <i className="fas fa-microscope"></i>
              </div>
              <h3>Psychology</h3>
              <p>Neurological triggers that bypass conscious filtering and speak directly to the deeper decision-making systems.</p>
            </div>
            
            <div className="philosophy-card">
              <div className="philosophy-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              <h3>Persuasion</h3>
              <p>Scientifically-validated influence patterns that create unstoppable momentum from first impression to final conversion.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join the Movement Changing Digital Influence Forever</h2>
            <p className="cta-subtitle">Our framework waitlists fill up fast. Secure your position to receive first access when new frameworks launch.</p>
            
            <button 
              className="btn btn-gradient btn-lg"
              onClick={() => setShowModal(true)}
            >
              Join Priority Waitlist
            </button>
          </div>
        </div>
      </section>
      
      {/* Waitlist Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-content">
              <h3 className="modal-title">
                Join the IPP.TOOLS Priority Waitlist
              </h3>
              
              <p className="modal-subtitle">
                Get first access to all new frameworks and exclusive insights.
              </p>
              
              <form className="waitlist-form" onSubmit={handleWaitlistSignup}>
                <div className="form-group">
                  <label htmlFor="waitlist-email">Email Address</label>
                  <input
                    type="email"
                    id="waitlist-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-gradient btn-block">
                  Secure Your Spot
                </button>
              </form>
              
              <div className="modal-disclaimer">
                <p>
                  <i className="fas fa-shield-alt"></i>
                  Your information is secure and will never be shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;