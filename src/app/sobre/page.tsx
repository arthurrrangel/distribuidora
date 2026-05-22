import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CoverageMap } from "@/components/CoverageMap";

export const metadata: Metadata = {
  title: "A Repon",
  description:
    "Distribuidora atacadista B2B fundada em 2024, com operação logística em Navegantes (SC) e São Paulo (SP). CNPJ, estrutura e princípios operacionais.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      {/* HERO */}
      <section className="section-petrol border-b border-line">
        <div className="container-rp pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="eyebrow">A Repon em uma página</div>
          <h1 className="h-display mt-6 max-w-4xl" style={{ color: "var(--color-iced)" }}>
            Distribuidora atacadista<br />
            <span style={{ color: "var(--color-blue-300)" }}>conectando indústria</span><br />
            ao revendedor real.
          </h1>
          <p className="body-lead mt-10 max-w-2xl" style={{ color: "rgba(243,241,237,0.82)" }}>
            A Repon Plataforma de Comércio nasceu em abril de 2024 com uma tese específica:
            atender o revendedor pequeno e médio que está esquecido entre o marketplace genérico
            e a distribuidora grande que exige volume mínimo alto.
          </p>
        </div>
      </section>

      {/* O QUE SOMOS — fatos objetivos */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="eyebrow">O que somos, em fatos</div>
              <h2 className="h-section mt-5">A operação, sem floreio.</h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y border-y" style={{ borderColor: "var(--color-line)" }}>
                {[
                  { label: "Fundação", value: "Abril de 2024", sub: "Matriz aberta em Navegantes/SC" },
                  { label: "Expansão", value: "Fevereiro de 2025", sub: "Abertura da filial em São Paulo/SP" },
                  { label: "Operação", value: "2 centros logísticos", sub: "Modelo 3PL com parceiros especializados (Simplilog + Centralize Hub)" },
                  { label: "Cobertura", value: "Sudeste + Sul", sub: "SP, RJ, MG, ES, PR, SC, RS" },
                  { label: "Mix", value: "4 verticais ativas", sub: "Papelaria, higiene, informática e eletroeletrônicos" },
                  { label: "Catálogo", value: "14 CNAEs registradas", sub: "Atacado e varejo especializado" },
                  { label: "Canal", value: "B2B direto", sub: "Cadastro PJ exclusivo, sem competição em marketplace" },
                  { label: "Atendimento", value: "WhatsApp comercial", sub: "Segunda a sexta, das 8h às 18h" },
                ].map((f) => (
                  <li key={f.label} className="py-5 grid grid-cols-12 gap-4 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                    <div className="col-span-4 md:col-span-3">
                      <div className="eyebrow">{f.label}</div>
                    </div>
                    <div className="col-span-8 md:col-span-9">
                      <p className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                        {f.value}
                      </p>
                      <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                        {f.sub}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FICHA JURÍDICA */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="container-rp py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="eyebrow">Ficha jurídica</div>
              <h2 className="h-section mt-5">Dados institucionais.</h2>
              <p className="body-prose mt-6 max-w-md">
                Operações sob CNPJs ativos, regularmente registrados na Receita Federal e
                nas administrações municipais. Transparência institucional é a primeira
                camada de confiança no atacado B2B.
              </p>
            </div>

            <div className="lg:col-span-7">
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
            </div>
          </div>
        </div>
      </section>

      {/* CAPACIDADE LOGÍSTICA */}
      <section>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="eyebrow">Capacidade logística</div>
              <h2 className="h-section mt-5">
                Operação 3PL integrada,<br />
                cobertura Sudeste e Sul.
              </h2>
              <p className="body-prose mt-8 max-w-md">
                A escolha por modelo 3PL com parceiros especializados é deliberada:
                permite escalar volume sem CapEx morto em armazém, mantém custo
                logístico competitivo e garante operação em padrão de mercado.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-6 max-w-md">
                {site.locations.map((l) => (
                  <div key={l.slug} className="card-hairline p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="eyebrow" style={{ color: "var(--color-blue)" }}>{l.label}</span>
                      <span className="font-mono text-[0.6875rem] tracking-wider" style={{ color: "var(--color-ink-500)" }}>
                        {l.role.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="h-card mb-2">{l.city} / {l.state}</h3>
                    <p className="text-[0.9375rem] leading-relaxed" style={{ color: "var(--color-ink-700)" }}>
                      {l.address}<br />CEP {l.zip}
                    </p>
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-line)" }}>
                      <div className="eyebrow mb-1.5">Operação 3PL</div>
                      <p className="text-[0.9375rem] font-bold" style={{ color: "var(--color-petrol)" }}>{l.partner}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
              <div className="card-hairline p-6 md:p-10">
                <CoverageMap variant="light" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO OPERAMOS — 4 princípios curtos */}
      <section className="section-blue">
        <div className="container-rp py-20 md:py-28">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow">Como operamos</div>
            <h2 className="h-section mt-5" style={{ color: "var(--color-iced)" }}>
              Quatro princípios que orientam a Repon.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(243,241,237,0.2)" }}>
            {operatingPrinciples.map((p, i) => (
              <article key={p.title} className="p-8 md:p-10" style={{ background: "var(--color-blue)" }}>
                <div className="flex items-baseline justify-between mb-5">
                  <span className="eyebrow" style={{ color: "var(--color-iced)", opacity: 0.85 }}>Princípio</span>
                  <span className="font-mono text-[0.6875rem] tracking-wider" style={{ color: "rgba(243,241,237,0.55)" }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[1.25rem] mb-3 leading-tight" style={{ color: "var(--color-iced)" }}>
                  {p.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed" style={{ color: "rgba(243,241,237,0.88)" }}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <h2 className="h-section">Continuou interessado?</h2>
            <div>
              <p className="body-lead mb-8">
                A apresentação institucional completa, com política de MAP, fluxo
                comercial detalhado e cronograma operacional, é enviada por e-mail
                mediante contato. Mande sua dúvida ou proposta no WhatsApp comercial.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/fornecedores" className="btn-primary">Apresentação institucional</Link>
                <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">WhatsApp comercial</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
