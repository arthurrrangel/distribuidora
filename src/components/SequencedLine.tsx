"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Mask reveal — texto entra de baixo com clip.
 * Use múltiplas linhas com delays escalonados pra criar hero cinematográfico.
 *
 * Renderiza como <span style={{display:'block'}}> pra ser usável dentro de
 * <h1>/<h2> (block dentro de inline phrasing) sem quebrar a semântica visual.
 */
export function SequencedLine({
  children,
  delay = 0,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  accent?: boolean;
}) {
  const outerRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!outerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(outerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={outerRef}
      className={className}
      style={{
        display: "block",
        overflow: "hidden",
        paddingBottom: "0.06em",
        color: accent ? "var(--color-blue-300)" : undefined,
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: visible ? "translateY(0)" : "translateY(110%)",
          opacity: visible ? 1 : 0,
          transition: `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 700ms ease ${delay}ms`,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </span>
    </span>
  );
}
