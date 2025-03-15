import React, { useState } from 'react';
import FrameworkCard from '../common/FrameworkCard';
import '../../styles/framework-cards.css';

const FrameworksSection = ({ openWaitlistModal }) => {
  const [activeTab, setActiveTab] = useState('premium');
  
  // Framework data with persuasion-optimized messaging
  const frameworks = {
    premium: [
      {
        title: 'VibeCascade Framework',
        description: 'The psychological framework elite creators use to achieve exponential engagement growth',
        status: 'ACTIVE',
        price: '$997',
        benefits: [
          'Advanced cognitive triggers that make it neurologically impossible for users not to engage',
          'Algorithm-proof system based on psychological constants that all platforms reward',
          '572% average engagement increase for implementing creators'
        ],
        spotsLeft: 15
      }
    ],
    upcoming: [
      {
        title: 'NeuralNarrative',
        description: 'Craft stories that bypass conscious filtering and speak directly to the limbic system',
        status: 'COMING_SOON',
        price: '$1,997',
        estimatedLaunch: 'Q3 2025',
        benefits: [
          'The exact narrative structures that create neural synchronization between creator and audience',
          'Advanced psycholinguistic frameworks derived from 3.7M analyzed viral stories',
          'Memory implantation techniques that make your content impossible to forget'
        ],
        spotsLeft: 8
      },
      {
        title: 'PrimalPositioning',
        description: 'Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms',
        status: 'COMING_SOON',
        price: '$1,497',
        estimatedLaunch: 'Q2 2025',
        benefits: [
          'The exact positioning framework that turns audience members into tribal defenders',
          'Identity-resonance techniques that create unconscious loyalty and advocacy',
          'Competitor neutralization patterns based on evolutionary threat response'
        ],
        spotsLeft: 3
      },
      {
        title: 'QuantumConversion',
        description: 'Multi-dimensional conversion frameworks that work across all psychological profiles',
        status: 'COMING_SOON',
        price: '$2,497',
        estimatedLaunch: 'Q3 2025',
        benefits: [
          'The elite persuasion architecture used by the world\'s highest-converting offers',
          'Advanced probability field manipulation for 247% higher conversion rates',
          'Pattern interruption sequences that make sales resistance neurologically impossible'
        ],
        spotsLeft: 6
      }
    ],
    free: [
      {
        title: 'AlgoDecoder',
        description: 'Decode the exact psychological patterns each social algorithm rewards',
        status: 'WAITLIST',
        benefits: [
          'Basic algorithm analysis for one platform',
          'Monthly report on platform changes',
          'Simplified engagement pattern suggestions'
        ],
        spotsLeft: 0
      },
      {
        title: 'NeuroCopy',
        description: 'Test your copy against the 17 neurological triggers that drive action',
        status: 'WAITLIST',
        benefits: [
          'Basic neural engagement scoring',
          'Analysis of 3 core triggers',
          'Simple rewording suggestions'
        ],
        spotsLeft: 12
      },
      {
        title: 'IdentityMapper',
        description: 'Map the exact identity triggers that activate tribal responses in your audience',
        status: 'WAITLIST',
        benefits: [
          'Basic identity resonance analysis',
          'Simple audience segment identification',
          'Core belief mapping'
        ],
        spotsLeft: 7
      }
    ]
  };

  return (
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
          {frameworks[activeTab].map((framework, index) => (
            <FrameworkCard
              key={index}
              title={framework.title}
              description={framework.description}
              benefits={framework.benefits}
              spotsLeft={framework.spotsLeft}
              status={framework.status}
              price={framework.price}
              estimatedLaunch={framework.estimatedLaunch}
              onCtaClick={() => openWaitlistModal(framework.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworksSection;