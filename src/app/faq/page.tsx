import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Perguntas Frequentes | Repon",
  description:
    "Tire suas dúvidas sobre a Repon: frete, prazo de entrega, formas de pagamento, nota fiscal e cadastro de empresa.",
};

const faqs = [
  {
    category: "Cadastro e Acesso",
    items: [
      {
        q: "Qualquer empresa pode se cadastrar?",
        a: "Sim. A Repon vende exclusivamente para empresas com CNPJ ativo. Basta ter um CNPJ válido para criar sua conta e ter acesso aos preços e ao catálogo completo.",
      },
      {
        q: "O cadastro é gratuito?",
        a: "Sim, totalmente gratuito. Não há taxa de adesão nem mensalidade. Você se cadastra, faz login e já pode comprar.",
      },
      {
        q: "Pessoa física pode comprar?",
        a: "Não. A Repon é uma plataforma B2B (empresa para empresa). O cadastro e as compras são exclusivos para pessoas jurídicas com CNPJ.",
      },
    ],
  },
  {
    category: "Pedidos e Pagamento",
    items: [
      {
        q: "Existe pedido mínimo?",
        a: "Não. Você pode fazer pedidos de qualquer valor ou quantidade. Não existe mínimo para comprar na Repon.",
      },
      {
        q: "Quais são as formas de pagamento aceitas?",
        a: "Aceitamos boleto bancário e Pix. Após finalizar seu pedido no site, você pode pagar pelo link de pagamento ou combinar diretamente pelo WhatsApp.",
      },
      {
        q: "Como funciona o processo de pedido?",
        a: "Você adiciona os produtos ao carrinho, finaliza o pedido no site, e recebe um link de pagamento. Após a confirmação do pagamento, seu pedido é separado e enviado.",
      },
      {
        q: "Vocês emitem nota fiscal?",
        a: "Sim. 100% dos pedidos da Repon saem com nota fiscal eletrônica (NF-e). Você recebe o DANFE por e-mail junto com a confirmação do envio.",
      },
    ],
  },
  {
    category: "Frete e Entrega",
    items: [
      {
        q: "O frete é grátis?",
        a: "Sim. Para clientes com CNPJ, o frete é grátis em todos os pedidos. Verificamos as regiões atendidas com frete grátis durante o cadastro.",
      },
      {
        q: "Qual o prazo de entrega?",
        a: "Para as principais cidades do RJ, entregamos em até 24 horas após a confirmação do pagamento. Para outras regiões, o prazo pode variar de 2 a 5 dias úteis.",
      },
      {
        q: "Vocês entregam para todo o Brasil?",
        a: "A operação principal da Repon é em RJ, mas atendemos outros estados mediante consulta. Entre em contato pelo WhatsApp para verificar sua região.",
      },
    ],
  },
  {
    category: "Produtos e Catálogo",
    items: [
      {
        q: "Quais marcas vocês trabalham?",
        a: "Trabalhamos com as principais marcas do segmento: Filipaper, Filimail, Usapel, Spiral e outras. O catálogo é atualizado frequentemente.",
      },
      {
        q: "Os preços são de atacado?",
        a: "Sim. Todos os preços da Repon são de atacado, disponíveis somente para empresas com CNPJ logadas na plataforma.",
      },
      {
        q: "Um produto que quero não está no site. O que faço?",
        a: "Entre em contato pelo WhatsApp. Nossa equipe pode verificar disponibilidade ou adicionar o produto ao catálogo para pedidos futuros.",
      },
    ],
  },
  {
    category: "Atendimento",
    items: [
      {
        q: "Como falo com a Repon?",
        a: "O principal canal de atendimento é o WhatsApp. Nossa equipe responde de segunda a sexta das 9h às 18h e sábados das 9h às 13h.",
      },
      {
        q: "E se meu pedido chegar com problema?",
        a: "Entre em contato pelo WhatsApp em até 7 dias úteis após o recebimento. A Repon resolve trocas e ocorrências de forma ágil e sem burocracia.",
      },
    ],
  },
];

export default function FaqPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "21995946491";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Vim pelo site da Repon e tenho uma dúvida.")}`;

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pb-20 md:pb-0">
        {/* Hero */}
        <section className="bg-[#0464D5] py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
              Ajuda
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-blue-200/70 text-sm md:text-base max-w-xl mx-auto">
              Tudo que você precisa saber sobre a Repon — cadastro, pedidos,
              frete, pagamento e mais.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="container mx-auto px-4 max-w-3xl py-12">
          <div className="space-y-10">
            {faqs.map(({ category, items }) => (
              <div key={category}>
                <h2 className="text-xs font-bold text-[#0464D5] uppercase tracking-widest mb-4">
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map(({ q, a }) => (
                    <details
                      key={q}
                      className="group border border-gray-100 rounded-xl bg-white overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-gray-900 text-sm leading-snug">
                          {q}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-5 pb-4 pt-1">
                        <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA final */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
            <p className="font-bold text-gray-900 text-lg mb-2">
              Não encontrou sua resposta?
            </p>
            <p className="text-gray-500 text-sm mb-5">
              Nossa equipe responde rápido pelo WhatsApp.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0464D5] text-white font-bold px-7 py-3 rounded-lg text-sm hover:bg-[#0353b4] transition-colors"
            >
              Falar com a Repon
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <MobileNavigator />
    </>
  );
}
