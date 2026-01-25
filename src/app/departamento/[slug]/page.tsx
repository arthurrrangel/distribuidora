import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { MobileNavigator } from "@/components/MobileNavigator";
import { FilterBar } from "@/components/FilterBar";
import { Pagination } from "@/components/Pagination";
import {
  getProductsByCollection,
  ProductOptions,
} from "@/services/productService";
import { Product } from "@/types/shopify";
import { PackageX, Home, ChevronRight, Star, PenTool, BookOpen, ShoppingBag, Package, LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import api from "@/services/api";

// Helper: Formata slug para Título Legível (ex: materiais-escolares -> Materiais Escolares)
const formatTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Mapa de ícones para subcategorias
const iconMapByHandle: Record<string, LucideIcon> = {
  "papelaria-e-escritorio": PenTool,
  "eletronicos-e-tvs": Package,
  "informatica-e-acessorios": Package,
  "saude-nutricao-e-bem-estar": Package,
  "utilidades-domesticas": Package,
  "audio-video-e-mobile": Package,
  "destaques": Star,
  "papelaria": PenTool,
  "papelaria-escolar": BookOpen,
  "principais-produtos": ShoppingBag,
};

function getIconForCategory(handle: string): LucideIcon {
  return iconMapByHandle[handle] || Package;
}

export const dynamic = "force-dynamic";

export default async function DepartmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: string;
    type?: string;
    tag?: string;
    cursor?: string;
    direction?: "next" | "prev";
  }>;
}) {
  const { slug } = await params;
  const { sort, type, tag, cursor, direction } = await searchParams;

  const categoryName = formatTitle(slug);

  // 1. Opções da Query
  const options: ProductOptions = {
    cursor,
    direction: direction || "next",
  };

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
      options.sortKey = "MANUAL";
      options.reverse = false;
  }

  // Filtros Avançados
  const filterParts: string[] = [];
  if (type) filterParts.push(`product_type:${type}`);
  if (tag) filterParts.push(`tag:${tag}`);
  options.query =
    filterParts.length > 0 ? filterParts.join(" AND ") : undefined;

  // 2. Busca Principal (Produtos + Paginação)
  const { products: categoryProducts, pageInfo } =
    await getProductsByCollection(slug, options);

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-6 flex-1">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#2563EB] flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Início</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">{categoryName}</span>
        </div>

        {/* Cabeçalho */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">
            {categoryName}
          </h1>
          <p className="text-gray-500">
            Explore nossa seleção de produtos em {categoryName}.
          </p>
        </div>

        {/* Filtros */}
        <FilterBar />

        {/* Seção Ofertas */}
        {categoryProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-6">
              Ofertas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categoryProducts.map((product) => {
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
          </div>
        )}

        {/* Estado Vazio */}
        {categoryProducts.length === 0 && (
          /* Estado Vazio */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <PackageX className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Não encontramos produtos nesta coleção com os filtros selecionados
              (Tipo: {type || "Todos"}, Tag: {tag || "Todas"}).
            </p>

            {/* Se houver filtros, botão para limpar */}
            {(type || tag) && (
              <Link
                href={`/departamento/${slug}`}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Limpar Filtros
              </Link>
            )}

            {/* Se não houver filtros mas a coleção estiver vazia */}
            {!type && !tag && (
              <Link
                href="/"
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Voltar para o Início
              </Link>
            )}
          </div>
        )}

      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
