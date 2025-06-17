require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/incoming', async (req, res) => {
  const { message, from } = req.body;
  console.log(`Received message from ${from}: ${message}`);

  // Kirim ke n8n webhook
  try {
    await axios.post(process.env.N8N_WEBHOOK_URL, {
      from,
      message
    });
    res.send('OK');
  } catch (error) {
    console.error('Error forwarding to n8n:', error.message);
    res.status(500).send('Error');
  }
});

app.listen(PORT, () => {
  console.log(`WhatsApp bot server is running on port ${PORT}`);
});
