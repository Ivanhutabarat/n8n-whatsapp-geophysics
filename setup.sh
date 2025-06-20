#!/bin/bash

echo ""
echo "🔥 SETUP BOT WHATSAPP AI – INITIATING..."
sleep 1

# Masuk ke folder bot
cd baileys-server || exit

# Matikan proses bot yang masih jalan
pkill -f "node index.js" 2>/dev/null

# Hapus pairing & instalasi lama
rm -rf auth_info node_modules package-lock.json

# Install dependensi & Baileys stabil
npm install
npm install @whiskeysockets/baileys@6.6.0

echo "✅ Setup selesai!"

# Kembali ke root
cd ..

# Siapkan permission tools
chmod +x tools.sh auto-start.sh

echo ""
echo "🚀 Semua siap! Jalankan dengan:"
echo "   ./tools.sh       # Menu interaktif"
echo "   ./auto-start.sh  # Langsung pairing/lanjut bot"
echo ""
