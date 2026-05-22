import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Canal comercial Repon: e-mail institucional, WhatsApp comercial, endereços dos centros logísticos em SC e SP.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line">
        <div className="container-rp pt-24 md:pt-32 pb-20">
          <div className="eyebrow">Contato institucional</div>
          <h1 className="h-display mt-6 max-w-3xl">
            Canal aberto para<br />
            <span className="text-ink-500">compradores B2B,</span><br />
            indústrias e parceiros.
          </h1>
        </div>
      </section>

      {/* CANAIS */}
      <section>
        <div className="container-rp py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line border border-line">
            {/* Comercial */}
            <a
              href={`mailto:${site.contact.emails.comercial}`}
              className="bg-paper p-8 md:p-10 flex flex-col gap-5 hover:bg-paper-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="eyebrow text-accent">Comercial</div>
                <ArrowRight className="opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="h-card">Atendimento B2B</h3>
              <p className="text-[1.0625rem] text-ink font-medium break-all">
                {site.contact.emails.comercial}
              </p>
              <p className="text-[0.8125rem] text-ink-500 leading-snug">
                Cadastro de revendedor PJ, proposta de representação,
                negociação direta.
              </p>
            </a>

            {/* SAC */}
            <a
              href={`mailto:${site.contact.emails.sac}`}
              className="bg-paper p-8 md:p-10 flex flex-col gap-5 hover:bg-paper-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="eyebrow text-accent">Pós-venda</div>
                <ArrowRight className="opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="h-card">SAC</h3>
              <p className="text-[1.0625rem] text-ink font-medium break-all">
                {site.contact.emails.sac}
              </p>
              <p className="text-[0.8125rem] text-ink-500 leading-snug">
                Acompanhamento de pedido, NF, ocorrência logística,
                cobrança.
              </p>
            </a>

            {/* WhatsApp */}
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-paper p-8 md:p-10 flex flex-col gap-5 hover:bg-paper-50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="eyebrow text-accent">Direto</div>
                <ArrowRight className="opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="h-card">WhatsApp comercial</h3>
              <p className="text-[1.0625rem] text-ink font-medium font-mono">
                {site.contact.phone}
              </p>
              <p className="text-[0.8125rem] text-ink-500 leading-snug">
                {site.contact.businessHours}.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO + ENDEREÇOS */}
      <section className="bg-paper-100 border-y border-line">
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <div className="eyebrow">Formulário institucional</div>
              <h2 className="h-section mt-5 mb-10">
                Abra conversa<br />
                com o comercial.
              </h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <div className="eyebrow">Endereços</div>
              <h2 className="h-section mt-5 mb-10">
                Centros<br />logísticos.
              </h2>

              <div className="space-y-8">
                {site.locations.map((loc) => (
                  <div
                    key={loc.slug}
                    className="card-hairline p-7"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="eyebrow text-accent">
                        {loc.role}
                      </span>
                      <span className="font-mono text-[0.6875rem] text-ink-500 tracking-wider">
                        {loc.state}
                      </span>
                    </div>
                    <h3 className="h-card mb-2">
                      {loc.city} / {loc.state}
                    </h3>
                    <p className="text-[0.9375rem] text-ink-600 leading-relaxed">
                      {loc.address}<br />
                      CEP {loc.zip}
                    </p>
                    <div className="mt-4 pt-4 border-t border-line">
                      <p className="text-[0.8125rem] text-ink-500">
                        <span className="font-mono uppercase tracking-wider text-[0.6875rem]">Operação 3PL · </span>
                        <span className="text-ink">{loc.partner}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-line">
                <div className="eyebrow mb-3">CNPJ</div>
                <p className="font-mono text-[0.8125rem] text-ink leading-relaxed">
                  Matriz · {site.fiscal.matriz.cnpj}<br />
                  Filial · {site.fiscal.filial.cnpj}
                </p>
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
