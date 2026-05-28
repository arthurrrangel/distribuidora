import Link from "next/link";
import { site } from "@/lib/site";
import { SectionMarker } from "@/components/SectionMarker";

export default function NotFound() {
  return (
    <section className="section-petrol relative overflow-hidden" style={{ minHeight: "calc(100vh - 80px)" }}>
      <div className="container-rp pt-32 md:pt-48 pb-24 md:pb-32 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <SectionMarker number="404" label="Página não encontrada" variant="light" />
          </div>
          <h1 className="h-display mt-10" style={{ color: "var(--color-iced)" }}>
            Esta página não<br />existe mais.
          </h1>
          <p className="body-lead mt-10 max-w-xl mx-auto md:mx-0" style={{ color: "rgba(243,241,237,0.78)" }}>
            Pode ter sido movida, renomeada ou removida. O resto do site está no ar.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 sm:items-center justify-center md:justify-start">
            <Link href="/" className="btn-primary">Voltar pra home</Link>
            <Link href="/como-comprar" className="link-underline text-[0.9375rem] font-medium" style={{ color: "var(--color-blue-300)", padding: "1rem 0.5rem" }}>
              Ver como comprar →
            </Link>
          </div>
          <p className="mt-8 text-[0.75rem] font-mono tracking-[0.16em] uppercase" style={{ color: "rgba(243,241,237,0.5)" }}>
            Ou fale pelo WhatsApp · {site.contact.phone}
          </p>
        </div>
      </div>
    </section>
  );
}
