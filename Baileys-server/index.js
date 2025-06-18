require('dotenv').config();
const express = require('express');
const { Boom } = require('@hapi/boom');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const app = express();
app.use(express.json());

let sock;
(async () => {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', ({ connection }) => {
    if (connection === 'open') console.log('✅ WhatsApp connected!');
  });
})();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server Baileys jalan di http://localhost:${PORT}`));
