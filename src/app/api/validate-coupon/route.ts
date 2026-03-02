import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2024-01";

export async function POST(request: NextRequest) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    return NextResponse.json(
      { success: false, error: "Configuração do servidor não encontrada" },
      { status: 500 },
    );
  }

  const { code } = await request.json();
  if (!code || typeof code !== "string" || code.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Código do cupom não informado" },
      { status: 400 },
    );
  }

  const query = `
    query getDiscountByCode($code: String!) {
      codeDiscountNodeByCode(code: $code) {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            status
            startsAt
            endsAt
            usageLimit
            asyncUsageCount
            customerGets {
              value {
                ... on DiscountPercentage {
                  percentage
                }
                ... on DiscountAmount {
                  amount {
                    amount
                    currencyCode
                  }
                  appliesOnEachItem
                }
              }
            }
          }
          ... on DiscountCodeFreeShipping {
            title
            status
            startsAt
            endsAt
          }
          ... on DiscountCodeBxgy {
            title
            status
            startsAt
            endsAt
          }
        }
      }
    }
  `;

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: { code: code.trim().toUpperCase() },
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { success: false, error: "Erro ao comunicar com o servidor" },
      { status: 502 },
    );
  }

  const json = await res.json();

  if (json.errors?.length) {
    return NextResponse.json(
      { success: false, error: "Erro ao validar cupom" },
      { status: 400 },
    );
  }

  const node = json.data?.codeDiscountNodeByCode;
  if (!node) {
    return NextResponse.json(
      { success: false, error: "Cupom não encontrado" },
      { status: 404 },
    );
  }

  const discount = node.codeDiscount;

  // Status check
  const status: string = discount.status ?? "";
  if (status === "EXPIRED") {
    return NextResponse.json(
      { success: false, error: "Este cupom já expirou" },
      { status: 422 },
    );
  }
  if (status === "SCHEDULED") {
    const startsAt = discount.startsAt ? new Date(discount.startsAt) : null;
    const formattedDate = startsAt
      ? startsAt.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";
    return NextResponse.json(
      {
        success: false,
        error: `Este cupom ainda não está ativo${formattedDate ? ` (disponível a partir de ${formattedDate})` : ""}`,
      },
      { status: 422 },
    );
  }

  // Usage limit
  if (
    discount.usageLimit !== null &&
    discount.usageLimit !== undefined &&
    discount.asyncUsageCount >= discount.usageLimit
  ) {
    return NextResponse.json(
      { success: false, error: "Este cupom atingiu o limite de usos" },
      { status: 422 },
    );
  }

  // Expiry date (belt-and-suspenders, in case status isn't EXPIRED yet)
  if (discount.endsAt && new Date(discount.endsAt) < new Date()) {
    return NextResponse.json(
      { success: false, error: "Este cupom já expirou" },
      { status: 422 },
    );
  }

  // Free shipping (não tem valor fixo, avisamos ao usuário)
  if (!discount.customerGets) {
    return NextResponse.json({
      success: true,
      discount: {
        code: code.trim().toUpperCase(),
        title: discount.title ?? code.trim().toUpperCase(),
        valueType: "FREE_SHIPPING" as const,
        value: 0,
      },
    });
  }

  const val = discount.customerGets.value;

  if ("percentage" in val) {
    return NextResponse.json({
      success: true,
      discount: {
        code: code.trim().toUpperCase(),
        title: discount.title ?? code.trim().toUpperCase(),
        valueType: "PERCENTAGE" as const,
        // Shopify returns 0.1 for 10%; convert to 10 for display and Admin API
        value: Math.round(val.percentage * 100 * 100) / 100,
      },
    });
  }

  if ("amount" in val) {
    return NextResponse.json({
      success: true,
      discount: {
        code: code.trim().toUpperCase(),
        title: discount.title ?? code.trim().toUpperCase(),
        valueType: "FIXED_AMOUNT" as const,
        value: parseFloat(val.amount.amount),
        currencyCode: val.amount.currencyCode,
      },
    });
  }

  return NextResponse.json(
    { success: false, error: "Tipo de cupom não suportado" },
    { status: 422 },
  );
}
