"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  CreditCard,
  Truck,
  MapPin,
  User,
  Receipt,
  Loader2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Tag,
} from "lucide-react";

// ─── helpers ─────────────────────────────────────────────────────────────────

function fmt(amount: string, currency = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(parseFloat(amount ?? "0"));
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_MAP: Record<
  string,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  PAID: {
    label: "Pago",
    color: "text-green-700 bg-green-50 border-green-200",
    icon: CheckCircle2,
  },
  PENDING: {
    label: "Aguardando Pagamento",
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    icon: Clock,
  },
  OPEN: {
    label: "Aguardando Pagamento",
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    icon: Clock,
  },
  REFUNDED: {
    label: "Reembolsado",
    color: "text-[#0464D5] bg-blue-50 border-[#0464D5]/20",
    icon: CreditCard,
  },
  VOIDED: {
    label: "Cancelado",
    color: "text-red-700 bg-red-50 border-red-200",
    icon: XCircle,
  },
  PARTIALLY_REFUNDED: {
    label: "Parcialmente Reembolsado",
    color: "text-orange-700 bg-orange-50 border-orange-200",
    icon: CreditCard,
  },
  AUTHORIZED: {
    label: "Autorizado",
    color: "text-[#0464D5] bg-blue-50 border-[#0464D5]/20",
    icon: CreditCard,
  },
  COMPLETED: {
    label: "Confirmado",
    color: "text-green-700 bg-green-50 border-green-200",
    icon: CheckCircle2,
  },
  FULFILLED: {
    label: "Entregue",
    color: "text-green-700 bg-green-50 border-green-200",
    icon: CheckCircle2,
  },
  UNFULFILLED: {
    label: "Não processado",
    color: "text-gray-600 bg-gray-50 border-gray-200",
    icon: Clock,
  },
  PARTIALLY_FULFILLED: {
    label: "Parcialmente Enviado",
    color: "text-[#0464D5] bg-blue-50 border-[#0464D5]/20",
    icon: Truck,
  },
  IN_PROGRESS: {
    label: "Em andamento",
    color: "text-orange-700 bg-orange-50 border-orange-200",
    icon: Package,
  },
  ON_HOLD: {
    label: "Em suspensão",
    color: "text-purple-700 bg-purple-50 border-purple-200",
    icon: Clock,
  },
  SCHEDULED: {
    label: "Agendado",
    color: "text-[#0464D5] bg-blue-50 border-[#0464D5]/20",
    icon: Calendar,
  },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status?.toUpperCase()] ?? {
    label: status,
    color: "text-gray-700 bg-gray-50 border-gray-200",
    icon: AlertCircle,
  };
  const Icon = s.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${s.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {s.label}
    </span>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────

interface LineItem {
  title: string;
  quantity: number;
  image: { url: string; altText: string | null } | null;
  originalUnitPrice?: string;
  originalUnitPriceSet?: {
    shopMoney: { amount: string; currencyCode: string };
  };
  discountedUnitPrice?: string;
  discountedUnitPriceSet?: {
    shopMoney: { amount: string; currencyCode: string };
  };
  variant?: { sku: string | null } | null;
}

interface Address {
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
}

interface Fulfillment {
  status: string;
  createdAt: string;
  trackingInfo: Array<{
    number: string;
    url: string | null;
    company: string | null;
  }>;
}

interface OrderDetail {
  id: string;
  name: string;
  status?: string;
  displayFinancialStatus?: string;
  displayFulfillmentStatus?: string;
  createdAt: string;
  updatedAt?: string;
  note?: string | null;
  note2?: string | null;
  invoiceUrl?: string;
  email?: string;
  phone?: string;
  totalPrice?: string;
  totalPriceSet?: { shopMoney: { amount: string; currencyCode: string } };
  subtotalPrice?: string;
  subtotalPriceSet?: { shopMoney: { amount: string; currencyCode: string } };
  totalTax?: string;
  totalTaxSet?: { shopMoney: { amount: string; currencyCode: string } };
  totalShippingPriceSet?: {
    shopMoney: { amount: string; currencyCode: string };
  };
  totalDiscountsSet?: { shopMoney: { amount: string; currencyCode: string } };
  // Draft order: single manual discount
  appliedDiscount?: {
    title: string;
    value: number;
    valueType: string;
    amountV2?: { amount: string; currencyCode: string };
  } | null;
  // Confirmed order: discount applications (codes + manual)
  discountApplications?: {
    edges: Array<{
      node: {
        allocationMethod: string;
        value:
          | { percentage: number }
          | { amount: string; currencyCode: string };
        code?: string; // DiscountCodeApplication
        title?: string; // ManualDiscountApplication / ScriptDiscountApplication
      };
    }>;
  };
  shippingAddress?: Address | null;
  customer?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  } | null;
  lineItems: { edges: Array<{ node: LineItem }> };
  fulfillments?: Fulfillment[];
}

