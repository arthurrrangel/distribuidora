import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";

export function PartnerCTA() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="bg-[#0464D5] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="bg-[#0464D5]/20 p-4 rounded-2xl shrink-0">
          <Handshake className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-white text-lg md:text-xl font-extrabold mb-1">
            É fabricante ou distribuidor?
          </h3>
          <p className="text-white/50 text-sm">
            A Repon tá crescendo e buscando novos parceiros de papelaria e
            escritório. Se você quer colocar seus produtos na frente de
            lojistas no Rio de Janeiro, fala com a gente.
          </p>
        </div>

        <Link
          href="/parceiros"
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors shrink-0"
        >
          Saiba mais
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
