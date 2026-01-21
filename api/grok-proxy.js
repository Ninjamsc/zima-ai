// api/grok-proxy.js (для Vercel)
// Разместить в папке /api/ в корне проекта

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Получаем API key из environment variable
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      console.error("❌ GROQ_API_KEY not found in environment variables");
      return res.status(500).json({
        error: "Server configuration error: API key not set",
        hint: "Add GROQ_API_KEY to Vercel Environment Variables",
      });
    }

    console.log("✅ API Key found, length:", GROQ_API_KEY.length);

    // Получаем body запроса
    const { model, messages, temperature, max_tokens, top_p } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid request: messages array required",
      });
    }

    console.log("📤 Sending request to Groq API...");
    console.log("Model:", model);
    console.log("Messages count:", messages.length);

    // Запрос к Groq API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: model || "llama-3.1-8b-instant",
          messages: messages,
          temperature: temperature || 0.82,
          max_tokens: max_tokens || 1400,
          top_p: top_p || 0.95,
        }),
      },
    );

    console.log("📥 Groq API response status:", groqResponse.status);

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("❌ Groq API error:", errorText);

      return res.status(groqResponse.status).json({
        error: `Groq API error: ${groqResponse.status}`,
        details: errorText,
      });
    }

    const data = await groqResponse.json();
    console.log("✅ Response received from Groq");

    // Возвращаем результат клиенту
    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
