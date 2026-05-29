"use client";
import { useEffect, useState } from "react";

/**
 * Selo circular "Sem fidelidade · Direto da indústria · B2B · Cadastro PJ"
 * que gira lentamente conforme o scroll. Posição sticky no canto direito
 * de uma seção institucional. Detalhe editorial.
 */
export function Sticker({
  text = "sem fidelidade · direto da indústria · cadastro pj · sem mínimo agressivo · ",
  size = 132,
  color = "var(--color-petrol)",
}: {
  text?: string;
  size?: number;
  color?: string;
}) {
  const [rot, setRot] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      setRot((y * 0.18) % 360);
      raf = requestAnimationFrame(() => {});
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => {
      window.removeEventListener("scroll", tick);
      cancelAnimationFrame(raf);
    };
  }, []);

  const repeated = text + text;

  return (
    <div
      aria-hidden
      className="sticker"
      style={{
        width: size,
        height: size,
        transform: `rotate(${rot}deg)`,
        willChange: "transform",
      }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <path id="sticker-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="94" fill="none" stroke={color} strokeWidth="0.6" opacity="0.35" />
        <circle cx="100" cy="100" r="6" fill={color} opacity="0.6" />
        <text fill={color} fontFamily="var(--font-mono), monospace"
              fontSize="11" letterSpacing="2" textLength="480">
          <textPath href="#sticker-circle" startOffset="0">
            {repeated.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
