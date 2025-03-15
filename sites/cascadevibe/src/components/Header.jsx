import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

/**
 * Site header component with navigation
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track mobile menu interaction
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Track event
    if (window.ippTracker) {
      window.ippTracker.trackEvent('toggle_mobile_menu', {
        state: !isMobileMenuOpen ? 'open' : 'closed'
      });
    }
  };
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            <img src="/assets/images/cascadevibe-logo.svg" alt="CascadeVibe" />
          </Link>
          
          <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li><a href="#frameworks" onClick={() => setIsMobileMenuOpen(false)}>Framework</a></li>
              <li><a href="#results" onClick={() => setIsMobileMenuOpen(false)}>Results</a></li>
              <li><a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a></li>
            </ul>
          </nav>
          
          <div className="header-cta">
            <a 
              href="#pricing" 
              className="btn btn-primary"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (window.ippTracker) {
                  window.ippTracker.trackEvent('header_cta_click');
                }
              }}
            >
              Get Started
            </a>
            
            <button 
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
