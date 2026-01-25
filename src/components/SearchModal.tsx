"use client";

import { Search, X, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/services/productService"; // Agora importando do local correto
import { Product } from "@/types/shopify";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Foca no input ao abrir
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Debounce da busca (Live Search)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setLoading(true);
        try {
          const result = await searchProducts(searchQuery);
          setResults(result.products || []);
        } catch (error) {
          console.error("Erro na busca", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Função para ir para a página de resultados completa
  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      onClose();
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-start md:items-center md:pt-24">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/10 transition-opacity animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full h-[90vh] md:h-auto md:max-h-[600px] md:max-w-2xl md:rounded-xl flex flex-col relative z-10 animate-slide-up md:animate-fade-in shadow-2xl overflow-hidden">
        {/* Header da Busca */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white z-20">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="O que você procura?"
              className="w-full py-3 pl-10 pr-10 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
              }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setResults([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#2563EB] font-medium text-sm px-2 hover:bg-blue-50 rounded py-2 transition-colors"
          >
            Cancelar
          </button>
        </div>

        {/* Lista de Resultados */}
        <div className="flex-1 overflow-y-auto p-2 md:min-h-[300px]">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
            </div>
          ) : searchQuery.length > 2 ? (
            <div className="space-y-1">
              {results.length > 0 && (
                <div className="px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Sugestões de Produtos
                </div>
              )}

              {results.map((product) => {
                const mainImage = product.images.edges[0]?.node;
                const price = parseFloat(
                  product.priceRange.minVariantPrice.amount,
                );

                return (
                  <Link
                    key={product.id}
                    href={`/produto/${product.handle}`}
                    className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                    onClick={onClose}
                  >
                    <div className="w-14 h-14 bg-white rounded-md shrink-0 relative overflow-hidden border border-gray-100 flex items-center justify-center">
                      {mainImage ? (
                        <Image
                          src={mainImage.url}
                          alt={mainImage.altText || product.title}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="text-[8px] text-gray-300">
                          SEM FOTO
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-[#2563EB] transition-colors">
                        {product.title}
                      </h4>
                      <span className="text-[#166534] font-bold text-sm">
                        R$ {price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2563EB]" />
                  </Link>
                );
              })}

              {results.length > 0 && (
                <button
                  onClick={handleSearchSubmit}
                  className="w-full text-center py-4 text-sm text-[#2563EB] font-medium hover:underline mt-2 border-t border-gray-50"
                >
                  Ver todos os resultados para &quot;{searchQuery}&quot;
                </button>
              )}

              {results.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>
                    Nenhum produto encontrado para &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Digite o nome do produto ou marca...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
