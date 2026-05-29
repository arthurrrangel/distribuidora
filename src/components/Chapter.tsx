import { Reveal } from "@/components/Reveal";

/**
 * Page-break editorial. Número de capítulo gigante + label.
 * Quebra a cadência entre seções. Tipografia editorial pesada.
 */
export function Chapter({
  number,
  label,
  hint,
  variant = "light",
}: {
  number: string;
  label: string;
  hint?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section
      className="chapter"
      aria-label={`Capítulo ${number} — ${label}`}
      style={{
        background: isDark ? "var(--color-petrol)" : "var(--color-iced-warm)",
        borderTop: `1px solid ${isDark ? "var(--color-petrol-80)" : "var(--color-line)"}`,
        borderBottom: `1px solid ${isDark ? "var(--color-petrol-80)" : "var(--color-line)"}`,
        overflow: "hidden",
      }}
    >
      <div className="container-rp py-20 md:py-32 relative">
        <Reveal>
          <div
            className="chapter__meta font-mono"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: isDark ? "rgba(243,241,237,0.5)" : "var(--color-ink-500)",
              marginBottom: 24,
            }}
          >
            Capítulo {number}
            {hint && (
              <span style={{ marginLeft: 14, opacity: 0.6 }}>· {hint}</span>
            )}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div
            className="chapter__num"
            aria-hidden
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(8rem, 22vw, 22rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              fontWeight: 300,
              color: isDark
                ? "rgba(243,241,237,0.08)"
                : "rgba(11,18,32,0.06)",
              userSelect: "none",
              marginBottom: -12,
            }}
          >
            {number}
          </div>
        </Reveal>
        <Reveal delay={220}>
          <h2
            className="chapter__label"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.028em",
              lineHeight: 0.98,
              color: isDark ? "var(--color-iced)" : "var(--color-petrol)",
              margin: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            {label}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
