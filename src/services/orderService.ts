// src/services/orderService.ts

export interface OrderLineItem {
  title: string;
  quantity: number;
  image: string | null;
  price: string;
}

export interface DraftOrderItem {
  id: string;
  name: string;
  status: string;
  totalPrice: string;
  createdAt: string;
  type: "draft";
  lineItems: OrderLineItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  status: string;
  fulfillmentStatus: string;
  totalPrice: string;
  currencyCode: string;
  createdAt: string;
  type: "order";
  lineItems: OrderLineItem[];
}

export interface CustomerOrdersResponse {
  success: boolean;
  drafts: DraftOrderItem[];
  orders: OrderItem[];
  error?: string;
}

/**
 * Busca todos os pedidos do cliente via Admin API
 * Inclui Draft Orders (rascunhos/pendentes) e Orders (pedidos confirmados)
 */
export async function fetchCustomerOrders(
  customerId: string,
  customerEmail?: string,
): Promise<CustomerOrdersResponse> {
  try {
    const response = await fetch("/api/get-customer-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        customerEmail,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Erro ao buscar pedidos");
    }

    const data: CustomerOrdersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return {
      success: false,
      drafts: [],
      orders: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Cria um Draft Order na Shopify
 */
export interface CreateDraftOrderInput {
  lineItems: Array<{
    variantId: string;
    quantity: number;
    title?: string;
    price?: number;
  }>;
  customer?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  customerId?: string;
  note?: string;
}

export interface DraftOrderResponse {
  success: boolean;
  draftOrder?: {
    id: string;
    name: string;
    invoiceUrl: string;
    totalPrice: string;
    status: string;
  };
  error?: string;
}

export async function createDraftOrder(
  input: CreateDraftOrderInput,
): Promise<DraftOrderResponse> {
  try {
    const response = await fetch("/api/create-draft-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Erro ao criar pedido");
    }

    const data: DraftOrderResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating draft order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
