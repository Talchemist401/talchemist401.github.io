---
layout: page
title: Dashboard
permalink: /dashboard/
---

<script type="module" src="/assets/js/firebase.js"></script>

# Interview Dashboard

Welcome to your Interview Dashboard!

Please paste your interview questions below and click **Start Interview** when you're ready.

<textarea id="questions" rows="10" style="width:100%;" placeholder="Paste your interview questions here..."></textarea>

<br/><br/>
<button type="button" id="startInterview">Start Interview</button>

<!-- Placeholder for dynamic content like AI hints will appear here -->
<div id="interviewOutput"></div>

<script>
  document.getElementById('startInterview').addEventListener('click', function() {
    const questions = document.getElementById('questions').value.trim();
    if (!questions) {
      alert("Please enter some interview questions first.");
      return;
    }

    // 1. Save the questions in Firebase Firestore
    saveInterviewSession(questions);

    // 2. Display the questions as a simple confirmation on the page
    document.getElementById('interviewOutput').innerHTML =
      "<h3>Interview Session Started</h3><p>" + questions.replace(/\n/g, "<br/>") + "</p>";

    // Future steps:
    // - Generate the first question with an AI-generated answer
    // - Enable real-time updates for hints and follow-ups
  });
</script>
