import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  Container,
  Section,
  Card,
  Button,
  Title,
  Subtitle,
  Text,
  Grid,
  Flex,
  StatusBadge
} from '../components/ui/DesignSystem';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Custom hero section styling
const HeroSection = styled.section`
  min-height: 90vh;
  background: linear-gradient(135deg, rgba(236, 253, 245, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;

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
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeroTitle = styled(Title)`
  font-size: 4rem;
  background: linear-gradient(135deg, #065f46 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(Text)`
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    padding: 0 1rem;
  }
`;

const HeroActions = styled(Flex)`
  justify-content: center;
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
    
    button {
      width: 100%;
      height: 3.5rem;
      font-size: 1.1rem;
    }
  }
`;

// Additional styled components for nurse dashboard (Logged In)
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
    <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,14C18.67,14 22,15.33 22,18V20H10V18C10,15.33 13.33,14 16,14M8,4C10.21,4 12,5.79 12,8C12,10.21 10.21,12 8,12C5.79,12 4,10.21 4,8C4,5.79 5.79,4 8,4M8,14C10.67,14 14,15.33 14,18V20H2V18C2,15.33 5.33,14 8,14Z" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
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
        <Section style={{ padding: '2rem 0' }}>
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
        </Section>

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

  // Pure Landing Page for non-logged in users
  return (
    <>
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroTitle size="xl">
              Nurses
            </HeroTitle>
            <HeroSubtitle>
              Join the premier network of healthcare professionals.
              Connect, manage your practice, and provide exceptional care on your own terms.
            </HeroSubtitle>
            <HeroActions>
              <Button
                size="large"
                onClick={() => navigate('/register')}
                style={{ minWidth: '180px' }}
              >
                Join Now
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={() => navigate('/login')}
                style={{ minWidth: '180px' }}
              >
                Sign In
              </Button>
            </HeroActions>
          </HeroContent>
        </Container>
      </HeroSection>
    </>
  );
};

export default HomePage;