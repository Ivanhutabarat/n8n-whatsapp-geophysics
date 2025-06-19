require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const qrcode = require('qrcode-terminal');
const { Boom } = require('@hapi/boom');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const app = express();
app.use(express.json());

// 🔐 AI Handler Function
async function fetchAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.85
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Maaf, AI-nya belum respon 😅";
}

let sock;
(async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true // ASCII QR muncul di Termux
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', ({ connection, qr }) => {
    if (qr) qrcode.generate(qr, { small: true }); // tampilkan QR ke terminal
    if (connection === 'open') console.log('✅ WhatsApp connected!');
  });

  // 🤖 Listener untuk AI auto-reply
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (!text) return;

    try {
      const prompt = `Pesan dari Ipan: "${text}". Jawablah sebagai AI asisten pribadi yang smart, santai, dan suportif.`;
      const reply = await fetchAI(prompt);
      await sock.sendMessage(from, { text: `🤖 ${reply}` });
    } catch (err) {
      console.error("❌ Error AI reply:", err);
    }
  });
})();

// 🔁 Kirim pesan manual lewat endpoint POST /send-wa
app.post('/send-wa', async (req, res) => {
  const { number, message } = req.body;
  if (!number || !message) return res.status(400).json({ error: 'Missing number or message' });

  try {
    await sock.sendMessage(`${number}@s.whatsapp.net`, { text: message });
    res.json({ success: true, message: 'Pesan berhasil dikirim!' });
  } catch (err) {
    console.error('❌ Gagal kirim WA:', err);
    res.status(500).json({ error: 'Gagal mengirim pesan' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server Baileys jalan di http://localhost:${PORT}`));
