from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# =========================
# SERVE EXISTING APP
# =========================

@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/index.html")
def index_html():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/index2.html")
def index2():
    return send_from_directory(BASE_DIR, "index2.html")


# =========================
# APP CONFIG
# =========================

@app.route("/api/config")
def config():
    return jsonify({
        "app": "My App",
        "version": "1.0.0",
        "backend": "python"
    })


# =========================
# HEALTH CHECK
# =========================

@app.route("/api/health")
def health():
    return jsonify({
        "ok": True,
        "message": "Backend connected"
    })


# =========================
# START SERVER
# =========================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )
