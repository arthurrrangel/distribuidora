// src/components/TopBar.tsx
// Barra superior preta com benefícios + CNPJ — estética startup B2B.

export function TopBar() {
  return (
    <div className="bg-ink text-paper-100 border-b border-ink-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-8 text-[11px]">
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-2 shrink-0">
            <span className="w-1 h-1 rounded-full bg-paper-100"></span>
            Frete grátis pra CNPJ no RJ
          </span>
          <span className="hidden md:flex items-center gap-2 shrink-0">
            <span className="w-1 h-1 rounded-full bg-paper-100"></span>
            Entrega em 24h
          </span>
          <span className="hidden md:flex items-center gap-2 shrink-0">
            <span className="w-1 h-1 rounded-full bg-paper-100"></span>
            Nota fiscal em todo pedido
          </span>
        </div>
        <span className="font-mono opacity-60 shrink-0 hidden sm:inline">
          cnpj 54.563.438/0001-07
        </span>
      </div>
    </div>
  );
}
