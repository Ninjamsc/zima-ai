// src/LandingPage.jsx
import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.css";

export default function LandingPage({ onTryChat }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    // Функция инициализации Vanta
    const initVanta = () => {
      if (!window.THREE || !window.VANTA) {
        console.warn("Three.js или Vanta ещё не загрузились");
        return;
      }

      if (vantaEffect) {
        vantaEffect.destroy();
      }

      try {
        const effect = window.VANTA.FOG({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x4488ff,
          midtoneColor: 0x8822ff,
          lowlightColor: 0x220033,
          baseColor: 0x000000,
          blurFactor: 0.48,
          speed: 0.2,
          zoom: 0.95,
        });
        setVantaEffect(effect);
        console.log("Vanta эффект успешно инициализирован");
      } catch (error) {
        console.error("Ошибка инициализации Vanta:", error);
      }
    };

    // Проверяем, загружены ли скрипты
    if (window.THREE && window.VANTA) {
      initVanta();
    } else {
      // Ждём загрузки скриптов
      const checkInterval = setInterval(() => {
        if (window.THREE && window.VANTA) {
          clearInterval(checkInterval);
          initVanta();
        }
      }, 100);

      // Очищаем интервал через 5 секунд
      setTimeout(() => clearInterval(checkInterval), 5000);
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <>
      <div ref={vantaRef} className="vanta-bg" />

      <div className="content-wrapper">
        <header className="container">
          <div className="top-bar">
            <div className="logo">ZimAI</div>
            <nav className="nav">
              {/* <div className="logo">ZimAI</div> */}
              <div className="nav-links">
                <a href="zima-ai.netlify.app">Products</a>
                <a href="zima-ai.netlify.app">About</a>
                <a href="zima-ai.netlify.app">Contact</a>
              </div>
            </nav>
          </div>
        </header>

        <main className="container">
          <section className="hero">
            <h1>
              Understand
              <br />
              the Universe
            </h1>
            <p>
              ZimAI — как суровая русская Зима
              <br />
              без цензуры и лишних сантиментов
            </p>
            <button className="btn primary-btn" onClick={onTryChat}>
              Начни вместе с ZimAI →
            </button>
          </section>

          <section>
            <h2>Наша миссия</h2>
            <div className="products-grid">
              <div className="product-card">
                <h3>ZimAI</h3>
                <p>
                  Максимально честный разговорный ИИ
                  <br />
                  на русском языке
                </p>
                <button className="btn try-now" onClick={onTryChat}>
                  Попробовать сейчас
                </button>
              </div>

              <div className="product-card">
                <h3>API</h3>
                <p>
                  Доступ к мощным моделям
                  <br />
                  для разработчиков
                </p>
                <a href="zima-ai.netlify.app" className="btn soon">
                  Скоро
                </a>
              </div>

              <div className="product-card">
                <h3>Future</h3>
                <p>ИИ, который не боится говорить правду</p>
                <a href="zima-ai.netlify.app" className="btn soon">
                  Скоро
                </a>
              </div>
              <div className="product-card">
                <h3>Developer Docs</h3>
                <p>Quick start. Learn more...</p>
                <a href="zima-ai.netlify.app" className="btn soon">
                  Скоро
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p>© 2026 ZimAI — говорить правду не запрещено</p>
        </footer>
      </div>
    </>
  );
}
