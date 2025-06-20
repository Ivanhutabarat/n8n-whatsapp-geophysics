const axios = require("axios");

module.exports = {
  name: "btc",
  description: "Get real-time Bitcoin price (using CoinGecko PRO)",
  category: "api",
  async execute(sock, msg) {
    const { from } = msg;
    try {
      const res = await axios.get("https://pro-api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: "bitcoin",
          vs_currencies: "usd"
        },
        headers: {
          "x-cg-pro-api-key": "CG-6SJ2ckThvLEJQy7GCJbf5Wna"
        }
      });

      const price = res.data.bitcoin.usd;

      await sock.sendMessage(from, {
        text: `💸 *BTC Price:* $${price.toLocaleString("en-US")}`
      });

    } catch (e) {
      await sock.sendMessage(from, {
        text: "⚠️ Error fetching BTC price. Check your API key or internet connection."
      });
    }
  }
};
