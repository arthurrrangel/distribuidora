"use client";

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { products } from '@/lib/products';
import { useRef } from 'react';

export function ProductGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const featuredProducts = products.slice(0, 10);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Ofertas da Semana</h2>
            <div className="flex items-center gap-4">
                 <a href="#" className="text-[#2563EB] font-bold text-sm hover:underline hidden sm:block">Ver todos</a>
                 <div className="flex gap-2">
                    <button 
                        onClick={scrollLeft}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={scrollRight}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-[#2563EB] shadow-sm transition-colors cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                 </div>
            </div>
        </div>

        <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 scroll-smooth"
        >
            {featuredProducts.map((product) => (
                <div key={product.id} className="min-w-[160px] md:min-w-[200px] max-w-[200px] shrink-0 h-full">
                    <ProductCard {...product} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
