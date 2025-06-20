module.exports = {
  name: "curhat",
  description: "Buat pengguna bisa curhat ke bot",
  execute: async (sock, msg, args) => {
    const teks = args.length ? args.join(" ") : "😶 Kamu belum curhat apa pun.";
    const reply = `📝 *Curhatan diterima:*\n${teks}\n\nSemangat terus ya! Aku di sini kalau kamu butuh tempat cerita.`;
    await sock.sendMessage(msg.key.remoteJid, { text: reply });
  }
};
