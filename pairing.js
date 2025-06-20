const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  useSingleFileAuthState
} = require("@whiskeysockets/baileys");
const P = require("pino");

async function startPairing() {
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["BotWA-Termux", "Chrome", "10.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  console.log("🔗 Silakan buka WhatsApp > Perangkat Tertaut > Tautkan Perangkat");
  console.log("📱 Tunggu pairing code ditampilkan...");
}

startPairing();
