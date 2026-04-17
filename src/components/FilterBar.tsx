"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import api from "@/services/api";

// ---------------------------------------------------------------------------
// Predefined filter data
// ---------------------------------------------------------------------------

const GRAMATURAS = ["75", "85", "90", "120", "150", "180", "240", "300"];

const FORMATOS = [
  "A5",
  "A4",
  "A3",
  "A2",
  "A1",
  "Of\u00edcio",
  "Carta",
  "66x96",
];

const CORES = [
  "Branco",
  "Colorido",
  "Neon",
  "Natural",
  "Marfim",
  "Luminoso",
  "Kraft",
  "Ouro",
  "Amarelo",
  "Azul",
  "Laranja",
  "Preto",
  "Verde",
  "Vermelho",
  "Brilho",
  "Casca de ovo",
  "Goffrata",
  "Granitto",
  "Linho",
  "Opaline",
  "P\u00e9rsico",
  "Telado",
  "Verg\u00ea",
  "Perolado",
  "Prata",
  "Rosa",
  "Creme",
  "Salm\u00e3o",
  "Palha",
  "Cinza",
  "Met\u00e1lico",
  "Dourado",
  "P\u00e9rola",
  "Turquesa",
  "Offset",
  "Diplomata",
  "Filicoat",
  "Fosco",
  "Ant\u00edlope",
  "Champanhe",
  "Ecolight",
  "Sulfite",
  "Croquis",
  "Milimetrado",
  "Layout",
  "Reciclado",
  "Madre p\u00e9rola",
  "Gengibre",
  "Decorado",
  "Moldura",
];

