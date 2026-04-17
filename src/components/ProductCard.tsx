"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Lock, Check, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  productId: string;
  title: string;
  handle: string;
  price: number;
  originalPrice?: number;
  image: string | null;
  unit?: string;
  coverInfo?: string;
}

export function ProductCard({
  id,
  productId,
  title,
  handle,
  price,
  originalPrice,
  image,
  unit = "UN",
  coverInfo,
}: ProductCardProps) {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const finalPrice = price * 0.9;

  const discountPercentage =
    originalPrice && originalPrice > finalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0;

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, productId, handle, title, price: finalPrice, image, unit });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group relative w-full rounded-2xl bg-white border border-gray-100 hover:border-[#0464D5]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Discount Badge */}
      {discountPercentage > 0 && isLoggedIn && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-[#0464D5] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-wide">
          -{discountPercentage}%
        </span>
      )}

      {/* Image Area */}
      <Link href={`/produto/${handle}`} className="block">
        <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, 200px"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-gray-300">
              <Package className="w-10 h-10" />
            </div>
          )}

          {/* Cover Info Badge */}
          {coverInfo && (
            <span className="absolute bottom-2 left-2 z-10 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
              {coverInfo}
            </span>
          )}

          {/* Add to Cart Button */}
          {isLoggedIn && (
            <button
              onClick={handleAddToCart}
              title="Adicionar ao carrinho"
              className={`
                absolute bottom-2 right-2 z-20
                group/btn h-8 rounded-full border-none cursor-pointer
                flex items-center justify-center gap-1.5
                overflow-hidden shadow-md transition-all duration-300 active:scale-95
                ${added
                  ? "bg-[#0464D5] text-white w-[108px] px-3"
                  : "bg-[#0464D5] hover:bg-[#0353b4] text-white w-8 hover:w-[108px] hover:px-3"
                }
              `}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs font-semibold whitespace-nowrap">Adicionado!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs font-semibold whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 max-w-0 group-hover/btn:max-w-[80px] overflow-hidden">
                    Adicionar
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </Link>

      {/* Content Area */}
      <Link href={`/produto/${handle}`} className="flex flex-col px-3.5 pb-3.5 pt-3 bg-white flex-1">
        {/* Title first — draws the eye */}
        <p
          className="text-gray-800 text-[13px] font-semibold leading-snug line-clamp-2 mb-2.5 group-hover:text-[#0464D5] transition-colors"
          title={title}
        >
          {title}
        </p>

        {/* Price Block at the bottom */}
        <div className="mt-auto">
          {isLoggedIn ? (
            <>
              {!!originalPrice && originalPrice > finalPrice && (
                <span className="block text-[11px] text-gray-400 line-through leading-none mb-0.5">
                  R$ {originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-[#0464D5] text-xl font-extrabold tracking-tight leading-none">
                  R$ {finalPrice.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-gray-400 text-[11px] font-medium">/{unit}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-[#0464D5] bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100 w-fit">
              <Lock size={11} />
              <span className="text-[11px] font-bold">Ver preço de atacado</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
