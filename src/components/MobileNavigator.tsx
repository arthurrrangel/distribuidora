"use client";

import { Home, Menu, ShoppingCart, User, Search } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { DepartmentsModal } from './DepartmentsModal';
import { SearchModal } from './SearchModal';

export function MobileNavigator() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
        {/* Mobile Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-[#2563EB]">
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-medium mt-1">Início</span>
                </Link>
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className={`flex flex-col items-center justify-center w-full h-full ${isSearchOpen ? 'text-[#2563EB]' : 'text-gray-500'} hover:text-[#2563EB]`}
                >
                    <Search className="w-6 h-6" />
                    <span className="text-[10px] font-medium mt-1">Busca</span>
                </button>
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className={`flex flex-col items-center justify-center w-full h-full ${isMenuOpen ? 'text-[#2563EB]' : 'text-gray-500'} hover:text-[#2563EB]`}
                >
                    <Menu className="w-6 h-6" />
                    <span className="text-[10px] font-medium mt-1">Departamentos</span>
                </button>
                <Link href="/carrinho" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#2563EB] relative">
                    <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium mt-1">Carrinho</span>
                </Link>
                <Link href="/login" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#2563EB]">
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-medium mt-1">Conta</span>
                </Link>
            </div>
        </div>

        <DepartmentsModal 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
        />

        <SearchModal 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
        />
    </>
  );
}
