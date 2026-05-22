import Link from "next/link";
import { site } from "@/lib/site";
import { CoverageMap } from "@/components/CoverageMap";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO PETROL — slogan oficial ===== */}
      <section className="section-petrol relative overflow-hidden">
        <div className="container-rp pt-14 md:pt-36 pb-20 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-9">
              <div className="eyebrow reveal">
                Distribuidora atacadista B2B · Desde 2024
              </div>
              <h1 className="h-display mt-6 reveal reveal-delay-1" style={{ color: "var(--color-iced)" }}>
                O fluxo que mantém<br />
                <span style={{ color: "var(--color-blue-300)" }}>seu negócio</span><br />
                ativo.
              </h1>
              <p className="body-lead mt-8 max-w-2xl reveal reveal-delay-2" style={{ color: "rgba(243,241,237,0.78)" }}>
                A Repon opera no modelo B2B de atacado para revendedores, papelarias e
                lojas técnicas no Sudeste e Sul, com dois centros logísticos
                estratégicos e mix vertical orientado por categoria de cliente.
              </p>

              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 reveal reveal-delay-3">
                <Link href="/fornecedores" className="btn-primary">
                  Apresentação para fornecedores
                  <ArrowRight />
                </Link>
                <Link href="/verticais" className="inline-flex items-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-bold transition-colors"
                  style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}>
                  Conhecer as verticais
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3 reveal reveal-delay-4">
              <div className="flex flex-col gap-6 border-l pl-6" style={{ borderColor: "var(--color-petrol-80)" }}>
                <div>
                  <div className="eyebrow mb-2">CNPJ Matriz</div>
                  <p className="font-mono text-sm" style={{ color: "var(--color-iced)" }}>{site.fiscal.matriz.cnpj}</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">Sede operacional</div>
                  <p className="text-sm leading-snug" style={{ color: "var(--color-iced)" }}>
                    Navegantes / SC<br />São Paulo / SP
                  </p>
                </div>
                <div>
                  <div className="eyebrow mb-2">Atendimento B2B</div>
                  <a href={`mailto:${site.contact.emails.comercial}`}
                     className="text-sm transition-colors break-all"
                     style={{ color: "var(--color-iced)" }}>
                    {site.contact.emails.comercial}
                  </a>
                </div>
                <div>
                  <div className="eyebrow mb-2">Instagram</div>
                  <a href={site.contact.social.instagramUrl}
                     target="_blank" rel="noopener noreferrer"
                     className="text-sm font-mono"
                     style={{ color: "var(--color-iced)" }}>
                    {site.contact.social.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NÚMEROS INSTITUCIONAIS — fundo iced ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {site.numbers.map((n) => (
              <div key={n.label} className="flex flex-col">
                <div className="stat-num">{n.value}</div>
                <div className="mt-3 text-[0.9375rem] font-bold" style={{ color: "var(--color-petrol)" }}>{n.label}</div>
                <div className="mt-1 text-[0.8125rem] leading-snug" style={{ color: "var(--color-ink-500)" }}>{n.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PILARES — blue ===== */}
      <section className="section-blue">
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Princípios operacionais</div>
              <h2 className="h-section mt-5" style={{ color: "var(--color-iced)" }}>
                O que faz uma distribuidora ser séria.
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed" style={{ color: "rgba(243,241,237,0.85)" }}>
                Distribuidor de verdade entrega no prazo, atende o telefone, mantém
                preço de revenda saudável e respeita o canal do fornecedor. A Repon é
                construída em torno dessas quatro coisas.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(243,241,237,0.2)" }}>
              {site.pillars.map((p, i) => (
                <article key={p.title} className="p-10 flex flex-col" style={{ background: "var(--color-blue)" }}>
                  <div className="flex items-center justify-between mb-8">
                    <span className="eyebrow" style={{ color: "var(--color-iced)" }}>{p.eyebrow}</span>
                    <span className="font-mono text-[0.6875rem] tracking-wider" style={{ color: "rgba(243,241,237,0.5)" }}>0{i + 1}</span>
                  </div>
                  <h3 className="h-card mb-4" style={{ color: "var(--color-iced)" }}>{p.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed" style={{ color: "rgba(243,241,237,0.85)" }}>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAPA DE COBERTURA ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="eyebrow">Operação logística</div>
              <h2 className="h-section mt-5">Dois centros<br />estratégicos,<br />uma cobertura.</h2>
              <p className="body-prose mt-8 max-w-md">
                A Repon opera com infraestrutura logística integrada em duas regiões
                críticas. O hub Sul, em Navegantes (SC), aproveita o eixo da BR-470 e
                a logística portuária de Itajaí. O hub Sudeste, em São Paulo (SP),
                conecta a operação ao maior centro consumidor do país.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                {site.locations.map((l) => (
                  <div key={l.slug} className="border-l-2 pl-4" style={{ borderColor: "var(--color-blue)" }}>
                    <div className="eyebrow mb-1.5">{l.role}</div>
                    <p className="text-[0.9375rem] font-bold leading-tight" style={{ color: "var(--color-petrol)" }}>
                      {l.city} / {l.state}
                    </p>
                    <p className="mt-1.5 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                      3PL · {l.partner}
                    </p>
                  </div>
                ))}
              </div>

              <Link href="/sobre" className="btn-link mt-10">
                Capacidade operacional completa <ArrowRight />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="card-hairline p-6 md:p-10">
                <CoverageMap variant="light" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VERTICAIS ===== */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="eyebrow">Verticais ativas</div>
              <h2 className="h-section mt-5 max-w-xl">
                Quatro categorias.<br />Um único perfil de comprador.
              </h2>
            </div>
            <p className="body-prose max-w-md">
              A Repon atua em categorias que o mesmo revendedor B2B compra — papeleiro,
              loja técnica, bazar expandido. Profundidade de mix dentro do mesmo cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--color-line)" }}>
            {site.verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/verticais#${v.slug}`}
                className="p-10 md:p-12 flex flex-col gap-6 transition-colors group"
                style={{ background: "var(--color-iced-soft)" }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow" style={{ color: "var(--color-blue)" }}>Vertical {v.number}</span>
                  <ArrowRight className="opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="h-card">{v.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed max-w-md" style={{ color: "var(--color-ink-700)" }}>
                  {v.summary}
                </p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.75rem] font-mono tracking-wider uppercase" style={{ color: "var(--color-ink-500)" }}>
                  {v.cnae.map((c) => (
                    <li key={c} className="border px-2 py-1" style={{ borderColor: "var(--color-line)" }}>CNAE {c}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA INSTITUCIONAL — green secundário + petrol ===== */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--color-line)" }}>
            <div className="p-10 md:p-14 flex flex-col" style={{ background: "var(--color-green)" }}>
              <div className="eyebrow" style={{ color: "var(--color-petrol)" }}>Para fornecedores</div>
              <h3 className="h-card mt-5 mb-5" style={{ color: "var(--color-petrol)" }}>
                Buscamos representação de marcas com canal estruturado.
              </h3>
              <p className="text-[0.9375rem] mb-10 max-w-md leading-relaxed" style={{ color: "var(--color-petrol)" }}>
                Política de MAP, cobertura Sudeste + Sul, atendimento direto a
                revendedores. Sem destruição de canal em marketplace.
              </p>
              <div className="mt-auto">
                <Link href="/fornecedores" className="inline-flex items-center gap-2 px-6 py-3.5 text-[0.9375rem] font-bold transition-colors"
                  style={{ background: "var(--color-petrol)", color: "var(--color-iced)" }}>
                  Apresentação institucional <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="section-petrol p-10 md:p-14 flex flex-col">
              <div className="eyebrow" style={{ color: "var(--color-blue-300)" }}>Para compradores B2B</div>
              <h3 className="h-card mt-5 mb-5" style={{ color: "var(--color-iced)" }}>
                Atendimento dedicado a revendedores e papelarias.
              </h3>
              <p className="text-[0.9375rem] leading-relaxed mb-10 max-w-md" style={{ color: "rgba(243,241,237,0.78)" }}>
                Negociação direta, condição comercial coerente com volume, NF na
                entrega, atendimento humano em horário comercial.
              </p>
              <div className="mt-auto">
                <Link href="/contato" className="btn-primary">
                  Abrir canal comercial <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
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
