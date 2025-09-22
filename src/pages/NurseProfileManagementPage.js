import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const NurseProfileManagementPage = () => {
  const { currentUser } = useAuth();
  const [nurseProfile, setNurseProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    hourlyRate: 0,
    emergencyRate: 0,
    serviceRadius: 0,
    services: [],
    schedule: [] // For more complex schedule management
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) return;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'nurses', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNurseProfile(data);
          setFormData({
            hourlyRate: data.rates?.hourlyRate || 0,
            emergencyRate: data.rates?.emergencyRate || 0,
            serviceRadius: data.availability?.serviceRadius || 0,
            services: data.rates?.specialties.map(s => ({ name: s.name, rate: s.rate })) || [],
            schedule: data.availability?.schedule || []
          });
        } else {
          setError("No nurse profile found. Please complete registration.");
        }
      } catch (err) {
        console.error("Error fetching nurse profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('serviceRate-')) {
      const serviceName = name.split('-')[1];
      setFormData(prev => ({
        ...prev,
        services: prev.services.map(s => 
          s.name === serviceName ? { ...s, rate: parseFloat(value) } : s
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!currentUser) {
      setError("You must be logged in to update your profile.");
      return;
    }

    try {
      const nurseRef = doc(db, 'nurses', currentUser.uid);
      await updateDoc(nurseRef, {
        'rates.hourlyRate': formData.hourlyRate,
        'rates.emergencyRate': formData.emergencyRate,
        'availability.serviceRadius': formData.serviceRadius,
        'rates.specialties': formData.services.map(s => ({ name: s.name, rate: s.rate })),
        // Schedule updates would be more complex and might involve a dedicated component
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating nurse profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <section className="center">
        <p>Loading profile...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <div className="form-message form-message--error" role="alert">{error}</div>
        </div>
      </section>
    );
  }

  if (!nurseProfile) {
    return (
      <section className="section">
        <div className="container">
          <div className="form-message form-message--warning">No nurse profile found. Please ensure you are registered.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-secondary">
      <div className="container" role="region" aria-labelledby="profile-title">
        <div className="card">
          <div className="card__body">
            <h2 id="profile-title" className="mb-4">Manage Your Profile</h2>

            {message && <div className="form-message form-message--success" role="status">{message}</div>}

            <form className="form" onSubmit={handleUpdateProfile}>
              <fieldset className="form-fieldset">
                <legend className="form-legend">Rates</legend>
                <div className="grid grid--cols-2 grid--gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="hourlyRate">Hourly Rate ($)</label>
                    <Input 
                      id="hourlyRate"
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="emergencyRate">Emergency Rate ($)</label>
                    <Input 
                      id="emergencyRate"
                      type="number"
                      name="emergencyRate"
                      value={formData.emergencyRate}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-group mt-4">
                  <h4 className="mb-2">Specialty Rates</h4>
                  {formData.services.length > 0 ? (
                    <div className="stack">
                      {formData.services.map(service => (
                        <div className="grid grid--cols-2 grid--gap-4" key={service.name}>
                          <div className="form-group">
                            <label className="form-label">{service.name.replace('-', ' ').toUpperCase()}</label>
                            <Input 
                              type="number"
                              name={`serviceRate-${service.name}`}
                              value={service.rate}
                              onChange={handleChange}
                              min="0"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-secondary">No services defined. Please update your registration or contact support.</p>
                  )}
                </div>
              </fieldset>

              <fieldset className="form-fieldset">
                <legend className="form-legend">Availability & Preferences</legend>
                <div className="form-group">
                  <label className="form-label" htmlFor="serviceRadius">Service Radius (km)</label>
                  <Input 
                    id="serviceRadius"
                    type="number"
                    name="serviceRadius"
                    value={formData.serviceRadius}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
                <p className="text-secondary">Schedule management coming soon...</p>
              </fieldset>

              <div className="form-actions">
                <Button type="submit" variant="primary">Save Profile</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NurseProfileManagementPage;
