// File location: /js/chat.js

// Make sure to include the marked library in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

// Function to display text with a typewriter effect at 20X speed.
function typeText(text, element, speedFactor = 20) {
    // Original default delay per character (in ms)
    const defaultDelay = 50;
    // With 20X speed, we reduce the delay accordingly.
    const delay = defaultDelay / speedFactor;
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
  
  // Function to render Markdown to HTML and display it in the chat panel.
  function displayMarkdown(markdownText, element) {
    // Convert the markdown text to HTML using marked
    const htmlContent = marked(markdownText);
    element.innerHTML = htmlContent;
  }
  
  // Wait for the DOM to load before executing scripts.
  document.addEventListener("DOMContentLoaded", function() {
    // Select the chat panel element that should display the markdown.
    const chatPanel = document.getElementById("chat-panel");
  
    // Example markdown content. Replace this with your actual .MD file content as needed.
    const markdownContent = `# Welcome to the Chat Panel
  
  This is an example of **markdown** content with a typewriter effect running at 20X speed.
  
  - Fast
  - Reliable
  - Highly formatted!
  
  Enjoy the experience!`;
  
    // Render the markdown content into HTML and insert it into the chat panel.
    displayMarkdown(markdownContent, chatPanel);
  
    // If you have another element for the typewriter effect, e.g., an element with id "typewriter",
    // you can also run the typeText function on that element.
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
      // Clear any existing content.
      typewriterElement.innerHTML = "";
      // Use typeText to display the text at 20X speed.
      typeText("Typing out text at 20X speed...", typewriterElement, 20);
    }
  });
  