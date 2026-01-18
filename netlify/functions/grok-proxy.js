// netlify/functions/grok-proxy.js

export default async function handler(request) {
  // Поддержка CORS preflight (OPTIONS)
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // Только POST разрешён
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const body = await request.json();

    // Запрос к Groq API (бесплатный tier без карты)
    const groqResponse = await fetch(
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

    const data = await groqResponse.json();

    // Пробрасываем ответ клиенту
    return new Response(JSON.stringify(data), {
      status: groqResponse.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // для простоты; в проде замени на свой домен
      },
    });
  } catch (error) {
    console.error("Grok proxy error:", error.message || error);

    return new Response(
      JSON.stringify({
        error: "Ошибка прокси-сервера",
        details: error.message || "Неизвестная ошибка",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}
