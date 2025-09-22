// src/pages/RegistrationPage.js
import React from 'react';
import MultiStepForm from '../components/registration/MultiStepForm';

function RegistrationPage() {
  return (
    <section className="section bg-tertiary">
      <div className="container" role="region" aria-labelledby="registration-title">
        <div className="card" style={{maxWidth: '720px', margin: '0 auto'}}>
          <div className="card__body">
            <h2 id="registration-title" className="text-center mb-2">Nurse Registration</h2>
            <p className="text-center text-secondary mb-6">Complete the steps below to create your profile.</p>
            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  );
}
export default RegistrationPage;