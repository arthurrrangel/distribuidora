"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ShoppingBag,
  ArrowLeft,
  ClipboardList,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { fetchCustomerOrders, DraftOrderItem } from "@/services/orderService";

// --- TIPAGEM ---
interface OrderLineItem {
  title: string;
  quantity: number;
  variant: {
    image: {
      url: string;
      altText: string | null;
    } | null;
    price: {
      amount: string;
      currencyCode: string;
    };
  } | null;
}

interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: OrderLineItem;
    }>;
  };
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

interface OrdersResponse {
  data: {
    customer: {
      orders: {
        edges: Array<{
          node: Order;
        }>;
        pageInfo: PageInfo;
      };
    } | null;
  };
}

const ORDERS_PER_PAGE = 5;
const DRAFTS_PER_PAGE = 5;

export default function MeusPedidosPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [draftOrders, setDraftOrders] = useState<DraftOrderItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cursors, setCursors] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "paid">(
    "all",
  );
  const [draftPage, setDraftPage] = useState(1);

  // Filtrar pedidos baseado no status selecionado
  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "pending") {
      return ["PENDING", "AUTHORIZED", "PARTIALLY_PAID"].includes(
        order.financialStatus,
      );
    }
    if (statusFilter === "paid") {
      return order.financialStatus === "PAID";
    }
    return true;
  });

  // Paginação de draft orders
  const totalDraftPages = Math.ceil(draftOrders.length / DRAFTS_PER_PAGE);
  const paginatedDrafts = draftOrders.slice(
    (draftPage - 1) * DRAFTS_PER_PAGE,
    draftPage * DRAFTS_PER_PAGE,
  );

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const fetchOrders = useCallback(
    async (cursor?: string, direction: "next" | "prev" = "next") => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      setLoading(true);
      setError(null);

      const query = `
      query getCustomerOrders($customerAccessToken: String!, $first: Int, $last: Int, $after: String, $before: String) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: $first, last: $last, after: $after, before: $before, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                orderNumber
                processedAt
                financialStatus
                fulfillmentStatus
                totalPrice {
                  amount
                  currencyCode
                }
                lineItems(first: 50) {
                  edges {
                    node {
                      title
                      quantity
                      variant {
                        image {
                          url
                          altText
                        }
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      }
    `;

      try {
        const variables: Record<string, unknown> = {
          customerAccessToken: accessToken,
        };

        if (direction === "next") {
          variables.first = ORDERS_PER_PAGE;
          if (cursor) variables.after = cursor;
        } else {
          variables.last = ORDERS_PER_PAGE;
          if (cursor) variables.before = cursor;
        }

        const response = await api.post<OrdersResponse>("", {
          query,
          variables,
        });

        const customerData = response.data.data.customer;

        if (customerData?.orders) {
          const fetchedOrders = customerData.orders.edges.map(
            (edge) => edge.node,
          );
          setOrders(fetchedOrders);
          setPageInfo(customerData.orders.pageInfo);
        } else {
          setOrders([]);
          setPageInfo(null);
        }
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError("Não foi possível carregar seus pedidos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  // Buscar Draft Orders via Admin API
  const fetchDraftOrders = useCallback(async () => {
    if (!user?.id) return;

    try {
      const result = await fetchCustomerOrders(user.id, user.email);
      if (result.success) {
        setDraftOrders(result.drafts);
      }
    } catch (err) {
      console.error("Erro ao buscar rascunhos:", err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDraftOrders();
    }
  }, [user, fetchDraftOrders]);

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      setCursors((prev) => [...prev, pageInfo.startCursor || ""]);
      setCurrentPage((prev) => prev + 1);
      fetchOrders(pageInfo.endCursor, "next");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevCursor = cursors[cursors.length - 1];
      setCursors((prev) => prev.slice(0, -1));
      setCurrentPage((prev) => prev - 1);

      if (prevCursor) {
        fetchOrders(prevCursor, "prev");
      } else {
        fetchOrders(undefined, "next");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(parseFloat(amount));
  };

  const getFinancialStatusInfo = (status: string) => {
    const statusMap: Record<
      string,
      { label: string; color: string; icon: typeof CheckCircle2 }
    > = {
      PAID: {
        label: "Pago",
        color: "text-green-600 bg-green-50",
        icon: CheckCircle2,
      },
      PENDING: {
        label: "Pendente",
        color: "text-yellow-600 bg-yellow-50",
        icon: Clock,
      },
      REFUNDED: {
        label: "Reembolsado",
        color: "text-blue-600 bg-blue-50",
        icon: CreditCard,
      },
      VOIDED: {
        label: "Cancelado",
        color: "text-red-600 bg-red-50",
        icon: XCircle,
      },
      PARTIALLY_REFUNDED: {
        label: "Parcialmente Reembolsado",
        color: "text-orange-600 bg-orange-50",
        icon: CreditCard,
      },
      AUTHORIZED: {
        label: "Autorizado",
        color: "text-blue-600 bg-blue-50",
        icon: CreditCard,
      },
    };
    return (
      statusMap[status] || {
        label: status,
        color: "text-gray-600 bg-gray-50",
        icon: AlertCircle,
      }
    );
  };

  const getFulfillmentStatusInfo = (status: string) => {
    const statusMap: Record<
      string,
      { label: string; color: string; icon: typeof Truck }
    > = {
      FULFILLED: {
        label: "Entregue",
        color: "text-green-600 bg-green-50",
        icon: CheckCircle2,
      },
      UNFULFILLED: {
        label: "Em Processamento",
        color: "text-yellow-600 bg-yellow-50",
        icon: Clock,
      },
      PARTIALLY_FULFILLED: {
        label: "Parcialmente Enviado",
        color: "text-blue-600 bg-blue-50",
        icon: Truck,
      },
      IN_PROGRESS: {
        label: "Em Preparação",
        color: "text-orange-600 bg-orange-50",
        icon: Package,
      },
      ON_HOLD: {
        label: "Em Espera",
        color: "text-gray-600 bg-gray-50",
        icon: Clock,
      },
      SCHEDULED: {
        label: "Agendado",
        color: "text-purple-600 bg-purple-50",
        icon: Calendar,
      },
    };
    return (
      statusMap[status] || {
        label: status || "Aguardando",
        color: "text-gray-600 bg-gray-50",
        icon: Clock,
      }
    );
  };

  // Loading state
  if (authLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Carregando...</div>
        </div>
        <Footer />
        <MobileNavigator />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-12 flex-1 mt-16 md:mt-0">
        {/* Breadcrumb / Voltar */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#2563EB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a loja
          </Link>
        </div>

        {/* Título */}
        <div className="mx-auto mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] flex items-center justify-center gap-3">
            <Package className="w-7 h-7 md:w-8 md:h-8" />
            Meus Pedidos
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Acompanhe o status dos seus pedidos
          </p>
        </div>

        {/* Filtros de Status e Paginação */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Filtros */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                statusFilter === "all"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "bg-white/70 backdrop-blur-md text-gray-600 border-gray-200 hover:bg-white hover:shadow-md"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                statusFilter === "pending"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "bg-white/70 backdrop-blur-md text-gray-600 border-gray-200 hover:bg-white hover:shadow-md"
              }`}
            >
              Em Aberto
            </button>
            <button
              onClick={() => setStatusFilter("paid")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                statusFilter === "paid"
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md"
                  : "bg-white/70 backdrop-blur-md text-gray-600 border-gray-200 hover:bg-white hover:shadow-md"
              }`}
            >
              Pagos
            </button>
          </div>

          {/* Paginação Superior */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl transition-all duration-300 border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-blue-600 shadow-sm"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-600 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
              Página {currentPage}
            </span>

            <button
              onClick={handleNextPage}
              disabled={!pageInfo?.hasNextPage}
              className={`p-2 rounded-xl transition-all duration-300 border ${
                !pageInfo?.hasNextPage
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-blue-600 shadow-sm"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Draft Orders - Pedidos em Aberto */}
        {statusFilter !== "paid" && draftOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1e3a8a] mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Pedidos Aguardando Pagamento ({draftOrders.length})
            </h2>
            <div className="space-y-4">
              {paginatedDrafts.map((draft) => (
                <Link
                  key={draft.id}
                  href={`/meus-pedidos/draft-${draft.id.split("/").pop()}`}
                  className="block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)] hover:border-blue-400 hover:-translate-y-2 relative cursor-pointer"
                >
                  {/* Header do Draft */}
                  <div className="bg-gradient-to-r from-gray-50 to-white px-4 md:px-6 py-4 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
                          <ClipboardList
                            className="w-5 h-5 text-blue-600"
                            strokeWidth={2.5}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1e3a8a]">
                            {draft.name}
                          </h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(draft.createdAt).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100/80 text-blue-700 border border-blue-200/50">
                          <Clock className="w-3.5 h-3.5" />
                          Aguardando Pagamento
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Itens do Draft */}
                  <div className="px-4 md:px-6 py-4">
                    <div className="flex flex-col gap-3 mb-4 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                      {draft.lineItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-white shadow-sm border border-blue-100 rounded-xl p-2 pr-4 w-full"
                        >
                          <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <Package className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 break-words whitespace-normal leading-tight">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Qtd: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                      <span className="text-sm text-gray-500">
                        Total do pedido
                      </span>
                      <span className="text-lg font-bold text-[#1e3a8a]">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(parseFloat(draft.totalPrice))}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Paginação dos Draft Orders */}
            {totalDraftPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setDraftPage((prev) => Math.max(1, prev - 1))}
                  disabled={draftPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    draftPage === 1
                      ? "bg-gray-100/70 text-gray-400 cursor-not-allowed"
                      : "bg-white shadow-[0_2px_10px_rgba(37,99,235,0.1)] text-gray-700 hover:shadow-[0_4px_15px_rgba(37,99,235,0.15)]"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <span className="text-sm text-gray-600 font-medium bg-white shadow-[0_2px_10px_rgba(37,99,235,0.1)] px-4 py-2 rounded-xl">
                  {draftPage} de {totalDraftPages}
                </span>

                <button
                  onClick={() =>
                    setDraftPage((prev) => Math.min(totalDraftPages, prev + 1))
                  }
                  disabled={draftPage === totalDraftPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    draftPage === totalDraftPages
                      ? "bg-gray-100/70 text-gray-400 cursor-not-allowed"
                      : "bg-white shadow-[0_2px_10px_rgba(37,99,235,0.1)] text-gray-700 hover:shadow-[0_4px_15px_rgba(37,99,235,0.15)]"
                  }`}
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Conteúdo */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-36"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-[0_4px_20px_rgba(239,68,68,0.1)] p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => fetchOrders()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Tentar novamente
            </button>
          </div>
        ) : orders.length === 0 ? (
          draftOrders.length > 0 ? null : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center max-w-lg mx-auto px-6 py-8">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum pedido encontrado
              </h2>
              <p className="text-gray-500 mb-6">
                Você ainda não realizou nenhum pedido.
              </p>
              <Link
                href="/"
                className="bg-[#2563EB] text-white rounded-md font-medium hover:bg-blue-700 transition-colors px-6 py-3 inline-block"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Começar a comprar
                </span>
              </Link>
            </div>
          )
        ) : (
          <>
            {/* Lista de Pedidos */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center max-w-lg mx-auto">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Nenhum pedido{" "}
                  {statusFilter === "pending"
                    ? "em aberto"
                    : statusFilter === "paid"
                      ? "pago"
                      : ""}
                </h2>
                <p className="text-gray-500 text-sm">
                  {statusFilter === "pending"
                    ? "Você não possui pedidos aguardando pagamento."
                    : statusFilter === "paid"
                      ? "Você não possui pedidos pagos."
                      : "Você não possui pedidos."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const financialStatus = getFinancialStatusInfo(
                    order.financialStatus,
                  );
                  const fulfillmentStatus = getFulfillmentStatusInfo(
                    order.fulfillmentStatus,
                  );
                  const FinancialIcon = financialStatus.icon;
                  const FulfillmentIcon = fulfillmentStatus.icon;

                  return (
                    <Link
                      key={order.id}
                      href={`/meus-pedidos/order-${order.id.split("/").pop()}`}
                      className="block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)] hover:border-blue-400 hover:-translate-y-2 relative cursor-pointer"
                    >
                      {/* Header do Pedido */}
                      <div className="bg-gradient-to-r from-gray-50 to-white px-4 md:px-6 py-4 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
                              <ClipboardList
                                className="w-5 h-5 text-blue-600"
                                strokeWidth={2.5}
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-[#1e3a8a]">
                                Pedido #{order.orderNumber}
                              </h3>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(order.processedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${financialStatus.color}`}
                            >
                              <FinancialIcon className="w-3.5 h-3.5" />
                              {financialStatus.label}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${fulfillmentStatus.color}`}
                            >
                              <FulfillmentIcon className="w-3.5 h-3.5" />
                              {fulfillmentStatus.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Itens do Pedido */}
                      <div className="px-4 md:px-6 py-4">
                        <div className="flex flex-col gap-3 mb-4 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                          {order.lineItems.edges.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 bg-white shadow-sm border border-blue-100 rounded-xl p-2 pr-4 w-full"
                            >
                              <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                {item.node.variant?.image?.url ? (
                                  <Image
                                    src={item.node.variant.image.url}
                                    alt={
                                      item.node.variant.image.altText ||
                                      item.node.title
                                    }
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <Package className="w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-800 break-words whitespace-normal leading-tight">
                                  {item.node.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Qtd: {item.node.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                          <span className="text-sm text-gray-500">
                            Total do pedido
                          </span>
                          <span className="text-lg font-bold text-[#1e3a8a]">
                            {formatPrice(
                              order.totalPrice.amount,
                              order.totalPrice.currencyCode,
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Paginação */}
            <div className="flex items-center justify-center gap-4 mt-8 pb-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-100/70 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-white shadow-[0_2px_10px_rgba(37,99,235,0.1)] text-gray-700 hover:shadow-[0_4px_15px_rgba(37,99,235,0.15)]"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <span className="text-sm text-gray-600 font-medium bg-white shadow-[0_2px_10px_rgba(37,99,235,0.1)] px-4 py-2 rounded-xl">
                Página {currentPage}
              </span>

              <button
                onClick={handleNextPage}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  !pageInfo?.hasNextPage
                    ? "bg-gray-100/70 text-gray-400 cursor-not-allowed opacity-50"
                    : "bg-white shadow-[0_2px_10px_rgba(37,99,235,0.1)] text-gray-700 hover:shadow-[0_4px_15px_rgba(37,99,235,0.15)]"
                }`}
              >
                <span className="hidden sm:inline">Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
