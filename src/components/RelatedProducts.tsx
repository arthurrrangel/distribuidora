import { getProductRecommendations } from "@/services/productService";
import { ProductCard } from "@/components/ProductCard";

interface RelatedProductsProps {
  productId: string;
  currentHandle: string;
}

export async function RelatedProducts({
  productId,
  currentHandle,
}: RelatedProductsProps) {
  const recommendations = await getProductRecommendations(productId);

  // Remove o produto atual e limita a 6
  const filtered = recommendations
    .filter((p) => p.handle !== currentHandle)
    .slice(0, 6);

  if (filtered.length === 0) return null;

  return (
    <section className="border-t border-gray-100 pt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-bold text-[#0464D5] uppercase tracking-widest mb-1">
            Você também pode gostar
          </p>
          <h2 className="text-xl font-extrabold text-gray-900">
            Produtos Relacionados
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((product) => {
          const firstVariant = product.variants.edges[0]?.node;
          const price = firstVariant
            ? parseFloat(firstVariant.price.amount)
            : parseFloat(product.priceRange.minVariantPrice.amount);
          const originalPrice = firstVariant?.compareAtPrice
            ? parseFloat(firstVariant.compareAtPrice.amount)
            : product.compareAtPriceRange
            ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
            : undefined;
          const imageUrl = product.images.edges[0]?.node.url || null;

          return (
            <ProductCard
              key={product.id}
              id={firstVariant?.id || product.id}
              productId={product.id}
              handle={product.handle}
              title={product.title}
              price={price}
              originalPrice={originalPrice}
              image={imageUrl}
              coverInfo={product.coverInfo?.value}
            />
          );
        })}
      </div>
    </section>
  );
}
