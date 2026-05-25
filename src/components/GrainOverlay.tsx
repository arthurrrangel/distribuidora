/**
 * Textura noise SVG estática como overlay.
 * Detalhe que sites premium (Apple, Stripe, Linear) usam pra quebrar
 * a "limpeza plástica" do digital — dá sensação tátil de impresso.
 *
 * Server component, sem JS, sem animação. Overlay blend mode.
 */
export function GrainOverlay({
  opacity = 0.06,
  blendMode = "overlay",
}: {
  opacity?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
}) {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
        mixBlendMode: blendMode,
        zIndex: 2,
      }}
    >
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.95
                  0 0 0 0 0.95
                  0 0 0 0 0.92
                  0 0 0 0.6 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
