import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";

export const metadata = {
  title: "Sobre nós | Distribuidora Repon ",
  description:
    "Conheça a Repon Distribuidora, referência em papelaria e material de escritório no Rio de Janeiro.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Sobre nós</h1>

          <p className="text-gray-700 leading-relaxed mb-4">
            A distribuidora <strong>Repon </strong> é uma empresa especializada
            na distribuição de produtos de papelaria e material de escritório,
            com sede no <strong>Rio de Janeiro, RJ</strong>. Atuamos há anos no
            mercado, fornecendo soluções completas para empresas, escolas,
            escritórios e consumidores em geral.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Nossa missão é oferecer produtos de qualidade com agilidade na
            entrega e preços competitivos. Trabalhamos com um amplo portfólio de
            marcas líderes de mercado, garantindo que nossos clientes encontrem
            tudo o que precisam em um único lugar.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Com foco em atendimento personalizado e eficiência logística, a
            Repon se destaca como parceira confiável para quem busca praticidade
            e bom custo-benefício. Seja para uso pessoal ou corporativo, estamos
            prontos para atender às suas necessidades.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Ficou com alguma dúvida ou deseja fazer um pedido? Entre em contato
            com nosso time de atendimento pelo WhatsApp e teremos prazer em
            ajudar.
          </p>
        </div>
      </main>
      <MobileNavigator />
      <Footer />
    </>
  );
}
