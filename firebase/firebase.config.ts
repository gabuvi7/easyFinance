import { initializeApp, getApps } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase
const firebaseAppConfig = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db: Firestore = getFirestore(firebaseAppConfig);
const storage = getStorage(firebaseAppConfig);

export { firebaseAppConfig, db, storage };
