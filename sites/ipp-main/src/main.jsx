import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/main.scss';

// Initialize cognitive tracking system
import { initializeCognitiveTracking } from '@ipp-tools/core';
initializeCognitiveTracking({
  siteId: 'ipp-main',
  trackingDomains: ['ipp.tools', 'vibecascade.ipp.tools'],
  cognitiveIdentifiers: true,
  psychologicalTriggers: {
    cognitiveDissonance: true,
    identityReinforcement: true,
    algorithmicResonance: true,
    precisionCommunication: true,
    sustainedEngagement: true,
    authorityPositioning: true
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);