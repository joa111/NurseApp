import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  Container,
  Section,
  Card,
  FeatureCard,
  Button,
  Title,
  Subtitle,
  Text,
  Grid,
  Flex,
  StatusBadge,
  Divider
} from '../components/ui/DesignSystem';
import styled from 'styled-components';

// Custom hero section styling
const HeroSection = styled(Section)`
  background: linear-gradient(135deg, rgba(240, 253, 250, 0.8), rgba(236, 253, 245, 0.6));
  padding: 4rem 0;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const HeroActions = styled(Flex)`
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #059669, #047857);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const StatsSection = styled(Section)`
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #059669;
  line-height: 1;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
`;

// Simple icons as components
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5C16.4,11 17,11.4 17,12V16C17,16.6 16.6,17 16,17H8C7.4,17 7,16.6 7,16V12C7,11.4 7.4,11 8,11H8.5V10C8.5,8.6 9.6,7 12,7M12,8.2C10.2,8.2 9.5,9 9.5,10V11H14.5V10C14.5,9 13.8,8.2 12,8.2Z"/>
  </svg>
);

// Additional styled components for nurse dashboard
const DashboardCard = styled(Card)`
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
  
  h2, h3, p {
    color: white;
  }
`;

const QuickStatCard = styled(Card)`
  text-align: center;
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid rgba(5, 150, 105, 0.1);
  
  &:hover {
    border-color: rgba(5, 150, 105, 0.2);
    transform: translateY(-1px);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #059669;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const QuickStatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

// Simple dashboard icons
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,14C18.67,14 22,15.33 22,18V20H10V18C10,15.33 13.33,14 16,14M8,4C10.21,4 12,5.79 12,8C12,10.21 10.21,12 8,12C5.79,12 4,10.21 4,8C4,5.79 5.79,4 8,4M8,14C10.67,14 14,15.33 14,18V20H2V18C2,15.33 5.33,14 8,14Z"/>
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
  </svg>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [nurseProfile, setNurseProfile] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch nurse profile if logged in
  useEffect(() => {
    if (currentUser) {
      const nurseRef = doc(db, 'nurses', currentUser.uid);
      const unsubscribe = onSnapshot(nurseRef, (doc) => {
        if (doc.exists()) {
          const profile = doc.data();
          setNurseProfile(profile);
          setIsOnline(profile.availability?.isOnline || false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // If user is logged in, show nurse dashboard homepage
  if (currentUser && !loading) {
    return (
      <>
        {/* Nurse Welcome Hero */}
        <HeroSection style={{ padding: '2rem 0' }}>
          <Container>
            <Flex justify="space-between" align="center" wrap="wrap" gap="1rem">
              <div>
                <Title size="lg" mb="0.5rem">
                  Welcome back, {nurseProfile?.fullName || 'Nurse'}! 👩‍⚕️
                </Title>
                <Text muted>
                  {isOnline 
                    ? "You're currently available for requests" 
                    : "Set yourself online to receive patient requests"}
                </Text>
              </div>
              <StatusBadge status={isOnline ? 'online' : 'offline'}>
                {isOnline ? 'Available' : 'Offline'}
              </StatusBadge>
            </Flex>
            
            <Grid columns={2} gap="1.5rem" style={{ marginTop: '2rem' }}>
              <Button onClick={() => navigate('/dashboard')} style={{ height: '3rem' }}>
                Go to Dashboard
              </Button>
              <Button variant="secondary" onClick={() => navigate('/profile')} style={{ height: '3rem' }}>
                Manage Profile
              </Button>
            </Grid>
          </Container>
        </HeroSection>

        {/* Quick Stats for Nurses */}
        <Section>
          <Container>
            <Title size="md" mb="2rem" style={{ textAlign: 'center' }}>
              Your Quick Stats
            </Title>
            <Grid columns={4} gap="1.5rem">
              <QuickStatCard>
                <CalendarIcon />
                <StatValue>12</StatValue>
                <QuickStatLabel>This Month</QuickStatLabel>
              </QuickStatCard>
              
              <QuickStatCard>
                <UsersIcon />
                <StatValue>8</StatValue>
                <QuickStatLabel>Active Patients</QuickStatLabel>
              </QuickStatCard>
              
              <QuickStatCard>
                <TrendingUpIcon />
                <StatValue>4.9</StatValue>
                <QuickStatLabel>Rating</QuickStatLabel>
              </QuickStatCard>
              
              <QuickStatCard>
                <DollarIcon />
                <StatValue>$2,340</StatValue>
                <QuickStatLabel>This Month</QuickStatLabel>
              </QuickStatCard>
            </Grid>
          </Container>
        </Section>

        {/* Quick Actions */}
        <Section style={{ backgroundColor: '#fafafa' }}>
          <Container>
            <Grid columns={2} gap="2rem">
              <DashboardCard>
                <Subtitle mb="1rem">Ready to Help Patients?</Subtitle>
                <Text mb="1.5rem">
                  Set your status to available and start receiving care requests from patients in your area.
                </Text>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/dashboard')}
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  Manage Availability
                </Button>
              </DashboardCard>

              <Card>
                <Subtitle mb="1rem">Update Your Profile</Subtitle>
                <Text muted mb="1.5rem">
                  Keep your rates, services, and availability up to date to attract more patients.
                </Text>
                <Button onClick={() => navigate('/profile')}>
                  Edit Profile
                </Button>
              </Card>
            </Grid>
          </Container>
        </Section>

        {/* Recent Activity Preview */}
        <Section>
          <Container>
            <Flex justify="space-between" align="center" mb="2rem">
              <Title size="md">Recent Activity</Title>
              <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                View All
              </Button>
            </Flex>
            
            <Grid columns={1} gap="1rem">
              <Card padding="1.25rem">
                <Flex justify="space-between" align="center">
                  <div>
                    <Subtitle mb="0.5rem">Post-operative care completed</Subtitle>
                    <Text size="sm" muted>Patient: Sarah Johnson • 2 hours ago</Text>
                  </div>
                  <StatusBadge status="completed">Completed</StatusBadge>
                </Flex>
              </Card>
              
              <Card padding="1.25rem">
                <Flex justify="space-between" align="center">
                  <div>
                    <Subtitle mb="0.5rem">Medication management session</Subtitle>
                    <Text size="sm" muted>Patient: Robert Chen • Yesterday</Text>
                  </div>
                  <StatusBadge status="completed">Completed</StatusBadge>
                </Flex>
              </Card>
            </Grid>
          </Container>
        </Section>
      </>
    );
  }

  // Default homepage for non-logged in users
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <Title size="xl" mb="1rem">
            Professional Nursing Care
            <br />When You Need It
          </Title>
          <Text size="lg" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: '#6b7280' }}>
            Connect with qualified, licensed nurses for personalized care at home. 
            Trusted by thousands of families across the country for reliable, compassionate healthcare.
          </Text>
          <HeroActions justify="center" gap="1rem">
            <Button 
              size="large"
              onClick={() => navigate('/register')}
            >
              Get Started Today
            </Button>
            <Button 
              variant="secondary" 
              size="large"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </HeroActions>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <Container>
          <Grid columns={3} gap="2rem">
            <StatCard>
              <StatNumber>5,000+</StatNumber>
              <StatLabel>Licensed Nurses</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>50,000+</StatNumber>
              <StatLabel>Families Served</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Available Support</StatLabel>
            </StatCard>
          </Grid>
        </Container>
      </StatsSection>

      {/* Features Section */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Title size="lg" mb="1rem">Why Choose NurseConnect?</Title>
            <Text muted style={{ maxWidth: '500px', margin: '0 auto' }}>
              We provide professional healthcare services with the convenience and comfort of your own home.
            </Text>
          </div>
          
          <Grid columns={3} gap="2rem">
            <FeatureCard>
              <FeatureIcon>
                <HeartIcon />
              </FeatureIcon>
              <Subtitle size="lg">Compassionate Care</Subtitle>
              <Text muted>
                Our licensed nurses provide personalized, compassionate care tailored to your specific needs and medical requirements.
              </Text>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <ShieldIcon />
              </FeatureIcon>
              <Subtitle size="lg">Licensed & Verified</Subtitle>
              <Text muted>
                All nurses are fully licensed, background-checked, and continuously verified to ensure the highest standards of care.
              </Text>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <ClockIcon />
              </FeatureIcon>
              <Subtitle size="lg">Available 24/7</Subtitle>
              <Text muted>
                Emergency and routine care available around the clock. Book appointments or request immediate assistance anytime.
              </Text>
            </FeatureCard>
          </Grid>
        </Container>
      </Section>

      {/* Services Section */}
      <Section style={{ backgroundColor: '#fafafa' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Title size="lg" mb="1rem">Our Services</Title>
            <Text muted>Professional nursing care for all your healthcare needs</Text>
          </div>
          
          <Grid columns={2} gap="2rem">
            <Card>
              <Subtitle mb="1rem">Post-Operative Care</Subtitle>
              <Text muted mb="1rem">
                Specialized recovery care following surgery, including wound management, medication administration, and monitoring.
              </Text>
              <Text size="sm" style={{ color: '#059669', fontWeight: '500' }}>
                Starting at $45/hour
              </Text>
            </Card>

            <Card>
              <Subtitle mb="1rem">Chronic Disease Management</Subtitle>
              <Text muted mb="1rem">
                Ongoing support for diabetes, hypertension, COPD, and other chronic conditions with regular monitoring.
              </Text>
              <Text size="sm" style={{ color: '#059669', fontWeight: '500' }}>
                Starting at $40/hour
              </Text>
            </Card>

            <Card>
              <Subtitle mb="1rem">Elderly Care</Subtitle>
              <Text muted mb="1rem">
                Comprehensive care for seniors including medication management, mobility assistance, and health monitoring.
              </Text>
              <Text size="sm" style={{ color: '#059669', fontWeight: '500' }}>
                Starting at $35/hour
              </Text>
            </Card>

            <Card>
              <Subtitle mb="1rem">Emergency Care</Subtitle>
              <Text muted mb="1rem">
                Immediate medical attention and stabilization for urgent health situations in your home.
              </Text>
              <Text size="sm" style={{ color: '#059669', fontWeight: '500' }}>
                Starting at $75/hour
              </Text>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <Card style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <Title size="md" mb="1rem">Ready to Get Started?</Title>
            <Text muted mb="2rem" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
              Join thousands of families who trust NurseConnect for their healthcare needs. 
              Get matched with a qualified nurse in your area today.
            </Text>
            <Flex justify="center" gap="1rem">
              <Button onClick={() => navigate('/register')}>
                Find a Nurse
              </Button>
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Learn More
              </Button>
            </Flex>
          </Card>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;