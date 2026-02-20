// src/components/ProductMainInfo.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingCart, Lock } from "lucide-react";

interface ProductMainInfoProps {
  id: string; // ID da Variante
  productId: string;
  handle: string;
  title: string;
  price: number;
  originalPrice?: number;
  image?: string;
  unit?: string;
}

export function ProductMainInfo({
  id,
  productId,
  handle,
  title,
  price,
  originalPrice,
  image,
  unit = "un",
}: ProductMainInfoProps) {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  // Sempre CNPJ

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sempre aplicar desconto de CNPJ
  const finalPrice = price * 0.9;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
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
      quantity,
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-8">
      {/* Preço */}
      <div className="mb-6">
        {originalPrice && isLoggedIn && (
          <span className="text-gray-400 line-through text-sm block mb-1">
            De: R$ {originalPrice.toFixed(2).replace(".", ",")}
          </span>
        )}

        {isLoggedIn ? (
          <div className="flex items-end gap-2 flex-wrap">
            <span className="text-4xl font-extrabold text-[#2563EB]">
              R$ {finalPrice.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-gray-500 mb-2 font-medium">/{unit}</span>
            <span className="mb-2 ml-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded inline-block">
              Atacado
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 py-2">
            <div className="flex items-center gap-2 text-orange-700 bg-orange-100 px-4 py-3 rounded-lg font-medium w-full">
              <Lock className="w-4 h-4" />
              <span>Entre ou Cadastre-se para visualizar o preço</span>
            </div>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <p className="text-sm text-blue-800/70 mb-6 bg-blue-100/50 p-2 rounded">
          Preço exclusivo para compras via site.
        </p>
      )}

      {/* Controles */}
      {isLoggedIn ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white h-12 w-full sm:w-auto">
            <button
              onClick={handleDecrement}
              className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-l-lg disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-16 text-center text-gray-900 font-bold focus:outline-none h-full border-x border-gray-100"
            />
            <button
              onClick={handleIncrement}
              className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-r-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex-1 h-12 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-95 ${
              added
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#2563EB] hover:bg-blue-700"
            }`}
          >
            {added ? (
              <>
                <ShoppingCart className="w-5 h-5" /> Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Faça login com seu CNPJ ou CPF para liberar a compra.
          </p>
        </div>
      )}
    </div>
  );
}
