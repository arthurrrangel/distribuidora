// src/types/shopify.ts

export interface CustomerUserError {
  code: string;
  field: string[];
  message: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  // Adicionamos aqui para o TypeScript parar de reclamar
  cnpj?: string;
  tags?: string[];
  defaultAddress?: {
    address1: string;
    city: string;
    country: string;
    zip: string;
  };
}

// ... (Resto das interfaces de Auth/Mutation mantidas iguais) ...

export interface CustomerCreatePayload {
  customer: Customer | null;
  customerUserErrors: CustomerUserError[];
}

export interface CustomerCreateData {
  customerCreate: CustomerCreatePayload;
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerAccessTokenCreatePayload {
  customerAccessToken: CustomerAccessToken | null;
  customerUserErrors: CustomerUserError[];
}

export interface CustomerLoginData {
  customerAccessTokenCreate: CustomerAccessTokenCreatePayload;
}

export interface CustomerData {
  customer: Customer | null;
}

// --- Interfaces de Produto e Coleção ---

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ImageNode {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  availableForSale: boolean;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  compareAtPriceRange?: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  images: {
    edges: Array<{ node: ImageNode }>;
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
  };
}

// Interface Genérica para Conexões do Shopify (Edges/Nodes)
export interface Connection<T> {
  edges: Array<{ node: T }>;
}

export interface ShopifyGraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}
