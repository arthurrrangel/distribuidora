"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Cursor blob translúcido — usa CSS transition em vez de rAF loop
 * pra evitar bloquear document_idle. Desktop only.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) {
      const handler = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        spawnRipple(t.clientX, t.clientY);
      };
      document.addEventListener("touchstart", handler, { passive: true });
      return () => document.removeEventListener("touchstart", handler);
    }
    return;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const inter = t.closest("a, button, [role=button], input, textarea, select");
      setHovering(!!inter);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={blobRef}
      aria-hidden
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        borderRadius: "999px",
        background: hovering ? "rgba(82,159,237,0.18)" : "rgba(82,159,237,0.10)",
        border: hovering ? "1px solid rgba(82,159,237,0.55)" : "1px solid rgba(82,159,237,0.32)",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate3d(-100px,-100px,0)",
        transition: "transform 180ms cubic-bezier(0.22,1,0.36,1), background 220ms ease, border 220ms ease, scale 240ms ease",
        scale: hovering ? "1.5" : "1",
      }}
    />
  );
}

function spawnRipple(x: number, y: number) {
  const el = document.createElement("div");
  el.className = "tap-ripple";
  el.style.cssText = `position:fixed;left:${x - 8}px;top:${y - 8}px;width:16px;height:16px;border-radius:999px;background:rgba(82,159,237,0.18);border:1px solid rgba(82,159,237,0.45);pointer-events:none;z-index:9999;animation:tap-ripple 600ms cubic-bezier(0.22,1,0.36,1) forwards;`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}
