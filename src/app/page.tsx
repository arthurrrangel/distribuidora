// src/app/page.tsx
// Home Repon v2 — startup + comércio.
// Hero tipográfico → marquee marcas → catálogo editorial → produtos → manifesto → CTA.

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import {
  getProductsByCollection,
  getCollectionInfo,
} from "@/services/productService";
import Link from "next/link";

const BRANDS = [
  "FILIPAPER",
  "FILIMAIL",
  "USAPEL",
  "SPIRAL",
  "BIC",
  "TILIBRA",
  "FABER-CASTELL",
  "PILOT",
  "STAEDTLER",
  "PAPER MATE",
];

export default async function Home() {
  // Carrega em paralelo — falha silenciosa se Shopify estiver fora.
  const [
    { products: ofertasProducts },
    ofertasInfo,
    { products: destaques },
    destaquesInfo,
  ] = await Promise.all([
    getProductsByCollection("ofertas-da-semana"),
    getCollectionInfo("ofertas-da-semana"),
    getProductsByCollection("destaques"),
    getCollectionInfo("destaques"),
  ]);

  return (
    <main className="min-h-screen bg-paper flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="flex-1 flex flex-col">
        {/* HERO */}
        <Hero />

        {/* MARQUEE DE MARCAS */}
        <div className="border-y hairline bg-paper-100 py-6 md:py-7 overflow-hidden">
          <div className="marquee-track text-ink-400 text-sm font-mono opacity-70">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="flex items-center gap-16 shrink-0">
                <span>{brand}</span>
                <span>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* CATÁLOGO EDITORIAL */}
        <Categories />

        {/* PRODUTOS EM DESTAQUE */}
        {(ofertasProducts.length > 0 || destaques.length > 0) && (
          <section className="bg-paper-100 border-y hairline">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-16 md:pb-20">
              <div className="flex items-end justify-between mb-10 md:mb-12 gap-6">
                <div>
                  <p className="label text-ink-500">§ 02 · Em destaque</p>
                  <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mt-5">
                    {ofertasProducts.length > 0
                      ? ofertasInfo?.title || "Vai esgotar."
                      : destaquesInfo?.title || "Pra começar."}
                  </h2>
                </div>
              </div>
            </div>
            <ProductCarousel
              products={
                ofertasProducts.length > 0 ? ofertasProducts : destaques
              }
            />
          </section>
        )}

        {/* MANIFESTO */}
        <section className="bg-ink text-paper">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-32 md:py-40">
            <p className="label text-ink-500">§ 03 · Quem usa</p>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tightest mt-6 max-w-4xl">
              Papelarias e escolas que
              cansaram <span className="italic font-light text-ink-400">
                de esperar.
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 mt-16 md:mt-24 border-t border-ink-800">
              <div className="md:border-r border-ink-800 py-10 md:py-12 md:pr-8">
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tightest">
                  200<span className="text-ink-500">+</span>
                </p>
                <p className="font-mono text-[10px] md:text-xs text-ink-400 mt-4">
                  PAPELARIAS · ESCOLAS · ESCRITÓRIOS
                </p>
              </div>
              <div className="md:border-r border-ink-800 py-10 md:py-12 md:px-8">
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tightest">
                  24<span className="text-ink-500">h</span>
                </p>
                <p className="font-mono text-[10px] md:text-xs text-ink-400 mt-4">
                  PEDIDO ATÉ 14H, RECEBE NO DIA SEGUINTE
                </p>
              </div>
              <div className="md:border-r border-ink-800 py-10 md:py-12 md:px-8 border-t md:border-t-0 border-ink-800">
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tightest">
                  100<span className="text-ink-500">%</span>
                </p>
                <p className="font-mono text-[10px] md:text-xs text-ink-400 mt-4">
                  NOTA FISCAL EM TODO PEDIDO
                </p>
              </div>
              <div className="py-10 md:py-12 md:pl-8 border-t md:border-t-0 border-ink-800">
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tightest">
                  0<span className="text-ink-500">.</span>
                </p>
                <p className="font-mono text-[10px] md:text-xs text-ink-400 mt-4">
                  MÍNIMO · COMPRA 1 OU 1000
                </p>
              </div>
            </div>

            <figure className="mt-20 md:mt-32 max-w-3xl">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight">
                &ldquo;Pedi quarta às 11h.
                <span className="font-bold"> Chegou quinta às 9h.</span>
                Filipaper que minha papelaria gastava três dias pra repor.
                Mudou meu fluxo.&rdquo;
              </p>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <div className="w-10 h-10 prod-b rounded-full"></div>
                <div>
                  <p className="font-semibold text-paper">Marcos Andrade</p>
                  <p className="font-mono text-xs text-ink-400">
                    PAPELARIA CENTRAL · RIO DE JANEIRO
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-paper">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-32 md:py-40 text-center">
            <p className="label text-ink-500">§ 04 · Começar</p>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tightest mt-8">
              Cadastra o CNPJ.<br />
              <span className="italic font-light">O resto a gente acelera.</span>
            </h2>
            <div className="mt-12 md:mt-14 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
              <Link
                href="/register"
                className="h-14 px-8 bg-ink text-paper text-sm font-semibold hover:bg-accent transition-colors duration-300 flex items-center gap-3"
              >
                Criar conta
                <span className="font-mono">→</span>
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491"}?text=${encodeURIComponent("Vim pelo site da Repon e quero fazer meu primeiro pedido!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold ul-anim"
              >
                Falar pelo WhatsApp
              </a>
            </div>
            <p className="font-mono text-[11px] text-ink-400 mt-10">
              SEM MENSALIDADE · SEM MÍNIMO · CANCELA QUANDO QUISER
            </p>
          </div>
        </section>
      </div>

      <Footer />
      <MobileNavigator />
    </main>
  );
}
