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
}

// Resposta da Mutation de Criação de Cliente
export interface CustomerCreatePayload {
  customer: Customer | null;
  customerUserErrors: CustomerUserError[];
}

export interface CustomerCreateData {
  customerCreate: CustomerCreatePayload;
}

// Resposta da Mutation de Login (AccessToken)
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

// Estrutura genérica de resposta GraphQL do Shopify
export interface ShopifyGraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>; // Erros de nível superior (ex: sintaxe)
}

export interface CustomerData {
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    defaultAddress?: {
      address1: string;
      city: string;
      country: string;
      zip: string;
    };
  } | null;
}
