"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Definição da interface baseada na resposta padrão de paginação do GraphQL
interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

interface PaginationProps {
  pageInfo: PageInfo;
}

export function Pagination({ pageInfo }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Função que manipula a mudança de página mantendo os outros filtros
  const handlePageChange = (
    direction: "next" | "prev",
    cursor: string | null,
  ) => {
    // Se o cursor for nulo, não faz nada
    if (!cursor) return;

    // Preserva os parâmetros existentes (sort, type, tag, q, etc.)
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    // Atualiza apenas os parâmetros de paginação
    params.set("cursor", cursor);
    params.set("direction", direction);

    // Navega para a nova URL
    router.push(`${pathname}?${params.toString()}`);
  };

  // --- ALTERAÇÃO AQUI ---
  // Removi o bloco "if" que retornava null.
  // Agora ele sempre vai renderizar os botões,
  // e o estado "disabled" dos botões cuidará da visualização correta.

  return (
    <div className="flex justify-center items-center gap-6 mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border-t border-gray-100 pt-8">
      {/* Botão Anterior */}
      <button
        onClick={() => handlePageChange("prev", pageInfo.startCursor)}
        disabled={!pageInfo.hasPreviousPage}
        className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
          !pageInfo.hasPreviousPage
            ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
            : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300 shadow-sm"
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Anterior
      </button>

      {/* Indicador Visual */}
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2">
        Navegação
      </span>

      {/* Botão Próximo */}
      <button
        onClick={() => handlePageChange("next", pageInfo.endCursor)}
        disabled={!pageInfo.hasNextPage}
        className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
          !pageInfo.hasNextPage
            ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
            : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300 shadow-sm"
        }`}
      >
        Próximo
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
