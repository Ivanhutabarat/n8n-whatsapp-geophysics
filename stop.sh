#!/data/data/com.termux/files/usr/bin/bash
echo "🛑 Mematikan semua proses bot..."

pm2 stop bot-wa
pm2 delete bot-wa
