import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="section-petrol mt-32" style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
      <div className="container-rp py-24 md:py-28">
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
            O fluxo que mantém<br />seu negócio ativo.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-1 hidden md:block">
              <div className="h-px w-12 mt-3" style={{ background: "var(--color-blue-300)", opacity: 0.6 }} aria-hidden />
            </div>
            <div className="md:col-span-7">
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.005em",
                  fontWeight: 400,
                  color: "rgba(243,241,237,0.78)",
                  fontStyle: "italic",
                }}
              >
                A Repon nasceu pra atender o revendedor pequeno e médio que estava esquecido entre o marketplace genérico e a distribuidora grande. A tese é simples: condição comercial coerente, atendimento humano e política que protege quem vende e quem fabrica.
              </p>
              <p className="mt-5 font-mono text-[0.6875rem] tracking-[0.22em] uppercase" style={{ color: "rgba(243,241,237,0.5)" }}>
                — A equipe Repon · Navegantes/SC + São Paulo/SP
              </p>
            </div>
          </div>
        </div>

        {/* Grid 4 colunas — institucional, comercial, jurídico, operação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 mb-14">
          

          <div className="md:col-span-4">
            <div className="eyebrow mb-5" style={{ color: "var(--color-blue-300)" }}>Comercial</div>
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              <li><a href={`mailto:${site.contact.emails.comercial}`} className="footer-link">{site.contact.emails.comercial}</a></li>
              <li><a href={`mailto:${site.contact.emails.sac}`} className="footer-link">{site.contact.emails.sac}</a></li>
              <li className="font-mono text-[0.8125rem]" style={{ color: "rgba(243,241,237,0.7)" }}>{site.contact.phone}</li>
              <li><a href={site.contact.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link font-mono text-[0.8125rem]">{site.contact.social.instagram}</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5" style={{ color: "var(--color-blue-300)" }}>Jurídico</div>
            <ul className="flex flex-col gap-3 text-[0.9375rem]">
              <li><Link href="/transparencia" className="footer-link">Transparência</Link></li>
              <li><Link href="/politica-privacidade" className="footer-link">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="footer-link">Termos de Uso</Link></li>
              <li><Link href="/politica-cookies" className="footer-link">Política de Cookies</Link></li>
              <li><a href={`mailto:${site.contact.emails.dpo}`} className="footer-link font-mono text-[0.8125rem]">{site.contact.emails.dpo}</a></li>
              <li><a href={`mailto:${site.contact.emails.ouvidoria}`} className="footer-link font-mono text-[0.8125rem]">{site.contact.emails.ouvidoria}</a></li>
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
