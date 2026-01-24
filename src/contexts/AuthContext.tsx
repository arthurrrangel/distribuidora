"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback, // 1. Importar useCallback
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

  // 2. Definimos o logout PRIMEIRO e com useCallback
  // Ele precisa vir antes porque fetchCustomer depende dele
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiresAt");
    setUser(null);
    router.push("/login");
  }, [router]);

  // 3. Envolvemos fetchCustomer no useCallback
  // Adicionamos 'logout' nas dependências dele
  const fetchCustomer = useCallback(
    async (accessToken: string) => {
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
    },
    [logout], // fetchCustomer só muda se logout mudar
  );

  // 4. Agora podemos adicionar fetchCustomer seguramente no array
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchCustomer(token);
    } else {
      setLoading(false);
    }
  }, [fetchCustomer]); // Dependência correta adicionada

  const login = async (token: string, expiresAt: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("tokenExpiresAt", expiresAt);
    setLoading(true);
    await fetchCustomer(token);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
