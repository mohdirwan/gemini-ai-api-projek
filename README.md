# Gemini AI Chatbot

Aplikasi chatbot sederhana yang menggunakan Google Gemini AI API untuk memberikan respons cerdas terhadap pertanyaan pengguna.

## 🚀 Fitur

- Chat interface yang responsif dan modern
- Integrasi langsung dengan Gemini AI API
- Loading indicator saat AI sedang memproses
- Error handling yang baik
- Design yang bersih dan user-friendly

## 📋 Prerequisites

- Web browser modern (Chrome, Firefox, Safari, Edge)
- Gemini AI API Key (dapatkan dari [Google AI Studio](https://makersuite.google.com/app/apikey))
- Web server lokal (XAMPP, WAMP, atau Live Server)

## 🔧 Instalasi

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/yourusername/gemini-ai-api-project.git
   cd gemini-ai-api-project
   ```

2. **Setup API Key:**
   - Copy file `public/config.example.js` menjadi `public/config.js`
   ```bash
   cp public/config.example.js public/config.js
   ```
   - Buka `public/config.js` dan ganti `YOUR_API_KEY_HERE` dengan API key Anda

3. **Jalankan aplikasi:**
   - Jika menggunakan XAMPP: letakkan di folder `htdocs` dan akses via `http://localhost/gemini-ai-api-project/public`
   - Atau gunakan Live Server di VS Code

## 📁 Struktur Project

```
gemini-ai-api-project/
├── public/
│   ├── index.html          # Halaman utama
│   ├── style.css           # Styling aplikasi
│   ├── script.js           # Logic dan API integration
│   ├── config.js           # API key configuration (tidak di-commit)
│   └── config.example.js   # Template konfigurasi
├── .gitignore              # File yang diabaikan Git
└── README.md               # Dokumentasi
```

## 🔐 Keamanan

- File `config.js` sudah ditambahkan ke `.gitignore` untuk mencegah API key ter-push ke repository
- Jangan pernah share API key Anda ke orang lain
- Jika API key ter-expose, segera regenerate di Google AI Studio

## 💡 Cara Menggunakan

1. Buka aplikasi di browser
2. Ketik pertanyaan atau pesan di input box
3. Tekan Enter atau klik tombol "Send"
4. Tunggu respons dari Gemini AI
5. Lanjutkan percakapan sesuai kebutuhan

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dan animasi
- **JavaScript (ES6+)** - Logic dan API calls
- **Gemini AI API** - AI response engine

## 📝 Catatan Pengembangan

Project ini dikembangkan sebagai bagian dari pembelajaran integrasi AI API ke dalam aplikasi web. 

## 🤝 Kontribusi

Kontribusi, issues, dan feature requests sangat diterima!

## 📄 Lisensi

Project ini bebas digunakan untuk keperluan pembelajaran.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk pembelajaran AI integration

---

**Happy Coding!** 🎉
