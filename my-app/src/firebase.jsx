// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyCbiXr6RUQ9RUonAFiAd11-kNXLyJ5U7gg',
  authDomain: 'resumetask-8b9c5.firebaseapp.com',
  projectId: 'resumetask-8b9c5',
  storageBucket: 'resumetask-8b9c5.firebasestorage.app',
  messagingSenderId: '458316329246',
  databaseURL: "https://resumetask-8b9c5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  appId: '1:458316329246:web:942b2ba89e26883113190f',
  measurementId: 'G-7E0TB6CLLE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
