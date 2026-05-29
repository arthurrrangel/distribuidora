import { Reveal } from "@/components/Reveal";

type Fact = { label: string; value: string; sub: string };

/**
 * "Em fatos" reformatado:
 *  - mobile: scroll-snap horizontal swipeable cards
 *  - desktop: grid 4×2 com hierarquia visual real (num + value grande + sub)
 */
export function FactsGrid({ facts }: { facts: Fact[] }) {
  return (
    <div className="facts-grid" role="list">
      {facts.map((f, i) => (
        <Reveal key={f.label} delay={i * 50}>
          <article className="facts-grid__card" role="listitem">
            <div className="facts-grid__index" aria-hidden>{String(i + 1).padStart(2, "0")}</div>
            <div className="facts-grid__label">{f.label}</div>
            <div className="facts-grid__value">{f.value}</div>
            <div className="facts-grid__sub">{f.sub}</div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
