// File location: /js/chat.js

// Make sure you have included the marked library in your HTML, for example:
// <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
// <script src="{{ site.baseurl }}/js/chat.js"></script>

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

// Function for a typewriter effect at 20× speed.
function typeText(text, element, speedFactor = 20) {
  const defaultDelay = 50; // default delay per character in ms
  const delay = defaultDelay / speedFactor; // 2.5 ms per character
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

document.addEventListener("DOMContentLoaded", function() {
  // 1. FETCH AND RENDER MARKDOWN IN #chat-panel
  const chatPanel = document.getElementById("chat-panel");
  if (chatPanel) {
    // Fetch the .md file from your repo. Adjust path if needed.
    fetch("{{ site.baseurl }}/assets/content/intake-example.md")
      .then(response => response.text())
      .then(markdown => {
        // Convert the raw Markdown to HTML
        displayMarkdown(markdown, chatPanel);
        // If you want to type out the entire Markdown at 20× speed (rather than instantly), 
        // you can do this instead:
        //
        // const htmlContent = marked(markdown, { renderer: renderer });
        // chatPanel.innerHTML = ""; // Clear existing
        // typeText(htmlContent, chatPanel, 20);
      })
      .catch(error => {
        console.error("Error fetching Markdown file:", error);
        chatPanel.innerHTML = "<p>Failed to load content.</p>";
      });
  }

  // 2. OPTIONAL TYPEWRITER EFFECT FOR #typewriter
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
    // Clear any existing content
    typewriterElement.innerHTML = "";
    // Type out text at 20× speed
    typeText("Typing out text at 20× speed...", typewriterElement, 20);
  }
});
