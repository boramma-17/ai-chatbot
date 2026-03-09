import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());  // allow frontend to talk to backend
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  const { message, lang } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI farming assistant." },
        { role: "user", content: `Reply in ${lang}. User said: ${message}` },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ reply: "⚠️ Sorry, I could not process that request." });
  }
});

app.listen(3000, () => console.log("🚀 Backend running on http://localhost:3000"));
