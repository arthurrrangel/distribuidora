// src/utils/tokenUtils.ts

/**
 * Recupera o token de acesso do cliente a partir do localStorage.
 * Retorna null se não houver token ou se ele estiver expirado.
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("accessToken");
  const expiresAt = localStorage.getItem("tokenExpiresAt");

  if (!token) return null;

  if (expiresAt) {
    const expiryDate = new Date(expiresAt);
    if (expiryDate < new Date()) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiresAt");
      return null;
    }
  }

  return token;
}
