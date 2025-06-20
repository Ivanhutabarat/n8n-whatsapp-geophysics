/**
 * Command: /cuaca
 * Description: Show current weather info using OpenWeather API
 * Author: Ivanhutabarat
 * Last Updated: 2025-06-20
 */

const axios = require("axios");

module.exports = {
  name: "cuaca",
  description: "Check current weather by location",
  category: "api",
  async execute(sock, msg, args) {
    const { from, pushName } = msg;
    const location = args.length ? args.join(" ") : "Jakarta";

    try {
      const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: location,
          appid: "049695e4ee0805221840c3231ab07f8a", // ganti pakai key kamu sendiri
          units: "metric",
          lang: "id"
        }
      });

      const data = res.data;
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const feels = data.main.feels_like;
      const humidity = data.main.humidity;

      const output = `🌤️ *Cuaca di ${location.toUpperCase()}*\n` +
                     `🌡️ Suhu: ${temp}°C (terasa: ${feels}°C)\n` +
                     `💧 Kelembaban: ${humidity}%\n` +
                     `☁️ Kondisi: ${weather}`;

      await sock.sendMessage(from, { text: output });

    } catch (err) {
      await sock.sendMessage(from, {
        text: "❌ Gagal mengambil data cuaca. Coba lagi nanti ya!"
      });
    }
  }
};
