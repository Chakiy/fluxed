import "./Home.css";
import { useEffect, useRef } from "react";
import { initBalls } from "../../js/balls";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initBalls(canvasRef.current);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div class="floating-balls-wrap">
      <canvas ref={canvasRef} id="floatingCanvas" className="floating-canvas" />

      <div class="hero-content">
        <h1>Fluxed</h1>
      </div>
    </div>
  );
}
