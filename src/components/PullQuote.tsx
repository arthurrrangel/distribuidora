import { Reveal } from "@/components/Reveal";

/**
 * Quote editorial gigante. Tese institucional resumida em uma frase.
 * Sem caixa, sem aspas, sem decoração. Só tipografia.
 */
export function PullQuote({
  children,
  attribution,
  variant = "light",
}: {
  children: React.ReactNode;
  attribution?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section
      className="pull-quote"
      style={{
        background: isDark ? "var(--color-petrol)" : "var(--color-iced)",
        borderTop: `1px solid ${isDark ? "var(--color-petrol-80)" : "var(--color-line)"}`,
        borderBottom: `1px solid ${isDark ? "var(--color-petrol-80)" : "var(--color-line)"}`,
      }}
    >
      <div className="container-rp py-28 md:py-40">
        <Reveal>
          <blockquote
            className="pull-quote__text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 6.5vw, 5.25rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              fontWeight: 400,
              color: isDark ? "var(--color-iced)" : "var(--color-petrol)",
              maxWidth: "22ch",
              margin: 0,
            }}
          >
            {children}
          </blockquote>
        </Reveal>
        {attribution && (
          <Reveal delay={180}>
            <p
              className="mt-10 md:mt-12 font-mono"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: isDark ? "rgba(243,241,237,0.5)" : "var(--color-ink-500)",
              }}
            >
              — {attribution}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
