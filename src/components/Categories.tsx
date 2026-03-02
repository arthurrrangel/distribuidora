"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Package,
  Star,
  PenTool,
  BookOpen,
  ShoppingBag,
  Tv,
  Laptop,
  Headphones,
  Heart,
  Home,
  UtensilsCrossed,
  Dumbbell,
  Shirt,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
  image: { url: string; altText: string | null } | null;
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: Array<{ node: CollectionNode }>;
    };
  };
}

// ─── Icon maps ───────────────────────────────────────────────────────────────

const iconByHandle: Record<string, LucideIcon> = {
  "papelaria-e-escritorio": PenTool,
  "eletronicos-e-tvs": Tv,
  "informatica-e-acessorios": Laptop,
  "saude-nutricao-e-bem-estar": Heart,
  "utilidades-domesticas": Home,
  "audio-video-e-mobile": Headphones,
  destaques: Star,
  papelaria: PenTool,
  "papelaria-escolar": BookOpen,
  "principais-produtos": ShoppingBag,
};

const iconByTitle: Record<string, LucideIcon> = {
  Destaques: Star,
  Papelaria: PenTool,
  "Papelaria Escolar": BookOpen,
  "Principais Produtos": ShoppingBag,
  Eletrônicos: Tv,
  Informática: Laptop,
  "Áudio e Vídeo": Headphones,
  Saúde: Heart,
  Casa: Home,
  Cozinha: UtensilsCrossed,
  Esportes: Dumbbell,
  Roupas: Shirt,
  Games: Gamepad2,
};

function getIcon(handle: string, title: string): LucideIcon {
  return iconByHandle[handle] ?? iconByTitle[title] ?? Package;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Categories() {
  const [categories, setCategories] = useState<CollectionNode[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

  // Fetch collections
  useEffect(() => {
    const query = `
      query getCollections {
        collections(first: 100, sortKey: TITLE) {
          edges {
            node {
              id title handle
              image { url altText }
            }
          }
        }
      }
    `;

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
    const version = process.env.NEXT_PUBLIC_API_VERSION || "2024-01";

    fetch(`https://${domain}/api/${version}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token ?? "",
      },
      body: JSON.stringify({ query }),
    })
      .then((r) => r.json())
      .then((json: ShopifyCollectionsResponse) => {
        const all = json.data.collections.edges.map((e) => e.node);
        setCategories(
          all.filter(
            (c) => c.title !== "Destaques" && c.title !== "Ofertas da Semana",
          ),
        );
      })
      .catch(console.error);
  }, []);

  // Start at middle set after categories load
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || categories.length === 0) return;
    // small delay so DOM has rendered the tripled list
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
  }, [categories]);

  // Infinite loop: silently jump when leaving the middle set
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isJumping.current) return;
    const setW = el.scrollWidth / 3;
    if (el.scrollLeft < setW * 0.3) {
      isJumping.current = true;
      el.scrollLeft += setW;
      isJumping.current = false;
    } else if (el.scrollLeft > setW * 2.7 - el.clientWidth) {
      isJumping.current = true;
      el.scrollLeft -= setW;
      isJumping.current = false;
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  // Triple the list for seamless loop
  const looped = [...categories, ...categories, ...categories];

  return (
    <section id="categories" className="py-3">
      <div className="container mx-auto px-2 md:px-4 relative">
        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 active:scale-90 transition-all duration-150"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Fade left */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-8"
        >
          {looped.map((cat, i) => {
            const Icon = getIcon(cat.handle, cat.title);
            const hasImage = !!cat.image?.url;
            return (
              <Link
                key={`${cat.id}-${i}`}
                href={`/departamento/${cat.handle}`}
                className="flex flex-col items-center gap-2 group min-w-[120px] md:min-w-[136px]"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors shadow-md overflow-hidden">
                  {hasImage ? (
                    <Image
                      src={cat.image!.url}
                      alt={cat.image!.altText || cat.title}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon
                      strokeWidth={1.5}
                      className="w-10 h-10 md:w-12 md:h-12"
                    />
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-[#2563EB] transition-colors leading-tight max-w-[120px]">
                  {cat.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Fade right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 active:scale-90 transition-all duration-150"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </section>
  );
}
