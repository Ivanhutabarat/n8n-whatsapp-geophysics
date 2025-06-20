#!/bin/bash

cd baileys-server

# Cek auth_info apakah sudah ada pairing
if [ -d "auth_info" ] && [ "$(ls -A auth_info)" ]; then
  echo "✅ Pairing sudah ada. Menjalankan bot..."
  node index.js
else
  echo "⚠️  Pairing belum ada atau kosong. Menjalankan reset otomatis..."

  pkill -f node index.js 2>/dev/null
  rm -rf auth_info node_modules package-lock.json

  npm install
  npm install @whiskeysockets/baileys@6.6.0

  echo "🔄 Siap pairing baru. Menjalankan bot..."
  node index.js
fi
