import Link from "next/link";
import { site } from "@/lib/site";
import { CoverageMap } from "@/components/CoverageMap";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO PETROL — ancorado no que a Repon faz ===== */}
      <section className="section-petrol relative overflow-hidden">
        <div className="container-rp pt-14 md:pt-32 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-9">
              <div className="eyebrow reveal">
                Atacado B2B · Papelaria · Higiene · Informática · Eletro
              </div>
              <h1 className="h-display mt-6 reveal reveal-delay-1" style={{ color: "var(--color-iced)" }}>
                Atacado direto para o<br />
                <span style={{ color: "var(--color-blue-300)" }}>revendedor que não</span><br />
                cabe no marketplace.
              </h1>
              <p className="body-lead mt-8 max-w-2xl reveal reveal-delay-2" style={{ color: "rgba(243,241,237,0.82)" }}>
                A Repon abastece papelarias, lojas escolares, bazares e lojas técnicas no
                Sudeste e Sul. Pedido mínimo de R$ 800, despacho em 48h, prazo no boleto a
                partir do segundo pedido. NF na entrega, sem leilão de centavo.
              </p>

              <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 reveal reveal-delay-3">
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Abrir cadastro no WhatsApp
                  <ArrowRight />
                </a>
                <Link href="/fornecedores" className="inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-bold transition-colors"
                  style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}>
                  Sou indústria / fornecedor
                </Link>
              </div>

              <p className="mt-8 text-[0.8125rem] font-mono reveal reveal-delay-4" style={{ color: "var(--color-blue-300)" }}>
                — {site.brand.slogan.toUpperCase()}
              </p>
            </div>

            <div className="lg:col-span-3 reveal reveal-delay-4">
              <div className="flex flex-col gap-5 border-l pl-6" style={{ borderColor: "var(--color-petrol-80)" }}>
                <div>
                  <div className="eyebrow mb-2">Pedido mínimo</div>
                  <p className="text-[1.0625rem] font-bold" style={{ color: "var(--color-iced)" }}>R$ 800</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">Despacho</div>
                  <p className="text-[1.0625rem] font-bold" style={{ color: "var(--color-iced)" }}>Até 48h</p>
                </div>
                <div>
                  <div className="eyebrow mb-2">Cobertura</div>
                  <p className="text-sm leading-snug" style={{ color: "var(--color-iced)" }}>
                    Sudeste 3–5 dias úteis<br />Sul 2–3 dias úteis
                  </p>
                </div>
                <div>
                  <div className="eyebrow mb-2">Pagamento</div>
                  <p className="text-sm leading-snug" style={{ color: "var(--color-iced)" }}>
                    PIX, boleto à vista,<br />prazo 21 dias recorrente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== O QUE A REPON FAZ — explícito ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="eyebrow">O que a Repon faz</div>
              <h2 className="h-section mt-5">{site.whatWeDo.headline}</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="body-lead mb-12 max-w-2xl">{site.whatWeDo.summary}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
                {site.whatWeDo.points.map((p, i) => (
                  <div key={p.title} className="p-6 md:p-7" style={{ background: "var(--color-iced-soft)" }}>
                    <div className="font-mono text-[0.6875rem] tracking-wider mb-3" style={{ color: "var(--color-blue)" }}>
                      0{i + 1}
                    </div>
                    <h3 className="font-display font-bold text-[1.0625rem] mb-2.5 leading-tight">{p.title}</h3>
                    <p className="text-[0.875rem] leading-relaxed" style={{ color: "var(--color-ink-600)" }}>
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA — 3 etapas ===== */}
      <section className="section-blue">
        <div className="container-rp py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <div className="eyebrow">Como funciona</div>
            <h2 className="h-section mt-5" style={{ color: "var(--color-iced)" }}>
              Três passos do cadastro à entrega.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(243,241,237,0.2)" }}>
            {site.howItWorks.map((step) => (
              <article key={step.step} className="p-8 md:p-10" style={{ background: "var(--color-blue)" }}>
                <div className="font-display font-bold text-[3.5rem] leading-none mb-6" style={{ color: "rgba(243,241,237,0.55)" }}>
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-[1.25rem] mb-3" style={{ color: "var(--color-iced)" }}>
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed" style={{ color: "rgba(243,241,237,0.88)" }}>
                  {step.body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-bold transition-colors"
              style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}>
              Começar cadastro pelo WhatsApp <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ===== PRA QUEM É — 3 perfis ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="eyebrow">Para quem é</div>
              <h2 className="h-section mt-5 max-w-2xl">Três perfis de revendedor que a Repon atende bem.</h2>
            </div>
            <p className="body-prose max-w-md">
              Atendemos quem está acima do consumidor final mas abaixo do volume de uma rede.
              O comprador esquecido entre o marketplace e a grande distribuidora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
            {site.audience.map((a) => (
              <article key={a.profile} className="p-8 md:p-10" style={{ background: "var(--color-iced-soft)" }}>
                <div className="font-mono text-[0.75rem] tracking-wider mb-4" style={{ color: "var(--color-blue)" }}>
                  PERFIL · {a.icon}
                </div>
                <h3 className="font-display font-bold text-[1.375rem] mb-4 leading-tight">{a.profile}</h3>
                <p className="text-[0.9375rem] leading-relaxed mb-5" style={{ color: "var(--color-ink-700)" }}>
                  {a.pitch}
                </p>
                <div className="pt-5 border-t" style={{ borderColor: "var(--color-line)" }}>
                  <div className="eyebrow mb-2">Dor real</div>
                  <p className="text-[0.875rem] leading-relaxed" style={{ color: "var(--color-ink-600)" }}>
                    {a.pain}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NÚMEROS ===== */}
      <section className="section-petrol">
        <div className="container-rp py-20 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {site.numbers.map((n) => (
              <div key={n.label} className="flex flex-col">
                <div className="stat-num" style={{ color: "var(--color-iced)" }}>{n.value}</div>
                <div className="mt-3 text-[0.9375rem] font-bold" style={{ color: "var(--color-iced)" }}>{n.label}</div>
                <div className="mt-1 text-[0.8125rem] leading-snug" style={{ color: "var(--color-blue-300)" }}>{n.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAPA DE COBERTURA ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="eyebrow">Operação logística</div>
              <h2 className="h-section mt-5">Dois centros<br />estratégicos,<br />uma cobertura.</h2>
              <p className="body-prose mt-8 max-w-md">
                A Repon opera com infraestrutura logística integrada em duas regiões
                críticas. O hub Sul, em Navegantes (SC), aproveita o eixo da BR-470 e a
                logística portuária de Itajaí. O hub Sudeste, em São Paulo (SP), conecta
                a operação ao maior centro consumidor do país.
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

      {/* ===== VERTICAIS — com exemplos concretos ===== */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="eyebrow">Verticais ativas</div>
              <h2 className="h-section mt-5 max-w-xl">
                Quatro categorias.<br />Um único perfil de comprador.
              </h2>
            </div>
            <p className="body-prose max-w-md">
              Categorias conectadas pelo mesmo revendedor. Em vez de manter quatro
              fornecedores, o cliente consolida o pedido em um só.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--color-line)" }}>
            {site.verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/verticais#${v.slug}`}
                className="p-8 md:p-10 flex flex-col gap-5 transition-colors group"
                style={{ background: "var(--color-iced-soft)" }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow" style={{ color: "var(--color-blue)" }}>Vertical {v.number}</span>
                  <ArrowRight className="opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="h-card">{v.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--color-ink-700)" }}>
                  {v.summary}
                </p>
                <div className="pt-4 border-t" style={{ borderColor: "var(--color-line)" }}>
                  <div className="eyebrow mb-2">Exemplos</div>
                  <p className="text-[0.8125rem] leading-relaxed" style={{ color: "var(--color-ink-600)" }}>
                    {v.examples}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA DUAL — GREEN + PETROL ===== */}
      <section>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--color-line)" }}>
            <div className="p-10 md:p-14 flex flex-col" style={{ background: "var(--color-green)" }}>
              <div className="eyebrow" style={{ color: "var(--color-petrol)" }}>Para indústrias e marcas</div>
              <h3 className="h-card mt-5 mb-5" style={{ color: "var(--color-petrol)" }}>
                Quer representação com canal estruturado e MAP respeitado?
              </h3>
              <p className="text-[0.9375rem] mb-10 max-w-md leading-relaxed" style={{ color: "var(--color-petrol)" }}>
                A Repon avalia novas marcas nas quatro verticais. Política comercial
                formal, cobertura Sudeste + Sul, atendimento direto a revendedor.
              </p>
              <div className="mt-auto">
                <Link href="/fornecedores" className="inline-flex items-center gap-2 px-6 py-3.5 text-[0.9375rem] font-bold transition-colors"
                  style={{ background: "var(--color-petrol)", color: "var(--color-iced)" }}>
                  Ver apresentação institucional <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="section-petrol p-10 md:p-14 flex flex-col">
              <div className="eyebrow" style={{ color: "var(--color-blue-300)" }}>Para compradores B2B</div>
              <h3 className="h-card mt-5 mb-5" style={{ color: "var(--color-iced)" }}>
                Cadastro pelo WhatsApp em 24h. Sem mensalidade, sem fidelidade.
              </h3>
              <p className="text-[0.9375rem] leading-relaxed mb-10 max-w-md" style={{ color: "rgba(243,241,237,0.8)" }}>
                Mande o CNPJ pelo WhatsApp comercial e a gente devolve com tabela,
                catálogo e condição. Primeiro pedido pode sair no mesmo dia.
              </p>
              <div className="mt-auto">
                <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-primary">
                  Mandar CNPJ pelo WhatsApp <ArrowRight />
                </a>
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
