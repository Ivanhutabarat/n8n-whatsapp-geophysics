#!/bin/bash

echo ""
echo "🧠 WhatsApp AI Bot Tools Menu"
echo "────────────────────────────"
echo "1. Reset Pairing (auth_info)"
echo "2. Backup Pairing (to auth_backup_TIMESTAMP.tar.gz)"
echo "3. Restore Pairing (from .tar.gz)"
echo "4. Start Bot (node index.js)"
echo "5. Exit"
echo ""

read -p "Pilih opsi [1-5]: " choice

case $choice in
  1)
    echo "🔄 Reset pairing..."
    pkill -f "node index.js"
    rm -rf auth_info
    rm -rf node_modules package-lock.json
    npm install
    npm install @whiskeysockets/baileys@6.6.0
    echo "✅ Reset selesai."
    ;;
  2)
    mkdir -p backups
    tar -czf backups/auth_backup_$(date +%Y%m%d_%H%M%S).tar.gz auth_info
    echo "✅ Pairing disimpan di folder backups/"
    ;;
  3)
    echo "📂 File backup yang tersedia:"
    ls backups/*.tar.gz
    echo ""
    read -p "Masukkan nama file backup (tanpa path): " file
    tar -xzf backups/"$file"
    echo "✅ Pairing berhasil dipulihkan."
    ;;
  4)
    cd baileys-server
    echo "🚀 Menjalankan bot..."
    node index.js
    ;;
  5)
    echo "👋 Keluar."
    ;;
  *)
    echo "❌ Pilihan tidak valid."
    ;;
esac
