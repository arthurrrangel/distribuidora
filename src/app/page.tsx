import Link from "next/link";
import { site } from "@/lib/site";
import { CoverageMap } from "@/components/CoverageMap";
import { WaveBackground } from "@/components/WaveBackground";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { HeroTicker } from "@/components/HeroTicker";
import { SectionMarker } from "@/components/SectionMarker";
import { MagneticButton } from "@/components/MagneticButton";
import { SequencedLine } from "@/components/SequencedLine";
import { ScrollCue } from "@/components/ScrollCue";
import { SectionDivider } from "@/components/SectionDivider";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO PETROL ===== */}
      <section className="section-petrol relative overflow-hidden">
        <div className="hidden md:block">
          <WaveBackground variant="petrol" opacity={0.32} />
        </div>
        <div className="md:hidden">
          <WaveBackground variant="petrol" opacity={0.22} />
        </div>
        <div className="container-rp pt-24 md:pt-56 pb-28 md:pb-56 relative z-10">
          <div className="max-w-5xl mx-auto md:mx-0 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <SectionMarker number="00" label="Distribuidora atacadista B2B" variant="light" />
            </div>

            <h1 className="h-display mt-10" style={{ color: "var(--color-iced)" }}>
              <SequencedLine delay={80}>Atacado direto</SequencedLine>
              <SequencedLine delay={220} accent>para revendedores</SequencedLine>
              <SequencedLine delay={360}>no Sudeste e Sul.</SequencedLine>
            </h1>

            <Reveal delay={520}>
              <p className="body-lead mt-12 max-w-xl mx-auto md:mx-0" style={{ color: "rgba(243,241,237,0.78)" }}>
                Distribuidora atacadista B2B. Centros logísticos em SC e SP.
                Pedido mínimo R$ 800. Despacho em 48h.
              </p>
            </Reveal>

            <Reveal delay={620}>
              <div className="mt-14 flex flex-col sm:flex-row gap-3 sm:items-center justify-center md:justify-start">
                <MagneticButton strength={8}>
                  <a
                    href={site.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Mandar CNPJ pelo WhatsApp
                    <ArrowRight />
                  </a>
                </MagneticButton>
                <Link
                  href="/verticais"
                  className="link-underline text-[0.9375rem] font-medium inline-flex items-center gap-2 justify-center sm:justify-start"
                  style={{ color: "var(--color-blue-300)", padding: "1rem 0.5rem" }}
                >
                  Ver catálogo por categoria <ArrowRight />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={700}>
              <p
                className="mt-5 text-[0.75rem] font-mono tracking-[0.16em] uppercase"
                style={{ color: "rgba(243,241,237,0.5)" }}
              >
                Resposta em 24h · Sem fidelidade · Tabela em PDF
              </p>
            </Reveal>

            <HeroTicker />
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* ===== O QUE A REPON FAZ (SEO body) — asymmetric grid ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-32 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionMarker number="01" label="A Repon" />
              <div
                className="font-display mt-6 hidden lg:block"
                style={{
                  fontWeight: 200,
                  fontSize: "clamp(5rem, 14vw, 11rem)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.06em",
                  color: "var(--color-blue-100)",
                }}
              >
                01
              </div>
            </Reveal>
            <Reveal delay={140} className="lg:col-span-8">
              <h2 className="h-section">
                Distribuidora atacadista B2B<br />
                — direto da indústria<br />
                pro revendedor.
              </h2>
              <p className="body-lead mt-10 max-w-2xl">
                A Repon é uma distribuidora atacadista B2B com operação logística em Santa
                Catarina e São Paulo. Compramos volume direto da indústria, estocamos em
                centro logístico próprio e entregamos para revendedores no Sudeste e Sul
                em até 48h úteis após o pedido.
              </p>
              <p className="body-prose mt-6 max-w-2xl">
                Mix consolidado num único fornecedor: você compra categorias diferentes sem
                precisar gerenciar vários distribuidores. Pedido mínimo de R$ 800. Frete
                subsidiado acima de R$ 1.500. Prazo de boleto em 21 dias a partir do
                segundo pedido.
              </p>
              <p className="body-prose mt-6 max-w-2xl">
                Atendemos revendedor pequeno e médio — loja física ou seller de
                marketplace (Mercado Livre, Shopee, Amazon). A política comercial é a
                mesma; o que muda é o mix recomendado por canal. Operação preparada pra
                incorporar novas verticais e novos canais conforme a demanda do mercado.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <SectionDivider />

      {/* ===== COMO FUNCIONA ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-32 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <SectionMarker number="02" label="Como funciona" />
              <h2 className="h-section mt-2">Três passos.<br/>Sem fricção.</h2>
            </Reveal>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {site.howItWorks.map((s, i) => (
                  <Reveal key={s.step} delay={i * 100} as="li">
                    <div className="py-10 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                      <div className="col-span-2 font-mono text-[0.875rem]" style={{ color: "var(--color-blue)" }}>
                        {s.step}
                      </div>
                      <div className="col-span-10">
                        <h3 className="font-display text-[1.5rem] md:text-[1.875rem]" style={{ fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-petrol)" }}>
                          {s.title}
                        </h3>
                        <p className="mt-3 text-[0.9375rem] max-w-xl" style={{ color: "var(--color-ink-700)", lineHeight: 1.55 }}>
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
              {/* CTA intermediário */}
              <Reveal delay={400}>
                <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={site.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[0.9375rem] font-semibold inline-flex items-center gap-2"
                    style={{ color: "var(--color-blue)" }}
                  >
                    Mandar CNPJ agora <ArrowRight />
                  </a>
                  <span className="text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                    Validação interna em até 24h úteis
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRA QUEM É ===== */}
      <section className="section-petrol relative overflow-hidden">
        <div className="hidden md:block">
          <WaveBackground variant="petrol" opacity={0.2} />
        </div>
        <div className="container-rp py-32 md:py-48 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <SectionMarker number="03" label="Para quem é" variant="light" />
              <h2 className="h-section mt-2" style={{ color: "var(--color-iced)" }}>
                Três formas<br/>de comprar.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-petrol-80)" }}>
                {site.audience.map((a, i) => (
                  <Reveal key={a.profile} delay={i * 100} as="li">
                    <div className="py-10 audience-row relative" style={{ borderColor: "var(--color-petrol-80)" }} data-num={a.icon}>
                      <h3 className="font-display text-[1.5rem] md:text-[1.875rem]" style={{ fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-iced)" }}>
                        {a.profile}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] max-w-2xl" style={{ color: "rgba(243,241,237,0.78)", lineHeight: 1.55 }}>
                        {a.pitch}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NÚMEROS ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-32 md:py-44">
          <Reveal>
            <SectionMarker number="04" label="Operação real" />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-14 mt-10">
            {site.numbers.map((n, i) => {
              const isHero = i === 0;
              return (
                <Reveal
                  key={n.label}
                  delay={i * 100}
                  className={isHero ? "md:col-span-5" : "md:col-span-2 md:col-start-auto"}
                >
                  <div className="flex flex-col h-full justify-end">
                    <div className={isHero ? "stat-hero" : "stat-num"}>
                      <Counter value={n.value} />
                    </div>
                    <div
                      className={`mt-5 font-medium ${isHero ? "text-[1.0625rem]" : "text-[0.9375rem]"}`}
                      style={{ color: "var(--color-petrol)" }}
                    >
                      {n.label}
                    </div>
                    <div
                      className="mt-1.5 text-[0.8125rem]"
                      style={{ color: "var(--color-ink-500)", lineHeight: 1.5 }}
                    >
                      {n.sub}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MAPA ===== */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-32 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <Reveal className="lg:col-span-5">
              <SectionMarker number="05" label="Cobertura" />
              <h2 className="h-section mt-2">
                Dois centros,<br />
                cobertura Sudeste<br />
                e Sul.
              </h2>
              <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
                {site.locations.map((l) => (
                  <div key={l.slug}>
                    <div className="eyebrow mb-2">{l.role}</div>
                    <p className="text-[1rem] leading-tight" style={{ color: "var(--color-petrol)", fontWeight: 500 }}>
                      {l.city} / {l.state}
                    </p>
                    <p className="mt-1.5 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                      3PL · {l.partner}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200} className="lg:col-span-7">
              <CoverageMap variant="light" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== VERTICAIS ===== */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-32 md:py-48">
          <Reveal>
            <SectionMarker number="06" label="Catálogo" />
            <div className="max-w-3xl mb-16">
              <h2 className="h-section mt-2">
                Quatro categorias.<br/>
                Um único comprador.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--color-line)" }}>
            {site.verticals.map((v, i) => (
              <Reveal key={v.slug} delay={i * 80}>
                <Link
                  href={`/verticais#${v.slug}`}
                  className="vertical-card block p-10 md:p-14"
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-[0.875rem] eyebrow" style={{ color: "var(--color-blue)" }}>
                      Vertical {v.number}
                    </span>
                    <span className="vertical-arrow" style={{ color: "var(--color-petrol-60)" }}>
                      <ArrowRight />
                    </span>
                  </div>
                  <h3 className="font-display text-[1.75rem] md:text-[2.25rem] mb-5" style={{ fontWeight: 400, letterSpacing: "-0.03em", color: "var(--color-petrol)" }}>
                    {v.title}
                  </h3>
                  <p className="text-[0.9375rem] max-w-md" style={{ color: "var(--color-ink-700)", lineHeight: 1.55 }}>
                    {v.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* CTA intermediário */}
          <Reveal delay={400}>
            <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[0.9375rem] font-semibold inline-flex items-center gap-2"
                style={{ color: "var(--color-blue)" }}
              >
                Receber tabela de preços <ArrowRight />
              </a>
              <span className="text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                Por canal e por vertical · Em PDF
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-32 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <SectionMarker number="07" label="FAQ" />
              <h2 className="h-section mt-2">
                Antes de mandar<br/>o CNPJ.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {site.faq.map((item, i) => (
                  <Reveal key={i} delay={i * 60} as="li">
                    <div className="py-7 grid grid-cols-12 gap-6" style={{ borderColor: "var(--color-line)" }}>
                      <div className="col-span-12 md:col-span-5">
                        <h3 className="font-display text-[1.0625rem] md:text-[1.125rem]" style={{ fontWeight: 500, color: "var(--color-petrol)", lineHeight: 1.3 }}>
                          {item.q}
                        </h3>
                      </div>
                      <div className="col-span-12 md:col-span-7">
                        <p className="text-[0.9375rem]" style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}>
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="section-blue relative overflow-hidden">
        <div className="hidden md:block">
          <WaveBackground variant="blue" opacity={0.3} />
        </div>
        <div className="container-rp py-32 md:py-48 relative z-10">
          <Reveal>
            <SectionMarker number="08" label="Próximo passo" variant="light" />
            <div className="max-w-3xl">
              <h2 className="h-section mt-2 mb-12" style={{ color: "var(--color-iced)" }}>
                Mande seu CNPJ pelo WhatsApp.<br />
                Devolvemos tabela em 24h.
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={6}>
                  <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[0.9375rem] font-semibold transition-colors"
                    style={{ background: "var(--color-iced)", color: "var(--color-petrol)" }}>
                    Mandar CNPJ pelo WhatsApp <ArrowRight />
                  </a>
                </MagneticButton>
                <Link href="/fornecedores"
                  className="inline-flex items-center justify-center gap-2 border px-7 py-4 text-[0.9375rem] font-medium transition-colors hover:bg-white/10"
                  style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}>
                  Sou indústria — vender pra Repon
                </Link>
              </div>
              <p className="mt-6 text-[0.8125rem] font-mono tracking-[0.16em] uppercase" style={{ color: "rgba(243,241,237,0.55)" }}>
                Resposta em 24h · Sem fidelidade · Tabela em PDF
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M1 7 H13 M8 2 L13 7 L8 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
