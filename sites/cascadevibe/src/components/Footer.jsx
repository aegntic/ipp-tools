import React from 'react';
import './Footer.css';

/**
 * Site footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/assets/images/cascadevibe-logo-white.svg" alt="CascadeVibe" className="footer-logo" />
            <p className="footer-tagline">Intelligence. Psychology. Persuasion.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Framework</h4>
              <ul>
                <li><a href="#methodology">Methodology</a></li>
                <li><a href="#results">Results</a></li>
                <li><a href="#testimonials">Stories</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:hello@cascadevibe.com">hello@cascadevibe.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {currentYear} CascadeVibe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
