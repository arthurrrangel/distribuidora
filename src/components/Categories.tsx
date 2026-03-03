"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
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
import api from "@/services/api";

// ─── Types ──────────────────────────────────────────────────────────────────

interface CollectionNode {
  id: string;
  title: string;
  handle: string;
  image: { url: string; altText: string | null } | null;
  parentName: string | null;
}

interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
  image: { url: string; altText: string | null } | null;
  parentCollection: { value: string } | null;
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: Array<{ node: ShopifyCollectionNode }>;
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

// ─── Inner scrollable list ────────────────────────────────────────────────────

interface CategoryListProps {
  items: CollectionNode[];
  onParentClick?: (col: CollectionNode) => void;
  isParentView: boolean;
}

function CategoryList({
  items,
  onParentClick,
  isParentView,
}: CategoryListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const looped = items;

  const scrollBy = (delta: number) =>
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <div className="relative w-full">
      {/* Left arrow */}
      <button
        onClick={() => scrollBy(-320)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 active:scale-90 transition-all duration-150"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Fade left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth px-8 justify-center"
      >
        {looped.map((cat, i) => {
          const Icon = getIcon(cat.handle, cat.title);
          const hasImage = !!cat.image?.url;
          const imgEl = hasImage ? (
            <Image
              src={cat.image!.url}
              alt={cat.image!.altText || cat.title}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon strokeWidth={1.5} className="w-9 h-9 md:w-11 md:h-11" />
          );

          const circleClass =
            "w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-all shadow-md overflow-hidden ring-2 ring-transparent ring-offset-2 duration-200 group-hover:text-blue-500 group-hover:ring-blue-200 group-active:scale-95";

          if (isParentView && onParentClick) {
            return (
              <button
                key={`${cat.id}-${i}`}
                onClick={() => onParentClick(cat)}
                className="flex flex-col items-center gap-2 group min-w-[88px] md:min-w-[104px] focus:outline-none"
              >
                <div className={circleClass}>{imgEl}</div>
                <span className="text-xs md:text-sm font-semibold text-gray-700 text-center group-hover:text-[#2563EB] transition-colors leading-tight max-w-[96px]">
                  {cat.title}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={`${cat.id}-${i}`}
              href={`/departamento/${cat.handle}`}
              className="flex flex-col items-center gap-2 group min-w-[88px] md:min-w-[104px]"
            >
              <div className={circleClass}>{imgEl}</div>
              <span className="text-xs md:text-sm font-semibold text-gray-700 text-center group-hover:text-[#2563EB] transition-colors leading-tight max-w-[96px]">
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
        onClick={() => scrollBy(320)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 active:scale-90 transition-all duration-150"
        aria-label="Próximo"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Categories() {
  const [collections, setCollections] = useState<CollectionNode[]>([]);
  const [selectedParent, setSelectedParent] = useState<CollectionNode | null>(
    null,
  );
  const [view, setView] = useState<"parents" | "children">("parents");

  // Fetch with parent_collection metafield (same as Header)
  useEffect(() => {
    const query = `
      query getCollections {
        collections(first: 100, sortKey: TITLE) {
          edges {
            node {
              id title handle
              image { url altText }
              parentCollection: metafield(namespace: "custom", key: "parent_collection") {
                value
              }
            }
          }
        }
      }
    `;

    api
      .post<ShopifyCollectionsResponse>("", { query })
      .then((res) => {
        const nodes = res.data.data.collections.edges.map((e) => e.node);
        const loaded: CollectionNode[] = nodes
          .filter(
            (n) => n.title !== "Destaques" && n.title !== "Ofertas da Semana",
          )
          .map((n) => ({
            id: n.id,
            title: n.title,
            handle: n.handle,
            image: n.image,
            parentName: n.parentCollection?.value ?? null,
          }));
        setCollections(loaded);
      })
      .catch(console.error);
  }, []);

  // Derived
  const parentCollections = collections.filter(
    (c) =>
      !c.parentName || c.parentName.toLowerCase() === c.title.toLowerCase(),
  );

  const childrenOf = (parentTitle: string) =>
    collections.filter(
      (c) =>
        c.parentName?.toLowerCase() === parentTitle.toLowerCase() &&
        c.title.toLowerCase() !== parentTitle.toLowerCase(),
    );

  const handleParentClick = (col: CollectionNode) => {
    const kids = childrenOf(col.title);
    if (kids.length === 0) {
      // No children → navigate directly
      window.location.href = `/departamento/${col.handle}`;
      return;
    }
    setSelectedParent(col);
    setView("children");
  };

  const handleBack = () => {
    setView("parents");
    // Wait for transition to finish before clearing selection
    setTimeout(() => setSelectedParent(null), 400);
  };

  const children = selectedParent ? childrenOf(selectedParent.title) : [];
  const inChildren = view === "children";

  return (
    <section id="categories" className="py-3">
      <div className="container mx-auto px-2 md:px-4">
        {/* ── Breadcrumb / back button (slides in when in children view) ── */}
        <div
          className="flex items-center justify-center mb-2 overflow-hidden transition-all duration-300"
          style={{
            height: inChildren ? "2rem" : 0,
            opacity: inChildren ? 1 : 0,
          }}
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Departamentos
          </button>
          {selectedParent && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
              <span className="text-sm font-semibold text-gray-700">
                {selectedParent.title}
              </span>
            </>
          )}
        </div>

        {/* ── Sliding two-panel container ── */}
        <div className="relative overflow-hidden h-[140px] md:h-[160px]">
          <div
            className="flex h-full"
            style={{
              transform: inChildren ? "translateX(-100%)" : "translateX(0%)",
              transition: "transform 380ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Panel 1 — Parents */}
            <div
              className="w-full shrink-0 flex items-center"
              aria-hidden={inChildren}
            >
              {parentCollections.length > 0 ? (
                <CategoryList
                  items={parentCollections}
                  onParentClick={handleParentClick}
                  isParentView
                />
              ) : (
                // Loading skeleton
                <div className="flex gap-5 px-8 w-full justify-center">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 min-w-[88px] md:min-w-[104px]"
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 animate-pulse" />
                      <div className="h-3 w-16 rounded-full bg-gray-100 animate-pulse" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Panel 2 — Children */}
            <div
              className="w-full shrink-0 flex items-center"
              aria-hidden={!inChildren}
            >
              {children.length > 0 && (
                <CategoryList items={children} isParentView={false} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
