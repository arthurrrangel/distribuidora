import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Repon — Distribuidora atacadista B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #01092D 0%, #0A1240 60%, #034FA8 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#F3F1ED",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              background: "#0464D5",
              borderRadius: 2,
              display: "block",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#6FA9E8",
            }}
          >
            Repon · Atacado B2B
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: -2.8,
              maxWidth: 1000,
            }}
          >
            Distribuidora atacadista
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: -2.8,
              color: "#6FA9E8",
            }}
          >
            B2B para revendedores.
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.3,
              maxWidth: 900,
              color: "rgba(243,241,237,0.75)",
              marginTop: 16,
            }}
          >
            Papelaria, higiene, informática e eletro. Centros em SC e SP. Despacho em 48h.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(111,169,232,0.25)",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 3,
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(243,241,237,0.6)",
            }}
          >
            repondistribuidora.com
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 3,
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(243,241,237,0.6)",
            }}
          >
            Sudeste + Sul
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
