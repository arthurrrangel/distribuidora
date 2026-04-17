"use client";

import { Truck, ShieldCheck, Clock, Phone } from "lucide-react";

const benefits = [
  { icon: Truck, text: "Frete grátis pra CNPJ" },
  { icon: Clock, text: "Entrega em até 24h*" },
  { icon: ShieldCheck, text: "Pix e boleto" },
  { icon: Phone, text: "Atendimento seg. a sáb." },
];

export function TopBar() {
  return (
    <div className="bg-[#0464D5] text-white text-xs py-1.5 px-4 hidden md:block">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-blue-100">
              <Icon className="w-3 h-3 text-blue-200 shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <span className="text-blue-200 text-[11px]">
          Venda exclusiva pra empresa com CNPJ
        </span>
      </div>
    </div>
  );
}
