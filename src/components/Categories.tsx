// src/components/Categories.tsx
// Catálogo editorial assimétrico Repon v2.

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/services/api";

interface Collection {
  id: string;
  title: string;
  handle: string;
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: Array<{
        node: { id: string; title: string; handle: string };
      }>;
    };
  };
}

const TONES = ["prod-a", "prod-b", "prod-c", "prod-d", "prod-e", "prod-f"];

export function Categories() {
  const [departments, setDepartments] = useState<Collection[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      const query = `
        query getRootDepartments {
          collections(first: 12, sortKey: TITLE) {
            edges {
              node { id title handle }
            }
          }
        }
      `;
      try {
        const response = await api.post<ShopifyCollectionsResponse>("", { query });
        setDepartments(
          response.data.data.collections.edges
            .map((e) => e.node)
            .slice(0, 5),
        );
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    fetchDepartments();
  }, []);

  const fallback: Collection[] = [
    { id: "f1", title: "Papelaria", handle: "papelaria" },
    { id: "f2", title: "Escritório", handle: "escritorio" },
    { id: "f3", title: "Escolar", handle: "escolar" },
    { id: "f4", title: "Canetas", handle: "canetas" },
    { id: "f5", title: "Cadernos", handle: "cadernos" },
  ];

  const items = departments.length > 0 ? departments : fallback;
  const [first, ...rest] = items;

  return (
    <section className="bg-paper">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-14">
          <div className="md:col-span-5">
            <p className="label text-ink-500">§ 01 · Catálogo</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mt-5">
              O que você está montando hoje?
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 flex items-end">
            <p className="text-ink-600 text-base leading-relaxed">
              Departamentos curados pra pequeno e médio varejo.
              Sem precisar adivinhar onde está o que.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 auto-rows-[140px] md:auto-rows-[180px]">
          {first && (
            <Link
              href={`/departamento/${first.handle}`}
              className="col-span-12 md:col-span-6 row-span-2 prod-a group relative overflow-hidden block"
            >
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <span className="label text-ink-600">01</span>
                <div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-none">
                    {first.title}
                  </h3>
                  <p className="text-sm text-ink-600 mt-3 max-w-xs">
                    Cadernos, blocos, papéis e materiais base.
                  </p>
                  <p className="font-mono text-xs mt-5 flex items-center gap-2 group-hover:gap-3 transition-all">
                    EXPLORAR <span>→</span>
                  </p>
                </div>
              </div>
            </Link>
          )}

          {rest.slice(0, 4).map((dept, i) => (
            <Link
              key={dept.id}
              href={`/departamento/${dept.handle}`}
              className={`col-span-6 md:col-span-3 row-span-1 ${TONES[(i + 1) % TONES.length]} group relative overflow-hidden`}
            >
              <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
                <span className="label text-ink-600">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tighter">
                  {dept.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
