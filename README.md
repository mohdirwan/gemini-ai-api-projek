# 🤖 Gemini AI Chatbot

Aplikasi chatbot web-based yang menggunakan **Google Gemini AI API** untuk memberikan respons cerdas terhadap pertanyaan pengguna secara real-time.

## ✨ Fitur

- 💬 Chat interface yang responsif dan modern
- 🚀 Backend Node.js dengan Express
- 🔒 API Key aman di server-side (tidak exposed ke client)
- ⚡ Real-time response dari Gemini 1.5 Flash
- 🎨 Design yang clean dan user-friendly
- 📱 Responsive untuk mobile dan desktop
- 🔄 Loading indicator saat AI memproses
- ⚠️ Error handling yang proper

## 📋 Prerequisites

Pastikan Anda sudah install:
- **Node.js** (v14 atau lebih tinggi) - [Download di sini](https://nodejs.org/)
- **npm** (biasanya sudah terinstall bersama Node.js)
- **Gemini AI API Key** - [Dapatkan di sini](https://makersuite.google.com/app/apikey)

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/mohdirwan/gemini-ai-api-projek.git
cd gemini-ai-api-projek
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Kemudian edit file `.env` dan masukkan API key Anda:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

### 4. Jalankan Server

```bash
npm start
```

atau untuk development:

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 📖 Cara Menggunakan

1. Buka browser dan navigasi ke `http://localhost:3000`
2. Ketik pertanyaan atau pesan di input box
3. Tekan **Enter** atau klik tombol **"Send"**
4. Tunggu respons dari Gemini AI ⏳
5. Lanjutkan percakapan sesuai kebutuhan! 🎉

## 📁 Struktur Project

```
gemini-ai-api-projek/
├── public/                  # Frontend files
│   ├── index.html          # Halaman utama
│   ├── style.css           # Styling aplikasi
│   └── script.js           # Client-side logic
├── server.js               # Backend Node.js + Express
├── .env                    # Environment variables (tidak di-commit)
├── .env.example            # Template environment variables
├── .gitignore              # File yang diabaikan Git
├── package.json            # Dependencies dan scripts
└── README.md               # Dokumentasi

```

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dan animasi
- **JavaScript (ES6+)** - Client logic dan Fetch API

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **@google/generative-ai** - Gemini AI SDK
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

## 🔐 Keamanan

- ✅ API Key disimpan di `.env` dan **tidak di-commit** ke Git
- ✅ File `.env` sudah masuk ke `.gitignore`
- ✅ API calls dilakukan di server-side, bukan client-side
- ✅ CORS protection untuk mencegah unauthorized access
- ⚠️ **Jangan pernah share API key Anda ke orang lain!**
- 🔄 Jika API key ter-expose, segera regenerate di [Google AI Studio](https://makersuite.google.com/app/apikey)

## 📡 API Endpoints

### POST `/api/chat`
Send message to Gemini AI

**Request Body:**
```json
{
  "message": "Apa itu AI?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI atau Artificial Intelligence adalah..."
}
```

### GET `/api/health`
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "message": "Gemini AI Chatbot Server is running",
  "timestamp": "2026-01-30T13:25:00.000Z"
}
```

## 🐛 Troubleshooting

### Server tidak bisa start
- Pastikan port 3000 tidak digunakan aplikasi lain
- Cek apakah semua dependencies sudah terinstall (`npm install`)
- Pastikan file `.env` ada dan API key sudah diisi

### Error: "API key not valid"
- Pastikan API key di `.env` sudah benar
- Generate ulang API key di [Google AI Studio](https://makersuite.google.com/app/apikey)

### CORS Error
- Pastikan server sudah running sebelum membuka frontend
- Akses frontend melalui `http://localhost:3000` bukan file:// protocol

## 🎯 Pengembangan Selanjutnya

Beberapa fitur yang bisa ditambahkan:
- [ ] Chat history / conversation memory
- [ ] Multiple chat sessions
- [ ] Export chat to PDF
- [ ] Dark mode toggle
- [ ] Voice input
- [ ] Markdown rendering untuk response
- [ ] Rate limiting
- [ ] User authentication

## 🤝 Kontribusi

Kontribusi, issues, dan feature requests sangat diterima!

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini bebas digunakan untuk keperluan pembelajaran.

## 👨‍💻 Author

Created with ❤️ for learning AI integration

---

**Happy Coding!** 🎉

Jika ada pertanyaan atau masalah, silakan buat [Issue](https://github.com/mohdirwan/gemini-ai-api-projek/issues)
