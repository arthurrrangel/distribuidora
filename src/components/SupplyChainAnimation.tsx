"use client";
import { useEffect, useState } from "react";

/**
 * Visualização animada: Indústria → CD → Revendedor.
 * Nodes com pulse, arestas, partículas viajando pelas linhas.
 * SVG puro, CSS animations, sem deps externas.
 */
export function SupplyChainAnimation() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <svg viewBox="0 0 520 480" xmlns="http://www.w3.org/2000/svg" aria-hidden
         className="supply-chain w-full h-auto">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#529FED" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#529FED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#529FED" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#529FED" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#529FED" stopOpacity="0.15" />
        </linearGradient>
        <filter id="blur-soft"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>

      {/* nodes ambient glow */}
      <circle cx="80" cy="240" r="60" fill="url(#glow)" />
      <circle cx="260" cy="240" r="80" fill="url(#glow)" />
      <circle cx="440" cy="240" r="60" fill="url(#glow)" />

      {/* edges */}
      <path d="M 100 240 Q 180 200 240 240" stroke="url(#edge)" strokeWidth="1.2" fill="none" />
      <path d="M 280 240 Q 360 200 420 240" stroke="url(#edge)" strokeWidth="1.2" fill="none" />

      {/* moving particles */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={`p1-${i}`} r="2.5" fill="#A8CDEF" opacity="0.85"
          className="supply-chain__particle" style={{ animationDelay: `${i * 0.5}s` } as React.CSSProperties}>
          <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.6}s`}
                          path="M 100 240 Q 180 200 240 240" />
        </circle>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <circle key={`p2-${i}`} r="2.5" fill="#A8CDEF" opacity="0.85">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${0.3 + i * 0.6}s`}
                          path="M 280 240 Q 360 200 420 240" />
        </circle>
      ))}

      {/* node 1 — indústria */}
      <g>
        <circle cx="80" cy="240" r="34" fill={active === 0 ? "#0464D5" : "rgba(82,159,237,0.12)"}
                stroke="#529FED" strokeWidth="1.2" style={{transition:"fill 600ms ease"}} />
        <rect x="68" y="232" width="24" height="16" fill="none" stroke={active === 0 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="1" style={{transition:"stroke 600ms ease"}} />
        <line x1="68" y1="236" x2="92" y2="236" stroke={active === 0 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="0.6" style={{transition:"stroke 600ms ease"}} />
      </g>
      <text x="80" y="310" textAnchor="middle" fill="rgba(243,241,237,0.7)"
            fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="2">INDÚSTRIA</text>

      {/* node 2 — Centro Logístico (CD) */}
      <g>
        <circle cx="260" cy="240" r="42" fill={active === 1 ? "#0464D5" : "rgba(82,159,237,0.12)"}
                stroke="#529FED" strokeWidth="1.2" style={{transition:"fill 600ms ease"}} />
        <rect x="244" y="226" width="32" height="28" fill="none" stroke={active === 1 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="1" style={{transition:"stroke 600ms ease"}} />
        <line x1="244" y1="234" x2="276" y2="234" stroke={active === 1 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="0.6" style={{transition:"stroke 600ms ease"}} />
        <line x1="244" y1="242" x2="276" y2="242" stroke={active === 1 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="0.6" style={{transition:"stroke 600ms ease"}} />
        <line x1="244" y1="250" x2="276" y2="250" stroke={active === 1 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="0.6" style={{transition:"stroke 600ms ease"}} />
      </g>
      <text x="260" y="310" textAnchor="middle" fill="rgba(243,241,237,0.7)"
            fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="2">CENTRO 3PL</text>

      {/* node 3 — Revendedor */}
      <g>
        <circle cx="440" cy="240" r="34" fill={active === 2 ? "#0464D5" : "rgba(82,159,237,0.12)"}
                stroke="#529FED" strokeWidth="1.2" style={{transition:"fill 600ms ease"}} />
        <path d="M 428 246 L 428 234 L 452 234 L 452 246 Z" fill="none" stroke={active === 2 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="1" style={{transition:"stroke 600ms ease"}} />
        <line x1="428" y1="246" x2="452" y2="246" stroke={active === 2 ? "#FAFAF7" : "#A8CDEF"} strokeWidth="1" style={{transition:"stroke 600ms ease"}} />
      </g>
      <text x="440" y="310" textAnchor="middle" fill="rgba(243,241,237,0.7)"
            fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="2">REVENDEDOR</text>

      {/* ambient frame label */}
      <line x1="40" y1="60" x2="100" y2="60" stroke="rgba(243,241,237,0.25)" strokeWidth="0.6" />
      <text x="40" y="50" fontFamily="var(--font-mono), monospace" fontSize="9"
            letterSpacing="2.5" fill="rgba(243,241,237,0.4)">FLUXO DE OPERAÇÃO</text>
      <text x="40" y="440" fontFamily="var(--font-mono), monospace" fontSize="8"
            letterSpacing="2" fill="rgba(243,241,237,0.3)">EM TEMPO REAL · 24/7 OPS</text>
    </svg>
  );
}
