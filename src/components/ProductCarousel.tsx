"use client";

import { ProductCard } from "./ProductCard";
import { useRef } from "react";
import { Product } from "@/types/shopify";
import Link from "next/link";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  collection?: string;
  hideHeader?: boolean;
}

export function ProductCarousel({
  products,
  title,
  collection,
  hideHeader = false,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 360, behavior: "smooth" });
  };

  if (!products || products.length === 0) return null;

  return (
    <div>
      {!hideHeader && title && (
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-end justify-between gap-6 mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tighter">
            {title}
          </h2>
          <div className="flex items-center gap-3 shrink-0">
            {collection && (
              <Link
                href={`/departamento/${collection}`}
                className="text-sm font-semibold ul-anim hidden sm:inline"
              >
                Ver todos
              </Link>
            )}
            <button
              onClick={scrollLeft}
              className="w-10 h-10 border hairline-strong hover:border-ink flex items-center justify-center transition"
              aria-label="Anterior"
            >
              <span className="font-mono">←</span>
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 bg-ink text-paper hover:bg-accent flex items-center justify-center transition"
              aria-label="Próximo"
            >
              <span className="font-mono">→</span>
            </button>
          </div>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-px bg-ink-200 border-y hairline overflow-x-auto no-scrollbar scroll-smooth"
      >
        {products.map((p) => {
          const variant = p.variants.edges[0]?.node;
          if (!variant) return null;

          return (
            <div
              key={p.id}
              className="bg-paper min-w-[240px] sm:min-w-[260px] shrink-0"
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
                image={p.images.edges[0]?.node.url || null}
                coverInfo={p.coverInfo?.value}
                quantityAvailable={variant.quantityAvailable}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
