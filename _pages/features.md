---
layout: default
title: "Features - Talchemist.ai"
permalink: /features/
---
<!-- Required Fields Above Chat Panel -->
<div id="required-fields" style="display: flex; justify-content: space-evenly; margin-bottom: 10px;">
  <div style="flex: 1; margin: 0 5px;">
    <label>Req Number <span style="color: red;">*</span></label>
    <input type="text" id="req-number" placeholder="Req Number" style="width: 100%; padding: 5px;" required>
  </div>
  <div style="flex: 1; margin: 0 5px;">
    <label>Hiring Manager <span style="color: red;">*</span></label>
    <input type="text" id="hiring-manager" placeholder="Hiring Manager" style="width: 100%; padding: 5px;" required>
  </div>
  <div style="flex: 1; margin: 0 5px;">
    <label>Recruiter <span style="color: red;">*</span></label>
    <input type="text" id="recruiter" placeholder="Recruiter" style="width: 100%; padding: 5px;" required>
  </div>
</div>

<!-- Chat Panel (Expandable with Custom Scrollbar) -->
<div id="chat-panel" style="border: 1px solid #ccc; padding: 10px; min-height: 150px; max-height: 75vh; overflow-y: auto;">
  <p id="chat-placeholder" style="color: gray;">Please login/register to use this demo</p>
</div>

<!-- Button Container -->
<div id="button-container" style="margin-top: 10px; text-align: center;">
  <button id="load-kickoff" style="background-color: lightgreen; color: black; padding: 10px 20px; border: none; cursor: pointer;">Load Kickoff Form</button>
  <button id="load-jd" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Load JD</button>
  <button id="map-jd" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Map JD to Kickoff</button>
  <button id="save-kickoff" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Save Kickoff</button>
  <button id="create-tools" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Create Recruiting/Sourcing Tools</button>
</div>

