import { Briefcase, Tv, Monitor, Heart, CookingPot, Smartphone } from 'lucide-react';
import Link from 'next/link';

export function Categories() {
  const categories = [
    { name: "Papelaria & Escritório", icon: Briefcase, slug: "papelaria-e-escritorio" },
    { name: "Eletrônicos & TVs", icon: Tv, slug: "eletronicos-e-tvs" },
    { name: "Informática & Acessórios", icon: Monitor, slug: "informatica-e-acessorios" },
    { name: "Saúde, Nutrição & Bem-Estar", icon: Heart, slug: "saude-nutricao-e-bem-estar" },
    { name: "Utilidades Domésticas", icon: CookingPot, slug: "utilidades-domesticas" },
    { name: "Áudio, Vídeo & Mobile", icon: Smartphone, slug: "audio-video-e-mobile" },
  ];

  return (
    <section id="categories" className="pt-0 pb-4 md:py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center">
            {categories.map((cat, index) => (
                <Link key={index} href={`/departamento/${cat.slug}`} className="flex flex-col items-center gap-2 group min-w-[90px]">
                    <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors shadow-sm">
                        {/* Fallback for MessageCircleQuestion if it's not imported or just use a generic icon */}
                        <cat.icon strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 text-center group-hover:text-[#2563EB] transition-colors leading-tight max-w-[90px]">{cat.name}</span>
                </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

 
