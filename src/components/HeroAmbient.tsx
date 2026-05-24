"use client";
import { useEffect, useRef } from "react";

/**
 * Camada ambient pro hero: 1 orbe que segue cursor + 2 orbs com drift lento.
 * Pointer-events none. Respeita prefers-reduced-motion.
 */
export function HeroAmbient() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let tx = 50, ty = 50;
    let cx = 50, cy = 50;
    const parent = cursorRef.current?.parentElement;
    if (!parent) return;
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (cursorRef.current) {
        cursorRef.current.style.background = `radial-gradient(600px circle at ${cx}% ${cy}%, rgba(82,159,237,0.22), transparent 60%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    parent.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="hero-orb-1"
        style={{
          position: "absolute",
          top: "-12%",
          right: "-10%",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(4,100,213,0.32), rgba(4,100,213,0) 70%)",
          filter: "blur(8px)",
          pointerEvents: "none",
          zIndex: 0,
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="hero-orb-2"
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(82,159,237,0.20), rgba(82,159,237,0) 70%)",
          filter: "blur(6px)",
          pointerEvents: "none",
          zIndex: 0,
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
