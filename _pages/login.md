---
layout: default
title: Login
permalink: /login.html
---

# Login to TalchemistMVP

Welcome! Please enter your credentials below to log in.

## **Login Form**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - TalchemistMVP</title>
    <script type="module" src="/assets/js/firebase.js"></script>
</head>
<body>
    <h2>Login</h2>
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="Enter your email" required>
    
    <label for="password">Password:</label>
    <input type="password" id="password" placeholder="Enter your password" required>

    <button onclick="loginUser()">Login</button>

    <h2>Register</h2>
    <label for="reg-email">Email:</label>
    <input type="email" id="reg-email" placeholder="Enter your email" required>
    
    <label for="reg-password">Password:</label>
    <input type="password" id="reg-password" placeholder="Enter your password" required>

    <button onclick="registerUser()">Register</button>

    <script>
        function loginUser() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            window.loginUser(email, password);
        }

        function registerUser() {
            const email = document.getElementById("reg-email").value;
            const password = document.getElementById("reg-password").value;

            window.registerUser(email, password);
        }
    </script>
</body>
</html>
