import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface DepartmentCoverProps {
  title: string;
  imageUrl?: string | null;
  description?: string | null;
  parentTitle?: string | null;
  parentHandle?: string | null;
}

export function DepartmentCover({
  title,
  imageUrl,
  description,
}: DepartmentCoverProps) {
  if (!imageUrl) return null;

  return (
    <div className="mx-4 md:mx-8 my-1 md:my-1">
      <div className="px-6 py-2 md:px-10 md:py-8 flex items-center justify-between gap-6 min-h-[140px] md:min-h-[180px]">
        {/* Esquerda: breadcrumb + nome */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-gray-400 text-sm md:text-base flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1 text-white hover:text-white/80 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </Link>

            <ChevronRight className="w-4 h-4 opacity-40" />

            <div className="inline-flex w-fit">
              <span className="text-[#0464D5] text-lg md:text-1xl tracking-tight font-bold rounded-2xl px-5 py-2 bg-white shadow-[0_4px_18px_-2px_rgba(37,99,235,0.25)]">
                {title}
              </span>
            </div>
          </nav>

          {description && (
            <p className="text-gray-400 text-xs md:text-sm max-w-xs line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Direita: imagem */}
        <div className="flex-shrink-0 w-28 h-28 md:w-44 md:h-44 relative rounded-2xl overflow-hidden border-4 border-[#0464D5] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15)] bg-gray-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 112px, 176px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
