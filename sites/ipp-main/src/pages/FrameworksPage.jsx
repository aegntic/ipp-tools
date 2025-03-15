import React, { useState, useEffect } from 'react';
import { useCognitiveDissonance } from '@ipp-tools/core';
import { FrameworkCard } from '@ipp-tools/ui';

// Same framework data from HomePage - in a real app, this would be centralized
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

const FrameworksPage = () => {
  const [activeTab, setActiveTab] = useState('premium');
  const { activateTrigger } = useCognitiveDissonance();
  
  useEffect(() => {
    // Activate psychological triggers
    activateTrigger('cognitiveDissonance', 'medium');
    activateTrigger('socialProof', 'high');
    
    // Track page view
    if (window.ippTools?.trackPageView) {
      window.ippTools.trackPageView('/frameworks', {
        activeTab
      });
    }
  }, [activateTrigger, activeTab]);
  
  return (
    <div className="frameworks-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Psychological Frameworks</h1>
          <p className="page-description">
            Based on extensive research and real-world validation across multiple platforms and niches,
            our frameworks provide the advanced psychological patterns that drive exponential growth in 2025.
          </p>
        </div>
        
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
                    location: 'frameworks_page'
                  });
                }
              }}
            />
          ))}
        </div>
        
        {activeTab === 'premium' && (
          <div className="comparison-section">
            <h2 className="section-title">Why Traditional Methods Fail in 2025</h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Criteria</th>
                    <th>Traditional Methods</th>
                    <th>IPP.TOOLS Frameworks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Algorithm Resilience</td>
                    <td>Dependent on platform-specific "hacks" that break with updates</td>
                    <td>Based on psychological constants that ALL platforms are designed to reward</td>
                  </tr>
                  <tr>
                    <td>Engagement Rate</td>
                    <td>5-15% average</td>
                    <td>45-60% average (572% increase from baseline)</td>
                  </tr>
                  <tr>
                    <td>Viral Potential</td>
                    <td>Unpredictable, largely based on luck</td>
                    <td>Engineered virality through cognitive trigger sequencing</td>
                  </tr>
                  <tr>
                    <td>Conversion Model</td>
                    <td>Direct, often resistance-inducing</td>
                    <td>Multi-dimensional approach that bypasses conscious resistance</td>
                  </tr>
                  <tr>
                    <td>Long-term Results</td>
                    <td>Diminishing returns as tactics become outdated</td>
                    <td>Compound growth through neural reinforcement patterns</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="frameworks-cta">
          <h2 className="cta-title">Ready to transform your digital presence?</h2>
          <p className="cta-description">
            Join the elite 7% of creators who are using advanced psychological frameworks 
            to achieve exponential growth in 2025.
          </p>
          <a href="/waitlist" className="btn btn-gradient btn-lg">
            Join Priority Waitlist
          </a>
        </div>
      </div>
    </div>
  );
};

export default FrameworksPage;