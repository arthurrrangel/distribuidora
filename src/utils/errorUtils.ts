import { AxiosError } from "axios";
import { CustomerUserError } from "@/types/shopify";

export function getErrorMessage(err: unknown): string {
  // 1. Erro do Axios (Rede, 404, 500, etc)
  if (err instanceof AxiosError) {
    return (
      err.response?.data?.message ||
      err.message ||
      "Erro de conexão com o servidor."
    );
  }

  // 2. Erro genérico do JavaScript
  if (err instanceof Error) {
    return err.message;
  }

  return "Ocorreu um erro inesperado.";
}

/**
 * Verifica se a resposta do Shopify contém erros de usuário (ex: Email já existe)
 * e retorna a primeira mensagem de erro encontrada.
 */
export function extractShopifyUserErrors(
  errors: CustomerUserError[] | undefined | null,
): string | null {
  if (errors && errors.length > 0) {
    return errors[0].message;
  }
  return null;
}
