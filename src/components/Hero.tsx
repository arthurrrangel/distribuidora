"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const perks = [
  "Frete grátis pra CNPJ",
  "Entrega em até 24h",
  "Sem pedido mínimo",
];

export function Hero() {
  const { user, loading } = useAuth();

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* ── Texto ───────────────────────────────────────────────── */}
          <div className="flex-1 text-center md:text-left">

            {/* Badge */}
            <span className="inline-block bg-blue-50 text-[#0464D5] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              Atacado B2B · Só pra CNPJ
            </span>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
              Papelaria e escritório<br className="hidden md:block" />{" "}
              <span className="text-[#0464D5]">no atacado</span>{" "}
              pra sua empresa.
            </h1>

            {/* Sub */}
            <p className="text-gray-500 text-lg mb-8 max-w-md leading-relaxed mx-auto md:mx-0">
              Preço de atacado direto no site, sem precisar ligar, sem pedido mínimo e com entrega rápida no Rio de Janeiro.
            </p>

            {/* CTAs */}
            {!loading && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
                {user ? (
                  <Link
                    href="/produtos"
                    className="inline-flex items-center justify-center gap-2 bg-[#0464D5] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#0353b4] transition-colors shadow-md shadow-[#0464D5]/20 text-base"
                  >
                    Começar a comprar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center gap-2 bg-[#0464D5] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#0353b4] transition-colors shadow-md shadow-[#0464D5]/20 text-base"
                    >
                      Criar uma conta
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-base"
                    >
                      Já tenho conta
                    </Link>
                  </>
                )}
              </div>
            )}
            {loading && <div className="h-[52px] w-44 bg-gray-100 rounded-lg animate-pulse mb-8" />}

            {/* Perks — inline, sem repetição */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
              {perks.map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#0464D5] shrink-0" />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* ── Imagem ──────────────────────────────────────────────── */}
          <div className="flex-1 hidden md:block relative">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                maskComposite: "intersect",
              }}
            >
              <Image
                src="/covers/repon-principal.png"
                alt="Produtos de papelaria e escritório Repon"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Mobile: imagem compacta */}
          <div className="md:hidden w-full rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/hero_stationery.png"
              alt="Produtos Repon"
              width={400}
              height={220}
              className="w-full object-cover"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
