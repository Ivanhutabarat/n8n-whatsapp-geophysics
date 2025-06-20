const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('📱 Scan QR dengan WhatsApp!');
});

client.on('ready', () => {
  console.log('✅ Bot WhatsApp aktif dan tersambung!');
});

client.on('message', async msg => {
  const chatId = msg.from;
  const isiPesan = msg.body.trim().toLowerCase();
  const command = isiPesan.split(' ')[0];

  // 📝 Catat semua pesan ke log-chat
  await axios.post('http://localhost:5678/webhook/log-chat', {
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
/info [wilayah] – Cek gempa di suatu wilayah
/menu – Tampilkan daftar perintah`);
    }

    if (isiPesan === '/info gempa') {
      const { data } = await axios.post('http://localhost:5678/webhook/wa-inbox', {
        number: chatId,
        message: isiPesan
      });
      return client.sendMessage(chatId, data?.pesan || '⚠️ Tidak ada data terbaru.');
    }

    if (isiPesan === '/log hari ini') {
      const { data } = await axios.get('http
