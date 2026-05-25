/**
 * Divisor entre seções claras — substitui borderTop simples.
 * Dot decorativo central + hairline em cada lado.
 * Server component (sem JS).
 */
export function SectionDivider({
  label,
}: {
  label?: string;
}) {
  return (
    <div
      aria-hidden
      className="container-rp"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <span
        style={{
          flex: 1,
          height: 1,
          background: "var(--color-line)",
        }}
      />
      {label ? (
        <span
          className="font-mono"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--color-petrol-60)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      ) : (
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: 4,
            background: "var(--color-blue)",
            display: "inline-block",
          }}
        />
      )}
      <span
        style={{
          flex: 1,
          height: 1,
          background: "var(--color-line)",
        }}
      />
    </div>
  );
}
