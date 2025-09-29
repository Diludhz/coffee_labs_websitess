import React, { useState, useEffect } from 'react';
import { FaApple, FaGooglePlay, FaCheck, FaStar, FaGift, FaMobile } from 'react-icons/fa';
import '../styles/AppDownload.css';
import screenshot1 from '../Assets/screenshot1.jpg';
import screenshot2 from '../Assets/screenshot2.jpg';

const AppDownload = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveSlide(prev => (prev + 1) % 2);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering]);


  return (
    <section className="app-download">
      <div className="app-download-container">
        {/* Content Section */}
        <div className="app-download-content">
          <div className="content-wrapper">
            <div className="badge">
              <FaMobile className="badge-icon" />
              <span>New App</span>
            </div>
            <h2>
              <span className="gradient-text">Download Our</span>
              <span className="highlight-text">Mobile App</span>
            </h2>
            <p>Get access to exclusive offers and manage your coffee experience on the go with our mobile app. Order ahead, earn rewards, and discover new flavors.</p>
            
            <div className="stats">
              <div className="stat">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Downloads</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>

            <div className="download-buttons">
              <a 
                href="https://apps.apple.com" 
                className="download-btn app-store"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <div className="btn-inner">
                  <FaApple className="store-icon" />
                  <div className="btn-text">
                    <span className="small-text">Download on the</span>
                    <span className="store-name">App Store</span>
                  </div>
                </div>
                <div className="btn-glow"></div>
              </a>
              <a 
                href="https://play.google.com" 
                className="download-btn play-store"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <div className="btn-inner">
                  <FaGooglePlay className="store-icon" />
                  <div className="btn-text">
                    <span className="small-text">Get it on</span>
                    <span className="store-name">Google Play</span>
                  </div>
                </div>
                <div className="btn-glow"></div>
              </a>
            </div>
          </div>
        </div>

        {/* 3D Phone Preview Section */}
        <div className="app-preview">
          <div 
            className="phone-mockup-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Main Phone */}
            <div className={`phone-mockup main-phone ${activeSlide === 0 ? 'slide-1' : 'slide-2'}`}>
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <img 
                    src={activeSlide === 0 ? screenshot1 : screenshot2} 
                    alt={`App screen ${activeSlide + 1}`} 
                    className="app-screenshot" 
                  />
                  <div className="screen-overlay"></div>
                </div>
                <div className="phone-home"></div>
              </div>
              <div className="phone-reflect"></div>
            </div>

            {/* Floating Elements */}
            <div className="floating-element element-1">
              <FaCheck className="floating-icon" />
            </div>
            <div className="floating-element element-2">
              <FaStar className="floating-icon" />
            </div>
            <div className="floating-element element-3">
              <FaGift className="floating-icon" />
            </div>

            {/* Background Effects */}
            <div className="bg-blur-1"></div>
            <div className="bg-blur-2"></div>
          </div>


          {/* Screenshot Indicator */}
          <div className="screenshot-indicator">
            {[0, 1].map((index) => (
              <button
                key={index}
                className={`indicator-dot ${activeSlide === index ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show screen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
    </section>
  );
};

export default AppDownload;