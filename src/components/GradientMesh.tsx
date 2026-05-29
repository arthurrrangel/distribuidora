"use client";

/**
 * Mesh gradient animado — três blobs radiais que se movem em loop longo.
 * Cores: petrol → blue → blue-300. Substituível ao WaveBackground sólido
 * pra dar profundidade ao hero sem desenhar nada explícito.
 *
 * Respeita prefers-reduced-motion: pausa animação.
 */
export function GradientMesh({ opacity = 0.55 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="gradient-mesh-breathe"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity,
      }}
    >
      {/* Blob 1 — azul forte, drift lento */}
      <div
        className="mesh-blob mesh-blob-1"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "70%",
          height: "75%",
          background:
            "radial-gradient(circle at center, rgba(4,100,213,0.55) 0%, rgba(4,100,213,0.15) 45%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      {/* Blob 2 — azul claro, drift diferente */}
      <div
        className="mesh-blob mesh-blob-2"
        style={{
          position: "absolute",
          top: "20%",
          right: "-15%",
          width: "65%",
          height: "70%",
          background:
            "radial-gradient(circle at center, rgba(111,169,232,0.4) 0%, rgba(111,169,232,0.12) 45%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      {/* Blob 3 — petrol profundo, ancorando bottom */}
      <div
        className="mesh-blob mesh-blob-3"
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "20%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(circle at center, rgba(3,79,168,0.35) 0%, rgba(3,79,168,0.1) 50%, transparent 75%)",
          filter: "blur(70px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
