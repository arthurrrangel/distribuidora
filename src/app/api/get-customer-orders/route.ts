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
        image: {
          url: string;
        } | null;
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
    shopMoney: {
      amount: string;
      currencyCode: string;
    };
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
        image: {
          url: string;
        } | null;
        originalUnitPriceSet: {
          shopMoney: {
            amount: string;
          };
        };
      };
    }>;
  };
}

interface ShopifyDraftOrdersResponse {
  data: {
    draftOrders: {
      edges: Array<{
        node: DraftOrder;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

interface ShopifyOrdersResponse {
  data: {
    orders: {
      edges: Array<{
        node: Order;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

export async function POST(request: NextRequest) {
  // Validar configuração
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Configuração do Shopify não encontrada" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { customerId, customerEmail } = body;

    if (!customerId && !customerEmail) {
      return NextResponse.json(
        { error: "customerId ou customerEmail é obrigatório" },
        { status: 400 },
      );
    }

    // Query para Draft Orders
    const draftOrdersQuery = `
      query getDraftOrders($query: String!) {
        draftOrders(first: 50, query: $query, sortKey: UPDATED_AT, reverse: true) {
          edges {
            node {
              id
              name
              status
              totalPrice
              createdAt
              customer {
                id
                email
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    image {
                      url
                    }
                    originalUnitPrice
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Query para Orders
    const ordersQuery = `
      query getOrders($query: String!) {
        orders(first: 50, query: $query, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              id
              name
              displayFinancialStatus
              displayFulfillmentStatus
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              createdAt
              customer {
                id
                email
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    image {
                      url
                    }
                    originalUnitPriceSet {
                      shopMoney {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Montar query string para Shopify
    // Usar email como busca principal (mais confiável)
    let searchQuery = "";
    if (customerEmail) {
      searchQuery = `email:${customerEmail}`;
    } else if (customerId) {
      const numericId = customerId.split("/").pop();
      searchQuery = `customer_id:${numericId}`;
    }

    // Query para draft orders abertos
    const draftQuery = `${searchQuery} status:open`;

    console.log("Draft query:", draftQuery);
    console.log("Orders query:", searchQuery);

    // Fazer requests em paralelo
    const [draftOrdersResponse, ordersResponse] = await Promise.all([
      fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
          },
          body: JSON.stringify({
            query: draftOrdersQuery,
            variables: { query: draftQuery },
          }),
        },
      ),
      fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
          },
          body: JSON.stringify({
            query: ordersQuery,
            variables: { query: searchQuery },
          }),
        },
      ),
    ]);

    if (!draftOrdersResponse.ok || !ordersResponse.ok) {
      console.error("Shopify API error");
      return NextResponse.json(
        { error: "Erro ao comunicar com Shopify" },
        { status: 502 },
      );
    }

    const draftOrdersData: ShopifyDraftOrdersResponse =
      await draftOrdersResponse.json();
    const ordersData: ShopifyOrdersResponse = await ordersResponse.json();

    // Verificar erros
    if (draftOrdersData.errors) {
      console.error("Draft orders errors:", draftOrdersData.errors);
    }
    if (ordersData.errors) {
      console.error("Orders errors:", ordersData.errors);
    }

    // Formatar draft orders
    const drafts = (draftOrdersData.data?.draftOrders?.edges || []).map(
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
    const orders = (ordersData.data?.orders?.edges || []).map(({ node }) => ({
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