<script>
  /***** Utility Functions *****/

  // Simulate typing effect: types text into target element at approx. 80ms per character.
  function typeText(target, text, callback, append = false) {
    if (!append) {
      target.innerHTML = "";
    }
    let i = 0;
    let delay = 80; // 80ms per character (~12 characters per second)
    function typeChar() {
      if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeChar, delay);
      } else {
        if (callback) callback();
      }
    }
    typeChar();
  }

  // Fetch file content from a given URL
  function fetchFileContent(url, callback) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        callback(data);
      })
      .catch(err => {
        console.error("Error fetching " + url + ": ", err);
        callback("Error loading content.");
      });
  }

  /***** Element References *****/
  const loadKickoffBtn = document.getElementById('load-kickoff');
  const loadJDBtn = document.getElementById('load-jd');
  const mapJDBtn = document.getElementById('map-jd');
  const saveKickoffBtn = document.getElementById('save-kickoff');
  const createToolsBtn = document.getElementById('create-tools');
  const chatPanel = document.getElementById('chat-panel');
  const chatPlaceholder = document.getElementById('chat-placeholder');

  /***** Firebase Auth State Handling *****/
  firebase.auth().onAuthStateChanged((user) => {
    console.log("Auth state changed, user =", user);
    if (user) {
      // Remove placeholder text if logged in
      if (chatPlaceholder) chatPlaceholder.style.display = 'none';
      // Activate "Load Kickoff Form" button
      loadKickoffBtn.disabled = false;
      loadKickoffBtn.style.backgroundColor = "lightgreen";
      loadKickoffBtn.style.color = "black";
      loadKickoffBtn.style.cursor = "pointer";
    } else {
      // Show placeholder text if logged out
      if (chatPlaceholder) chatPlaceholder.style.display = 'block';
      // Disable all buttons and set inactive styles
      [loadKickoffBtn, loadJDBtn, mapJDBtn, saveKickoffBtn, createToolsBtn].forEach(btn => {
        btn.disabled = true;
        btn.style.backgroundColor = "lightgray";
        btn.style.color = "darkgray";
        btn.style.cursor = "not-allowed";
      });
    }
  });

  /***** Button Click Handlers *****/

  // 1. Load Kickoff Form: Type out _pages/intake-example.md at 120 wpm
  loadKickoffBtn.addEventListener('click', function() {
    loadKickoffBtn.disabled = true;
    loadKickoffBtn.style.backgroundColor = "lightgray";
    loadKickoffBtn.style.color = "darkgray";
    fetchFileContent('/intake-example.md', function(data) {
      typeText(chatPanel, data, function() {
        // Activate "Load JD" button when finished
        loadJDBtn.disabled = false;
        loadJDBtn.style.backgroundColor = "lightgreen";
        loadJDBtn.style.color = "black";
        loadJDBtn.style.cursor = "pointer";
      }, false);
    });
  });

  // 2. Load JD: Insert divider and type out _pages/jdexample.md at 120 wpm
  loadJDBtn.addEventListener('click', function() {
    loadJDBtn.disabled = true;
    loadJDBtn.style.backgroundColor = "lightgray";
    loadJDBtn.style.color = "darkgray";
    // Append horizontal divider
    chatPanel.innerHTML += "<hr>";
    fetchFileContent('/jdexample.md', function(data) {
      typeText(chatPanel, data, function() {
        // Activate "Map JD to Kickoff" button when finished
        mapJDBtn.disabled = false;
        mapJDBtn.style.backgroundColor = "lightgreen";
        mapJDBtn.style.color = "black";
        mapJDBtn.style.cursor = "pointer";
      }, true);
    });
  });

  // 3. Map JD to Kickoff: Overwrite chat panel and type out _pages/combined-jd-intake-example.md
  mapJDBtn.addEventListener('click', function() {
    mapJDBtn.disabled = true;
    mapJDBtn.style.backgroundColor = "lightgray";
    mapJDBtn.style.color = "darkgray";
    chatPanel.innerHTML = "";
    fetchFileContent('/combined-jd-intake-example.md', function(data) {
      typeText(chatPanel, data, function() {
        // Activate "Save Kickoff" button (dark green with white font) when finished
        saveKickoffBtn.disabled = false;
        saveKickoffBtn.style.backgroundColor = "darkgreen";
        saveKickoffBtn.style.color = "white";
        saveKickoffBtn.style.cursor = "pointer";
      }, false);
    });
  });

  // 4. Save Kickoff: Check required fields and, if complete, disable button and activate "Create Recruiting/Sourcing Tools"
  saveKickoffBtn.addEventListener('click', function() {
    var reqNumber = document.getElementById('req-number').value.trim();
    var hiringManager = document.getElementById('hiring-manager').value.trim();
    var recruiter = document.getElementById('recruiter').value.trim();
    if (!reqNumber || !hiringManager || !recruiter) {
      alert("Please complete all required fields above this refined Kickoff form.");
      return;
    }
    // Disable Save Kickoff button and activate Create Recruiting/Sourcing Tools button
    saveKickoffBtn.disabled = true;
    saveKickoffBtn.style.backgroundColor = "lightgray";
    saveKickoffBtn.style.color = "darkgray";
    saveKickoffBtn.style.cursor = "not-allowed";
    createToolsBtn.disabled = false;
    createToolsBtn.style.backgroundColor = "darkgreen";
    createToolsBtn.style.color = "white";
    createToolsBtn.style.cursor = "pointer";
  });

  // 5. (Optional) Create Recruiting/Sourcing Tools: Implementation to be added later.
</script>

<style>
  /* Custom Scrollbar Styling for Chat Panel */
  #chat-panel::-webkit-scrollbar {
    width: 10px;
  }
  #chat-panel::-webkit-scrollbar-track {
    background: lightblue;
  }
  #chat-panel::-webkit-scrollbar-thumb {
    background-color: gold;
    border-radius: 5px;
    border: 2px solid lightblue;
  }
</style>
