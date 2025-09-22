// src/pages/RegistrationPage.js
import React from 'react';
import MultiStepForm from '../components/registration/MultiStepForm';
import {
  Container,
  Section,
  Card,
  Title,
  Text,
  Flex
} from '../components/ui/DesignSystem';
import styled from 'styled-components';

// Custom styled components for registration
const RegistrationSection = styled(Section)`
  background: linear-gradient(135deg, rgba(240, 253, 250, 0.4), rgba(236, 253, 245, 0.3));
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
`;

const RegistrationCard = styled(Card)`
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProgressStep = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#059669' : '#d1d5db'};
  transition: background-color 0.2s ease;
`;

const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(240, 253, 250, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(5, 150, 105, 0.1);
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
`;

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#059669', flexShrink: 0 }}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

function RegistrationPage() {
  return (
    <RegistrationSection>
      <Container>
        <RegistrationCard>
          <HeaderSection>
            <Title size="lg" mb="0.5rem">
              Join NurseConnect
            </Title>
            <Text muted style={{ fontSize: '1rem' }}>
              Complete your professional profile to start connecting with patients
            </Text>
            
            {/* Progress indicator - you can make this dynamic based on form step */}
            <ProgressIndicator>
              <ProgressStep active />
              <ProgressStep />
              <ProgressStep />
              <ProgressStep />
            </ProgressIndicator>
          </HeaderSection>

          {/* Your existing MultiStepForm component */}
          <MultiStepForm />

          {/* Benefits section */}
          <BenefitsList>
            <BenefitItem>
              <CheckIcon />
              <span>Flexible scheduling</span>
            </BenefitItem>
            <BenefitItem>
              <CheckIcon />
              <span>Competitive rates</span>
            </BenefitItem>
            <BenefitItem>
              <CheckIcon />
              <span>Professional support</span>
            </BenefitItem>
            <BenefitItem>
              <CheckIcon />
              <span>Verified patients</span>
            </BenefitItem>
            <BenefitItem>
              <CheckIcon />
              <span>Secure payments</span>
            </BenefitItem>
            <BenefitItem>
              <CheckIcon />
              <span>24/7 assistance</span>
            </BenefitItem>
          </BenefitsList>
        </RegistrationCard>
      </Container>
    </RegistrationSection>
  );
}

export default RegistrationPage;