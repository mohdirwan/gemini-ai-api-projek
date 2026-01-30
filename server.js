require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Inisialisasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files dari folder public

// Endpoint untuk chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        console.log('📨 User message:', message);

        // Call Gemini API menggunakan REST API langsung
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        console.log('🤖 Gemini response:', text);

        res.json({
            success: true,
            response: text
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to generate response from Gemini AI',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Gemini AI Chatbot Server is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});
