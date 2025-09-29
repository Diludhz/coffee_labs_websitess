import React from 'react';
import { FaApple, FaGooglePlay, FaMobile } from 'react-icons/fa';
import '../styles/AppDownload.css';

// App screenshots - replace with your actual screenshots
const screenshot1 = 'https://via.placeholder.com/300x600/4A6FA5/FFFFFF?text=App+Screen+1';
const screenshot2 = 'https://via.placeholder.com/300x600/4A6FA5/FFFFFF?text=App+Screen+2';

const AppDownload = () => {
  // No need for state since we're showing both phones side by side


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

        {/* iPhone Frames Section */}
        <div className="phone-showcase">
          {/* First iPhone Frame */}
          <div className="iphone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <img 
                src={screenshot1} 
                alt="App screenshot 1" 
                className="app-screenshot"
              />
            </div>
            <div className="phone-home-indicator"></div>
          </div>
          
          {/* Second iPhone Frame */}
          <div className="iphone-frame second-phone">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <img 
                src={screenshot2} 
                alt="App screenshot 2"
                className="app-screenshot"
              />
            </div>
            <div className="phone-home-indicator"></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
    </section>
  );
};

export default AppDownload;