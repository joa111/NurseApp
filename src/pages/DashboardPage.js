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
  arrayRemove,
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
    if (!currentUser) {
      console.log('No current user');
      return;
    }
    
    console.log('Current nurse ID:', currentUser.uid);

    // Listen to nurse profile
    const nurseRef = doc(db, 'nurses', currentUser.uid);
    const unsubscribeProfile = onSnapshot(nurseRef, (docSnap) => {
      if (docSnap.exists()) {
        const profile = docSnap.data();
        setNurseProfile(profile);
        setIsOnline(profile.availability?.isOnline || false);
      } else {
        console.log('Nurse profile does not exist!');
      }
    });

    // Incoming Requests (new structure with array)
    const requestsQueryArray = query(
      collection(db, 'serviceRequests'),
      where('status', '==', 'pending-response'),
      where('matching.selectedNurseIds', 'array-contains', currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribeRequests1 = onSnapshot(requestsQueryArray, (snapshot) => {
      setIncomingRequests(prev => {
        let updated = [...prev];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            const newData = { id: change.doc.id, ...change.doc.data() };
            updated = updated.filter(req => req.id !== newData.id).concat(newData);
          }
          if (change.type === 'removed') {
            updated = updated.filter(req => req.id !== change.doc.id);
          }
        });
        return updated.sort((a, b) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        ).slice(0, 10);
      });
    });

    // Incoming Requests (old structure single nurse)
    const requestsQuerySingle = query(
      collection(db, 'serviceRequests'),
      where('status', '==', 'pending-response'),
      where('matching.selectedNurseId', '==', currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribeRequests2 = onSnapshot(requestsQuerySingle, (snapshot) => {
      setIncomingRequests(prev => {
        let updated = [...prev];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            const newData = { id: change.doc.id, ...change.doc.data() };
            updated = updated.filter(req => req.id !== newData.id).concat(newData);
          }
          if (change.type === 'removed') {
            updated = updated.filter(req => req.id !== change.doc.id);
          }
        });
        return updated.sort((a, b) => 
          (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        ).slice(0, 10);
      });
    });

    // Active bookings
    const bookingsQuery = query(
      collection(db, 'serviceRequests'),
      where('matching.selectedNurseId', '==', currentUser.uid),
      where('status', 'in', ['confirmed', 'in-progress']),
      orderBy('serviceDetails.scheduledDateTime.seconds', 'asc')
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
      unsubscribeRequests1();
      unsubscribeRequests2();
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
        'matching.selectedNurseId': currentUser.uid,
        'matching.confirmedAt': Timestamp.now()
      });
      alert('Request accepted! Patient has been notified.');
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Error accepting request. Please try again.');
    }
  };

  const handleDeclineRequest = async (requestId, request) => {
    try {
      const remainingNurses = (request.matching?.selectedNurseIds || [])
        .filter(id => id !== currentUser.uid);
      
      const updateData = {
        'matching.selectedNurseIds': remainingNurses,
        'matching.declinedBy': arrayUnion(currentUser.uid)
      };

      if (remainingNurses.length === 0) {
        updateData.status = 'finding-nurses';
        updateData['matching.selectedNurseId'] = null;
      }

      await updateDoc(doc(db, 'serviceRequests', requestId), updateData);
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

  const formattedScheduledDateTime = (scheduledDateTime) => {
    if (!scheduledDateTime) return 'Date not available';
    if (scheduledDateTime._seconds) {
      return new Date(scheduledDateTime._seconds * 1000).toLocaleString();
    }
    if (scheduledDateTime.seconds) {
      return new Date(scheduledDateTime.seconds * 1000).toLocaleString();
    }
    if (scheduledDateTime instanceof Date) {
      return scheduledDateTime.toLocaleString();
    }
    return 'Date not available';
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

  if (nurseProfile?.profileStatus === 'pending_verification') {
    return (
      <Section>
        <Container>
          <Card style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(253, 230, 138, 0.25)' }}>
            <Title size="md" mb="1rem">Account Pending Verification</Title>
            <Text muted mb="1.5rem">
              Please wait for admin verification in order to accept new requests.<br />
              You will be notified once your account is verified and you can start accepting patient requests.
            </Text>
          </Card>
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
          {/* Incoming Requests */}
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
                    <Flex justify="space-between" align="start" mb="0.5rem">
                      <Title size="sm" mb="0">{request.patientName}</Title>
                      {request.matching?.selectedNurseIds?.length > 1 && (
                        <StatusBadge status="info">
                          {request.matching.selectedNurseIds.length} nurses notified
                        </StatusBadge>
                      )}
                    </Flex>
                    <Text mb="0.5rem">{request.serviceDetails?.type}</Text>
                    <Text size="sm" muted mb="0.5rem">
                      Scheduled: {formattedScheduledDateTime(request.serviceDetails?.scheduledDateTime)}
                    </Text>
                    {request.serviceDetails?.specialRequirements && (
                      <Text size="sm" muted mb="1rem">
                        Note: {request.serviceDetails.specialRequirements}
                      </Text>
                    )}
                    <Flex gap="0.75rem">
                      <Button onClick={() => handleAcceptRequest(request.id)}>
                        Accept
                      </Button>
                      <Button variant="secondary" onClick={() => handleDeclineRequest(request.id, request)}>
                        Decline
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            )}
          </Card>

          {/* Active Bookings */}
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
                    <Text mb="0.5rem">{booking.serviceDetails?.type}</Text>
                    <Text size="sm" muted mb="0.5rem">
                      Scheduled: {formattedScheduledDateTime(booking.serviceDetails?.scheduledDateTime)}
                    </Text>
                    {booking.serviceDetails?.specialRequirements && (
                      <Text size="sm" muted mb="0.5rem">
                        Note: {booking.serviceDetails.specialRequirements}
                      </Text>
                    )}
                    {booking.payment?.nursePayment?.amount && (
                      <Text size="sm" muted mb="1rem">
                        Payment: ₹{booking.payment.nursePayment.amount}
                      </Text>
                    )}
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
