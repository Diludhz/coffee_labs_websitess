import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="gradient-text">Coffee Labs</h1>
          <h2>Premium Coffee Supplies & Maintenance</h2>
          <p>Your trusted partner for commercial coffee machines, premium supplies, and expert maintenance services. We help businesses serve the perfect cup, every time.</p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/products')} className="btn secondary">Explore Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;