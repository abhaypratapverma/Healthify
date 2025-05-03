import React, { useState } from 'react';
import '../style/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Top row with 3 sections horizontally */}
        <div className="footer-top-row">
          {/* About Section */}
          <div className="footer-section about">
            <h2 className="footer-heading">About Us</h2>
            <div className="footer-divider"></div>
            <div className="footer-inner-content">
              <p>Healthify is your ultimate companion for tracking fitness goals, nutrition planning, and maintaining a healthy lifestyle.</p>
              <div className="footer-3d-button">Learn More</div>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div className="footer-section quick-links">
            <h2 className="footer-heading">Quick Links</h2>
            <div className="footer-divider"></div>
            <div className="footer-inner-content">
              <ul>
                <li><a href="#" className="footer-link">Home</a></li>
                <li><a href="#" className="footer-link">Services</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
                <li><a href="#" className="footer-link">FAQs</a></li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="footer-section newsletter">
            <h2 className="footer-heading">Stay Updated</h2>
            <div className="footer-divider"></div>
            <div className="footer-inner-content">
              <p>Subscribe for tips and exclusive offers</p>
              <form onSubmit={handleSubmit} className="subscribe-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                  <button type="submit" className="submit-btn">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Contact Info - Centered, not in a box */}
        <div className="contact-info-center">
          <h2 className="footer-heading">Contact Info</h2>
          <div className="footer-divider"></div>
          <div className="contact-items">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>support@healthify.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Fitness Avenue, Wellness City</span>
            </div>
          </div>
        </div>
        
        {/* Social Media Section - Centered */}
        <div className="social-section">
          <h2 className="footer-heading">Follow Us</h2>
          <div className="footer-divider"></div>
          <div className="social-icons">
            <a href="#" className="social-icon instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon youtube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Healthify. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;