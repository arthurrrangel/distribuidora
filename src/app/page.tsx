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
