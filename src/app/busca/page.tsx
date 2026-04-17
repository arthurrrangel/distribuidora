import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { MobileNavigator } from "@/components/MobileNavigator";
import { FilterBar } from "@/components/FilterBar";
import { Pagination } from "@/components/Pagination";
import { searchProducts, ProductOptions } from "@/services/productService";
import { PackageX, Search as SearchIcon } from "lucide-react";
import Link from "next/link";

// Garante renderização dinâmica para ler searchParams em tempo real
export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    type?: string;
    tag?: string;
    cursor?: string;
    direction?: "next" | "prev";
  }>;
}) {
  // Await nos parâmetros (Next.js 15+ best practice)
  const { q, sort, type, tag, cursor, direction } = await searchParams;
  const query = q || "";

  // 1. Configuração de Opções (Ordenação, Filtros e Paginação)
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

  // Montagem dos Filtros
  const filterParts: string[] = [];
  if (type) filterParts.push(`product_type:${type}`);
  if (tag) filterParts.push(`tag:${tag}`);
  options.query =
    filterParts.length > 0 ? filterParts.join(" AND ") : undefined;

  // 2. Chamada ao Serviço
  // Retorna { products: [], pageInfo: { ... } }
  const { products, pageInfo } = await searchProducts(query, options);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Cabeçalho da Página */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-[#0464D5] transition-colors">
              Início
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Busca</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            {query ? (
              <>Resultados para &quot;{query}&quot;</>
            ) : (
              <>Todos os Produtos</>
            )}
          </h1>

          <p className="text-gray-500 mt-1">
            {products.length > 0
              ? `Exibindo ${products.length} itens`
              : "Nenhum item encontrado"}
          </p>
        </div>

        {/* Layout: Filtros na lateral + Produtos */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <FilterBar />
          <div className="flex-1 min-w-0">
            {/* Conteúdo Principal */}
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {products.map((product) => {
                    // Tratamento seguro de dados opcionais
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
                        unit="un"
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
              /* Estado Vazio (Error/Empty State) */
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 text-center animate-in fade-in zoom-in duration-300">
                {query ? (
                  <>
                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                      <PackageX className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Nenhum resultado encontrado
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Não encontramos produtos correspondentes a{" "}
                      <strong>&quot;{query}&quot;</strong> com os filtros
                      atuais.
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href="/busca"
                        className="px-6 py-2.5 bg-[#0464D5] text-white rounded-lg font-medium hover:bg-[#0353b4] transition-colors shadow-sm"
                      >
                        Limpar busca e filtros
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 p-4 rounded-full mb-4">
                      <SearchIcon className="w-12 h-12 text-[#0464D5]/50" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Faça uma nova busca
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Digite o nome do produto que você procura na barra de
                      pesquisa acima.
                    </p>
                  </>
                )}
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
