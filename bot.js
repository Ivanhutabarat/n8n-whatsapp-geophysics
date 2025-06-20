require("dotenv").config();
const { startBot } = require("./core/startBot");

startBot().then(() => {
  console.log("✅ Bot siap digunakan. Menunggu pesan masuk...");
}).catch(err => {
  console.error("❌ Gagal menjalankan bot:", err);
});
