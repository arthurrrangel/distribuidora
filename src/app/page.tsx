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

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="flex-1 flex flex-col">
        <Hero />

        {/* Banner de vantagens B2B */}
        <div className="bg-gradient-to-r from-[#03419A] to-[#0464D5] py-5 mt-2">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
              {[
                { emoji: "🚚", title: "Frete Grátis", sub: "pra todo CNPJ" },
                { emoji: "⚡", title: "Entrega 24h", sub: "nas principais cidades do RJ" },
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

        <div className="container mx-auto px-4">
          <ProductCarousel
            products={ofertasProducts}
            collection="ofertas-da-semana"
            title={ofertasInfo?.title ?? "Ofertas da Semana"}
          />
        </div>

        <Categories />

        <div className="container mx-auto px-4">
          <ProductCarousel
            products={destaques}
            collection="destaques"
            title={destaquesInfo?.title ?? "Destaques"}
          />

          <ProductCarousel
            products={escritorioProducts}
            collection="escritorio"
            title={escritorioInfo?.title ?? "Escritório"}
          />

          <ProductCarousel
            products={papelariaProducts}
            collection="papelaria"
            title={papelariaInfo?.title ?? "Papelaria"}
          />
        </div>

        <BrandShowcase />
        <WhyRepon />
        <TrustSection />
        <PartnerCTA />
      </div>

      <Footer />
      <MobileNavigator />
    </main>
  );
}
