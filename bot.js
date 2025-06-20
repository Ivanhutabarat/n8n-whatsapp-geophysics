require("dotenv").config();
const startBot = require("./core/startBot");
const fs = require("fs");
const path = require("path");

const commands = {};
const commandsPath = path.join(__dirname, "commands");

fs.readdirSync(commandsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const cmd = require(`./commands/${file}`);
    commands[cmd.name] = cmd;
  }
});

startBot().then((sock) => {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text;

    console.log("📥 Pesan diterima:", text);
    if (!text || !text.startsWith("/")) return;

    const [cmdName, ...args] = text.slice(1).trim().split(/\s+/);
    console.log("⚙️ Command:", cmdName);

    const command = commands[cmdName.toLowerCase()];
    if (command && typeof command.execute === "function") {
      try {
        await command.execute(sock, msg, args);
      } catch (err) {
        console.error(`❌ Error di /${cmdName}:`, err.message);
        await sock.sendMessage(from, { text: "⚠️ Error saat menjalankan perintah." });
      }
    } else {
      await sock.sendMessage(from, {
        text: "❓ Perintah tidak dikenali. Coba ketik /help"
      });
    }
  });
});
