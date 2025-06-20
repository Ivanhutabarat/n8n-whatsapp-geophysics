// === WAJIB: Install dulu di project ===
// npm install express whatsapp-web.js qrcode-terminal axios

const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const app = express();
const port = 5678;
app.use(express.json());

// ==== WHATSAPP BOT ====
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('📱 Scan QR WhatsApp!');
});

client.on('ready', () => {
  console.log('✅ WhatsApp bot aktif!');
});

client.on('message', async msg => {
  const chatId = msg.from;
  const isiPesan = msg.body.trim().toLowerCase();
  const command = isiPesan.split(" ")[0];

  // Log otomatis
  await axios.post('http://localhost:5678/log-chat', {
    number: chatId,
    message: isiPesan,
    command
  });

  try {
    if (isiPesan === '/menu') {
      return client.sendMessage(chatId, `📋 *Menu Bot Gempa*\n
/info gempa – Info gempa terkini
/log hari ini – Daftar gempa hari ini
/gempa besar – Gempa > 5 SR dalam 7 hari
/getaran – Getaran 1 jam terakhir
/info [wilayah] – Cek gempa di wilayah tertentu
/menu – Tampilkan daftar perintah`);
    }

    if (isiPesan === '/info gempa') {
      const { data } = await axios.post('http://localhost:5678/webhook/wa-inbox', {
        number: chatId,
        message: isiPesan
      });
      return client.sendMessage(chatId, data?.pesan || '⚠️ Data tidak tersedia.');
    }

    if (isiPesan === '/log hari ini') {
      const { data } = await axios.get('http://localhost:5678/webhook/log-today');
      return client.sendMessage(chatId, data?.pesan);
    }

    if (isiPesan === '/gempa besar') {
      const { data } = await axios.get('http://localhost:5678/webhook/log-besar');
      return client.sendMessage(chatId, data?.pesan);
    }

    if (isiPesan === '/getaran') {
      const { data } = await axios.get('http://localhost:5678/webhook/log-terakhir');
      return client.sendMessage(chatId, data?.pesan);
    }

    if (isiPesan.startsWith('/info ')) {
      const wilayah = isiPesan.replace('/info ', '').trim();
      const { data } = await axios.post('http://localhost:5678/webhook/cari-wilayah', { wilayah });
      return client.sendMessage(chatId, data?.pesan);
    }

    if (isiPesan.startsWith('/broadcast ')) {
      const isi = isiPesan.replace('/broadcast ', '').trim();
      const grupId = '1203630XXXXXXXX@g.us'; // Ganti dengan ID grup kamu
      const tagTarget = ['628xxxx@c.us']; // Tambahkan nomor yang mau ditag

      const mentions = tagTarget.map(id => ({ id }));
      const mentionText = tagTarget.map(id => `@${id.split('@')[0]}`).join(' ');

      await client.sendMessage(grupId, `📣 *Broadcast:*\n\n${isi}\n\n${mentionText}`, { mentions });
      return client.sendMessage(chatId, '✅ Broadcast dikirim ke grup.');
    }

    if (isiPesan.startsWith('/')) {
      return client.sendMessage(chatId, '❓ Perintah tidak dikenal. Ketik /menu.');
    }

  } catch (err) {
    console.error('❌ Error WA:', err.message);
    return client.sendMessage(chatId, '⚠️ Terjadi kesalahan saat proses perintah.');
  }
});

client.initialize();

// ==== EXPRESS API (Opsional) ====
app.post('/log-chat', async (req, res) => {
  const { number, message, command } = req.body;

  try {
    await axios.post('https://api.sheetbest.com/sheets/c1614c87-fcf0-4e10-b485-d4d97ecb94be', {
      Timestamp: new Date().toISOString(),
      Nomor: number,
      Pesan: message,
      Command: command || '(tidak dikenal)'
    });

    res.status(200).json({ status: 'sukses' });
  } catch (e) {
    res.status(500).json({ error: 'Gagal simpan log' });
  }
});

// Jalankan server lokal
app.listen(port, () => {
  console.log(`🛰️ Webhook aktif di http://localhost:${port}`);
});
