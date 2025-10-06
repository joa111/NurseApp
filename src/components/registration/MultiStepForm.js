// src/components/registration/MultiStepForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import Input from '../ui/Input';
import Button from '../ui/Button';

// --- Helper Components for each step ---

const Step1_BasicInfo = ({ nextStep, handleChange, values, getLocation }) => (
  <div className="stack">
    <h3>Step 1: Basic Information</h3>
    <div className="form-group">
      <label className="form-label" htmlFor="fullName">Full Name</label>
      <Input id="fullName" type="text" value={values.fullName} onChange={handleChange('fullName')} required />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="email">Email Address</label>
      <Input id="email" type="email" value={values.email} onChange={handleChange('email')} required />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="password">Password</label>
      <Input id="password" type="password" value={values.password} onChange={handleChange('password')} required />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="district">District You Serve</label>
      <Input id="district" type="text" value={values.district} onChange={handleChange('district')} required />
    </div>
    <div className="form-group">
      <Button variant="secondary" type="button" onClick={getLocation} style={{ marginTop: '0.5rem' }}>
        Use My Current Location
      </Button>
    </div>
    <div className="form-actions">
      <Button variant="primary" onClick={nextStep}>Next</Button>
    </div>
  </div>
);

const Step2_Credentials = ({ nextStep, prevStep, handleChange, values }) => (
  <div className="stack">
    <h3>Step 2: Professional Credentials</h3>
    <div className="form-group">
      <label className="form-label" htmlFor="licenseNumber">Nursing License Number</label>
      <Input id="licenseNumber" type="text" value={values.licenseNumber} onChange={handleChange('licenseNumber')} required />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="licenseState">State of Issuance</label>
      <Input id="licenseState" type="text" value={values.licenseState} onChange={handleChange('licenseState')} required />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="licenseExpiryDate">License Expiry Date</label>
      <Input id="licenseExpiryDate" type="date" value={values.licenseExpiryDate} onChange={handleChange('licenseExpiryDate')} required />
    </div>
    <div className="form-actions form-actions--space-between">
      <Button variant="outline" onClick={prevStep}>Back</Button>
      <Button variant="primary" onClick={nextStep}>Next</Button>
    </div>
  </div>
);

const Step3_Services = ({ prevStep, handleArrayChange, values, handleSubmit }) => {
  const allServices = ["Wound Care", "IV Therapy", "Medication Administration", "Post-Op Care", "Geriatric Care"];
  return (
    <div className="stack">
      <h3>Step 3: Services Offered</h3>
      <p>Select the services you provide:</p>
      <div className="stack">
        {allServices.map(service => (
          <label className="form-checkbox" key={service} htmlFor={service}>
            <input
              className="form-checkbox__input"
              type="checkbox"
              id={service}
              value={service}
              checked={values.services.includes(service)}
              onChange={() => handleArrayChange('services', service)}
            />
            <span className="form-checkbox__indicator" aria-hidden="true" />
            <span className="form-checkbox__label">{service}</span>
          </label>
        ))}
      </div>
      <div className="form-actions form-actions--space-between">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button variant="primary" onClick={handleSubmit}>Complete Registration</Button>
      </div>
    </div>
  );
};

// --- Main Multi-Step Form Component ---

function MultiStepForm() {
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
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude)
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
    <div className="stack">
      {error && <div className="form-message form-message--error" role="alert">{error}</div>}
      {renderStep()}
    </div>
  );
}

export default MultiStepForm;
