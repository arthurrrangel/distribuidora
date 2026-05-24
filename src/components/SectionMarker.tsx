/**
 * Marcador numérico de seção — "02 — Como funciona"
 * Hairline curta no meio, mono number + uppercase label.
 * Server component (sem JS).
 */
export function SectionMarker({
  number,
  label,
  variant = "dark",
  className = "",
}: {
  number: string;
  label: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  const isLight = variant === "light";
  const numColor = isLight ? "var(--color-blue-300)" : "var(--color-blue)";
  const lineColor = isLight ? "rgba(111,169,232,0.32)" : "var(--color-line)";
  const labelColor = isLight ? "rgba(243,241,237,0.72)" : "var(--color-petrol-60)";

  return (
    <div className={`section-marker flex items-center gap-4 ${className}`}>
      <span
        className="font-mono"
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.18em",
          color: numColor,
          fontWeight: 500,
        }}
      >
        {number}
      </span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 48,
          height: 1,
          background: lineColor,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: labelColor,
        }}
      >
        {label}
      </span>
    </div>
  );
}
