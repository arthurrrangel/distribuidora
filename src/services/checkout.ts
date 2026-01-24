// src/services/checkout.ts
import api from "./api";
import { CartItem } from "@/contexts/CartContext";

interface CheckoutResponse {
  cartCreate: {
    cart: {
      checkoutUrl: string;
    };
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export async function createCheckout(
  items: CartItem[],
): Promise<string | null> {
  // 1. Mapeia os itens do carrinho local para o formato que o Shopify espera
  const lineItems = items.map((item) => ({
    merchandiseId: item.id, // O ID da variante (deve ser o Global ID: gid://shopify/ProductVariant/...)
    quantity: item.quantity,
  }));

  const mutation = `
    mutation createCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await api.post<{ data: CheckoutResponse }>("", {
      query: mutation,
      variables: { lines: lineItems },
    });

    const { data } = response.data;

    // Verifica se houve erros de negócio (ex: sem estoque)
    if (data.cartCreate.userErrors.length > 0) {
      console.error("Erro no checkout:", data.cartCreate.userErrors);
      alert("Erro ao criar checkout: " + data.cartCreate.userErrors[0].message);
      return null;
    }

    return data.cartCreate.cart.checkoutUrl;
  } catch (error) {
    console.error("Erro de rede ou servidor:", error);
    alert("Ocorreu um erro ao conectar com o Shopify.");
    return null;
  }
}
