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
  // Contornos simplificados (12-18 vértices) baseados em coordenadas dos estados.
  // ViewBox 600×760 alinhado à projeção Sudeste+Sul.
  const states = [
    { code: "MG", name: "Minas Gerais",
      d: "M 175 95 L 230 85 L 285 80 L 335 82 L 380 88 L 420 100 L 450 120 L 470 145 L 478 175 L 478 205 L 470 230 L 455 250 L 430 268 L 395 280 L 355 285 L 310 283 L 270 278 L 230 270 L 195 258 L 168 240 L 152 215 L 145 185 L 148 152 L 158 122 L 175 95 Z",
      label: { x: 308, y: 185 } },
    { code: "ES", name: "Espírito Santo",
      d: "M 478 148 L 502 152 L 518 162 L 525 180 L 528 200 L 525 220 L 515 240 L 498 252 L 485 255 L 475 245 L 472 228 L 472 210 L 475 188 L 476 168 L 478 148 Z",
      label: { x: 498, y: 200 } },
    { code: "RJ", name: "Rio de Janeiro",
      d: "M 360 285 L 400 282 L 440 285 L 470 292 L 488 305 L 495 320 L 488 335 L 465 342 L 430 340 L 395 335 L 365 325 L 348 312 L 348 298 L 360 285 Z",
      label: { x: 425, y: 315 } },
    { code: "SP", name: "São Paulo",
      d: "M 145 285 L 200 282 L 260 285 L 320 290 L 360 300 L 388 318 L 405 340 L 415 365 L 412 390 L 398 415 L 372 432 L 335 442 L 290 442 L 240 438 L 195 428 L 158 412 L 132 388 L 122 360 L 122 335 L 128 310 L 145 285 Z",
      label: { x: 268, y: 365 } },
    { code: "PR", name: "Paraná",
      d: "M 130 442 L 180 445 L 235 450 L 290 450 L 340 448 L 378 450 L 395 462 L 398 480 L 392 498 L 372 515 L 342 525 L 305 528 L 265 528 L 220 525 L 175 518 L 140 508 L 122 492 L 118 472 L 122 455 L 130 442 Z",
      label: { x: 258, y: 488 } },
    { code: "SC", name: "Santa Catarina",
      d: "M 155 532 L 200 530 L 250 530 L 305 530 L 348 532 L 372 540 L 382 555 L 380 572 L 365 585 L 335 592 L 295 595 L 255 595 L 215 592 L 180 585 L 158 575 L 148 562 L 148 548 L 155 532 Z",
      label: { x: 268, y: 562 } },
    { code: "RS", name: "Rio Grande do Sul",
      d: "M 100 605 L 145 600 L 195 600 L 248 605 L 295 612 L 332 620 L 358 635 L 372 658 L 372 680 L 358 700 L 335 716 L 300 725 L 258 728 L 215 725 L 175 718 L 138 705 L 105 685 L 82 660 L 75 635 L 82 618 L 100 605 Z",
      label: { x: 232, y: 662 } },
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
