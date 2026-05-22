// src/components/DepartmentCover.tsx
// Cover de departamento Repon v2 — minimal, editorial, sem bug de imagem.

import Link from "next/link";
import Image from "next/image";

interface DepartmentCoverProps {
  title: string;
  imageUrl?: string | null;
  description?: string | null;
  parentTitle?: string | null;
  parentHandle?: string | null;
  productsCount?: number;
}

export function DepartmentCover({
  title,
  imageUrl,
  description,
  parentTitle,
  parentHandle,
  productsCount,
}: DepartmentCoverProps) {
  return (
    <div className="bg-paper border-b hairline">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-12 md:pb-16">
        <nav className="font-mono text-xs text-ink-500 flex items-center gap-2 mb-8 md:mb-12 flex-wrap">
          <Link href="/" className="hover:text-ink">início</Link>
          <span className="text-ink-300">/</span>
          {parentTitle && parentHandle && (
            <>
              <Link
                href={`/departamento/${parentHandle}`}
                className="hover:text-ink"
              >
                {parentTitle.toLowerCase()}
              </Link>
              <span className="text-ink-300">/</span>
            </>
          )}
          <span className="text-ink">{title.toLowerCase()}</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="label text-ink-500">Departamento</p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tightest mt-4">
              {title}
              <span className="text-ink-300">.</span>
            </h1>
            {description && (
              <p className="text-ink-600 mt-5 max-w-xl text-base md:text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <div className="md:col-span-4 md:text-right flex md:block items-center gap-4">
            {imageUrl ? (
              <div className="md:ml-auto w-24 h-24 md:w-40 md:h-40 prod-a relative overflow-hidden shrink-0">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 160px"
                  priority
                />
              </div>
            ) : null}
            {typeof productsCount === "number" && productsCount > 0 && (
              <div className="md:mt-6">
                <p className="font-display text-4xl md:text-6xl font-extrabold tabular tracking-tightest leading-none">
                  {productsCount}
                </p>
                <p className="font-mono text-xs text-ink-500 mt-2">
                  PRODUTOS EM ESTOQUE
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
