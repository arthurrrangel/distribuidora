import { Star } from "lucide-react";

const depoimentos = [
  {
    nome: "Marcos Andrade",
    empresa: "Papelaria Central · Rio de Janeiro",
    texto:
      "Trabalho com a Repon há mais de 6 meses. Entrega no dia seguinte, nota fiscal sempre em ordem e os preços são os melhores que encontrei pra Filipaper.",
    estrelas: 5,
  },
  {
    nome: "Renata Souza",
    empresa: "Colégio São Bento · Rio de Janeiro",
    texto:
      "Precisava de material de escritório pra escola toda semana. A Repon resolveu — peço pelo site, cai no whats a confirmação e no dia seguinte tá aqui.",
    estrelas: 5,
  },
  {
    nome: "Felipe Costa",
    empresa: "Escritório & Cia · Niterói",
    texto:
      "Frete grátis de verdade, sem pegadinha de valor mínimo. Compro pequenas quantidades toda semana e nunca paguei frete. Diferencial real.",
    estrelas: 5,
  },
];

export function TrustSection() {
  return (
    <section className="py-12 md:py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-[#0464D5] uppercase tracking-widest mb-2">
            Quem compra com a gente
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Empresas que confiam na Repon
          </h2>
        </div>

        {/* Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {depoimentos.map(({ nome, empresa, texto, estrelas }) => (
            <div
              key={nome}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4"
            >
              {/* Estrelas */}
              <div className="flex gap-0.5">
                {Array.from({ length: estrelas }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#0464D5] fill-[#0464D5]"
                  />
                ))}
              </div>
              {/* Texto */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{texto}&rdquo;
              </p>
              {/* Autor */}
              <div>
                <p className="font-bold text-gray-900 text-sm">{nome}</p>
                <p className="text-gray-400 text-xs">{empresa}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Números */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
          {[
            { valor: "200+", label: "empresas atendidas" },
            { valor: "24h", label: "prazo de entrega" },
            { valor: "100%", label: "nota fiscal" },
            { valor: "RJ", label: "estados de operação" },
          ].map(({ valor, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-[#0464D5]">{valor}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
