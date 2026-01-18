"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  // Override mock login to redirect after setting state
  const handleLogin = (type: 'cpf' | 'cnpj') => {
      login(type);
      router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-[#1e3a8a] mb-2 text-center">Acesse sua conta</h1>
            <p className="text-gray-500 text-sm mb-8 text-center">Entre para acompanhar seus pedidos e facilitar suas compras.</p>

            <div className="flex gap-4 mb-6">
                <button onClick={() => handleLogin('cpf')} className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-md font-bold hover:bg-blue-200 text-sm">
                    Entrar como Varejo (CPF)
                </button>
                <button onClick={() => handleLogin('cnpj')} className="flex-1 bg-green-100 text-green-700 py-2 rounded-md font-bold hover:bg-green-200 text-sm">
                    Entrar como Atacado (CNPJ)
                </button>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="email" 
                            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            placeholder="seu@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="password" 
                            className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            placeholder="********"
                        />
                    </div>
                    <div className="flex justify-end mt-1">
                        <Link href="#" className="text-xs text-[#2563EB] hover:underline">Esqueci minha senha</Link>
                    </div>
                </div>

                <div className="pt-2">
                    <button type="button" className="w-full bg-[#2563EB] text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        Entrar
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    {/* Placeholder for future API integration */}
                    {/* onClick={handleLogin} */}
                </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600 mb-4">Ainda não tem conta?</p>
                <Link href="#" className="inline-block w-full bg-white border border-[#2563EB] text-[#2563EB] py-3 rounded-md font-bold hover:bg-blue-50 transition-colors">
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
