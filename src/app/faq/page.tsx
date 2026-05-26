import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Accordion } from "@/components/Accordion";
import { SectionMarker } from "@/components/SectionMarker";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Perguntas frequentes sobre cadastro, pedido, prazo, pagamento, frete, devolução e política comercial da Repon.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <section className="section-petrol">
        <div className="container-rp pt-20 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <SectionMarker number="07" label="FAQ" variant="light" />
            <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
              Perguntas frequentes.
            </h1>
            <p
              className="body-lead mt-8 max-w-2xl"
              style={{ color: "rgba(243,241,237,0.78)" }}
            >
              Tudo o que comprador atacadista costuma perguntar antes de mandar o
              primeiro CNPJ. Se sua dúvida não está aqui, chama no WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {site.faqCategories.map((cat) => (
        <section
          key={cat.id}
          id={cat.id}
          style={{
            background: "var(--color-iced)",
            borderTop: "1px solid var(--color-line)",
          }}
        >
          <div className="container-rp py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="eyebrow">{cat.label}</div>
                <h2 className="h-section mt-6">{cat.title}</h2>
              </div>
              <div className="lg:col-span-8">
                <div>
                  {cat.items.map((item, i) => (
                    <Accordion
                      key={i}
                      question={item.q}
                      defaultOpen={cat.id === "comercial" && i === 0}
                    >
                      <p>{item.a}</p>
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-petrol">
        <div className="container-rp py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="eyebrow">Não achou sua dúvida?</div>
            <h2
              className="h-section mt-6 mb-10"
              style={{ color: "var(--color-iced)" }}
            >
              Manda no WhatsApp.<br />
              Respondemos em 24h úteis.
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
                style={{
                  borderColor: "var(--color-iced)",
                  color: "var(--color-iced)",
                }}
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
