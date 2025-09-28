import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li><FaPhone /> 050 909 1032</li>
            <li><FaMapMarkerAlt /> 4557 Umm Al Qoura, As Safa District, JDSA6784, 6784, Jeddah 23455</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/equipment">Equipment</Link></li>
            <li><Link to="/book">Book a Slot</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Business Hours</h3>
          <ul className="business-hours">
            <li>Sunday: 7:30 AM - 11:00 PM</li>
            <li>Monday: 7:30 AM - 11:00 PM</li>
            <li>Tuesday: 7:30 AM - 11:00 PM</li>
            <li>Wednesday: 7:30 AM - 11:00 PM</li>
            <li>Thursday: 7:30 AM - 11:00 PM</li>
            <li>Friday: 4:00 PM - 11:00 PM</li>
            <li>Saturday: 7:30 AM - 11:00 PM</li>
          </ul>
          
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Coffee Labs. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
