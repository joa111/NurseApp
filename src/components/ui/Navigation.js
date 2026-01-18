// src/components/ui/Navigation.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import styled from 'styled-components';
import {
  NavBar,
  NavLogo,
  NavLink,
  Button,
  IconButton,
  Container,
  Flex
} from './DesignSystem';

// Import icons
import {
  HomeIcon,
  UserIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
  MedicalIcon
} from './Icons';

// Styled components for mobile menu
const MobileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 40;
  opacity: ${props => props.open ? 1 : 0};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 320px;
  height: 100vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
  border-left: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 50;
  transform: translateX(${props => props.open ? '0' : '100%'});
  transition: transform 0.3s ease;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  height: 64px;
`;

const MobileMenuContent = styled.div`
  padding: 2rem 1.5rem;
`;

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${props => props.active ? '#059669' : '#64748b'};
  background: ${props => props.active ? 'rgba(240, 253, 250, 0.8)' : 'transparent'};
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s ease;
  min-height: 48px;

  &:hover {
    color: #059669;
    background: rgba(240, 253, 250, 0.8);
    text-decoration: none;
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const MobileActions = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-height: 40px;
  min-width: 40px;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(240, 253, 250, 0.8);
    color: #059669;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 1rem;
  background: #059669;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  z-index: 100;
  transition: top 0.2s ease;

  &:focus {
    top: 0.5rem;
  }
`;

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
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>

      <NavBar>
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <NavLogo to="/">
            <MedicalIcon size={24} />
            <span>NurseConnect</span>
          </NavLogo>

          {/* Desktop Navigation */}
          <DesktopLinks>
            {currentUser ? (
              <Flex align="center" gap="0.25rem">
                <NavLink to="/" className={isActive('/') ? 'active' : ''}>
                  <HomeIcon size={18} />
                  Home
                </NavLink>
                <NavLink to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                  Dashboard
                </NavLink>
                <NavLink to="/profile" className={isActive('/profile') ? 'active' : ''}>
                  <UserIcon size={18} />
                  Profile
                </NavLink>
                <Button variant="secondary" onClick={handleLogout} style={{ marginLeft: '0.5rem' }}>
                  <LogoutIcon size={18} />
                  Logout
                </Button>
              </Flex>
            ) : (
              <Flex align="center" gap="0.25rem">
                <NavLink to="/login" className={isActive('/login') ? 'active' : ''}>
                  Login
                </NavLink>
                <NavLink to="/register" className={isActive('/register') ? 'active' : ''}>
                  Register
                </NavLink>
              </Flex>
            )}
          </DesktopLinks>

          {/* Mobile Menu Button */}
          <MobileToggle
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon size={24} />
          </MobileToggle>
        </Container>
      </NavBar>

      {/* Mobile Menu Overlay */}
      <MobileOverlay
        open={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <MobileMenu open={mobileMenuOpen}>
        <MobileMenuHeader>
          <NavLogo to="/" style={{ color: '#1f2937', textDecoration: 'none' }}>
            <MedicalIcon size={24} />
            <span>NurseConnect</span>
          </NavLogo>
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon size={24} />
          </IconButton>
        </MobileMenuHeader>

        <MobileMenuContent>
          <MobileLinks>
            {currentUser ? (
              <>
                <MobileNavLink
                  to="/"
                  active={isActive('/')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HomeIcon size={20} />
                  Home
                </MobileNavLink>
                <MobileNavLink
                  to="/dashboard"
                  active={isActive('/dashboard')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </MobileNavLink>
                <MobileNavLink
                  to="/profile"
                  active={isActive('/profile')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon size={20} />
                  Profile
                </MobileNavLink>
                <MobileActions>
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    style={{ width: '100%' }}
                  >
                    <LogoutIcon size={18} />
                    Logout
                  </Button>
                </MobileActions>
              </>
            ) : (
              <>
                <MobileNavLink
                  to="/login"
                  active={isActive('/login')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </MobileNavLink>
                <MobileNavLink
                  to="/register"
                  active={isActive('/register')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </MobileNavLink>
              </>
            )}
          </MobileLinks>
        </MobileMenuContent>
      </MobileMenu>
    </>
  );
};

export default Navigation;