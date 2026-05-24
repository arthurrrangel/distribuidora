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
          marginTop: 28,
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          borderTop: "1px solid rgba(82,159,237,0.18)",
          borderBottom: "1px solid rgba(82,159,237,0.18)",
          paddingTop: 16,
          paddingBottom: 16,
          maxWidth: 640,
        }}
      >
        {ITEMS.map((it, i) => (
          <div
            key={it.label}
            style={{
              flex: 1,
              minWidth: 90,
              paddingLeft: i === 0 ? 0 : 18,
              paddingRight: 18,
              borderLeft: i === 0 ? "none" : "1px solid rgba(82,159,237,0.14)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display, inherit)",
                fontSize: "1.625rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--color-iced)",
                lineHeight: 1,
              }}
            >
              {it.value}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-blue-300)",
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
