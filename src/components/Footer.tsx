"use client";

import { Instagram, Linkedin, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de mais informações sobre os produtos da Repon Distribuidora.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="mt-16">
      {/* Faixa de ajuda */}
      <div className="bg-blue-100 border-t border-blue-200">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Lado esquerdo: texto + botão */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-full flex-shrink-0 bg-[#2563EB] items-center justify-center overflow-hidden">
              <Image
                src="/repon-logo-branca-r.svg"
                alt="AREL Distribuidora"
                width={40}
                height={40}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">
                Precisa de ajuda?
              </p>
              <p className="text-gray-500 text-sm mb-3">Envie uma mensagem!</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar mensagem
              </a>
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="hidden md:block w-px h-20 bg-gray-300" />

          {/* Lado direito: horários */}
          <div className="text-center md:text-left">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1 justify-center md:justify-start">
              <Clock className="w-3.5 h-3.5" />
              Horários de Atendimento*
            </p>
            <p className="text-gray-700 text-sm">
              Segunda à sexta das 09h às 18h
            </p>
            <p className="text-gray-700 text-sm">Sábado das 09h às 13h</p>
            <p className="text-gray-400 text-xs mt-1">*Exceto feriados</p>
          </div>
        </div>
      </div>

      {/* Faixa principal azul */}
      <div className="bg-[#2563EB]">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-evenly gap-10">
            {/* Logo */}
            <div className="flex-shrink-0 ml-8">
              <Link href="/">
                <Image
                  src="/repon-logo-branca.svg"
                  alt="Repon Distribuidora"
                  width={120}
                  height={40}
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Links institucionais */}
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
                Sobre a Repon
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>
                  <Link
                    href="/sobre"
                    className="hover:text-blue-200 transition-colors"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200 transition-colors"
                  >
                    Entre em Contato
                  </a>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-200 transition-colors"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/meus-pedidos"
                    className="hover:text-blue-200 transition-colors"
                  >
                    Meus Pedidos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Formas de pagamento */}
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
                Formas de Pagamento
              </p>
              <div className="flex items-center gap-2">
                {/* Boleto */}
                <div className="bg-white rounded px-2 py-1.5 flex items-center gap-1">
                  <svg
                    className="h-4 w-auto"
                    viewBox="0 0 48 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="48" height="24" rx="3" fill="white" />
                    <rect x="4" y="5" width="2" height="14" fill="#222" />
                    <rect x="7" y="5" width="1" height="14" fill="#222" />
                    <rect x="9" y="5" width="2" height="14" fill="#222" />
                    <rect x="12" y="5" width="1" height="14" fill="#222" />
                    <rect x="14" y="5" width="3" height="14" fill="#222" />
                    <rect x="18" y="5" width="1" height="14" fill="#222" />
                    <rect x="20" y="5" width="2" height="14" fill="#222" />
                    <rect x="23" y="5" width="1" height="14" fill="#222" />
                    <rect x="25" y="5" width="3" height="14" fill="#222" />
                    <rect x="29" y="5" width="1" height="14" fill="#222" />
                    <rect x="31" y="5" width="2" height="14" fill="#222" />
                    <rect x="34" y="5" width="1" height="14" fill="#222" />
                    <rect x="36" y="5" width="2" height="14" fill="#222" />
                    <rect x="39" y="5" width="3" height="14" fill="#222" />
                    <rect x="43" y="5" width="1" height="14" fill="#222" />
                  </svg>
                  <span className="text-[10px] font-bold text-gray-700">
                    Boleto
                  </span>
                </div>
                {/* PIX */}
                <div className="bg-white rounded px-2 py-1.5 flex items-center gap-1">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M390.2 345.6c-21.8 0-42.3-8.5-57.7-23.9l-81.1-81.1c-5.4-5.4-14.9-5.4-20.3 0l-81.4 81.4c-15.4 15.4-35.9 23.9-57.7 23.9h-16l102.7 102.7c31.7 31.7 83.1 31.7 114.8 0L396.2 346h-6z"
                      fill="#32BCAD"
                    />
                    <path
                      d="M92 166.4c21.8 0 42.3 8.5 57.7 23.9l81.4 81.4c5.6 5.6 14.7 5.6 20.3 0l81.1-81.1c15.4-15.4 35.9-23.9 57.7-23.9h6L294.5 63.9c-31.7-31.7-83.1-31.7-114.8 0L76 166.3h16z"
                      fill="#32BCAD"
                    />
                    <path
                      d="M458.7 209.5l-51.9-51.9h-16.6c-16.2 0-31.8 6.5-43.2 18l-81.1 81.1c-8.1 8.1-18.9 12.6-30.4 12.6-11.5 0-22.3-4.5-30.4-12.6l-81.4-81.4c-11.4-11.4-27-18-43.2-18H64.3l-51.9 51.9c-31.7 31.7-31.7 83.1 0 114.8l51.9 51.9h16.6c16.2 0 31.8-6.5 43.2-18l81.4-81.4c16.3-16.3 44.5-16.3 60.8 0l81.1 81.1c11.4 11.4 27 18 43.2 18h16.6l51.9-51.9c31.8-31.8 31.8-83.1.1-114.8z"
                      fill="#32BCAD"
                    />
                  </svg>
                  <span className="text-[10px] font-bold text-gray-700">
                    Pix
                  </span>
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
                Segurança
              </p>
              <div className="bg-white rounded px-3 py-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="text-[10px] font-bold text-gray-700 leading-tight">
                    Site Seguro
                  </p>
                  <p className="text-[9px] text-gray-500 leading-tight">
                    SSL Certificado
                  </p>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="mr-8">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">
                Redes Sociais
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé legal */}
        <div className="border-t border-white/20">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-blue-200">
            <p>
              <span className="font-semibold text-white">
                AREL VARIEDADES E COMERCIO LTDA
              </span>{" "}
              — CNPJ: 54.563.438/0001-07 | Santa Catarina - SC
            </p>
            <p>
              © {new Date().getFullYear()} AREL Distribuidora. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
