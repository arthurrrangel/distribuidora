"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Bloco preview das 4 verticais. Desktop: grid 4 cols. Mobile: scroll-snap horizontal swipeable.
 * Cada card usa accent + pictograma da própria vertical.
 */
export function VerticalsPreview() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="verticals-preview">
      {site.verticals.map((v) => {
        const active = hover === v.slug;
        return (
          <Link
            key={v.slug}
            href={`/verticais#${v.slug}`}
            className="verticals-preview__card group"
            onMouseEnter={() => setHover(v.slug)}
            onMouseLeave={() => setHover((c) => (c === v.slug ? null : c))}
            style={{ ['--accent' as string]: v.accent }}
          >
            <div className="verticals-preview__rail" aria-hidden style={{ background: v.accent }} />
            <div className="verticals-preview__head">
              <span className="verticals-preview__num" style={{ color: v.accent }}>{v.number}</span>
              <span className="verticals-preview__eyebrow">Vertical</span>
            </div>
            <h3 className="verticals-preview__title">{v.title}</h3>
            <div className="verticals-preview__pictogram-wrap" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke={v.accent} strokeWidth={active ? 1.2 : 0.8}
                strokeLinecap="round" strokeLinejoin="round">
                <path d={v.pictogram} />
              </svg>
            </div>
            <div className="verticals-preview__cta">
              Ver vertical
              <span aria-hidden style={{ color: v.accent }}>→</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
