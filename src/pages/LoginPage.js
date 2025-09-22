// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

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
    <section className="center bg-tertiary">
      <div className="container" role="region" aria-labelledby="login-title">
        <div className="card" style={{maxWidth: '420px', margin: '0 auto'}}>
          <div className="card__body">
            <h1 id="login-title" className="text-center mb-6">Welcome Back</h1>

            {error && (
              <div className="form-message form-message--error" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="form-message form-message--success" role="status">
                {success}
              </div>
            )}

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                fullWidth
                loading={loading}
                aria-busy={loading}
              >
                Sign In
              </Button>

              <div className="text-center mt-2">
                <Link to="/forgot-password" className="text-link">Forgot your password?</Link>
              </div>
            </form>

            <div className="text-center mt-4 text-secondary">
              Don't have an account? <Link to="/register" className="text-link">Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
