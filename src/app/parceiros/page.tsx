import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import {
  Truck,
  TrendingUp,
  Users,
  ShoppingBag,
  MapPin,
  BarChart3,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Seja nosso Parceiro | Repon",
  description:
    "Fornecedores de papelaria e material de escritório: distribua seus produtos através da Repon. Plataforma B2B com operação em RJ.",
};

const stats = [
  { value: "200+", label: "Empresas compram com a gente", icon: Users },
  { value: "RJ", label: "Atuação no Rio de Janeiro", icon: MapPin },
  { value: "24h", label: "Entrega na maioria das cidades", icon: Truck },
  { value: "100%", label: "Vendas com nota fiscal", icon: BarChart3 },
];

const reasons = [
  {
    icon: ShoppingBag,
    title: "Canal direto pro lojista",
    description:
      "Seus produtos chegam direto na mão de quem vende: papelarias, escritórios, escolas. Sem intermediário extra.",
  },
  {
    icon: TrendingUp,
    title: "Volume crescente",
    description:
      "A Repon está em expansão. Cada novo fornecedor parceiro amplia nosso catálogo e atrai mais clientes — o que gera mais pedidos pra todo mundo.",
  },
  {
    icon: Truck,
    title: "Logística resolvida",
    description:
      "A gente cuida do frete, do estoque e da entrega. Você foca na produção, a gente coloca na mão do cliente.",
  },
  {
    icon: Users,
    title: "Relacionamento de verdade",
    description:
      "Não somos marketplace que some depois da venda. A gente conhece cada cliente pelo nome e cuida do pós-venda.",
  },
];

export default function ParceirosPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
  const whatsappMessage = encodeURIComponent(
    "Olá! Sou fabricante/distribuidor e tenho interesse em ser parceiro da Repon.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero da página de parceiros */}
        <section className="bg-gradient-to-br from-[#01092D] to-[#0464D5] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
              Para fabricantes e distribuidores
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
              Coloque seus produtos na frente de quem compra
            </h1>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              A Repon é uma plataforma de distribuição B2B de papelaria e
              material de escritório com operação no Rio de Janeiro. Se você fabrica
              ou distribui, a gente coloca seu produto na mão do lojista.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Falar sobre parceria
            </a>
          </div>
        </section>

        {/* Números */}
        <section className="bg-gray-50 border-b border-gray-200 py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className="inline-flex bg-blue-50 p-2.5 rounded-xl mb-2">
                    <Icon className="w-5 h-5 text-[#0464D5]" />
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">
                    {value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por que distribuir pela Repon */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                Por que distribuir pela Repon?
              </h2>
              <p className="text-gray-500 text-sm">
                Não somos só mais um canal. Somos o canal que o lojista usa
                todo mês.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reasons.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex gap-4 items-start">
                    <div className="bg-blue-50 p-3 rounded-xl shrink-0">
                      <Icon
                        className="w-6 h-6 text-[#0464D5]"
                        strokeWidth={1.8}
                      />
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-gray-50 py-14 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Como funciona
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Você entra em contato",
                  desc: "Manda um zap ou e-mail dizendo que tem interesse. A gente responde rápido.",
                },
                {
                  step: "2",
                  title: "A gente alinha condições",
                  desc: "Conversamos sobre tabela de preço, volume mínimo, prazo de entrega e condições de pagamento. Sem burocracia.",
                },
                {
                  step: "3",
                  title: "Seus produtos entram no catálogo",
                  desc: "A gente cadastra tudo no site, tira foto se precisar, e começa a vender pros nossos clientes.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#0464D5] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mt-0.5">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quem já trabalha com a gente */}
        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Quem já distribui pela Repon
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap mb-10">
              {["Filipaper", "Filimail", "Usapel"].map((brand) => (
                <div
                  key={brand}
                  className="bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold text-gray-600"
                >
                  {brand}
                </div>
              ))}
              <div className="bg-blue-50 border-2 border-dashed border-[#0464D5]/30 rounded-lg px-6 py-3 text-sm font-bold text-[#0464D5]">
                Sua marca aqui?
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-[#0464D5] py-14">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Bora conversar?
            </h2>
            <p className="text-blue-200 text-sm mb-8 max-w-lg mx-auto">
              Se você fabrica ou distribui material de papelaria e escritório,
              a gente quer te conhecer. Sem compromisso — é só uma conversa
              pra ver se faz sentido.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="mailto:contato@repon.com.br"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-white/20 transition-colors border border-white/20"
              >
                contato@repon.com.br
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <MobileNavigator />
      <Footer />
    </>
  );
}
