import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🏥',
      title: 'Trusted Healthcare',
      description: 'Connect with verified nurses and healthcare professionals in your area.'
    },
    {
      icon: '⚡',
      title: 'Quick Matching',
      description: 'Find the right nurse for your needs with our intelligent matching system.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your health information is protected with enterprise-grade security.'
    }
  ];

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

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-8">
            Why Choose NurseConnect?
          </h2>
          <div className="card-grid">
            {features.map((feature, index) => (
              <Card key={index} hoverable>
                <div className="text-center">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Content Sections */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="two-column">
            <div>
              <h2>How It Works</h2>
              <div className="stack">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">1</div>
                  <div>
                    <h3>Create Your Profile</h3>
                    <p>Tell us about your healthcare needs and preferences.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">2</div>
                  <div>
                    <h3>Get Matched</h3>
                    <p>Our system finds qualified nurses in your area.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">3</div>
                  <div>
                    <h3>Schedule Care</h3>
                    <p>Book appointments and receive professional nursing care.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-full h-64 bg-primary-50 rounded-lg flex items-center justify-center">
                <span className="text-primary-600 text-lg">Illustration Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p className="mb-8">
            Join thousands of families who trust NurseConnect for their healthcare needs.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Start Your Journey
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