const SORT_OPTIONS = [
  { value: "", label: "Relev\u00e2ncia" },
  { value: "price-asc", label: "Menor pre\u00e7o" },
  { value: "price-desc", label: "Maior pre\u00e7o" },
  { value: "created-desc", label: "Novidades" },
  { value: "title-asc", label: "Nome (A-Z)" },
  { value: "title-desc", label: "Nome (Z-A)" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeader({
  title,
  isOpen,
  onToggle,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-gray-800 hover:text-[#0464D5] transition-colors"
    >
      <span>{title}</span>
      {isOpen ? (
        <ChevronUp className="w-4 h-4 shrink-0 text-gray-400" />
      ) : (
        <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />
      )}
    </button>
  );
}

function RadioList({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5 pb-1">
      {options.map((opt) => {
        const isActive = selected === opt;
        return (
          <label
            key={opt}
            className={`flex items-center gap-2.5 cursor-pointer text-sm px-2 py-1.5 rounded-md transition-colors select-none ${
              isActive
                ? "bg-blue-50 text-[#0464D5] font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name={`filter-radio-${opt}`}
              checked={isActive}
              onChange={() => onChange(isActive ? "" : opt)}
              onClick={() => {
                if (isActive) onChange("");
              }}
              className="w-3.5 h-3.5 accent-[#0464D5] shrink-0 cursor-pointer"
            />
            <span className="truncate leading-tight">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FilterBar (Sidebar)
// ---------------------------------------------------------------------------

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // baseQ = the original user-typed search term.
  // If the "baseQ" param is explicitly in the URL, use it (even if empty).
  // Otherwise fall back to "q" (e.g. arriving from SearchModal at /busca?q=papel).
  const baseQ = searchParams.has("baseQ")
    ? (searchParams.get("baseQ") ?? "")
    : (searchParams.get("q") ?? "");
  const currentSort = searchParams.get("sort") ?? "";

  // Single-select per category
  const selectedGramatura = searchParams.get("g") ?? "";
  const selectedFormato = searchParams.get("f") ?? "";
  const selectedMarca = searchParams.get("m") ?? "";
  const selectedCor = searchParams.get("c") ?? "";

  const [brands, setBrands] = useState<string[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  // Mobile panel toggle
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gramatura: true,
    formato: true,
    marca: false,
    cor: false,
  });

  useEffect(() => {
    let cancelled = false;
    setLoadingBrands(true);

    async function fetchBrands() {
      try {
        const res = await api.post<{
          data: { products: { edges: { node: { vendor: string } }[] } };
        }>("", {
          query: `query { products(first: 250) { edges { node { vendor } } } }`,
        });
        if (cancelled) return;
        const vendors = [
          ...new Set(
            res.data.data.products.edges
              .map((e) => e.node.vendor)
              .filter(Boolean),
          ),
        ].sort() as string[];
        setBrands(vendors);
      } catch (e) {
        console.error("Erro ao carregar marcas", e);
      } finally {
        if (!cancelled) setLoadingBrands(false);
      }
    }

    fetchBrands();
    return () => {
      cancelled = true;
    };
  }, []);

  function applyFilters(updates: {
    g?: string;
    f?: string;
    m?: string;
    c?: string;
    sort?: string;
  }) {
    const newG = updates.g !== undefined ? updates.g : selectedGramatura;
    const newF = updates.f !== undefined ? updates.f : selectedFormato;
    const newM = updates.m !== undefined ? updates.m : selectedMarca;
    const newC = updates.c !== undefined ? updates.c : selectedCor;
    const newSort = updates.sort !== undefined ? updates.sort : currentSort;

    const hasKeywordFilters = !!(newG || newF || newM || newC);

    // Sort-only change on non-busca pages: stay on current page
    if (pathname !== "/busca" && !hasKeywordFilters) {
      const cur = new URLSearchParams(Array.from(searchParams.entries()));
      if (newSort) cur.set("sort", newSort);
      else cur.delete("sort");
      router.push(`${pathname}?${cur.toString()}`);
      return;
    }

    // Build effective search query by appending filter terms to base query
    const filterTerms = [newG ? `${newG}g` : "", newF, newM, newC].filter(
      Boolean,
    );

    const effectiveQ = [baseQ.trim(), ...filterTerms].filter(Boolean).join(" ");

    const params = new URLSearchParams();
    if (effectiveQ) params.set("q", effectiveQ);

    // Always persist baseQ (even empty) so future filter changes never mistake
    // a filter term for the original search query.
    const originalBase = searchParams.has("baseQ")
      ? (searchParams.get("baseQ") ?? "")
      : (searchParams.get("q") ?? "");
    params.set("baseQ", originalBase);

    if (newG) params.set("g", newG);
    if (newF) params.set("f", newF);
    if (newM) params.set("m", newM);
    if (newC) params.set("c", newC);
    if (newSort) params.set("sort", newSort);

    router.push(`/busca?${params.toString()}`);
  }

  function clearAllFilters() {
    const params = new URLSearchParams();
    if (baseQ) {
      params.set("q", baseQ);
      params.set("baseQ", baseQ);
    }
    if (currentSort) params.set("sort", currentSort);
    const qs = params.toString();
    router.push(`/busca${qs ? `?${qs}` : ""}`);
  }

  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const activeFilters = [
    selectedGramatura && {
      key: "g",
      label: `${selectedGramatura} g/m\u00b2`,
      clear: () => applyFilters({ g: "" }),
    },
    selectedFormato && {
      key: "f",
      label: selectedFormato,
      clear: () => applyFilters({ f: "" }),
    },
    selectedMarca && {
      key: "m",
      label: selectedMarca,
      clear: () => applyFilters({ m: "" }),
    },
    selectedCor && {
      key: "c",
      label: selectedCor,
      clear: () => applyFilters({ c: "" }),
    },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const hasActiveFilters = activeFilters.length > 0;

  const panelContent = (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-100">
        <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#0464D5]" />
          Filtros
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#0464D5] hover:underline font-medium"
          >
            Limpar tudo
          </button>
        )}
      </div>

      <div className="px-4 py-3 space-y-1">
        {/* Sort */}
        <div className="pb-3 border-b border-gray-100">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Ordenar por
          </label>
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => applyFilters({ sort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0464D5] focus:border-[#0464D5] bg-white text-gray-700 text-sm appearance-none cursor-pointer hover:border-gray-300 transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
          </div>
        </div>

        {/* Active chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1.5 pt-2 pb-1">
            {activeFilters.map((f) => (
              <span
                key={f.key}
                className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 bg-[#0464D5] text-white rounded-full text-xs font-medium shadow-sm"
              >
                {f.label}
                <button
                  onClick={f.clear}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  aria-label={`Remover filtro ${f.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Gramatura */}
        <div className="border-b border-gray-100">
          <SectionHeader
            title="Gramatura"
            isOpen={openSections.gramatura}
            onToggle={() => toggleSection("gramatura")}
          />
          {openSections.gramatura && (
            <RadioList
              options={GRAMATURAS}
              selected={selectedGramatura}
              onChange={(val) => applyFilters({ g: val })}
            />
          )}
        </div>

        {/* Formato */}
        <div className="border-b border-gray-100">
          <SectionHeader
            title="Formato"
            isOpen={openSections.formato}
            onToggle={() => toggleSection("formato")}
          />
          {openSections.formato && (
            <RadioList
              options={FORMATOS}
              selected={selectedFormato}
              onChange={(val) => applyFilters({ f: val })}
            />
          )}
        </div>

        {/* Marca */}
        <div className="border-b border-gray-100">
          <SectionHeader
            title="Marca"
            isOpen={openSections.marca}
            onToggle={() => toggleSection("marca")}
          />
          {openSections.marca &&
            (loadingBrands ? (
              <p className="text-xs text-gray-400 px-2 py-2">Carregando...</p>
            ) : brands.length === 0 ? (
              <p className="text-xs text-gray-400 px-2 py-2">
                Nenhuma marca encontrada
              </p>
            ) : (
              <RadioList
                options={brands}
                selected={selectedMarca}
                onChange={(val) => applyFilters({ m: val })}
              />
            ))}
        </div>

        {/* Cor / Linha */}
        <div>
          <SectionHeader
            title="Cor / Linha"
            isOpen={openSections.cor}
            onToggle={() => toggleSection("cor")}
          />
          {openSections.cor && (
            <RadioList
              options={CORES}
              selected={selectedCor}
              onChange={(val) => applyFilters({ c: val })}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full md:w-56 lg:w-60 shrink-0">
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className={`md:hidden w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold mb-2 transition-colors ${
          mobileOpen || hasActiveFilters
            ? "bg-[#0464D5] text-white"
            : "bg-white text-gray-700 border border-gray-200 shadow-sm"
        }`}
      >
        <span className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <span
              className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${mobileOpen ? "bg-white text-[#0464D5]" : "bg-[#0464D5] text-white"}`}
            >
              {activeFilters.length}
            </span>
          )}
        </span>
        {mobileOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Desktop: always visible. Mobile: only when open */}
      <div className={`${mobileOpen ? "block" : "hidden"} md:block`}>
        {panelContent}
      </div>
    </div>
  );
}
