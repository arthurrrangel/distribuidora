"use client";

import {
  Instagram,
  Linkedin,
  MessageCircle,
  ShoppingCart,
  Package,
  User,
  HelpCircle,
  Headphones,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ── Quick-access links ────────────────────────────────────────────────────────
const quickLinks = [
  { icon: Headphones, label: "Atendimento", href: "whatsapp" },
  { icon: Package,    label: "Meus Pedidos",  href: "/meus-pedidos" },
  { icon: ShoppingCart, label: "Carrinho",    href: "/carrinho" },
  { icon: User,       label: "Login ou Cadastre-se", href: "/login" },
  { icon: HelpCircle, label: "Dúvidas Frequentes",   href: "/faq" },
  { icon: Shield,     label: "Site Confiável",        href: "/sobre" },
];

export function Footer() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
  const whatsappMessage = encodeURIComponent(
    "Olá! Vim pelo site da Repon e queria tirar uma dúvida.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="mt-16">

      {/* ── Barra de acesso rápido ───────────────────────────────────────── */}
      <div className="bg-[#0464D5] border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
            {quickLinks.map(({ icon: Icon, label, href }) => {
              const isWhatsApp = href === "whatsapp";
              return isWhatsApp ? (
                <a
                  key={label}
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 py-5 px-2 text-white hover:bg-white/10 transition-colors group"
                >
                  <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                  <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors text-center leading-tight">
                    {label}
                  </span>
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-center justify-center gap-2 py-5 px-2 text-white hover:bg-white/10 transition-colors group"
                >
                  <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                  <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors text-center leading-tight">
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Corpo principal ─────────────────────────────────────────────── */}
      <div className="bg-[#0464D5] border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

            {/* Logo + descrição */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/">
                <Image
                  src="/repon-logo-branca.svg"
                  alt="Repon Distribuidora"
                  width={130}
                  height={40}
                  className="h-10 w-auto object-contain mb-4"
                />
              </Link>
              <p className="text-white/60 text-sm leading-relaxed">
                Distribuidora B2B de papelaria e material de escritório. Só pra CNPJ, com entrega rápida no Rio de Janeiro.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://www.instagram.com/repon.distribui"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/repon-distribuidora"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="w-9 h-9" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Institucional */}
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Empresa</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Sobre nós", href: "/sobre" },
                  { label: "Fabricantes Parceiros", href: "/fabricantes" },
                  { label: "Seja nosso Parceiro", href: "/parceiros" },
                  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/70 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Atendimento */}
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Atendimento</p>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Perguntas Frequentes", href: "/faq" },
                  { label: "Minha Conta", href: "/minha-conta" },
                  { label: "Meus Pedidos", href: "/meus-pedidos" },
                  { label: "Falar no WhatsApp", href: whatsappLink, external: true },
                ].map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-white/70 hover:text-white transition-colors">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pagamento */}
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Pagamento</p>
              <div className="flex flex-wrap gap-2">
                {/* PIX */}
                <div className="bg-white rounded-md px-3 py-2 flex items-center gap-1.5">
                  <svg className="h-4 w-4" viewBox="0 0 512 512" fill="none">
                    <path d="M390.2 345.6c-21.8 0-42.3-8.5-57.7-23.9l-81.1-81.1c-5.4-5.4-14.9-5.4-20.3 0l-81.4 81.4c-15.4 15.4-35.9 23.9-57.7 23.9h-16l102.7 102.7c31.7 31.7 83.1 31.7 114.8 0L396.2 346h-6z" fill="#32BCAD"/>
                    <path d="M92 166.4c21.8 0 42.3 8.5 57.7 23.9l81.4 81.4c5.6 5.6 14.7 5.6 20.3 0l81.1-81.1c15.4-15.4 35.9-23.9 57.7-23.9h6L294.5 63.9c-31.7-31.7-83.1-31.7-114.8 0L76 166.3h16z" fill="#32BCAD"/>
                    <path d="M458.7 209.5l-51.9-51.9h-16.6c-16.2 0-31.8 6.5-43.2 18l-81.1 81.1c-8.1 8.1-18.9 12.6-30.4 12.6-11.5 0-22.3-4.5-30.4-12.6l-81.4-81.4c-11.4-11.4-27-18-43.2-18H64.3l-51.9 51.9c-31.7 31.7-31.7 83.1 0 114.8l51.9 51.9h16.6c16.2 0 31.8-6.5 43.2-18l81.4-81.4c16.3-16.3 44.5-16.3 60.8 0l81.1 81.1c11.4 11.4 27 18 43.2 18h16.6l51.9-51.9c31.8-31.8 31.8-83.1.1-114.8z" fill="#32BCAD"/>
                  </svg>
                  <span className="text-[11px] font-bold text-gray-700">Pix</span>
                </div>
                {/* Boleto */}
                <div className="bg-white rounded-md px-3 py-2 flex items-center gap-1.5">
                  <svg className="h-4 w-6" viewBox="0 0 48 24" fill="none">
                    <rect width="48" height="24" rx="3" fill="white"/>
                    {[4,7,9,12,14,18,20,23,25,29,31,34,36,39,43].map((x, i) => (
                      <rect key={i} x={x} y="5" width={i % 3 === 0 ? 2 : i % 2 === 0 ? 3 : 1} height="14" fill="#222"/>
                    ))}
                  </svg>
                  <span className="text-[11px] font-bold text-gray-700">Boleto</span>
                </div>
              </div>
            </div>

            {/* Segurança + Horários */}
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Segurança</p>
              <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-white shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Site Seguro</p>
                  <p className="text-[10px] text-white/60">SSL Certificado</p>
                </div>
              </div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2 mt-4">Horários</p>
              <p className="text-white/70 text-xs leading-relaxed">
                Seg–Sex: 09h às 18h<br />
                Sábado: 09h às 13h
              </p>
            </div>

          </div>
        </div>

        {/* ── Rodapé legal ────────────────────────────────────────────────── */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
            <p className="text-white/50">
              <span className="font-semibold text-white/80">REPON PLATAFORMA DE COMÉRCIO LTDA</span>
              {" "}— CNPJ: 54.563.438/0001-07 | RJ
            </p>
            <p className="text-white/40">
              © {new Date().getFullYear()} Repon. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
