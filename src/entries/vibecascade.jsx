import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import VibeCascadeApp from '../apps/VibeCascadeApp.jsx'
import '../styles/globals.css'
import '../styles/header.css'
import '../styles/frameworks-section.css'
import tracking from '../utils/tracking.js'

// Add framework identifier to body for tracking
document.body.setAttribute('data-framework', 'vibecascade');

// Initialize tracking with framework-specific metadata
const trackingId = tracking.initialize();

// Track framework-specific entry
tracking.trackFrameworkEvent('vibecascade', 'framework_entry', {
  entry_point: window.location.pathname,
  tracking_id: trackingId
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <VibeCascadeApp />
    </BrowserRouter>
  </React.StrictMode>,
)