"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Check, Package, LogIn } from "lucide-react";
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
  quantityAvailable?: number;
}

export function ProductCard({
  id,
  productId,
  title,
  handle,
  price,
  originalPrice,
  image,
  unit = "un",
  coverInfo,
  quantityAvailable,
}: ProductCardProps) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // Preço de atacado B2B
  const finalPrice = price * 0.9;

  const discountPct =
    originalPrice && originalPrice > finalPrice
      ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
      : 0;

  // Parte inteira e decimal do preço
  const intPart = Math.floor(finalPrice);
  const decPart = (finalPrice - intPart).toFixed(2).slice(1); // ",XX"

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    addItem({ id, productId, handle, title, price: finalPrice, image, unit });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stockLow =
    typeof quantityAvailable === "number" && quantityAvailable > 0 && quantityAvailable <= 5;

  return (
    <div className="group relative w-full rounded-xl bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">

      {/* ── Imagem ─────────────────────────────────────────────────── */}
      <Link href={`/produto/${handle}`} className="relative block w-full aspect-square bg-gray-50 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, 220px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-200">
            <Package className="w-12 h-12" />
          </div>
        )}

        {/* Badge % OFF */}
        {discountPct > 0 && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm leading-tight">
            {discountPct}% OFF
          </span>
        )}

        {/* Badge quantidade/embalagem */}
        {coverInfo && (
          <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-gray-100 leading-tight">
            {coverInfo}
          </span>
        )}

        {/* Botão + (estilo Praso: circular azul) */}
        <button
          onClick={handleAdd}
          aria-label="Adicionar ao carrinho"
          className={`absolute bottom-2 right-2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-150 active:scale-90 z-10 ${
            added
              ? "bg-green-500 text-white"
              : "bg-[#0464D5] hover:bg-[#0353b4] text-white"
          }`}
        >
          {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
        </button>

        {/* Estoque baixo */}
        {stockLow && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm leading-tight">
            {quantityAvailable} restante{quantityAvailable! > 1 ? "s" : ""}
          </span>
        )}
      </Link>

      {/* ── Informações ────────────────────────────────────────────── */}
      <Link href={`/produto/${handle}`} className="flex flex-col p-3 flex-1">

        {/* Preço — sempre visível, estilo Praso */}
        <div className="mb-2">
          <p className="text-[10px] text-gray-400 leading-none mb-0.5">
            R$/{unit.toLowerCase()}
          </p>
          <div className="flex items-end gap-0.5 leading-none">
            <span className="text-[22px] font-extrabold text-gray-900 leading-none tracking-tight">
              {intPart}
            </span>
            <span className="text-sm font-bold text-gray-900 leading-none mb-0.5">
              {decPart}
            </span>
          </div>

          {originalPrice && originalPrice > finalPrice && (
            <p className="text-[10px] text-gray-400 line-through leading-tight mt-0.5">
              R${originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>

        {/* Nome */}
        <p
          className="text-gray-700 text-[12px] font-medium leading-snug line-clamp-2 group-hover:text-[#0464D5] transition-colors flex-1"
          title={title}
        >
          {title}
        </p>

        {/* CTA para não logados */}
        {!user && (
          <div className="mt-2 flex items-center gap-1 text-[#0464D5] text-[10px] font-bold">
            <LogIn className="w-3 h-3 shrink-0" />
            Entre para comprar
          </div>
        )}
      </Link>
    </div>
  );
}
