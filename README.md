
```markdown
# 🤖 WhatsApp AI Bot + n8n + Baileys

A WhatsApp bot powered by AI, integrated with [n8n](https://n8n.io/) workflows, and supporting real-time commands such as `/btc`, `/weather`, `/vent`, and more. Built for automation, study, and AI-assisted conversations.

---

## 🧠 Features

- AI-powered auto-reply (Copilot/OpenAI)
- Command-based system: `/btc`, `/weather`, `/vent`, `/help`
- Connects to webhook automation (e.g. via n8n)
- QR-based WhatsApp session pairing
- Bash tools for reset, backup, restore, and auto-start
- Works seamlessly on Termux, VS Code, Replit, Railway, VPS, etc.

---

## ⚙️ Quick Setup

```bash
git clone https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics.git
cd n8n-whatsapp-geophysics
chmod +x setup.sh
./setup.sh
```

Then choose to run either:

```bash
./tools.sh       # Interactive menu (reset, backup, start bot)
./auto-start.sh  # Automatically detects pairing and starts bot
```

---

## 📱 Run on Termux (Android)

```bash
git clone https://github.com/Ivanhutabarat/n8n-whatsapp-geophysics.git
cd n8n-whatsapp-geophysics
chmod +x setup.sh
./setup.sh
./tools.sh
```

> A QR code will appear; scan with your WhatsApp account to pair the session.

---

## 💻 Run on VS Code (Desktop)

1. Open the project folder in VS Code  
2. Open the integrated terminal (Ctrl + `)  
3. Run:

```bash
chmod +x setup.sh
./setup.sh
./tools.sh
```

> Make sure Node.js and npm are installed.

---

## 💬 WhatsApp Commands Documentation

### `/btc`
- **Purpose:** Display the latest Bitcoin price using CoinGecko API
- **Example Response:**
  ```
  💸 BTC Price: $67,500
  ⏱️ Updated: 20 seconds ago
  ```
- **Requirements:** internet access, axios/fetch
- **Handler File:** `commands/btc.js`

---

### `/weather`
- **Purpose:** Show current weather based on location (text or IP)
- **Example Response:**
  ```
  ☀️ Weather in Jakarta
  Temperature: 31°C | Humidity: 75%
  Condition: Clear sky
  ```
- **API:** OpenWeather API
- **Handler File:** `commands/weather.js`

---

### `/vent` (aka `/curhat`)
- **Purpose:** Engage in an empathetic conversation — AI becomes your listener
- **Response:** Natural and emotion-aware conversation using AI
- **Integrations:** Copilot or OpenAI (optional)
- **Handler File:** `commands/vent.js`

---

### `/help`
- **Purpose:** Lists available commands and features
- **Handler File:** `commands/help.js`

---

## 🔐 Pairing Management

🔸 **To back up your session:**
```bash
tar -czf auth_backup.tar.gz auth_info/
```

🔸 **To restore pairing on another device or after reinstall:**
```bash
tar -xzf auth_backup.tar.gz
```

Or simply use `tools.sh`:

- Option [2] → Backup
- Option [3] → Restore

---

## 🗂 Project Structure

```
n8n-whatsapp-geophysics/
├── baileys-server/
│   └── index.js
├── tools.sh
├── auto-start.sh
├── setup.sh
├── backups/
└── README.md
```

---

## ✨ Built With

- [Baileys](https://github.com/WhiskeySockets/Baileys)
- Node.js
- Termux / Bash CLI
- [n8n.io](https://n8n.io/)
- OpenAI or Copilot API (optional for AI replies)

---

## 👤 Author

Crafted by [Ivanhutabarat](https://github.com/Ivanhutabarat)  
From Sumatra — bridging AI with WhatsApp automation 🇮🇩⚡
```

---

