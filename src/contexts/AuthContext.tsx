"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { Customer } from "@/types/shopify";

interface AuthContextType {
  user: Customer | null;
  loading: boolean;
  login: (token: string, expiresAt: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Busca os dados do cliente na Shopify usando o Token
  const fetchCustomer = async (accessToken: string) => {
    const query = `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
        }
      }
    `;

    try {
      const response = await api.post("", {
        query,
        variables: { customerAccessToken: accessToken },
      });

      const customerData = response.data.data?.customer;

      if (customerData) {
        setUser(customerData);
      } else {
        // Token inválido ou expirado
        logout();
      }
    } catch (error) {
      console.error("Erro ao buscar dados do cliente:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Ao iniciar a página, verifica se já existe token salvo
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchCustomer(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string, expiresAt: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("tokenExpiresAt", expiresAt);
    setLoading(true);
    await fetchCustomer(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiresAt");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
