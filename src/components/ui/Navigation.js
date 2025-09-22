// src/components/ui/Navigation.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

// Import icons
import { 
  HomeIcon, 
  UserIcon, 
  LogoutIcon, 
  MenuIcon, 
  CloseIcon,
  MedicalIcon
} from './Icons';

// Main Navigation Component
const Navigation = () => {
  const { currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="nav__skip-link">
        Skip to main content
      </a>
      
      <nav className="nav">
        <div className="nav__container">
          <Link to="/" className="nav__brand">
            <MedicalIcon size={24} className="nav__brand-icon" />
            <span className="nav__brand-text">NurseConnect</span>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="nav__links">
            {currentUser ? (
              <>
                <li>
                  <Link 
                    to="/" 
                    className={`nav__link ${isActive('/') ? 'nav__link--active' : ''}`}
                  >
                    <HomeIcon size={18} className="nav__link-icon" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={`nav__link ${isActive('/dashboard') ? 'nav__link--active' : ''}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className={`nav__link ${isActive('/profile') ? 'nav__link--active' : ''}`}
                  >
                    <UserIcon size={18} className="nav__link-icon" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="btn btn--secondary btn--sm"
                  >
                    <LogoutIcon size={18} className="nav__link-icon" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={`nav__link ${isActive('/login') ? 'nav__link--active' : ''}`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className={`nav__link ${isActive('/register') ? 'nav__link--active' : ''}`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="nav__mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon size={24} className="nav__mobile-toggle-icon" />
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`nav__mobile-overlay ${mobileMenuOpen ? 'nav__mobile-overlay--open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Mobile Menu */}
      <div className={`nav__mobile-menu ${mobileMenuOpen ? 'nav__mobile-menu--open' : ''}`}>
        <div className="nav__mobile-menu-header">
          <Link to="/" className="nav__brand">
            <MedicalIcon size={24} className="nav__brand-icon" />
            <span className="nav__brand-text">NurseConnect</span>
          </Link>
          <button 
            className="nav__mobile-menu-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon size={24} className="nav__mobile-menu-close-icon" />
          </button>
        </div>
        
        <div className="nav__mobile-menu-content">
          <ul className="nav__mobile-links">
            {currentUser ? (
              <>
                <li>
                  <Link 
                    to="/" 
                    className={`nav__mobile-link ${isActive('/') ? 'nav__mobile-link--active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <HomeIcon size={20} className="nav__mobile-link-icon" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={`nav__mobile-link ${isActive('/dashboard') ? 'nav__mobile-link--active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className={`nav__mobile-link ${isActive('/profile') ? 'nav__mobile-link--active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon size={20} className="nav__mobile-link-icon" />
                    Profile
                  </Link>
                </li>
                <li className="nav__mobile-actions">
                  <button 
                    onClick={handleLogout}
                    className="btn btn--secondary btn--full-width"
                  >
                    <LogoutIcon size={18} className="nav__link-icon" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={`nav__mobile-link ${isActive('/login') ? 'nav__mobile-link--active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className={`nav__mobile-link ${isActive('/register') ? 'nav__mobile-link--active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;