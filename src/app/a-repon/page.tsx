import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { FactsGrid } from "@/components/FactsGrid";
import { KineticHeadline } from "@/components/KineticHeadline";
import { GradientMesh } from "@/components/GradientMesh";
import { GrainOverlay } from "@/components/GrainOverlay";

export const metadata: Metadata = {
  title: "A Repon",
  description:
    "Distribuidora atacadista B2B com matriz em SC e filial em SP. Quatro verticais, modelo 3PL, atendimento humano.",
  alternates: { canonical: "/a-repon" },
};

const FACTS = [
  { label: "Fundação",   value: "Abril de 2024",        sub: "Matriz aberta em Navegantes/SC" },
  { label: "Expansão",   value: "Fevereiro de 2025",    sub: "Abertura da filial em São Paulo/SP" },
  { label: "Operação",   value: "2 centros logísticos", sub: "Modelo 3PL com parceiros especializados" },
  { label: "Cobertura",  value: "Sudeste + Sul",         sub: "SP, RJ, MG, ES, PR, SC, RS" },
  { label: "Mix",        value: "4 verticais ativas",    sub: "Papelaria, higiene, informática, eletro" },
  { label: "Catálogo",   value: "14 CNAEs registradas",  sub: "Atacado e varejo especializado" },
  { label: "Canal",      value: "B2B direto",            sub: "Cadastro PJ exclusivo, sem marketplace" },
  { label: "Atendimento", value: "WhatsApp comercial",   sub: "Segunda a sexta, das 8h às 18h" },
];

const PRINCIPLES = [
  { title: "Mix vertical, não pulverizado.",
    body: "Quatro verticais conectadas pelo mesmo perfil de comprador. Especialização gera condição comercial real com a indústria." },
  { title: "Condição comercial coerente com volume.",
    body: "Tabelas por faixa de pedido, prazo no boleto a partir do segundo pedido, frete subsidiado em pedidos consolidados." },
  { title: "Política que protege o fornecedor.",
    body: "MAP respeitado em todos os canais. Sem leilão de centavo em marketplace genérico. Relação direta com revenda." },
  { title: "Atendimento humano com SLA real.",
    body: "Comercial em horário útil, retorno em até 24h em qualquer canal. Sem chatbot, sem URA, sem ruído." },
];

export default function ARepon() {
  return (
    <>
      {/* HERO */}
      <section className="section-petrol relative overflow-hidden">
        <GradientMesh opacity={0.5} />
        <GrainOverlay opacity={0.05} blendMode="overlay" />
        <div className="container-rp pt-20 md:pt-44 pb-16 md:pb-32 relative z-10">
          <div className="max-w-4xl">
            <SectionMarker number="01" label="A Repon" variant="light" />
            <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
              Distribuidora atacadista<br/>
              <span style={{ color: "var(--color-blue-300)" }}>conectando indústria</span><br/>
              ao revendedor real.
            </h1>
            <Reveal delay={180}>
              <p className="body-lead mt-10 max-w-2xl" style={{ color: "rgba(243,241,237,0.82)" }}>
                A Repon Plataforma de Comércio nasceu em abril de 2024 com uma tese específica:
                atender o revendedor pequeno e médio que está esquecido entre o marketplace genérico
                e a distribuidora grande que exige volume mínimo alto.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-20 md:py-32">
          <Reveal>
            <SectionMarker number="02" label="Em fatos" />
            <h2 className="h-section mt-2 mb-12 md:mb-16 max-w-3xl">
              A operação,<br/>sem floreio.
            </h2>
          </Reveal>
          <FactsGrid facts={FACTS} />
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section-petrol relative overflow-hidden">
        <GrainOverlay opacity={0.04} blendMode="overlay" />
        <div className="container-rp py-24 md:py-36 relative z-10">
          <Reveal>
            <SectionMarker number="03" label="Princípios" variant="light" />
            <KineticHeadline
              className="h-section mt-2 mb-16 max-w-3xl"
              lines={["Quatro princípios", "que orientam a Repon."]}
              accentLine={1}
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
               style={{ background: "rgba(243,241,237,0.2)" }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="p-8 md:p-10 h-full" style={{ background: "var(--color-petrol)" }}>
                  <div className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase mb-5"
                       style={{ color: "var(--color-blue-300)" }}>0{i + 1}</div>
                  <h3 className="font-display text-[1.5rem] md:text-[1.625rem]"
                      style={{ color: "var(--color-iced)", letterSpacing: "-0.018em", lineHeight: 1.15, fontWeight: 500 }}>
                    {p.title}
                  </h3>
                  <p className="mt-5 text-[0.9375rem]"
                     style={{ color: "rgba(243,241,237,0.78)", lineHeight: 1.55 }}>
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-32 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="eyebrow">Próximo passo</div>
            <h2 className="h-section mt-6 mb-10">
              Cadastro PJ em 1 dia útil.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Abrir cadastro de revenda
              </a>
              <Link href="/como-comprar" className="link-underline text-[0.9375rem] font-medium inline-flex items-center justify-center gap-2">
                Ver como comprar →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
