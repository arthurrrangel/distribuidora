"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useRef } from "react";
import { Product } from "@/types/shopify";

interface ProductCarouselProps {
  products: Product[];
  title: string;
  collection: string;
}

export function ProductCarousel({
  products,
  title,
  collection,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        <div className="flex items-center gap-3">
          <a
            href={`/departamento/${collection}`}
            className="text-[#2563EB] font-semibold text-sm hover:underline"
          >
            Ver todos
          </a>

          <div className="flex gap-1.5">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-500 transition-all active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-500 transition-all active:scale-95"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CARROSSEL */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto no-scrollbar py-3 px-4 scroll-smooth"
        >
          {products.map((p) => {
            const variant = p.variants.edges[0]?.node;
            if (!variant) return null;

            return (
              <div
                key={p.id}
                className="min-w-[190px] sm:min-w-[200px] shrink-0"
              >
                <ProductCard
                  id={variant.id}
                  productId={p.id}
                  title={p.title}
                  handle={p.handle}
                  price={parseFloat(variant.price.amount)}
                  originalPrice={
                    variant.compareAtPrice
                      ? parseFloat(variant.compareAtPrice.amount)
                      : undefined
                  }
                  image={p.images.edges[0]?.node.url || ""}
                  coverInfo={p.coverInfo?.value}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
