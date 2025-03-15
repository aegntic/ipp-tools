import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import FrameworksPage from './pages/FrameworksPage';
import WaitlistPage from './pages/WaitlistPage';
import NotFoundPage from './pages/NotFoundPage';

// Psychological Trigger Components
import { CognitiveDissonanceProvider, useCognitiveDissonance } from '@ipp-tools/core';
import { PsychologicalVisualizationLoader } from '@ipp-tools/ui';

function App() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Track page transitions for psychological triggers
  useEffect(() => {
    // Reset scroll position on page change
    window.scrollTo(0, 0);
    
    // Apply cognitive triggers on page transition
    const triggerIntensity = localStorage.getItem('cognitive_trigger_intensity') || 'medium';
    
    // Track page view with psychological context
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname,
        cognitive_intensity: triggerIntensity,
        visitor_segment: localStorage.getItem('visitor_segment') || 'new',
      });
    }
    
    // Set loaded state for transition effects
    setIsLoaded(true);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  
  return (
    <CognitiveDissonanceProvider>
      <PsychologicalVisualizationLoader />
      
      <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/frameworks" element={<FrameworksPage />} />
            <Route path="/waitlist/:framework?" element={<WaitlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </CognitiveDissonanceProvider>
  );
}

export default App;