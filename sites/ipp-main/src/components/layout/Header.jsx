import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CognitiveDissonanceActivator } from '@ipp-tools/core';
import { PsychologicalVisualizer } from '@ipp-tools/ui';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Implement scroll listener for header state changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Generate navigation items with psychological impact
  const navItems = [
    { 
      path: "/", 
      label: "Home",
      psychological: {
        type: "neutral"
      }
    },
    { 
      path: "/frameworks", 
      label: "Frameworks",
      psychological: {
        type: "identity",
        intensity: "medium"
      }
    },
    { 
      path: "/research", 
      label: "Research",
      psychological: {
        type: "authority",
        intensity: "high"
      }
    },
    { 
      path: "/about", 
      label: "About",
      psychological: {
        type: "trust",
        intensity: "low"
      }
    }
  ];
  
  return (
    <header className={`ipp-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            <PsychologicalVisualizer 
              type="logo" 
              variant="standard" 
              className="logo-image"
              alt="IPP.TOOLS"
              width={40}
              height={40}
            />
            <span className="logo-text">IPP.TOOLS</span>
          </Link>
          
          <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <CognitiveDissonanceActivator
                    type={item.psychological.type}
                    intensity={item.psychological.intensity}
                  >
                    <Link 
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                    >
                      {item.label}
                    </Link>
                  </CognitiveDissonanceActivator>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="header-cta">
            <Link 
              to="/waitlist" 
              className="btn btn-primary strategic-hover"
            >
              Join Waitlist
            </Link>
            
            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;