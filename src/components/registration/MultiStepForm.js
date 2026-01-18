// src/components/registration/MultiStepForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import {
  Button,
  Input,
  Label,
  FormGroup,
  ErrorMessage,
  Grid,
  Title,
  Text
} from '../ui/DesignSystem';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
`;

const StepTitle = styled(Title)`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-end'};
  gap: 1rem;
  margin-top: 2rem;
`;

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #059669;
    background: #f0fdfa;
  }
  
  input {
    margin-right: 0.75rem;
    width: 20px;
    height: 20px;
    accent-color: #059669;
  }
  
  label {
    cursor: pointer;
    font-weight: 500;
    color: #374151;
    flex: 1;
  }
`;

// --- Helper Components for each step ---

const Step1_BasicInfo = ({ nextStep, handleChange, values, getLocation }) => (
  <FormContainer>
    <StepTitle as="h3">Basic Information</StepTitle>
    <FormGroup>
      <Label htmlFor="fullName">Full Name</Label>
      <Input id="fullName" type="text" value={values.fullName} onChange={handleChange('fullName')} placeholder="e.g. Jane Doe" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" value={values.email} onChange={handleChange('email')} placeholder="name@example.com" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" value={values.password} onChange={handleChange('password')} placeholder="Create a strong password" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="district">District You Serve</Label>
      <Input id="district" type="text" value={values.district} onChange={handleChange('district')} placeholder="e.g. Downtown" required />
    </FormGroup>
    <FormGroup>
      <Button variant="secondary" type="button" onClick={getLocation} style={{ width: '100%' }}>
        Use My Current Location
      </Button>
    </FormGroup>
    <ButtonGroup>
      <Button variant="primary" onClick={nextStep} style={{ width: '100%' }}>Next Step</Button>
    </ButtonGroup>
  </FormContainer>
);

const Step2_Credentials = ({ nextStep, prevStep, handleChange, values }) => (
  <FormContainer>
    <StepTitle as="h3">Professional Credentials</StepTitle>
    <FormGroup>
      <Label htmlFor="licenseNumber">Nursing License Number</Label>
      <Input id="licenseNumber" type="text" value={values.licenseNumber} onChange={handleChange('licenseNumber')} placeholder="e.g. RN-123456" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="licenseState">State of Issuance</Label>
      <Input id="licenseState" type="text" value={values.licenseState} onChange={handleChange('licenseState')} placeholder="e.g. California" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="licenseExpiryDate">License Expiry Date</Label>
      <Input id="licenseExpiryDate" type="date" value={values.licenseExpiryDate} onChange={handleChange('licenseExpiryDate')} required />
    </FormGroup>
    <ButtonGroup justify="space-between">
      <Button variant="secondary" onClick={prevStep}>Back</Button>
      <Button variant="primary" onClick={nextStep}>Next Step</Button>
    </ButtonGroup>
  </FormContainer>
);

const Step3_Services = ({ prevStep, handleArrayChange, values, handleSubmit }) => {
  const allServices = ["Wound Care", "IV Therapy", "Medication Administration", "Post-Op Care", "Geriatric Care"];
  return (
    <FormContainer>
      <StepTitle as="h3">Services Offered</StepTitle>
      <Text muted mb="1.5rem">Select at least one service you are qualified to provide.</Text>

      <Grid columns={1} gap="1rem">
        {allServices.map(service => (
          <StyledCheckbox key={service} onClick={() => handleArrayChange('services', service)}>
            <input
              type="checkbox"
              id={service}
              value={service}
              checked={values.services.includes(service)}
              onChange={() => { }} // Handled by parent div click
              readOnly
            />
            <label htmlFor={service}>{service}</label>
          </StyledCheckbox>
        ))}
      </Grid>

      <ButtonGroup justify="space-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button variant="primary" onClick={handleSubmit}>Complete Registration</Button>
      </ButtonGroup>
    </FormContainer>
  );
};

// --- Main Multi-Step Form Component ---

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    district: '',
    latitude: '',
    longitude: '',
    licenseNumber: '',
    licenseState: '',
    licenseExpiryDate: '',
    services: [],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch device location and autofill latitude/longitude
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => {
          setError('Unable to fetch location. Please enter manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = input => e => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleArrayChange = (input, value) => {
    setFormData(prev => ({
      ...prev,
      [input]: prev[input].includes(value)
        ? prev[input].filter(item => item !== value)
        : [...prev[input], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.services.length === 0) {
      setError('Please select at least one service.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const nurseProfile = {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        district: formData.district,
        location: {
          latitude: parseFloat(formData.latitude) || 0,
          longitude: parseFloat(formData.longitude) || 0
        },
        licenseNumber: formData.licenseNumber,
        licenseState: formData.licenseState,
        licenseExpiryDate: formData.licenseExpiryDate,
        services: formData.services,
        profileStatus: 'pending_verification',
        createdAt: new Date(),
        availability: {
          isOnline: false,
          schedule: [],
          serviceRadius: 10,
          lastSeen: Timestamp.now()
        },
        rates: {
          hourlyRate: 25,
          emergencyRate: 35,
          specialties: formData.services.map(service => ({
            name: service.toLowerCase().replace(' ', '-'),
            rate: 25
          }))
        },
        stats: {
          rating: 5.0,
          totalBookings: 0,
          averageResponseTime: 0,
          completionRate: 100
        },
      };

      await setDoc(doc(db, 'nurses', user.uid), nurseProfile);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
      console.error('Registration failed:', err);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_BasicInfo nextStep={nextStep} handleChange={handleChange} values={formData} getLocation={getLocation} />;
      case 2:
        return <Step2_Credentials nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
      case 3:
        return <Step3_Services prevStep={prevStep} handleArrayChange={handleArrayChange} values={formData} handleSubmit={handleSubmit} />;
      default:
        return <p>Loading form...</p>;
    }
  };

  return (
    <FormContainer>
      {error && <ErrorMessage role="alert" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{error}</ErrorMessage>}
      {renderStep()}
    </FormContainer>
  );
}

export default MultiStepForm;
