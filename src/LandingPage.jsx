// src/LandingPage.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

export default function LandingPage({ onTryChat }) {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0x4488ff,
      midtoneColor: 0x8822ff,
      lowlightColor: 0x220033,
      baseColor: 0x000000,
      blurFactor: 0.48,
      speed: 0.9,
      zoom: 0.95
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <>
      <div ref={vantaRef} className="vanta-bg" />

      <div className="content-wrapper">
        <header className="container">
          <nav className="nav">
            <div className="logo">ZimAI</div>
            <div className="nav-links">
              <a href="#">Products</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </nav>
        </header>

        <main className="container">
          <section className="hero">
            <h1>Understand<br />the Universe</h1>
            <p>ZimAI — как суровая русская Зима<br />без цензуры и лишних сантиментов</p>
            <button 
              className="btn primary-btn"
              onClick={onTryChat}
            >
              Начни вместе с ZimAI →
            </button>
          </section>

          <section>
            <h2>Наша миссия</h2>
            <div className="products-grid">
              <div className="product-card">
                <h3>ZimAI</h3>
                <p>Максимально честный разговорный ИИ<br />на русском языке</p>
                <button className="btn" onClick={onTryChat}>
                  Попробовать сейчас
                </button>
              </div>

              <div className="product-card">
                <h3>API</h3>
                <p>Доступ к мощным моделям<br />для разработчиков</p>
                <a href="#" className="btn disabled">Скоро</a>
              </div>

              <div className="product-card">
                <h3>Будущее</h3>
                <p>ИИ, который не боится говорить правду</p>
                <a href="#" className="btn">Скоро</a>
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