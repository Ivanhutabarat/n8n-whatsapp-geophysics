/**
 * Command: /news
 * Description: Show latest news headlines from NewsAPI
 * Author: Ivanhutabarat
 * Last Updated: 2025-06-20
 */

const axios = require("axios");

module.exports = {
  name: "news",
  description: "Show latest news headlines",
  category: "api",
  async execute(sock, msg, args) {
    const { from } = msg;
    const keyword = args.length ? args.join(" ") : "Indonesia";

    try {
      const res = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: keyword,
          language: "id",
          sortBy: "publishedAt",
          pageSize: 3,
          apiKey: "59c2baffce4d4a908c5bfb783d0e44ba" // ← key kamu
        }
      });

      const articles = res.data.articles;
      if (articles.length === 0) {
        return sock.sendMessage(from, {
          text: `❌ Tidak ada berita ditemukan untuk *${keyword}*.`
        });
      }

      let text = `📰 *Berita Terkini: ${keyword}*\n\n`;
      articles.forEach((a, i) => {
        text += `*${i + 1}.* ${a.title}\n_${a.source.name}_\n🔗 ${a.url}\n\n`;
      });

      await sock.sendMessage(from, { text });

    } catch (err) {
      console.error("NewsAPI error:", err.response?.data || err.message);
      await sock.sendMessage(from, {
        text: "⚠️ Gagal mengambil berita. Pastikan API key NewsAPI aktif atau coba
