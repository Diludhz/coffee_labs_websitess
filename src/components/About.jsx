import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2>About Coffee Labs</h2>
          <p>
            At Coffee Labs, we're passionate about perfecting every aspect of the coffee experience.
            From sourcing the finest equipment to providing expert maintenance, we're dedicated to
            helping businesses serve exceptional coffee.
          </p>
        </div>
        
        <div className="mission-vision">
          <div className="card">
            <div className="icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To provide top-quality coffee equipment and maintenance services that help businesses 
              deliver the perfect cup of coffee every time, while maintaining the highest standards 
              of quality and service.
            </p>
          </div>
          
          <div className="card">
            <div className="icon">👁️</div>
            <h3>Our Vision</h3>
            <p>
              To be the leading provider of coffee solutions, recognized for our innovation, 
              reliability, and commitment to excellence in the coffee industry.
            </p>
          </div>
        </div>
        
        <div className="values">
          <h3>Our Values</h3>
          <div className="value-items">
            <div className="value">
              <span className="value-icon">☕</span>
              <h4>Quality</h4>
              <p>We never compromise on the quality of our equipment or services.</p>
            </div>
            <div className="value">
              <span className="value-icon">🤝</span>
              <h4>Integrity</h4>
              <p>We build relationships based on trust and transparency.</p>
            </div>
            <div className="value">
              <span className="value-icon">🚀</span>
              <h4>Innovation</h4>
              <p>We stay ahead with the latest in coffee technology and techniques.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
