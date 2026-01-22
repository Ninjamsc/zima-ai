// src/LandingPage.jsx
import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.css";

export default function LandingPage({ onTryChat }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Закрываем меню при клике на ссылку
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div ref={vantaRef} className="vanta-bg" />

      <div className="content-wrapper">
        <header className="container">
          <div className="top-bar">
            {/* Hamburger Menu Button (Mobile Only) */}
            <button 
              className="hamburger-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>

            {/* Logo */}
            <div className="logo">ZimAI</div>

            {/* Desktop Navigation */}
            <nav className="nav desktop-nav">
              <div className="nav-links">
                <a href="#products">Products</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </nav>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <div className="logo">ZimAI</div>
            <button 
              className="close-menu"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <div className="mobile-nav-links">
            <a href="#products" onClick={handleLinkClick}>Products</a>
            <a href="#about" onClick={handleLinkClick}>About</a>
            <a href="#contact" onClick={handleLinkClick}>Contact</a>
          </div>
        </nav>

        <main className="container">
          <section className="hero">
            <h1>
              The ideas
              <br />
              flow implementation
            </h1>
            <p className="hero-tagline">
              ZimAI – AI without censorship or unnecessary sentimentality
              <br />
              like the Russian winter
            </p>
            <button className="btn primary-btn" onClick={onTryChat}>
              Get started with ZimAI →
            </button>
          </section>

          <section id="products">
            <h2>[ Our mission ]</h2>
            <div className="products-grid">
              <div className="product-card">
                <h3>ZimAI</h3>
                <p>
                  The most honest conversational
                  <br />
                  AI in Russian
                </p>
                <button className="btn try-now" onClick={onTryChat}>
                  Try now
                </button>
              </div>

              <div className="product-card">
                <h3>API</h3>
                <p>
                  Access to powerful models
                  <br />
                  for developers
                </p>
                <a href="#api" className="btn soon">
                  Coming soon...
                </a>
              </div>

              <div className="product-card">
                <h3>Future</h3>
                <p>AI for life</p>
                <a href="#future" className="btn soon">
                  Coming soon...
                </a>
              </div>
              <div className="product-card">
                <h3>Developer Docs</h3>
                <p>Quick start. Learn more...</p>
                <a href="#docs" className="btn soon">
                  Coming soon...
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact">
          <p>© 2026 ZimAI — Powered by Russian winter</p>
        </footer>
      </div>
    </>
  );
}