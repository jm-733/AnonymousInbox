// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-b33PO1HYtFM6lKUjO9MLgYI4blii6Wk",
  authDomain: "anonymous-inbox-bd967.firebaseapp.com",
  projectId: "anonymous-inbox-bd967",
  storageBucket: "anonymous-inbox-bd967.firebasestorage.app",
  messagingSenderId: "791533468635",
  appId: "1:791533468635:web:a241c872d0ef44244f85fe",
  measurementId: "G-BW7EQWEXYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
