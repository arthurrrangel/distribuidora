"use client";

import { Plus, Lock, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductProps {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image?: string;
  packageSize?: string;
  discount?: number;
}


export function ProductCard({ id, name, price, originalPrice, unit, image, packageSize, discount }: ProductProps) {
  const { isLoggedIn, userType } = useAuth();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  
  // Mock logic: CNPJ gets 10% extra discount
  const finalPrice = userType === 'cnpj' ? price * 0.9 : price;

  const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem({ id, name, price: finalPrice, originalPrice, unit, image });
      
      // Feedback animation
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative group flex flex-col h-full">
      <Link href={`/produto/${id || '#'}`} className="absolute inset-0 z-0" aria-label={`Ver detalhes de ${name}`} />
      
      {/* Discount Badge */}
      {discount && isLoggedIn && (
        <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md z-10">
          {discount}% OFF
        </div>
      )}

      {/* Image Area */}
      <div className="relative w-full aspect-square mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden z-10 pointer-events-none">
        {image ? (
            <div className="relative w-full h-full">
                 {/* Placeholder for real image since user asked to stop generating */}
                 <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                    Product Image: {name}
                 </div>
            </div>
        ) : (
             <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                AreL
             </div>
        )}
      </div>
        
      {/* Add Button - Only show if logged in */}
      {isLoggedIn && (
        <button 
            onClick={handleAddToCart}
            className={`absolute top-2 right-2 md:top-[45%] md:right-4 md:translate-x-1/2 md:-translate-y-1/2 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-all shadow-md z-20 cursor-pointer active:scale-95 ${added ? 'bg-green-500 hover:bg-green-600' : 'bg-[#2563EB] hover:bg-blue-700'}`}
        >
            {added ? <Check className="w-5 h-5 md:w-6 md:h-6" /> : <Plus className="w-5 h-5 md:w-6 md:h-6" />}
        </button>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col pointer-events-none">
        {packageSize && (
            <span className="text-xs text-gray-500 font-medium mb-1 block bg-gray-100 w-fit px-2 py-0.5 rounded-sm">{packageSize}</span>
        )}
        
        <div className="mb-2 min-h-[48px]">
            {isLoggedIn ? (
                <>
                    <div className="flex items-baseline gap-2">
                        <span className="text-[#166534] text-xl font-bold">R${finalPrice.toFixed(2).replace('.', ',')}</span>
                        <span className="text-gray-500 text-xs">/{unit}</span>
                    </div>
                    {originalPrice && (
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-400 line-through">R${originalPrice.toFixed(2).replace('.', ',')}</span>
                            {userType === 'cnpj' && <span className="text-blue-600 font-bold ml-1">Preço Atacado</span>}
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col justify-center h-full">
                    <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs w-fit font-medium">
                        <Lock className="w-3 h-3" />
                        <span>Entre para ver o preço</span>
                    </div>
                </div>
            )}
        </div>

        <h3 className="text-gray-700 text-sm font-medium leading-snug line-clamp-2 mt-auto" title={name}>
          {name}
        </h3>
      </div>
    </div>
  );
}
