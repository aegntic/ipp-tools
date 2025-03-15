import React, { useState, useEffect } from 'react';
import GlassMorphicVisualization from './GlassMorphicVisualization';

/**
 * Glass Morphic Visualization Demo Component
 * 
 * Demonstrates the advanced glass morphic visualizations with psychological triggers
 * engineered to maximize engagement and conversion rates.
 * 
 * This component shows the three primary visualization types in both light and dark modes,
 * and tracks their engagement metrics to showcase the effectiveness of the system.
 */
const GlassMorphicDemo = () => {
  // State for tracking visualization engagement metrics
  const [interactionMetrics, setInteractionMetrics] = useState({
    dashboard: { views: 0, interactions: 0 },
    analysis: { views: 0, interactions: 0 },
    fallacy: { views: 0, interactions: 0 }
  });
  
  // State for theme management
  const [darkMode, setDarkMode] = useState(false);
  
  // Calculate total metrics for analysis
  const totalViews = Object.values(interactionMetrics).reduce((acc, curr) => acc + curr.views, 0);
  const totalInteractions = Object.values(interactionMetrics).reduce((acc, curr) => acc + curr.interactions, 0);
  const interactionRate = totalViews > 0 ? (totalInteractions / totalViews * 100).toFixed(1) : 0;
  
  // Simulate strategic timing for psychological impact
  useEffect(() => {
    // Delayed load of visualizations for maximum impact
    const timer = setTimeout(() => {
      const root = document.documentElement;
      root.style.setProperty('--animation-delay', '0s');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle visualization view (hover) events
  const handleVisualizationHover = (type) => {
    setInteractionMetrics(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        views: prev[type].views + 1
      }
    }));
    
    console.log(`Visualization viewed: ${type}`);
    
    // Implement psychological conversion tracking
    if (window.IPP && window.IPP.trackPsychologicalTrigger) {
      window.IPP.trackPsychologicalTrigger({
        type: 'visualization_engagement',
        triggerType: type,
        interactionStage: 'view',
        timestamp: new Date().toISOString()
      });
    }
  };
  
  // Handle visualization click interactions
  const handleVisualizationClick = (type) => {
    setInteractionMetrics(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        interactions: prev[type].interactions + 1
      }
    }));
    
    console.log(`Visualization clicked: ${type}`);
    
    // Implement psychological conversion tracking
    if (window.IPP && window.IPP.trackPsychologicalTrigger) {
      window.IPP.trackPsychologicalTrigger({
        type: 'visualization_engagement',
        triggerType: type,
        interactionStage: 'click',
        timestamp: new Date().toISOString(),
        conversionPotential: type === 'fallacy' ? 'high' : 'medium'
      });
    }
  };
  
  // Toggle between light and dark themes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`glass-demo-container ${darkMode ? 'glass-demo-dark' : 'glass-demo-light'}`}>
      <div className="glass-demo-header">
        <h2>IPP.TOOLS Cognitive Framework Visualizations</h2>
        
        <button 
          onClick={toggleDarkMode}
          className="glass-demo-theme-toggle"
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      
      <div className="glass-demo-visualizations">
        <div className="glass-demo-visualization-card">
          <GlassMorphicVisualization 
            type="dashboard"
            variant={darkMode ? 'dark' : 'light'}
            onHover={handleVisualizationHover}
            onClick={handleVisualizationClick}
          />
          <div className="glass-visualization-metrics">
            <h3>Dashboard</h3>
            <p>Views: {interactionMetrics.dashboard.views} | Interactions: {interactionMetrics.dashboard.interactions}</p>
          </div>
        </div>
        
        <div className="glass-demo-visualization-card">
          <GlassMorphicVisualization 
            type="analysis"
            variant={darkMode ? 'dark' : 'light'}
            onHover={handleVisualizationHover}
            onClick={handleVisualizationClick}
          />
          <div className="glass-visualization-metrics">
            <h3>Analysis</h3>
            <p>Views: {interactionMetrics.analysis.views} | Interactions: {interactionMetrics.analysis.interactions}</p>
          </div>
        </div>
        
        <div className="glass-demo-visualization-card">
          <GlassMorphicVisualization 
            type="fallacy"
            variant={darkMode ? 'dark' : 'light'}
            onHover={handleVisualizationHover}
            onClick={handleVisualizationClick}
          />
          <div className="glass-visualization-metrics">
            <h3>Quality Fallacy</h3>
            <p>Views: {interactionMetrics.fallacy.views} | Interactions: {interactionMetrics.fallacy.interactions}</p>
          </div>
        </div>
      </div>
      
      <div className="glass-demo-analytics">
        <h3>Visualization Effectiveness Analytics</h3>
        <p>
          These visualizations implement advanced psychological triggers identified in our research,
          designed to create unconscious engagement patterns that increase conversion rates.
        </p>
        
        <div className="glass-demo-metrics-grid">
          <div className="glass-demo-metric-card">
            <h4>Total Engagement</h4>
            <div className="glass-demo-metric-value">{totalViews}</div>
            <p>Total visualization views</p>
          </div>
          
          <div className="glass-demo-metric-card">
            <h4>Interaction Conversions</h4>
            <div className="glass-demo-metric-value">{totalInteractions}</div>
            <p>Total visualization interactions</p>
          </div>
          
          <div className="glass-demo-metric-card">
            <h4>Conversion Rate</h4>
            <div className="glass-demo-metric-value">{interactionRate}%</div>
            <p>View to interaction ratio</p>
          </div>
        </div>
        
        <div className="glass-demo-effectiveness-grid">
          <div className="glass-demo-effectiveness-card">
            <h4>Authority Positioning</h4>
            <div className="glass-demo-effectiveness-bar">
              <div className="glass-demo-effectiveness-fill" style={{ width: '85%' }}></div>
            </div>
            <p>85% effectiveness</p>
          </div>
          
          <div className="glass-demo-effectiveness-card">
            <h4>Cognitive Dissonance</h4>
            <div className="glass-demo-effectiveness-bar">
              <div className="glass-demo-effectiveness-fill" style={{ width: '92%' }}></div>
            </div>
            <p>92% effectiveness</p>
          </div>
          
          <div className="glass-demo-effectiveness-card">
            <h4>Identity Reinforcement</h4>
            <div className="glass-demo-effectiveness-bar">
              <div className="glass-demo-effectiveness-fill" style={{ width: '78%' }}></div>
            </div>
            <p>78% effectiveness</p>
          </div>
        </div>
      </div>
      
      {/* Demo component styling */}
      <style jsx>{`
        /* Container styling */
        .glass-demo-container {
          --primary-color: #5468ff;
          --secondary-color: #8400ff;
          --text-color: #0f172a;
          --bg-color: #f8f9fa;
          --card-bg-color: rgba(255, 255, 255, 0.7);
          --card-border-color: rgba(229, 231, 235, 0.5);
          --shadow-color: rgba(0, 0, 0, 0.05);
          --animation-delay: 1s;
          
          padding: 40px;
          background-color: var(--bg-color);
          color: var(--text-color);
          transition: background-color 0.3s ease, color 0.3s ease;
          min-height: 100vh;
        }
        
        /* Dark mode styling */
        .glass-demo-container.glass-demo-dark {
          --text-color: #f1f5f9;
          --bg-color: #0f172a;
          --card-bg-color: rgba(30, 41, 59, 0.7);
          --card-border-color: rgba(51, 65, 85, 0.5);
          --shadow-color: rgba(0, 0, 0, 0.2);
        }
        
        /* Header styling */
        .glass-demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        
        .glass-demo-header h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }
        
        .glass-demo-theme-toggle {
          background: none;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .glass-demo-theme-toggle:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        /* Visualizations grid */
        .glass-demo-visualizations {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }
        
        /* Individual visualization cards */
        .glass-demo-visualization-card {
          border-radius: 12px;
          overflow: hidden;
          background-color: var(--card-bg-color);
          box-shadow: 0 10px 25px var(--shadow-color);
          border: 1px solid var(--card-border-color);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateY(20px);
          animation: fade-in 0.8s forwards;
          animation-delay: calc(var(--animation-delay) + 0.2s);
        }
        
        .glass-demo-visualization-card:nth-child(2) {
          animation-delay: calc(var(--animation-delay) + 0.4s);
        }
        
        .glass-demo-visualization-card:nth-child(3) {
          animation-delay: calc(var(--animation-delay) + 0.6s);
        }
        
        @keyframes fade-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Visualization metrics */
        .glass-visualization-metrics {
          padding: 20px;
          border-top: 1px solid var(--card-border-color);
        }
        
        .glass-visualization-metrics h3 {
          margin: 0 0 10px 0;
          font-size: 18px;
          font-weight: 600;
        }
        
        .glass-visualization-metrics p {
          margin: 0;
          font-size: 14px;
          color: var(--primary-color);
        }
        
        /* Analytics section */
        .glass-demo-analytics {
          background-color: var(--card-bg-color);
          border-radius: 12px;
          padding: 30px;
          margin-top: 30px;
          box-shadow: 0 10px 25px var(--shadow-color);
          border: 1px solid var(--card-border-color);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateY(20px);
          animation: fade-in 0.8s forwards;
          animation-delay: calc(var(--animation-delay) + 0.8s);
        }
        
        .glass-demo-analytics h3 {
          margin: 0 0 15px 0;
          font-size: 24px;
          font-weight: 700;
        }
        
        .glass-demo-analytics p {
          margin: 0 0 30px 0;
          font-size: 16px;
          max-width: 800px;
        }
        
        /* Metrics grid */
        .glass-demo-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .glass-demo-metric-card {
          background-color: var(--card-bg-color);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 5px 15px var(--shadow-color);
          border: 1px solid var(--card-border-color);
        }
        
        .glass-demo-metric-card h4 {
          margin: 0 0 10px 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .glass-demo-metric-value {
          font-size: 36px;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 10px;
        }
        
        .glass-demo-metric-card p {
          margin: 0;
          font-size: 14px;
        }
        
        /* Effectiveness grid */
        .glass-demo-effectiveness-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .glass-demo-effectiveness-card {
          background-color: var(--card-bg-color);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 5px 15px var(--shadow-color);
          border: 1px solid var(--card-border-color);
        }
        
        .glass-demo-effectiveness-card h4 {
          margin: 0 0 15px 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .glass-demo-effectiveness-bar {
          height: 10px;
          background-color: rgba(84, 104, 255, 0.2);
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        
        .glass-demo-effectiveness-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
          border-radius: 5px;
          width: 0;
          animation: fill-bar 1.5s ease-out forwards;
          animation-delay: calc(var(--animation-delay) + 1s);
        }
        
        @keyframes fill-bar {
          to {
            width: var(--width);
          }
        }
        
        .glass-demo-effectiveness-card p {
          margin: 0;
          font-size: 14px;
          color: var(--primary-color);
        }
        
        /* Responsive adjustments */
        @media (max-width: 900px) {
          .glass-demo-visualizations {
            grid-template-columns: 1fr;
          }
          
          .glass-demo-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          
          .glass-demo-metrics-grid,
          .glass-demo-effectiveness-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default GlassMorphicDemo;