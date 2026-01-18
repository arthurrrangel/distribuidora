"use client";

import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown, Briefcase, Tv, Monitor, Heart, CookingPot, Smartphone, ChevronRight, Check } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Rio de Janeiro");
  const { cartCount } = useCart();

  const departments = [
    { name: "Papelaria & Escritório", icon: Briefcase, slug: "papelaria-e-escritorio" },
    { name: "Eletrônicos & TVs", icon: Tv, slug: "eletronicos-e-tvs" },
    { name: "Informática & Acessórios", icon: Monitor, slug: "informatica-e-acessorios" },
    { name: "Saúde, Nutrição & Bem-Estar", icon: Heart, slug: "saude-nutricao-e-bem-estar" },
    { name: "Utilidades Domésticas", icon: CookingPot, slug: "utilidades-domesticas" },
    { name: "Áudio, Vídeo & Mobile", icon: Smartphone, slug: "audio-video-e-mobile" },
  ];

  return (
    <div className="w-full relative">
      <div className="fixed top-0 left-0 right-0 z-50 md:relative w-full">
        {/* Top Bar */}
        <div className="bg-[#1e3a8a] text-white text-xs py-1.5 px-4 flex justify-center items-center h-[28px] relative z-50">
            <button 
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className="flex items-center gap-1 hover:text-blue-200 transition-colors"
            >
                <MapPin className="w-3 h-3" />
                <span className="font-medium">Região: {selectedRegion}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isRegionOpen ? 'rotate-180' : ''}`} />
            </button>

            {isRegionOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsRegionOpen(false)}></div>
                    <div className="absolute top-full mt-1 bg-white rounded-md shadow-lg py-1 text-gray-800 min-w-[150px] z-50 animate-slide-up border border-gray-100">
                        <button 
                            className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-blue-50 text-xs font-medium text-[#2563EB]"
                            onClick={() => {
                                setSelectedRegion("Rio de Janeiro");
                                setIsRegionOpen(false);
                            }}
                        >
                            <span className="flex-1">Rio de Janeiro</span>
                            {selectedRegion === "Rio de Janeiro" && <Check className="w-3 h-3" />}
                        </button>
                    </div>
                </>
            )}
        </div>

        {/* Main Header */}
        <header className="bg-[#2563EB] text-white py-4 px-4 h-[76px]">
            <div className="container mx-auto flex items-center justify-between gap-8 h-full">
                {/* Logo */}
                <div className="flex-1 flex justify-center md:justify-start md:flex-none">
                    <Link href="/" className="flex items-center gap-2 group bg-white p-1.5 md:p-2 rounded-lg">
                        <Image src="/logo.svg" alt="Arel Distribuidora" width={150} height={50} className="h-8 md:h-12 w-auto object-contain" />
                    </Link>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-3xl relative hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar produtos..."
                            className="w-full py-3 pl-10 pr-4 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none ring-0 border-none shadow-sm"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    <Link href="/login" className="hidden md:flex items-center gap-3 bg-[#facc15] text-[#1e3a8a] px-3 py-2 md:px-4 md:py-2 rounded-md font-medium hover:bg-[#ffe066] transition-colors">
                        <User className="w-5 h-5" />
                        <div className="text-left leading-tight text-xs hidden sm:block">
                            <div className="font-bold">Cadastre-se</div>
                            <div>Ou faça Login</div>
                        </div>
                    </Link>
                    <Link href="/carrinho" className="relative p-2 hover:bg-blue-600 rounded-full transition-colors hidden md:block">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
      </div>
      
      {/* Spacer for Fixed Header on Mobile */}
      <div className="h-[104px] md:hidden"></div>
      
      {/* Search Mobile - Scrolls with page */}
      <div className="bg-[#2563EB] px-4 pb-4 md:hidden">
         <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="w-full py-3 pl-10 pr-4 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none ring-0 border-none shadow-sm text-base"
            />
        </div>
      </div>
      
      {/* Search Mobile */}

      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 shadow-sm hidden md:block sticky top-0 z-40">
        <div className="container mx-auto flex items-center relative">
            <div 
                className="relative"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`flex items-center gap-3 font-semibold px-4 py-3 hover:bg-gray-50 transition-colors whitespace-nowrap border-r border-gray-100 pr-6 mr-2 ${isMenuOpen ? 'text-[#2563EB] bg-gray-50' : 'text-[#2563EB]'}`}
                >
                    <Menu className="w-5 h-5" />
                    Todos os Departamentos
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-b-md border border-gray-100 py-2 z-50">
                        {departments.map((dept, index) => (
                            <Link 
                                key={index} 
                                href={`/departamento/${dept.slug}`}
                                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] transition-colors group"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <dept.icon className="w-5 h-5 text-gray-400 group-hover:text-[#2563EB]" />
                                <span className="font-medium text-sm flex-1">{dept.name}</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2563EB]" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center overflow-x-auto no-scrollbar mask-gradient">
                {departments.filter(d => d.slug !== 'audio-video-e-mobile').map((item) => (
                    <Link key={item.name} href={`/departamento/${item.slug}`} className="px-4 py-3 text-gray-500 hover:text-[#2563EB] text-sm font-medium whitespace-nowrap transition-colors">
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
      </nav>
      
      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/20 z-30 top-[170px]" 
            onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
