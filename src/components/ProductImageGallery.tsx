"use client";

import { useState } from "react";
import Image from "next/image";
import { Package, ZoomIn } from "lucide-react";

interface ImageNode {
  url: string;
  altText?: string | null;
}

interface ProductImageGalleryProps {
  images: ImageNode[];
  productTitle: string;
}

export function ProductImageGallery({ images, productTitle }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainImage = images[selectedIndex];

  return (
    <div className="space-y-3 w-full md:w-[450px] shrink-0">
      {/* Imagem principal */}
      <div className="group bg-white rounded-xl border border-gray-100 aspect-square flex items-center justify-center relative overflow-hidden shadow-sm">
        {mainImage ? (
          <>
            <Image
              src={mainImage.url}
              alt={mainImage.altText || productTitle || "Imagem do Produto"}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 450px"
            />
            {/* Ícone de zoom sutil */}
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-gray-100">
              <ZoomIn className="w-4 h-4 text-gray-500" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-gray-300">
            <Package className="w-16 h-16" />
            <span className="text-sm font-medium text-gray-400">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Thumbnails clicáveis */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`w-20 h-20 shrink-0 rounded-lg border-2 relative overflow-hidden bg-gray-50 transition-all duration-150 active:scale-95
                ${selectedIndex === i
                  ? "border-[#0464D5] shadow-md shadow-[#0464D5]/10"
                  : "border-gray-200 hover:border-[#0464D5]/40 opacity-70 hover:opacity-100"
                }`}
              title={`Ver imagem ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${productTitle} - imagem ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
