
```markdown
# n8n-whatsapp-geophysics

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Termux Friendly](https://img.shields.io/badge/Termux-Compatible-blue?logo=android)](https://termux.dev)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Made with ❤️ by Ipan](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)](https://github.com/Ivanhutabarat)
[![Issues](https://img.shields.io/github/issues/Ivanhutabarat/n8n-whatsapp-geophysics)](https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics/issues)
[![Last Commit](https://img.shields.io/github/last-commit/Ivanhutabarat/n8n-whatsapp-geophysics)](https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics/commits/main)

---

## 🧠 Tentang Project

Project ini adalah bot WhatsApp modular yang dibangun dengan Node.js dan [Baileys](https://github.com/WhiskeySockets/Baileys), dioptimalkan untuk dijalankan dari Termux dengan fitur-fitur seperti reminder, info cuaca, crypto, berita, dan integrasi AI dari OpenAI.

---

## ⚙️ Fitur Utama

- 🔄 Pairing WhatsApp via QR code langsung di Termux
- ⏰ Reminder otomatis berdasarkan jadwal di `storage/`
- 🌤️ Info cuaca harian
- 📈 Harga crypto real-time (BTC, ETH)
- 📰 News headlines terkini
- 🤖 Integrasi OpenAI GPT untuk command
- 💬 Modular command (cukup tambah file `.js`)

---

## 🚀 Instalasi di Termux

```bash
pkg update && pkg upgrade -y
pkg install git nodejs -y
npm install -g pm2
```

---

## 📁 Clone Repositori

```bash
git clone https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics
cd n8n-whatsapp-geophysics
```

---

## 🔐 Konfigurasi .env

1. Copy file contoh:
   ```bash
   cp .env.example .env
   ```

2. Buka dan isi:
   ```bash
   nano .env
   ```

```env
OPENAI_API_KEY=sk-...
COINGECKO_API_KEY=CG-...
OPENWEATHER_KEY=...
NEWS_API_KEY=...
OWNER_JID=628XXXXXXXX@s.whatsapp.net
```

---

## 📲 Pairing WhatsApp

```bash
npm install
node pairing.js
```

→ Scan QR code dari WhatsApp:  
**Titik tiga (⋮) > Perangkat tertaut > Tautkan Perangkat**

---

## ⏯️ Jalankan Bot

```bash
chmod +x start.sh stop.sh
./start.sh
```

---

## ❌ Stop Bot

```bash
./stop.sh
```

---

## 🔁 Auto-Start Saat Buka Termux

```bash
echo 'pm2 resurrect' >> ~/.bashrc
```

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

## 📬 Contoh Command WhatsApp

- `/jadwal` — tampilkan jadwal reminder
- `/cuaca` — info cuaca lokal
- `/crypto` — harga BTC & ETH
- `/news` — berita hari ini
- `/help`, `/donasi`, dll → bisa ditambahkan bebas

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) — kamu bebas menggunakan, memodifikasi, dan mendistribusikan, asalkan menyertakan atribusi dan salinan lisensi.

---

## 🙌 Kontributor

Dibuat oleh [@Ivanhutabarat](https://github.com/Ivanhutabarat)  
Didukung penuh dengan semangat eksplorasi & inovasi di ujung jari 🔧📱🚀
```

