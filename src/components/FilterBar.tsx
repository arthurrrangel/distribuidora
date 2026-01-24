"use client";

import { useState, useEffect } from "react";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import { Filter, Plus, X, Search, Tag as TagIcon } from "lucide-react";
import api from "@/services/api";

// --- Tipagem ---
interface CollectionNode {
  id: string;
  title: string;
  handle: string;
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: Array<{
        node: CollectionNode;
      }>;
    };
  };
}

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  // --- 1. Dados Derivados da URL (Zero useEffect necessário para ler isso) ---
  // Se mudar a URL, essas variáveis mudam automaticamente na renderização
  const currentDepartment = (params.slug as string) || "";
  const currentSort = searchParams.get("sort") || "";

  // Para inputs de texto, pegamos o valor inicial da URL, mas deixamos o usuário editar
  const initialType = searchParams.get("type") || "";
  const activeTags = searchParams.get("tag")
    ? searchParams.get("tag")!.split(",").filter(Boolean)
    : [];

  // --- 2. Estados Locais (Apenas para interação visual e inputs de texto) ---
  const [collections, setCollections] = useState<CollectionNode[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Inputs de texto precisam de estado para o usuário poder digitar
  const [productType, setProductType] = useState(initialType);
  const [newTag, setNewTag] = useState("");

  // --- 3. Efeitos (Apenas Data Fetching) ---
  useEffect(() => {
    async function fetchCollections() {
      try {
        const query = `
          query GetCollectionsOptions {
            collections(first: 50, sortKey: TITLE) {
              edges {
                node { id title handle }
              }
            }
          }
        `;
        const res = await api.post<ShopifyCollectionsResponse>("", { query });
        const cols = res.data.data.collections.edges.map((e) => e.node);
        setCollections(cols);
      } catch (e) {
        console.error("Erro ao carregar coleções", e);
      }
    }
    fetchCollections();
  }, []);

  // --- 4. Funções de Atualização da URL ---

  const updateUrl = (updates: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(updates).forEach(([key, value]) => {
      if (value) current.set(key, value);
      else current.delete(key);
    });

    router.push(`${pathname}?${current.toString()}`);
  };

  const handleDepartmentChange = (handle: string) => {
    if (handle) router.push(`/departamento/${handle}`);
    else router.push("/busca");
  };

  // Tags: Adiciona diretamente à URL (o array local activeTags atualizará sozinho)
  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !activeTags.includes(trimmed)) {
      const newTags = [...activeTags, trimmed];
      updateUrl({ tag: newTags.join(",") });
      setNewTag(""); // Limpa input
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = activeTags.filter((t) => t !== tagToRemove);
    updateUrl({ tag: newTags.length > 0 ? newTags.join(",") : null });
  };

  const clearFilter = (key: string) => {
    if (key === "department") router.push("/busca");
    else if (key === "type") {
      setProductType(""); // Limpa visualmente o input
      updateUrl({ type: null });
    } else updateUrl({ [key]: null });
  };

  // Lista para renderizar os chips de filtros ativos
  const activeFiltersList = [
    currentDepartment && {
      label: "Departamento",
      value:
        collections.find((c) => c.handle === currentDepartment)?.title ||
        currentDepartment,
      key: "department",
    },
    currentSort && {
      label: "Ordenar por",
      value: getSortLabel(currentSort),
      key: "sort",
    },
    initialType && {
      label: "Tipo",
      value: initialType,
      key: "type",
    },
  ].filter(Boolean) as { label: string; value: string; key: string }[];

  function getSortLabel(val: string) {
    const map: Record<string, string> = {
      "price-asc": "Menor preço",
      "price-desc": "Maior preço",
      "created-desc": "Novidades",
      "title-asc": "Nome (A-Z)",
      "title-desc": "Nome (Z-A)",
    };
    return map[val] || val;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mb-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {/* Barra superior de filtros (Igual ao seu exemplo) */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Select Departamento */}
          <select
            value={currentDepartment}
            onChange={(e) => handleDepartmentChange(e.target.value)}
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Todos os Departamentos</option>
            {collections.map((c) => (
              <option key={c.id} value={c.handle}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Select Ordenação */}
          <select
            value={currentSort}
            onChange={(e) => updateUrl({ sort: e.target.value })}
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Ordenar por</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="created-desc">Novidades</option>
            <option value="title-asc">Nome (A-Z)</option>
            <option value="title-desc">Nome (Z-A)</option>
          </select>

          {/* Botão Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 px-4 rounded-lg transition-colors flex items-center gap-2 ${
              showFilters
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Filter size={20} />
            <span className="md:hidden font-medium">Refinar</span>
          </button>
        </div>

        {/* Filtros expandidos */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 animate-in slide-in-from-top-2">
            {/* Input Tipo de Produto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Produto
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  key={initialType} // TRUQUE: Reseta o input se a URL mudar externamente
                  type="text"
                  defaultValue={productType}
                  placeholder="Ex: Caderno, Smartphone..."
                  onBlur={(e) => updateUrl({ type: e.target.value })}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    updateUrl({ type: e.currentTarget.value })
                  }
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Input Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags / Marcadores
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    placeholder="Adicionar tag (ex: Oferta)"
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Adicionar
                </button>
              </div>

              {/* Lista de Tags ATIVAS (Vindo da URL) */}
              {activeTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {activeTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chips de Filtros Aplicados (Resumo) */}
        {(activeFiltersList.length > 0 || activeTags.length > 0) &&
          !showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {activeFiltersList.map((filter) => (
                  <span
                    key={filter.key}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    <span className="font-semibold">{filter.label}:</span>{" "}
                    {filter.value}
                    <button
                      onClick={() => clearFilter(filter.key)}
                      className="hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {activeTags.length > 0 && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    <span className="font-semibold">Tags:</span>{" "}
                    {activeTags.length} ativos
                    <button
                      onClick={() => updateUrl({ tag: null })}
                      className="hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
