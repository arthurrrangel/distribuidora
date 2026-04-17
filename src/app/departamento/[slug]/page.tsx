import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { DepartmentCover } from "@/components/DepartmentCover";
import { MobileNavigator } from "@/components/MobileNavigator";
import { FilterBar } from "@/components/FilterBar";
import { Pagination } from "@/components/Pagination";
import {
  getProductsByCollection,
  ProductOptions,
} from "@/services/productService";
import { PackageX, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import api from "@/services/api";
import type { Metadata } from "next";

// ---- TIPOS ----
interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image: { url: string } | null;
  parentMeta: { value: string } | null;
}

interface CollectionDataResponse {
  data: {
    collectionByHandle: ShopifyCollectionNode | null;
    collections: {
      edges: Array<{ node: ShopifyCollectionNode }>;
    };
  };
}

interface ChildCollection {
  id: string;
  title: string;
  handle: string;
  imageUrl: string | null;
}

// ---- HELPERS ----
const formatTitle = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Imagens padrão por handle (para coleções sem imagem no Shopify)
const FALLBACK_IMAGES: Record<string, string> = {
  papelaria:
    "https://lh3.googleusercontent.com/d/1Gov_r82OUeVD0KIn9qlTZFopiRWzexJR",
};

export const dynamic = "force-dynamic";

// ── SEO dinâmico por departamento ─────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const formatTitle = (s: string) =>
    s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  try {
    const infoQuery = `
      query getMeta($handle: String!) {
        collectionByHandle(handle: $handle) {
          title
          description
          image { url }
        }
      }
    `;
    const res = await api.post<{
      data: {
        collectionByHandle: {
          title: string;
          description: string;
          image: { url: string } | null;
        } | null;
      };
    }>("", { query: infoQuery, variables: { handle: slug } });

    const col = res.data.data.collectionByHandle;
    const title = col?.title ?? formatTitle(slug);
    const description =
      col?.description ||
      `Compre ${title} no atacado na Repon. Preço B2B exclusivo para CNPJ, frete grátis e entrega em 24h no Rio de Janeiro.`;
    const image = col?.image?.url;

    return {
      title: `${title} no Atacado | Repon`,
      description,
      openGraph: {
        title: `${title} no Atacado | Repon`,
        description,
        images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
        type: "website",
        locale: "pt_BR",
        siteName: "Repon",
      },
    };
  } catch {
    return {
      title: `${formatTitle(slug)} | Repon`,
      description: "Papelaria e escritório no atacado para CNPJ. Repon.",
    };
  }
}

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

  // ---- 1. BUSCA DE INFO DA COLEÇÃO + TODAS AS COLEÇÕES ----
  let collectionInfo: ShopifyCollectionNode | null = null;
  let allCollections: ShopifyCollectionNode[] = [];

  try {
    const infoQuery = `
      query getDepartmentInfo($handle: String!) {
        collectionByHandle(handle: $handle) {
          id
          title
          handle
          description
          image { url }
          parentMeta: metafield(namespace: "custom", key: "parent_collection") { value }
        }
        collections(first: 100, sortKey: TITLE) {
          edges {
            node {
              id
              title
              handle
              image { url }
              parentMeta: metafield(namespace: "custom", key: "parent_collection") { value }
            }
          }
        }
      }
    `;
    const res = await api.post<CollectionDataResponse>("", {
      query: infoQuery,
      variables: { handle: slug },
    });
    collectionInfo = res.data.data.collectionByHandle;
    allCollections = res.data.data.collections.edges.map((e) => e.node);
  } catch {
    // fallback silencioso
  }

  // ---- 2. COMPUTAR FILHOS E PAI ----
  const thisTitle = collectionInfo?.title ?? formatTitle(slug);

  // Imagem da coleção: usa a do Shopify ou o fallback local
  const coverImageUrl =
    collectionInfo?.image?.url ?? FALLBACK_IMAGES[slug] ?? null;
  const isParent =
    !collectionInfo?.parentMeta?.value ||
    collectionInfo.parentMeta.value.toLowerCase() === thisTitle.toLowerCase();

  const children: ChildCollection[] = allCollections
    .filter(
      (c) =>
        c.parentMeta?.value?.toLowerCase() === thisTitle.toLowerCase() &&
        c.title.toLowerCase() !== thisTitle.toLowerCase(),
    )
    .map((c) => ({
      id: c.id,
      title: c.title,
      handle: c.handle,
      imageUrl: c.image?.url ?? null,
    }));

  const parentNode = !isParent
    ? allCollections.find(
        (c) =>
          c.title.toLowerCase() ===
          collectionInfo?.parentMeta?.value?.toLowerCase(),
      )
    : null;

  // ---- 3. OPÇÕES DE QUERY DOS PRODUTOS ----
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

  const filterParts: string[] = [];
  if (type) filterParts.push(`product_type:${type}`);
  if (tag) filterParts.push(`tag:${tag}`);
  options.query =
    filterParts.length > 0 ? filterParts.join(" AND ") : undefined;

  const { products: categoryProducts, pageInfo } =
    await getProductsByCollection(slug, options);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col md:pb-0">
      <Header />

      {/* CAPA + FAIXA AZUL (faixa fica atrás da imagem) */}
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 bg-[#0464D5]" />
        <div className="relative z-10">
          <DepartmentCover
            title={thisTitle}
            imageUrl={coverImageUrl}
            description={collectionInfo?.description}
            parentTitle={parentNode?.title}
            parentHandle={parentNode?.handle}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 mb-4 flex-1">
        {/* SUBCATEGORIAS */}
        {isParent && children.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#0464D5] mb-6 text-center">
              Categorias
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/departamento/${child.handle}`}
                  className="flex flex-col items-center gap-3 group w-[110px]"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-[#0464D5] border-4 border-[#0464D5]/20 group-hover:border-[#0464D5] group-hover:shadow-lg transition-all duration-200 flex-shrink-0">
                    {child.imageUrl ? (
                      <Image
                        src={child.imageUrl}
                        alt={child.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#0464D5] transition-colors text-center leading-tight">
                    {child.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Layout: Filtros na lateral + Produtos */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <FilterBar />
          <div className="flex-1 min-w-0">
            {/* PRODUTOS */}
            {categoryProducts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center md:text-left">
                  Produtos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                <div className="mt-8">
                  <Pagination pageInfo={pageInfo} />
                </div>
              </div>
            )}

            {/* ESTADO VAZIO SEM FILHOS */}
            {categoryProducts.length === 0 && children.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 text-center mt-6">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <PackageX className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Não encontramos produtos nesta coleção com os filtros
                  selecionados (Tipo: {type || "Todos"}, Tag: {tag || "Todas"}).
                </p>
                {(type || tag) && (
                  <Link
                    href={`/departamento/${slug}`}
                    className="px-6 py-2.5 bg-[#0464D5] text-white rounded-lg font-medium hover:bg-[#0353b4] transition-colors shadow-sm"
                  >
                    Limpar Filtros
                  </Link>
                )}
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

            {/* ESTADO: TEM FILHOS MAS SEM PRODUTOS DIRETOS */}
            {categoryProducts.length === 0 && children.length > 0 && (
              <p className="text-sm text-gray-400 mt-4">
                Selecione uma categoria acima para ver os produtos.
              </p>
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
