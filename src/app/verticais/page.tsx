import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Verticais",
  description: "Quatro verticais de atacado B2B: papelaria, higiene, informática e eletro.",
  alternates: { canonical: "/verticais" },
};

export default function VerticaisPage() {
  return (
    <>
      {/* HERO enxuto */}
      <section className="section-petrol">
        <div className="container-rp pt-20 md:pt-40 pb-20 md:pb-32">
          <div className="max-w-3xl">
            <div className="eyebrow">Verticais</div>
            <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
              Quatro categorias.<br/>
              <span style={{ color: "var(--color-blue-300)" }}>Um único comprador.</span>
            </h1>
            <p className="body-lead mt-10 max-w-xl" style={{ color: "rgba(243,241,237,0.78)" }}>
              Categorias conectadas pelo mesmo revendedor. Em vez de quatro fornecedores,
              o cliente consolida o pedido em um só.
            </p>
          </div>
        </div>
      </section>

      {/* VERTICAIS — uma por vez, enxuta */}
      {site.verticals.map((v, i) => (
        <section
          key={v.slug}
          id={v.slug}
          className="vertical-section group relative overflow-hidden"
          style={{
            background: i % 2 === 0 ? "var(--color-iced)" : "var(--color-iced-warm)",
            borderTop: "1px solid var(--color-line)",
          }}
        >
          <div className="vertical-rail" aria-hidden style={{ background: v.accent }} />
          <svg className="vertical-pictogram" aria-hidden viewBox="0 0 24 24" fill="none" stroke={v.accent} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d={v.pictogram} /></svg>
          <div className="container-rp py-24 md:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-mono text-[0.875rem] transition-colors duration-500" style={{ color: v.accent }}>{v.number}</span>
                  <span className="eyebrow">Vertical</span>
                </div>
                <h2 className="h-section">{v.title}</h2>
                <div className="mt-6 h-px w-12 transition-all duration-500 group-hover:w-24" aria-hidden style={{ background: v.accent }} />
              </div>

              <div className="lg:col-span-8">
                <p className="body-lead max-w-2xl mb-10">
                  {v.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                  {v.topics.map((t, idx) => (
                    <div key={t} className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.75rem] tracking-wider" style={{ color: "var(--color-ink-500)" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1rem]" style={{ color: "var(--color-petrol)" }}>
                        {t}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t" style={{ borderColor: "var(--color-line)" }}>
                  <div className="eyebrow mb-3">Exemplos de itens</div>
                  <p className="text-[0.9375rem] max-w-2xl" style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}>
                    {v.examples}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-petrol">
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow">Quer comprar?</div>
            <h2 className="h-section mt-6 mb-10" style={{ color: "var(--color-iced)" }}>
              Mande seu CNPJ pelo WhatsApp.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp comercial
              </a>
              <Link href="/contato" className="inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-medium transition-colors"
                style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}>
                Formulário institucional
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
