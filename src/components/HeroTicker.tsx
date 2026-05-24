import { Reveal } from "./Reveal";

const ITEMS = [
  { label: "Despacho", value: "48h" },
  { label: "CNAEs", value: "14" },
  { label: "Estados", value: "7" },
  { label: "Centros", value: "2" },
];

export function HeroTicker() {
  return (
    <Reveal delay={400}>
      <div
        className="hero-ticker"
        style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "24px",
          maxWidth: 560,
        }}
      >
        {ITEMS.map((it) => (
          <div key={it.label} style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-display, inherit)",
                fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-iced)",
                lineHeight: 1,
              }}
            >
              {it.value}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(243,241,237,0.55)",
              }}
            >
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
