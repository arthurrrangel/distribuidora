"use client";

import { Truck, ShieldCheck, Clock, MessageCircle } from "lucide-react";

const benefits = [
  { icon: Truck, text: "Frete grátis pra CNPJ" },
  { icon: Clock, text: "Entrega em 24h no RJ" },
  { icon: ShieldCheck, text: "NF em todo pedido" },
];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Vim pelo site da Repon e quero fazer um pedido.")}`;

export function TopBar() {
  return (
    <div className="bg-[#03419A] text-white text-xs py-2 px-4 hidden md:flex items-center justify-between">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-blue-200">
              <Icon className="w-3 h-3 shrink-0" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-3 py-1 rounded-full transition-colors text-[11px]"
        >
          <MessageCircle className="w-3 h-3" />
          Falar pelo WhatsApp
        </a>
      </div>
    </div>
  );
}
