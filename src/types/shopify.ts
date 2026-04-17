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
  tags?: string[];
  defaultAddress?: {
    address1: string;
    address2?: string;
    city: string;
    province?: string;
    country: string;
    zip: string;
  };
}

// --- Customer Account Types ---

export interface Address {
  id: string;
  firstName?: string;
  lastName?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
  isDefault?: boolean;
}

export interface CustomerFull {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: string;
  defaultAddress?: Address;
  addresses: {
    edges: Array<{ node: Address }>;
  };
}

export interface UpdateCustomerInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  acceptsMarketing?: boolean;
}

export interface AddressInput {
  firstName?: string;
  lastName?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
}

// Interface para dados de cadastro de empresa (B2B)
export interface CompanyRegistrationData {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  ieIsento: boolean;
  nomeResponsavel: string;
  whatsapp: string;
  email: string;
  senha: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
}

// Interface para erros de formulário
export interface FormErrors {
  [key: string]: string;
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
  vendor?: string;
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
  coverInfo?: {
    value: string;
  } | null;
}

// Interface Genérica para Conexões do Shopify (Edges/Nodes)
export interface Connection<T> {
  edges: Array<{ node: T }>;
}

export interface ShopifyGraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}
