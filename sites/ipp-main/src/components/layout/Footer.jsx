import React from 'react';
import { Link } from 'react-router-dom';
import { AuthorityPositioningTrigger } from '@ipp-tools/core';
import { PsychologicalVisualizer } from '@ipp-tools/ui';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer navigation with psychological categorization
  const footerLinks = {
    company: [
      { path: "/about", label: "About" },
      { path: "/team", label: "Team" },
      { path: "/research", label: "Research" }
    ],
    legal: [
      { path: "/privacy", label: "Privacy Policy" },
      { path: "/terms", label: "Terms of Service" }
    ],
    contact: [
      { path: "mailto:hello@ipp.tools", label: "hello@ipp.tools", external: true }
    ],
    frameworks: [
      { path: "https://vibecascade.ipp.tools", label: "VibeCascade Framework", external: true },
      { path: "/neuralnarrative", label: "NeuralNarrative" },
      { path: "/primalposition", label: "PrimalPositioning" },
      { path: "/quantumconversion", label: "QuantumConversion" }
    ]
  };
  
  // Social proof metrics for authority positioning
  const socialProofMetrics = [
    { value: "15,000+", label: "Elite Creators" },
    { value: "27", label: "Content Categories" },
    { value: "97.8%", label: "Success Rate" }
  ];
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <PsychologicalVisualizer 
              type="logo" 
              variant="white"
              className="footer-logo"
              alt="IPP.TOOLS"
              width={120}
              height={40}
            />
            <p className="footer-tagline">Intelligence. Psychology. Persuasion.</p>
            
            <AuthorityPositioningTrigger intensity="medium">
              <div className="footer-metrics">
                {socialProofMetrics.map((metric, index) => (
                  <div key={index} className="footer-metric">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </AuthorityPositioningTrigger>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Frameworks</h4>
              <ul>
                {footerLinks.frameworks.map((link, index) => (
                  <li key={index}>
                    {link.external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.path}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                {footerLinks.contact.map((link, index) => (
                  <li key={index}>
                    <a href={link.path}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {currentYear} IPP.TOOLS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;