"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck, Clock, ShoppingCart, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Hero() {
  const { user, loading } = useAuth();

  return (
    <div className="pt-4 mb-5 md:py-18 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-center relative z-10 gap-6 md:gap-16">
        <div className="md:w-1/2 mb-4 md:mb-0 z-20 flex flex-col w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight mb-4 md:mb-6 text-left">
            A melhor forma de abastecer o seu negócio.
          </h1>

          {/* Mobile Layout: Cards à esquerda, Imagem à direita */}
          <div className="md:hidden flex gap-3 mb-4">
            {/* Cards - Mobile: Lado esquerdo */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-white border border-gray-200 p-2.5 rounded-xl flex flex-row items-start gap-2">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-lg text-[#2563EB] shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1e3a8a] text-xs leading-tight mb-0.5">
                    Sem pedido mínimo
                  </h3>
                  <p className="text-[10px] text-gray-600 leading-tight">
                    Seu pedido não precisa ser grande para ser importante.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-2.5 rounded-xl flex flex-row items-start gap-2">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-lg text-[#2563EB] shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1e3a8a] text-xs leading-tight mb-0.5">
                    Frete grátis para CNPJ
                  </h3>
                  <p className="text-[10px] text-gray-600 leading-tight">
                    Faça quantos pedidos desejar, o frete é por nossa conta.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-2.5 rounded-xl flex flex-row items-start gap-2">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-lg text-[#2563EB] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1e3a8a] text-xs leading-tight mb-0.5">
                    Entrega em 24h¹
                  </h3>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    *Verifique as regiões elegíveis.
                  </p>
                </div>
              </div>
            </div>

            {/* Imagem - Mobile: Lado direito */}
            <div className="w-32 h-auto aspect-square relative rounded-lg overflow-hidden shadow-sm shrink-0">
              <Image
                src="/hero_stationery.png"
                alt="Equipe Arel conferindo estoque de papelaria - Atacado e Varejo"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20"></div>
            </div>
          </div>

          {/* Cards - Desktop: Grid 3x1, Mobile: Lista vertical (já está no layout mobile acima) */}
          <div className="hidden md:grid md:grid-cols-3 gap-3 mb-4 md:mb-6">
            <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col items-center text-center gap-2">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 rounded-lg text-[#2563EB]">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1e3a8a] text-sm leading-tight mb-1">
                  Sem pedido mínimo
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Seu pedido não precisa ser grande para ser importante.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col items-center text-center gap-2">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 rounded-lg text-[#2563EB]">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1e3a8a] text-sm leading-tight mb-1">
                  Frete grátis para CNPJ
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Faça quantos pedidos desejar, o frete é por nossa conta.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col items-center text-center gap-2">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 rounded-lg text-[#2563EB]">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1e3a8a] text-sm leading-tight mb-1">
                  Entrega em 24h¹
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  *Verifique as regiões elegíveis.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto mb-0 md:mb-0">
            {/* LÓGICA DE BOTÕES AUTH */}
            {!loading && (
              <>
                {user ? (
                  /* Usuário Logado: Botão único de ação */
                  <Link
                    href="/produtos"
                    className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1d4ed8] transition-colors shadow-md w-full md:w-auto flex items-center justify-center gap-2 text-sm"
                  >
                    Começar a Comprar
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  /* Visitante: Botões de Registro e Login */
                  <>
                    <Link
                      href="/register"
                      className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto text-center flex items-center justify-center gap-2 text-sm"
                    >
                      Criar uma conta
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/login"
                      className="text-[#2563EB] font-bold px-6 py-2 md:py-3 hover:bg-blue-50 rounded-lg transition-colors w-full md:w-auto text-center text-sm mb-0"
                    >
                      Entrar
                    </Link>
                  </>
                )}
              </>
            )}

            {/* Skeleton Loading para evitar pulo na tela enquanto carrega o user */}
            {loading && (
              <div className="bg-blue-200/50 w-full h-[48px] rounded-lg animate-pulse"></div>
            )}
          </div>
        </div>

        <div className="md:w-2/5 hidden md:block relative w-full px-4 md:px-0">
          <div
            className="relative w-full aspect-4/3 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 25%, black 75%, transparent), linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              maskComposite: "intersect",
            }}
          >
            <Image
              src="/covers/repon-principal.png"
              alt="Equipe Arel conferindo estoque de papelaria - Atacado e Varejo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
