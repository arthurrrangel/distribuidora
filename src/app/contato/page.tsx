import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description: "Canal comercial Repon: e-mail institucional, WhatsApp, endereços dos centros logísticos.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-petrol">
        <div className="container-rp pt-20 md:pt-40 pb-20 md:pb-28">
          <div className="max-w-3xl">
            <div className="eyebrow">Contato institucional</div>
            <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
              Canal aberto para<br />
              <span style={{ color: "var(--color-blue-300)" }}>compradores B2B</span><br />
              e indústrias.
            </h1>
          </div>
        </div>
      </section>

      {/* CANAIS — lista */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Canais diretos</div>
              <h2 className="h-section mt-6">Três caminhos.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y" style={{ borderColor: "var(--color-line)" }}>
                <li className="py-7 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                  <div className="col-span-3 md:col-span-2 eyebrow">Comercial</div>
                  <div className="col-span-9 md:col-span-10">
                    <a href={`mailto:${site.contact.emails.comercial}`} className="font-display text-[1.0625rem] md:text-[1.25rem]" style={{ fontWeight: 500, color: "var(--color-petrol)" }}>
                      {site.contact.emails.comercial}
                    </a>
                    <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                      Cadastro PJ, proposta de representação, negociação direta.
                    </p>
                  </div>
                </li>
                <li className="py-7 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                  <div className="col-span-3 md:col-span-2 eyebrow">Pós-venda</div>
                  <div className="col-span-9 md:col-span-10">
                    <a href={`mailto:${site.contact.emails.sac}`} className="font-display text-[1.0625rem] md:text-[1.25rem]" style={{ fontWeight: 500, color: "var(--color-petrol)" }}>
                      {site.contact.emails.sac}
                    </a>
                    <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                      Pedido, NF, ocorrência logística, cobrança.
                    </p>
                  </div>
                </li>
                <li className="py-7 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                  <div className="col-span-3 md:col-span-2 eyebrow">WhatsApp</div>
                  <div className="col-span-9 md:col-span-10">
                    <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-display font-mono text-[1.0625rem] md:text-[1.25rem]" style={{ fontWeight: 500, color: "var(--color-petrol)" }}>
                      {site.contact.phone}
                    </a>
                    <p className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                      {site.contact.businessHours}.
                    </p>
                  </div>
                </li>
                <li className="py-7 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                  <div className="col-span-3 md:col-span-2 eyebrow">Instagram</div>
                  <div className="col-span-9 md:col-span-10">
                    <a href={site.contact.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-display text-[1.0625rem] md:text-[1.25rem]" style={{ fontWeight: 500, color: "var(--color-petrol)" }}>
                      {site.contact.social.instagram}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ENDEREÇOS — lista clean */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Centros logísticos</div>
              <h2 className="h-section mt-6">Onde estamos.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                {site.locations.map((loc) => (
                  <div key={loc.slug}>
                    <div className="eyebrow mb-3">{loc.role} · {loc.state}</div>
                    <h3 className="font-display text-[1.5rem]" style={{ fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-petrol)" }}>
                      {loc.city} / {loc.state}
                    </h3>
                    <p className="mt-4 text-[0.9375rem]" style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}>
                      {loc.address}<br />
                      CEP {loc.zip}
                    </p>
                    <p className="mt-4 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                      <span className="font-mono uppercase tracking-wider text-[0.6875rem]">Operação 3PL</span> · {loc.partner}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Formulário institucional</div>
              <h2 className="h-section mt-6">
                Abra conversa<br />com o comercial.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
