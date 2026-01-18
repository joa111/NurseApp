// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, onSnapshot, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- IMPORTANT ---
// PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Function to update nurse availability
export const updateNurseAvailability = async (nurseId, availabilityData) => {
  try {
    const nurseRef = doc(db, 'nurses', nurseId);
    await updateDoc(nurseRef, {
      'availability': availabilityData,
      'availability.lastSeen': Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    throw error;
  }
};

// Function to get service requests for a nurse
export const getNurseServiceRequests = (nurseId, callback) => {
  const q = query(
    collection(db, 'serviceRequests'),
    where('matching.selectedNurseId', '==', nurseId),
    where('status', '==', 'pending-response')
  );

  return onSnapshot(q, callback);
};
