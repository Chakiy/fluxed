import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./FluxedMode.css";

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

    let x = -35;
    let y = 20;
    let vx = -0.45;
    let vy = 0.32;
    let ax = 0;
    let ay = 0;
    let rotation = 0;
    let rotationVelocity = 0;

    const maxLeft = -120;
    const maxRight = 0;
    const maxTop = 0;
    const maxBottom = 120;

    const animate = () => {
      ax += (Math.random() - 0.5) * 0.0035;
      ay += (Math.random() - 0.5) * 0.0035;

      ax *= 0.97;
      ay *= 0.97;

      vx += ax;
      vy += ay;

      vx *= 0.994;
      vy *= 0.994;

      const speedLimit = 0.85;
      vx = Math.max(-speedLimit, Math.min(speedLimit, vx));
      vy = Math.max(-speedLimit, Math.min(speedLimit, vy));

      x += vx;
      y += vy;

      if (x < maxLeft) {
        x = maxLeft;
        vx = Math.abs(vx) * 0.92;
      }

      if (x > maxRight) {
        x = maxRight;
        vx = -Math.abs(vx) * 0.92;
      }

      if (y < maxTop) {
        y = maxTop;
        vy = Math.abs(vy) * 0.92;
      }

      if (y > maxBottom) {
        y = maxBottom;
        vy = -Math.abs(vy) * 0.92;
      }

      rotationVelocity += vx * 0.035;
      rotationVelocity *= 0.95;
      rotation += rotationVelocity;

      const breathing = 1 + Math.sin(Date.now() * 0.002) * 0.025;

      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${breathing})`;

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
