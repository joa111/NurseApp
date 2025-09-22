import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
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

// remove styled-components usage; use CSS utility classes instead

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
      <section className="center">
        <div className="stack text-center">
          <div>Loading...</div>
          <p className="text-secondary">Loading your dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-secondary">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1>Welcome, {nurseProfile?.fullName}</h1>
            <span className={`badge ${isOnline ? 'badge--success' : 'badge--neutral'}`}>
              {isOnline ? 'Active' : 'Offline'}
            </span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-secondary">
            <input type="checkbox" className="sr-only" checked={isOnline} onChange={toggleOnlineStatus} />
            <span className={`toggle ${isOnline ? 'toggle--on' : 'toggle--off'}`} aria-hidden="true" />
            <span className="font-medium">{isOnline ? 'Available for requests' : 'Not accepting requests'}</span>
          </label>
        </div>

        <div className="stack">
          <section className="card">
            <div className="card__body">
              <h2 className="mb-4">Incoming Requests</h2>
          {incomingRequests.length === 0 ? (
                <div className="text-center text-tertiary p-8">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-lg mb-1">No incoming requests</p>
                  <p>You'll be notified when new requests come in</p>
                </div>
          ) : (
                <div className="card-list">
                  {incomingRequests.map((request) => (
                    <Card key={request.id}>
                      <div>
                        <h3>{request.patientName}</h3>
                        <p>{request.serviceDetails?.serviceType}</p>
                        <p>{request.serviceDetails?.scheduledDateTime ? 
                          (request.serviceDetails.scheduledDateTime.toDate ? 
                            new Date(request.serviceDetails.scheduledDateTime.toDate()).toLocaleString() :
                            new Date(request.serviceDetails.scheduledDateTime).toLocaleString()
                          ) : 'Date not available'}</p>
                        <div className="flex gap-3 mt-4">
                          <Button variant="primary" onClick={() => handleAcceptRequest(request.id)}>
                            Accept
                          </Button>
                          <Button variant="outline" onClick={() => handleDeclineRequest(request.id)}>
                            Decline
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
          )}
            </div>
          </section>

          <section className="card">
            <div className="card__body">
              <h2 className="mb-4">Active Bookings</h2>
          {activeBookings.length === 0 ? (
                <div className="text-center text-tertiary p-8">
                  <div className="text-3xl mb-2">📅</div>
                  <p className="text-lg mb-1">No active bookings</p>
                  <p>Your confirmed bookings will appear here</p>
                </div>
          ) : (
                <div className="card-list">
                  {activeBookings.map((booking) => (
                    <Card key={booking.id}>
                      <div>
                        <h3>{booking.patientName}</h3>
                        <p>{booking.serviceDetails?.serviceType}</p>
                        <p>{booking.serviceDetails?.scheduledDateTime ? 
                          (booking.serviceDetails.scheduledDateTime.toDate ? 
                            new Date(booking.serviceDetails.scheduledDateTime.toDate()).toLocaleString() :
                            new Date(booking.serviceDetails.scheduledDateTime).toLocaleString()
                          ) : 'Date not available'}</p>
                        <div className="flex gap-3 mt-4">
                          {booking.status === 'confirmed' && (
                            <Button variant="primary" onClick={() => handleMarkInProgress(booking.id)}>
                              Start Service
                            </Button>
                          )}
                          {booking.status === 'in-progress' && (
                            <Button variant="success" onClick={() => handleMarkCompleted(booking.id)}>
                              Mark Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
          )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
