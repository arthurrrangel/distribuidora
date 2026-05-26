import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { SectionMarker } from "@/components/SectionMarker";

export const metadata: Metadata = {
  title: "Transparência",
  description:
    "Dados institucionais consolidados da Repon: CNPJ, sede, política comercial, ouvidoria, encarregado de proteção de dados e documentos jurídicos.",
  alternates: { canonical: "/transparencia" },
};

export default function TransparenciaPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-petrol">
        <div className="container-rp pt-20 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <SectionMarker number="T0" label="Página institucional" variant="light" />
            <h1 className="h-display mt-8" style={{ color: "var(--color-iced)" }}>
              Transparência.
            </h1>
            <p
              className="body-lead mt-8 max-w-2xl"
              style={{ color: "rgba(243,241,237,0.78)" }}
            >
              Dados institucionais, jurídicos e operacionais consolidados em um
              único lugar. Atualizado em maio de 2026.
            </p>
          </div>
        </div>
      </section>

      {/* IDENTIFICAÇÃO */}
      <section style={{ background: "var(--color-iced)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Identificação</div>
              <h2 className="h-section mt-6">Dados<br />institucionais.</h2>
            </div>
            <div className="lg:col-span-8">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <dt className="eyebrow mb-2.5">Razão social</dt>
                  <dd className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                    {site.brand.legalName}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Nome fantasia</dt>
                  <dd className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                    {site.brand.name}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Natureza jurídica</dt>
                  <dd className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                    Sociedade Empresária Limitada
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Fundação</dt>
                  <dd className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.matriz.abertura}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNPJ Matriz · SC</dt>
                  <dd className="font-mono text-[0.9375rem]" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.matriz.cnpj}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNPJ Filial · SP</dt>
                  <dd className="font-mono text-[0.9375rem]" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.filial.cnpj}
                  </dd>
                  <dd className="text-[0.8125rem] mt-1" style={{ color: "var(--color-ink-500)" }}>
                    Aberta em {site.fiscal.filial.abertura}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CCM Filial SP</dt>
                  <dd className="font-mono text-[0.9375rem]" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.filial.ccm}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNAE principal</dt>
                  <dd className="font-mono text-[0.8125rem] leading-snug" style={{ color: "var(--color-ink-700)" }}>
                    {site.fiscal.cnaePrincipal.code}
                  </dd>
                  <dd className="text-[0.8125rem] mt-1.5 leading-snug" style={{ color: "var(--color-ink-500)" }}>
                    {site.fiscal.cnaePrincipal.label}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">CNAEs registradas</dt>
                  <dd className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                    {site.fiscal.cnaeTotalCount} no total
                  </dd>
                  <dd className="text-[0.8125rem] mt-1" style={{ color: "var(--color-ink-500)" }}>
                    {site.fiscal.cnaeAtacadoCount} de atacado
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* SEDES */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Sedes</div>
              <h2 className="h-section mt-6">Endereços<br />operacionais.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y border-y" style={{ borderColor: "var(--color-line)" }}>
                {site.locations.map((l) => (
                  <li key={l.slug} className="py-7 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                    <div className="col-span-3">
                      <div className="eyebrow">{l.role}</div>
                      <p className="text-[0.8125rem] mt-1" style={{ color: "var(--color-ink-500)" }}>
                        {l.label}
                      </p>
                    </div>
                    <div className="col-span-9">
                      <p className="text-[1.0625rem] font-bold leading-snug" style={{ color: "var(--color-petrol)" }}>
                        {l.city} / {l.state}
                      </p>
                      <p className="mt-2 text-[0.9375rem]" style={{ color: "var(--color-ink-700)", lineHeight: 1.55 }}>
                        {l.address}
                      </p>
                      <p className="mt-1.5 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                        CEP {l.zip} · Operação 3PL com {l.partner}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CANAIS OFICIAIS */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Canais oficiais</div>
              <h2 className="h-section mt-6">Quem fala<br />pela Repon.</h2>
            </div>
            <div className="lg:col-span-8">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <dt className="eyebrow mb-2.5">Comercial</dt>
                  <dd className="text-[0.9375rem]">
                    <a
                      href={`mailto:${site.contact.emails.comercial}`}
                      className="link-underline"
                      style={{ color: "var(--color-petrol)" }}
                    >
                      {site.contact.emails.comercial}
                    </a>
                  </dd>
                  <dd className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                    Cadastro PJ, pedido, tabela, devolução.
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">SAC</dt>
                  <dd className="text-[0.9375rem]">
                    <a
                      href={`mailto:${site.contact.emails.sac}`}
                      className="link-underline"
                      style={{ color: "var(--color-petrol)" }}
                    >
                      {site.contact.emails.sac}
                    </a>
                  </dd>
                  <dd className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                    Pós-venda, NF, prazo, problemas operacionais.
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Ouvidoria</dt>
                  <dd className="text-[0.9375rem]">
                    <a
                      href="mailto:ouvidoria@repondistribuidora.com"
                      className="link-underline"
                      style={{ color: "var(--color-petrol)" }}
                    >
                      ouvidoria@repondistribuidora.com
                    </a>
                  </dd>
                  <dd className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                    Reclamação não resolvida pelo SAC. Resposta em até 10 dias úteis.
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Encarregado (DPO)</dt>
                  <dd className="text-[0.9375rem]">
                    <a
                      href="mailto:dpo@repondistribuidora.com"
                      className="link-underline"
                      style={{ color: "var(--color-petrol)" }}
                    >
                      dpo@repondistribuidora.com
                    </a>
                  </dd>
                  <dd className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                    Exercício dos direitos LGPD. Resposta em até 15 dias úteis.
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">WhatsApp comercial</dt>
                  <dd className="font-mono text-[0.9375rem]" style={{ color: "var(--color-petrol)" }}>
                    {site.contact.phone}
                  </dd>
                  <dd className="mt-1 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                    Segunda a sexta, 8h às 18h.
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Instagram oficial</dt>
                  <dd className="text-[0.9375rem]">
                    <a
                      href={site.contact.social.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-mono"
                      style={{ color: "var(--color-petrol)" }}
                    >
                      {site.contact.social.instagram}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTOS */}
      <section style={{ background: "var(--color-iced-warm)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Documentos</div>
              <h2 className="h-section mt-6">Política<br />e termos.</h2>
              <p className="body-prose mt-6 max-w-md">
                Documentação jurídica pública. Versões atualizadas, com data de
                vigência visível em cada documento.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y border-y" style={{ borderColor: "var(--color-line)" }}>
                {[
                  { href: "/politica-privacidade", label: "Política de Privacidade", sub: "LGPD compliance · Lei 13.709/2018", code: "P1" },
                  { href: "/termos", label: "Termos de Uso", sub: "Condições de uso do site e contratação", code: "T1" },
                  { href: "/politica-cookies", label: "Política de Cookies", sub: "Cookies essenciais e analíticos", code: "C1" },
                  { href: "/fornecedores", label: "Política Comercial e MAP", sub: "Para indústrias e marcas", code: "M1" },
                ].map((doc) => (
                  <li key={doc.href} className="py-7 grid grid-cols-12 gap-6 items-baseline" style={{ borderColor: "var(--color-line)" }}>
                    <div className="col-span-2 font-mono text-[0.875rem]" style={{ color: "var(--color-blue)" }}>
                      {doc.code}
                    </div>
                    <div className="col-span-10">
                      <Link
                        href={doc.href}
                        className="link-underline font-display text-[1.125rem] md:text-[1.25rem]"
                        style={{ fontWeight: 500, letterSpacing: "-0.02em", color: "var(--color-petrol)" }}
                      >
                        {doc.label}
                      </Link>
                      <p className="mt-1.5 text-[0.8125rem]" style={{ color: "var(--color-ink-500)" }}>
                        {doc.sub}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COBERTURA */}
      <section style={{ background: "var(--color-iced)", borderTop: "1px solid var(--color-line)" }}>
        <div className="container-rp py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">Área de atuação</div>
              <h2 className="h-section mt-6">Cobertura<br />geográfica.</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="body-prose mb-8 max-w-2xl">
                A Repon opera em sete estados das regiões Sudeste e Sul. Cada
                pedido é despachado do centro logístico mais próximo do destino.
              </p>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {site.coverage.states.map((s) => (
                  <li
                    key={s}
                    className="card-hairline px-5 py-4 text-center font-mono text-[0.9375rem]"
                    style={{ color: "var(--color-petrol)" }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