// ─── component ────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const slug = params.id; // e.g. "order-123456" or "draft-123456"

  // Parse route slug outside the effect so we never call setState synchronously
  const parsed = useMemo(() => {
    if (!slug) return null;
    const idx = slug.indexOf("-");
    if (idx === -1) return null;
    const kind = slug.slice(0, idx);
    const numericId = slug.slice(idx + 1);
    if (!kind || !numericId) return null;
    return {
      type: kind === "draft" ? ("draft" as const) : ("order" as const),
      numericId,
    };
  }, [slug]);

  const type = parsed?.type ?? "order";

  const [order, setOrder] = useState<OrderDetail | null>(null);
  // If slug is invalid we don't need to load anything
  const [loading, setLoading] = useState(parsed !== null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Derive display error
  const error = !parsed ? "ID inválido." : fetchError;

  useEffect(() => {
    if (!parsed) return; // Invalid slug — already handled via derived error
    const { type: orderType, numericId } = parsed;

    fetch("/api/get-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: orderType, numericId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.success)
          throw new Error(data.error ?? "Erro ao buscar pedido");
        setOrder(data.order);

        console.log(data);
      })
      .catch((e) => setFetchError(e.message))
      .finally(() => setLoading(false));
  }, [parsed]);

  // ── loading ──
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#0464D5] animate-spin" />
        </div>
        <Footer />
        <MobileNavigator />
      </main>
    );
  }

  // ── error ──
  if (error || !order) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-600 font-medium mb-4">
              {error ?? "Pedido não encontrado"}
            </p>
            <Link
              href="/meus-pedidos"
              className="text-[#0464D5] hover:underline text-sm"
            >
              Voltar para Meus Pedidos
            </Link>
          </div>
        </div>
        <Footer />
        <MobileNavigator />
      </main>
    );
  }

  const totalAmount =
    order.totalPriceSet?.shopMoney.amount ?? order.totalPrice ?? "0";
  const totalCurrency = order.totalPriceSet?.shopMoney.currencyCode ?? "BRL";
  const subtotalAmount =
    order.subtotalPriceSet?.shopMoney.amount ?? order.subtotalPrice ?? "0";
  const taxAmount =
    order.totalTaxSet?.shopMoney.amount ?? order.totalTax ?? "0";
  const shippingAmount = order.totalShippingPriceSet?.shopMoney.amount ?? "0";
  const discountAmount = order.totalDiscountsSet?.shopMoney.amount ?? "0";
  const discountCurrency =
    order.totalDiscountsSet?.shopMoney.currencyCode ?? totalCurrency;

  // Collect human-readable discount labels
  const discountLabels: string[] = [];
  if (type === "draft" && order.appliedDiscount) {
    const d = order.appliedDiscount;
    const label =
      d.valueType === "PERCENTAGE"
        ? `${d.title} (${d.value}%)`
        : `${d.title} (${fmt(
            d.amountV2?.amount ?? String(d.value),
            d.amountV2?.currencyCode ?? totalCurrency,
          )})`;
    discountLabels.push(label);
  }
  if (type === "order" && order.discountApplications) {
    order.discountApplications.edges.forEach(({ node }) => {
      const name =
        (node as { code?: string }).code ??
        (node as { title?: string }).title ??
        "Desconto";
      const val = node.value;
      const valStr =
        "percentage" in val
          ? `${(val.percentage * 100).toFixed(0)}%`
          : fmt(
              (val as { amount: string; currencyCode: string }).amount,
              (val as { amount: string; currencyCode: string }).currencyCode,
            );
      discountLabels.push(`${name} (${valStr})`);
    });
  }

  const finStatus =
    type === "draft"
      ? (order.status ?? "OPEN")
      : (order.displayFinancialStatus ?? "");
  const fulStatus =
    type === "order" ? (order.displayFulfillmentStatus ?? "") : "";

  const note = order.note ?? order.note2;
  const addr = order.shippingAddress;
  const fulfillments = order.fulfillments ?? [];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <Link
          href="/meus-pedidos"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0464D5] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Meus Pedidos
        </Link>

        {/* Header do Pedido */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {order.name}
              </h1>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {fmtDate(order.createdAt)}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">
                  Pagamento
                </span>
                <StatusBadge status={finStatus} />
              </div>
              {fulStatus && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">
                    Pedido
                  </span>
                  <StatusBadge status={fulStatus} />
                </div>
              )}
            </div>
          </div>

          {/* Botão pagar (draft) — só exibe se ainda não houve pagamento/processamento */}
          {type === "draft" &&
            order.invoiceUrl &&
            ["OPEN", "INVOICE_SENT", "PENDING"].includes(
              (order.status ?? "OPEN").toUpperCase(),
            ) && (
              <a
                href={order.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-[#0464D5] hover:bg-[#0353b4] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-[#0464D5]/10"
              >
                <CreditCard className="w-4 h-4" />
                Pagar agora
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Coluna esquerda (itens) */}
          <div className="md:col-span-2 space-y-4">
            {/* Itens */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <h2 className="font-bold text-gray-800 text-sm">
                  Itens do Pedido
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {order.lineItems.edges.map(({ node: item }, i) => {
                  const unitPrice =
                    item.originalUnitPriceSet?.shopMoney.amount ??
                    item.originalUnitPrice ??
                    "0";
                  const discountedPrice =
                    item.discountedUnitPriceSet?.shopMoney.amount ??
                    item.discountedUnitPrice ??
                    null;
                  const currency =
                    item.originalUnitPriceSet?.shopMoney.currencyCode ?? "BRL";
                  const hasDiscount =
                    discountedPrice !== null &&
                    parseFloat(discountedPrice) < parseFloat(unitPrice);
                  return (
                    <div key={i} className="flex items-center gap-4 px-5 py-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        {item.image?.url ? (
                          <Image
                            src={item.image.url}
                            alt={item.image.altText ?? item.title}
                            width={56}
                            height={56}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Package className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-tight">
                          {item.title}
                        </p>
                        <div className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-1.5">
                          {hasDiscount ? (
                            <>
                              <span className="line-through text-gray-400">
                                {fmt(unitPrice, currency)}
                              </span>
                              <span className="text-green-600 font-semibold">
                                {fmt(discountedPrice!, currency)}
                              </span>
                            </>
                          ) : (
                            <span>{fmt(unitPrice, currency)}</span>
                          )}
                          <span className="text-gray-400">
                            × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900 shrink-0">
                        {fmt(
                          String(
                            parseFloat(
                              hasDiscount ? discountedPrice! : unitPrice,
                            ) * item.quantity,
                          ),
                          currency,
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rastreamento (orders only) */}
            {fulfillments.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <h2 className="font-bold text-gray-800 text-sm">
                    Rastreamento
                  </h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {fulfillments.map((f, i) => (
                    <div key={i} className="px-5 py-4">
                      <StatusBadge status={f.status} />
                      <p className="text-xs text-gray-400 mt-1">
                        {fmtDate(f.createdAt)}
                      </p>
                      {f.trackingInfo.map((t, j) => (
                        <div key={j} className="mt-2">
                          <p className="text-xs font-medium text-gray-600">
                            {t.company ?? "Transportadora"}: {t.number}
                          </p>
                          {t.url && (
                            <a
                              href={t.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#0464D5] hover:underline inline-flex items-center gap-1 mt-0.5"
                            >
                              Rastrear <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nota */}
            {note && (
              <div className="bg-yellow-50 border border-yellow-100 rounded-2xl px-5 py-4">
                <p className="text-xs font-semibold text-yellow-700 mb-1 flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5" /> Observação
                </p>
                <p className="text-sm text-yellow-800">{note}</p>
              </div>
            )}
          </div>

          {/* Coluna direita */}
          <div className="space-y-4">
            {/* Resumo financeiro */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-gray-400" />
                <h2 className="font-bold text-gray-800 text-sm">Resumo</h2>
              </div>
              <div className="px-5 py-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{fmt(subtotalAmount, totalCurrency)}</span>
                </div>

                {/* Discounts */}
                {parseFloat(discountAmount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Desconto
                    </span>
                    <span className="font-semibold">
                      -{fmt(discountAmount, discountCurrency)}
                    </span>
                  </div>
                )}

                {parseFloat(shippingAmount) > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>Frete</span>
                    <span>{fmt(shippingAmount, totalCurrency)}</span>
                  </div>
                )}
                {parseFloat(taxAmount) > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>Impostos</span>
                    <span>{fmt(taxAmount, totalCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>{fmt(totalAmount, totalCurrency)}</span>
                </div>
              </div>
            </div>

            {/* Endereço de entrega */}
            {addr && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <h2 className="font-bold text-gray-800 text-sm">Endereço</h2>
                </div>
                <div className="px-5 py-4 text-sm text-gray-600 space-y-0.5">
                  {addr.name && (
                    <p className="font-semibold text-gray-800">{addr.name}</p>
                  )}
                  {addr.address1 && <p>{addr.address1}</p>}
                  {addr.address2 && <p>{addr.address2}</p>}
                  {(addr.city || addr.province) && (
                    <p>
                      {[addr.city, addr.province].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {(addr.country || addr.zip) && (
                    <p>
                      {[addr.country, addr.zip].filter(Boolean).join(" – ")}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Cliente */}
            {order.customer && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <h2 className="font-bold text-gray-800 text-sm">Cliente</h2>
                </div>
                <div className="px-5 py-4 text-sm text-gray-600 space-y-0.5">
                  <p className="font-semibold text-gray-800">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.customer.email}</p>
                  {order.customer.phone && <p>{order.customer.phone}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
