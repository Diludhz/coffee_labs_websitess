import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import '../styles/ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>Have questions or need assistance? We're here to help! Reach out to us through any of the following methods:</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4>Our Location</h4>
                <p>4557 Umm Al Qoura, As Safa District,<br />JDSA6784, 6784, Jeddah 23455</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div>
                <h4>Phone Number</h4>
                <p><a href="tel:0509091032">050 909 1032</a></p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div>
                <h4>Email Address</h4>
                <p><a href="mailto:info@coffeelabs.com">info@coffeelabs.com</a></p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <FaClock />
              </div>
              <div>
                <h4>Working Hours</h4>
                <p>Sunday - Thursday: 7:30 AM - 11:00 PM<br />
                Friday: 4:00 PM - 11:00 PM<br />
                Saturday: 7:30 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h3>Send Us a Message</h3>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Phone Number" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
