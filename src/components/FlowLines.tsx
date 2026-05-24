/**
 * Linhas SVG finas atravessando o hero — vibe de "fluxo" / dados em movimento.
 * Animadas via CSS keyframes (sem JS). Respeita prefers-reduced-motion via media query.
 */
export function FlowLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.42,
        mixBlendMode: "screen",
      }}
    >
      <defs>
        <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(82,159,237,0)" />
          <stop offset="50%" stopColor="rgba(82,159,237,0.6)" />
          <stop offset="100%" stopColor="rgba(82,159,237,0)" />
        </linearGradient>
      </defs>
      {[
        { y: 180, dur: 14 },
        { y: 340, dur: 18 },
        { y: 520, dur: 16 },
        { y: 700, dur: 20 },
        { y: 820, dur: 13 },
      ].map((l, i) => (
        <g key={i} className="flow-line" style={{ animationDuration: `${l.dur}s` }}>
          <line
            x1="-400"
            y1={l.y}
            x2="400"
            y2={l.y}
            stroke="url(#flowGradient)"
            strokeWidth="1.2"
          />
        </g>
      ))}
    </svg>
  );
}
