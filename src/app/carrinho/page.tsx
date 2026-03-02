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
  CheckCircle2,
  CreditCard,
  MessageCircle,
  Tag,
  X,
  Percent,
  BadgePercent,
  Truck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface DraftOrderResult {
  name: string;
  invoiceUrl: string;
  totalPrice: string;
}

interface AppliedDiscount {
  code: string;
  title: string;
  valueType: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING";
  value: number;
  currencyCode?: string;
}

function fmtBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcDiscount(
  subtotal: number,
  discount: AppliedDiscount | null,
): number {
  if (!discount) return 0;
  if (discount.valueType === "PERCENTAGE")
    return subtotal * (discount.value / 100);
  if (discount.valueType === "FIXED_AMOUNT")
    return Math.min(discount.value, subtotal);
  return 0;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal, cartCount, clearCart } =
    useCart();
  const { user } = useAuth();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftOrder, setDraftOrder] = useState<DraftOrderResult | null>(null);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] =
    useState<AppliedDiscount | null>(null);

  const discountAmount = calcDiscount(cartTotal, appliedDiscount);
  const total = cartTotal - discountAmount;

  // ── coupon handlers ──
  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponLoading(true);
    setCouponError(null);
    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!data.success) {
        setCouponError(data.error ?? "Cupom inválido");
        return;
      }
      setAppliedDiscount(data.discount);
      setCouponInput("");
    } catch {
      setCouponError("Erro ao validar cupom. Tente novamente.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
    setCouponError(null);
  };

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";

  const buildWhatsAppLink = (order: DraftOrderResult) => {
    const itemsList = items
      .map(
        (item, i) =>
          `${i + 1}. *${item.title}*\n   Qtd: ${item.quantity} | R$ ${item.price.toFixed(2).replace(".", ",")}`,
      )
      .join("\n");
    let discountLine = "";
    if (appliedDiscount) {
      if (appliedDiscount.valueType === "PERCENTAGE") {
        discountLine = `\n🏷️ Cupom *${appliedDiscount.code}*: -${appliedDiscount.value}%`;
      } else if (appliedDiscount.valueType === "FREE_SHIPPING") {
        discountLine = `\n🏷️ Cupom *${appliedDiscount.code}*: Frete Grátis`;
      } else {
        discountLine = `\n🏷️ Cupom *${appliedDiscount.code}*: -${fmtBRL(discountAmount)}`;
      }
    }
    const message = encodeURIComponent(
      `Olá! Acabei de registrar o pedido *${order.name}* no valor de *R$ ${parseFloat(order.totalPrice).toFixed(2).replace(".", ",")}*.\n\n${itemsList}${discountLine}\n\nGostaria de combinar o pagamento.`,
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);

    try {
      const lineItems = items.map((item) => ({
        variantId: item.id,
        quantity: item.quantity,
        title: item.title,
        price: item.price,
      }));

      const orderBody: Record<string, unknown> = {
        lineItems,
        customerId: user?.id,
        customer: user
          ? {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            }
          : undefined,
        note: "Pedido via site",
      };

      if (appliedDiscount && appliedDiscount.valueType !== "FREE_SHIPPING") {
        orderBody.appliedDiscount = {
          title: appliedDiscount.code,
          value: appliedDiscount.value,
          valueType: appliedDiscount.valueType,
        };
      }

      const response = await fetch("/api/create-draft-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderBody),
      });

      const result = await response.json();
      if (!response.ok || !result.success || !result.draftOrder) {
        throw new Error(result.error || "Erro ao criar pedido");
      }

      setDraftOrder(result.draftOrder);
      clearCart();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao finalizar pedido. Tente novamente.",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  // â”€â”€ Tela de ConfirmaÃ§Ã£o â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (draftOrder) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Pedido Registrado!
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Seu pedido{" "}
              <span className="font-semibold text-gray-700">
                {draftOrder.name}
              </span>{" "}
              foi criado com sucesso. Escolha como deseja prosseguir:
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Total do pedido
              </p>
              <p className="text-2xl font-bold text-[#2563EB]">
                R${" "}
                {parseFloat(draftOrder.totalPrice).toFixed(2).replace(".", ",")}
              </p>
            </div>

            <div className="space-y-3">
              {/* BotÃ£o pagar via Shopify */}
              <a
                href={draftOrder.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition-colors shadow-md shadow-blue-900/10 active:scale-95"
              >
                <CreditCard className="w-5 h-5" />
                Pagar agora
              </a>

              {/* BotÃ£o WhatsApp */}
              <a
                href={buildWhatsAppLink(draftOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da851] text-white py-3.5 rounded-xl font-bold transition-colors active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Combinar pelo WhatsApp
              </a>

              <Link
                href="/"
                className="block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors pt-1"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
        <Footer />
        <MobileNavigator />
      </main>
    );
  }

  // â”€â”€ Tela do Carrinho â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
              Seu carrinho está vazio!
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
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24 space-y-5">
                <h2 className="font-bold text-gray-800 border-b pb-3">
                  Resumo do Pedido
                </h2>

                {/* ── Cupom ── */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                    Cupom de desconto
                  </label>

                  {appliedDiscount ? (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                      {appliedDiscount.valueType === "PERCENTAGE" ? (
                        <Percent className="w-4 h-4 text-green-600 shrink-0" />
                      ) : appliedDiscount.valueType === "FREE_SHIPPING" ? (
                        <Truck className="w-4 h-4 text-green-600 shrink-0" />
                      ) : (
                        <BadgePercent className="w-4 h-4 text-green-600 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-green-800 truncate">
                          {appliedDiscount.code}
                        </p>
                        <p className="text-xs text-green-600">
                          {appliedDiscount.valueType === "PERCENTAGE"
                            ? `${appliedDiscount.value}% de desconto`
                            : appliedDiscount.valueType === "FREE_SHIPPING"
                              ? "Frete grátis"
                              : `${fmtBRL(appliedDiscount.value)} de desconto`}
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-red-500 transition-colors p-1"
                        title="Remover cupom"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponError(null);
                          }}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                          placeholder="CÓDIGO"
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 uppercase placeholder:normal-case placeholder:tracking-normal"
                        />
                      </div>
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || couponInput.trim() === ""}
                        className="px-4 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                      >
                        {couponLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Aplicar"
                        )}
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <div className="mt-2 flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {couponError}
                    </div>
                  )}
                </div>

                {/* ── Totals ── */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{fmtBRL(cartTotal)}</span>
                  </div>

                  {appliedDiscount && (
                    <div className="flex justify-between">
                      {appliedDiscount.valueType === "FREE_SHIPPING" ? (
                        <>
                          <span className="flex items-center gap-1 text-green-600">
                            <Truck className="w-3.5 h-3.5" />
                            Frete (cupom)
                          </span>
                          <span className="text-green-600 font-medium">
                            Grátis
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-1 text-green-600">
                            <Tag className="w-3.5 h-3.5" />
                            Desconto ({appliedDiscount.code})
                          </span>
                          <span className="text-green-600 font-semibold">
                            -{fmtBRL(discountAmount)}
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between text-green-600">
                    <span>Frete</span>
                    <span className="font-medium">Calculado no checkout</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg text-[#1e3a8a] border-t pt-4">
                  <span>Total</span>
                  <span>{fmtBRL(total)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#2563EB] text-white py-3.5 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-900/10 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Finalizar Pedido
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
