from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load("crop_model.pkl")

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json["message"]

    # Dummy input parsing (replace with NLP later)
    input_data = [90, 42, 43, 20.87, 82.00, 6.5, 202.93]  # N, P, K, temp, humidity, pH, rainfall
    crop = model.predict([input_data])[0]

    reply = f"Based on your soil and weather data, I recommend growing **{crop}**."
    return jsonify({"reply": reply, "lang": "en-IN"})