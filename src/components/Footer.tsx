// src/components/Footer.tsx
// Footer Repon v2: preto profundo, tipografia editorial, "Repon." gigante como assinatura.

import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-paper-100 mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-20 pb-12">
        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b hairline-strong border-ink-800">
          <div className="md:col-span-5">
            <Logo variant="branca" shape="full" width={140} height={36} className="h-9 w-auto" />
            <p className="font-display text-2xl md:text-3xl font-light tracking-tighter mt-8 max-w-md leading-snug">
              Atacado de papelaria <br />
              direto da fábrica <br />
              pra revenda do Rio.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="label text-ink-400 mb-5">Comprar</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/departamento/papelaria" className="ul-anim hover:text-paper">Papelaria</Link></li>
              <li><Link href="/departamento/escritorio" className="ul-anim hover:text-paper">Escritório</Link></li>
              <li><Link href="/departamento/escolar" className="ul-anim hover:text-paper">Escolar</Link></li>
              <li><Link href="/fabricantes" className="ul-anim hover:text-paper">Marcas</Link></li>
              <li><Link href="/produtos" className="ul-anim hover:text-paper">Ofertas</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label text-ink-400 mb-5">Empresa</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/sobre" className="ul-anim hover:text-paper">Sobre</Link></li>
              <li><Link href="/fabricantes" className="ul-anim hover:text-paper">Fabricantes</Link></li>
              <li><Link href="/parceiros" className="ul-anim hover:text-paper">Parceiros</Link></li>
              <li><Link href="/faq" className="ul-anim hover:text-paper">FAQ</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-ink-400 mb-5">Atendimento</p>
            <ul className="space-y-2.5 text-sm">
              <li className="font-mono text-xs">contato@repon.com.br</li>
              <li className="font-mono text-xs">+55 21 99594-6491</li>
              <li className="font-mono text-xs text-ink-400 mt-3">SEG–SÁB · 09H–18H</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-wrap items-center justify-between gap-6 text-xs text-ink-500">
          <p className="font-mono">
            © {new Date().getFullYear()} Repon Plataforma de Comércio Ltda · CNPJ 54.563.438/0001-07
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="ul-anim hover:text-paper">Privacidade</Link>
            <Link href="/termos" className="ul-anim hover:text-paper">Termos</Link>
            <Link href="/trocas" className="ul-anim hover:text-paper">Política de troca</Link>
          </div>
        </div>

        {/* Assinatura tipográfica */}
        <p
          className="font-display text-[100px] md:text-[180px] font-extrabold leading-none tracking-tightest text-ink-800 mt-12 md:mt-16 select-none pointer-events-none"
          aria-hidden="true"
        >
          Repon.
        </p>
      </div>
    </footer>
  );
}
