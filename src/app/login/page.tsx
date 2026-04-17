"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import Link from "next/link";
import { ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { getErrorMessage, extractShopifyUserErrors } from "@/utils/errorUtils";
import { ShopifyGraphQLResponse, CustomerLoginData } from "@/types/shopify";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login apenas por CNPJ

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const mutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            message
          }
        }
      }
    `;

    try {
      const response = await api.post<
        ShopifyGraphQLResponse<CustomerLoginData>
      >("", {
        query: mutation,
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      });

      const data = response.data.data;

      // 1. Verifica erros da Shopify
      const shopifyError = extractShopifyUserErrors(
        data.customerAccessTokenCreate.customerUserErrors,
      );

      if (shopifyError) {
        throw new Error(shopifyError);
      }

      const tokenData = data.customerAccessTokenCreate.customerAccessToken;

      if (tokenData?.accessToken) {
        await login(tokenData.accessToken, tokenData.expiresAt);
        router.push("/");
      } else {
        throw new Error("Erro ao gerar token de acesso.");
      }
    } catch (err: unknown) {
      let message = getErrorMessage(err);
      if (message.includes("Unidentified customer")) {
        message = "E-mail ou senha incorretos.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Acesse sua conta
          </h1>
          <p className="text-gray-500 text-sm mb-8 text-center">
            Entre para acompanhar seus pedidos e facilitar suas compras.
          </p>

          {/* Login apenas para Atacado (CNPJ) */}
          <div className="mb-6">
            <div className="flex-1 py-2 rounded-md font-semibold text-sm bg-blue-50 text-[#0464D5] border border-blue-100 text-center">
              Acesso exclusivo para empresas com CNPJ
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3 rounded-r-md animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="********"
                />
              </div>
              <div className="flex justify-end mt-1">
                <Link
                  href="/recuperar-senha"
                  className="text-xs text-[#0464D5] hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0464D5] text-white py-3 rounded-lg font-bold hover:bg-[#0353b4] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Entrando..." : "Entrar"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-4">Ainda não tem conta?</p>
            <Link
              href="/register"
              className="inline-block w-full bg-white border border-[#0464D5] text-[#0464D5] py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
