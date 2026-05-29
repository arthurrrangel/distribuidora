import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { SequencedLine } from "@/components/SequencedLine";
import { MagneticButton } from "@/components/MagneticButton";
import { ScrollCue } from "@/components/ScrollCue";
import { GradientMesh } from "@/components/GradientMesh";
import { ConstellationNetwork } from "@/components/ConstellationNetwork";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SectionNav } from "@/components/SectionNav";
import { SupplyChainAnimation } from "@/components/SupplyChainAnimation";
import { Scramble } from "@/components/Scramble";
import { FactsGrid } from "@/components/FactsGrid";
import { PullQuote } from "@/components/PullQuote";

const ANCHOR_FACTS = [
  { label: "Fundação",  value: "Abril de 2024",         sub: "Matriz em Navegantes/SC" },
  { label: "Operação",  value: "2 centros logísticos",  sub: "Modelo 3PL especializado" },
  { label: "Cobertura", value: "Sudeste + Sul",          sub: "SP, RJ, MG, ES, PR, SC, RS" },
  { label: "Mix",       value: "4 verticais ativas",     sub: "Papelaria, higiene, info, eletro" },
];

const NAV_ITEMS = [
  { id: "hero",       number: "00", label: "Início" },
  { id: "fatos",      number: "01", label: "Em fatos" },
  { id: "tese",       number: "02", label: "A tese" },
  { id: "explorar",   number: "03", label: "Explore" },
  { id: "cta",        number: "04", label: "Próximo passo" },
];

const PILLARS = [
  {
    href: "/a-repon",
    eyebrow: "Institucional",
    title: "A Repon",
    body: "Fundação, princípios, dados públicos e a tese que orienta a operação.",
    cta: "Conhecer a Repon",
  },
  {
    href: "/verticais",
    eyebrow: "Categorias",
    title: "Verticais",
    body: "Papelaria, higiene, informática e eletro. Mix curado para o revendedor B2B.",
    cta: "Ver as 4 verticais",
  },
  {
    href: "/operacao",
    eyebrow: "Logística",
    title: "Operação",
    body: "Como o pedido vira entrega. Centros 3PL em SC e SP, indústrias parceiras, política comercial.",
    cta: "Ver a operação",
  },
];

