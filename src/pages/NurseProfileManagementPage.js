import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  Container,
  Section,
  Card,
  Button,
  Title,
  Subtitle,
  Text,
  Input,
  Label,
  FormGroup,
  Grid,
  Flex,
  Loader,
  ErrorMessage
} from '../components/ui/DesignSystem';

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
            services: data.rates?.specialties?.map(s => ({ name: s.name, rate: s.rate })) || [],
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
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating nurse profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <Section>
        <Container>
          <Flex direction="column" align="center" justify="center" style={{ minHeight: '400px' }}>
            <Loader size="48px" center />
            <Text style={{ marginTop: '1rem', textAlign: 'center' }}>Loading profile...</Text>
          </Flex>
        </Container>
      </Section>
    );
  }

  if (error && !nurseProfile) {
    return (
      <Section>
        <Container>
          <Card>
            <ErrorMessage>{error}</ErrorMessage>
          </Card>
        </Container>
      </Section>
    );
  }

  if (!nurseProfile) {
    return (
      <Section>
        <Container>
          <Card>
            <Text>No nurse profile found. Please ensure you are registered.</Text>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Card>
          <Title size="lg" mb="1.5rem">Manage Your Profile</Title>

          {message && (
            <div style={{
              padding: '1rem',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#059669',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              {message}
            </div>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleUpdateProfile}>
            <Card padding="1.5rem" style={{ marginBottom: '2rem' }}>
              <Subtitle size="lg" mb="1rem">Rates</Subtitle>

              <Grid columns={2} gap="1.5rem">
                <FormGroup>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="emergencyRate">Emergency Rate ($)</Label>
                  <Input
                    id="emergencyRate"
                    type="number"
                    name="emergencyRate"
                    value={formData.emergencyRate}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </FormGroup>
              </Grid>

              <div style={{ marginTop: '2rem' }}>
                <Subtitle mb="1rem">Specialty Rates</Subtitle>
                {formData.services.length > 0 ? (
                  <Grid columns={1} gap="1rem">
                    {formData.services.map(service => (
                      <Grid columns={2} gap="1.5rem" key={service.name}>
                        <FormGroup>
                          <Label>{service.name.replace('-', ' ').toUpperCase()}</Label>
                          <Input
                            type="number"
                            name={`serviceRate-${service.name}`}
                            value={service.rate}
                            onChange={handleChange}
                            min="0"
                            required
                          />
                        </FormGroup>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Text muted>No services defined. Please update your registration or contact support.</Text>
                )}
              </div>
            </Card>

            <Card padding="1.5rem" style={{ marginBottom: '2rem' }}>
              <Subtitle size="lg" mb="1rem">Availability & Preferences</Subtitle>

              <FormGroup>
                <Label htmlFor="serviceRadius">Service Radius (km)</Label>
                <Input
                  id="serviceRadius"
                  type="number"
                  name="serviceRadius"
                  value={formData.serviceRadius}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </FormGroup>

              <Text muted size="sm">Schedule management coming soon...</Text>
            </Card>

            <Flex justify="flex-start">
              <Button type="submit">Save Profile</Button>
            </Flex>
          </form>
        </Card>
      </Container>
    </Section>
  );
};

export default NurseProfileManagementPage;