// src/app/sitemap.ts
// Sitemap dinâmico — enumera rotas estáticas + coleções + produtos do Shopify.
// Esta rota é servida em /sitemap.xml. O robots.txt já aponta para ela.

import type { MetadataRoute } from "next";
import type { AxiosResponse } from "axios";
import api from "@/services/api";

const SITE_URL = "https://repon.com.br";

// Esta rota deve ser dinâmica — produtos/coleções podem mudar no Shopify.
export const revalidate = 3600; // regenera a cada 1h

interface SitemapProduct {
  handle: string;
  updatedAt: string;
}

interface SitemapCollection {
  handle: string;
  updatedAt: string;
}

interface ProductsResponse {
  data: {
    products: {
      edges: Array<{ node: SitemapProduct; cursor: string }>;
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  };
}

interface CollectionsResponse {
  data: {
    collections: {
      edges: Array<{ node: SitemapCollection }>;
    };
  };
}

// Páginas estáticas — alta prioridade para SEO institucional.
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.7 },
  { path: "/fabricantes", changeFrequency: "weekly", priority: 0.7 },
  { path: "/parceiros", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/produtos", changeFrequency: "daily", priority: 0.9 },
  { path: "/busca", changeFrequency: "weekly", priority: 0.4 },
  { path: "/login", changeFrequency: "yearly", priority: 0.3 },
  { path: "/register", changeFrequency: "yearly", priority: 0.4 },
];

async function fetchAllProducts(): Promise<SitemapProduct[]> {
  const all: SitemapProduct[] = [];
  let cursor: string | null = null;
  let hasNext = true;
  const PAGE = 100;

  while (hasNext && all.length < 5000) {
    const query = `
      query SitemapProducts($first: Int!, $after: String) {
        products(first: $first, after: $after, sortKey: UPDATED_AT, reverse: true) {
          edges {
            node { handle updatedAt }
            cursor
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    `;
    try {
      const res: AxiosResponse<ProductsResponse> = await api.post(
        "",
        {
          query,
          variables: { first: PAGE, after: cursor },
        },
      );
      const productsData = res.data.data.products;
      all.push(
        ...productsData.edges.map(
          (e: { node: SitemapProduct; cursor: string }) => e.node,
        ),
      );
      hasNext = productsData.pageInfo.hasNextPage;
      cursor = productsData.pageInfo.endCursor;
      if (!cursor) break;
    } catch (err) {
      console.error("[sitemap] erro ao buscar produtos:", err);
      break;
    }
  }

  return all;
}

async function fetchAllCollections(): Promise<SitemapCollection[]> {
  const query = `
    query SitemapCollections {
      collections(first: 250) {
        edges {
          node { handle updatedAt }
        }
      }
    }
  `;
  try {
    const res: AxiosResponse<CollectionsResponse> = await api.post("", {
      query,
    });
    return res.data.data.collections.edges.map(
      (e: { node: SitemapCollection }) => e.node,
    );
  } catch (err) {
    console.error("[sitemap] erro ao buscar coleções:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Estáticas — sempre presentes mesmo se Shopify estiver fora.
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Dinâmicas — falham silenciosamente se Shopify estiver indisponível.
  const [products, collections] = await Promise.all([
    fetchAllProducts(),
    fetchAllCollections(),
  ]);

  const collectionEntries: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${SITE_URL}/departamento/${c.handle}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/produto/${p.handle}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...collectionEntries, ...productEntries];
}
