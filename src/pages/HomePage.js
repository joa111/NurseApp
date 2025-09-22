import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Professional Nursing Care
            <br />When You Need It
          </h1>
          <p className="hero__subtitle">
            Connect with qualified nurses for personalized care. 
            Trusted by thousands of families across the country.
          </p>
          <div className="hero__actions">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};

export default HomePage;
