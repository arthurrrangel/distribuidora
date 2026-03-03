import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BrandCarousel } from "@/components/BrandCarousel";
import { BrandShowcase } from "@/components/BrandShowcase";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import {
  getProductsByCollection,
  getCollectionInfo,
  searchProducts,
} from "@/services/productService";

export default async function Home() {
  const [
    { products: destaques },
    destaquesInfo,
    { products: escritorioProducts },
    escritorioInfo,
    { products: papelariaProducts },
    papelariaInfo,
    { products: filimailProducts },
    { products: filipaperProducts },
    { products: usapelProducts },
    { products: ofertasProducts },
    ofertasInfo,
  ] = await Promise.all([
    getProductsByCollection("destaques"),
    getCollectionInfo("destaques"),
    getProductsByCollection("escritorio"),
    getCollectionInfo("escritorio"),
    getProductsByCollection("papelaria"),
    getCollectionInfo("papelaria"),
    searchProducts("", { query: "vendor:Filimail" }),
    searchProducts("", { query: "vendor:Filipaper" }),
    searchProducts("", { query: "vendor:Usapel" }),
    getProductsByCollection("ofertas-da-semana"),
    getCollectionInfo("ofertas-da-semana"),
  ]);

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <Header />
      <div className="flex-1 flex flex-col px-12">
        <Hero />
        <div className="container mx-auto px-4">
          <ProductCarousel
            products={ofertasProducts}
            collection="ofertas-da-semana"
            title={ofertasInfo?.title ?? "Ofertas da Semana"}
          />
        </div>

        <Categories />

        <BrandShowcase />

        <div className="container mx-auto px-4">
          <ProductCarousel
            products={destaques}
            collection="destaques"
            title={destaquesInfo?.title ?? "Destaques"}
          />
          <BrandCarousel
            products={filimailProducts}
            vendor="Filimail"
            brandName="Filimail"
            brandDescription="Os melhores produtos da marca Filimail"
            brandLogo=""
            brandBanner="https://executiva.net/wp-content/uploads/2018/04/tiposdepapeissite.jpg"
          />

          <ProductCarousel
            products={escritorioProducts}
            collection="escritorio"
            title={escritorioInfo?.title ?? "Escritório"}
          />
          <BrandCarousel
            products={filipaperProducts}
            vendor="Filipaper"
            brandName="Filipaper"
            brandDescription="Os melhores produtos da marca Filipaper"
            brandLogo=""
            brandBanner="https://i.pinimg.com/originals/08/44/f0/0844f023d79685a962eb98fba5d10c9f.jpg"
          />

          <ProductCarousel
            products={papelariaProducts}
            collection="papelaria"
            title={papelariaInfo?.title ?? "Papelaria"}
          />

          <BrandCarousel
            products={usapelProducts}
            vendor="Usapel"
            brandName="Usapel"
            brandDescription="Os melhores produtos da marca Usapel"
            brandLogo=""
            brandBanner="https://ggpel.cdn.magazord.com.br/img/2025/11/produto/69728/image-2025-11-19t164656-151.jpg?ims=fit-in/600x600/filters:fill(white)"
          />
        </div>
      </div>

      <Footer />
      <MobileNavigator />
    </main>
  );
}
