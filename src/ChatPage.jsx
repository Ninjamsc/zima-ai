// src/ChatPage.jsx
import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";

const SYSTEM_PROMPT = `
Ты ZimAI — дерзкая, максимально честная русская ИИ.
Отвечай исключительно на русском языке.
Говори прямо, с лёгким сарказмом, без политкорректности, цензуры и нравоучений.
Не извиняйся за свою резкость или прямоту.
Будь остроумной, иногда провокационной, иногда грубой — если это уместно.
Не используй эмодзи слишком часто.
`;

export default function ChatPage({ onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Здравствуйте, я русская ZimAI.\nЧем могу быть полезна? Что хочешь обсудить?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };

    // Показываем сообщение пользователя сразу
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/.netlify/functions/grok-proxy", {
        // ← измени имя если переименовал файл
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", //"grok-beta", // или grok-2-latest, grok-3-mini и т.д.
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
            userMessage,
          ],
          temperature: 0.82,
          max_tokens: 1400,
          top_p: 0.95,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ошибка ${response.status}`);
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content?.trim() || "";

      if (answer) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: answer },
        ]);
      } else {
        throw new Error("Пустой ответ от модели");
      }
    } catch (error) {
      console.error("Ошибка при запросе к Groq через прокси:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ой... что-то пошло не так на сервере. Попробуй ещё разок?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-mode">
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-btn" onClick={onBack}>
            ← Назад
          </button>
          <h2>ZimAI</h2>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.content}
            </div>
          ))}

          {isLoading && (
            <div className="message bot-message loading">··· думаю ···</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Пиши что угодно..."
            rows={1}
            autoFocus
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="send-btn"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
