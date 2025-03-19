---
layout: default
title: "Login - Talchemist.ai"
permalink: /login/
---
<section id="login-section">
  <h1>Welcome Back, Alchemist!</h1>
  <form id="login-form">
    <label for="login-email">Email Address</label>
    <input type="email" id="login-email" placeholder="Enter your email" required>
    
    <label for="login-password">Password</label>
    <input type="password" id="login-password" placeholder="Enter your password" required>
    
    <button type="submit">Login</button>
  </form>
  <p><a href="/register">New here? Sign up for free.</a></p>
</section>

<script>
  // Firebase authentication for login
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successful login: Redirect or update UI
        window.location.href = '/';  // Redirect to homepage or user dashboard
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        alert("Login failed: " + error.message);
      });
  });
</script>
