import Link from "next/link";
import { site } from "@/lib/site";
import { CoverageMap } from "@/components/CoverageMap";
import { WaveBackground } from "@/components/WaveBackground";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO PETROL com WAVE ===== */}
      <section className="section-petrol relative overflow-hidden">
        <WaveBackground variant="petrol" opacity={0.45} />
        <div className="container-rp pt-24 md:pt-44 pb-28 md:pb-44 relative z-10">
          <div className="max-w-4xl">
            <Reveal>
              <div className="eyebrow">Atacado B2B · Sudeste e Sul</div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
                Atacado direto para o<br />
                <span style={{ color: "var(--color-blue-300)" }}>revendedor que não cabe</span><br />
                no marketplace.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-lead mt-10 max-w-xl" style={{ color: "rgba(243,241,237,0.78)" }}>
                Papelaria, higiene, informática e eletro para papelarias, lojas escolares e
                bazares. Pedido mínimo R$ 800. Despacho em 48h.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-12">
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Cadastrar pelo WhatsApp
                  <ArrowRight />
                </a>
              </div>
            </Reveal>
            <Reveal delay={500}>
              <p className="mt-16 text-[0.75rem] font-mono tracking-[0.18em] uppercase" style={{ color: "var(--color-blue-300)" }}>
                — {site.brand.slogan}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== O QUE A REPON FAZ ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-28 md:py-44">
          <Reveal>
            <div className="max-w-4xl">
              <div className="eyebrow">O que a Repon faz</div>
              <h2 className="h-section mt-6">
                Compra com a indústria,<br />
                estoca em SC e SP, vende<br />
                direto pro revendedor.
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-28 md:py-44">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <div className="eyebrow">Como funciona</div>
              <h2 className="h-section mt-6">Três passos.<br/>Sem fricção.</h2>
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
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRA QUEM É ===== */}
      <section className="section-petrol relative overflow-hidden">
        <WaveBackground variant="petrol" opacity={0.3} />
        <div className="container-rp py-28 md:py-44 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <div className="eyebrow">Para quem é</div>
              <h2 className="h-section mt-6" style={{ color: "var(--color-iced)" }}>
                Três perfis<br/>de revendedor.
              </h2>
            </Reveal>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-petrol-80)" }}>
                {site.audience.map((a, i) => (
                  <Reveal key={a.profile} delay={i * 100} as="li">
                    <div className="py-10" style={{ borderColor: "var(--color-petrol-80)" }}>
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

      {/* ===== NÚMEROS com counters ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
            {site.numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 80}>
                <div className="flex flex-col">
                  <div className="stat-num">
                    <Counter value={n.value} />
                  </div>
                  <div className="mt-4 text-[0.9375rem] font-medium" style={{ color: "var(--color-petrol)" }}>{n.label}</div>
                  <div className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)", lineHeight: 1.5 }}>{n.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAPA ===== */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-28 md:py-44">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <Reveal className="lg:col-span-5">
              <div className="eyebrow">Operação</div>
              <h2 className="h-section mt-6">
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

      {/* ===== VERTICAIS — hover dramático ===== */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-28 md:py-44">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <div className="eyebrow">Verticais</div>
              <h2 className="h-section mt-6">
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
                  style={{ background: "var(--color-iced-soft)" }}
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-[0.875rem] eyebrow" style={{ color: "var(--color-blue)" }}>
                      Vertical {v.number}
                    </span>
                    <span className="vertical-arrow" style={{ color: "var(--color-blue)" }}>
                      <ArrowRight />
                    </span>
                  </div>
                  <h3 className="font-display text-[1.75rem] md:text-[2.25rem] mb-5" style={{ fontWeight: 500, letterSpacing: "-0.025em", color: "var(--color-petrol)" }}>
                    {v.title}
                  </h3>
                  <p className="text-[0.9375rem] max-w-md" style={{ color: "var(--color-ink-700)", lineHeight: 1.55 }}>
                    {v.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-28 md:py-44">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <div className="eyebrow">Perguntas comuns</div>
              <h2 className="h-section mt-6">
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

      {/* ===== CTA com wave ===== */}
      <section className="section-blue relative overflow-hidden">
        <WaveBackground variant="blue" opacity={0.4} />
        <div className="container-rp py-28 md:py-44 relative z-10">
          <Reveal>
            <div className="max-w-3xl">
              <div className="eyebrow" style={{ color: "var(--color-iced)", opacity: 0.8 }}>Próximo passo</div>
              <h2 className="h-section mt-6 mb-10" style={{ color: "var(--color-iced)" }}>
                Mande seu CNPJ pelo WhatsApp.<br />
                Devolvemos tabela em 24h.
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[0.9375rem] font-bold transition-colors"
                  style={{ background: "var(--color-iced)", color: "var(--color-petrol)" }}>
                  WhatsApp comercial <ArrowRight />
                </a>
                <Link href="/fornecedores"
                  className="inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-medium transition-colors"
                  style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}>
                  Sou indústria
                </Link>
              </div>
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
