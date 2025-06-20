const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../storage/jadwal.json");

function getTodayKey() {
  return new Date().toLocaleDateString("id-ID", { weekday: "long" });
}

function formatList(list) {
  return list.map(i => `• ${i}`).join("\n");
}

module.exports = {
  name: "jadwal",
  description: "Lihat, ubah, atau hapus jadwal",
  category: "utility",

  async execute(sock, msg, args) {
    const { from, pushName } = msg;
    const today = getTodayKey();

    if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, "{}");
    let jadwal = JSON.parse(fs.readFileSync(dbPath));

    // /jadwal hapus
    if (args[0] === "hapus") {
      jadwal[today] = [];
      fs.writeFileSync(dbPath, JSON.stringify(jadwal, null, 2));
      return sock.sendMessage(from, { text: `🗑️ Jadwal hari *${today}* berhasil dihapus.` });
    }

    // /jadwal set ...
    if (args[0] === "set") {
      const newText = args.slice(1).join(" ");
      if (!newText) return sock.sendMessage(from, { text: "⚠️ Format: /jadwal set 08.00 - Matkul | 10.30 - Revisi" });
      jadwal[today] = newText.split("|").map(s => s.trim());
      fs.writeFileSync(dbPath, JSON.stringify(jadwal, null, 2));
      return sock.sendMessage(from, {
        text: `✅ Jadwal *${today}* diperbarui:\n\n${formatList(jadwal[today])}`
      });
    }

    // /jadwal <Senin>
    const hari = args.length ? args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase() : today;
    const list = jadwal[hari] || [`Tidak ada jadwal untuk *${hari}*.`];
    await sock.sendMessage(from, {
      text: `📅 *Jadwal ${hari}*\n\n${formatList(list)}`
    });
  }
};
