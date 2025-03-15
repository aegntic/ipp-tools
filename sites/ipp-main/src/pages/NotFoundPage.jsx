import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCognitiveDissonance } from '@ipp-tools/core';

const NotFoundPage = () => {
  const { activateTrigger } = useCognitiveDissonance();
  
  useEffect(() => {
    // Activate cognitive dissonance trigger to create curiosity gap
    activateTrigger('cognitiveDissonance', 'high');
    activateTrigger('curiosity', 'high');
    
    // Track 404 page view with additional context
    if (window.ippTools?.trackPageView) {
      window.ippTools.trackPageView('/404', {
        referrer: document.referrer,
        path: window.location.pathname,
        errorType: '404'
      });
    }
  }, [activateTrigger]);

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="error-content">
          <h1 className="error-title">You've Discovered A Cognitive Gap</h1>
          
          <div className="error-code">404</div>
          
          <p className="error-message">
            The path you're looking for doesn't exist, but like any elite creator, you can quickly pivot to a new opportunity.
          </p>
          
          <div className="error-actions">
            <Link to="/" className="btn btn-gradient">
              Return to Homepage
            </Link>
            
            <Link to="/frameworks" className="btn btn-outline">
              Explore Frameworks
            </Link>
          </div>
          
          <div className="error-suggestion">
            <h3>While you're here, did you know?</h3>
            <p>Content quality explains only 37% of growth variance between creators. The other 63% comes from psychological frameworks that most people will never discover.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;