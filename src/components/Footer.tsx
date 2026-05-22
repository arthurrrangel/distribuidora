import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="section-petrol mt-32">
      <div className="container-rp py-20 md:py-24">
        {/* Slogan + logo */}
        <div className="pb-14 mb-14 border-b" style={{ borderColor: "var(--color-petrol-80)" }}>
          <Logo variant="white" shape="full" width={140} height={42} />
          <p
            className="mt-10 font-display"
            style={{
              fontWeight: 500,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.028em",
              color: "var(--color-iced)",
              maxWidth: "640px",
            }}
          >
            O fluxo que mantém<br/>seu negócio ativo.
          </p>
        </div>

        {/* Grid 3 colunas — institucional / contato / endereços */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-4">
            <div className="eyebrow mb-5" style={{ color: "var(--color-blue-300)" }}>Institucional</div>
            <ul className="flex flex-col gap-3 text-[0.9375rem]" style={{ color: "rgba(243,241,237,0.82)" }}>
              <li><Link href="/sobre" className="hover:text-iced">A Repon</Link></li>
              <li><Link href="/verticais" className="hover:text-iced">Verticais</Link></li>
              <li><Link href="/fornecedores" className="hover:text-iced">Fornecedores</Link></li>
              <li><Link href="/contato" className="hover:text-iced">Contato</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5" style={{ color: "var(--color-blue-300)" }}>Contato</div>
            <ul className="flex flex-col gap-3 text-[0.9375rem]" style={{ color: "rgba(243,241,237,0.82)" }}>
              <li><a href={`mailto:${site.contact.emails.comercial}`}>{site.contact.emails.comercial}</a></li>
              <li><a href={`mailto:${site.contact.emails.sac}`}>{site.contact.emails.sac}</a></li>
              <li className="font-mono text-[0.8125rem]" style={{ color: "rgba(243,241,237,0.7)" }}>{site.contact.phone}</li>
              <li><a href={site.contact.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.8125rem]">{site.contact.social.instagram}</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5" style={{ color: "var(--color-blue-300)" }}>Operação</div>
            <ul className="flex flex-col gap-3 text-[0.9375rem]" style={{ color: "rgba(243,241,237,0.82)" }}>
              {site.locations.map((l) => (
                <li key={l.slug}>
                  {l.city} / {l.state}
                  <span className="block text-[0.75rem] font-mono uppercase mt-0.5" style={{ color: "rgba(243,241,237,0.55)" }}>
                    3PL · {l.partner}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: "var(--color-petrol-80)" }}>
          <p className="text-[0.75rem]" style={{ color: "rgba(243,241,237,0.55)" }}>
            © {new Date().getFullYear()} {site.brand.legalName} · CNPJ {site.fiscal.matriz.cnpj}
          </p>
          <p className="text-[0.6875rem] font-mono tracking-wider uppercase" style={{ color: "rgba(243,241,237,0.45)" }}>
            Atacado B2B · Sudeste + Sul
          </p>
        </div>
      </div>
    </footer>
  );
}
