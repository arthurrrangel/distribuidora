"use client";

import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/lib/products';

type SearchModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="bg-white rounded-t-2xl w-full h-[85vh] flex flex-col relative z-10 animate-slide-up pb-safe">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100 sticky top-0 bg-white z-20">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            className="w-full py-3 pl-10 pr-10 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button onClick={onClose} className="text-[#2563EB] font-medium">
                        Cancelar
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                    {searchQuery.length > 0 ? (
                        <div className="space-y-4">
                            {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
                                <Link 
                                    key={product.id} 
                                    href={`/produto/${product.id}`}
                                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                                    onClick={onClose}
                                >
                                   <div className="w-16 h-16 bg-gray-100 rounded-md shrink-0 flex items-center justify-center overflow-hidden">
                                       {/* Placeholder image logic matching ProductCard */}
                                       <div className="text-[8px] text-gray-400 text-center p-1">
                                            {product.image ? 'Product Img' : 'Sem Img'}
                                       </div>
                                   </div>
                                   <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h4>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="text-[#166534] font-bold text-sm">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                                            {product.originalPrice && (
                                                <span className="text-gray-400 text-xs line-through">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
                                            )}
                                        </div>
                                   </div>
                                </Link>
                            ))}
                            {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                 <div className="text-center py-12 text-gray-500">
                                    <p>Nenhum produto encontrado para &quot;{searchQuery}&quot;</p>
                                 </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Digite para buscar produtos</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
