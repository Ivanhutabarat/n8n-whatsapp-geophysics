const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const jadwalPath = path.join(__dirname, "../storage/jadwal.json");

function getTodayKey() {
  return new Date().toLocaleDateString("id-ID", { weekday: "long" });
}

function startReminder(sock, target) {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const next5 = new Date(now.getTime() + 5 * 60000);

    const jadwal = JSON.parse(fs.readFileSync(jadwalPath));
    const today = getTodayKey();
    const list = jadwal[today] || [];

    for (let item of list) {
      const match = item.match(/^(\d{1,2})[:.](\d{2})/);
      if (!match) continue;

      const [_, hh, mm] = match.map(Number);
      if (hh === next5.getHours() && mm === next5.getMinutes()) {
        await sock.sendMessage(target, {
          text: `🔔 *Reminder: ${item} akan dimulai sebentar lagi!*`
        });
      }
    }
  });
}

module.exports = { startReminder };
