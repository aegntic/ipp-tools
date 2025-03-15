import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CognitiveDissonanceActivator } from '@ipp-tools/core';
import { PsychologicalVisualizer } from '@ipp-tools/ui';

const NotFoundPage = () => {
  // Track 404 errors
  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'error_pageview',
        error_type: '404',
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <CognitiveDissonanceActivator type="curiosity" intensity="medium">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">You've Discovered A Cognitive Gap</h2>
          </CognitiveDissonanceActivator>
          
          <p className="not-found-message">
            The path you're looking for doesn't exist, but like any elite creator, you can quickly pivot to a new opportunity.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn btn-gradient btn-lg">
              Return to Homepage
            </Link>
            <Link to="/frameworks" className="btn btn-outline btn-lg">
              Explore Frameworks
            </Link>
          </div>
        </div>
        
        <div className="not-found-visualization">
          <PsychologicalVisualizer
            type="error"
            variant="cognitive"
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;