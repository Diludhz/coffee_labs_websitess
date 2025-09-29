import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import '../styles/AppDownload.css';

// App screenshot
const appScreenshot = '/assets/appdownloard-.png';

const AppDownload = () => {
  // No need for state since we're showing both phones side by side


  return (
    <section className="app-download">
      <div className="app-download-container">
        {/* Content Section */}
        <div className="app-download-content">
          <div className="content-wrapper">
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
              </a>
            </div>
          </div>
        </div>

        {/* App Screenshot */}
        <div className="screenshots-container">
          <img 
            src={appScreenshot} 
            alt="Coffee Labs App" 
            className="app-screenshot"
          />
        </div>
      </div>

      {/* Background Elements */}
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
    </section>
  );
};

export default AppDownload;