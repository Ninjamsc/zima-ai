import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";
import "./App.css";

function App() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = FOG({
      el: vantaRef.current,
      THREE,
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
      speed: 0.9,
      zoom: 0.95,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="app">
      <div ref={vantaRef} className="vanta-bg"></div>

      <div className="content-wrapper">
        <header className="container">
          <nav className="nav">
            <div className="logo">ZimAI</div>
            <div className="nav-links">
              <a href="#"></a>
              <a href="#">Products</a>
              <a href="#">Company</a>
              <a href="#">Resources</a>
            </div>
          </nav>
        </header>

        <main className="container">
          <section className="hero">
            <h1>
              Understand
              <br />
              the Universe
            </h1>
            <p>
              ZimAI is building artificial intelligence
              <br />
              to accelerate human scientific discovery.
            </p>
            <a href="#" className="btn">
              Explore ZimAI →
            </a>
          </section>

          <section>
            <h2>Our mission</h2>
            <div className="products-grid">
              <div className="product-card">
                <h3>ZimAI</h3>
                <p>
                  Truth-seeking AI companion
                  <br />
                  available across web, iOS, Android & X
                </p>
                <a href="#" className="btn">
                  Try ZimAI
                </a>
              </div>

              <div className="product-card">
                <h3>API</h3>
                <p>
                  Access to our latest frontier models
                  <br />
                  with enhanced reasoning & speed
                </p>
                <a href="#" className="btn">
                  Get API access
                </a>
              </div>

              <div className="product-card">
                <h3>Supercluster</h3>
                <p>
                  One of the most powerful training clusters
                  <br />
                  in the world — expanding rapidly
                </p>
                <a href="#" className="btn">
                  Learn more
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p>
            © ZimAI — advancing our collective understanding of the universe
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
