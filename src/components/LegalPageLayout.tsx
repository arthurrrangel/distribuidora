import type { ReactNode } from "react";
import { SectionMarker } from "@/components/SectionMarker";

/**
 * Layout padrão pra páginas jurídicas/institucionais densas em texto.
 * Hero petrol enxuto + container central com tipografia legível.
 */
export function LegalPageLayout({
  number,
  label,
  title,
  subtitle,
  updatedAt,
  children,
}: {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="section-petrol">
        <div className="container-rp pt-20 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <SectionMarker number={number} label={label} variant="light" />
            <h1
              className="h-display mt-8"
              style={{ color: "var(--color-iced)" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="body-lead mt-8 max-w-2xl"
                style={{ color: "rgba(243,241,237,0.78)" }}
              >
                {subtitle}
              </p>
            )}
            <p
              className="mt-10 text-[0.75rem] font-mono tracking-[0.16em] uppercase"
              style={{ color: "rgba(243,241,237,0.5)" }}
            >
              Última atualização: {updatedAt}
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="legal-prose max-w-3xl">{children}</div>
        </div>
      </section>
    </>
  );
}
