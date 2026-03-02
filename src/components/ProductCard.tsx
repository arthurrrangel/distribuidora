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
    <div className="group relative w-full rounded-2xl bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Discount Badge */}
      {discountPercentage > 0 && isLoggedIn && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
          -{discountPercentage}% OFF
        </span>
      )}

      {/* Image Area */}
      <Link href={`/produto/${handle}`} className="block">
        <div className="relative w-full h-44 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="200px"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-blue-300">
              <Package className="w-12 h-12" />
            </div>
          )}

          {/* Cover Info Badge */}
          {coverInfo && (
            <span className="absolute bottom-2 left-2 z-10 bg-white text-gray-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
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
                flex items-center justify-center
                overflow-hidden
                shadow-md transition-all duration-300 active:scale-95
                ${
                  added
                    ? "bg-green-500 text-white w-[100px] px-3"
                    : "bg-blue-600 hover:bg-blue-700 text-white w-8 hover:w-[105px] hover:px-3"
                }
              `}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-semibold whitespace-nowrap">
                    Adicionado!
                  </span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-semibold whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 max-w-0 group-hover/btn:max-w-[80px] overflow-hidden group-hover/btn:ml-1.5">
                    Adicionar
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </Link>

      {/* Content Area */}
      <Link
        href={`/produto/${handle}`}
        className="flex flex-col px-3 pb-3 pt-2.5 bg-gray-50 flex-1"
      >
        {/* Price Block */}
        <div className="mb-1.5 min-h-[42px] flex flex-col justify-center">
          {isLoggedIn ? (
            <>
              {!!originalPrice && originalPrice > finalPrice && (
                <span className="block text-[10px] text-gray-400 line-through leading-none mb-0.5">
                  R$ {originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-gray-900 text-lg font-extrabold tracking-tight">
                  R$ {finalPrice.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-gray-400 text-[10px]">/{unit}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1.5 rounded-lg border border-orange-100 w-fit">
              <Lock size={11} />
              <span className="text-[10px] font-bold">
                Entre para ver o preço
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <p
          className="text-gray-700 text-xs font-medium leading-snug line-clamp-2 mt-auto group-hover:text-blue-600 transition-colors"
          title={title}
        >
          {title}
        </p>
      </Link>
    </div>
  );
}
