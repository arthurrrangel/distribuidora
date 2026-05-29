"use client";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

type Fact = { label: string; value: string; sub: string };

/**
 * "Em fatos" reformatado:
 *  - mobile: scroll-snap horizontal swipeable cards
 *  - desktop: grid 4×2 com hierarquia visual real (num + value grande + sub)
 *  - números numéricos no início do value rolam com CountUp
 */
function renderValue(value: string) {
  // Detecta padrão: começa com número (inteiro, com vírgula) — opcionalmente seguido de texto
  const m = value.match(/^(\d+(?:[.,]\d+)?)([^\d].*)?$/);
  if (!m) return value;
  const num = parseFloat(m[1].replace(",", "."));
  const rest = m[2] ?? "";
  if (Number.isNaN(num)) return value;
  const decimals = m[1].includes(".") || m[1].includes(",") ? 1 : 0;
  return (
    <>
      <CountUp to={num} decimals={decimals} />
      {rest}
    </>
  );
}

export function FactsGrid({ facts }: { facts: Fact[] }) {
  return (
    <div className="facts-grid" role="list">
      {facts.map((f, i) => (
        <Reveal key={f.label} delay={i * 50}>
          <article className="facts-grid__card" role="listitem">
            <div className="facts-grid__index" aria-hidden>{String(i + 1).padStart(2, "0")}</div>
            <div className="facts-grid__label">{f.label}</div>
            <div className="facts-grid__value">{renderValue(f.value)}</div>
            <div className="facts-grid__sub">{f.sub}</div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
