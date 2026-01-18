// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Container,
  Button,
  Title,
  Input,
  Label,
  FormGroup,
  ErrorMessage
} from '../components/ui/DesignSystem';
import styled, { keyframes } from 'styled-components';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(236, 253, 245, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(5, 150, 105, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 640px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const StyledTitle = styled(Title)`
  background: linear-gradient(135deg, #065f46 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const StyledInput = styled(Input)`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1rem 1.25rem;
  transition: all 0.2s ease;

  &:focus {
    background: #ffffff;
    border-color: #059669;
    box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.1);
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  color: #059669;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  border: 1px solid rgba(34, 197, 94, 0.2);
`;

const StyledLink = styled(Link)`
  color: #059669;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;

  &:hover {
    color: #047857;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #9ca3af;
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GlassCard>
            <Header>
              <StyledTitle size="lg">Welcome Back</StyledTitle>
              <SubText>Sign in to access your dashboard</SubText>
            </Header>

            {error && (
              <ErrorMessage role="alert" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                {error}
              </ErrorMessage>
            )}

            {success && (
              <SuccessMessage role="status">
                {success}
              </SuccessMessage>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <FormGroup>
                <Label htmlFor="email" style={{ marginLeft: '0.25rem' }}>Email Address</Label>
                <StyledInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Label htmlFor="password" style={{ marginBottom: 0, marginLeft: '0.25rem' }}>Password</Label>
                  <StyledLink to="/forgot-password" style={{ fontSize: '0.875rem' }}>
                    Forgot password?
                  </StyledLink>
                </div>
                <StyledInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </FormGroup>

              <Button
                type="submit"
                size="large"
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <Divider>or</Divider>

            <div style={{ textAlign: 'center' }}>
              <SubText style={{ display: 'inline' }}>Don't have an account? </SubText>
              <StyledLink to="/register">Sign up now</StyledLink>
            </div>
          </GlassCard>
        </div>
      </Container>
    </PageWrapper>
  );
}

export default LoginPage;