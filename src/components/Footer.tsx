"use client";

import { Facebook, Instagram, Linkedin, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const FooterSection = ({ title, sectionBox, children }: { title: string, sectionBox: string, children: React.ReactNode }) => (
    <div className="border-b border-gray-100 md:border-none last:border-0">
        <button 
            onClick={() => toggleSection(sectionBox)}
            className="flex items-center justify-between w-full py-4 md:py-0 md:mb-6 group"
        >
            <h3 className="font-bold text-[#1e3a8a]">{title}</h3>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform md:hidden ${openSection === sectionBox ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 md:block ${openSection === sectionBox ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
            {children}
        </div>
    </div>
  );

  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-24 md:pt-16 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-8 mb-8 md:mb-12">
            {/* Brand */}
            <div className="mb-8 md:mb-0 text-center md:text-left">
                 <div className="mb-6 flex justify-center md:justify-start">
                    <Link href="/">
                        <Image src="/logo.svg" alt="Arel Distribuidora" width={150} height={50} className="h-12 w-auto object-contain" />
                    </Link>
                </div>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto md:mx-0">
                    Sua distribuidora parceira para abastecer seu negócio com agilidade e os melhores preços.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Links Sections with Accordion on Mobile */}
            <FooterSection title="Institucional" sectionBox="institucional">
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><Link href="#" className="hover:text-[#2563EB]">Sobre nós</Link></li>
                    <li><Link href="#" className="hover:text-[#2563EB]">Trabalhe conosco</Link></li>
                    <li><Link href="#" className="hover:text-[#2563EB]">Política de Privacidade</Link></li>
                    <li><Link href="#" className="hover:text-[#2563EB]">Termos de Uso</Link></li>
                </ul>
            </FooterSection>

            <FooterSection title="Departamentos" sectionBox="departamentos">
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><Link href="/departamento/papelaria-e-escritorio" className="hover:text-[#2563EB]">Papelaria & Escritório</Link></li>
                    <li><Link href="/departamento/eletronicos-e-tvs" className="hover:text-[#2563EB]">Eletrônicos & TVs</Link></li>
                    <li><Link href="/departamento/informatica-e-acessorios" className="hover:text-[#2563EB]">Informática & Acessórios</Link></li>
                    <li><Link href="/departamento/saude-nutricao-e-bem-estar" className="hover:text-[#2563EB]">Saúde & Bem-Estar</Link></li>
                    <li><Link href="/departamento/utilidades-domesticas" className="hover:text-[#2563EB]">Utilidades Domésticas</Link></li>
                    <li><Link href="/departamento/audio-video-e-mobile" className="hover:text-[#2563EB]">Áudio & Mobile</Link></li>
                </ul>
            </FooterSection>

            <FooterSection title="Ajuda" sectionBox="ajuda">
                <ul className="space-y-4 text-sm text-gray-500">
                    <li><Link href="#" className="hover:text-[#2563EB]">Central de Ajuda</Link></li>
                    <li><Link href="#" className="hover:text-[#2563EB]">Meus Pedidos</Link></li>
                    <li><Link href="#" className="hover:text-[#2563EB]">Trocas e Devoluções</Link></li>
                    <li><Link href="#" className="hover:text-[#2563EB]">Fale Conosco</Link></li>
                </ul>
            </FooterSection>

             {/* Contact */}
             <div className="pt-8 md:pt-0">
                <h3 className="font-bold text-[#1e3a8a] mb-6 text-center md:text-left">Atendimento</h3>
                <div className="space-y-4">
                     <button className="flex items-center gap-3 w-full justify-center md:justify-start bg-[#25D366] text-white px-4 py-3 rounded-md font-bold hover:bg-[#20bd5b] transition-colors">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>Falar no WhatsApp</span>
                    </button>
                    <p className="text-sm text-center md:text-left text-gray-500">
                        Segunda a Sexta das 9h às 18h<br/>
                        Sábado das 9h às 13h
                    </p>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-center text-center text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} Arel Distribuidora. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
