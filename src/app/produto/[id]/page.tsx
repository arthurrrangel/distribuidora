import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import { products, categoriesMap } from "@/lib/products";
import { ProductMainInfo } from "@/components/ProductMainInfo";
import { ChevronRight, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Produto não encontrado.</p>
        </div>
    )
  }

  const categoryName = categoriesMap[product.category as keyof typeof categoriesMap] || "Departamento";

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 text-xs text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-[#2563EB]">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/departamento/${product.category}`} className="hover:text-[#2563EB]">{categoryName}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Image Gallery (Mock) */}
            <div className="space-y-4 w-full md:w-[400px] shrink-0">
                <div className="bg-gray-50 rounded-xl border border-gray-100 aspect-square flex items-center justify-center relative overflow-hidden">
                     {/* Placeholder Image */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                        <span className="text-4xl font-bold opacity-20">Arel</span>
                        <span className="text-sm mt-2">{product.name}</span>
                     </div>
                     {product.discount && (
                         <div className="absolute top-4 left-4 bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-md">
                             {product.discount}% OFF
                         </div>
                     )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`aspect-square rounded-lg border flex items-center justify-center cursor-pointer ${i === 1 ? 'border-blue-500 ring-1 ring-blue-500 bg-white' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}>
                             <span className="text-xs text-gray-400">Foto {i}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-2 leading-tight">
                    {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-sm text-gray-500">(128 avaliações)</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-500">Cód: {product.id}</span>
                </div>

                <ProductMainInfo product={product} />

                {/* Benefits */}
                <div className="space-y-4">
                     <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                        <Truck className="w-6 h-6 text-[#2563EB] shrink-0" />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Frete Grátis</h3>
                            <p className="text-xs text-gray-500 mt-1">Para compras acima de R$ 200,00 na sua região.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                        <ShieldCheck className="w-6 h-6 text-[#2563EB] shrink-0" />
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Compra Garantida</h3>
                            <p className="text-xs text-gray-500 mt-1">Receba o produto que está esperando ou devolvemos o dinheiro.</p>
                        </div>
                     </div>
                </div>

                {/* Description */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Descrição do Produto</h3>
                    <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                        <p>
                            O {product.name} é ideal para o seu negócio. Produto de alta qualidade, 
                            selecionado para atender às necessidades de empresas e comércios.
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Embalagem: {product.packageSize || 'Unidade'}</li>
                            <li>Categoria: {categoryName}</li>
                            <li>Ideal para revenda ou consumo interno.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
