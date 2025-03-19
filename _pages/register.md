---
layout: default
title: "Register - Talchemist.ai"
permalink: /register/
---
<section id="register-section">
  <h1>Unlock the Power of AI Recruiting</h1>
  <form id="register-form">
    <label for="register-fullname">Full Name</label>
    <input type="text" id="register-fullname" placeholder="Your full name" required>
    
    <label for="register-email">Email Address</label>
    <input type="email" id="register-email" placeholder="Your email" required>
    
    <label for="register-password">Password</label>
    <input type="password" id="register-password" placeholder="Choose a password" required>
    
    <label for="register-company">Company Name</label>
    <input type="text" id="register-company" placeholder="Your company name" required>
    
    <label for="register-role">Role</label>
    <select id="register-role" required>
      <option value="">Select Role</option>
      <option value="Recruiter">Recruiter</option>
      <option value="Hiring Manager">Hiring Manager</option>
      <option value="Interviewer">Interviewer</option>
      <option value="Other">Other</option>
    </select>
    
    <label>
      <input type="checkbox" id="register-agree" required>
      I agree to the Privacy Policy & Terms of Service.
    </label>
    
    <button type="submit">Create Account</button>
  </form>
  <p>Or Sign Up with: <a href="#">Google</a> | <a href="#">LinkedIn</a></p>
</section>

<script>
  // Firebase registration for new users
  document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullname = document.getElementById('register-fullname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const company = document.getElementById('register-company').value;
    const role = document.getElementById('register-role').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Optionally save additional user info in Firebase Database
        alert("Registration successful!");
        window.location.href = '/';  // Redirect after successful registration
      })
      .catch((error) => {
        console.error('Registration error:', error.message);
        alert("Registration failed: " + error.message);
      });
  });
</script>
