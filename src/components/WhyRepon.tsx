import {
  Truck,
  ShieldCheck,
  BadgePercent,
  Headset,
  Building2,
  PackageCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Entrega no dia seguinte",
    description:
      "Pediu até as 14h? Sai no mesmo dia. A maioria dos clientes no RJ recebe em 24h — sem enrolação.",
    color: "text-[#0464D5]",
    bg: "bg-blue-50",
  },
  {
    icon: BadgePercent,
    title: "Preço de quem compra direto",
    description:
      "Você compra no mesmo preço que papelaria grande paga. Tem CNPJ? Então tem desconto. Simples assim.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "Pagamento tranquilo",
    description:
      "Pix com confirmação na hora ou boleto. Site com SSL, seus dados ficam protegidos. Nada de surpresa.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Headset,
    title: "Fala com a gente no Whats",
    description:
      "Nada de esperar robô atender. Manda um zap que a gente responde rápido, de segunda a sábado.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Building2,
    title: "Empresa de verdade",
    description:
      "Repon Plataforma de Comércio Ltda — CNPJ 54.563.438/0001-07. Nota fiscal em todo pedido. Tudo certinho.",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    icon: PackageCheck,
    title: "Tudo num lugar só",
    description:
      "Filipaper, Filimail, Usapel, Spiral e mais. Em vez de comprar de 5 fornecedores, resolve tudo aqui.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export function WhyRepon() {
  return (
    <section className="bg-gray-50 py-14 mt-10">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-[#0464D5] uppercase tracking-widest mb-2">
            Por que comprar com a Repon?
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
            Seu fornecedor de papelaria no RJ
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            A gente vende só pra empresa. Se você tem CNPJ e precisa de
            material, tá no lugar certo.
          </p>
        </div>

        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-6 flex gap-4 items-start shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-200"
            >
              <div className={`${bg} p-3 rounded-xl shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
