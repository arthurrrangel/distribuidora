"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Paleta para fallback de iniciais
const PALETTE = [
  { bg: "bg-blue-50",    text: "text-[#0464D5]" },
  { bg: "bg-violet-50",  text: "text-violet-700" },
  { bg: "bg-emerald-50", text: "text-emerald-700" },
  { bg: "bg-amber-50",   text: "text-amber-700" },
  { bg: "bg-rose-50",    text: "text-rose-700" },
  { bg: "bg-cyan-50",    text: "text-cyan-700" },
  { bg: "bg-indigo-50",  text: "text-indigo-700" },
  { bg: "bg-teal-50",    text: "text-teal-700" },
];

interface BrandItem {
  name: string;
  imageUrl: string | null;
  palette: { bg: string; text: string };
}

function BrandCard({ brand }: { brand: BrandItem }) {
  const [imgError, setImgError] = useState(false);

  const initials = brand.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const showImage = !!brand.imageUrl && !imgError;

  return (
    <Link
      href={`/busca?vendor=${encodeURIComponent(brand.name)}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#0464D5]/30 hover:shadow-lg transition-all duration-200"
    >
      {/* Logo / image square */}
      <div className={`w-full aspect-square relative overflow-hidden flex items-center justify-center ${showImage ? "bg-gray-50" : brand.palette.bg}`}>
        {showImage ? (
          <Image
            src={brand.imageUrl!}
            alt={brand.name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 12vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <span className={`text-3xl font-black tracking-tighter ${brand.palette.text} select-none`}>
            {initials}
          </span>
        )}
        {showImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        )}
      </div>

      {/* Name */}
      <div className="px-2.5 py-2 border-t border-gray-100">
        <p className="text-[11px] font-bold text-gray-700 group-hover:text-[#0464D5] transition-colors leading-tight text-center truncate">
          {brand.name}
        </p>
      </div>
    </Link>
  );
}

export function BrandShowcase() {
  const [brands, setBrands] = useState<BrandItem[]>([]);

  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
    const version = process.env.NEXT_PUBLIC_API_VERSION || "2024-01";

    if (!domain || !token) return;

    fetch(`https://${domain}/api/${version}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `query {
          products(first: 250) {
            edges {
              node {
                vendor
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        const seen = new Set<string>();
        const images: Record<string, string> = {};

        json.data.products.edges.forEach(
          (e: { node: { vendor: string; images: { edges: Array<{ node: { url: string } }> } } }) => {
            const v = e.node.vendor?.trim();
            if (!v) return;
            seen.add(v);
            if (!images[v]) {
              const img = e.node.images?.edges?.[0]?.node?.url;
              if (img) images[v] = img;
            }
          }
        );

        const list: BrandItem[] = [...seen]
          .sort((a, b) => a.localeCompare(b, "pt-BR"))
          .map((name, i) => ({
            name,
            imageUrl: images[name] ?? null,
            palette: PALETTE[i % PALETTE.length],
          }));

        setBrands(list);
      })
      .catch(console.error);
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="py-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-[#0464D5] uppercase tracking-widest mb-0.5">
              Marcas parceiras
            </p>
            <h2 className="text-xl font-extrabold text-gray-900">Fabricantes</h2>
          </div>
          <Link
            href="/fabricantes"
            className="flex items-center gap-1.5 text-sm text-[#0464D5] font-semibold hover:underline"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {brands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
