"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useRef } from "react";
import Link from "next/link";
import { Product } from "@/types/shopify";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="relative pt-0 md:pt-4 pb-0 md:pb-12">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 md:mb-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Ofertas da Semana
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Aproveite os descontos por tempo limitado
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/departamento/destaques"
            className="text-[#2563EB] font-semibold text-sm hover:underline hidden sm:block"
          >
            Ver todos
          </Link>

          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 shadow-sm transition-all hover:scale-105 active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2563EB] hover:bg-[#1E4ED8] text-white shadow-md transition-all hover:scale-105 active:scale-95"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CARROSSEL */}
      <div className="relative">
        {/* Fade lateral esquerdo */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Fade lateral direito */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={scrollContainerRef}
          // ALTERAÇÃO AQUI: Mudei de gap-5 para gap-4 (mobile) e gap-8 (desktop)
          className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar pb-6 px-4 sm:px-6 lg:px-8 scroll-smooth"
        >
          {products.map((p) => {
            const variant = p.variants.edges[0]?.node;
            if (!variant) return null;

            return (
              <div
                key={p.id}
                className="min-w-[190px] sm:min-w-[210px] max-w-[230px] shrink-0 h-full"
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
                  unit="UN"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
