"use client";
import { useEffect, useState } from "react";

/**
 * Tela de splash inicial — só na primeira visita da sessão.
 * Background petrol + wordmark Repon SVG com stroke-draw + tagline mono.
 * Fade-out automático em 1100ms.
 */
export function Splash() {
  const [visible, setVisible] = useState<null | boolean>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = sessionStorage.getItem("repon-splash-seen");
      if (seen) { setVisible(false); return; }
    } catch { /* sessionStorage may be blocked */ }
    setVisible(true);
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setFading(true), 900);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
      try { sessionStorage.setItem("repon-splash-seen", "1"); } catch {}
    }, 1450);
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.style.overflow = ""; };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Carregando Repon"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "var(--color-petrol)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity: fading ? 0 : 1,
        transition: "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div style={{ width: 180, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="splash-wordmark"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                color: "var(--color-blue-300)",
              }}>
          Repon
        </span>
      </div>
      <div className="splash-line" aria-hidden
           style={{
             width: 80, height: 1,
             background: "rgba(243,241,237,0.3)",
             position: "relative",
             overflow: "hidden",
           }}>
        <span style={{
          position: "absolute", inset: 0,
          background: "var(--color-blue-300)",
          transformOrigin: "left",
          animation: "splash-line-fill 900ms cubic-bezier(0.22,1,0.36,1) forwards",
        }} />
      </div>
      <div style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.625rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "rgba(243,241,237,0.5)",
      }}>
        Plataforma de Comércio
      </div>
    </div>
  );
}
