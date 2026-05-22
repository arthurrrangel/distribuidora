import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="section-petrol mt-32">
      <div className="container-rp py-20">
        {/* Top — slogan oficial */}
        <div className="pb-16 border-b border-petrol-80" style={{ borderColor: "var(--color-petrol-80)" }}>
          <Logo variant="white" shape="full" width={180} height={54} />
          <p
            className="mt-10 font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "var(--color-iced)",
              maxWidth: "720px",
            }}
          >
            O fluxo que mantém<br/>seu negócio ativo.
          </p>
        </div>

        {/* Navegação + contato */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b" style={{ borderColor: "var(--color-petrol-80)" }}>
          <div className="md:col-span-5">
            <p className="text-[0.9375rem] leading-relaxed max-w-md" style={{ color: "rgba(243,241,237,0.75)" }}>
              {site.brand.legalName}. Distribuidora atacadista B2B com operação logística integrada em
              Santa Catarina e São Paulo, atendendo revendedores em todo o Sudeste e Sul.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-[0.8125rem] font-mono" style={{ color: "rgba(243,241,237,0.55)" }}>
              <span>CNPJ Matriz: {site.fiscal.matriz.cnpj}</span>
              <span>CNPJ Filial: {site.fiscal.filial.cnpj}</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5" style={{ color: "var(--color-blue-300)" }}>Institucional</div>
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              <li><Link href="/sobre"        className="hover:opacity-100 transition-opacity" style={{ color: "rgba(243,241,237,0.85)" }}>A Repon</Link></li>
              <li><Link href="/verticais"    className="hover:opacity-100 transition-opacity" style={{ color: "rgba(243,241,237,0.85)" }}>Verticais</Link></li>
              <li><Link href="/fornecedores" className="hover:opacity-100 transition-opacity" style={{ color: "rgba(243,241,237,0.85)" }}>Para Fornecedores</Link></li>
              <li><Link href="/contato"      className="hover:opacity-100 transition-opacity" style={{ color: "rgba(243,241,237,0.85)" }}>Contato</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5" style={{ color: "var(--color-blue-300)" }}>Contato</div>
            <ul className="flex flex-col gap-3 text-[0.9375rem]" style={{ color: "rgba(243,241,237,0.85)" }}>
              <li><a href={`mailto:${site.contact.emails.comercial}`} className="hover:opacity-100">{site.contact.emails.comercial}</a></li>
              <li><a href={`mailto:${site.contact.emails.sac}`}       className="hover:opacity-100">{site.contact.emails.sac}</a></li>
              <li className="font-mono text-[0.8125rem]" style={{ color: "rgba(243,241,237,0.7)" }}>{site.contact.phone}</li>
              <li>
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border-b pb-px hover:opacity-100"
                  style={{ borderColor: "rgba(243,241,237,0.4)" }}
                >
                  WhatsApp comercial
                </a>
              </li>
              <li className="font-mono text-[0.8125rem]" style={{ color: "rgba(243,241,237,0.7)" }}>{site.contact.social.instagram}</li>
            </ul>
          </div>
        </div>

        {/* Endereços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-b" style={{ borderColor: "var(--color-petrol-80)" }}>
          {site.locations.map((loc) => (
            <div key={loc.slug}>
              <div className="eyebrow mb-3" style={{ color: "var(--color-blue-300)" }}>
                {loc.label} · {loc.role}
              </div>
              <h3 className="h-card mb-2" style={{ color: "var(--color-iced)" }}>
                {loc.city} / {loc.state}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed" style={{ color: "rgba(243,241,237,0.75)" }}>
                {loc.address}<br/>CEP {loc.zip}
              </p>
              <p className="mt-3 text-[0.8125rem] font-mono" style={{ color: "rgba(243,241,237,0.55)" }}>
                Operação 3PL · {loc.partner}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[0.8125rem]" style={{ color: "rgba(243,241,237,0.5)" }}>
            © {new Date().getFullYear()} {site.brand.legalName}. Todos os direitos reservados.
          </p>
          <p className="text-[0.75rem] font-mono tracking-wider uppercase" style={{ color: "rgba(243,241,237,0.4)" }}>
            Atacado B2B · Sudeste + Sul
          </p>
        </div>
      </div>
    </footer>
  );
}
