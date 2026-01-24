import { getProductsByCollection } from "@/services/productService";
import { ProductCarousel } from "./ProductCarousel";

export async function ProductGrid() {
  // Busca os produtos da coleção
  const { products } = await getProductsByCollection("destaques");

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Passamos os produtos para o componente Cliente */}
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
