/**
 * Onda decorativa estilo "fluxo" — inspirada na apresentação Pavloworks.
 * Renderizada server-side, animação CSS pura via keyframes em globals.
 *
 * Use absoluta dentro de hero/footer com pointer-events: none.
 */
export function WaveBackground({
  variant = "petrol",
  className = "",
  opacity = 0.55,
}: {
  variant?: "petrol" | "blue" | "green";
  className?: string;
  opacity?: number;
}) {
  const palette = {
    petrol: { base: "#01092D", wave: "#0464D5" },
    blue:   { base: "#0464D5", wave: "#01092D" },
    green:  { base: "#A6D97A", wave: "#01092D" },
  }[variant];

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id={`wave-grad-${variant}`} x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%"  stopColor={palette.wave} stopOpacity="0.7" />
            <stop offset="50%" stopColor={palette.wave} stopOpacity="0.4" />
            <stop offset="100%" stopColor={palette.wave} stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g style={{ transformOrigin: "center" }}>
          {/* 5 ondas verticais com animação de scroll horizontal sutil */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M ${-200 + i * 380} 0
                  C ${-200 + i * 380 + 150} 200,
                    ${-200 + i * 380 + 50} 450,
                    ${-200 + i * 380 + 180} 650
                  C ${-200 + i * 380 + 300} 800,
                    ${-200 + i * 380 + 200} 900,
                    ${-200 + i * 380 + 250} 900
                  L ${-200 + i * 380 + 250} 0 Z`}
              fill={`url(#wave-grad-${variant})`}
              className="wave-path"
              style={{ animationDelay: `${i * 0.8}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
