import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

// Using local logo from public folder
const logoImage = '/assets/logo.png';
const fallbackLogo = '/assets/logo.png';

const Header = ({ cart = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavClick = (sectionId) => {
    setActiveLink(sectionId);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling for hash links
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      // Wait for the home page to load before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100, // Adjust offset as needed
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100, // Adjust offset as needed
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
    setActiveLink(sectionId);
  };

  // Update active link based on scroll position
  useEffect(() => {
    const sections = ['home', 'about', 'products', 'equipment'];
    
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section);
            window.history.replaceState(null, '', `#${section}`);
            break;
          }
        }
      }
    };

    // Initial check on mount
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle hash in URL on initial load
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      if (sections.includes(sectionId)) {
        setActiveLink(sectionId);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView();
          }
        }, 100);
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, location.hash]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <div className="logo-container">
            <img 
              src={logoImage} 
              alt="Coffee Labs" 
              className="logo-image"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                handleNavClick('home');
                navigate('/');
              }}
              onError={(e) => {
                e.target.src = fallbackLogo;
                // Fallback if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
              style={{ cursor: 'pointer' }}
            />
            <span className="logo-text">Coffee Labs</span>
            {/* Fallback text if image fails */}
            <span className="logo-fallback">
              Coffee Labs
            </span>
          </div>
        </div>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <button 
            className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
            onClick={() => {
              scrollToSection('home');
              handleNavClick('home');
            }}
          >
            Home
          </button>
          
          <button 
            className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
            onClick={() => {
              scrollToSection('about');
              handleNavClick('about');
            }}
          >
            About
          </button>
          
          <Link 
            to="/products" 
            className={`nav-link ${activeLink === 'products' ? 'active' : ''} products-link`}
            onClick={() => handleNavClick('products')}
          >
            Products
          </Link>
          
         
          
          <button 
            className={`nav-link ${activeLink === 'equipment' ? 'active' : ''}`}
            onClick={() => {
              scrollToSection('equipment');
              handleNavClick('equipment');
            }}
          >
            Equipment
          </button>
          
        
        </div>

        <button 
          className="mobile-menu-button" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;