import { getProductsByCollection } from "@/services/productService";
import { ProductCarousel } from "./ProductCarousel";

export async function ProductGrid() {
  // Busca os produtos da coleção
  const { products } = await getProductsByCollection("destaques");
  console.log(products);
  if (!products || products.length === 0) return null;

  return (
    <section className="pt-0 md:pt-4 pb-0 md:pb-12 -mt-2 md:mt-0">
      <div className="container mx-auto px-4">
        {/* Passamos os produtos para o componente Cliente */}
        <ProductCarousel
          products={products}
          title="Destaques"
          collection="destaques"
        />
      </div>
    </section>
  );
}
