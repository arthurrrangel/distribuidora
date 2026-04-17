"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useRef } from "react";
import Image from "next/image";
import { Product } from "@/types/shopify";

interface BrandCarouselProps {
  products: Product[];
  vendor: string; // handle para filtro: ex "seara"
  brandName: string; // nome exibido: ex "Seara"
  brandDescription?: string;
  brandLogo?: string; // URL do logo circular
  brandBanner?: string; // URL do banner retangular
}

export function BrandCarousel({
  products,
  vendor,
  brandName,
  brandDescription,
  brandLogo,
  brandBanner,
}: BrandCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-10">
      <div className="bg-white py-5 px-5 rounded-2xl border border-gray-100 shadow-lg shadow-black/10 overflow-hidden">
        <div className="flex items-stretch">
          {/* PAINEL DA MARCA — fixo na esquerda */}
          <div className="w-[380px] shrink-0 flex flex-col border-r border-gray-100 pr-5">
            {/* Banner retangular */}
            <div className="relative w-full h-[190px] bg-gray-100 shrink-0 rounded-xl overflow-hidden">
              {brandBanner ? (
                <Image
                  src={brandBanner}
                  alt={`Banner ${brandName}`}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <span className="text-gray-400 text-sm font-medium">
                    {brandName}
                  </span>
                </div>
              )}
            </div>

            {/* Info da marca */}
            <div className="flex flex-col gap-1.5 pt-3 flex-1">
              <div className="flex items-center gap-2">
                {brandLogo ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <Image
                      src={brandLogo}
                      alt={`Logo ${brandName}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-500">
                      {brandName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="font-bold text-gray-900 text-sm leading-tight truncate">
                      {brandName}
                    </p>
                    <a
                      href={`/busca?vendor=${encodeURIComponent(vendor)}`}
                      className="text-[#0464D5] font-semibold text-xs hover:underline shrink-0"
                    >
                      Ver todos
                    </a>
                  </div>
                  {brandDescription && (
                    <p className="text-xs text-gray-500 leading-tight line-clamp-1 mt-0.5">
                      {brandDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CARROSSEL DE PRODUTOS */}
          <div className="flex-1 min-w-0 relative">
            {/* Botões de navegação */}
            <div className="absolute top-3 right-3 flex gap-1.5 z-20">
              <button
                onClick={scrollLeft}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-500 transition-all active:scale-95 shadow-sm"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-500 transition-all active:scale-95 shadow-sm"
                aria-label="Próximo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fade lateral esquerdo */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10" />
            {/* Fade lateral direito */}
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
                    className="min-w-[180px] sm:min-w-[190px] shrink-0"
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
        </div>
      </div>
    </section>
  );
}
