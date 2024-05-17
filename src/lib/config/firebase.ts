// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBU9lYkWOfKVWCJejhohkLRXxR4FMnwsFI',
  authDomain: 'mamosetsels.firebaseapp.com',
  projectId: 'mamosetsels',
  storageBucket: 'mamosetsels.appspot.com',
  messagingSenderId: '295490861497',
  appId: '1:295490861497:web:90831ce4ca5ade68ba9e68',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
