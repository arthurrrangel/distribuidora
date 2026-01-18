"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, ShoppingCart, Lock } from 'lucide-react';
import type { Product } from '@/lib/products';

export function ProductMainInfo({ product }: { product: Product }) {
  const { isLoggedIn, userType } = useAuth();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const finalPrice = userType === 'cnpj' ? product.price * 0.9 : product.price;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addItem({ ...product, price: finalPrice }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-8">
        <div className="mb-2">
             {product.originalPrice && isLoggedIn && (
                <span className="text-gray-400 line-through text-sm">De: R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
            )}
            
            {isLoggedIn ? (
                <div className="flex items-end gap-2">
                     <span className="text-3xl font-extrabold text-[#2563EB]">R$ {finalPrice.toFixed(2).replace('.', ',')}</span>
                     <span className="text-gray-500 mb-1">/{product.unit}</span>
                     {userType === 'cnpj' && (
                        <span className="mb-1 ml-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded inline-block">Atacado</span>
                     )}
                </div>
            ) : (
                <div className="flex items-center gap-2 py-2">
                    <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-3 py-2 rounded-md font-medium border border-orange-100">
                        <Lock className="w-4 h-4" />
                        <span>Entre para ver o preço</span>
                    </div>
                </div>
            )}
        </div>
        
        {isLoggedIn && (
            <p className="text-sm text-blue-800/80 mb-4">
                Preço exclusivo para compras no site.
            </p>
        )}

        {isLoggedIn ? (
            <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                    <button 
                        onClick={handleDecrement}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50 disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <input 
                        type="text" 
                        value={quantity} 
                        className="w-12 text-center text-gray-900 font-medium focus:outline-none" 
                        readOnly 
                    />
                     <button 
                        onClick={handleIncrement}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <button 
                    onClick={handleAddToCart}
                    className={`flex-1 text-white h-12 rounded-md font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 ${added ? 'bg-green-600 hover:bg-green-700' : 'bg-[#2563EB] hover:bg-blue-700'}`}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                </button>
            </div>
        ) : (
             <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-600 text-sm mb-3">Faça login com seu CNPJ ou CPF para visualizar preços e comprar.</p>
                {/* Could add a Link to login here if needed, but Header handles it */}
            </div>
        )}
    </div>
  );
}
