/**
 * Constellation network — pontos sutis representando os 2 CDs (SP + SC),
 * 4-5 satélites menores, e linhas com stroke-dasharray animado
 * que sugerem fluxo de dados / distribuição entre os pontos.
 *
 * SVG server-side, sem JS. Animação via CSS keyframes em globals.css.
 * Metáfora visual direta da operação Repon (Sudeste/Sul + rede de cobertura).
 */
export function ConstellationNetwork() {
  const points = [
    { x: 18, y: 32, r: 5, hub: true, label: "sc" },   // SC hub
    { x: 78, y: 58, r: 5, hub: true, label: "sp" },   // SP hub
    { x: 32, y: 18, r: 2.5, label: "rs" },
    { x: 52, y: 28, r: 2.5, label: "pr" },
    { x: 65, y: 72, r: 2.5, label: "mg" },
    { x: 88, y: 38, r: 2.5, label: "rj" },
    { x: 42, y: 65, r: 2.5, label: "es" },
  ];

  const lines = [
    { x1: 18, y1: 32, x2: 78, y2: 58, primary: true },  // SC ↔ SP (hub principal)
    { x1: 18, y1: 32, x2: 32, y2: 18 },                  // SC ↔ RS
    { x1: 78, y1: 58, x2: 65, y2: 72 },                  // SP ↔ MG
    { x1: 78, y1: 58, x2: 88, y2: 38 },                  // SP ↔ RJ
    { x1: 78, y1: 58, x2: 52, y2: 28 },                  // SP ↔ PR
    { x1: 78, y1: 58, x2: 42, y2: 65 },                  // SP ↔ ES
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.55,
      }}
    >
      {/* Lines */}
      {lines.map((l, i) => (
        <line
          key={`line-${i}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={l.primary ? "rgba(111,169,232,0.55)" : "rgba(111,169,232,0.25)"}
          strokeWidth={l.primary ? "0.18" : "0.12"}
          strokeDasharray={l.primary ? "0.9 1.4" : "0.5 1.2"}
          className={`constellation-line ${l.primary ? "constellation-line-primary" : ""}`}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* Points */}
      {points.map((p, i) => (
        <g key={`pt-${i}`}>
          {p.hub && (
            <circle
              cx={p.x}
              cy={p.y}
              r={p.r * 1.6}
              fill="rgba(111,169,232,0.18)"
              className="constellation-hub-pulse"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          )}
          <circle
            cx={p.x}
            cy={p.y}
            r={p.r * 0.32}
            fill={p.hub ? "rgba(111,169,232,0.95)" : "rgba(111,169,232,0.65)"}
          />
        </g>
      ))}
    </svg>
  );
}
