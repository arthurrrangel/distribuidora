import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { MobileNavigator } from "@/components/MobileNavigator";
import { FilterBar } from "@/components/FilterBar";
import { Pagination } from "@/components/Pagination";
import { searchProducts, ProductOptions } from "@/services/productService";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Todos os Produtos | Minha Loja",
  description: "Confira nosso catálogo completo de produtos.",
};

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    type?: string;
    tag?: string;
    cursor?: string;
    direction?: "next" | "prev";
  }>;
}) {
  const { sort, type, tag, cursor, direction } = await searchParams;

  // 1. Configuração de Opções
  const options: ProductOptions = {
    cursor,
    direction: direction || "next",
  };

  // Mapeamento de Ordenação
  switch (sort) {
    case "price-asc":
      options.sortKey = "PRICE";
      options.reverse = false;
      break;
    case "price-desc":
      options.sortKey = "PRICE";
      options.reverse = true;
      break;
    case "created-desc":
      options.sortKey = "CREATED";
      options.reverse = true;
      break;
    case "title-asc":
      options.sortKey = "TITLE";
      options.reverse = false;
      break;
    case "title-desc":
      options.sortKey = "TITLE";
      options.reverse = true;
      break;
    default:
      options.sortKey = "RELEVANCE";
      options.reverse = false;
  }

  // Filtros
  const filterParts: string[] = [];
  if (type) filterParts.push(`product_type:${type}`);
  if (tag) filterParts.push(`tag:${tag}`);
  options.query =
    filterParts.length > 0 ? filterParts.join(" AND ") : undefined;

  // 2. Busca TODOS os produtos (passando string vazia)
  const { products, pageInfo } = await searchProducts("", options);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Cabeçalho Simples */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">
            Todos os Produtos
          </h1>
          <p className="text-gray-500">
            Explorando {products.length} itens do nosso catálogo completo.
          </p>
        </div>

        {/* Layout: Filtros na lateral + Produtos */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <FilterBar />
          <div className="flex-1 min-w-0">
            {/* Grid de Produtos */}
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {products.map((product) => {
                    const firstVariant = product.variants.edges[0]?.node;
                    const price = parseFloat(
                      product.priceRange.minVariantPrice.amount,
                    );
                    const originalPrice = product.compareAtPriceRange
                      ? parseFloat(
                          product.compareAtPriceRange.minVariantPrice.amount,
                        )
                      : undefined;
                    const imageUrl = product.images.edges[0]?.node.url || "";

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

                {/* Paginação */}
                <div className="mt-8">
                  <Pagination pageInfo={pageInfo} />
                </div>
              </>
            ) : (
              /* Estado Vazio */
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Não encontramos produtos com os filtros selecionados (Tipo:{" "}
                  {type || "Todos"}, Tag: {tag || "Todas"}).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
