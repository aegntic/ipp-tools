import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CascadeVibePage from './pages/CascadeVibePage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

/**
 * Main App component for CascadeVibe site
 * Handles routing and global layout
 */
function App() {
  // Track page views across routes
  useEffect(() => {
    // Initialize tracking on mount
    if (window.ippTracker) {
      window.ippTracker.trackPageView({
        app_version: '1.0.0',
        site: 'cascadevibe'
      });
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<CascadeVibePage />} />
          {/* Additional routes can be added here as the site expands */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
