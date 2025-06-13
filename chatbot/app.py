from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Replace with your actual Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Gemini endpoint
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"reply": "Please say something."})

    try:
        response = requests.post(
            GEMINI_URL,
            headers={"Content-Type": "application/json"},
            json={
                "contents": [
                    {
                        "parts": [{"text": user_message}]
                    }
                ]
            },
            timeout=10  # Optional: timeout to avoid hanging
        )

        if response.status_code == 200:
            gemini_reply = response.json()["candidates"][0]["content"]["parts"][0]["text"]
            return jsonify({"reply": gemini_reply})
        else:
            return jsonify({"reply": "Something went wrong. Please try again later."})

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Something went wrong. Please try again later."})

if __name__ == "__main__":
    app.run(port=5000, debug=True)