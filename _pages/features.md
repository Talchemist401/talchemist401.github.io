---
layout: default
title: "Features - Talchemist.ai"
permalink: /features/
---
<!-- Required Fields -->
<div id="required-fields" style="display: flex; justify-content: space-evenly; margin-bottom: 10px;">
  <div style="flex: 1; margin: 0 5px;">
    <label>Req Number <span style="color: red;">*</span></label>
    <input type="text" id="req-number" placeholder="Req Number" style="width: 100%; padding: 5px;">
  </div>
  <div style="flex: 1; margin: 0 5px;">
    <label>Hiring Manager <span style="color: red;">*</span></label>
    <input type="text" id="hiring-manager" placeholder="Hiring Manager" style="width: 100%; padding: 5px;">
  </div>
  <div style="flex: 1; margin: 0 5px;">
    <label>Recruiter <span style="color: red;">*</span></label>
    <input type="text" id="recruiter" placeholder="Recruiter" style="width: 100%; padding: 5px;">
  </div>
</div>

<!-- Chat Panel -->
<div id="chat-panel" style="border: 1px solid #ccc; padding: 10px; min-height: 150px; max-height: 75vh; overflow-y: auto;">
  <p id="chat-placeholder" style="color: gray;">Please login/register to use this demo</p>
</div>

<!-- Buttons -->
<div id="button-container" style="margin-top: 10px; text-align: center;">
  <button id="load-kickoff" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Load Kickoff Form</button>
  <button id="load-jd" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Load JD</button>
  <button id="map-jd" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Map JD to Kickoff</button>
  <button id="save-kickoff" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Save Kickoff</button>
  <button id="create-tools" style="background-color: lightgray; color: darkgray; padding: 10px 20px; border: none; cursor: not-allowed;" disabled>Create Recruiting/Sourcing Tools</button>
</div>

<style>
  /* Custom Scrollbar */
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
