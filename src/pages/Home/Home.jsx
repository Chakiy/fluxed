import "./Home.css";
import { useEffect, useRef } from "react";
import { initBalls } from "../../js/balls";
import { NavLink } from "react-router-dom";
import FluxedMode from "../../components/FluxedMode/FluxedMode";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initBalls(canvasRef.current);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      <header className="headerHome">
        <div className="header-inner">
          <NavLink to="/" className="logo">
            home
          </NavLink>

          <nav>
            <NavLink to="/work">work</NavLink>
            <NavLink to="/about">about</NavLink>
            <NavLink to="/blog">blog</NavLink>
            <NavLink to="/contact" className="contact">
              contact
            </NavLink>
          </nav>
        </div>
      </header>

      <div class="floating-balls-wrap">
        <canvas
          ref={canvasRef}
          id="floatingCanvas"
          className="floating-canvas"
        />

        <div class="hero-content">
          <h1>Fluxed Agency</h1>
        </div>
      </div>
      <div className="footer-gradient-homepage"></div>
    </>
  );
}
