require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inisialisasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_MODEL = 'gemini-2.5-flash';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files dari folder public

// Endpoint untuk chat dengan conversation history
app.post('/api/chat', async (req, res) => {
    try {
        const { conversation } = req.body;

        // Validasi input
        if (!Array.isArray(conversation)) {
            return res.status(400).json({
                error: 'Message must be an array'
            });
        }

        // Transform conversation ke format Gemini
        const contents = conversation.map(({ role, text }) => ({
            role: role === 'user' ? 'user' : 'model',
            parts: [{ text }]
        }));

        console.log('📨 Conversation:', JSON.stringify(contents, null, 2));

        // Generate response dari Gemini dengan conversation history
        const model = genAI.getGenerativeModel({
            model: GEMINI_MODEL,
            systemInstruction: 'Jawab hanya menggunakan bahasa Indonesia.'
        });

        const result = await model.generateContent({
            contents,
            generationConfig: {
                temperature: 0.9,
            }
        });

        const response = result.response;
        const text = response.text();

        console.log('🤖 Gemini response:', text);

        res.status(200).json({ result: text });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Gemini AI Chatbot Server is running',
        model: GEMINI_MODEL,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`🤖 Using model: ${GEMINI_MODEL}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});
