import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Para fornecedores",
  description: "Representação de marcas com canal estruturado, MAP respeitado e cobertura Sudeste + Sul.",
  alternates: { canonical: "/fornecedores" },
};

export default function FornecedoresPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-petrol">
        <div className="container-rp pt-20 md:pt-40 pb-20 md:pb-32">
          <div className="max-w-3xl">
            <div className="eyebrow">Para indústrias e marcas</div>
            <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
              Representação com<br />
              <span style={{ color: "var(--color-blue-300)" }}>canal estruturado</span><br />
              e MAP respeitado.
            </h1>
            <p className="body-lead mt-10 max-w-xl" style={{ color: "rgba(243,241,237,0.78)" }}>
              A Repon avalia novas marcas nas quatro verticais ativas. Política comercial
              formal, cobertura Sudeste + Sul, atendimento direto a revendedor.
            </p>
          </div>
        </div>
      </section>

      {/* GARANTIAS — lista enxuta */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Quatro garantias</div>
              <h2 className="h-section mt-6">O que entregamos<br />pra marca.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {guarantees.map((g, i) => (
                  <li key={g.title} className="py-9 grid grid-cols-12 gap-6" style={{ borderColor: "var(--color-line)" }}>
                    <div className="col-span-2 font-mono text-[0.875rem]" style={{ color: "var(--color-blue)" }}>
                      0{i + 1}
                    </div>
                    <div className="col-span-10">
                      <h3 className="font-display text-[1.375rem] md:text-[1.625rem] mb-3" style={{ fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-petrol)" }}>
                        {g.title}
                      </h3>
                      <p className="text-[0.9375rem] max-w-xl" style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}>
                        {g.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MAP DESTAQUE */}
      <section className="section-blue">
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow">Política comercial</div>
            <h2 className="h-section mt-6 mb-8" style={{ color: "var(--color-iced)" }}>
              MAP respeitado.<br />
              Canal protegido.
            </h2>
            <p className="body-lead max-w-2xl" style={{ color: "rgba(243,241,237,0.85)" }}>
              A Repon assina compromisso formal de Minimum Advertised Price em contrato.
              O preço de revenda é protegido em todos os pontos de contato com o consumidor final.
            </p>
          </div>
        </div>
      </section>

      {/* VERTICAIS QUE BUSCAMOS */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Onde buscamos representação</div>
              <h2 className="h-section mt-6">Quatro verticais.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {site.verticals.map((v) => (
                  <li key={v.slug} className="py-7 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                    <div className="col-span-2 font-mono text-[0.875rem]" style={{ color: "var(--color-blue)" }}>
                      {v.number}
                    </div>
                    <div className="col-span-10">
                      <h3 className="font-display text-[1.25rem] md:text-[1.5rem]" style={{ fontWeight: 500, letterSpacing: "-0.018em", color: "var(--color-petrol)" }}>
                        {v.title}
                      </h3>
                      <p className="mt-2 text-[0.875rem]" style={{ color: "var(--color-ink-500)" }}>
                        {v.examples}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-petrol">
        <div className="container-rp py-28 md:py-40">
          <div className="max-w-3xl">
            <div className="eyebrow">Canal direto</div>
            <h2 className="h-section mt-6 mb-10" style={{ color: "var(--color-iced)" }}>
              Vamos abrir<br />conversa.
            </h2>
            <p className="body-lead mb-12 max-w-2xl" style={{ color: "rgba(243,241,237,0.85)" }}>
              Apresentação institucional completa, política de MAP e proposta comercial
              customizada — tudo enviado mediante contato pelo e-mail comercial.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`mailto:${site.contact.emails.comercial}?subject=Proposta%20de%20representa%C3%A7%C3%A3o%20%E2%80%94%20Repon`} className="btn-primary">
                {site.contact.emails.comercial}
              </a>
              <Link href="/contato" className="inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-medium transition-colors"
                style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}>
                Formulário institucional
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
    title: "B2B direto, sem marketplace genérico.",
    body: "Operação comercial orientada exclusivamente a revendedor PJ. Não competimos por preço-piso. O produto da marca chega ao revendedor por canal próprio.",
  },
  {
    title: "MAP respeitado em todos os canais.",
    body: "Compromisso formal em contrato de representação. Preço de revenda protegido em todos os pontos de contato com o consumidor final.",
  },
  {
    title: "Capacidade logística instalada.",
    body: "Operação 3PL em Navegantes (SC) com Simplilog e em São Paulo (SP) com Centralize Hub. Cobertura Sudeste + Sul com prazo competitivo.",
  },
  {
    title: "Time comercial dedicado a revendedor.",
    body: "Cadastro PJ com CNPJ ativo, atendimento humano, retorno em até 24h, NF na entrega. Estrutura pensada para recorrência.",
  },
];
