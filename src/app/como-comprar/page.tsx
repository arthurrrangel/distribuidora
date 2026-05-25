import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Como comprar",
  description:
    "Como comprar pela Repon: cadastro PJ pelo WhatsApp, validação em 24h, despacho em 48h. Mínimo R$ 800. Frete subsidiado acima de R$ 1.500.",
  alternates: { canonical: "/como-comprar" },
};

export default function ComoComprarPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-petrol">
        <div className="container-rp pt-20 md:pt-40 pb-20 md:pb-32">
          <div className="max-w-3xl">
            <div className="eyebrow">Como comprar</div>
            <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
              Atacado direto<br />
              <span style={{ color: "var(--color-blue-300)" }}>para revendedores</span><br />
              no Sudeste e Sul.
            </h1>
            <p className="body-lead mt-10 max-w-xl" style={{ color: "rgba(243,241,237,0.78)" }}>
              Distribuidora atacadista B2B. Centros logísticos em SC e SP. Pedido mínimo
              R$ 800. Despacho em 48h.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Mandar CNPJ pelo WhatsApp
              </a>
              <Link
                href="/verticais"
                className="inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-medium transition-colors"
                style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}
              >
                Ver catálogo
              </Link>
            </div>
            <p className="mt-5 text-[0.75rem] font-mono tracking-[0.16em] uppercase" style={{ color: "rgba(243,241,237,0.5)" }}>
              Resposta em 24h. Sem fidelidade. Tabela em PDF.
            </p>
          </div>
        </div>
      </section>

      {/* TRÊS PASSOS */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Como funciona</div>
              <h2 className="h-section mt-6">Três passos.<br />Sem fricção.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {site.howItWorks.map((s) => (
                  <li
                    key={s.step}
                    className="py-9 grid grid-cols-12 gap-6"
                    style={{ borderColor: "var(--color-line)" }}
                  >
                    <div className="col-span-2 font-mono text-[0.875rem]" style={{ color: "var(--color-blue)" }}>
                      {s.step}
                    </div>
                    <div className="col-span-10">
                      <h3
                        className="font-display text-[1.375rem] md:text-[1.625rem] mb-3"
                        style={{ fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-petrol)" }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-[0.9375rem] max-w-xl"
                        style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRA QUEM É */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Para quem é</div>
              <h2 className="h-section mt-6">Três formas<br />de comprar.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {site.audience.map((a) => (
                  <li
                    key={a.profile}
                    className="py-9 grid grid-cols-12 gap-6"
                    style={{ borderColor: "var(--color-line)" }}
                  >
                    <div className="col-span-2 font-mono text-[0.875rem]" style={{ color: "var(--color-blue)" }}>
                      {a.icon}
                    </div>
                    <div className="col-span-10">
                      <h3
                        className="font-display text-[1.375rem] md:text-[1.625rem] mb-3"
                        style={{ fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-petrol)" }}
                      >
                        {a.profile}
                      </h3>
                      <p
                        className="text-[0.9375rem] max-w-2xl"
                        style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}
                      >
                        {a.pitch}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-3xl mb-12">
            <div className="eyebrow">Operação real</div>
            <h2 className="h-section mt-6">Os números<br />que sustentam.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {site.numbers.map((n) => (
              <div key={n.label} className="flex flex-col">
                <div className="stat-num">{n.value}</div>
                <div
                  className="mt-4 text-[0.9375rem] font-medium"
                  style={{ color: "var(--color-petrol)" }}
                >
                  {n.label}
                </div>
                <div
                  className="mt-1 text-[0.8125rem]"
                  style={{ color: "var(--color-ink-500)", lineHeight: 1.5 }}
                >
                  {n.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO RESUMO */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Catálogo</div>
              <h2 className="h-section mt-6">Quatro categorias.<br />Um comprador.</h2>
              <p className="body-prose mt-8 max-w-md">
                Mix consolidado num único fornecedor. Categorias diferentes sem precisar
                gerenciar vários distribuidores.
              </p>
              <Link
                href="/verticais"
                className="btn-link mt-8 inline-flex"
              >
                Ver verticais completas
              </Link>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {site.verticals.map((v) => (
                  <li
                    key={v.slug}
                    className="py-7 grid grid-cols-12 gap-6 items-baseline"
                    style={{ borderColor: "var(--color-line)" }}
                  >
                    <div className="col-span-2 font-mono text-[0.875rem]" style={{ color: "var(--color-blue)" }}>
                      {v.number}
                    </div>
                    <div className="col-span-10">
                      <h3
                        className="font-display text-[1.25rem] md:text-[1.5rem]"
                        style={{ fontWeight: 500, letterSpacing: "-0.018em", color: "var(--color-petrol)" }}
                      >
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

      {/* FAQ */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Perguntas comuns</div>
              <h2 className="h-section mt-6">Antes de mandar<br />o CNPJ.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                {site.faq.map((item, i) => (
                  <li
                    key={i}
                    className="py-7 grid grid-cols-12 gap-6"
                    style={{ borderColor: "var(--color-line)" }}
                  >
                    <div className="col-span-12 md:col-span-5">
                      <h3
                        className="font-display text-[1.0625rem] md:text-[1.125rem]"
                        style={{ fontWeight: 500, color: "var(--color-petrol)", lineHeight: 1.3 }}
                      >
                        {item.q}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <p
                        className="text-[0.9375rem]"
                        style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}
                      >
                        {item.a}
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
        <div className="container-rp py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow">Próximo passo</div>
            <h2 className="h-section mt-6 mb-10" style={{ color: "var(--color-iced)" }}>
              Mande seu CNPJ pelo WhatsApp.<br />
              Devolvemos tabela em 24h.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp comercial
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-[0.9375rem] font-medium transition-colors"
                style={{ borderColor: "var(--color-iced)", color: "var(--color-iced)" }}
              >
                Formulário institucional
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
