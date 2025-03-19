console.log("Features script loaded...");

// 1) Grab references to your DOM elements
const loadKickoffBtn = document.getElementById('load-kickoff');
const loadJDBtn = document.getElementById('load-jd');
const mapJDBtn = document.getElementById('map-jd');
const saveKickoffBtn = document.getElementById('save-kickoff');
const createToolsBtn = document.getElementById('create-tools');
const chatPanel = document.getElementById('chat-panel');
const chatPlaceholder = document.getElementById('chat-placeholder');

// 2) Utility function to fetch file content
function fetchFileContent(url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => callback(data))
    .catch(err => {
      console.error("Error fetching " + url + ": ", err);
      callback("Error loading content.");
    });
}

// 3) Utility to type text at ~80ms per character (~12 chars/sec, ~120 wpm)
function typeText(target, text, callback, append = false) {
  if (!append) {
    target.innerHTML = "";
  }
  let i = 0;
  let delay = 80;
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

// 4) Listen for Firebase auth changes
firebase.auth().onAuthStateChanged((user) => {
  console.log("Auth state changed, user =", user);
  if (user) {
    // Hide placeholder text
    if (chatPlaceholder) chatPlaceholder.style.display = 'none';
    // Activate "Load Kickoff Form" button
    loadKickoffBtn.disabled = false;
    loadKickoffBtn.style.backgroundColor = "lightgreen";
    loadKickoffBtn.style.color = "black";
    loadKickoffBtn.style.cursor = "pointer";
  } else {
    // Show placeholder text
    if (chatPlaceholder) chatPlaceholder.style.display = 'block';
    // Disable all buttons
    [loadKickoffBtn, loadJDBtn, mapJDBtn, saveKickoffBtn, createToolsBtn].forEach(btn => {
      btn.disabled = true;
      btn.style.backgroundColor = "lightgray";
      btn.style.color = "darkgray";
      btn.style.cursor = "not-allowed";
    });
  }
});

// 5) Button Click Handlers
loadKickoffBtn.addEventListener('click', function() {
  loadKickoffBtn.disabled = true;
  loadKickoffBtn.style.backgroundColor = "lightgray";
  loadKickoffBtn.style.color = "darkgray";
  // Fetch and type out intake-example.md
  fetchFileContent('/assets/content/intake-example.md', function(data) {
    typeText(chatPanel, data, function() {
      // Enable "Load JD"
      loadJDBtn.disabled = false;
      loadJDBtn.style.backgroundColor = "lightgreen";
      loadJDBtn.style.color = "black";
      loadJDBtn.style.cursor = "pointer";
    }, false);
  });
});

loadJDBtn.addEventListener('click', function() {
  loadJDBtn.disabled = true;
  loadJDBtn.style.backgroundColor = "lightgray";
  loadJDBtn.style.color = "darkgray";
  // Insert divider
  chatPanel.innerHTML += "<hr>";
  // Fetch and type out jdexample.md
  fetchFileContent('/assets/content/jdexample.md', function(data) {
    typeText(chatPanel, data, function() {
      // Enable "Map JD to Kickoff"
      mapJDBtn.disabled = false;
      mapJDBtn.style.backgroundColor = "lightgreen";
      mapJDBtn.style.color = "black";
      mapJDBtn.style.cursor = "pointer";
    }, true);
  });
});

mapJDBtn.addEventListener('click', function() {
  mapJDBtn.disabled = true;
  mapJDBtn.style.backgroundColor = "lightgray";
  mapJDBtn.style.color = "darkgray";
  // Clear chat panel
  chatPanel.innerHTML = "";
  // Fetch and type out combined-jd-intake-example.md
  fetchFileContent('/assets/content/combined-jd-intake-example.md', function(data) {
    typeText(chatPanel, data, function() {
      // Enable "Save Kickoff"
      saveKickoffBtn.disabled = false;
      saveKickoffBtn.style.backgroundColor = "darkgreen";
      saveKickoffBtn.style.color = "white";
      saveKickoffBtn.style.cursor = "pointer";
    }, false);
  });
});

saveKickoffBtn.addEventListener('click', function() {
  const reqNumber = document.getElementById('req-number').value.trim();
  const hiringManager = document.getElementById('hiring-manager').value.trim();
  const recruiter = document.getElementById('recruiter').value.trim();
  if (!reqNumber || !hiringManager || !recruiter) {
    alert("Please complete all required fields above this refined Kickoff form.");
    return;
  }
  // Disable "Save Kickoff"
  saveKickoffBtn.disabled = true;
  saveKickoffBtn.style.backgroundColor = "lightgray";
  saveKickoffBtn.style.color = "darkgray";
  saveKickoffBtn.style.cursor = "not-allowed";
  // Enable "Create Recruiting/Sourcing Tools"
  createToolsBtn.disabled = false;
  createToolsBtn.style.backgroundColor = "darkgreen";
  createToolsBtn.style.color = "white";
  createToolsBtn.style.cursor = "pointer";
});

// We'll implement createToolsBtn later
