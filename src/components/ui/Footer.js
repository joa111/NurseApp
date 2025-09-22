// src/components/ui/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const footerClasses = [
    'footer',
    variant !== 'default' ? `footer--${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={footerClasses} {...props}>
      <div className="footer__container">
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <svg 
                className="footer__logo-icon" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 2L2 7L12 12L22 7L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              NurseConnect
            </Link>
            <p className="footer__description">
              Connecting qualified nurses with families who need professional healthcare services. 
              Trusted by thousands across the country.
            </p>
            <div className="footer__social">
              <a 
                href="https://facebook.com" 
                className="footer__social-link"
                aria-label="Follow us on Facebook"
              >
                <svg className="footer__social-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                className="footer__social-link"
                aria-label="Follow us on Twitter"
              >
                <svg className="footer__social-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                className="footer__social-link"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="footer__social-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer__links">
            <div className="footer__link-group">
              <h4 className="footer__link-title">Services</h4>
              <Link to="/services/wound-care" className="footer__link">Wound Care</Link>
              <Link to="/services/iv-therapy" className="footer__link">IV Therapy</Link>
              <Link to="/services/medication" className="footer__link">Medication Administration</Link>
              <Link to="/services/post-op" className="footer__link">Post-Op Care</Link>
              <Link to="/services/geriatric" className="footer__link">Geriatric Care</Link>
            </div>
            <div className="footer__link-group">
              <h4 className="footer__link-title">For Nurses</h4>
              <Link to="/nurses/register" className="footer__link">Join Our Team</Link>
              <Link to="/nurses/benefits" className="footer__link">Benefits</Link>
              <Link to="/nurses/support" className="footer__link">Support</Link>
              <Link to="/nurses/training" className="footer__link">Training</Link>
            </div>
            <div className="footer__link-group">
              <h4 className="footer__link-title">Company</h4>
              <Link to="/about" className="footer__link">About Us</Link>
              <Link to="/careers" className="footer__link">Careers</Link>
              <Link to="/press" className="footer__link">Press</Link>
              <Link to="/blog" className="footer__link">Blog</Link>
            </div>
            <div className="footer__link-group">
              <h4 className="footer__link-title">Support</h4>
              <Link to="/help" className="footer__link">Help Center</Link>
              <Link to="/contact" className="footer__link">Contact Us</Link>
              <Link to="/faq" className="footer__link">FAQ</Link>
              <Link to="/status" className="footer__link">System Status</Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer__contact">
            <h4 className="footer__contact-title">Get in Touch</h4>
            <a href="tel:+1-800-NURSE-01" className="footer__contact-item">
              <svg className="footer__contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +1 (800) NURSE-01
            </a>
            <a href="mailto:support@nurseconnect.com" className="footer__contact-item">
              <svg className="footer__contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              support@nurseconnect.com
            </a>
            <div className="footer__contact-item">
              <svg className="footer__contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              123 Healthcare Ave, Medical City, MC 12345
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer__newsletter">
          <h4 className="footer__newsletter-title">Stay Updated</h4>
          <p className="footer__newsletter-description">
            Get the latest healthcare news and nursing opportunities delivered to your inbox.
          </p>
          <form className="footer__newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="footer__newsletter-input"
              required
            />
            <button type="submit" className="footer__newsletter-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 NurseConnect. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
            <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
            <Link to="/cookies" className="footer__legal-link">Cookie Policy</Link>
            <Link to="/accessibility" className="footer__legal-link">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
