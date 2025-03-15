// assets/js/firebase.js

// Import Firebase modules from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Import Firestore modules
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-gAodfMUHL7eEarWHHcgmkzUr65FPxcU",
  authDomain: "talchemistmvp.firebaseapp.com",
  projectId: "talchemistmvp",
  storageBucket: "talchemistmvp.firebasestorage.app",
  messagingSenderId: "536025973021",
  appId: "1:536025973021:web:98dbeecd7a9db3cc4121f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Functions to handle sign-up and sign-in
window.registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert(`Registered as: ${userCredential.user.email}`);
    // Optionally redirect to a dashboard page here
  } catch (error) {
    alert(`Registration Error: ${error.message}`);
  }
};

window.loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Logged in as: ${userCredential.user.email}`);
    // Optionally redirect to a dashboard page here
  } catch (error) {
    alert(`Login Error: ${error.message}`);
  }
};

// Function to save interview questions to Firestore
window.saveInterviewSession = async (questionsText) => {
  try {
    const docRef = await addDoc(collection(db, "interviewSessions"), {
      questions: questionsText,
      createdAt: new Date()
    });
    alert("Interview session saved with ID: " + docRef.id);
  } catch (error) {
    alert("Error saving session: " + error.message);
  }
};
