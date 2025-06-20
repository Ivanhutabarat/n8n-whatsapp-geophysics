const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const P = require("pino");

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

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("✅ Bot terhubung ke WhatsApp!");
    }
    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log("🔁 Terputus, mencoba ulang...");
        startBot();
      } else {
        console.log("⛔ Terlogout. Jalankan ulang pairing.js");
      }
    }
  });

  return sock;
}

module.exports = startBot;
