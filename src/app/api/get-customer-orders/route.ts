// src/app/api/get-customer-orders/route.ts
import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2024-01";

interface DraftOrder {
  id: string;
  name: string;
  status: string;
  totalPrice: string;
  createdAt: string;
  customer: {
    id: string;
    email: string;
  } | null;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        image: { url: string } | null;
        originalUnitPrice: string;
      };
    }>;
  };
}

interface Order {
  id: string;
  name: string;
  displayFinancialStatus: string;
  displayFulfillmentStatus: string;
  totalPriceSet: {
    shopMoney: { amount: string; currencyCode: string };
  };
  createdAt: string;
  customer: {
    id: string;
    email: string;
  } | null;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        image: { url: string } | null;
        originalUnitPriceSet: { shopMoney: { amount: string } };
      };
    }>;
  };
}

interface ShopifyOrdersResponse {
  data: {
    draftOrders: { edges: Array<{ node: DraftOrder }> };
    orders: { edges: Array<{ node: Order }> };
  };
  errors?: Array<{ message: string }>;
}

export async function POST(request: NextRequest) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Configuração do Shopify não encontrada" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { customerId } = body;

    // Validação estrita do ID
    if (!customerId) {
      return NextResponse.json(
        { error: "O ID do usuário é obrigatório para buscar pedidos." },
        { status: 400 },
      );
    }

    // A API de busca (query) do Shopify exige o ID numérico puro
    // Se vier no formato gid://shopify/Customer/123456, pegamos só os números
    const numericId = customerId.includes("/")
      ? customerId.split("/").pop()
      : customerId;

    // Sintaxe exata para garantir que a Shopify filtre corretamente
    const draftQuery = `customer_id:${numericId} AND status:open`;
    const ordersQuery = `customer_id:${numericId}`;

    // Juntamos tudo em UMA ÚNICA QUERY GraphQL
    const combinedQuery = `
      query getCustomerOrders($draftQuery: String!, $ordersQuery: String!) {
        draftOrders(first: 50, query: $draftQuery, sortKey: UPDATED_AT, reverse: true) {
          edges {
            node {
              id
              name
              status
              totalPrice
              createdAt
              customer { id email }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    image { url }
                    originalUnitPrice
                  }
                }
              }
            }
          }
        }
        orders(first: 50, query: $ordersQuery, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              id
              name
              displayFinancialStatus
              displayFulfillmentStatus
              totalPriceSet { shopMoney { amount currencyCode } }
              createdAt
              customer { id email }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    image { url }
                    originalUnitPriceSet { shopMoney { amount } }
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Apenas um fetch
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query: combinedQuery,
          variables: {
            draftQuery: draftQuery,
            ordersQuery: ordersQuery,
          },
        }),
      },
    );

    if (!response.ok) {
      console.error("Shopify API HTTP error:", response.status);
      return NextResponse.json(
        { error: "Erro ao comunicar com Shopify" },
        { status: 502 },
      );
    }

    const responseData: ShopifyOrdersResponse = await response.json();

    if (responseData.errors) {
      console.error("GraphQL errors:", responseData.errors);
      return NextResponse.json(
        { error: "Erro na consulta de pedidos" },
        { status: 400 },
      );
    }

    // Formatar draft orders
    const drafts = (responseData.data?.draftOrders?.edges || []).map(
      ({ node }) => ({
        id: node.id,
        name: node.name,
        status: node.status,
        totalPrice: node.totalPrice,
        createdAt: node.createdAt,
        type: "draft" as const,
        lineItems: node.lineItems.edges.map(({ node: item }) => ({
          title: item.title,
          quantity: item.quantity,
          image: item.image?.url || null,
          price: item.originalUnitPrice,
        })),
      }),
    );

    // Formatar orders
    const orders = (responseData.data?.orders?.edges || []).map(({ node }) => ({
      id: node.id,
      name: node.name,
      status: node.displayFinancialStatus,
      fulfillmentStatus: node.displayFulfillmentStatus,
      totalPrice: node.totalPriceSet.shopMoney.amount,
      currencyCode: node.totalPriceSet.shopMoney.currencyCode,
      createdAt: node.createdAt,
      type: "order" as const,
      lineItems: node.lineItems.edges.map(({ node: item }) => ({
        title: item.title,
        quantity: item.quantity,
        image: item.image?.url || null,
        price: item.originalUnitPriceSet.shopMoney.amount,
      })),
    }));

    return NextResponse.json({
      success: true,
      drafts,
      orders,
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
