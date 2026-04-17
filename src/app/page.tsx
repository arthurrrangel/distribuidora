import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BrandShowcase } from "@/components/BrandShowcase";
import { WhyRepon } from "@/components/WhyRepon";
import { PartnerCTA } from "@/components/PartnerCTA";
import { TrustSection } from "@/components/TrustSection";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import {
  getProductsByCollection,
  getCollectionInfo,
} from "@/services/productService";

export default async function Home() {
  const [
    { products: ofertasProducts },
    ofertasInfo,
    { products: destaques },
    destaquesInfo,
    { products: escritorioProducts },
    escritorioInfo,
    { products: papelariaProducts },
    papelariaInfo,
  ] = await Promise.all([
    getProductsByCollection("ofertas-da-semana"),
    getCollectionInfo("ofertas-da-semana"),
    getProductsByCollection("destaques"),
    getCollectionInfo("destaques"),
    getProductsByCollection("escritorio"),
    getCollectionInfo("escritorio"),
    getProductsByCollection("papelaria"),
    getCollectionInfo("papelaria"),
  ]);

  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Vim pelo site da Repon e quero fazer meu primeiro pedido!")}`;

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="flex-1 flex flex-col">
        {/* Hero com value props e CTAs */}
        <Hero />

        {/* Banner de vantagens B2B — estilo Praso */}
        <div className="bg-gradient-to-r from-[#03419A] to-[#0464D5] py-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
              {[
                { emoji: "🚚", title: "Frete Grátis", sub: "pra todo CNPJ" },
                { emoji: "⚡", title: "Entrega 24h", sub: "principais cidades do RJ" },
                { emoji: "🧾", title: "Nota Fiscal", sub: "em 100% dos pedidos" },
                { emoji: "💬", title: "WhatsApp", sub: "seg. a sáb. das 9h às 18h" },
              ].map(({ emoji, title, sub }) => (
                <div key={title} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{emoji}</span>
                  <p className="font-extrabold text-sm leading-tight">{title}</p>
                  <p className="text-blue-200 text-[11px] leading-tight">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ofertas da Semana */}
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={ofertasProducts}
            collection="ofertas-da-semana"
            title={ofertasInfo?.title ?? "Ofertas da Semana"}
          />
        </div>

        {/* Categorias */}
        <Categories />

        {/* Destaques */}
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={destaques}
            collection="destaques"
            title={destaquesInfo?.title ?? "Destaques"}
          />
        </div>

        {/* Escritório */}
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={escritorioProducts}
            collection="escritorio"
            title={escritorioInfo?.title ?? "Escritório"}
          />
        </div>

        {/* Papelaria */}
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={papelariaProducts}
            collection="papelaria"
            title={papelariaInfo?.title ?? "Papelaria"}
          />
        </div>

        {/* Marcas parceiras */}
        <BrandShowcase />

        {/* Por que Repon */}
        <WhyRepon />

        {/* Prova social — estilo Praso "10.000+ empreendedores" */}
        <section className="bg-[#0464D5] py-10 text-center text-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <p className="text-3xl md:text-4xl font-extrabold mb-2">
              200+ empresas confiam na Repon
            </p>
            <p className="text-blue-200 text-sm mb-6">
              para abastecer seus estoques de papelaria e escritório no Rio de Janeiro.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09610] text-gray-900 font-bold px-8 py-3.5 rounded-lg text-base transition-colors shadow-lg"
            >
              Criar uma conta grátis →
            </a>
            <p className="text-blue-300 text-xs mt-3">Sem mensalidade · Sem pedido mínimo · Frete grátis</p>
          </div>
        </section>

        {/* Depoimentos */}
        <TrustSection />

        {/* CTA Parceiros */}
        <PartnerCTA />

        {/* WhatsApp primeira compra — estilo Praso */}
        <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-2 pointer-events-none">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-4 py-2 rounded-full shadow-xl text-xs transition-all hover:scale-105 active:scale-95"
          >
            <svg viewBox="0 0 32 32" fill="white" className="w-4 h-4 shrink-0">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.482.672 4.808 1.845 6.805L2 30l7.418-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.32 19.388c-.347-.174-2.054-1.014-2.373-1.13-.32-.116-.553-.174-.786.174-.232.347-.9 1.13-1.103 1.362-.203.232-.406.26-.753.087-.347-.174-1.466-.54-2.793-1.722-1.032-.92-1.728-2.056-1.93-2.403-.204-.347-.022-.534.152-.707.157-.155.347-.406.52-.609.174-.203.232-.347.347-.579.116-.232.058-.434-.029-.608-.087-.174-.786-1.894-1.077-2.594-.283-.68-.57-.587-.786-.598l-.669-.012c-.232 0-.608.087-.927.434-.319.347-1.218 1.19-1.218 2.9s1.247 3.365 1.42 3.597c.174.232 2.452 3.746 5.943 5.253.83.358 1.479.572 1.984.732.833.265 1.591.228 2.19.138.668-.1 2.054-.84 2.345-1.652.29-.811.29-1.507.203-1.652-.087-.145-.319-.232-.667-.406z"/>
            </svg>
            <div className="leading-tight">
              <p className="font-extrabold text-[11px]">Primeira compra?</p>
              <p className="font-normal text-[10px] opacity-90">Fale com a gente!</p>
            </div>
          </a>
        </div>
      </div>

      <Footer />
      <MobileNavigator />
    </main>
  );
}
