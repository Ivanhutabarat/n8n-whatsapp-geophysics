# n8n-whatsapp-geophysics

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Termux Friendly](https://img.shields.io/badge/Termux-Compatible-blue?logo=android)](https://termux.dev)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Made with ❤️ by Ipan](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)](https://github.com/Ivanhutabarat)
[![Issues](https://img.shields.io/github/issues/Ivanhutabarat/n8n-whatsapp-geophysics)](https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics/issues)
[![Last Commit](https://img.shields.io/github/last-commit/Ivanhutabarat/n8n-whatsapp-geophysics)](https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics/commits/main)

---

## 🧠 Tentang Project

Bot WhatsApp modular yang dibangun dengan Node.js dan Baileys, dioptimalkan untuk Termux dan VS Code. Fitur: reminder otomatis, info cuaca, harga crypto, berita, dan integrasi AI dari OpenAI — cukup dari satu HP pun tetap bisa jalan 24 jam!

---

## ⚙️ Fitur Utama

- 🔄 Pairing WhatsApp via QR langsung dari Termux
- ⏰ Reminder otomatis (jadwal harian, belajar, dll.)
- 🌤️ Info cuaca real-time (OpenWeather)
- 📈 Harga crypto (CoinGecko)
- 📰 Headline berita (NewsAPI)
- 🤖 ChatGPT-style command via OpenAI
- 💬 Modular command (cukup tambah file `.js` di `commands/`)

---

## 🚀 Instalasi di Termux

```bash
pkg update && pkg upgrade -y
pkg install git nodejs -y
npm install -g pm2
```

---

## 📁 Clone & Setup

```bash
git clone https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics
cd n8n-whatsapp-geophysics
```

---

## 🔐 Konfigurasi .env

```bash
cp .env.example .env
nano .env
```

Isi dengan API key kamu:
```env
OPENAI_API_KEY=sk-...
COINGECKO_API_KEY=CG-...
OPENWEATHER_KEY=...
NEWS_API_KEY=...
OWNER_JID=628XXXX@s.whatsapp.net
```

---

## 📲 Pairing WhatsApp

```bash
npm install
node pairing.js
```

- Buka WhatsApp di HP kamu  
- Titik tiga > Perangkat tertaut > Tautkan perangkat  
- Scan QR yang muncul di Termux

---

## ⏯️ Jalankan Bot WhatsApp

```bash
chmod +x start.sh stop.sh
./start.sh
```

---

## 🛑 Stop Bot

```bash
./stop.sh
```

---

## 🔁 Auto-Start Saat Termux Dibuka

```bash
echo 'pm2 resurrect' >> ~/.bashrc
```

---

## 💻 Jalankan di Visual Studio Code

> Cocok kalau kamu mau ngoding, debug, atau pairing langsung dari laptop/PC

1. Clone project:
   ```bash
   git clone https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics
   cd n8n-whatsapp-geophysics
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Setup `.env` (sama seperti di Termux)

4. Pairing:
   ```bash
   node pairing.js
   ```

5. Jalankan bot:
   ```bash
   node bot.js
   ```

---

## 📬 Perintah WhatsApp

- `/jadwal` → lihat reminder kamu
- `/crypto` → harga BTC & ETH
- `/cuaca` → info cuaca daerahmu
- `/news` → berita hari ini
- dan lainnya…

---

## 🗂 Struktur Folder

```
├── bot.js
├── pairing.js
├── start.sh / stop.sh
├── .env / .env.example
├── core/
├── commands/
├── lib/
├── storage/
└── session/
```

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) — bebas digunakan, dimodifikasi, dan didistribusikan, asalkan mencantumkan atribusi dan menyertakan salinan lisensi.

---

## 🙌 Kontributor

Dibuat dan dikembangkan oleh [@Ivanhutabarat](https://github.com/Ivanhutabarat)  
Didukung semangat eksplorasi dan pengembangan bot WhatsApp 100% dari HP! 📱💡
```

