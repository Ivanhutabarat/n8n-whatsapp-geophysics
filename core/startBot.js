const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const P = require("pino");
const { startReminder } = require("../lib/reminder");

async function startBot(onReady) {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: true
  });

  // 🔁 Save session if updated
  sock.ev.on("creds.update", saveCreds);

  // 🧠 Load all commands from /commands
  const commandPath = path.join(__dirname, "../commands");
  const commands = new Map();
  fs.readdirSync(commandPath).forEach(file => {
    if (file.endsWith(".js")) {
      const cmd = require(path.join(commandPath, file));
      if (cmd.name) commands.set(cmd.name, cmd);
    }
  });

  // 📥 Listen for messages
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    const text = m.message.conversation || m.message.extendedTextMessage?.text;
    if (!text || !text.startsWith("/")) return;

    const [commandName, ...args] = text.slice(1).trim().split(" ");
    const cmd = commands.get(commandName.toLowerCase());
    if (cmd) {
      try {
        await cmd.execute(sock, m, args);
      } catch (err) {
        console.error(`❌ Error di command /${commandName}`, err);
      }
    }
  });

  // 🚀 Aktifkan fitur reminder setelah bot siap
  const owner = process.env.OWNER_JID || "6285260245100@s.whatsapp.net";
  startReminder(sock, owner);

  if (typeof onReady === "function") await onReady(sock);
}

module.exports = { startBot };
