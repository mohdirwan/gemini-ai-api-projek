const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// API endpoint (akan otomatis ke localhost:3000 saat development)
const API_URL = 'http://localhost:3000/api/chat';

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Tampilkan pesan user
  appendMessage('user', userMessage);
  input.value = '';

  // Disable input saat menunggu response
  input.disabled = true;

  // Tampilkan loading indicator
  const loadingMsg = appendMessage('bot', '💭 Gemini is thinking...');

  try {
    // Kirim request ke backend
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage
      })
    });

    // Hapus loading message
    loadingMsg.remove();

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      // Tampilkan response dari Gemini
      appendMessage('bot', data.response);
    } else {
      throw new Error(data.error || 'Unknown error');
    }

  } catch (error) {
    // Hapus loading message jika error
    loadingMsg.remove();
    appendMessage('bot', `❌ Error: ${error.message}. Please make sure the server is running.`);
    console.error('Error:', error);
  } finally {
    // Re-enable input
    input.disabled = false;
    input.focus();
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return element untuk bisa di-remove jika perlu
}
