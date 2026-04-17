import { Users, Package, Truck, Award } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "500+",
    label: "Itens no catálogo",
  },
  {
    icon: Users,
    value: "200+",
    label: "Empresas atendidas",
  },
  {
    icon: Award,
    value: "10+",
    label: "Marcas parceiras",
  },
  {
    icon: Truck,
    value: "24h",
    label: "Entrega no RJ",
  },
];

const brands = [
  { name: "Filipaper", initial: "FP" },
  { name: "Filimail", initial: "FM" },
  { name: "Usapel", initial: "US" },
  { name: "Spiral", initial: "SP" },
  { name: "Prata", initial: "PT" },
  { name: "Masterprint", initial: "MP" },
  { name: "BRW", initial: "BW" },
  { name: "Tilibra", initial: "TL" },
];

export function TrustBar() {
  return (
    <div className="w-full">
      {/* ── Números ── */}
      <div className="bg-gradient-to-r from-[#01092D] to-[#0464D5] py-6 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-1"
              >
                <div className="bg-white/10 p-2.5 rounded-xl mb-1">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl md:text-3xl font-extrabold text-white leading-none">
                  {value}
                </span>
                <span className="text-blue-200 text-xs font-medium leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marcas ── */}
      <div className="bg-gray-50 border-y border-gray-200 py-4 px-4 overflow-hidden">
        <div className="container mx-auto">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Trabalhamos com
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {brands.map(({ name, initial }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#0464D5]/40 group-hover:shadow-md transition-all duration-200">
                  <span className="text-lg font-black text-gray-600 group-hover:text-[#0464D5] transition-colors tracking-tight">
                    {initial}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-gray-500 group-hover:text-[#0464D5] transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
