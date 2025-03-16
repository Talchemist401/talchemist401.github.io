// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-gAodfMUHL7eEarWHHcgmkzUr65FPxcU",
    authDomain: "talchemistmvp.firebaseapp.com",
    projectId: "talchemistmvp",
    storageBucket: "talchemistmvp.firebasestorage.app",
    messagingSenderId: "536025973021",
    appId: "1:536025973021:web:98dbeecd7a9db3cc4121f4"
};

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function for logging in users
window.loginUser = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            console.log("User Logged In:", userCredential.user);
            window.location.href = "/dashboard.html"; // Redirect to dashboard on success
        })
        .catch((error) => {
            alert("Error: " + error.message);
            console.error("Login Error:", error);
        });
};

// Function for registering new users
window.registerUser = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("User Registered Successfully!");
            console.log("User Registered:", userCredential.user);
            window.location.href = "/dashboard.html"; // Redirect on success
        })
        .catch((error) => {
            alert("Error: " + error.message);
            console.error("Registration Error:", error);
        });
};