export default function HomePage() {
  return (
    <>
      <SectionNav items={NAV_ITEMS} />

      {/* HERO */}
      <section id="hero" className="section-petrol relative overflow-hidden">
        <GradientMesh opacity={0.62} />
        <div className="hidden md:block"><ConstellationNetwork /></div>
        <GrainOverlay opacity={0.05} blendMode="overlay" />
        <div className="container-rp pt-20 md:pt-56 pb-16 md:pb-44 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 max-w-5xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="hero-kicker font-mono text-[0.6875rem] tracking-[0.22em] uppercase mt-2 mb-2"
                   style={{ color: "rgba(243,241,237,0.55)" }}>
                <Scramble text="abr/2024 → hoje · 14 cnaes · 2 cds · 4 verticais · sudeste + sul" duration={1100} />
              </div>
              <h1 className="h-display mt-3" style={{ color: "var(--color-iced)" }}>
                <SequencedLine delay={40}>Distribuidora atacadista</SequencedLine>
                <SequencedLine delay={140} accent>conectando indústria</SequencedLine>
                <SequencedLine delay={240}>ao revendedor real.</SequencedLine>
              </h1>
              <Reveal delay={260}>
                <p className="body-lead mt-12 max-w-2xl mx-auto lg:mx-0" style={{ color: "rgba(243,241,237,0.82)" }}>
                  A Repon Plataforma de Comércio atende o revendedor pequeno e médio que está esquecido entre o marketplace genérico e a distribuidora grande que exige volume mínimo alto.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-14 flex flex-col sm:flex-row gap-3 sm:items-center justify-center lg:justify-start">
                  <MagneticButton strength={8}>
                    <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Abrir cadastro de revenda
                    </a>
                  </MagneticButton>
                  <Link href="/como-comprar" className="link-underline text-[0.9375rem] font-medium inline-flex items-center gap-2 justify-center sm:justify-start"
                        style={{ color: "var(--color-blue-300)", padding: "1rem 0.5rem" }}>
                    Ver como comprar →
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={380}>
                <p className="mt-5 text-[0.75rem] font-mono tracking-[0.16em] uppercase"
                   style={{ color: "rgba(243,241,237,0.5)" }}>
                  Resposta em 24h · Sem fidelidade · Tabela em PDF
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5 hidden lg:block"><SupplyChainAnimation /></div>
            <div className="supply-chain-mobile-wrap lg:hidden" aria-hidden style={{display:"none",opacity:0.78}}>
              <SupplyChainAnimation />
            </div>
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* EM FATOS — 4 ancora */}
      <section id="fatos" className="section-iced" style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase"
                     style={{ color: "var(--color-blue)" }}>01 · Em fatos</div>
                <h2 className="h-section mt-2">A operação,<br/>sem floreio.</h2>
              </Reveal>
              <p className="mt-8 max-w-md" style={{ color: "var(--color-ink-700)" }}>
                Quatro fatos âncora. O detalhamento institucional completo está em <Link href="/a-repon" className="link-underline" style={{ color: "var(--color-blue)" }}>A Repon</Link>.
              </p>
            </div>
            <div className="lg:col-span-7">
              <FactsGrid facts={ANCHOR_FACTS} />
            </div>
          </div>
        </div>
      </section>

      {/* TESE — PullQuote editorial */}
      <section id="tese"><PullQuote attribution="A tese da Repon">Distribuição é fluxo. Quando trava, o varejo morre antes da indústria.</PullQuote></section>

      {/* EXPLORE — 3 cards-pilar */}
      <section id="explorar" className="section-iced" style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-36">
          <Reveal>
            <div className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase mb-6"
                 style={{ color: "var(--color-blue)" }}>03 · Explore</div>
            <h2 className="h-section mb-14 max-w-3xl">
              Três entradas pra<br/>conhecer a Repon.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.href} delay={i * 80}>
                <Link href={p.href} className="pillar-card block h-full p-8 md:p-10 group"
                      style={{ background: "var(--color-iced)", textDecoration: "none", color: "var(--color-petrol)" }}>
                  <div className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase mb-6"
                       style={{ color: "var(--color-blue)" }}>{String(i + 1).padStart(2, "0")} · {p.eyebrow}</div>
                  <h3 className="font-display" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.024em", lineHeight: 1.05, fontWeight: 500 }}>
                    {p.title}
                  </h3>
                  <p className="mt-5 text-[0.9375rem]" style={{ color: "var(--color-ink-700)", lineHeight: 1.55 }}>
                    {p.body}
                  </p>
                  <div className="mt-8 font-mono text-[0.6875rem] tracking-[0.22em] uppercase inline-flex items-center gap-2 transition-transform group-hover:gap-3"
                       style={{ color: "var(--color-blue)" }}>
                    {p.cta} <span aria-hidden>→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" className="section-petrol relative overflow-hidden">
        <GrainOverlay opacity={0.05} blendMode="overlay" />
        <div className="container-rp py-24 md:py-36 relative z-10">
          <Reveal>
            <div className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase mb-6"
                 style={{ color: "var(--color-blue-300)" }}>04 · Próximo passo</div>
            <h2 className="h-section mb-10" style={{ color: "var(--color-iced)" }}>
              Mande seu CNPJ.<br/>Tabela em 1 dia útil.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <MagneticButton strength={8}>
                <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Mandar CNPJ pelo WhatsApp
                </a>
              </MagneticButton>
              <Link href="/contato" className="link-underline text-[0.9375rem] font-medium inline-flex items-center gap-2"
                    style={{ color: "var(--color-blue-300)", padding: "1rem 0.5rem" }}>
                Formulário institucional →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
