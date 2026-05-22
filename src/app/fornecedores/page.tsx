import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Para fornecedores",
  description:
    "Apresentação institucional para indústrias e marcas. Política de MAP, cobertura Sudeste + Sul, atendimento direto a revendedores B2B. Repon Distribuidora.",
  alternates: { canonical: "/fornecedores" },
};

export default function FornecedoresPage() {
  return (
    <>
      {/* HERO institucional dark */}
      <section className="section-dark">
        <div className="container-rp pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow">Para indústrias e marcas</div>
              <h1 className="h-display mt-6">
                Representação<br />
                com canal estruturado<br />
                e disciplina de preço.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="body-lead text-paper/85">
                A Repon avalia representação de marcas em quatro verticais,
                operando exclusivamente B2B com política de MAP e proteção
                de canal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE OFERECEMOS — quatro pilares */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-3xl mb-16">
            <div className="eyebrow">O que a Repon entrega</div>
            <h2 className="h-section mt-5">
              Quatro garantias institucionais para a marca que a gente representa.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
            {guarantees.map((g, i) => (
              <article
                key={g.title}
                className="bg-paper p-10 md:p-14 flex flex-col gap-6"
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-accent">{g.eyebrow}</span>
                  <span className="font-mono text-[0.6875rem] text-ink-500 tracking-wider">
                    GARANTIA · 0{i + 1}
                  </span>
                </div>
                <h3 className="h-card">{g.title}</h3>
                <p className="body-prose">{g.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* POLÍTICA DE MAP — section dedicada (o cerne do pitch) */}
      <section className="bg-paper-100 border-y border-line">
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="eyebrow text-accent">Política comercial</div>
              <h2 className="h-section mt-5">
                MAP respeitado.<br />
                Canal protegido.<br />
                Preço de revenda<br />
                preservado.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="h-card mb-3">
                  Compromisso formal de Minimum Advertised Price.
                </h3>
                <p className="body-prose max-w-2xl">
                  A Repon assina, no contrato de representação, compromisso
                  de não anunciar abaixo do MAP definido pelo fornecedor em
                  nenhum canal próprio ou marketplace. Isso protege a marca
                  contra erosão de preço e mantém o ecossistema de
                  distribuição saudável.
                </p>
              </div>

              <div>
                <h3 className="h-card mb-3">
                  Atendimento B2B direto, sem marketplace genérico.
                </h3>
                <p className="body-prose max-w-2xl">
                  A operação comercial é orientada a venda direta para
                  revendedor PJ. Não competimos por preço-piso em busca de
                  marketplace nem fazemos leilão de centavo. O produto da
                  marca representada chega ao revendedor por canal próprio.
                </p>
              </div>

              <div>
                <h3 className="h-card mb-3">
                  Cobertura regional definida.
                </h3>
                <p className="body-prose max-w-2xl">
                  Atendimento exclusivo no Sudeste e Sul, com capacidade
                  logística instalada nessas regiões. Para o fornecedor,
                  isso significa territorialidade clara — sem conflito com
                  representação em outras regiões do país.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE A REPON BUSCA */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="eyebrow">O que estamos buscando</div>
              <h2 className="h-section mt-5">
                Categorias com<br />
                espaço para<br />
                representação.
              </h2>
              <p className="body-prose mt-8 max-w-md">
                A Repon avalia novas representações em todas as quatro
                verticais ativas. O perfil ideal de marca parceira é
                aquele que valoriza canal estruturado, distribuição com
                disciplina e crescimento sustentável no Sul e Sudeste.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {site.verticals.map((v) => (
                  <li
                    key={v.slug}
                    className="py-8 grid grid-cols-12 gap-6 items-baseline"
                  >
                    <div className="col-span-2 font-mono text-[0.8125rem] text-ink-500 tracking-wider">
                      {v.number}
                    </div>
                    <div className="col-span-7">
                      <h3 className="text-[1.125rem] font-display font-medium text-ink leading-snug">
                        {v.title}
                      </h3>
                      <p className="mt-2 text-[0.875rem] text-ink-500 leading-snug max-w-md">
                        {v.summary}
                      </p>
                    </div>
                    <div className="col-span-3 flex flex-wrap gap-1.5 justify-end">
                      {v.cnae.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="font-mono text-[0.6875rem] text-ink-500 tracking-wider border border-line px-2 py-0.5"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTOS DISPONÍVEIS */}
      <section className="section-dark">
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="eyebrow">Documentação institucional</div>
              <h2 className="h-section mt-5">
                Pacote completo<br />
                de avaliação para<br />
                a sua área comercial.
              </h2>
              <p className="text-[1rem] text-paper/65 mt-8 leading-relaxed max-w-md">
                Mediante contato comercial, enviamos o pacote completo de
                avaliação institucional para o time de Trade Marketing,
                Vendas ou Distribuição da indústria.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-ink-700 border-y border-ink-700">
                {documents.map((d) => (
                  <li
                    key={d.title}
                    className="py-7 grid grid-cols-12 gap-6 items-baseline"
                  >
                    <div className="col-span-1 font-mono text-[0.75rem] text-paper/40 tracking-wider">
                      {d.number}
                    </div>
                    <div className="col-span-11 md:col-span-8">
                      <h3 className="text-[1.0625rem] font-display font-medium text-paper leading-snug">
                        {d.title}
                      </h3>
                      <p className="mt-2 text-[0.875rem] text-paper/55 leading-snug max-w-xl">
                        {d.description}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-3 md:text-right">
                      <span className="font-mono text-[0.6875rem] text-accent-soft tracking-wider uppercase">
                        Sob solicitação
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — canal direto */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow text-accent">Canal direto</div>
            <h2 className="h-section mt-5 mb-10">
              Vamos abrir conversa.
            </h2>
            <p className="body-lead mb-10">
              O canal comercial da Repon recebe propostas de representação,
              parcerias estratégicas e avaliações de catálogo diretamente
              pelo e-mail institucional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
              <a
                href={`mailto:${site.contact.emails.comercial}?subject=Proposta%20de%20representa%C3%A7%C3%A3o%20%E2%80%94%20Repon`}
                className="bg-paper p-8 hover:bg-paper-100 transition-colors group"
              >
                <div className="eyebrow text-accent mb-3">E-mail comercial</div>
                <p className="text-[1.125rem] font-medium text-ink break-all">
                  {site.contact.emails.comercial}
                </p>
                <p className="mt-3 text-[0.8125rem] text-ink-500">
                  Para apresentação de marca, catálogo e proposta comercial.
                </p>
              </a>
              <div className="bg-paper p-8">
                <div className="eyebrow mb-3">Telefone comercial</div>
                <p className="text-[1.125rem] font-medium text-ink font-mono">
                  {site.contact.phone}
                </p>
                <p className="mt-3 text-[0.8125rem] text-ink-500">
                  {site.contact.businessHours}.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/contato" className="btn-link">
                Formulário institucional completo
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const guarantees = [
  {
    eyebrow: "Posicionamento",
    title: "B2B direto, sem competição em marketplace.",
    body: "A operação comercial é orientada exclusivamente a revendedor PJ. Não competimos por preço-piso em marketplace genérico — o produto da marca representada chega ao revendedor por canal próprio.",
  },
  {
    eyebrow: "Precificação",
    title: "Política de MAP respeitada em todos os canais.",
    body: "Assinamos compromisso formal de Minimum Advertised Price em contrato de representação. O preço de revenda é protegido em todos os pontos de contato com o consumidor final.",
  },
  {
    eyebrow: "Logística",
    title: "Capacidade instalada em dois polos estratégicos.",
    body: "Operação 3PL em Navegantes (SC) com Simplilog e em São Paulo (SP) com Centralize Hub. Cobertura logística Sudeste + Sul com prazo competitivo e escalabilidade real.",
  },
  {
    eyebrow: "Atendimento",
    title: "Time comercial dedicado a revendedor.",
    body: "Cadastro de revendedor B2B com CNPJ ativo, atendimento humano, retorno em até 24h, NF na entrega. Estrutura comercial pensada para a recorrência, não para a primeira venda.",
  },
];

const documents = [
  {
    number: "01",
    title: "Apresentação institucional completa",
    description:
      "Estrutura societária, capacidade logística, perfil de cliente atendido e mix por vertical. Documento PDF enviado por e-mail mediante contato comercial.",
  },
  {
    number: "02",
    title: "Política comercial de revenda (MAP)",
    description:
      "Documento formal com compromisso de respeito ao preço mínimo anunciado, comportamento em marketplace e canais próprios, condições de promoção e desconto.",
  },
  {
    number: "03",
    title: "Comprovantes fiscais e cadastrais",
    description:
      "Cartões CNPJ matriz e filial, CCM, certidões negativas e contrato social mediante assinatura de NDA com a indústria proponente.",
  },
  {
    number: "04",
    title: "Proposta comercial customizada",
    description:
      "Após avaliação de fit da marca em uma das quatro verticais, a Repon emite proposta comercial específica com previsão de volume, ciclo de pedido e cronograma operacional.",
  },
];

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M1 7 H13 M8 2 L13 7 L8 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
