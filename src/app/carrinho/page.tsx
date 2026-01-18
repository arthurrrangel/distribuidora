"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal, cartCount } = useCart();

  const shipping = 0; // Free shipping logic mock
  const total = cartTotal + shipping;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Meu Carrinho ({cartCount})
        </h1>

        {items.length === 0 ? (
           <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#2563EB]">
                <ShoppingCart className="w-10 h-10" />
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
             <p className="text-gray-500 mb-6">Aproveite nossas ofertas e abasteça seu negócio agora mesmo.</p>
             <Link href="/" className="inline-block bg-[#2563EB] text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors">
                Ir às compras
             </Link>
           </div>
        ) : (
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4 items-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-md shrink-0 flex items-center justify-center text-xs text-gray-400 relative overflow-hidden">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                ) : (
                                    <span>Item</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 text-sm md:text-base">{item.name}</h3>
                                <p className="text-xs text-gray-500">Unidade: {item.unit}</p>
                                <div className="mt-2 flex items-center gap-4">
                                    <span className="font-bold text-[#2563EB]">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                                    <div className="flex items-center border border-gray-200 rounded text-sm">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-2 py-1 border-x border-gray-200 min-w-[30px] text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 hover:bg-gray-50 text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-400 hover:text-red-600 p-2 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:w-96">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="font-bold text-gray-800 mb-4 border-b pb-2">Resumo do Pedido</h2>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Frete</span>
                                <span>Grátis</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-bold text-lg text-[#1e3a8a] border-t pt-4 mb-6">
                            <span>Total</span>
                            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                        </div>

                        <button className="w-full bg-[#2563EB] text-white py-3.5 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            Finalizar Compra
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <Link href="/" className="block text-center text-[#2563EB] text-sm mt-4 hover:underline">
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
