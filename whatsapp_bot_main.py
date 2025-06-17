whatsapp_bot_main.py

from flask import Flask, request, jsonify import requests import os

app = Flask(name)

WHATSAPP_API_URL = "https://api.callmebot.com/whatsapp.php" API_KEY = "your_callmebot_api_key"  # Replace with your actual key MY_PHONE_NUMBER = "628xxxxxxx"      # Replace with your WhatsApp number

@app.route("/send", methods=["POST"]) def send_message(): data = request.get_json() message = data.get("message", "")

if not message:
    return jsonify({"error": "No message provided"}), 400

payload = {
    "phone": MY_PHONE_NUMBER,
    "text": message,
    "apikey": API_KEY
}

response = requests.get(WHATSAPP_API_URL, params=payload)

if response.status_code == 200:
    return jsonify({"success": True, "message": "Sent"}), 200
else:
    return jsonify({"success": False, "message": "Failed to send"}), 500

if name == "main": app.run(debug=True, port=5000)

