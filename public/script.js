// DOM elements
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const clearBtn = document.getElementById('clear-btn');
const sendBtn = document.getElementById('send-btn');

// Conversation history storage
let conversationHistory = [];

/**
 * Handle initial welcome screen visibility
 */
function updateWelcomeScreen() {
  const welcomeScreen = chatBox.querySelector('.welcome-screen');
  if (conversationHistory.length > 0) {
    if (welcomeScreen) welcomeScreen.style.display = 'none';
  } else {
    if (welcomeScreen) welcomeScreen.style.display = 'flex';
  }
}

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

  // Update welcome screen
  updateWelcomeScreen();

  // Display user message in chat box
  appendMessage('user', userMessage);

  // Clear input and disable UI
  const originalPlaceholder = input.placeholder;
  input.value = '';
  input.disabled = true;
  sendBtn.disabled = true;
  input.placeholder = 'Gemini sedang berpikir...';

  // Show professional typing indicator
  const typingIndicator = appendTypingIndicator();

  try {
    // Send POST request to backend
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation: conversationHistory
      })
    });

    // Remove typing indicator
    typingIndicator.remove();

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result) {
      // Add bot response to history
      conversationHistory.push({
        role: 'model',
        text: data.result
      });

      // Display bot response
      appendMessage('bot', data.result);
    } else {
      appendMessage('bot', 'Maaf, saya tidak menerima respon dari server.');
    }

  } catch (error) {
    if (typingIndicator.parentNode) {
      typingIndicator.remove();
    }
    appendMessage('bot', 'Terjadi kesalahan saat menghubungi asisten.');
    console.error('Error:', error);
  } finally {
    // Re-enable input
    input.disabled = false;
    sendBtn.disabled = false;
    input.placeholder = originalPlaceholder;
    input.focus();
  }
});

/**
 * Append a regular message
 */
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);

  if (sender === 'bot') {
    // Configure marked for code highlighting
    marked.setOptions({
      highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
      breaks: true
    });

    msg.innerHTML = marked.parse(text);
    // Apply highlighting to code blocks
    msg.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  } else {
    msg.innerText = text;
  }

  chatBox.appendChild(msg);
  scrollToBottom();
  return msg;
}

/**
 * Create a typing indicator element
 */
function appendTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.classList.add('message', 'bot', 'typing');
  indicator.innerHTML = `
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  `;
  chatBox.appendChild(indicator);
  scrollToBottom();
  return indicator;
}

/**
 * Smooth scroll to bottom
 */
function scrollToBottom() {
  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: 'smooth'
  });
}

/**
 * Clear conversation
 */
function clearConversation() {
  if (confirm('Apakah Anda yakin ingin menghapus semua percakapan?')) {
    conversationHistory = [];
    // Keep the welcome screen
    const welcome = chatBox.querySelector('.welcome-screen');
    chatBox.innerHTML = '';
    if (welcome) {
      chatBox.appendChild(welcome);
      welcome.style.display = 'flex';
    } else {
      // Re-create it if it was somehow lost
      location.reload();
    }
  }
}

// Clear button event
if (clearBtn) {
  clearBtn.addEventListener('click', clearConversation);
}

// Global functions for debugging
window.getConversation = () => conversationHistory;
window.clearConversation = clearConversation;

