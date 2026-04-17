import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";

export const metadata = {
  title: "Sobre a Repon | Quem somos",
  description:
    "Distribuidora de papelaria e material de escritório com sede no Rio de Janeiro.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Quem é a Repon
          </h1>

          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Repon</strong> nasceu no Rio de Janeiro pra resolver um
            problema simples: quem tem papelaria, escola ou escritório não
            deveria perder tempo comprando de vários fornecedores diferentes. A
            gente junta tudo num lugar só — Filipaper, Filimail, Usapel, Spiral
            e outras marcas que você já conhece — e entrega na sua porta.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Somos a <strong>Repon Plataforma de Comércio Ltda</strong> (CNPJ
            54.563.438/0001-07), com sede no Rio de Janeiro.
            Vendemos exclusivamente para empresas com CNPJ, com preço de
            atacado e nota fiscal em todo pedido.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            O que diferencia a Repon? A gente não complica. Pediu até as 14h,
            sai no mesmo dia. Frete grátis em pedidos acima de R$ 500. E se
            tiver qualquer dúvida, é só mandar um zap que a gente responde
            rápido.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Quer fazer um pedido ou tirar uma dúvida? Manda uma mensagem pelo
            WhatsApp — a gente tá sempre por aqui.
          </p>
        </div>
      </main>
      <MobileNavigator />
      <Footer />
    </>
  );
}
