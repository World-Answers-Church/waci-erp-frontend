import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Firestore and Auth instances
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
