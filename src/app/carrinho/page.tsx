"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal, cartCount, clearCart } =
    useCart();
  const { user } = useAuth();

  // Estados
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = 0;
  const total = cartTotal + shipping;

  // Número do WhatsApp
  const whatsappNumber = "5581992361167";

  // Função para criar Draft Order na Shopify
  const createDraftOrder = async () => {
    const lineItems = items.map((item) => ({
      variantId: item.id,
      quantity: item.quantity,
      title: item.title,
      price: item.price,
    }));

    const response = await fetch("/api/create-draft-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lineItems,
        customerId: user?.id,
        customer: user
          ? {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            }
          : undefined,
        note: "Pedido via WhatsApp - Pagamento: Pix/Boleto",
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Erro ao criar pedido");
    }

    return response.json();
  };

  // Função para abrir WhatsApp com dados do pedido
  const openWhatsApp = (orderName: string, orderTotal: string) => {
    const itemsList = items
      .map(
        (item, index) =>
          `${index + 1}. *${item.title}*\n   Qtd: ${item.quantity} ${item.unit || "un"} | R$ ${item.price.toFixed(2).replace(".", ",")} cada\n   Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`,
      )
      .join("\n\n");

    const message = `🛒 *NOVO PEDIDO - Repon Distribuidora*\n\n📋 *Pedido: ${orderName}*\n\n${itemsList}\n\n────────────────────\n💰 *TOTAL: R$ ${parseFloat(orderTotal).toFixed(2).replace(".", ",")}*\n────────────────────\n\n📦 Forma de pagamento: *Pix ou Boleto*\n\nAguardo confirmação para envio dos dados de pagamento.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  // Função principal de checkout
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);

    try {
      // 1. Criar Draft Order na Shopify
      const result = await createDraftOrder();

      if (result.success && result.draftOrder) {
        // 2. Abrir WhatsApp com dados do pedido
        openWhatsApp(result.draftOrder.name, result.draftOrder.totalPrice);

        // 3. Limpar carrinho apenas após sucesso
        clearCart();
      } else {
        throw new Error("Erro ao criar pedido");
      }
    } catch (err) {
      console.error("Erro no checkout:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao finalizar pedido. Tente novamente.",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Meu Carrinho ({cartCount})
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#2563EB]">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-500 mb-6">
              Aproveite nossas ofertas e abasteça seu negócio agora mesmo.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#2563EB] text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
            >
              Ir às compras
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de Itens */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4 items-start sm:items-center"
                >
                  <Link
                    href={`/produto/${item.handle}`}
                    className="w-20 h-20 bg-gray-100 rounded-md shrink-0 flex items-center justify-center text-xs text-gray-400 relative overflow-hidden border border-gray-200 hover:opacity-80 transition-opacity"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    ) : (
                      <span>Sem Foto</span>
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/produto/${item.handle}`}
                      className="font-semibold text-gray-800 text-sm md:text-base hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>

                    <p className="text-xs text-gray-500 mt-1">
                      Unidade:{" "}
                      <span className="font-medium">{item.unit || "un"}</span>
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 justify-between sm:justify-start">
                      <span className="font-bold text-[#2563EB] text-lg">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </span>

                      <div className="flex items-center border border-gray-300 rounded-md text-sm h-8 bg-gray-50">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 h-full hover:bg-gray-200 text-gray-600 disabled:opacity-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 h-full flex items-center justify-center border-x border-gray-300 min-w-[40px] bg-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 h-full hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-2 transition-colors -mr-2"
                    title="Remover item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:w-96">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                <h2 className="font-bold text-gray-800 mb-4 border-b pb-2">
                  Resumo do Pedido
                </h2>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {cartTotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Frete</span>
                    <span className="font-medium">Calculado no checkout</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg text-[#1e3a8a] border-t pt-4 mb-6">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#25D366] text-white py-3.5 rounded-md font-bold hover:bg-[#1da851] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/10 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Pedido via WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <Link
                  href="/"
                  className="block text-center text-[#2563EB] text-sm mt-4 hover:underline font-medium"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
