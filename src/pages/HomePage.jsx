import React, { useState } from 'react';
import Header from '../components/common/Header';
import FrameworksSection from '../components/ipp/FrameworksSection';
import WaitlistForm from '../components/common/WaitlistForm';
import '../styles/waitlist.css';

const HomePage = () => {
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const openWaitlistModal = (framework = null) => {
    setSelectedFramework(framework);
    setShowModal(true);
  };
  
  return (
    <div className="ipp-homepage">
      <Header openWaitlistModal={openWaitlistModal} />
      
      <main>
        {/* Hero section would normally go here */}
        
        <FrameworksSection openWaitlistModal={openWaitlistModal} />
        
        {/* Other sections like Philosophy, Results, Testimonials would go here */}
        
        {/* For demo purposes, let's display the waitlist form directly */}
        <div className="container" style={{ padding: '50px 0' }}>
          <WaitlistForm 
            frameworkName={selectedFramework}
            frameworkDescription={
              selectedFramework === 'VibeCascade Framework' 
                ? 'The psychological framework elite creators use to achieve exponential engagement growth'
                : selectedFramework === 'NeuralNarrative'
                ? 'Craft stories that bypass conscious filtering and speak directly to the limbic system'
                : selectedFramework === 'PrimalPositioning'
                ? 'Evolutionary psychology-based positioning strategies that activate tribal defense mechanisms'
                : selectedFramework === 'QuantumConversion'
                ? 'Multi-dimensional conversion frameworks that work across all psychological profiles'
                : 'Get priority access to our advanced psychological frameworks that are changing how elite creators approach digital growth.'
            }
            estimatedLaunch={
              selectedFramework === 'NeuralNarrative' || selectedFramework === 'QuantumConversion'
                ? 'Q3 2025'
                : selectedFramework === 'PrimalPositioning'
                ? 'Q2 2025'
                : ''
            }
          />
        </div>
      </main>
      
      {/* Footer would normally go here */}
    </div>
  );
};

export default HomePage;