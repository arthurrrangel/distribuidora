"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Paleta de cores para os avatares sem logo
const PALETTE = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-indigo-100 text-indigo-700",
  "bg-teal-100 text-teal-700",
];

export function BrandShowcase() {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
    const version = process.env.NEXT_PUBLIC_API_VERSION || "2024-01";

    fetch(`https://${domain}/api/${version}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token ?? "",
      },
      body: JSON.stringify({
        query: `query { products(first: 250) { edges { node { vendor } } } }`,
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        const vendors: string[] = [
          ...new Set<string>(
            json.data.products.edges
              .map((e: { node: { vendor: string } }) => e.node.vendor)
              .filter(Boolean),
          ),
        ].sort();
        setBrands(vendors);
      })
      .catch(console.error);
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">Marcas</h2>
          <Link
            href="/busca"
            className="text-sm text-[#2563EB] font-semibold hover:underline"
          >
            Ver todas
          </Link>
        </div>

        {/* Grid de marcas */}
        <div className="flex flex-wrap gap-3">
          {brands.map((brand, i) => {
            const color = PALETTE[i % PALETTE.length];
            const initials = brand
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase();

            return (
              <Link
                key={brand}
                href={`/busca?vendor=${encodeURIComponent(brand)}`}
                className="group flex items-center gap-3 bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md rounded-full px-4 py-2.5 transition-all duration-200"
              >
                {/* Avatar circular com iniciais */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color}`}
                >
                  {initials}
                </div>

                {/* Nome da marca */}
                <span className="text-sm font-semibold text-gray-700 group-hover:text-[#2563EB] transition-colors whitespace-nowrap">
                  {brand}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
