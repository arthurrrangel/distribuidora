"use client";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Mapa de cobertura interativo (client) — hover destaca estados e pins.
 * SVG simplificado, geografia indicativa.
 */
export function CoverageMap({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const stateFill = isDark ? "#1A2247" : "#EAE5DA";
  const stateStroke = isDark ? "#2F3B58" : "#D9D4C7";
  const stateText = isDark ? "#8892A4" : "#4A5070";
  const accent = "#0464D5";
  const accentSoft = isDark ? "#6FA9E8" : "#034FA8";

  const [hoverState, setHoverState] = useState<string | null>(null);
  const [hoverPin, setHoverPin] = useState<string | null>(null);

  const states = [
    { code: "MG", name: "Minas Gerais",   d: "M 150 90 L 430 80 L 460 130 L 470 200 L 440 260 L 360 280 L 280 280 L 200 270 L 150 230 Z",                 label: { x: 305, y: 195 } },
    { code: "ES", name: "Espírito Santo", d: "M 470 140 L 520 145 L 525 220 L 490 245 L 470 220 Z",                                                       label: { x: 497, y: 195 } },
    { code: "RJ", name: "Rio de Janeiro", d: "M 380 285 L 470 280 L 495 310 L 470 335 L 400 330 L 370 310 Z",                                             label: { x: 430, y: 312 } },
    { code: "SP", name: "São Paulo",      d: "M 140 285 L 350 285 L 380 320 L 410 360 L 380 420 L 290 440 L 200 430 L 145 400 L 125 350 Z",               label: { x: 265, y: 365 } },
    { code: "PR", name: "Paraná",         d: "M 130 430 L 280 445 L 380 440 L 390 490 L 360 520 L 280 525 L 180 520 L 130 490 Z",                         label: { x: 260, y: 485 } },
    { code: "SC", name: "Santa Catarina", d: "M 160 530 L 360 530 L 380 565 L 360 595 L 250 600 L 175 590 Z",                                              label: { x: 270, y: 565 } },
    { code: "RS", name: "Rio Grande do Sul", d: "M 110 600 L 175 595 L 320 600 L 370 615 L 380 670 L 320 715 L 220 720 L 140 695 L 75 650 Z",            label: { x: 230, y: 660 } },
  ];

  const pinpoints = [
    { x: 285, y: 355, label: "São Paulo / SP", sublabel: "Centralize Hub", slug: "sp", pulse: true,  detail: "Distribuição Sudeste · OnDemand fulfillment" },
    { x: 305, y: 565, label: "Navegantes / SC", sublabel: "Simplilog",      slug: "sc", pulse: false, detail: "Matriz operacional · porta Sul" },
  ];

  return (
    <div className={className}>
      <svg
        viewBox="0 0 600 760"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Mapa de cobertura Repon: Sudeste e Sul"
        className="w-full h-auto"
      >
        {states.map((s) => {
          const isAnchor = s.code === "SP" || s.code === "SC";
          const isHover = hoverState === s.code;
          const fill = isHover
            ? (isDark ? "#0464D5" : "#BFDBFA")
            : isAnchor
              ? (isDark ? "#0464D5" : "#DCEAF9")
              : stateFill;
          const stroke = isHover || isAnchor ? accent : stateStroke;
          return (
            <g key={s.code}
               onMouseEnter={() => setHoverState(s.code)}
               onMouseLeave={() => setHoverState((c) => (c === s.code ? null : c))}
               style={{ cursor: "default" }}>
              <path
                d={s.d}
                fill={fill}
                stroke={stroke}
                strokeWidth={isHover ? 2 : isAnchor ? 1.5 : 1}
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{ transition: "fill 240ms ease, stroke 240ms ease, stroke-width 240ms ease" }}
              />
              <text
                x={s.label.x}
                y={s.label.y}
                textAnchor="middle"
                fontFamily="Funnel Sans, ui-monospace, monospace"
                fontSize="11"
                fontWeight={isAnchor || isHover ? 700 : 600}
                letterSpacing="0.18em"
                fill={isAnchor || isHover ? (isDark ? "#FAFAF7" : "#01092D") : stateText}
                pointerEvents="none"
              >
                {s.code}
              </text>
            </g>
          );
        })}

        {/* Tooltip estado em hover */}
        {hoverState && (() => {
          const s = states.find((x) => x.code === hoverState)!;
          return (
            <g pointerEvents="none">
              <rect x={s.label.x - 60} y={s.label.y + 14} width="120" height="22" rx="2"
                    fill={isDark ? "#0B1220" : "#01092D"}
                    opacity="0.92" />
              <text x={s.label.x} y={s.label.y + 29} textAnchor="middle"
                    fontFamily="Funnel Display, sans-serif" fontSize="11" fontWeight="500"
                    fill="#FAFAF7" letterSpacing="-0.005em">
                {s.name}
              </text>
            </g>
          );
        })()}

        {/* Pulses */}
        {pinpoints.filter((p) => p.pulse).map((p) => (
          <g key={`pulse-${p.slug}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r="6"
              fill={accent}
              opacity="0.25"
              className="map-marker-pulse"
              style={{ transformOrigin: `${p.x}px ${p.y}px` } as React.CSSProperties}
            />
          </g>
        ))}

        {/* Pinpoints */}
        {pinpoints.map((p) => {
          const isHover = hoverPin === p.slug;
          return (
            <g key={`pin-${p.slug}`}
               onMouseEnter={() => setHoverPin(p.slug)}
               onMouseLeave={() => setHoverPin((c) => (c === p.slug ? null : c))}
               style={{ cursor: "pointer" }}>
              <circle cx={p.x} cy={p.y} r={isHover ? 11 : 7} fill="none" stroke={accent} strokeWidth={isHover ? 2 : 1.5}
                      style={{ transition: "r 280ms cubic-bezier(0.22,1,0.36,1), stroke-width 220ms ease" }} />
              <circle cx={p.x} cy={p.y} r={isHover ? 4.5 : 3.5} fill={accent}
                      style={{ transition: "r 280ms cubic-bezier(0.22,1,0.36,1)" }} />
              <line
                x1={p.x + 9}
                y1={p.y}
                x2={p.x + 60}
                y2={p.y}
                stroke={accentSoft}
                strokeWidth="0.75"
                strokeDasharray="2 2"
              />
              <g transform={`translate(${p.x + 66}, ${p.y - 14})`}>
                <text x="0" y="0" fontFamily="Funnel Display, sans-serif" fontSize="13" fontWeight="500"
                      fill={isDark ? "#FAFAF7" : "#0B1220"}>
                  {p.label}
                </text>
                <text x="0" y="16" fontFamily="Funnel Sans, ui-monospace, monospace" fontSize="9.5"
                      fontWeight="500" letterSpacing="0.14em" fill={accentSoft}>
                  3PL · {p.sublabel.toUpperCase()}
                </text>
                {/* tooltip de detalhe revelado no hover */}
                <text x="0" y="34" fontFamily="Funnel Sans, sans-serif" fontSize="10" fontWeight="400"
                      fill={isDark ? "#B8C0D0" : "#4A5070"}
                      opacity={isHover ? 1 : 0}
                      style={{ transition: "opacity 320ms ease" }}>
                  {p.detail}
                </text>
              </g>
            </g>
          );
        })}

        {/* Frame label */}
        <g>
          <line x1="40" y1="60" x2="100" y2="60" stroke={stateStroke} strokeWidth="0.75" />
          <text
            x="40"
            y="50"
            fontFamily="Funnel Sans, ui-monospace, monospace"
            fontSize="9.5"
            fontWeight="500"
            letterSpacing="0.18em"
            fill={stateText}
          >
            COBERTURA · {site.coverage.label.toUpperCase()}
          </text>
        </g>

        <g>
          <text
            x="40"
            y="740"
            fontFamily="Funnel Sans, ui-monospace, monospace"
            fontSize="9"
            fontWeight="400"
            letterSpacing="0.14em"
            fill={stateText}
            opacity="0.7"
          >
            {site.coverage.states.join(" · ")}
          </text>
        </g>
      </svg>
    </div>
  );
}
