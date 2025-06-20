const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const P = require("pino");
const fs = require("fs");
const path = require("path");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["Ipan-Bot", "Chrome", "10.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  // Handle pesan masuk
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    const sender = msg.key.remoteJid;
    console.log("📥 Pesan masuk dari", sender, ":", text);

    // Periksa apakah itu perintah dengan awalan /
    if (text && text.startsWith("/")) {
      const [commandName, ...args] = text.slice(1).split(" ");
      const cmdFile = path.join(__dirname, "commands", `${commandName}.js`);
      if (fs.existsSync(cmdFile)) {
        try {
          const command = require(cmdFile);
          await command.run(sock, msg, args);
        } catch (err) {
          console.error("❌ Error di command:", err);
          await sock.sendMessage(sender, { text: "⚠️ Ada error saat jalanin perintah." });
        }
      } else {
        await sock.sendMessage(sender, { text: "❓ Perintah tidak dikenal. Ketik /help" });
      }
    }
  });

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log("🔁 Koneksi terputus, mencoba sambung ulang...");
        startBot();
      } else {
        console.log("⛔ Kamu logout. Jalankan ulang pairing.js");
      }
    }

    if (connection === "open") {
      console.log("✅ Bot sudah aktif dan terhubung ke WhatsApp!");
    }
  });
}

startBot();
