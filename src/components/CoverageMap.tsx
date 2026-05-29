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

  // Paths estilizados aproximando o contorno real de cada estado (viewBox 600x760).
  // Não cartograficamente exatos, mas dramaticamente mais orgânicos que polígonos.
  const states = [
    { code: "MG", name: "Minas Gerais",   d: "M 180 80 C 230 70, 320 70, 400 78 C 440 82, 470 110, 478 150 C 485 195, 482 230, 470 255 C 450 275, 410 285, 360 282 C 310 280, 260 276, 215 270 C 175 263, 150 245, 145 215 C 140 180, 148 140, 165 110 C 170 96, 175 86, 180 80 Z",                                                                                                                              label: { x: 315, y: 185 } },
    { code: "ES", name: "Espírito Santo", d: "M 478 150 C 490 152, 510 155, 525 165 C 532 195, 528 225, 510 248 C 495 256, 478 252, 470 235 C 468 215, 472 190, 478 168 C 478 162, 478 156, 478 150 Z",                                                                                                                                                                                   label: { x: 500, y: 200 } },
    { code: "RJ", name: "Rio de Janeiro", d: "M 380 282 C 410 283, 445 284, 470 285 C 488 290, 500 305, 502 322 C 495 335, 470 340, 440 338 C 410 336, 385 332, 365 322 C 358 312, 362 298, 370 290 C 374 285, 378 283, 380 282 Z",                                                                                                                                                          label: { x: 432, y: 315 } },
    { code: "SP", name: "São Paulo",      d: "M 145 290 C 200 287, 280 286, 348 287 C 375 295, 395 320, 410 350 C 418 380, 412 405, 395 422 C 360 438, 300 442, 240 437 C 190 432, 155 420, 138 395 C 125 370, 122 340, 128 315 C 132 302, 138 294, 145 290 Z",                                                                                                                                  label: { x: 265, y: 365 } },
    { code: "PR", name: "Paraná",         d: "M 132 440 C 195 445, 280 450, 360 448 C 385 460, 395 480, 392 500 C 380 518, 340 525, 285 525 C 230 525, 180 522, 145 510 C 125 500, 120 480, 122 462 C 124 452, 127 444, 132 440 Z",                                                                                                                                                            label: { x: 258, y: 488 } },
    { code: "SC", name: "Santa Catarina", d: "M 160 530 C 220 528, 290 528, 358 530 C 375 540, 382 555, 378 572 C 365 585, 320 592, 265 593 C 215 593, 180 588, 162 578 C 153 568, 154 552, 158 538 C 158 534, 159 532, 160 530 Z",                                                                                                                                                            label: { x: 270, y: 562 } },
    { code: "RS", name: "Rio Grande do Sul", d: "M 105 600 C 170 596, 260 596, 340 605 C 372 620, 385 650, 378 685 C 358 715, 305 728, 240 725 C 175 720, 115 700, 80 670 C 65 645, 70 625, 88 612 C 94 606, 100 602, 105 600 Z",                                                                                                                                                              label: { x: 228, y: 662 } },
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
