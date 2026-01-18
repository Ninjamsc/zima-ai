// netlify/functions/groq-proxy.js

export default async (request) => {
  // Только POST разрешён
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await groqRes.json();

    // Передаём ответ от Groq клиенту почти без изменений
    return new Response(JSON.stringify(data), {
      status: groqRes.status,
      headers: {
        "Content-Type": "application/json",
        // Если нужен CORS (часто полезно для dev)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.error("Proxy error:", err);

    return new Response(JSON.stringify({ error: "Ошибка на стороне прокси" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
