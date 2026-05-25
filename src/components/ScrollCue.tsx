"use client";
import { useEffect, useState } from "react";

/**
 * Indicador de scroll no bottom do hero.
 * Linha vertical animada (gradiente descendo) + label "scroll".
 * Some quando user já rolou.
 */
export function ScrollCue() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: "50%",
        bottom: 36,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: show ? 1 : 0,
        transition: "opacity 380ms ease",
        pointerEvents: "none",
        zIndex: 5,
      }}
      className="hidden md:flex"
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.625rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(243,241,237,0.45)",
          fontWeight: 500,
        }}
      >
        Role
      </span>
      <span
        style={{
          display: "block",
          width: 1,
          height: 56,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(111,169,232,0.6) 50%, transparent 100%)",
          backgroundSize: "100% 200%",
          animation: "scroll-cue-flow 2.4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
