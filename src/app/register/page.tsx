"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, User, AlertCircle } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";

import api from "@/services/api";
import { getErrorMessage, extractShopifyUserErrors } from "@/utils/errorUtils";
import { ShopifyGraphQLResponse, CustomerCreateData } from "@/types/shopify";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    try {
      // Chamada tipada ao Axios
      const response = await api.post<
        ShopifyGraphQLResponse<CustomerCreateData>
      >("", {
        query: mutation,
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          },
        },
      });

      const data = response.data.data;

      // Verifica erros de negócio do Shopify (ex: Senha curta, Email duplicado)
      const shopifyError = extractShopifyUserErrors(
        data.customerCreate.customerUserErrors,
      );

      if (shopifyError) {
        throw new Error(shopifyError);
      }

      // Sucesso
      if (data.customerCreate.customer?.id) {
        alert(
          "Conta criada com sucesso! Você será redirecionado para o login.",
        );
        router.push("/login");
      } else {
        throw new Error("Não foi possível criar a conta. Tente novamente.");
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);
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
          <h1 className="text-2xl font-bold text-[#1e3a8a] mb-2 text-center">
            Crie sua conta
          </h1>
          <p className="text-gray-500 text-sm mb-8 text-center">
            Preencha os dados abaixo para se cadastrar.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3 rounded-r-md">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="João"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sobrenome
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Silva"
                  />
                </div>
              </div>
            </div>

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
                  minLength={5}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Mínimo 5 caracteres"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2563EB] text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Criando conta..." : "Criar Conta"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-4">Já tem uma conta?</p>
            <Link
              href="/login"
              className="inline-block w-full bg-white border border-[#2563EB] text-[#2563EB] py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
            >
              Fazer Login
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
