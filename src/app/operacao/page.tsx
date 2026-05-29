import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { CoverageMap } from "@/components/CoverageMap";
import { PedidoScene } from "@/components/PedidoScene";
import { SupplierGrid } from "@/components/SupplierGrid";

export const metadata: Metadata = {
  title: "Operação",
  description:
    "Como o pedido vira entrega na Repon: cadastro PJ, picking 3PL, expedição. 2 centros logísticos, cobertura Sudeste + Sul.",
  alternates: { canonical: "/operacao" },
};

export default function OperacaoPage() {
  return (
    <>
      {/* HERO — usa PedidoScene como manchete cinematográfica */}
      <PedidoScene />

      {/* COVERAGE MAP */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionMarker number="02" label="Cobertura" />
                <h2 className="h-section mt-2 mb-8">
                  Sudeste e Sul,<br/>de dois centros.
                </h2>
                <p className="body-lead max-w-md" style={{ color: "var(--color-ink-700)" }}>
                  Distribuição operada de Navegantes/SC (matriz, parceria Simplilog) e São Paulo/SP (filial, parceria Centralize Hub). Mesma política comercial, faturamento pelo CNPJ do CD mais próximo.
                </p>
                <ul className="operacao-locations mt-10 flex flex-col gap-4">
                  {site.locations.map((l) => (
                    <li key={l.slug} className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase" style={{ color: "var(--color-blue)" }}>
                        {l.state}
                      </span>
                      <div>
                        <div className="font-display text-[1.0625rem]" style={{ color: "var(--color-petrol)" }}>{l.city}/{l.state}</div>
                        <div className="text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>3PL · {l.partner}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <CoverageMap />
            </div>
          </div>
        </div>
      </section>

      {/* INDÚSTRIAS PARCEIRAS */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-36">
          <Reveal>
            <SectionMarker number="03" label="Indústrias parceiras" />
            <h2 className="h-section mt-2 mb-12 max-w-3xl">
              Quem fabrica o que distribuímos.
            </h2>
            <p className="body-lead max-w-2xl mb-14" style={{ color: "var(--color-ink-700)" }}>
              Relação direta com indústria, sem intermediário. Lista parcial das marcas em operação ativa neste momento. Para ver o portfólio completo de cada indústria, fale com o comercial.
            </p>
          </Reveal>
          <SupplierGrid />
          <div className="mt-14">
            <Link href="/fornecedores" className="link-underline text-[0.9375rem] font-medium"
                  style={{ color: "var(--color-blue)" }}>
              Ver dossiê detalhado dos fornecedores →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-petrol">
        <div className="container-rp py-24 md:py-32 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="eyebrow" style={{ color: "var(--color-blue-300)" }}>Pronto pra abrir cadastro?</div>
            <h2 className="h-section mt-6 mb-10" style={{ color: "var(--color-iced)" }}>
              Mande seu CNPJ.<br/>Tabela em 1 dia útil.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp comercial
              </a>
              <Link href="/contato" className="link-underline text-[0.9375rem] font-medium inline-flex items-center justify-center gap-2"
                    style={{ color: "var(--color-blue-300)" }}>
                Formulário institucional →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
