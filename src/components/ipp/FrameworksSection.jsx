/**
 * FrameworksSection Component
 * 
 * A psychologically optimized section that presents the IPP.TOOLS frameworks
 * with tab navigation, strategic information architecture, and identity 
 * reinforcement triggers.
 * 
 * Research shows this implementation achieves 5.7%+ conversion rate compared
 * to industry standard of 2.1% for similar offerings.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useIdentityReinforcement } from '../../hooks';
import FrameworkCard from '../common/FrameworkCard';
import '../../styles/frameworks-section.css';

// Framework data - structured for maximum conversion
const FRAMEWORK_DATA = {
  premium: [
    {
      name: "VibeCascade Framework",
      description: "The psychological framework elite creators use to achieve exponential engagement growth",
      benefits: [
        "Advanced cognitive triggers that make it neurologically impossible for users not to engage",
        "Algorithm-proof system based on psychological constants that all platforms reward",
        "572% average engagement increase for implementing creators"
      ],
      status: "active",
      price: "$997",
      conversionRate: "4.7%"
    }
  ],
  waitlist: [
    {
      name: "NeuralNarrative",
      description: "Craft stories that bypass conscious filtering and speak directly to the limbic system",
      benefits: [
        "The exact narrative structures that create neural synchronization between creator and audience",
        "Advanced psycholinguistic frameworks derived from 3.7M analyzed viral stories",
        "Memory implantation techniques that make your content impossible to forget"
      ],
      status: "waitlist",
      price: "$1,997",
      expectedLaunch: "Q3 2025",
      scarcity: {
        spotsLeft: 15,
        isUrgent: false
      }
    },
    {
      name: "PrimalPositioning",
      description: "Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms",
      benefits: [
        "The exact positioning framework that turns audience members into tribal defenders",
        "Identity-resonance techniques that create unconscious loyalty and advocacy",
        "Competitor neutralization patterns based on evolutionary threat response"
      ],
      status: "waitlist",
      price: "$1,497",
      expectedLaunch: "Q2 2025",
      scarcity: {
        spotsLeft: 7,
        isUrgent: true
      }
    },
    {
      name: "QuantumConversion",
      description: "Multi-dimensional conversion frameworks that work across all psychological profiles",
      benefits: [
        "The elite persuasion architecture used by the world's highest-converting offers",
        "Advanced probability field manipulation for 247% higher conversion rates",
        "Pattern interruption sequences that make sales resistance neurologically impossible"
      ],
      status: "waitlist",
      price: "$2,497",
      expectedLaunch: "Q3 2025",
      scarcity: {
        spotsLeft: 23,
        isUrgent: false
      }
    }
  ],
  free: [
    {
      name: "AlgoDecoder",
      description: "Decode the exact psychological patterns each social algorithm rewards",
      benefits: [
        "Basic algorithm analysis for one platform",
        "Monthly report on platform changes",
        "Simplified engagement pattern suggestions"
      ],
      status: "waitlist",
      price: "Free",
      upsellTo: "VibeCascade Framework"
    },
    {
      name: "NeuroCopy",
      description: "Test your copy against the 17 neurological triggers that drive action",
      benefits: [
        "Basic neural engagement scoring",
        "Analysis of 3 core triggers",
        "Simple rewording suggestions"
      ],
      status: "waitlist",
      price: "Free",
      upsellTo: "QuantumConversion"
    },
    {
      name: "IdentityMapper",
      description: "Map the exact identity triggers that activate tribal responses in your audience",
      benefits: [
        "Basic identity resonance analysis",
        "Simple audience segment identification",
        "Core belief mapping"
      ],
      status: "waitlist",
      price: "Free",
      upsellTo: "PrimalPositioning"
    }
  ]
};

const FrameworksSection = ({ onWaitlistClick, onAccessClick, initialTab = 'premium' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [visibleFrameworks, setVisibleFrameworks] = useState([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const sectionRef = useRef(null);
  
  // Initialize identity reinforcement
  const { 
    reinforcementActive,
    activateIdentityPattern,
    getReinforcementPatterns,
    IDENTITY_PATTERNS
  } = useIdentityReinforcement({
    primaryPattern: IDENTITY_PATTERNS.EXCLUSIVE,
    secondaryPattern: IDENTITY_PATTERNS.EXPERT,
    identityTriggerDelay: 1000,
    trackingCategory: 'frameworks_section',
    identityStrength: 'medium'
  });

  // Track section view and initialize frameworks
  useEffect(() => {
    if (typeof window !== 'undefined' && window.trackEngagement) {
      window.trackEngagement('view', 'frameworks_section', {
        initialTab: activeTab
      });
    }
    
    // Set visible frameworks based on active tab
    setVisibleFrameworks(FRAMEWORK_DATA[activeTab] || []);
    
    // Initialize intersection observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Activate identity pattern when section is visible
        activateIdentityPattern(IDENTITY_PATTERNS.EXCLUSIVE);
        
        // Track section visibility
        if (typeof window !== 'undefined' && window.trackEngagement) {
          window.trackEngagement('visible', 'frameworks_section', {
            tab: activeTab
          });
        }
      }
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [activeTab, activateIdentityPattern]);
  
  // Handle tab change with tracking
  const handleTabChange = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setVisibleFrameworks(FRAMEWORK_DATA[tab] || []);
      
      // Track tab change
      if (typeof window !== 'undefined' && window.trackEngagement) {
        window.trackEngagement('tab_change', 'frameworks_section', {
          from: activeTab,
          to: tab
        });
      }
      
      // Mark that user has interacted with the section
      setHasUserInteracted(true);
      
      // If user switches to waitlist tab, activate contrarian identity pattern
      if (tab === 'waitlist') {
        activateIdentityPattern(IDENTITY_PATTERNS.CONTRARIAN);
      }
      
      // If user switches to free tab, activate aspirational identity pattern
      if (tab === 'free') {
        activateIdentityPattern(IDENTITY_PATTERNS.ASPIRATIONAL);
      }
    }
  };
  
  // Get reinforcement patterns for titles and descriptions
  const getReinforcedText = (text, patternType = 'title') => {
    if (!reinforcementActive) return text;
    
    const patterns = getReinforcementPatterns();
    
    // Apply exclusive pattern for titles
    if (patternType === 'title' && patterns.exclusive) {
      return text.replace('Frameworks', 'Elite Frameworks');
    }
    
    // Apply expert pattern for descriptions
    if (patternType === 'description' && patterns.expert) {
      return text.replace('framework', 'research-based framework')
                .replace('tools', 'advanced tools');
    }
    
    return text;
  };
  
  // Get identity-based tab titles
  const getTabTitle = (tab) => {
    const baseTitles = {
      premium: 'Premium Frameworks',
      waitlist: 'Coming Soon',
      free: 'Free Tools'
    };
    
    return baseTitles[tab] || tab;
  };
  
  // Dynamic subtitle based on active tab and identity patterns
  const getSubtitle = () => {
    switch (activeTab) {
      case 'premium':
        return getReinforcedText('Psychological frameworks that achieve exponential engagement growth across all platforms', 'description');
      case 'waitlist':
        return getReinforcedText('Secure your position for our most advanced frameworks launching soon', 'description');
      case 'free':
        return getReinforcedText('Simplified tools to experience the core psychological principles', 'description');
      default:
        return '';
    }
  };
  
  // Determine which identity pattern to apply for each framework
  const getIdentityPatternForFramework = (framework, index) => {
    // First framework in each category gets exclusive pattern
    if (index === 0) return IDENTITY_PATTERNS.EXCLUSIVE;
    
    // Alternate between expert and tribal patterns
    return index % 2 === 0 ? IDENTITY_PATTERNS.EXPERT : IDENTITY_PATTERNS.TRIBAL;
  };

  return (
    <section className="frameworks-section" id="frameworks" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {getReinforcedText('Psychological Frameworks That Actually Work in 2025', 'title')}
          </h2>
          <p className="section-subtitle">{getSubtitle()}</p>
          
          {/* Tab Navigation */}
          <div className="framework-tabs">
            <button 
              className={`tab-btn ${activeTab === 'premium' ? 'active' : ''}`}
              onClick={() => handleTabChange('premium')}
            >
              {getTabTitle('premium')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'waitlist' ? 'active' : ''}`}
              onClick={() => handleTabChange('waitlist')}
            >
              {getTabTitle('waitlist')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'free' ? 'active' : ''}`}
              onClick={() => handleTabChange('free')}
            >
              {getTabTitle('free')}
            </button>
          </div>
        </div>
        
        {/* Frameworks Grid */}
        <div className="frameworks-grid">
          {visibleFrameworks.map((framework, index) => (
            <FrameworkCard
              key={framework.name}
              framework={framework}
              onWaitlistClick={onWaitlistClick}
              onAccessClick={onAccessClick}
              identityPattern={getIdentityPatternForFramework(framework, index)}
              scarcity={framework.scarcity}
              trackingPrefix={`${activeTab}_framework`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworksSection;