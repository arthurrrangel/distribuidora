// src/app/api/create-draft-order/route.ts
import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2024-01";

interface LineItem {
  variantId: string;
  quantity: number;
  title?: string;
  price?: number;
}

interface CustomerInfo {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface AppliedDiscount {
  title: string;
  value: number;
  valueType: "PERCENTAGE" | "FIXED_AMOUNT";
}

interface DraftOrderInput {
  lineItems: LineItem[];
  customer?: CustomerInfo;
  customerId?: string;
  note?: string;
  appliedDiscount?: AppliedDiscount;
}

interface ShopifyResponse {
  data: {
    draftOrderCreate: {
      draftOrder: {
        id: string;
        name: string;
        invoiceUrl: string;
        totalPrice: string;
        status: string;
      } | null;
      userErrors: Array<{
        field: string[];
        message: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
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
    const body: DraftOrderInput = await request.json();

    // Validar dados
    if (!body.lineItems || body.lineItems.length === 0) {
      return NextResponse.json(
        { error: "É necessário pelo menos um item no pedido" },
        { status: 400 },
      );
    }

    // Montar mutation GraphQL
    const mutation = `
      mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder {
            id
            name
            invoiceUrl
            totalPrice
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Preparar line items no formato Shopify Admin API
    const lineItems = body.lineItems.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    // Montar input
    const input: Record<string, unknown> = {
      lineItems,
      note: body.note || "Pedido via WhatsApp - Pagamento: Pix/Boleto",
      tags: ["whatsapp", "pix-boleto"],
    };

    // Adicionar desconto/cupom se fornecido
    if (body.appliedDiscount) {
      input.appliedDiscount = {
        title: body.appliedDiscount.title,
        value: body.appliedDiscount.value,
        valueType: body.appliedDiscount.valueType,
      };
    }

    // Adicionar cliente se fornecido
    if (body.customerId) {
      input.customerId = body.customerId;
    } else if (body.customer?.email) {
      input.email = body.customer.email;
      if (body.customer.firstName || body.customer.lastName) {
        input.shippingAddress = {
          firstName: body.customer.firstName || "",
          lastName: body.customer.lastName || "",
        };
      }
    }

    // Fazer request para Shopify Admin API
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { input },
        }),
      },
    );

    if (!response.ok) {
      console.error("Shopify API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Erro ao comunicar com Shopify" },
        { status: 502 },
      );
    }

    const data: ShopifyResponse = await response.json();

    // Verificar erros de nível GraphQL
    if (data.errors && data.errors.length > 0) {
      console.error("GraphQL errors:", data.errors);
      return NextResponse.json(
        { error: data.errors[0].message },
        { status: 400 },
      );
    }

    // Verificar userErrors
    const userErrors = data.data.draftOrderCreate.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error("User errors:", userErrors);
      return NextResponse.json(
        { error: userErrors[0].message },
        { status: 400 },
      );
    }

    const draftOrder = data.data.draftOrderCreate.draftOrder;
    if (!draftOrder) {
      return NextResponse.json(
        { error: "Erro ao criar rascunho do pedido" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      draftOrder: {
        id: draftOrder.id,
        name: draftOrder.name,
        invoiceUrl: draftOrder.invoiceUrl,
        totalPrice: draftOrder.totalPrice,
        status: draftOrder.status,
      },
    });
  } catch (error) {
    console.error("Error creating draft order:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
