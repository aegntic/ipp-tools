/**
 * Frameworks Demo Page
 * 
 * This page demonstrates the FrameworksSection component in isolation,
 * allowing for testing and prototyping of the psychological triggers
 * and conversion optimization.
 */

import React, { useState } from 'react';
import { FrameworksSection } from '../components/ipp';

const FrameworksDemoPage = () => {
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(null);
  
  // Handle waitlist button clicks
  const handleWaitlistClick = (framework) => {
    console.log('Waitlist clicked for:', framework.name);
    setSelectedFramework(framework);
    setWaitlistModalOpen(true);
    
    // Track in console for demonstration
    console.log('Tracking: waitlist_click', {
      framework: framework.name,
      price: framework.price,
      status: framework.status
    });
  };
  
  // Handle access button clicks
  const handleAccessClick = (framework) => {
    console.log('Access clicked for:', framework.name);
    
    // Simulate navigation
    alert(`Navigating to ${framework.name} framework access page`);
    
    // Track in console for demonstration
    console.log('Tracking: access_click', {
      framework: framework.name,
      price: framework.price
    });
  };
  
  // Basic modal for demonstration purposes
  const WaitlistModal = () => {
    if (!waitlistModalOpen || !selectedFramework) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          maxWidth: '500px',
          width: '90%'
        }}>
          <h2>Join the {selectedFramework.name} Waitlist</h2>
          <p>{selectedFramework.description}</p>
          
          <div style={{ marginTop: '2rem' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #ccc'
              }}
            />
            
            <button
              style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                backgroundColor: '#5468ff',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}
            >
              Secure Your Spot
            </button>
            
            <button
              onClick={() => setWaitlistModalOpen(false)}
              style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                color: '#5468ff',
                border: '1px solid #5468ff',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <header style={{
        padding: '2rem 0',
        textAlign: 'center',
        borderBottom: '1px solid #eee'
      }}>
        <h1>IPP.TOOLS Frameworks</h1>
        <p>Psychological frameworks for exponential digital growth</p>
      </header>
      
      <main>
        <FrameworksSection 
          onWaitlistClick={handleWaitlistClick}
          onAccessClick={handleAccessClick}
          initialTab="waitlist" // Change this to test different tabs
        />
      </main>
      
      <WaitlistModal />
    </div>
  );
};

export default FrameworksDemoPage;