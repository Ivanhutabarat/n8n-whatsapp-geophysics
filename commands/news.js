const axios = require("axios");

module.exports = {
  name: "news",
  description: "Ambil berita utama terbaru dari NewsAPI",
  execute: async (sock, msg, args) => {
    const from = msg.key.remoteJid;
    const topic = args.length ? args.join(" ") : null;
    const apiKey = "59c2baffce4d4a908c5bfb783d0e44ba"; // ← langsung disimpan di sini

    try {
      const res = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "id",
          apiKey: apiKey,
          pageSize: 1,
          q: topic
        }
      });

      const article = res.data.articles[0];

      if (!article) {
        return await sock.sendMessage(from, {
          text: `❌ Tidak ada berita ditemukan untuk topik *${topic || "umum"}*.`
        });
      }

      const output = `📰 *${article.title}*\n\n${article.description || "-"}\n\n🔗 ${article.url}`;
      await sock.sendMessage(from, { text: output });

    } catch (err) {
      console.error("❌ Error ambil berita:", err.message);
      await sock.sendMessage(from, {
        text: "⚠️ Gagal mengambil berita. Pastikan koneksi stabil dan API key aktif."
      });
    }
  }
};
