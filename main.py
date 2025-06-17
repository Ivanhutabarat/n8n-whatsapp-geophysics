import os
import datetime
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# Simpan folder data
DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

@app.route('/')
def index():
    return "📡 WhatsApp Bot + Geophysics Server is running!"

@app.route('/upload', methods=['POST'])
def upload_data():
    """
    Endpoint untuk menerima file dari bot WhatsApp/n8n.
    File disimpan ke folder /data
    """
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file provided"}), 400

    filename = datetime.datetime.now().strftime("%Y%m%d-%H%M%S") + "-" + file.filename
    filepath = os.path.join(DATA_DIR, filename)
    file.save(filepath)

    # Di sini bisa panggil MATLAB atau Jupyter script
    print(f"✅ File received and saved: {filepath}")
    return jsonify({"status": "success", "saved_to": filepath})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
