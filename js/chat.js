// File location: /js/chat.js

// Ensure you include the marked library in your HTML, e.g.,
// <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

// Create a custom renderer for marked to adjust list item formatting for ✅ items.
const renderer = new marked.Renderer();
renderer.listitem = function(text) {
  // If the text starts with the checkmark emoji "✅", remove it and prepend a space.
  if (/^\s*✅\s*/.test(text)) {
    const newText = text.replace(/^\s*✅\s*/, ' ');
    return '<li>' + newText + '</li>';
  } else {
    return '<li>' + text + '</li>';
  }
};

// Function for a typewriter effect running at 20× speed.
function typeText(text, element, speedFactor = 20) {
  const defaultDelay = 50; // default delay per character in ms
  const delay = defaultDelay / speedFactor; // 20× faster delay (2.5 ms per character)
  let index = 0;
  
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  }
  type();
}

// Function to convert markdown to HTML using the custom renderer and display it in a target element.
function displayMarkdown(markdownText, element) {
  const htmlContent = marked(markdownText, { renderer: renderer });
  element.innerHTML = htmlContent;
}

// Execute when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", function() {
  // Render markdown content in an element with id "chat-panel" if it exists.
  const chatPanel = document.getElementById("chat-panel");
  if (chatPanel) {
    const markdownContent = `
# Welcome to the Chat Panel

This is an example of **markdown** content with a typewriter effect running at 20× speed.

- ✅ Completed item
- Regular item in the list

Some more text with a horizontal rule below.

---

## Subheading

More details here.
    `;
    displayMarkdown(markdownContent, chatPanel);
  }
  
  // Optionally, run the typewriter effect on an element with id "typewriter".
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
    typewriterElement.innerHTML = "";
    typeText("Typing out text at 20× speed...", typewriterElement, 20);
  }
});
