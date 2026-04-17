import Link from "next/link";
import { Truck, BadgePercent } from "lucide-react";

const banners = [
  {
    id: "frete",
    bg: "from-[#01092D] to-[#0464D5]",
    icon: Truck,
    eyebrow: "Pra quem tem CNPJ",
    title: "Frete Grátis",
    subtitle: "em pedidos acima de R$ 500",
    cta: "Ver produtos",
    href: "/departamento/papelaria",
    badge: "GRÁTIS",
    badgeBg: "bg-green-400 text-green-900",
  },
  {
    id: "oferta",
    bg: "from-[#b45309] to-[#d97706]",
    icon: BadgePercent,
    eyebrow: "Só essa semana",
    title: "Preço de Atacado",
    subtitle: "pra quem compra pelo site",
    cta: "Ver ofertas",
    href: "/departamento/ofertas-da-semana",
    badge: "ATÉ -30%",
    badgeBg: "bg-white text-amber-700",
  },
];

export function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map(
          ({
            id,
            bg,
            icon: Icon,
            eyebrow,
            title,
            subtitle,
            cta,
            href,
            badge,
            badgeBg,
          }) => (
            <Link
              key={id}
              href={href}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${bg} p-6 flex items-center justify-between group hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Decoração */}
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -right-2 -bottom-10 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

              {/* Texto */}
              <div className="relative z-10">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                  {eyebrow}
                </p>
                <h3 className="text-white text-2xl font-extrabold leading-tight mb-0.5">
                  {title}
                </h3>
                <p className="text-white/80 text-sm mb-4">{subtitle}</p>
                <span className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors group-hover:bg-white/30">
                  {cta} →
                </span>
              </div>

              {/* Ícone + badge */}
              <div className="relative z-10 flex flex-col items-center gap-2 ml-4 shrink-0">
                <div className="bg-white/15 p-4 rounded-2xl">
                  <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                <span
                  className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${badgeBg}`}
                >
                  {badge}
                </span>
              </div>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
