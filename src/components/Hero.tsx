// src/components/Hero.tsx
// Hero Repon v2: tipografia massiva, paleta paper/ink, mosaico editorial à direita.

"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-paper grain border-b hairline">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-24 md:pb-32 grid md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-7">
          <p className="label text-ink-500 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-400"></span>
            Atacado de papelaria · só CNPJ
          </p>
          <h1 className="font-display font-extrabold text-[56px] sm:text-[72px] md:text-[96px] lg:text-[112px] leading-[0.92] tracking-tightest mt-6 md:mt-8">
            O preço<br />
            que <span className="italic font-light text-ink-500">só atacado</span><br />
            te dá.
          </h1>
          <p className="text-ink-600 text-base md:text-lg mt-8 md:mt-10 max-w-md leading-relaxed">
            Filipaper, Filimail, Usapel, Spiral — direto da fábrica,
            com nota fiscal e entrega no Rio em 24h. Sem mínimo,
            sem mensalidade, sem volta.
          </p>
          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/register"
              className="h-14 px-7 bg-ink text-paper text-sm font-semibold hover:bg-accent transition-colors duration-300 flex items-center gap-3"
            >
              Criar conta CNPJ
              <span className="font-mono">→</span>
            </Link>
            <Link
              href="/produtos"
              className="text-sm font-semibold ul-anim"
            >
              Ver catálogo
            </Link>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="space-y-3">
            <figure className="aspect-[4/5] prod-a relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4">
                <div>
                  <p className="label text-ink-700">Em destaque</p>
                  <p className="font-display text-xl md:text-2xl font-bold leading-tight mt-1">
                    Caderno<br />Universitário<br />200f
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-[10px] text-ink-500">a partir de</p>
                  <p className="font-display text-2xl md:text-3xl font-extrabold tabular tracking-tighter">
                    R$&nbsp;18,90
                  </p>
                </div>
              </div>
            </figure>
            <div className="grid grid-cols-2 gap-3">
              <figure className="aspect-square prod-b relative">
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <p className="font-display text-xs sm:text-sm font-bold leading-tight">
                    Caneta<br />BIC 50un
                  </p>
                  <p className="font-mono text-xs">R$&nbsp;47</p>
                </div>
              </figure>
              <figure className="aspect-square prod-dark relative text-paper">
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <span className="label">Entrega</span>
                  <p className="font-display text-[40px] sm:text-[48px] font-extrabold leading-none tracking-tightest">
                    24h
                    <span className="text-ink-400 text-xl sm:text-2xl align-top">↗</span>
                  </p>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
