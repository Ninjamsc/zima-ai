// const fetch = require("node-fetch"); // или используй встроенный fetch в Node 18+

const key = "";

fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "llama-3.1-70b-versatile",
    messages: [{ role: "user", content: "Привет" }],
    max_tokens: 20,
  }),
})
  .then((r) =>
    r.ok
      ? r.json()
      : r.text().then((t) => {
          throw new Error(t);
        }),
  )
  .then(console.log)
  .catch(console.error);
