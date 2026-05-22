// src/components/ProductMainInfo.tsx
// Bloco principal da página de produto Repon v2 — preço CNPJ destacado,
// tabela por volume, CTAs verticais minimalistas.

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { LogIn } from "lucide-react";
import {
  trackAddToCart,
  trackViewItem,
  trackWhatsAppClick,
} from "@/components/Analytics";

interface ProductMainInfoProps {
  id: string;
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

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(12);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    trackViewItem({ id: productId, name: title, price: price * 0.9 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
  const waMessage = encodeURIComponent(
    `Olá! Tenho interesse no produto: ${title}. Poderia me passar mais informações?`,
  );
  const waLink = `https://wa.me/${WHATSAPP}?text=${waMessage}`;

  const basePrice = price * 0.9;

  // Tabela de preço por volume (estimativa B2B)
  const tier1 = basePrice;
  const tier2 = basePrice * 0.92;
  const tier3 = basePrice * 0.85;
  const currentPrice =
    quantity >= 50 ? tier3 : quantity >= 12 ? tier2 : tier1;

  const handleAddToCart = () => {
    if (!isLoggedIn) return;
    addItem(
      {
        id,
        productId,
        handle,
        title,
        price: currentPrice,
        originalPrice,
        image,
        unit,
      },
      quantity,
    );
    trackAddToCart({
      id: productId,
      name: title,
      price: currentPrice,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="border-t hairline pt-10 mt-10">
      {/* Preço CNPJ */}
      <p className="label text-ink-500 mb-3">Preço CNPJ · atacado</p>

      {isLoggedIn ? (
        <>
          <div className="flex items-baseline gap-4">
            <p className="font-display font-extrabold tabular tracking-tightest leading-none text-6xl md:text-7xl">
              R$&nbsp;{Math.floor(currentPrice)}
              <span className="text-4xl md:text-5xl">
                ,{currentPrice.toFixed(2).split(".")[1]}
              </span>
            </p>
            <p className="text-ink-500 font-mono text-sm">/{unit}</p>
          </div>
          {originalPrice && originalPrice > currentPrice && (
            <p className="font-mono text-xs text-ink-400 line-through mt-2">
              De R$ {originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
          <p className="text-sm text-ink-700 mt-5">
            À vista no Pix. <span className="font-semibold">3x sem juros</span>{" "}
            no cartão.
          </p>
        </>
      ) : (
        <div className="border hairline-strong p-5 flex items-center gap-3">
          <LogIn className="w-5 h-5 text-ink-500" />
          <div>
            <p className="font-semibold text-ink-900">Entre para ver o preço</p>
            <p className="text-xs text-ink-500 mt-0.5">
              Atacado exclusivo para CNPJ/CPF cadastrado.
            </p>
          </div>
        </div>
      )}

      {/* Tabela por volume */}
      {isLoggedIn && (
        <div className="mt-10 pt-10 border-t hairline">
          <p className="label text-ink-500 mb-5">Compra por volume</p>
          <div className="grid grid-cols-3 gap-px bg-ink-200 border hairline">
            <button
              onClick={() => setQuantity(1)}
              className={`p-4 text-center transition ${
                quantity < 12
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-paper-100"
              }`}
            >
              <p className="font-mono text-[10px] opacity-70">1–11 un</p>
              <p className="font-display text-xl md:text-2xl font-extrabold tabular tracking-tighter mt-2">
                R$&nbsp;{tier1.toFixed(2).replace(".", ",")}
              </p>
            </button>
            <button
              onClick={() => setQuantity(12)}
              className={`p-4 text-center transition ${
                quantity >= 12 && quantity < 50
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-paper-100"
              }`}
            >
              <p className="font-mono text-[10px] opacity-70">12+ un</p>
              <p className="font-display text-xl md:text-2xl font-extrabold tabular tracking-tighter mt-2">
                R$&nbsp;{tier2.toFixed(2).replace(".", ",")}
              </p>
            </button>
            <button
              onClick={() => setQuantity(50)}
              className={`p-4 text-center transition ${
                quantity >= 50
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-paper-100"
              }`}
            >
              <p className="font-mono text-[10px] opacity-70">50+ un</p>
              <p className="font-display text-xl md:text-2xl font-extrabold tabular tracking-tighter mt-2">
                R$&nbsp;{tier3.toFixed(2).replace(".", ",")}
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Quantidade + CTA */}
      {isLoggedIn && (
        <div className="mt-8 flex gap-3">
          <div className="flex items-center bg-paper border hairline-strong h-14 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-full text-ink-500 hover:text-ink text-lg disabled:opacity-50"
              disabled={quantity <= 1}
              aria-label="Diminuir"
            >
              −
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => {
                const n = parseInt(e.target.value.replace(/\D/g, ""), 10) || 1;
                setQuantity(Math.max(1, n));
              }}
              className="w-14 text-center font-mono font-bold outline-none border-x hairline h-full bg-transparent"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-full text-ink-500 hover:text-ink text-lg"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-14 text-sm font-semibold transition flex items-center justify-center gap-3 ${
              added
                ? "bg-green-700 text-paper"
                : "bg-ink text-paper hover:bg-accent"
            }`}
          >
            {added ? (
              <>Adicionado ✓</>
            ) : (
              <>
                Adicionar ao carrinho
                <span className="font-mono">→</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(`product:${handle}`)}
        className="mt-3 w-full h-12 bg-transparent border hairline-strong text-ink hover:border-ink text-sm font-semibold transition flex items-center justify-center gap-2"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-4 h-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.482.672 4.808 1.845 6.805L2 30l7.418-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" />
        </svg>
        Tirar dúvida pelo WhatsApp
      </a>

      {/* Benefícios mini */}
      <div className="mt-10 pt-10 border-t hairline grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
        <div>
          <p className="label text-ink-700">Frete grátis</p>
          <p className="text-ink-500 mt-1">CNPJ no RJ</p>
        </div>
        <div>
          <p className="label text-ink-700">Entrega 24h</p>
          <p className="text-ink-500 mt-1">Pediu até 14h</p>
        </div>
        <div>
          <p className="label text-ink-700">Nota fiscal</p>
          <p className="text-ink-500 mt-1">Sempre eletrônica</p>
        </div>
        <div>
          <p className="label text-ink-700">Devolução</p>
          <p className="text-ink-500 mt-1">7 dias · sem custo</p>
        </div>
      </div>
    </div>
  );
}
