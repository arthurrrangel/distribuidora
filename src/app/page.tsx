import Link from "next/link";
import { site } from "@/lib/site";
import { CoverageMap } from "@/components/CoverageMap";
import { Reveal } from "@/components/Reveal";
import { SectionMarker } from "@/components/SectionMarker";
import { SequencedLine } from "@/components/SequencedLine";
import { MagneticButton } from "@/components/MagneticButton";
import { ScrollCue } from "@/components/ScrollCue";
import { GradientMesh } from "@/components/GradientMesh";
import { ConstellationNetwork } from "@/components/ConstellationNetwork";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SectionDivider } from "@/components/SectionDivider";

const FACTS = [
  { label: "Fundação", value: "Abril de 2024", sub: "Matriz aberta em Navegantes/SC" },
  { label: "Expansão", value: "Fevereiro de 2025", sub: "Abertura da filial em São Paulo/SP" },
  { label: "Operação", value: "2 centros logísticos", sub: "Modelo 3PL com parceiros especializados (Simplilog + Centralize Hub)" },
  { label: "Cobertura", value: "Sudeste + Sul", sub: "SP, RJ, MG, ES, PR, SC, RS" },
  { label: "Mix", value: "4 verticais ativas", sub: "Papelaria, higiene, informática e eletroeletrônicos" },
  { label: "Catálogo", value: "14 CNAEs registradas", sub: "Atacado e varejo especializado" },
  { label: "Canal", value: "B2B direto", sub: "Cadastro PJ exclusivo, sem competição em marketplace" },
  { label: "Atendimento", value: "WhatsApp comercial", sub: "Segunda a sexta, das 8h às 18h" },
];

