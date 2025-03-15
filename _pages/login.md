---
layout: page
title: Login/Register
permalink: /login/
---
<script type="module" src="/assets/js/firebase.js"></script>

Welcome to Talchemist.ai!

Please sign in or register to start your interview sessions.

<form>
  <label>Email:</label><br>
  <input type="email" id="email"><br>

  <label>Password:</label><br>
  <input type="password" id="password"><br>

  <button type="button" onclick="loginUser(email.value, password.value)">Login</button>
  <button type="button" onclick="registerUser(email.value, password.value)">Register</button>
</form>
