import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./fluxedMode.css";

function FluxedMode() {
  const location = useLocation();

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

  const hideOnHome = location.pathname === "/";

  if (hideOnHome) return null;

  return (
    <button
      className={`fluxedMode ${isClassic ? "active" : ""}`}
      onClick={() => setIsClassic((prev) => !prev)}
    >
      {isClassic ? "classic" : "fluxed"}
    </button>
  );
}

export default FluxedMode;
