// src/app/robots.ts
// Robots dinâmico — substitui o /public/robots.txt estático para garantir
// que o sitemap seja apontado corretamente no domínio em produção.

import type { MetadataRoute } from "next";

const SITE_URL = "https://repon.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/minha-conta",
          "/meus-pedidos",
          "/carrinho",
          "/checkout",
          "/login",
          "/register",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
