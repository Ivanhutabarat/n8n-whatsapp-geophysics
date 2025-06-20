const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('📲 Scan QR dengan WhatsApp!');
});

client.on('ready', () => {
  console.log('✅ Bot WhatsApp aktif dan siap!');
});

client.on('message', async (msg) => {
  const chatId = msg.from;
  const isiPesan = msg.body.toLowerCase().trim();

  try {
    if (isiPesan === '/menu') {
      const menu = `📋 *Menu Bot Gempa*\n
/info gempa – Info gempa terkini
/log hari ini – Daftar gempa hari ini
/gempa besar – Gempa > 5 SR dalam 7 hari
/getaran – Getaran 1 jam terakhir
/info [wilayah] – Cek gempa di wilayah tertentu (cth: /info medan)
/menu – Tampilkan menu ini`;
      return client.sendMessage(chatId, menu);
    }

    if (isiPesan === '/info gempa') {
      const { data } = await axios.post('http://localhost:5678/webhook/wa-inbox', {
        number: chatId,
        message: isiPesan
      });
      return client.sendMessage(chatId, data?.pesan || '⚠️ Data gempa tidak tersedia.');
    }

    if (isiPesan === '/log hari ini') {
      const { data } = await axios.get('http://localhost:5678/webhook/log-today');
      return client.sendMessage(chatId, data?.pesan || '📭 Tidak ada log gempa hari ini.');
    }

    if (isiPesan === '/gempa besar') {
      const { data } = await axios.get('http://localhost:5678/webhook/log-besar');
      return client.sendMessage(chatId, data?.pesan || '🟢 Tidak ada gempa besar minggu ini.');
    }

    if (isiPesan === '/getaran') {
      const { data } = await axios.get('http://localhost:5678/webhook/log-terakhir');
      return client.sendMessage(chatId, data?.pesan || '🌀 Tidak ada getaran dalam 1 jam terakhir.');
    }

    if (isiPesan.startsWith('/info ')) {
      const wilayah = isiPesan.replace('/info ', '').trim();
      const { data } = await axios.post('http://localhost:5678/webhook/cari-wilayah', {
        wilayah
      });
      return client.sendMessage(chatId, data?.pesan || `🔍 Tidak ditemukan gempa di wilayah "${wilayah}".`);
    }

    if (isiPesan.startsWith('/')) {
      return client.sendMessage(chatId, '❓ Perintah tidak dikenal. Ketik /menu untuk melihat daftar perintah.');
    }

  } catch (err) {
    console.error('❌ Terjadi error:', err.message);
    return client.sendMessage(chatId, '⚠️ Maaf, terjadi kesalahan saat memproses perintah.');
  }
});

client.initialize();
