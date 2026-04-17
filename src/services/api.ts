//src/services/api.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "2024-01";

if (!DOMAIN || !STOREFRONT_TOKEN) {
  throw new Error(
    "As variáveis de ambiente do Shopify não estão configuradas.",
  );
}

const api: AxiosInstance = axios.create({
  baseURL: `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
  },
});

// Interceptor de Requisição
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

// Interceptor de Resposta
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Verifica erros de nível superior do GraphQL (ex: Syntax Error, Throttling)
    if (response.data.errors && Array.isArray(response.data.errors)) {
      const firstError = response.data.errors[0];
      return Promise.reject(
        new Error(firstError.message || "Erro desconhecido na API Shopify"),
      );
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default api;
