import { useEffect, useRef, useState } from "react";
import "./FluxedCursor.css";

const TRAIL_COUNT = 18;
const CURSOR_SIZE = 30;

function FluxedCursor() {
  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem("site-mode") === "classic";
  });

  const animationRef = useRef(null);
  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const head = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const trail = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })),
  );

  const [, forceRender] = useState(0);

  useEffect(() => {
    const handleModeChange = (event) => {
      const nextMode = event.detail?.mode;
      setIsActive(nextMode === "classic");
    };

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    const animate = () => {
      head.current.x += (mouse.current.x - head.current.x) * 0.22;
      head.current.y += (mouse.current.y - head.current.y) * 0.22;

      trail.current[0].x += (head.current.x - trail.current[0].x) * 0.35;
      trail.current[0].y += (head.current.y - trail.current[0].y) * 0.35;

      for (let i = 1; i < trail.current.length; i += 1) {
        trail.current[i].x +=
          (trail.current[i - 1].x - trail.current[i].x) * 0.35;
        trail.current[i].y +=
          (trail.current[i - 1].y - trail.current[i].y) * 0.35;
      }

      forceRender((value) => value + 1);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("site-mode-change", handleModeChange);
    window.addEventListener("mousemove", handleMouseMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("site-mode-change", handleModeChange);
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="fluxed-cursor-layer">
      <img
        src="/images/pointerBall.png"
        alt=""
        className="fluxed-cursor-main"
        style={{
          transform: `translate(${head.current.x - CURSOR_SIZE / 2}px, ${
            head.current.y - CURSOR_SIZE / 2
          }px)`,
        }}
      />

      {trail.current.map((item, index) => (
        <img
          key={index}
          src="/images/pointerBall.png"
          alt=""
          className="fluxed-cursor-trail"
          style={{
            transform: `translate(${item.x - CURSOR_SIZE / 2}px, ${
              item.y - CURSOR_SIZE / 2
            }px) scale(${1 - index * 0.08})`,
            opacity: Math.max(0.06, 0.75 - index * 0.05),
          }}
        />
      ))}
    </div>
  );
}

export default FluxedCursor;
