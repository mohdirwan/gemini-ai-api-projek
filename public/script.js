// DOM elements
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Conversation history storage
let conversationHistory = [];

// API endpoint
const API_URL = '/api/chat';

// Form submit handler
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to conversation history
  conversationHistory.push({
    role: 'user',
    text: userMessage
  });

  // Display user message in chat box
  appendMessage('user', userMessage);

  // Clear input and disable it
  input.value = '';
  input.disabled = true;

  // Show "Thinking..." bot message
  const thinkingMsg = appendMessage('bot', 'Thinking...');

  try {
    // Send POST request to backend with conversation history
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation: conversationHistory
      })
    });

    // Remove "Thinking..." message
    thinkingMsg.remove();

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    // Check if result exists
    if (data.result) {
      // Add bot response to conversation history
      conversationHistory.push({
        role: 'model',
        text: data.result
      });

      // Display bot response
      appendMessage('bot', data.result);
    } else {
      // No result received
      appendMessage('bot', 'Sorry, no response received.');
    }

  } catch (error) {
    // Remove "Thinking..." message if still present
    if (thinkingMsg.parentNode) {
      thinkingMsg.remove();
    }

    // Show error message
    appendMessage('bot', 'Failed to get response from server.');
    console.error('Error:', error);
  } finally {
    // Re-enable input and focus
    input.disabled = false;
    input.focus();
  }
});

/**
 * Append a message to the chat box
 * @param {string} sender - 'user' or 'bot'
 * @param {string} text - Message text
 * @returns {HTMLElement} The created message element
 */
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);

  // Auto-scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  return msg;
}

// Optional: Clear conversation history function
function clearConversation() {
  conversationHistory = [];
  chatBox.innerHTML = '';
}

// Optional: Export conversation for debugging
window.getConversation = () => conversationHistory;
window.clearConversation = clearConversation;
