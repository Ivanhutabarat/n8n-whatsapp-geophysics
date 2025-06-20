const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");
const P = require("pino");
const qrcode = require("qrcode-terminal");
const { Boom } = require("@hapi/boom");

async function startPairing() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["Ipan-Bot", "Chrome", "10.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, qr, lastDisconnect }) => {
    if (qr) {
      console.log("\n📲 Scan QR dari WhatsApp:");
      console.log(qr);
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ Pairing berhasil! Kamu sudah terhubung.");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error instanceof Boom
          ? lastDisconnect.error.output.statusCode !== 401
          : true;

      console.log("❌ Koneksi terputus:", lastDisconnect?.error?.message);
      if (shouldReconnect) {
        console.log("🔁 Mencoba pairing ulang...");
        setTimeout(() => startPairing(), 3000);
      } else {
        console.log("⛔ Pairing ditolak. Hapus folder session dan ulangi.");
      }
    }
  });
}

startPairing();
