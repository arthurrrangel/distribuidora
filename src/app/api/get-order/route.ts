import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2024-01";

export async function POST(request: NextRequest) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Configuração do Shopify não encontrada" },
      { status: 500 },
    );
  }

  const { type, numericId } = await request.json();
  if (!type || !numericId) {
    return NextResponse.json(
      { error: "Parâmetros inválidos" },
      { status: 400 },
    );
  }

  const query =
    type === "draft"
      ? `
    query getDraftOrder($id: ID!) {
      draftOrder(id: $id) {
        id
        name
        status
        totalPrice
        subtotalPrice
        totalTax
        totalDiscountsSet { shopMoney { amount currencyCode } }
        appliedDiscount { title value valueType amountV2 { amount currencyCode } }
        createdAt
        updatedAt
        note2
        invoiceUrl
        customer { id email firstName lastName phone }
        shippingAddress {
          address1 address2 city province country zip
        }
        lineItems(first: 50) {
          edges {
            node {
              title
              quantity
              image { url altText }
              originalUnitPrice
              discountedUnitPrice
            }
          }
        }
      }
    }
  `
      : `
    query getOrder($id: ID!) {
      order(id: $id) {
        id
        name
        displayFinancialStatus
        displayFulfillmentStatus
        createdAt
        updatedAt
        note
        email
        phone
        totalPriceSet { shopMoney { amount currencyCode } }
        subtotalPriceSet { shopMoney { amount currencyCode } }
        totalTaxSet { shopMoney { amount currencyCode } }
        totalShippingPriceSet { shopMoney { amount currencyCode } }
        totalDiscountsSet { shopMoney { amount currencyCode } }
        discountApplications(first: 10) {
          edges {
            node {
              allocationMethod
              targetSelection
              targetType
              value {
                ... on PricingPercentageValue { percentage }
                ... on MoneyV2 { amount currencyCode }
              }
              ... on DiscountCodeApplication { code }
              ... on ManualDiscountApplication { title }
              ... on ScriptDiscountApplication { title }
            }
          }
        }
        shippingAddress {
          address1 address2 city province country zip name
        }
        customer { id email firstName lastName phone }
        lineItems(first: 50) {
          edges {
            node {
              title
              quantity
              image { url altText }
              originalUnitPriceSet { shopMoney { amount currencyCode } }
              discountedUnitPriceSet { shopMoney { amount currencyCode } }
            }
          }
        }
        fulfillments {
          status
          trackingInfo { number url company }
          createdAt
        }
      }
    }
  `;

  const gid =
    type === "draft"
      ? `gid://shopify/DraftOrder/${numericId}`
      : `gid://shopify/Order/${numericId}`;

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify({ query, variables: { id: gid } }),
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Erro ao comunicar com Shopify" },
      { status: 502 },
    );
  }

  const json = await res.json();
  if (json.errors) {
    return NextResponse.json(
      { error: json.errors[0]?.message },
      { status: 400 },
    );
  }

  const data = type === "draft" ? json.data?.draftOrder : json.data?.order;
  if (!data) {
    return NextResponse.json(
      { error: "Pedido não encontrado" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, type, order: data });
}
