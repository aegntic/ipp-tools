import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ framework = null, minimal = false, openWaitlistModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${minimal ? 'minimal' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            {framework === 'vibecascade' ? (
              <span className="framework-logo">VibeCascade</span>
            ) : (
              <span className="main-logo">IPP.TOOLS</span>
            )}
          </Link>
          
          {!minimal && (
            <nav className="main-nav">
              <ul>
                <li><a href="#frameworks">Frameworks</a></li>
                <li><a href="#philosophy">Philosophy</a></li>
                <li><a href="#results">Results</a></li>
                <li><a href="#testimonials">Stories</a></li>
              </ul>
            </nav>
          )}
          
          {openWaitlistModal && (
            <div className="header-cta">
              <button 
                className="btn btn-primary" 
                onClick={() => openWaitlistModal(framework)}
              >
                {framework ? 'Access Framework' : 'Join Waitlist'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;