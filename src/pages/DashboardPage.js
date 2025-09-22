import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { 
  Container,
  Section,
  Card,
  Button,
  Title,
  Text,
  StatusBadge,
  Flex,
  Grid,
  Loader,
  Checkbox
} from '../components/ui/DesignSystem';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc,
  orderBy,
  limit,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [nurseProfile, setNurseProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch nurse profile and set up real-time listeners
  useEffect(() => {
    if (!currentUser) return;

    // Listen to nurse profile
    const nurseRef = doc(db, 'nurses', currentUser.uid);
    const unsubscribeProfile = onSnapshot(nurseRef, (doc) => {
      if (doc.exists()) {
        const profile = doc.data();
        setNurseProfile(profile);
        setIsOnline(profile.availability?.isOnline || false);
      }
    });

    // Listen to incoming service requests
    const requestsQuery = query(
      collection(db, 'serviceRequests'),
      where('status', '==', 'pending-response'),
      where('matching.selectedNurseId', '==', currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setIncomingRequests(requests);
    });

    // Listen to active bookings
    const bookingsQuery = query(
      collection(db, 'serviceRequests'),
      where('matching.selectedNurseId', '==', currentUser.uid),
      where('status', 'in', ['confirmed', 'in-progress']),
      orderBy('serviceDetails.scheduledDateTime', 'asc')
    );

    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActiveBookings(bookings);
    });

    setLoading(false);

    return () => {
      unsubscribeProfile();
      unsubscribeRequests();
      unsubscribeBookings();
    };
  }, [currentUser]);

  const toggleOnlineStatus = async () => {
    if (!currentUser || !nurseProfile) return;
    
    const newStatus = !isOnline;
    await updateDoc(doc(db, 'nurses', currentUser.uid), {
      'availability.isOnline': newStatus,
      'availability.lastSeen': Timestamp.now()
    });
    setIsOnline(newStatus);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await updateDoc(doc(db, 'serviceRequests', requestId), {
        status: 'confirmed',
        'matching.confirmedAt': Timestamp.now()
      });
      
      alert('Request accepted! Patient has been notified.');
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Error accepting request. Please try again.');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await updateDoc(doc(db, 'serviceRequests', requestId), {
        status: 'finding-nurses',
        'matching.selectedNurseId': null,
        'matching.declinedBy': arrayUnion(currentUser.uid)
      });
      
      alert('Request declined. It will be offered to another nurse.');
    } catch (error) {
      console.error('Error declining request:', error);
      alert('Error declining request. Please try again.');
    }
  };

  const handleMarkInProgress = async (bookingId) => {
    try {
      await updateDoc(doc(db, 'serviceRequests', bookingId), {
        status: 'in-progress',
        'matching.startedAt': Timestamp.now()
      });
      alert('Booking marked as in-progress.');
    } catch (error) {
      console.error('Error marking in-progress:', error);
      alert('Error marking booking as in-progress. Please try again.');
    }
  };

  const handleMarkCompleted = async (bookingId) => {
    try {
      await updateDoc(doc(db, 'serviceRequests', bookingId), {
        status: 'completed',
        'matching.completedAt': Timestamp.now()
      });
      alert('Booking marked as completed!');
    } catch (error) {
      console.error('Error marking completed:', error);
      alert('Error marking booking as completed. Please try again.');
    }
  };

  if (loading) {
    return (
      <Section>
        <Container>
          <Flex direction="column" align="center" justify="center" style={{ minHeight: '400px' }}>
            <Loader size="48px" center />
            <Text style={{ marginTop: '1rem', textAlign: 'center' }}>Loading your dashboard...</Text>
          </Flex>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Flex justify="space-between" align="center" wrap="wrap" gap="1rem" style={{ marginBottom: '2rem' }}>
          <Flex align="center" gap="0.75rem">
            <Title size="lg" mb="0">Welcome, {nurseProfile?.fullName}</Title>
            <StatusBadge status={isOnline ? 'online' : 'offline'}>
              {isOnline ? 'Active' : 'Offline'}
            </StatusBadge>
          </Flex>
          
          <Flex align="center" gap="0.5rem">
            <Checkbox>
              <input 
                type="checkbox" 
                checked={isOnline} 
                onChange={toggleOnlineStatus}
              />
              <label>
                {isOnline ? 'Available for requests' : 'Not accepting requests'}
              </label>
            </Checkbox>
          </Flex>
        </Flex>

        <Grid columns={1} gap="2rem">
          {/* Incoming Requests Section */}
          <Card>
            <Title size="md" mb="1.5rem">Incoming Requests</Title>
            {incomingRequests.length === 0 ? (
              <Flex direction="column" align="center" justify="center" style={{ padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                <Title size="sm" mb="0.5rem">No incoming requests</Title>
                <Text muted mb="0">You'll be notified when new requests come in</Text>
              </Flex>
            ) : (
              <Grid columns={1} gap="1rem">
                {incomingRequests.map((request) => (
                  <Card key={request.id} padding="1.25rem">
                    <Title size="sm" mb="0.5rem">{request.patientName}</Title>
                    <Text mb="0.5rem">{request.serviceDetails?.serviceType}</Text>
                    <Text size="sm" muted mb="1rem">
                      {request.serviceDetails?.scheduledDateTime ? 
                        (request.serviceDetails.scheduledDateTime.toDate ? 
                          new Date(request.serviceDetails.scheduledDateTime.toDate()).toLocaleString() :
                          new Date(request.serviceDetails.scheduledDateTime).toLocaleString()
                        ) : 'Date not available'}
                    </Text>
                    <Flex gap="0.75rem">
                      <Button onClick={() => handleAcceptRequest(request.id)}>
                        Accept
                      </Button>
                      <Button variant="secondary" onClick={() => handleDeclineRequest(request.id)}>
                        Decline
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            )}
          </Card>

          {/* Active Bookings Section */}
          <Card>
            <Title size="md" mb="1.5rem">Active Bookings</Title>
            {activeBookings.length === 0 ? (
              <Flex direction="column" align="center" justify="center" style={{ padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                <Title size="sm" mb="0.5rem">No active bookings</Title>
                <Text muted mb="0">Your confirmed bookings will appear here</Text>
              </Flex>
            ) : (
              <Grid columns={1} gap="1rem">
                {activeBookings.map((booking) => (
                  <Card key={booking.id} padding="1.25rem">
                    <Title size="sm" mb="0.5rem">{booking.patientName}</Title>
                    <Text mb="0.5rem">{booking.serviceDetails?.serviceType}</Text>
                    <Text size="sm" muted mb="1rem">
                      {booking.serviceDetails?.scheduledDateTime ? 
                        (booking.serviceDetails.scheduledDateTime.toDate ? 
                          new Date(booking.serviceDetails.scheduledDateTime.toDate()).toLocaleString() :
                          new Date(booking.serviceDetails.scheduledDateTime).toLocaleString()
                        ) : 'Date not available'}
                    </Text>
                    <Flex gap="0.75rem">
                      {booking.status === 'confirmed' && (
                        <Button onClick={() => handleMarkInProgress(booking.id)}>
                          Start Service
                        </Button>
                      )}
                      {booking.status === 'in-progress' && (
                        <Button onClick={() => handleMarkCompleted(booking.id)}>
                          Mark Completed
                        </Button>
                      )}
                    </Flex>
                  </Card>
                ))}
              </Grid>
            )}
          </Card>
        </Grid>
      </Container>
    </Section>
  );
};

export default DashboardPage;