// src/components/StructuredData.tsx
// Componente utilitário para injetar JSON-LD em qualquer página de forma
// consistente. Renderizado server-side — não bloqueia hydration.

import React from "react";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export function StructuredData({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      // JSON serializado server-side, seguro contra XSS pois é dado controlado.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Schemas reutilizáveis
// ───────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://repon.com.br";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Repon Plataforma de Comércio Ltda",
  legalName: "Repon Plataforma de Comércio Ltda",
  url: SITE_URL,
  logo: `${SITE_URL}/repon-logo-azul.svg`,
  image: `${SITE_URL}/repon-logo-azul.svg`,
  description:
    "Distribuidora B2B de papelaria e material de escritório no atacado. Atende todo o Brasil com entrega rápida e nota fiscal.",
  taxID: "54.563.438/0001-07",
  vatID: "54.563.438/0001-07",
  foundingDate: "2024",
  sameAs: [
    "https://www.instagram.com/reponatacado",
    "https://www.linkedin.com/company/repon-atacado",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Portuguese"],
      areaServed: "BR",
    },
  ],
} as const;

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "WholesaleStore",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Repon Distribuidora de Papelaria",
  image: `${SITE_URL}/repon-logo-azul.svg`,
  url: SITE_URL,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
    addressRegion: "RJ",
    addressLocality: "Rio de Janeiro",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  paymentAccepted: ["Pix", "Boleto", "Cartão de Crédito"],
  currenciesAccepted: "BRL",
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Repon",
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/busca?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Helpers para schemas dinâmicos
// ───────────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export interface ItemListProduct {
  handle: string;
  title: string;
  image?: string | null;
  price?: number;
}

export function buildItemListSchema(
  products: ItemListProduct[],
  listName: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/produto/${p.handle}`,
      name: p.title,
      image: p.image ?? undefined,
    })),
  };
}
