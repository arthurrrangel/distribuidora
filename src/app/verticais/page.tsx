import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Verticais",
  description:
    "Quatro verticais de atacado B2B: papelaria & escritório, higiene pessoal, informática e eletroeletrônicos. CNAEs registrados, mix por categoria de cliente.",
  alternates: { canonical: "/verticais" },
};

export default function VerticaisPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line">
        <div className="container-rp pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow">Verticais ativas</div>
              <h1 className="h-display mt-6">
                Quatro categorias.<br />
                Um único perfil<br />
                de comprador.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="body-lead">
                A Repon opera em categorias que o mesmo revendedor B2B compra
                — papeleiro de bairro, papelaria escolar, loja técnica, bazar
                expandido. Profundidade no cliente, não pulverização em
                nichos desconectados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VERTICAIS — uma por seção, alternando layout */}
      {site.verticals.map((v, i) => (
        <section
          key={v.slug}
          id={v.slug}
          className={i % 2 === 1 ? "bg-paper-100 border-y border-line" : ""}
        >
          <div className="container-rp py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div
                className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="eyebrow text-accent">
                    Vertical {v.number}
                  </span>
                  <div className="h-px w-12 bg-accent" />
                </div>
                <h2 className="h-section mb-8">{v.title}</h2>
                <p className="body-lead mb-10 max-w-md">
                  {v.summary}
                </p>

                <div className="border-t border-line pt-6">
                  <div className="eyebrow mb-4">CNAEs registradas</div>
                  <ul className="flex flex-wrap gap-2">
                    {v.cnae.map((c) => (
                      <li
                        key={c}
                        className="font-mono text-[0.75rem] tracking-wider text-ink-700 border border-line px-3 py-1.5"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line">
                  {v.topics.map((topic, idx) => (
                    <div
                      key={topic}
                      className={`${i % 2 === 1 ? "bg-paper-100" : "bg-paper"} p-8 flex flex-col gap-4 hover:bg-paper-50 transition-colors`}
                    >
                      <span className="font-mono text-[0.6875rem] text-ink-500 tracking-wider">
                        SUBCATEGORIA · {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[1.0625rem] text-ink font-medium leading-snug">
                        {topic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* MIX RATIONAL — manifesto institucional */}
      <section className="section-dark">
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="eyebrow">Lógica do mix</div>
              <h2 className="h-section mt-5">
                Por que essas<br />quatro verticais.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-[1.0625rem] text-paper/80 leading-relaxed">
              <p>
                As quatro verticais da Repon não são uma escolha aleatória.
                Elas formam o universo de compra do mesmo revendedor: o
                papeleiro que vende caderno também vende creme dental, fone
                de ouvido e cabo USB. O dono de bazar expandido compra
                organização, brinquedo educativo, eletroportátil e perfumaria
                leve do mesmo fornecedor.
              </p>
              <p>
                Em vez de obrigar o cliente a manter cinco distribuidores
                diferentes, a Repon consolida o pedido. Isso é eficiência
                logística para o revendedor e relacionamento de share-of-
                wallet para a operação — onde a recorrência se constrói.
              </p>
              <p>
                Cada vertical tem mix curado para revenda em volume baixo a
                médio. Não competimos com distribuidor especializado puro em
                cada categoria. Competimos onde nenhum deles atua: na
                consolidação do pedido do revendedor pequeno e médio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
            <div className="bg-paper p-10 md:p-14 flex flex-col">
              <div className="eyebrow text-accent">
                Sou revendedor / comprador B2B
              </div>
              <h3 className="h-card mt-5 mb-4">
                Abrir cadastro no canal direto.
              </h3>
              <p className="body-prose mb-10">
                Atendimento comercial direto, sem ruído de marketplace.
                Cadastro PJ com CNPJ ativo.
              </p>
              <div className="mt-auto">
                <Link href="/contato" className="btn-primary">
                  Falar com comercial
                </Link>
              </div>
            </div>
            <div className="bg-paper p-10 md:p-14 flex flex-col">
              <div className="eyebrow text-accent">
                Sou indústria / fornecedor
              </div>
              <h3 className="h-card mt-5 mb-4">
                Propor representação em uma vertical.
              </h3>
              <p className="body-prose mb-10">
                A Repon avalia representação com política de MAP em todas
                as quatro verticais.
              </p>
              <div className="mt-auto">
                <Link href="/fornecedores" className="btn-ghost">
                  Apresentação para fornecedores
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
