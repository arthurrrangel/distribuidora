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
      {/* HERO institucional */}
      <section className="border-b border-line">
        <div className="container-rp pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="eyebrow">Institucional</div>
          <h1 className="h-display mt-6 max-w-4xl">
            Uma distribuidora<br />
            construída para<br />
            <span className="text-ink-500">vender através do canal,</span><br />
            não apesar dele.
          </h1>
          <p className="body-lead mt-10 max-w-2xl">
            A Repon Plataforma de Comércio nasceu em 2024 com a tese de que
            o atacado B2B brasileiro tem espaço para distribuidoras que
            tratam o canal com seriedade: mix consistente, condição comercial
            estável e respeito à precificação de revenda do fornecedor.
          </p>
        </div>
      </section>

      {/* FICHA TÉCNICA — institucional dois colunas */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="eyebrow">Ficha jurídica</div>
              <h2 className="h-section mt-5">
                Dados institucionais
              </h2>
              <p className="body-prose mt-6 max-w-md">
                Todas as operações da Repon ocorrem sob CNPJs ativos,
                regularmente registrados na Receita Federal e nas
                administrações municipais. Transparência institucional é a
                primeira camada de confiança no atacado B2B.
              </p>
            </div>

            <div className="lg:col-span-7">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <dt className="eyebrow mb-2.5">Razão social</dt>
                  <dd className="text-[1.0625rem] text-ink font-medium leading-snug">
                    {site.brand.legalName}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Natureza jurídica</dt>
                  <dd className="text-[1.0625rem] text-ink font-medium leading-snug">
                    Sociedade Empresária Limitada
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNPJ Matriz · SC</dt>
                  <dd className="font-mono text-[0.9375rem] text-ink">
                    {site.fiscal.matriz.cnpj}
                  </dd>
                  <dd className="text-[0.8125rem] text-ink-500 mt-1">
                    Aberta em {site.fiscal.matriz.abertura}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNPJ Filial · SP</dt>
                  <dd className="font-mono text-[0.9375rem] text-ink">
                    {site.fiscal.filial.cnpj}
                  </dd>
                  <dd className="text-[0.8125rem] text-ink-500 mt-1">
                    Aberta em {site.fiscal.filial.abertura}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Atividade principal</dt>
                  <dd className="font-mono text-[0.8125rem] text-ink-700 leading-snug">
                    CNAE {site.fiscal.cnaePrincipal.code}
                  </dd>
                  <dd className="text-[0.8125rem] text-ink-500 mt-1.5 leading-snug">
                    {site.fiscal.cnaePrincipal.label}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNAEs registradas</dt>
                  <dd className="text-[1.0625rem] text-ink font-medium">
                    {site.fiscal.cnaeTotalCount} no total
                  </dd>
                  <dd className="text-[0.8125rem] text-ink-500 mt-1">
                    Atacado e varejo especializado
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO institucional dark */}
      <section className="section-dark">
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="eyebrow">Posicionamento</div>
            <h2 className="h-section mt-5 mb-10">
              Por que existimos.
            </h2>
            <div className="space-y-6 text-[1.0625rem] text-paper/80 leading-relaxed">
              <p>
                O mercado de distribuição no Brasil é desigual. De um lado,
                grandes distribuidoras que atendem apenas redes e clientes
                com volume mínimo elevado. Do outro, marketplaces que
                pulverizam o preço de revenda e queimam a marca do
                fornecedor.
              </p>
              <p>
                No meio, milhares de revendedores — papelarias, lojas
                técnicas, mini-mercados e bazaristas — que precisam de
                condição comercial real, atendimento humano e mix coerente.
                Esse é o cliente da Repon.
              </p>
              <p>
                Operamos com infraestrutura logística enxuta em duas
                regiões estratégicas, mix vertical orientado pelo perfil de
                compra do revendedor, e disciplina comercial que protege a
                marca de quem distribuímos. Atacado B2B feito com a régua
                certa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPACIDADE LOGÍSTICA */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="eyebrow">Capacidade logística</div>
              <h2 className="h-section mt-5">
                Operação 3PL integrada,<br />
                cobertura nacional<br />
                no Sudeste e Sul.
              </h2>
              <p className="body-prose mt-8 max-w-md">
                A escolha por modelo 3PL com parceiros especializados é
                deliberada: permite escalar volume sem CapEx morto em
                armazém, mantém custo logístico competitivo e garante
                operação técnica em padrão de mercado.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-6 max-w-md">
                {site.locations.map((l) => (
                  <div
                    key={l.slug}
                    className="card-hairline p-6 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="eyebrow text-accent">
                        {l.label}
                      </span>
                      <span className="font-mono text-[0.6875rem] text-ink-500 tracking-wider">
                        {l.role.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="h-card mb-2">
                      {l.city} / {l.state}
                    </h3>
                    <p className="text-[0.9375rem] text-ink-600 leading-relaxed">
                      {l.address}<br />
                      CEP {l.zip}
                    </p>
                    <div className="mt-4 pt-4 border-t border-line">
                      <div className="eyebrow mb-1.5">Operação 3PL</div>
                      <p className="text-[0.9375rem] text-ink font-medium">
                        {l.partner}
                      </p>
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

      {/* PRINCÍPIOS OPERACIONAIS */}
      <section className="bg-paper-100 border-y border-line">
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-4xl mb-16">
            <div className="eyebrow">Como operamos</div>
            <h2 className="h-section mt-5">
              Quatro princípios que orientam a Repon.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
            {operatingPrinciples.map((p, i) => (
              <article
                key={p.title}
                className="bg-paper p-10 md:p-12"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="eyebrow text-accent">Princípio</span>
                  <span className="font-mono text-[0.6875rem] text-ink-500 tracking-wider">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="h-card mb-4">{p.title}</h3>
                <p className="body-prose">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <h2 className="h-section">
              Quer entender com<br />profundidade?
            </h2>
            <div>
              <p className="body-lead mb-8">
                A apresentação institucional completa, com política de MAP,
                fluxo de atendimento, condições por canal e cobertura
                operacional, é enviada mediante contato comercial.
              </p>
              <Link href="/fornecedores" className="btn-primary">
                Solicitar apresentação institucional
              </Link>
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
    body: "Operamos em quatro verticais conectadas pelo mesmo perfil de comprador. Especialização gera condição comercial real com fornecedor e simplifica o relacionamento com o revendedor.",
  },
  {
    title: "Condição comercial coerente com volume.",
    body: "Tabelas por faixa de pedido, prazo no boleto a partir de R$ 1.500, frete subsidiado em pedidos consolidados. Sem leilão de centavo, sem promoção destrutiva.",
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
