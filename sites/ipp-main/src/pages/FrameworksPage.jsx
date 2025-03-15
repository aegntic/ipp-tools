import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CognitiveDissonanceActivator,
  IdentityReinforcementTrigger,
  AuthorityPositioningTrigger
} from '@ipp-tools/core';
import { 
  FrameworkCard,
  PsychologicalVisualizer,
  ComparisonTable
} from '@ipp-tools/ui';

const FrameworksPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Framework data
  const allFrameworks = [
    {
      id: 'vibecascade',
      name: "VibeCascade Framework",
      description: "The psychological framework elite creators use to achieve exponential engagement growth",
      status: "ACTIVE",
      price: "$997",
      url: "https://vibecascade.ipp.tools",
      category: "premium",
      features: [
        "Advanced cognitive triggers that make it neurologically impossible for users not to engage",
        "Algorithm-proof system based on psychological constants that all platforms reward",
        "572% average engagement increase for implementing creators"
      ],
      colorScheme: "primary",
      testimonials: [
        {
          name: "Michael J.",
          role: "Finance Creator",
          quote: "Implemented the framework on a Thursday. By Monday, my engagement was up 432%."
        }
      ],
      metrics: [
        { label: "Avg. Engagement Increase", value: "572%" },
        { label: "Implementation Success", value: "97.8%" }
      ]
    },
    {
      id: 'neuralnarrative',
      name: "NeuralNarrative",
      description: "Craft stories that bypass conscious filtering and speak directly to the limbic system",
      status: "WAITLIST",
      price: "$1,997",
      expectedLaunch: "Q3 2025",
      category: "upcoming",
      features: [
        "The exact narrative structures that create neural synchronization between creator and audience",
        "Advanced psycholinguistic frameworks derived from 3.7M analyzed viral stories",
        "Memory implantation techniques that make your content impossible to forget"
      ],
      colorScheme: "authority"
    },
    {
      id: 'primalposition',
      name: "PrimalPositioning",
      description: "Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms",
      status: "WAITLIST",
      price: "$1,497",
      expectedLaunch: "Q2 2025",
      category: "upcoming",
      features: [
        "The exact positioning framework that turns audience members into tribal defenders",
        "Identity-resonance techniques that create unconscious loyalty and advocacy",
        "Competitor neutralization patterns based on evolutionary threat response"
      ],
      colorScheme: "identity"
    },
    {
      id: 'quantumconversion',
      name: "QuantumConversion",
      description: "Multi-dimensional conversion frameworks that work across all psychological profiles",
      status: "WAITLIST",
      price: "$2,497",
      expectedLaunch: "Q3 2025",
      category: "upcoming",
      features: [
        "The elite persuasion architecture used by the world's highest-converting offers",
        "Advanced probability field manipulation for 247% higher conversion rates",
        "Pattern interruption sequences that make sales resistance neurologically impossible"
      ],
      colorScheme: "exclusive"
    },
    {
      id: 'algodecoder',
      name: "AlgoDecoder",
      description: "Decode the exact psychological patterns each social algorithm rewards",
      status: "FREE",
      price: "Free",
      upsellTo: "VibeCascade Framework",
      category: "free",
      features: [
        "Basic algorithm analysis for one platform",
        "Monthly report on platform changes",
        "Simplified engagement pattern suggestions"
      ],
      colorScheme: "warning"
    },
    {
      id: 'neurocopy',
      name: "NeuroCopy",
      description: "Test your copy against the 17 neurological triggers that drive action",
      status: "FREE",
      price: "Free",
      upsellTo: "QuantumConversion",
      category: "free",
      features: [
        "Basic neural engagement scoring",
        "Analysis of 3 core triggers",
        "Simple rewording suggestions"
      ],
      colorScheme: "secondary"
    },
    {
      id: 'identitymapper',
      name: "IdentityMapper",
      description: "Map the exact identity triggers that activate tribal responses in your audience",
      status: "FREE",
      price: "Free",
      upsellTo: "PrimalPositioning",
      category: "free",
      features: [
        "Basic identity resonance analysis",
        "Simple audience segment identification",
        "Core belief mapping"
      ],
      colorScheme: "identity"
    }
  ];
  
  // Filter frameworks by active tab
  const filteredFrameworks = activeTab === 'all' 
    ? allFrameworks 
    : allFrameworks.filter(framework => framework.category === activeTab);
  
  // Comparison table data for premium framework
  const comparisonData = {
    headers: [
      { key: 'feature', label: 'Feature' },
      { key: 'traditional', label: 'Traditional Approach' },
      { key: 'vibecascade', label: 'VibeCascade Framework' }
    ],
    rows: [
      {
        feature: 'Engagement Approach',
        traditional: 'Content quality focus',
        vibecascade: 'Psychological triggers + quality'
      },
      {
        feature: 'Algorithm Resilience',
        traditional: 'Vulnerable to algorithm changes',
        vibecascade: 'Based on psychological constants'
      },
      {
        feature: 'Implementation Time',
        traditional: '3-6 months trial and error',
        vibecascade: 'Results within 7-14 days'
      },
      {
        feature: 'Scientific Basis',
        traditional: 'Anecdotal best practices',
        vibecascade: 'Research-backed psychological frameworks'
      },
      {
        feature: 'Success Rate',
        traditional: '23% see significant improvement',
        vibecascade: '97.8% implementation success rate'
      }
    ]
  };
  
  return (
    <div className="frameworks-page">
      <section className="page-hero">
        <div className="container">
          <CognitiveDissonanceActivator type="authority" intensity="high">
            <h1 className="page-title">
              Psychological Frameworks for <span className="text-gradient">Elite Digital Growth</span>
            </h1>
          </CognitiveDissonanceActivator>
          
          <IdentityReinforcementTrigger intensity="medium" identityType="creator">
            <p className="page-subtitle">
              Implement the exact psychological triggers used by the top 0.1% of creators and marketers for exponential engagement growth
            </p>
          </IdentityReinforcementTrigger>
        </div>
      </section>
      
      <section className="frameworks-section">
        <div className="container">
          <div className="frameworks-tabs">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Frameworks
            </button>
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
          
          <div className="frameworks-grid">
            {filteredFrameworks.map((framework, index) => (
              <FrameworkCard
                key={framework.id}
                framework={framework}
                animationDelay={index * 100}
                expanded={filteredFrameworks.length < 3}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Framework Comparison Section */}
      <section className="comparison-section">
        <div className="container">
          <AuthorityPositioningTrigger intensity="high">
            <div className="section-header">
              <h2 className="section-title">
                Why <span className="text-gradient">Traditional Approaches</span> Fail in 2025
              </h2>
              <p className="section-subtitle">
                See how IPP.TOOLS frameworks compare to traditional growth strategies
              </p>
            </div>
          </AuthorityPositioningTrigger>
          
          <ComparisonTable 
            data={comparisonData}
            highlightColumn="vibecascade"
          />
          
          <div className="comparison-visual">
            <PsychologicalVisualizer
              type="chart"
              variant="growth"
              className="growth-visualization"
              width={800}
              height={400}
            />
          </div>
        </div>
      </section>
      
      {/* Implementation Process Section */}
      <section className="implementation-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Implementation Process</h2>
            <p className="section-subtitle">
              Our frameworks are designed for practical, step-by-step implementation
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Framework Access</h3>
              <p>Join the waitlist or get immediate access to premium frameworks</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Implementation Guide</h3>
              <p>Follow our detailed, platform-specific implementation guide</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Psychological Integration</h3>
              <p>Apply cognitive triggers to your existing content and strategy</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Results Tracking</h3>
              <p>Measure your results with our analytics dashboard</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <CognitiveDissonanceActivator type="scarcity" intensity="medium">
              <h2 className="cta-title">Ready to Implement Elite Psychological Frameworks?</h2>
            </CognitiveDissonanceActivator>
            
            <p className="cta-subtitle">
              Choose your framework or join our waitlist for priority access
            </p>
            
            <div className="cta-buttons">
              <Link to="/waitlist" className="btn btn-gradient btn-lg">
                Join Priority Waitlist
              </Link>
              <a href="https://vibecascade.ipp.tools" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                Access VibeCascade Framework
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrameworksPage;