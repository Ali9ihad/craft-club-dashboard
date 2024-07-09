// firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "craft-club-dashboard.firebaseapp.com",
  projectId: "craft-club-dashboard",
  storageBucket: "craft-club-dashboard.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
  databaseURL: "https://craft-club-dashboard.firebaseio.com" // Ensure this matches your Firebase database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
