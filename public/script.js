const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Tampilkan pesan user
  appendMessage('user', userMessage);
  input.value = '';

  // Tampilkan loading indicator
  const loadingMsg = appendMessage('bot', '💭 Gemini is thinking...');

  try {
    // Panggil Gemini AI API
    const response = await fetch(`${CONFIG.API_ENDPOINT}?key=${CONFIG.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: userMessage
          }]
        }]
      })
    });

    // Hapus loading message
    loadingMsg.remove();

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Ekstrak response dari Gemini
    const botReply = data.candidates[0].content.parts[0].text;
    appendMessage('bot', botReply);

  } catch (error) {
    // Hapus loading message jika error
    loadingMsg.remove();
    appendMessage('bot', `❌ Error: ${error.message}. Please check your API key and connection.`);
    console.error('Gemini API Error:', error);
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
