import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  CognitiveDissonanceActivator, 
  IdentityReinforcementTrigger,
  AuthorityPositioningTrigger
} from '@ipp-tools/core';
import { 
  PsychologicalVisualizer, 
  EngagementMetric, 
  WaitlistForm,
  FrameworkCard,
  TestimonialCard
} from '@ipp-tools/ui';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('premium');
  const heroDashboardRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    heroDashboard: false,
    resultsSection: false,
    philosophySection: false,
    frameworksSection: false,
    testimonialsSection: false
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Detect viewport visibility for elements (psychological entrance timing)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const elements = [
      document.getElementById('hero-dashboard'),
      document.getElementById('results-section'),
      document.getElementById('philosophy-section'),
      document.getElementById('frameworks-section'),
      document.getElementById('testimonials-section')
    ];
    
    elements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  
  // Track user interaction for dynamic psychological response
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        
        // Trigger cognitive intensity increase after first interaction
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'cognitive_intensity_increase',
            previous_intensity: 'low',
            new_intensity: 'medium',
            engagement_depth: 'initial'
          });
        }
      }
    };
    
    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [hasInteracted]);
  
  // Framework data
  const frameworks = {
    premium: [
      {
        name: "VibeCascade Framework",
        description: "The psychological framework elite creators use to achieve exponential engagement growth",
        status: "ACTIVE",
        price: "$997",
        url: "https://vibecascade.ipp.tools",
        features: [
          "Advanced cognitive triggers that make it neurologically impossible for users not to engage",
          "Algorithm-proof system based on psychological constants that all platforms reward",
          "572% average engagement increase for implementing creators"
        ],
        colorScheme: "primary"
      }
    ],
    free: [
      {
        name: "AlgoDecoder",
        description: "Decode the exact psychological patterns each social algorithm rewards",
        status: "FREE",
        price: "Free",
        upsellTo: "VibeCascade Framework",
        features: [
          "Basic algorithm analysis for one platform",
          "Monthly report on platform changes",
          "Simplified engagement pattern suggestions"
        ],
        colorScheme: "warning"
      },
      {
        name: "NeuroCopy",
        description: "Test your copy against the 17 neurological triggers that drive action",
        status: "FREE",
        price: "Free",
        upsellTo: "QuantumConversion",
        features: [
          "Basic neural engagement scoring",
          "Analysis of 3 core triggers",
          "Simple rewording suggestions"
        ],
        colorScheme: "secondary"
      },
      {
        name: "IdentityMapper",
        description: "Map the exact identity triggers that activate tribal responses in your audience",
        status: "FREE",
        price: "Free",
        upsellTo: "PrimalPositioning",
        features: [
          "Basic identity resonance analysis",
          "Simple audience segment identification",
          "Core belief mapping"
        ],
        colorScheme: "identity"
      }
    ],
    upcoming: [
      {
        name: "NeuralNarrative",
        description: "Craft stories that bypass conscious filtering and speak directly to the limbic system",
        status: "WAITLIST",
        price: "$1,997",
        expectedLaunch: "Q3 2025",
        features: [
          "The exact narrative structures that create neural synchronization between creator and audience",
          "Advanced psycholinguistic frameworks derived from 3.7M analyzed viral stories",
          "Memory implantation techniques that make your content impossible to forget"
        ],
        colorScheme: "authority"
      },
      {
        name: "PrimalPositioning",
        description: "Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms",
        status: "WAITLIST",
        price: "$1,497",
        expectedLaunch: "Q2 2025",
        features: [
          "The exact positioning framework that turns audience members into tribal defenders",
          "Identity-resonance techniques that create unconscious loyalty and advocacy",
          "Competitor neutralization patterns based on evolutionary threat response"
        ],
        colorScheme: "identity"
      },
      {
        name: "QuantumConversion",
        description: "Multi-dimensional conversion frameworks that work across all psychological profiles",
        status: "WAITLIST",
        price: "$2,497",
        expectedLaunch: "Q3 2025",
        features: [
          "The elite persuasion architecture used by the world's highest-converting offers",
          "Advanced probability field manipulation for 247% higher conversion rates",
          "Pattern interruption sequences that make sales resistance neurologically impossible"
        ],
        colorScheme: "exclusive"
      }
    ]
  };
  
  // Testimonial data
  const testimonials = [
    {
      name: "Michael J.",
      role: "Finance Creator",
      image: "/assets/images/testimonial-1.jpg",
      quote: "Implemented the VibeCascade framework on a Thursday. By Monday, my engagement was up 432%. By the end of the month, I had 3 viral posts and gained 14,000 new followers."
    },
    {
      name: "Sarah L.",
      role: "Health & Wellness",
      image: "/assets/images/testimonial-2.jpg",
      quote: "I was skeptical about the 'cognitive triggers' but decided to test it. The results shocked me. My average post went from 50 comments to over 400 in just two weeks."
    },
    {
      name: "David K.",
      role: "Tech Analysis",
      image: "/assets/images/testimonial-3.jpg",
      quote: "This isn't just another 'growth hack' - it's a complete paradigm shift. The psychological principles are backed by serious research. My engagement is up 721% in 45 days."
    }
  ];
  
  // Stats data
  const stats = [
    { metric: "572%", label: "Average Engagement Increase" },
    { metric: "15,000+", label: "Elite Creators Using IPP Frameworks" },
    { metric: "97.8%", label: "Implementation Success Rate" }
  ];
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <CognitiveDissonanceActivator type="cognitive" intensity="high">
              <h1 className="hero-title">
                The <span className="text-gradient">UNCOMFORTABLE TRUTH</span> About Digital Growth in 2025
              </h1>
            </CognitiveDissonanceActivator>
            
            <IdentityReinforcementTrigger intensity="medium" identityType="creator">
              <p className="hero-subtitle">
                93% of content creators and marketers are fighting a losing battle using outdated tactics from 2023. 
                The elite 7% are using advanced psychological frameworks that make platform algorithms irrelevant.
              </p>
            </IdentityReinforcementTrigger>
            
            <div className="hero-cta">
              <Link to="/waitlist" className="btn btn-gradient btn-lg strategic-hover">
                Access Elite Frameworks
              </Link>
              <a href="#frameworks" className="btn btn-outline btn-lg">
                Explore Frameworks
              </a>
            </div>
            
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <EngagementMetric
                  key={index}
                  value={stat.metric}
                  label={stat.label}
                  animationDelay={index * 200}
                />
              ))}
            </div>
          </div>
          
          <div className="hero-visual" id="hero-dashboard" ref={heroDashboardRef}>
            {isVisible.heroDashboard && (
              <AuthorityPositioningTrigger intensity="high">
                <PsychologicalVisualizer
                  type="dashboard"
                  variant="glass"
                  className="dashboard-visualization"
                  animationDuration={800}
                />
              </AuthorityPositioningTrigger>
            )}
          </div>
        </div>
      </section>
      
      {/* Frameworks Section */}
      <section className="frameworks-section" id="frameworks-section">
        <div className="container">
          <div className="section-header">
            <CognitiveDissonanceActivator type="authority" intensity="medium">
              <h2 className="section-title">
                Psychological Frameworks That <span className="text-gradient">Actually Work</span> in 2025
              </h2>
            </CognitiveDissonanceActivator>
            
            <p className="section-subtitle">
              Each framework is built on extensive research and real-world validation across multiple platforms and niches.
            </p>
            
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
            {frameworks[activeTab].map((framework, index) => (
              <FrameworkCard
                key={index}
                framework={framework}
                animationDelay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section className="philosophy-section" id="philosophy-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Intelligence. Psychology. Persuasion.</h2>
            
            <AuthorityPositioningTrigger intensity="medium">
              <p className="section-subtitle">
                Our frameworks don't rely on 'hacks' or 'tricks' that stop working when algorithms change. 
                We focus on the psychological constants that ALL platforms are designed to reward.
              </p>
            </AuthorityPositioningTrigger>
          </div>
          
          <div className="philosophy-grid">
            <div className="philosophy-card subtle-float">
              <div className="philosophy-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Intelligence</h3>
              <p>Data-driven frameworks based on analysis of 250,000+ high-performing content pieces across all major platforms.</p>
            </div>
            
            <div className="philosophy-card subtle-float" style={{ animationDelay: '1s' }}>
              <div className="philosophy-icon">
                <i className="fas fa-microscope"></i>
              </div>
              <h3>Psychology</h3>
              <p>Neurological triggers that bypass conscious filtering and speak directly to the deeper decision-making systems.</p>
            </div>
            
            <div className="philosophy-card subtle-float" style={{ animationDelay: '2s' }}>
              <div className="philosophy-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              <h3>Persuasion</h3>
              <p>Scientifically-validated influence patterns that create unstoppable momentum from first impression to final conversion.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="results-section" id="results-section">
        <div className="container">
          <div className="section-header">
            <CognitiveDissonanceActivator type="identity" intensity="high">
              <h2 className="section-title">
                The Framework Results That <span className="text-gradient">"Traditional" Experts</span> Don't Want You To See
              </h2>
            </CognitiveDissonanceActivator>
            
            <p className="section-subtitle">
              Real implementation data from creators using IPP Frameworks in 2025
            </p>
          </div>
          
          {isVisible.resultsSection && (
            <div className="results-grid">
              <div className="results-card">
                <div className="results-metric">
                  <div className="metric-value">572%</div>
                  <div className="metric-label">Average Engagement Increase</div>
                </div>
                <div className="results-detail">
                  <p>Across all social platforms after implementing the complete VibeCascade Framework</p>
                </div>
              </div>
              
              <div className="results-card">
                <div className="results-metric">
                  <div className="metric-value">14.2x</div>
                  <div className="metric-label">Average Follower Growth</div>
                </div>
                <div className="results-detail">
                  <p>Year-over-year comparison for framework implementers vs control group</p>
                </div>
              </div>
              
              <div className="results-card">
                <div className="results-metric">
                  <div className="metric-value">97.8%</div>
                  <div className="metric-label">Implementation Success Rate</div>
                </div>
                <div className="results-detail">
                  <p>Percentage of creators who achieve significant measurable results within 30 days</p>
                </div>
              </div>
              
              <div className="results-card">
                <div className="results-metric">
                  <div className="metric-value">$743M+</div>
                  <div className="metric-label">Revenue Generated</div>
                </div>
                <div className="results-detail">
                  <p>Total tracked revenue directly attributed to framework implementations</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              The <span className="text-gradient">Transformation Stories</span> Behind The Numbers
            </h2>
            
            <IdentityReinforcementTrigger intensity="low" identityType="creator">
              <p className="section-subtitle">
                Real creators sharing their experiences with IPP Frameworks
              </p>
            </IdentityReinforcementTrigger>
          </div>
          
          {isVisible.testimonialsSection && (
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  animationDelay={index * 200}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join the Movement Changing Digital Influence Forever</h2>
            
            <p className="cta-subtitle">
              Our framework waitlists fill up fast. Secure your position to receive first access when new frameworks launch.
            </p>
            
            <WaitlistForm className="cta-form" simplified={true} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;