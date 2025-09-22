// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Container,
  Section,
  Card,
  Button,
  Title,
  Text,
  Input,
  Label,
  FormGroup,
  Flex,
  ErrorMessage
} from '../components/ui/DesignSystem';
import styled from 'styled-components';

// Custom styled components for auth pages
const AuthSection = styled(Section)`
  background: linear-gradient(135deg, rgba(240, 253, 250, 0.4), rgba(236, 253, 245, 0.3));
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
`;

const AuthCard = styled(Card)`
  max-width: 420px;
  margin: 0 auto;
  width: 100%;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: rgba(34, 197, 94, 0.15);
  color: #059669;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  color: #059669;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #047857;
    text-decoration: underline;
  }
`;

const DividerText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.875rem;
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
    <AuthSection>
      <Container>
        <AuthCard>
          <Title size="lg" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Welcome Back
          </Title>

          {error && (
            <ErrorMessage role="alert">
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
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
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <StyledLink to="/forgot-password">Forgot your password?</StyledLink>
            </div>
          </form>

          <DividerText>
            Don't have an account? <StyledLink to="/register">Sign up here</StyledLink>
          </DividerText>
        </AuthCard>
      </Container>
    </AuthSection>
  );
}

export default LoginPage;