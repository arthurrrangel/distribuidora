"use client";

import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Package,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { SearchModal } from "@/components/SearchModal";
import { TopBar } from "@/components/TopBar";
import { Logo } from "@/components/Logo";

interface Collection {
  id: string;
  title: string;
  handle: string;
  parentName: string | null;
}

interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
  parentCollection: { value: string } | null;
}

interface ShopifyCollectionsResponse {
  data: {
    collections: { edges: Array<{ node: ShopifyCollectionNode }> };
  };
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    async function fetchCollections() {
      const query = `
        query getHeaderCollections {
          collections(first: 50, sortKey: TITLE) {
            edges {
              node {
                id title handle
                parentCollection: metafield(namespace: "custom", key: "parent_collection") { value }
              }
            }
          }
        }
      `;
      try {
        const response = await api.post<ShopifyCollectionsResponse>("", { query });
        const nodes = response.data.data.collections.edges.map((e) => e.node);
        setCollections(
          nodes.map((node) => ({
            id: node.id,
            title: node.title,
            handle: node.handle,
            parentName: node.parentCollection?.value ?? null,
          })),
        );
      } catch (error) {
        console.error("Erro ao carregar coleções:", error);
      }
    }
    fetchCollections();
  }, []);

  const parentCollections = collections.filter(
    (c) =>
      !c.parentName ||
      c.parentName.toLowerCase() === c.title.toLowerCase(),
  );

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    logout();
  };

  return (
    <div className="w-full">
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-paper-100/80 backdrop-blur-xl">
        <TopBar />

        {/* HEADER PRINCIPAL */}
        <div className="bg-paper-100 border-b hairline">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center gap-4 md:gap-10">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 -ml-1.5 hover:bg-ink-100 transition-colors rounded"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-ink" />
              ) : (
                <Menu className="w-6 h-6 text-ink" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" aria-label="Repon" className="shrink-0 flex items-center">
              <Logo
                variant="azul"
                shape="full"
                width={110}
                height={32}
                priority
                className="h-7 md:h-8 w-auto"
              />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-7 text-[13px] text-ink-700 ml-4">
              <Link href="/produtos" className="ul-anim hover:text-ink">
                Catálogo
              </Link>
              <Link href="/fabricantes" className="ul-anim hover:text-ink">
                Marcas
              </Link>
              <Link href="/parceiros" className="ul-anim hover:text-ink">
                Parceiros
              </Link>
              <Link href="/sobre" className="ul-anim hover:text-ink">
                Sobre
              </Link>
            </nav>

            {/* Search */}
            <div className="hidden md:block relative flex-1 max-w-xl mx-auto">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full h-11 pl-10 pr-12 bg-paper border hairline focus:border-ink-700 outline-none transition text-sm text-left text-ink-400 hover:border-ink-300"
              >
                Buscar produto, marca ou SKU
              </button>
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-ink-400 pointer-events-none" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 label text-ink-400 pointer-events-none">
                ⌘K
              </span>
            </div>

            {/* Mobile search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden ml-auto p-2 hover:bg-ink-100 transition-colors rounded"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5 text-ink" />
            </button>

            {/* Ações desktop */}
            <div className="hidden md:flex items-center gap-2 text-[13px] shrink-0">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="hover:text-ink text-ink-600 ul-anim px-1"
                  >
                    Entrar
                  </Link>
                  <span className="text-ink-300">·</span>
                  <Link
                    href="/register"
                    className="hover:text-ink text-ink-600 ul-anim px-1"
                  >
                    Cadastro
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-ink-100 transition-colors rounded"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-[13px]">
                      {user.firstName || "Conta"}
                    </span>
                  </button>
                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-64 bg-paper border hairline-strong shadow-xl z-50 overflow-hidden">
                        <div className="px-4 py-4 border-b hairline">
                          <p className="text-sm font-semibold text-ink">
                            {user.firstName || "Cliente"}
                          </p>
                          <p className="text-xs text-ink-500 truncate font-mono">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/minha-conta"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-ink-700 hover:bg-ink-100 transition-colors"
                        >
                          <User className="w-4 h-4 text-ink-400" />
                          Minha conta
                          <ChevronRight className="w-3 h-3 text-ink-300 ml-auto" />
                        </Link>
                        <Link
                          href="/meus-pedidos"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-ink-700 hover:bg-ink-100 transition-colors"
                        >
                          <Package className="w-4 h-4 text-ink-400" />
                          Meus pedidos
                          <ChevronRight className="w-3 h-3 text-ink-300 ml-auto" />
                        </Link>
                        <div className="h-px bg-ink-200" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-red-700 hover:bg-red-50 w-full transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              <Link
                href="/carrinho"
                aria-label="Carrinho"
                className="relative ml-2 p-2 hover:bg-ink-100 transition-colors rounded"
              >
                <ShoppingCart className="w-5 h-5 text-ink" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 font-mono text-[10px] font-bold text-paper bg-ink rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile cart */}
            <Link
              href="/carrinho"
              aria-label="Carrinho"
              className="md:hidden relative p-2 hover:bg-ink-100 transition-colors rounded"
            >
              <ShoppingCart className="w-5 h-5 text-ink" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 font-mono text-[10px] font-bold text-paper bg-ink rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* NAV DEPARTAMENTOS */}
        <nav className="bg-paper-100 border-b hairline hidden md:block">
          <div className="max-w-[1280px] mx-auto px-8 h-11 flex items-center gap-1 overflow-x-auto no-scrollbar text-[13px]">
            <Link
              href="/produtos"
              className="px-3 py-1.5 text-ink-700 hover:bg-ink hover:text-paper transition-colors shrink-0 font-medium"
            >
              Todos
            </Link>
            {parentCollections.slice(0, 8).map((dept) => (
              <Link
                key={dept.id}
                href={`/departamento/${dept.handle}`}
                className="px-3 py-1.5 text-ink-700 hover:bg-ink hover:text-paper transition-colors shrink-0"
              >
                {dept.title}
              </Link>
            ))}
            <span className="ml-auto label text-ink-400 shrink-0 hidden lg:inline">
              Fornecedor B2B no RJ
            </span>
          </div>
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-[96px] md:h-[136px]" />

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-ink/50 z-[100] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-paper z-[110] md:hidden shadow-2xl animate-slide-up flex flex-col">
            <div className="px-5 py-4 flex items-center justify-between border-b hairline">
              <Logo variant="azul" shape="full" width={96} height={28} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 hover:bg-ink-100 transition-colors rounded"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-4 border-b hairline">
              {user ? (
                <div>
                  <p className="text-sm font-semibold">{user.firstName || "Cliente"}</p>
                  <p className="text-xs text-ink-500 truncate font-mono">
                    {user.email}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 h-10 flex items-center justify-center bg-ink text-paper text-sm font-semibold"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 h-10 flex items-center justify-center border hairline-strong text-ink text-sm font-semibold"
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>

            {user && (
              <div className="border-b hairline">
                <Link
                  href="/minha-conta"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-ink-100 transition-colors"
                >
                  <User className="w-5 h-5 text-ink-400" />
                  <span className="text-sm flex-1">Minha conta</span>
                  <ChevronRight className="w-4 h-4 text-ink-300" />
                </Link>
                <Link
                  href="/meus-pedidos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-ink-100 transition-colors"
                >
                  <Package className="w-5 h-5 text-ink-400" />
                  <span className="text-sm flex-1">Meus pedidos</span>
                  <ChevronRight className="w-4 h-4 text-ink-300" />
                </Link>
              </div>
            )}

            <div className="overflow-y-auto flex-1 py-2">
              <p className="px-5 py-3 label text-ink-500">Departamentos</p>
              <Link
                href="/produtos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-3 hover:bg-ink-100 transition-colors"
              >
                <span className="text-sm font-semibold flex-1">Todos os produtos</span>
                <ChevronRight className="w-4 h-4 text-ink-300" />
              </Link>
              {parentCollections.map((dept) => (
                <Link
                  key={dept.id}
                  href={`/departamento/${dept.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-ink-100 transition-colors"
                >
                  <span className="text-sm flex-1">{dept.title}</span>
                  <ChevronRight className="w-4 h-4 text-ink-300" />
                </Link>
              ))}
            </div>

            {user && (
              <div className="border-t hairline">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-5 py-4 text-red-700 hover:bg-red-50 w-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Sair</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
