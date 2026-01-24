// src/services/productService.ts
import api from "./api";
import { Product, ShopifyGraphQLResponse } from "@/types/shopify";

// --- CONFIGURAÇÃO ---
// Altere aqui para mudar a quantidade de produtos por página em todo o site
const PAGE_SIZE = 12;

// --- FRAGMENTOS (Reutilização de campos) ---

const PRODUCT_FRAGMENT = `
  id
  title
  handle
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
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
      }
    }
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

// Chaves de ordenação
export type SortKeyType =
  | "TITLE"
  | "PRICE"
  | "BEST_SELLING"
  | "CREATED"
  | "MANUAL"
  | "RELEVANCE"
  | "CREATED_AT";

// Opções de filtro/paginação
export interface ProductOptions {
  sortKey?: SortKeyType;
  reverse?: boolean;
  query?: string;
  cursor?: string;
  direction?: "next" | "prev";
}

// Interface de PageInfo
interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

// Interface de Resultado Paginado
export interface PaginatedResult {
  products: Product[];
  pageInfo: PageInfo;
}

type ShopifyFilter = Record<string, unknown>;

// --- Interfaces de Resposta da API (Internas) ---

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
  collection: {
    products: ConnectionWithPageInfo;
  } | null;
}

interface SearchProductsResponse {
  products: ConnectionWithPageInfo;
}

// --- FUNÇÕES ---

// 1. Buscar produtos para Home/Destaques (Sem cursor, apenas quantidade)
export async function getProducts(first = PAGE_SIZE): Promise<Product[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ${PRODUCT_FRAGMENT}
          }
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

    const edges = response.data.data.products.edges;
    return edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

// 2. Buscar produto único (Página de Detalhes)
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

// 3. Buscar produtos por Coleção (COM PAGINAÇÃO)
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

  // Filtros
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

  // Paginação usando a constante PAGE_SIZE (12)
  const paginationArgs =
    direction === "prev" && cursor
      ? `last: ${PAGE_SIZE}, before: "${cursor}"`
      : `first: ${PAGE_SIZE}, after: ${cursor ? `"${cursor}"` : "null"}`;

  const query = `
    query GetProductsByCollection($handle: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $filters: [ProductFilter!]) {
      collection(handle: $handle) {
        products(${paginationArgs}, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
          edges {
            node {
              ${PRODUCT_FRAGMENT}
            }
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

// 4. Buscar produtos por termo (Busca Global) (COM PAGINAÇÃO)
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

  // Paginação usando a constante PAGE_SIZE (12)
  const paginationArgs =
    direction === "prev" && cursor
      ? `last: ${PAGE_SIZE}, before: "${cursor}"`
      : `first: ${PAGE_SIZE}, after: ${cursor ? `"${cursor}"` : "null"}`;

  const query = `
    query SearchProducts($query: String!, $sortKey: ProductSortKeys, $reverse: Boolean) {
      products(${paginationArgs}, query: $query, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ${PRODUCT_FRAGMENT}
          }
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
      variables: {
        query: finalQueryString,
        sortKey: searchSortKey,
        reverse,
      },
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
