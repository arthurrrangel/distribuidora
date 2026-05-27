import { site } from "@/lib/site";

/**
 * Grid de indústrias parceiras — wordmark tipográfico cuidado.
 * Cada card: número mono + nome display + vertical eyebrow + descriptor.
 */
export function SupplierGrid({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-1 md:grid-cols-2 gap-px ${className}`}
      style={{ background: "var(--color-line)" }}
    >
      {site.suppliers.map((s, i) => (
        <li
          key={s.slug}
          className="supplier-card relative flex flex-col p-8 md:p-10"
          style={{ background: "var(--color-iced-soft)" }}
        >
          <div className="flex items-baseline justify-between mb-6">
            <span
              className="font-mono"
              style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: "var(--color-blue)", fontWeight: 500 }}
            >
              0{i + 1}
            </span>
            <span className="eyebrow" style={{ color: "var(--color-petrol-60)" }}>
              {s.vertical}
            </span>
          </div>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
              fontWeight: 400,
              letterSpacing: "-0.035em",
              color: "var(--color-petrol)",
              lineHeight: 1.05,
              marginBottom: 14,
            }}
          >
            {s.name}
          </h3>
          <p
            className="text-[0.9375rem]"
            style={{ color: "var(--color-ink-700)", lineHeight: 1.55, maxWidth: 460 }}
          >
            {s.descriptor}
          </p>
        </li>
      ))}
    </ul>
  );
}
