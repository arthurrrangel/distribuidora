// src/components/Breadcrumb.tsx
// Trilha de navegação acessível + emite BreadcrumbList JSON-LD automaticamente.

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  StructuredData,
  buildBreadcrumbSchema,
  BreadcrumbItem,
} from "./StructuredData";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  if (!items.length) return null;

  return (
    <>
      <StructuredData data={buildBreadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className={`bg-gray-50 py-3 border-b border-gray-100 ${className}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <ol className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;
              return (
                <li key={item.url} className="flex items-center gap-2">
                  {idx > 0 && (
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  )}
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="text-gray-800 font-medium truncate max-w-[260px]"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.url}
                      className="hover:text-[#0464D5] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
