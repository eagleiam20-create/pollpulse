from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__)

# Folder jahan main.py aur index.html rakhe hain
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# ==========================================
# MAIN POLLPULSE APP
# ==========================================

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/index.html")
def index():
    return send_from_directory(BASE_DIR, "index.html")


# ==========================================
# STATIC FILES
# ==========================================

@app.route("/<path:filename>")
def static_files(filename):
    file_path = os.path.join(BASE_DIR, filename)

    if os.path.isfile(file_path):
        return send_from_directory(BASE_DIR, filename)

    return "File not found", 404


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/api/health")
def health():
    return jsonify({
        "ok": True,
        "app": "PollPulse",
        "message": "PollPulse backend is running"
    })


# ==========================================
# APP CONFIG
# ==========================================

@app.route("/api/config")
def config():
    return jsonify({
        "app": "PollPulse",
        "version": "1.0.0",
        "status": "online"
    })


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )
