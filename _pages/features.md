---
layout: default
title: "Features - Talchemist.ai"
permalink: /features/
---
<!-- Features Page: New Role Kick-Off Meeting -->
<section id="role-kickoff">
  <h1>New Role Kick-Off Meeting</h1>
  
  <!-- Chat Panel -->
  <div id="chat-panel" style="border: 1px solid #ccc; min-height: 200px; padding: 10px;">
    <!-- The chat panel starts empty. Content will load as you click buttons. -->
  </div>
  
  <!-- Action Buttons -->
  <div id="buttons" style="margin-top: 20px;">
    <button id="load-intake" class="btn primary">Load Intake Template</button>
    <button id="load-jd" class="btn primary" disabled>Load JD</button>
    <button id="map-jd" class="btn primary" disabled>Map JD to Intake</button>
    <button id="save-intake" class="btn primary" disabled>Save Intake</button>
    <button id="create-tools" class="btn primary" disabled>Create Recruiting/Sourcing Tools</button>
  </div>
</section>

<!-- Inline JavaScript for Button Functionality -->
<script>
  document.addEventListener("DOMContentLoaded", function() {
    // Grab references to the chat panel and buttons
    const chatPanel = document.getElementById('chat-panel');
    const loadIntakeBtn = document.getElementById('load-intake');
    const loadJdBtn = document.getElementById('load-jd');
    const mapJdBtn = document.getElementById('map-jd');
    const saveIntakeBtn = document.getElementById('save-intake');
    const createToolsBtn = document.getElementById('create-tools');

    // When "Load Intake Template" is clicked:
    loadIntakeBtn.addEventListener("click", function() {
      chatPanel.innerHTML = "<p><strong>Example Kick-Off Template:</strong><br>[Insert your example kick-off template content here.]</p>";
      loadIntakeBtn.disabled = true;
      loadJdBtn.disabled = false;
    });

    // When "Load JD" is clicked:
    loadJdBtn.addEventListener("click", function() {
      // Append a horizontal rule and job description content
      chatPanel.innerHTML += "<hr><p><strong>Job Description:</strong><br>[Insert your Feature Page Job Description content here.]</p>";
      loadJdBtn.disabled = true;
      mapJdBtn.disabled = false;
    });

    // When "Map JD to Intake" is clicked:
    mapJdBtn.addEventListener("click", function() {
      // Replace the current content with the combined job description
      chatPanel.innerHTML = "<p><strong>Combined Job Description:</strong><br>[Insert your Combined Feature Page Job Description content here.]</p>";
      mapJdBtn.disabled = true;
      saveIntakeBtn.disabled = false;
    });

    // When "Save Intake" is clicked:
    saveIntakeBtn.addEventListener("click", function() {
      // Replace the content to show the saved intake form
      chatPanel.innerHTML = "<p><strong>Saved Intake:</strong><br>[The combined job description is now saved.]</p>";
      saveIntakeBtn.disabled = true;
      createToolsBtn.disabled = false;
    });

    // When "Create Recruiting/Sourcing Tools" is clicked:
    createToolsBtn.addEventListener("click", function() {
      // Append a placeholder for the Recruiting and Sourcing Tools tables
      chatPanel.innerHTML += "<p><strong>Recruiting/Sourcing Tools:</strong><br>[This area will display the Recruiting Tools and Sourcing Tools tables.]</p>";
      createToolsBtn.disabled = true;
    });
  });
</script>

<!-- Additional Features Page content can be added below as needed -->
