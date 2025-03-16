// Import Firebase modules from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Import Firestore modules
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// 🔹 Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-gAodfMUHL7eEarWHHcgmkzUr65FPxcU",
  authDomain: "talchemistmvp.firebaseapp.com",
  projectId: "talchemistmvp",
  storageBucket: "talchemistmvp.firebasestorage.app",
  messagingSenderId: "536025973021",
  appId: "1:536025973021:web:98dbeecd7a9db3cc4121f4"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 🔹 Google Login
window.loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    alert(`Logged in as: ${result.user.email}`);
    window.location.href = "/dashboard/";
  } catch (error) {
    alert(`Google Login Error: ${error.message}`);
  }
};

// 🔹 Logout
window.logoutUser = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "/";
  } catch (error) {
    alert(`Logout Error: ${error.message}`);
  }
};

// 🔹 Save Interview Session to Firestore
window.saveInterviewSession = async (questionsText, responses) => {
  if (!auth.currentUser) {
    alert("Please log in to save your interview session.");
    return;
  }
  try {
    await addDoc(collection(db, "interviewSessions"), {
      userEmail: auth.currentUser.email,
      questions: questionsText,
      responses: responses,
      createdAt: new Date()
    });
    alert("Interview session saved!");
  } catch (error) {
    alert(`Error saving session: ${error.message}`);
  }
};

// 🔹 Call GPT-4 via Firebase Cloud Function
window.getAiFeedback = async (question) => {
    const payload = {
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are an AI-powered interview assistant." },
            { role: "user", content: question }
        ]
    };

    const response = await fetch("https://us-central1-talchemistmvp.cloudfunctions.net/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    return result.choices ? result.choices[0].message.content : "Error: No response from AI";
};

// 🔹 Transcribe Audio Using Whisper API
window.transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append("file", audioBlob);
  formData.append("model", "whisper-1");

  const response = await fetch("https://us-central1-talchemistmvp.cloudfunctions.net/api/whisper", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  return result.text || "Error: Unable to transcribe audio.";
};

// 🔹 Track User Login State
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userEmail").innerText = `Logged in as: ${user.email}`;
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("logoutButton").style.display = "block";
  } else {
    document.getElementById("userEmail").innerText = "";
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("logoutButton").style.display = "none";
  }
});
