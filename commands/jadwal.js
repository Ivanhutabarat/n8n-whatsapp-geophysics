const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../storage/jadwal.json");

function getTodayKey() {
  return new Date().toLocaleDateString("id-ID", { weekday: "long" });
}

module.exports = {
  name: "jadwal",
  description: "Tampilkan atau update jadwal hari ini",
  category: "utility",

  async execute(sock, msg, args) {
    const { from, pushName } = msg;
    const today = getTodayKey();

    let jadwal = {};
    if (fs.existsSync(dbPath)) {
      jadwal = JSON.parse(fs.readFileSync(dbPath));
    }

    // Jika user mengetik /jadwal set ...
    if (args[0] === "set") {
      const newText = args.slice(1).join(" ");
      if (!newText) {
        return sock.sendMessage(from, {
          text: "⚠️ Format benar: /jadwal set 09.00 - Kelas | 14.00 - Tugas"
        });
      }

      jadwal[today] = newText.split("|").map(i => i.trim());
      fs.writeFileSync(dbPath, JSON.stringify(jadwal, null, 2));

      return sock.sendMessage(from, {
        text: `✅ Jadwal hari *${today}* diperbarui:\n• ${jadwal[today].join("\n• ")}`
      });
    }

    // Jika user ketik /jadwal tanpa 'set'
    const list = jadwal[today] || ["Belum ada jadwal hari ini 😄"];
    const teks = `📅 *Jadwal ${today}*\n\n• ${list.join("\n• ")}`;

    await sock.sendMessage(from, { text: teks });
  }
};
