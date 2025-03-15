// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

// Firebase Config
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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 🔹 Register User (Email/Password)
window.registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert(`Registered as: ${userCredential.user.email}`);
    window.location.href = "/dashboard/";
  } catch (error) {
    alert(`Registration Error: ${error.message}`);
  }
};

// 🔹 Login User (Email/Password)
window.loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Logged in as: ${userCredential.user.email}`);
    window.location.href = "/dashboard/";
  } catch (error) {
    alert(`Login Error: ${error.message}`);
  }
};

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

// 🔹 Save Interview Session Per User
window.saveInterviewSession = async (questionsText, responses) => {
  try {
    if (!auth.currentUser) {
      alert("Please log in to save your interview session.");
      return;
    }
    const docRef = await addDoc(collection(db, "interviewSessions"), {
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

// 🔹 Load Past Interviews for Logged-In User
window.loadPastInterviews = async () => {
  try {
    if (!auth.currentUser) {
      alert("Please log in to view past interviews.");
      return;
    }
    const q = query(collection(db, "interviewSessions"), where("userEmail", "==", auth.currentUser.email));
    const querySnapshot = await getDocs(q);

    let pastInterviewsHTML = "<h3>Past Interviews</h3><ul>";
    querySnapshot.forEach(doc => {
      pastInterviewsHTML += `<li><strong>${doc.data().questions}</strong>: ${doc.data().responses}</li>`;
    });
    pastInterviewsHTML += "</ul>";

    document.getElementById("questionContainer").innerHTML = pastInterviewsHTML;
  } catch (error) {
    alert(`Error loading past interviews: ${error.message}`);
  }
};

// 🔹 Whisper API: Transcribe Audio to Text
window.transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append("file", audioBlob);
  formData.append("model", "whisper-1");

  const response = await fetch("YOUR_SERVER_ENDPOINT/whisper", {
    method: "POST",
    headers: { "Authorization": `Bearer YOUR_OPENAI_API_KEY` },
    body: formData
  });

  const result = await response.json();
  return result.text; // Return transcribed text
};

// 🔹 GPT-4 AI Analysis & Follow-ups
window.getAiFeedback = async (question, response) => {
  const payload = {
    prompt: `Analyze this response: "${response}" to the question "${question}". Provide a quality assessment and 3 follow-up questions.`,
    model: "gpt-4"
  };

  const responseAI = await fetch("YOUR_SERVER_ENDPOINT/gpt", {
    method: "POST",
    headers: { "Authorization": `Bearer YOUR_OPENAI_API_KEY`, "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await responseAI.json();
  return result.choices[0].text; // Return AI-generated feedback
};

// 🔹 Stripe Payment (Subscription)
window.subscribeUser = async (plan) => {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan })
  });

  const data = await response.json();
  if (data.url) {
    window.location.href = data.url; // Redirect to Stripe Checkout
  } else {
    alert("Subscription error: " + data.error);
  }
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
