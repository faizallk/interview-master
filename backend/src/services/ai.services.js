const { GoogleGenAI } = require("@google/genai");

async function invokedGeminiAi(){
    if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not configured; skipping Gemini startup check.");
        return;
    }

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const res = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        prompt: "Write a story about a magic backpack."
    });
    console.log(res.text);
}

module.exports = invokedGeminiAi
