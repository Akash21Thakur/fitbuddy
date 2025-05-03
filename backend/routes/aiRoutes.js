const express = require("express");
const axios = require("axios");
const router = express.Router();

// Load API key from .env
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * POST /api/ask-ai
 * This route accepts a user's message and returns a response from OpenRouter's AI.
 */
router.post("/ask-ai", async (req, res) => {
  const { message } = req.body;

  // Basic validation
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'message' in request body." });
  }

  try {
    // Make a request to OpenRouter's chat completions endpoint
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // ✅ You can change this to another available model
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`, // 🔐 Keep this key safe in .env
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000", // Required by OpenRouter
          "X-Title": "FitBuddy", // Can be your app name
        },
      }
    );

    // Extract AI's response
    const aiReply = response.data.choices[0].message.content;

    // Send the reply back to the frontend
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("❌ Error talking to OpenRouter:", error.message);

    // If OpenRouter responds with an error
    if (error.response) {
      console.error("Response data:", error.response.data);
      return res.status(error.response.status).json({
        error: error.response.data?.error?.message || "OpenRouter API error",
      });
    }

    // For all other errors
    res.status(500).json({ error: "Something went wrong with AI service." });
  }
});

module.exports = router;