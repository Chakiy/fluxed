import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./fluxedMode.css";

function FluxedMode() {
  const location = useLocation();
  const floatRef = useRef(null);
  const animationRef = useRef(null);

  const [isClassic, setIsClassic] = useState(() => {
    const savedMode = localStorage.getItem("site-mode");
    return savedMode === "classic";
  });

  useEffect(() => {
    const mode = isClassic ? "classic" : "fluxed";

    if (isClassic) {
      document.body.classList.add("classic-mode");
      document.body.classList.add("fluxed-cursor-active");
    } else {
      document.body.classList.remove("classic-mode");
      document.body.classList.remove("fluxed-cursor-active");
    }

    localStorage.setItem("site-mode", mode);

    window.dispatchEvent(
      new CustomEvent("site-mode-change", {
        detail: { mode },
      }),
    );
  }, [isClassic]);

  useEffect(() => {
    const element = floatRef.current;
    if (!element) return;

    const state = {
      x: -35,
      y: 20,
      vx: -0.22,
      vy: 0.18,
      ax: 0,
      ay: 0,
      maxLeft: -100,
      maxRight: 0,
      maxTop: 0,
      maxBottom: 100,
      rotation: 0,
      rotationVelocity: 0,
    };

    const animate = () => {
      state.ax += (Math.random() - 0.5) * 0.004;
      state.ay += (Math.random() - 0.5) * 0.004;

      state.ax *= 0.96;
      state.ay *= 0.96;

      state.vx += state.ax;
      state.vy += state.ay;

      state.vx *= 0.992;
      state.vy *= 0.992;

      const speedLimit = 0.65;
      state.vx = Math.max(-speedLimit, Math.min(speedLimit, state.vx));
      state.vy = Math.max(-speedLimit, Math.min(speedLimit, state.vy));

      state.x += state.vx;
      state.y += state.vy;

      if (state.x < state.maxLeft) {
        state.x = state.maxLeft;
        state.vx *= -0.88;
      }

      if (state.x > state.maxRight) {
        state.x = state.maxRight;
        state.vx *= -0.88;
      }

      if (state.y < state.maxTop) {
        state.y = state.maxTop;
        state.vy *= -0.88;
      }

      if (state.y > state.maxBottom) {
        state.y = state.maxBottom;
        state.vy *= -0.88;
      }

      state.rotationVelocity += state.vx * 0.02;
      state.rotationVelocity *= 0.94;
      state.rotation += state.rotationVelocity;

      const breathing = 1 + Math.sin(Date.now() * 0.0018) * 0.025;

      element.style.transform = `
        translate(${state.x}px, ${state.y}px)
        rotate(${state.rotation}deg)
        scale(${breathing})
      `;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const hideOnHome = location.pathname === "/";
  if (hideOnHome) return null;

  return (
    <div className="fluxedMode" aria-hidden="false">
      <span ref={floatRef} className="fluxedMode-float">
        <img
          src={isClassic ? "/images/classic.png" : "/images/fluxed.png"}
          alt={isClassic ? "classic mode" : "fluxed mode"}
          className="fluxedMode-image"
          onClick={() => setIsClassic((prev) => !prev)}
        />
      </span>
    </div>
  );
}

export default FluxedMode;
