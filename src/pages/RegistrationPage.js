// src/pages/RegistrationPage.js
import React from 'react';
import MultiStepForm from '../components/registration/MultiStepForm';
import {
  Container,
  Title,
  Text
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
  padding: 3rem 1rem;

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
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
`;

const StyledTitle = styled(Title)`
  background: linear-gradient(135deg, #065f46 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #4b5563;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.8);
  }
`;

const CheckIcon = () => (
  <div style={{
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#d1fae5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#059669' }}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  </div>
);

function RegistrationPage() {
  return (
    <PageWrapper>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GlassCard>
            <HeaderSection>
              <StyledTitle size="lg">
                Join Nurses
              </StyledTitle>
              <Text muted style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                Create your professional account to connect with patients and manage your practice.
              </Text>
            </HeaderSection>

            {/* Your existing MultiStepForm component */}
            <MultiStepForm />

            {/* Redesigned Benefits section */}
            <BenefitsGrid>
              <BenefitItem>
                <CheckIcon />
                <span>Flexible schedule & rates</span>
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                <span>Secure weekly payments</span>
              </BenefitItem>
              <BenefitItem>
                <CheckIcon />
                <span>Verified patient leads</span>
              </BenefitItem>
            </BenefitsGrid>
          </GlassCard>
        </div>
      </Container>
    </PageWrapper>
  );
}

export default RegistrationPage;