"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { trackAddToCart } from "@/components/Analytics";

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

const TONES = ["prod-a", "prod-b", "prod-c", "prod-d", "prod-e", "prod-f"];
function toneFor(handle: string) {
  let h = 0;
  for (let i = 0; i < handle.length; i++) h = (h * 31 + handle.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
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

  const finalPrice = price * 0.9;
  const isLoggedIn = !!user;
  const hasDiscount = !!(originalPrice && originalPrice > finalPrice);
  const isLowStock = typeof quantityAvailable === "number" && quantityAvailable <= 5 && quantityAvailable > 0;
  const isOutOfStock = quantityAvailable === 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn || isOutOfStock) return;
    addItem(
      {
        id,
        productId,
        handle,
        title,
        price: finalPrice,
        originalPrice,
        image,
        unit,
      },
      1,
    );
    trackAddToCart({ id: productId, name: title, price: finalPrice, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link
      href={`/produto/${handle}`}
      className="group block bg-paper hover:bg-paper-100 transition-colors"
    >
      <div className={`aspect-[4/5] relative overflow-hidden ${image ? "bg-paper-100" : toneFor(handle)}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-6 group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="label bg-ink text-paper px-2 py-1">−10% CNPJ</span>
          )}
          {coverInfo && (
            <span className="label bg-paper border hairline-strong text-ink-700 px-2 py-1">
              {coverInfo}
            </span>
          )}
          {isLowStock && (
            <span className="label bg-paper border hairline-strong text-ink-700 px-2 py-1">
              Últimas {quantityAvailable} un
            </span>
          )}
          {isOutOfStock && (
            <span className="label bg-ink-200 text-ink-600 px-2 py-1">Esgotado</span>
          )}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <p className="label text-ink-500 truncate">{coverInfo || "Repon"}</p>
        <h3 className="font-display text-sm md:text-base font-bold mt-1.5 leading-tight line-clamp-2 group-hover:text-accent transition-colors min-h-[2.6em]">
          {title}
        </h3>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            {hasDiscount && isLoggedIn && (
              <p className="font-mono text-[10px] text-ink-400 line-through tabular">
                R$ {originalPrice!.toFixed(2).replace(".", ",")}
              </p>
            )}
            {isLoggedIn ? (
              <p className="font-display text-lg md:text-xl font-extrabold tabular tracking-tighter">
                R$&nbsp;{finalPrice.toFixed(2).replace(".", ",")}
                <span className="font-sans text-xs font-medium text-ink-500"> /{unit}</span>
              </p>
            ) : (
              <p className="font-mono text-xs text-ink-500 flex items-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                Entre p/ ver preço
              </p>
            )}
          </div>

          {isLoggedIn && !isOutOfStock && (
            <button
              onClick={handleAdd}
              aria-label="Adicionar ao carrinho"
              className={`w-9 h-9 text-sm font-bold transition-colors flex items-center justify-center shrink-0 ${
                added
                  ? "bg-green-700 text-paper"
                  : "bg-ink text-paper hover:bg-accent"
              }`}
            >
              {added ? "✓" : "+"}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
