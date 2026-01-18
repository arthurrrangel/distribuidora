import Image from 'next/image';
import { Truck, Clock, ShoppingCart } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-blue-50 pt-6 pb-0 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 mb-4 md:mb-0 z-20 flex flex-col">
          <h1 className="order-1 text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#1e3a8a] mb-6 leading-tight text-center md:text-left">
            Tecnologia, Papelaria e muito mais para o seu negócio.
          </h1>

          {/* Mobile Image */}
          <div className="order-2 md:hidden w-full aspect-video relative mb-4 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                 <Image 
                   src="/hero_stationery.png" 
                   alt="Equipe Arel conferindo estoque de papelaria - Atacado e Varejo" 
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent"></div>
          </div>
          
          <div className="order-4 md:order-2 grid grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-8">
             <div className="bg-white/60 backdrop-blur-sm border border-blue-100 p-2 md:p-3 rounded-xl flex flex-col items-center md:items-start gap-2 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-[#2563EB] shrink-0">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-[#1e3a8a] text-[10px] md:text-sm leading-tight">Mix Completo</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed hidden sm:block">De Papelaria a Eletrônicos.</p>
                </div>
             </div>
             
             <div className="bg-white/60 backdrop-blur-sm border border-blue-100 p-2 md:p-3 rounded-xl flex flex-col items-center md:items-start gap-2 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-[#2563EB] shrink-0">
                    <Truck className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-[#1e3a8a] text-[10px] md:text-sm leading-tight">Frete Grátis</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed hidden sm:block">Para CNPJ na região.</p>
                </div>
             </div>

             <div className="bg-white/60 backdrop-blur-sm border border-blue-100 p-2 md:p-3 rounded-xl flex flex-col items-center md:items-start gap-2 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-[#2563EB] shrink-0">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-[#1e3a8a] text-[10px] md:text-sm leading-tight">Entrega Rápida</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed hidden sm:block">Em até 24h úteis.</p>
                </div>
             </div>
          </div>
          
          <div className="order-3 md:order-3 flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-2 md:mb-0">
             <button className="bg-[#2563EB] text-white px-6 py-3.5 rounded-md font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 w-full sm:w-auto text-center">
                Criar uma conta →
             </button>
             <button className="text-[#2563EB] font-bold px-6 py-3.5 hover:bg-blue-50 rounded-md transition-colors w-full sm:w-auto text-center border border-transparent hover:border-blue-100">
                Entrar
             </button>
          </div>
        </div>

        <div className="md:w-5/12 hidden md:block relative w-full px-4 md:px-0">
             <div className="relative w-full aspect-4/3 rounded-2xl md:rounded-tl-[80px] md:rounded-br-[80px] overflow-hidden shadow-xl md:shadow-2xl md:skew-y-3 md:transform md:rotate-2 border-4 border-white">
                 <Image 
                   src="/hero_stationery.png" 
                   alt="Equipe Arel conferindo estoque de papelaria - Atacado e Varejo" 
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent"></div>
             </div>
        </div>
      </div>
      
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-100 to-transparent -skew-x-12 opacity-50 z-0"></div>
    </div>
  );
}
