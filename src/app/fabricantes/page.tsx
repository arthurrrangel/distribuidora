"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowRight, Search, Building2, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";

// ─── Brand color palette (for avatar fallback) ───────────────────────────────
const PALETTE = [
  { bg: "bg-[#0464D5]/10", text: "text-[#0464D5]" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
];

interface VendorData {
  name: string;
  productCount: number;
  initials: string;
  palette: { bg: string; text: string };
  imageUrl: string | null; // first product image for this vendor
}

// ─── Stats numbers ─────────────────────────────────────────────────────────
const STATS = [
  { label: "Fabricantes parceiros", value: "" },
  { label: "Produtos no catálogo", value: "2.000+" },
  { label: "Estados atendidos", value: "1" },
  { label: "Anos no mercado", value: "10+" },
];

export default function FabricantesPage() {
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
    const version = process.env.NEXT_PUBLIC_API_VERSION || "2024-01";

    if (!domain || !token) {
      setLoading(false);
      return;
    }

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
        // Count products per vendor and grab first image found per vendor
        const counts: Record<string, number> = {};
        const images: Record<string, string> = {};

        json.data.products.edges.forEach(
          (e: { node: { vendor: string; images: { edges: Array<{ node: { url: string } }> } } }) => {
            const v = e.node.vendor?.trim();
            if (!v) return;
            counts[v] = (counts[v] ?? 0) + 1;
            if (!images[v]) {
              const img = e.node.images?.edges?.[0]?.node?.url;
              if (img) images[v] = img;
            }
          },
        );

        const list: VendorData[] = Object.entries(counts)
          .sort(([a], [b]) => a.localeCompare(b, "pt-BR"))
          .map(([name, productCount], i) => ({
            name,
            productCount,
            initials: name
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase(),
            palette: PALETTE[i % PALETTE.length],
            imageUrl: images[name] ?? null,
          }));

        setVendors(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalProducts = vendors.reduce((s, v) => s + v.productCount, 0);

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0464D5] text-white pt-16 pb-20 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[#0464D5]/10 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl relative">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">
            Parceiros industriais
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">
            Fabricantes que confiam na Repon
          </h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed mb-10">
            Trabalhamos diretamente com os principais fabricantes de papelaria,
            escritório e material de consumo do Brasil — garantindo qualidade,
            preço de atacado e pronta entrega.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-2xl font-extrabold text-white">
                  {s.label === "Fabricantes parceiros"
                    ? loading
                      ? "—"
                      : `${vendors.length}`
                    : s.value}
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search bar ────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-5xl -mt-5 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar fabricante..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              Limpar
            </button>
          )}
        </div>
      </section>

      {/* ── Vendor Grid ───────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-5xl py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-gray-50 animate-pulse">
                <div className="w-full aspect-[4/3] bg-gray-100" />
                <div className="px-5 py-4 border-t border-gray-100">
                  <div className="h-3.5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Building2 className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">
              {search
                ? `Nenhum fabricante encontrado para "${search}"`
                : "Nenhum fabricante cadastrado ainda."}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-6 font-medium">
              {filtered.length} fabricante{filtered.length !== 1 ? "s" : ""}{" "}
              {search ? `para "${search}"` : "cadastrados"}
              {!search && totalProducts > 0 && (
                <span className="ml-1">
                  · {totalProducts} produtos no total
                </span>
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((vendor) => (
                <VendorCard key={vendor.name} vendor={vendor} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── CTA — become a partner ────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100 py-16 mt-4">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0464D5] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5" />
            Para fabricantes
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Seu produto na Repon
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Somos distribuidores B2B com presença no Rio de Janeiro. Se você é
            fabricante e quer expandir sua distribuição, entre em contato com
            nossa equipe comercial.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/5521999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0464D5] text-white px-7 py-3 rounded-lg font-bold hover:bg-[#0353b4] transition-colors"
            >
              Falar com o comercial
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/parceiros"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Saiba mais sobre parcerias
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavigator />
    </main>
  );
}

// ─── Vendor Card ──────────────────────────────────────────────────────────────
function VendorCard({ vendor }: { vendor: VendorData }) {
  // Priority: 1) Shopify product photo  2) Clearbit logo  3) Initials
  const [shopifyError, setShopifyError] = useState(false);
  const [clearbitError, setClearbitError] = useState(false);

  const domainGuess = vendor.name
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
  const clearbitUrl = `https://logo.clearbit.com/${domainGuess}.com.br`;

  const showShopify = !!vendor.imageUrl && !shopifyError;
  const showClearbit = !showShopify && !clearbitError;
  const showInitials = !showShopify && clearbitError;

  return (
    <Link
      href={`/busca?vendor=${encodeURIComponent(vendor.name)}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#0464D5]/40 hover:shadow-xl transition-all duration-200"
    >
      {/* Image / Logo area */}
      <div className={`w-full aspect-[4/3] relative overflow-hidden flex items-center justify-center ${showShopify ? "bg-gray-50" : vendor.palette.bg}`}>
        {showShopify ? (
          <Image
            src={vendor.imageUrl!}
            alt={vendor.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setShopifyError(true)}
            unoptimized
          />
        ) : showClearbit ? (
          <Image
            src={clearbitUrl}
            alt={vendor.name}
            width={180}
            height={100}
            className="w-2/3 h-2/3 object-contain drop-shadow-sm"
            onError={() => setClearbitError(true)}
            unoptimized
          />
        ) : (
          <span className={`text-6xl font-black tracking-tighter ${vendor.palette.text} select-none`}>
            {vendor.initials}
          </span>
        )}

        {/* Gradient overlay for product photo cards */}
        {showShopify && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        )}

        {/* Product count badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          {vendor.productCount} produto{vendor.productCount !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Info bar */}
      <div className="px-4 py-3.5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-800 group-hover:text-[#0464D5] transition-colors leading-tight">
            {vendor.name}
          </p>
          <p className="text-xs text-[#0464D5] font-medium mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver catálogo →
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#0464D5] flex items-center justify-center transition-colors shrink-0">
          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
}
