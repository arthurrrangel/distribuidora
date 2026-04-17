import api from "@/services/api";

// --- TIPAGEM ---

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: Array<{ node: { url: string; altText: string } }>;
  };
  variants: {
    edges: Array<{ node: { id: string } }>;
  };
}

// Tipos auxiliares para resposta da API
interface GraphQLResponse<T> {
  data: T;
}

interface CollectionResponse {
  collection: {
    products: {
      edges: Array<{ node: Product }>;
    };
  };
}

interface SingleProductResponse {
  product: Product;
}

interface SearchResponse {
  products: {
    edges: Array<{ node: Product }>;
  };
}

// --- FUNÇÕES ---

// 1. Busca produtos de uma coleção (Slug)
export async function getProductsByCollection(
  handle: string,
): Promise<Product[]> {
  const query = `
    query getProductsByCollection($handle: String!) {
      collection(handle: $handle) {
        products(first: 20) {
          edges {
            node {
              id
              handle
              title
              description
              productType
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              compareAtPriceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 1) {
                edges { node { url altText } }
              }
              variants(first: 1) {
                edges { node { id } }
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Axios retorna response.data, e o GraphQL retorna { data: ... }
    // Por isso acessamos response.data.data
    const response = await api.post<GraphQLResponse<CollectionResponse>>("", {
      query,
      variables: { handle },
    });

    return (
      response.data.data?.collection?.products.edges.map((e) => e.node) || []
    );
  } catch (error) {
    console.error(`Erro ao buscar coleção ${handle}:`, error);
    return [];
  }
}

// 2. Busca um produto único pelo Handle
export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        productType
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 10) {
          edges { node { url altText } }
        }
        variants(first: 1) {
          edges { node { id } }
        }
      }
    }
  `;

  try {
    const response = await api.post<GraphQLResponse<SingleProductResponse>>(
      "",
      {
        query,
        variables: { handle },
      },
    );

    return response.data.data?.product || null;
  } catch (error) {
    console.error(`Erro ao buscar produto ${handle}:`, error);
    return null;
  }
}

// 3. Busca por termo (Search)
export async function searchProducts(term: string): Promise<Product[]> {
  const query = `
    query searchProducts($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            handle
            title
            productType
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 1) {
              edges { node { url altText } }
            }
            variants(first: 1) {
                edges { node { id } }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await api.post<GraphQLResponse<SearchResponse>>("", {
      query,
      variables: { query: term },
    });

    return response.data.data?.products.edges.map((e) => e.node) || [];
  } catch (error) {
    console.error(`Erro na busca por ${term}:`, error);
    return [];
  }
}
