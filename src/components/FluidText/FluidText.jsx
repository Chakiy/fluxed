import React, { useEffect, useRef } from "react";

export default function FluidText({
  text = "FLUID TEXT",
  className = "",
  fontFamily = "Arial",
  fontWeight = 700,
  color = "#b66700",
  background = "#0b0b0b",
  height = 560,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d");

    let letters = [];
    let hoveredLetter = -1;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      offCanvas.width = rect.width * dpr;
      offCanvas.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      setupText();
    };

    const setupText = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      const fontSize = Math.min(w * 0.12, 160);
      const font = `${fontWeight} ${fontSize}px ${fontFamily}`;

      ctx.font = font;
      offCtx.font = font;
      ctx.textBaseline = "middle";
      offCtx.textBaseline = "middle";

      const spacing = fontSize * 0.02;
      let totalWidth = 0;

      letters = text.split("").map((char) => {
        const width = offCtx.measureText(char).width;
        totalWidth += width + spacing;
        return { char, width };
      });

      totalWidth -= spacing;

      let x = (w - totalWidth) / 2;
      const y = h / 2;

      letters = letters.map((letter) => {
        const item = {
          ...letter,
          x,
          y,
          height: fontSize,
        };
        x += letter.width + spacing;
        return item;
      });

      drawBaseText();
    };

    const drawBaseText = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      offCtx.clearRect(0, 0, w, h);
      offCtx.fillStyle = color;

      for (const letter of letters) {
        offCtx.fillText(letter.char, letter.x, letter.y);
      }
    };

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const sx = letter.x;
        const sy = letter.y - letter.height / 2 - 20;
        const sw = letter.width;
        const sh = letter.height + 40;

        if (i === hoveredLetter && letter.char !== " ") {
          const strips = 28;

          for (let s = 0; s < strips; s++) {
            const sliceX = sx + (sw / strips) * s;
            const sliceW = sw / strips + 1;
            const center = s / strips;

            const wave =
              Math.sin(time * 0.14 + center * 10) * 10 +
              Math.cos(time * 0.09 + center * 18) * 4;

            const scaleY = 1 + Math.sin(time * 0.12 + center * 8) * 0.06;

            ctx.drawImage(
              offCanvas,
              sliceX,
              sy,
              sliceW,
              sh,
              sliceX,
              sy + wave,
              sliceW,
              sh * scaleY,
            );
          }
        } else {
          ctx.drawImage(offCanvas, sx, sy, sw, sh, sx, sy, sw, sh);
        }
      }

      time += 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      hoveredLetter = -1;

      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        const top = l.y - l.height / 2;
        const bottom = l.y + l.height / 2;
        const left = l.x;
        const right = l.x + l.width;

        if (
          mouseX >= left &&
          mouseX <= right &&
          mouseY >= top &&
          mouseY <= bottom &&
          l.char !== " "
        ) {
          hoveredLetter = i;
          break;
        }
      }
    };

    const handleMouseLeave = () => {
      hoveredLetter = -1;
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text, fontFamily, fontWeight, color]);

  return (
    <div
      className={className}
      style={{
        // width: "85vw",
        // maxWidth: "1100px",
        height: `100px`,
        // background,
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          // width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