const operatingPrinciples = [
  {
    title: "Mix vertical, não pulverizado.",
    body: "Quatro verticais conectadas pelo mesmo perfil de comprador. Especialização gera condição comercial real com fornecedor e simplifica o relacionamento com o revendedor.",
  },
  {
    title: "Condição comercial coerente com volume.",
    body: "Tabelas por faixa de pedido, prazo no boleto a partir do segundo pedido, frete subsidiado em pedidos consolidados. Sem leilão de centavo.",
  },
  {
    title: "Política comercial que protege o fornecedor.",
    body: "MAP (Minimum Advertised Price) respeitado em todos os canais. A Repon não compete por preço-piso em marketplace genérico — opera por relacionamento direto.",
  },
  {
    title: "Atendimento humano, com SLA real.",
    body: "Atendimento comercial em horário útil, retorno em até 24h em qualquer canal aberto. Sem chatbot, sem URA, sem ruído entre o pedido e a expedição.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ANIMADO ===== */}
      <section className="section-petrol relative overflow-hidden">
        <GradientMesh opacity={0.62} />
        <div className="hidden md:block">
          <ConstellationNetwork />
        </div>
        <GrainOverlay opacity={0.05} blendMode="overlay" />

        <div className="container-rp pt-24 md:pt-56 pb-28 md:pb-56 relative z-10">
          <div className="max-w-5xl mx-auto md:mx-0 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <SectionMarker number="00" label="A Repon em uma página" variant="light" />
            </div>

            <h1 className="h-display mt-10" style={{ color: "var(--color-iced)" }}>
              <SequencedLine delay={80}>Distribuidora atacadista</SequencedLine>
              <SequencedLine delay={220} accent>conectando indústria</SequencedLine>
              <SequencedLine delay={360}>ao revendedor real.</SequencedLine>
            </h1>

            <Reveal delay={520}>
              <p className="body-lead mt-12 max-w-2xl mx-auto md:mx-0" style={{ color: "rgba(243,241,237,0.82)" }}>
                A Repon Plataforma de Comércio nasceu em abril de 2024 com uma tese específica:
                atender o revendedor pequeno e médio que está esquecido entre o marketplace genérico
                e a distribuidora grande que exige volume mínimo alto.
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
                  href="/como-comprar"
                  className="link-underline text-[0.9375rem] font-medium inline-flex items-center gap-2 justify-center sm:justify-start"
                  style={{ color: "var(--color-blue-300)", padding: "1rem 0.5rem" }}
                >
                  Ver como comprar <ArrowRight />
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
          </div>
        </div>

        <ScrollCue />
      </section>

      {/* ===== O QUE SOMOS — fatos objetivos ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-32 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-5">
              <SectionMarker number="01" label="Em fatos" />
              <h2 className="h-section mt-2">A operação,<br />sem floreio.</h2>
            </Reveal>
            <div className="lg:col-span-7">
              <ul className="divide-y border-y" style={{ borderColor: "var(--color-line)" }}>
                {FACTS.map((f, i) => (
                  <Reveal key={f.label} delay={i * 60} as="li">
                    <div
                      className="py-5 grid grid-cols-12 gap-4 items-baseline"
                      style={{ borderColor: "var(--color-line)" }}
                    >
                      <div className="col-span-4 md:col-span-3">
                        <div className="eyebrow">{f.label}</div>
                      </div>
                      <div className="col-span-8 md:col-span-9">
                        <p
                          className="text-[1.0625rem] font-bold leading-snug"
                          style={{ color: "var(--color-petrol)" }}
                        >
                          {f.value}
                        </p>
                        <p
                          className="mt-1 text-[0.8125rem]"
                          style={{ color: "var(--color-ink-500)" }}
                        >
                          {f.sub}
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

      <SectionDivider />

      {/* ===== FICHA JURÍDICA ===== */}
      <section
        style={{
          background: "var(--color-iced-warm)",
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div className="container-rp py-32 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionMarker number="02" label="Institucional" />
              <h2 className="h-section mt-2">Dados<br />institucionais.</h2>
              <p className="body-prose mt-6 max-w-md">
                Operações sob CNPJs ativos, regularmente registrados na Receita Federal e
                nas administrações municipais. Transparência institucional é a primeira
                camada de confiança no atacado B2B.
              </p>
            </Reveal>

            <Reveal delay={140} className="lg:col-span-7">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <dt className="eyebrow mb-2.5">Razão social</dt>
                  <dd className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                    {site.brand.legalName}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Natureza jurídica</dt>
                  <dd className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                    Sociedade Empresária Limitada
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNPJ Matriz · SC</dt>
                  <dd className="font-mono text-[0.9375rem]" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.matriz.cnpj}
                  </dd>
                  <dd className="text-[0.8125rem] mt-1" style={{ color: "var(--color-ink-500)" }}>
                    Aberta em {site.fiscal.matriz.abertura}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNPJ Filial · SP</dt>
                  <dd className="font-mono text-[0.9375rem]" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.filial.cnpj}
                  </dd>
                  <dd className="text-[0.8125rem] mt-1" style={{ color: "var(--color-ink-500)" }}>
                    Aberta em {site.fiscal.filial.abertura}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Atividade principal</dt>
                  <dd className="font-mono text-[0.8125rem] leading-snug" style={{ color: "var(--color-ink-700)" }}>
                    CNAE {site.fiscal.cnaePrincipal.code}
                  </dd>
                  <dd className="text-[0.8125rem] mt-1.5 leading-snug" style={{ color: "var(--color-ink-500)" }}>
                    {site.fiscal.cnaePrincipal.label}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CCM Filial SP</dt>
                  <dd className="font-mono text-[0.9375rem]" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.filial.ccm}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== CAPACIDADE LOGÍSTICA ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-32 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionMarker number="03" label="Operação" />
              <h2 className="h-section mt-2">
                Operação 3PL integrada,<br />
                cobertura Sudeste e Sul.
              </h2>
              <p className="body-prose mt-8 max-w-md">
                A escolha por modelo 3PL com parceiros especializados é deliberada:
                permite escalar volume sem CapEx morto em armazém, mantém custo
                logístico competitivo e garante operação em padrão de mercado.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-6 max-w-md">
                {site.locations.map((l, i) => (
                  <Reveal key={l.slug} delay={140 + i * 100}>
                    <div className="card-hairline p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="eyebrow" style={{ color: "var(--color-blue)" }}>{l.label}</span>
                        <span
                          className="font-mono text-[0.6875rem] tracking-wider"
                          style={{ color: "var(--color-ink-500)" }}
                        >
                          {l.role.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="h-card mb-2">
                        {l.city} / {l.state}
                      </h3>
                      <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--color-ink-700)" }}>
                        {l.address}
                        <br />
                        CEP {l.zip}
                      </p>
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-line)" }}>
                        <div className="eyebrow mb-1.5">Operação 3PL</div>
                        <p className="text-[0.9375rem] font-bold" style={{ color: "var(--color-petrol)" }}>
                          {l.partner}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={240} className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
              <div className="card-hairline p-6 md:p-10">
                <CoverageMap variant="light" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== COMO OPERAMOS — 4 princípios ===== */}
      <section className="section-blue relative overflow-hidden">
        <GrainOverlay opacity={0.04} blendMode="overlay" />
        <div className="container-rp py-32 md:py-48 relative z-10">
          <Reveal>
            <SectionMarker number="04" label="Princípios" variant="light" />
            <div className="max-w-3xl mb-16">
              <h2 className="h-section mt-2" style={{ color: "var(--color-iced)" }}>
                Quatro princípios<br />que orientam a Repon.
              </h2>
            </div>
          </Reveal>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: "rgba(243,241,237,0.2)" }}
          >
            {operatingPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article
                  className="p-10 md:p-14 h-full"
                  style={{ background: "var(--color-blue)" }}
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="eyebrow" style={{ color: "var(--color-iced)", opacity: 0.85 }}>
                      Princípio
                    </span>
                    <span
                      className="font-mono text-[0.6875rem] tracking-wider"
                      style={{ color: "rgba(243,241,237,0.55)" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3
                    className="font-display text-[1.5rem] md:text-[1.875rem] mb-5"
                    style={{
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                      color: "var(--color-iced)",
                      lineHeight: 1.1,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-[0.9375rem] leading-relaxed"
                    style={{ color: "rgba(243,241,237,0.88)" }}
                  >
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-32 md:py-48">
          <Reveal>
            <SectionMarker number="05" label="Próximo passo" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-10">
            <Reveal>
              <h2 className="h-section">Continuou<br />interessado?</h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="body-lead mb-8">
                A apresentação institucional completa, com política de MAP, fluxo
                comercial detalhado e cronograma operacional, é enviada por e-mail
                mediante contato. Mande sua dúvida ou proposta no WhatsApp comercial.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={6}>
                  <a
                    href={site.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Mandar CNPJ pelo WhatsApp <ArrowRight />
                  </a>
                </MagneticButton>
                <Link href="/fornecedores" className="btn-ghost">
                  Apresentação institucional
                </Link>
              </div>
              <p className="mt-6 text-[0.75rem] font-mono tracking-[0.16em] uppercase" style={{ color: "var(--color-ink-500)" }}>
                Resposta em 24h · Sem fidelidade
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path d="M1 7 H13 M8 2 L13 7 L8 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
