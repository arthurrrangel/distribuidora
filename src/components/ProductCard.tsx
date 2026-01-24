"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Lock, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  productId: string;
  title: string;
  handle: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit?: string;
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
}: ProductCardProps) {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const userType = user?.cnpj ? "cnpj" : "cpf";
  const finalPrice = userType === "cnpj" ? price * 0.9 : price;

  const discountPercentage =
    originalPrice && originalPrice > finalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0;

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id,
      productId,
      handle,
      title,
      price: finalPrice,
      originalPrice,
      image,
      unit,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col h-full rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)] transition-all duration-300 max-w-[220px] w-full mx-auto overflow-hidden">
      <Link
        href={`/produto/${handle}`}
        className="absolute inset-0 z-0"
        aria-label={`Ver detalhes de ${title}`}
      />

      {discountPercentage > 0 && isLoggedIn && (
        <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md z-10">
          {discountPercentage}% OFF
        </div>
      )}

      {/* ÁREA DA IMAGEM (FUNDO BRANCO) */}
      <div className="relative w-full aspect-square max-h-[200px] flex items-center justify-center bg-white overflow-hidden z-10 pointer-events-none border-b border-gray-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 140px, 200px"
          />
        ) : (
          <div className="text-gray-300 font-semibold text-xl">AreL</div>
        )}
      </div>

      {isLoggedIn && (
        <button
          onClick={handleAddToCart}
          className={`
            absolute z-20 top-2 right-2 
            md:top-[45%] md:right-4 md:translate-x-1/2 md:-translate-y-1/2 
            w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md 
            flex items-center justify-center transition-all duration-300
            active:scale-95
            ${
              added
                ? "bg-green-500 hover:bg-green-600 text-white opacity-100"
                : "bg-blue-600 hover:bg-blue-700 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0"
            }
          `}
          title="Adicionar ao carrinho"
        >
          {added ? (
            <Check className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      )}

      {/* ÁREA DE INFORMAÇÕES (FUNDO CINZA) */}
      <div className="flex-1 flex flex-col px-3 pb-3 pt-3 bg-gray-100 pointer-events-none">
        {unit && (
          <span className="text-[10px] text-gray-600 font-bold mb-1 block bg-gray-200 w-fit px-2 py-0.5 rounded-sm">
            {unit.toUpperCase()}
          </span>
        )}

        <div className="mb-2 min-h-[40px]">
          {isLoggedIn ? (
            <>
              {originalPrice && originalPrice > finalPrice && (
                <span className="block text-[10px] text-gray-400 line-through leading-none mb-0.5">
                  R$ {originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
              <div className="flex items-baseline gap-1 ">
                <span className="text-gray-900 text-lg font-bold">
                  R$ {finalPrice.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-gray-500 text-[10px]">/{unit}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100 w-fit">
                <Lock size={12} />
                <span className="text-[10px] font-bold">
                  Entre para ver o preço
                </span>
              </div>
            </div>
          )}
        </div>

        <h3
          className="text-gray-700 text-xs md:text-sm font-medium leading-snug line-clamp-2 mt-auto group-hover:text-blue-600 transition-colors"
          title={title}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
