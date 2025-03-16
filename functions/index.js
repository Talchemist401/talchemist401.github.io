const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 GPT-4 API Proxy
app.post("/gpt", async (req, res) => {
    try {
        // Retrieve the OpenAI API Key from Firestore
        const doc = await db.collection("settings").doc("openai").get();
        const apiKey = doc.exists ? doc.data().apiKey : null;

        if (!apiKey) {
            return res.status(500).json({ error: "API key not found in Firestore" });
        }

        // Send request to OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
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

exports.api = functions.https.onRequest(app);
