"use client";
import { useEffect, useState } from "react";

type Item = { id: string; number: string; label: string };

/**
 * Navegação lateral sticky desktop — dots numerados acompanham o scroll.
 * Detecta seção ativa via IntersectionObserver. Oculta em mobile.
 */
export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Navegação por seções"
      className="section-nav hidden lg:flex"
      style={{
        position: "fixed",
        left: 24,
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "column",
        gap: 14,
        zIndex: 60,
        pointerEvents: "auto",
      }}
    >
      {items.map((it) => {
        const isActive = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            aria-current={isActive ? "true" : undefined}
            className="section-nav__item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: isActive ? "var(--color-petrol)" : "var(--color-ink-500)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.18em",
              fontWeight: 500,
              transition: "color 280ms ease",
            }}
          >
            <span
              aria-hidden
              style={{
                width: isActive ? 28 : 14,
                height: 1,
                background: isActive ? "var(--color-blue)" : "var(--color-ink-400)",
                transition: "width 360ms cubic-bezier(0.22,1,0.36,1), background-color 280ms ease",
              }}
            />
            <span style={{ opacity: isActive ? 1 : 0.6, transition: "opacity 280ms ease" }}>{it.number}</span>
            <span
              className="section-nav__label"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(-4px)",
                transition: "opacity 320ms ease, transform 320ms ease",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              {it.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
