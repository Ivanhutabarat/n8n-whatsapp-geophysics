/**
 * Command: /curhat
 * Description: Empathetic AI mode – respond like a caring listener
 * Author: Ivanhutabarat
 * Last Updated: 2025-06-20
 */

require("dotenv").config();
const axios = require("axios");

module.exports = {
  name: "curhat",
  description: "Talk mode for venting (powered by OpenAI)",
  category: "ai",
  async execute(sock, msg, args) {
    const { from, pushName } = msg;
    const input = args.join(" ");

    if (!input) {
      return await sock.sendMessage(from, {
        text: `🧠 *Hi ${pushName}*, what's on your mind?\nCoba ketik:\n/curhat Aku capek banget sama kuliah hari ini.`
      });
    }

    try {
      const res = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a kind, empathetic, and friendly listener. Always respond with warmth and supportive tone."
          },
          {
            role: "user",
            content: input
          }
        ]
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      });

      const aiReply = res.data.choices[0].message.content;

      await sock.sendMessage(from, {
        text: `💬 *Curhat Response:*\n${aiReply}`
      });

    } catch (error) {
      console.error("OpenAI Error:", error.response?.data || error.message);
      await sock.sendMessage(from, {
        text: "❌ Bot gagal merespons. Periksa API key OpenAI kamu atau coba nanti."
      });
