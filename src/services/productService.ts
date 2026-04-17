// src/services/productService.ts
import api from "./api";
import { Product, ShopifyGraphQLResponse } from "@/types/shopify";

// --- CONFIGURAÇÃO ---
const PAGE_SIZE = 40;

// --- FRAGMENTOS ---

const PRODUCT_FRAGMENT = `
  id
  title
  handle
  vendor
  description
  descriptionHtml
  availableForSale
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  compareAtPriceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  images(first: 5) {
    edges {
      node {
        url
        altText
        width
        height
      }
    }
  }
  variants(first: 1) {
    edges {
      node {
        id
        title
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
      }
    }
  }
  coverInfo: metafield(namespace: "custom", key: "cover_info") {
    value
  }
`;

const PAGE_INFO_FRAGMENT = `
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

// --- TIPAGEM ---

export type SortKeyType =
  | "TITLE"
  | "PRICE"
  | "BEST_SELLING"
  | "CREATED"
  | "MANUAL"
  | "RELEVANCE"
  | "CREATED_AT";

export interface ProductOptions {
  sortKey?: SortKeyType;
  reverse?: boolean;
  query?: string;
  cursor?: string;
  direction?: "next" | "prev";
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface PaginatedResult {
  products: Product[];
  pageInfo: PageInfo;
}

export interface CollectionInfo {
  handle: string;
  title: string;
  description: string;
  image: { url: string; altText: string | null } | null;
}

type ShopifyFilter = Record<string, unknown>;

interface ConnectionWithPageInfo {
  edges: { node: Product }[];
  pageInfo: PageInfo;
}

interface ConnectionSimple {
  edges: { node: Product }[];
}

interface GetProductsResponse {
  products: ConnectionSimple;
}

interface GetProductByHandleResponse {
  productByHandle: Product | null;
}

interface GetCollectionProductsResponse {
  collection: { products: ConnectionWithPageInfo } | null;
}

interface GetCollectionInfoResponse {
  collection: CollectionInfo | null;
}

interface SearchProductsResponse {
  products: ConnectionWithPageInfo;
}

// --- FUNÇÕES ---

// 1. Buscar produtos para Home/Destaques
export async function getProducts(first = PAGE_SIZE): Promise<Product[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node { ${PRODUCT_FRAGMENT} }
        }
      }
    }
  `;

  try {
    const response = await api.post<
      ShopifyGraphQLResponse<GetProductsResponse>
    >("", {
      query,
      variables: { first },
    });
    return response.data.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

// 2. Buscar produto único
export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ${PRODUCT_FRAGMENT}
      }
    }
  `;

  try {
    const response = await api.post<
      ShopifyGraphQLResponse<GetProductByHandleResponse>
    >("", {
      query,
      variables: { handle },
    });
    return response.data.data.productByHandle;
  } catch (error) {
    console.error(`Erro ao buscar produto ${handle}:`, error);
    return null;
  }
}

// 3. Buscar info de uma coleção (título, imagem, descrição)
export async function getCollectionInfo(
  handle: string,
): Promise<CollectionInfo | null> {
  const query = `
    query GetCollectionInfo($handle: String!) {
      collection(handle: $handle) {
        handle
        title
        description
        image {
          url
          altText
        }
      }
    }
  `;

  try {
    const response = await api.post<
      ShopifyGraphQLResponse<GetCollectionInfoResponse>
    >("", {
      query,
      variables: { handle },
    });
    return response.data.data.collection;
  } catch (error) {
    console.error(`Erro ao buscar info da coleção ${handle}:`, error);
    return null;
  }
}

// 4. Buscar subcoleções de uma coleção pai via metafield parent_collection

interface RawCollectionNode {
  handle: string;
  title: string;
  description: string;
  image: { url: string; altText: string | null } | null;
  parentCollection: { value: string } | null;
}

interface GetAllCollectionsResponse {
  collections: {
    edges: { node: RawCollectionNode }[];
  };
}

export async function getSubcollections(
  parentHandle: string,
): Promise<CollectionInfo[]> {
  const query = `
    query GetAllCollections {
      collections(first: 100) {
        edges {
          node {
            handle
            title
            description
            image { url altText }
            parentCollection: metafield(namespace: "custom", key: "parent_collection") {
              value
            }
          }
        }
      }
    }
  `;

  try {
    const response = await api.post<
      ShopifyGraphQLResponse<GetAllCollectionsResponse>
    >("", { query });
    const edges = response.data.data.collections.edges;

    return edges
      .map((e) => e.node)
      .filter((c) => c.parentCollection?.value === parentHandle)
      .map((c) => ({
        handle: c.handle,
        title: c.title,
        description: c.description,
        image: c.image ?? null,
      }));
  } catch (error) {
    console.error(`Erro ao buscar subcoleções de ${parentHandle}:`, error);
    return [];
  }
}

// 5. Buscar produtos por Coleção (COM PAGINAÇÃO)
export async function getProductsByCollection(
  handle: string,
  options: ProductOptions = {},
): Promise<PaginatedResult> {
  const {
    sortKey = "MANUAL",
    reverse = false,
    query: filterQuery,
    cursor,
    direction = "next",
  } = options;

  const filters: ShopifyFilter[] = [];
  filters.push({ available: true });

  if (filterQuery && filterQuery !== "available") {
    const parts = filterQuery.split(" AND ");
    parts.forEach((part) => {
      const [key, ...values] = part.split(":");
      const value = values.join(":");
      if (key && value) {
        if (key === "product_type") filters.push({ productType: value });
        else if (key === "tag") filters.push({ tag: value });
        else if (key === "vendor") filters.push({ productVendor: value });
      }
    });
  }

  const paginationArgs =
    direction === "prev" && cursor
      ? `last: ${PAGE_SIZE}, before: "${cursor}"`
      : `first: ${PAGE_SIZE}, after: ${cursor ? `"${cursor}"` : "null"}`;

  const query = `
    query GetProductsByCollection($handle: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $filters: [ProductFilter!]) {
      collection(handle: $handle) {
        products(${paginationArgs}, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
          edges {
            node { ${PRODUCT_FRAGMENT} }
          }
          ${PAGE_INFO_FRAGMENT}
        }
      }
    }
  `;

  try {
    const response = await api.post<
      ShopifyGraphQLResponse<GetCollectionProductsResponse>
    >("", {
      query,
      variables: {
        handle,
        sortKey,
        reverse,
        filters: filters.length > 0 ? filters : undefined,
      },
    });

    const collectionData = response.data.data.collection;

    if (!collectionData) {
      return {
        products: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
      };
    }

    return {
      products: collectionData.products.edges.map((edge) => edge.node),
      pageInfo: collectionData.products.pageInfo,
    };
  } catch (error) {
    console.error(`Erro ao buscar coleção ${handle}:`, error);
    return {
      products: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    };
  }
}

// 6. Buscar produtos por termo (Busca Global) (COM PAGINAÇÃO)
export async function searchProducts(
  term: string,
  options: ProductOptions = {},
): Promise<PaginatedResult> {
  const {
    sortKey = "RELEVANCE",
    reverse = false,
    query: filterQuery,
    cursor,
    direction = "next",
  } = options;

  let searchSortKey = sortKey === "MANUAL" ? "RELEVANCE" : sortKey;
  if (searchSortKey === "CREATED") searchSortKey = "CREATED_AT";

  let finalQueryString = term;
  if (filterQuery && filterQuery !== "available") {
    finalQueryString = finalQueryString
      ? `${finalQueryString} ${filterQuery}`
      : filterQuery;
  }

  if (!finalQueryString.trim()) {
    finalQueryString = "*";
    if (searchSortKey === "RELEVANCE") searchSortKey = "TITLE";
  }

  const paginationArgs =
    direction === "prev" && cursor
      ? `last: ${PAGE_SIZE}, before: "${cursor}"`
      : `first: ${PAGE_SIZE}, after: ${cursor ? `"${cursor}"` : "null"}`;

  const query = `
    query SearchProducts($query: String!, $sortKey: ProductSortKeys, $reverse: Boolean) {
      products(${paginationArgs}, query: $query, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node { ${PRODUCT_FRAGMENT} }
        }
        ${PAGE_INFO_FRAGMENT}
      }
    }
  `;

  try {
    const response = await api.post<
      ShopifyGraphQLResponse<SearchProductsResponse>
    >("", {
      query,
      variables: { query: finalQueryString, sortKey: searchSortKey, reverse },
    });

    const data = response.data.data.products;
    return {
      products: data.edges.map((edge) => edge.node),
      pageInfo: data.pageInfo,
    };
  } catch (error) {
    console.error(`Erro na busca por ${term}:`, error);
    return {
      products: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    };
  }
}

// 7. Buscar produtos recomendados (para Você Também Pode Gostar)
interface GetRecommendationsResponse {
  productRecommendations: Product[];
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const query = `
    query GetRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        ${PRODUCT_FRAGMENT}
      }
    }
  `;

  try {
    const response = await api.post<
      ShopifyGraphQLResponse<GetRecommendationsResponse>
    >("", {
      query,
      variables: { productId },
    });
    return response.data.data.productRecommendations ?? [];
  } catch (error) {
    console.error(`Erro ao buscar recomendações para ${productId}:`, error);
    return [];
  }
}

// 8. Buscar todas as marcas (vendors) dos produtos
export async function getProductVendors(): Promise<string[]> {
  const query = `
    query GetProductVendors {
      shop {
        productVendors(first: 100) {
          edges {
            node
          }
        }
      }
    }
  `;

  interface GetVendorsResponse {
    shop: {
      productVendors: {
        edges: { node: string }[];
      };
    };
  }

  try {
    const response = await api.post<ShopifyGraphQLResponse<GetVendorsResponse>>(
      "",
      { query },
    );
    return response.data.data.shop.productVendors.edges.map((e) => e.node);
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return [];
  }
}
