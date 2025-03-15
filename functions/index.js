const functions = require("firebase-functions") 
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// 🔹 GPT-4 API Proxy
app.post("/gpt", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${functions.config().openai.key}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        res.status(500).send("Internal Server Error");
    }
});

// 🔹 Whisper API Proxy (Speech-to-Text)
app.post("/whisper", async (req, res) => {
    try {
        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${functions.config().openai.key}`,
                "Content-Type": "multipart/form-data"
            },
            body: req.body
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error calling Whisper API:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Deploy the API
exports.api = functions.https.onRequest(app);

