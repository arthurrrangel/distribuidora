"use client";

import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  ChevronRight,
  LogOut,
  Package,
  X,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { SearchModal } from "@/components/SearchModal";
import { TopBar } from "@/components/TopBar";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Collection {
  id: string;
  title: string;
  handle: string;
  imageUrl: string | null;
  parentName: string | null;
}

interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
  image: { url: string } | null;
  parentCollection: { value: string } | null;
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: Array<{ node: ShopifyCollectionNode }>;
    };
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredParent, setHoveredParent] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  // Fecha o menu mobile ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Impede scroll quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Carrega coleções do Shopify
  useEffect(() => {
    async function fetchCollections() {
      const query = `
        query getHeaderCollections {
          collections(first: 100, sortKey: TITLE) {
            edges {
              node {
                id title handle
                image { url }
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
            imageUrl: node.image?.url ?? null,
            parentName: node.parentCollection?.value ?? null,
          })),
        );
      } catch (error) {
        console.error("Erro ao carregar coleções:", error);
      }
    }
    fetchCollections();
  }, []);

  const childrenOf = (parentTitle: string) =>
    collections.filter(
      (c) =>
        c.parentName?.toLowerCase() === parentTitle.toLowerCase() &&
        c.title.toLowerCase() !== parentTitle.toLowerCase(),
    );

  const parentCollections = collections
    .filter(
      (c) => !c.parentName || c.parentName.toLowerCase() === c.title.toLowerCase(),
    )
    .sort((a, b) => {
      const aKids = childrenOf(a.title).length > 0 ? 0 : 1;
      const bKids = childrenOf(b.title).length > 0 ? 0 : 1;
      return aKids - bKids;
    });

  const handleLogout = () => { setIsUserMenuOpen(false); setIsMobileMenuOpen(false); logout(); };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="w-full">
      {/* ── Fixed header wrapper ──────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <TopBar />


        {/* ── Header principal: fundo azul Repon ─────────────────────── */}
        <div className="bg-[#0464D5]">

          {/* Mobile: logo row */}
          <div className="md:hidden flex items-center justify-between px-4 h-[48px]">
            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen
                ? <X className="w-6 h-6 text-white" />
                : <Menu className="w-6 h-6 text-white" />}
            </button>

            {/* Logo branca */}
            <Link href="/" className="flex items-center">
              <Image
                src="/repon-logo-branca.svg"
                alt="Repon"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Carrinho */}
            <Link
              href="/carrinho"
              aria-label="Carrinho de compras"
              className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-white text-[#0464D5] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: barra de busca */}
          <div className="md:hidden px-4 pb-3">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                readOnly
                placeholder="O que procura?"
                className="w-full py-2.5 pl-9 pr-4 rounded-lg bg-white text-gray-700 placeholder:text-gray-400 focus:outline-none text-sm cursor-pointer shadow-sm"
              />
            </div>
          </div>

          {/* Desktop: logo | search | atendimento | icons */}
          <div className="hidden md:flex items-center px-4 h-[68px] gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 ml-4">
              <Image
                src="/repon-logo-branca.svg"
                alt="Repon"
                width={220}
                height={64}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Atendimento */}
            <div className="hidden lg:flex items-center gap-2 text-white/80 shrink-0 ml-2">
              <Headphones className="w-5 h-5 text-white/70" />
              <div className="leading-tight">
                <p className="text-[10px] text-white/60 uppercase tracking-wide font-medium">Atendimento</p>
                <p className="text-xs font-bold text-white">do Cliente</p>
              </div>
            </div>

            {/* Search bar central — grande e destacada */}
            <div
              className="flex-1 mx-4 cursor-pointer relative"
              onClick={() => setIsSearchOpen(true)}
            >
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
                <input
                  type="text"
                  readOnly
                  placeholder="O que procura?"
                  className="flex-1 py-3 pl-4 pr-2 text-gray-700 placeholder:text-gray-400 focus:outline-none text-sm cursor-pointer bg-transparent"
                />
                <button
                  className="bg-[#0464D5] hover:bg-black/80 transition-colors px-5 py-3 flex items-center justify-center rounded-r-lg"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-1 shrink-0 mr-4">

              {/* Meus Pedidos */}
              <Link
                href="/meus-pedidos"
                aria-label="Meus Pedidos"
                title="Meus Pedidos"
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <Package className="w-5 h-5 text-white" />
                <span className="text-[10px] text-white/70 group-hover:text-white font-medium leading-none">Pedidos</span>
              </Link>

              {/* Conta */}
              <div className="relative">
                {!user ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/register"
                      className="flex flex-col items-center justify-center bg-[#F5A623] hover:bg-[#e09610] text-gray-900 font-bold px-4 py-1.5 rounded-lg transition-colors text-xs leading-tight"
                    >
                      <span>Cadastre-se</span>
                      <span className="font-normal text-[10px] opacity-80">Ou faça Login</span>
                    </Link>
                  </div>
                ) : (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="Minha conta"
                  className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-[10px] text-white/70 group-hover:text-white font-medium leading-none">
                    {user.firstName || "Conta"}
                  </span>
                </button>
                )}

                {user && isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                      <div className="bg-[#0464D5] px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-full">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white">{user.firstName || "Cliente"}</p>
                            <p className="text-xs text-blue-300 truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link href="/minha-conta" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#0464D5] transition-colors text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          Minha Conta
                          <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                        </Link>
                        <Link href="/meus-pedidos" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#0464D5] transition-colors text-sm">
                          <Package className="w-4 h-4 text-gray-400" />
                          Meus Pedidos
                          <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                        </Link>
                        <div className="h-px bg-gray-100 mx-4" />
                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full transition-colors text-sm">
                          <LogOut className="w-4 h-4" />
                          Sair da conta
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Carrinho */}
              <Link
                href="/carrinho"
                aria-label="Carrinho de compras"
                title={cartCount > 0 ? `Carrinho (${cartCount} ${cartCount === 1 ? "item" : "itens"})` : "Carrinho vazio"}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg hover:bg-white/10 transition-colors group relative"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-white text-[#0464D5] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-white/70 group-hover:text-white font-medium leading-none">Carrinho</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Nav Desktop: departamentos ─────────────────────────────── */}
        <nav className="bg-[#0464D5] hidden md:block">
          <div className="container mx-auto flex items-center relative h-[40px]">

            {/* Todos os Departamentos */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => {
                setIsMenuOpen(true);
                const first = parentCollections.find((p) => childrenOf(p.title).length > 0);
                setHoveredParent(first?.title ?? null);
              }}
              onMouseLeave={() => { setIsMenuOpen(false); setHoveredParent(null); }}
            >
              <button
                className="flex items-center gap-2 font-semibold px-4 py-2 h-full text-white hover:bg-white/10 transition-colors whitespace-nowrap border-r border-white/10 pr-6 mr-2"
              >
                <Menu className="w-4 h-4" />
                Todos os Departamentos
                <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Menu */}
              {isMenuOpen && (
                <div className="absolute top-full left-0 flex shadow-2xl border border-gray-100 rounded-b-xl z-50 bg-white min-h-[420px]">
                  {/* Painel esquerdo: categorias pai */}
                  <div className="w-64 border-r border-gray-100 py-2 overflow-y-auto max-h-[520px]">
                    {parentCollections.length === 0 && (
                      <p className="px-4 py-3 text-sm text-gray-400">Carregando...</p>
                    )}
                    {parentCollections.map((parent) => (
                      <div
                        key={parent.id}
                        onMouseEnter={() =>
                          setHoveredParent(childrenOf(parent.title).length > 0 ? parent.title : null)
                        }
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors group cursor-pointer ${
                          hoveredParent === parent.title
                            ? "bg-blue-50 text-[#0464D5]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#0464D5]"
                        }`}
                      >
                        {parent.imageUrl ? (
                          <Image src={parent.imageUrl} alt={parent.title} width={32} height={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-100" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-[#0464D5]" />
                          </div>
                        )}
                        <span className="text-sm font-medium flex-1">{parent.title}</span>
                        <Link
                          href={`/departamento/${parent.handle}`}
                          onClick={() => { setIsMenuOpen(false); setHoveredParent(null); }}
                          className="p-1 rounded hover:bg-blue-100 transition-colors shrink-0"
                          title={`Ir para ${parent.title}`}
                        >
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0464D5]" />
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Painel direito: filhos */}
                  {hoveredParent && (
                    <div className="w-[560px] p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800 text-base">{hoveredParent}</h3>
                        <Link
                          href={`/departamento/${parentCollections.find((p) => p.title === hoveredParent)?.handle ?? ""}`}
                          onClick={() => { setIsMenuOpen(false); setHoveredParent(null); }}
                          className="text-sm font-semibold text-[#0464D5] hover:underline"
                        >
                          Ver Departamento &rsaquo;
                        </Link>
                      </div>
                      {childrenOf(hoveredParent).length === 0 ? (
                        <p className="text-sm text-gray-400 mt-8 text-center">Nenhuma subcategoria encontrada.</p>
                      ) : (
                        <div className="grid grid-cols-4 gap-4">
                          {childrenOf(hoveredParent).map((child) => (
                            <Link
                              key={child.id}
                              href={`/departamento/${child.handle}`}
                              onClick={() => { setIsMenuOpen(false); setHoveredParent(null); }}
                              className="flex flex-col items-center gap-2 group text-center"
                            >
                              <div className="w-16 h-16 rounded-full bg-[#0464D5] flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-transparent group-hover:border-[#0464D5] transition-all">
                                {child.imageUrl ? (
                                  <Image src={child.imageUrl} alt={child.title} width={64} height={64} className="w-full h-full object-cover" />
                                ) : (
                                  <Package className="w-7 h-7 text-white" />
                                )}
                              </div>
                              <span className="text-xs text-gray-600 group-hover:text-[#0464D5] transition-colors leading-tight">
                                {child.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Links rápidos — categorias pai */}
            <div className="flex-1 flex items-center overflow-x-auto no-scrollbar min-w-0">
              {parentCollections.map((item) => (
                <Link
                  key={item.id}
                  href={`/departamento/${item.handle}`}
                  className="px-3 py-2 text-white/70 hover:text-white text-sm font-medium whitespace-nowrap transition-colors h-full flex items-center shrink-0 hover:bg-white/10"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Espaço para compensar header fixo (TopBar 28px + header 68px + nav 40px = 136px desktop / mobile sem TopBar) */}
      <div className="h-[104px] md:h-[140px]" />

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[100] md:hidden" onClick={closeMobileMenu} />
          <div className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-[#0464D5] z-[110] md:hidden shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
            {/* Header do Drawer */}
            <div className="px-4 py-4 flex items-center justify-between border-b border-white/20 bg-[#0464D5]">
              <Image src="/repon-logo-branca.svg" alt="Repon" width={140} height={40} className="h-10 w-auto" />
              <button onClick={closeMobileMenu} className="p-2 hover:bg-white/10 rounded-md transition-colors text-white" aria-label="Fechar menu">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User info */}
            <div className="px-4 py-3 border-b border-white/10">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Olá, {user.firstName || "Cliente"}</p>
                    <p className="text-xs text-blue-200 truncate max-w-[200px]">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" onClick={closeMobileMenu} className="flex-1 text-center text-sm font-semibold py-2 bg-[#0464D5] text-white rounded-lg">
                    Entrar
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu} className="flex-1 text-center text-sm font-semibold py-2 bg-white/10 text-white rounded-lg border border-white/20">
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>

            {/* Links da conta */}
            {user && (
              <div className="border-b border-white/10 py-1">
                <Link href="/minha-conta" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors">
                  <User className="w-5 h-5 text-blue-200" />
                  <span className="font-medium text-sm flex-1">Minha Conta</span>
                  <ChevronRight className="w-4 h-4 text-blue-200" />
                </Link>
                <Link href="/meus-pedidos" onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors">
                  <Package className="w-5 h-5 text-blue-200" />
                  <span className="font-medium text-sm flex-1">Meus Pedidos</span>
                  <ChevronRight className="w-4 h-4 text-blue-200" />
                </Link>
              </div>
            )}

            {/* Departamentos */}
            <div className="overflow-y-auto flex-1 py-2">
              <p className="px-4 py-2 text-xs font-bold text-blue-300 uppercase tracking-wider">Departamentos</p>
              {parentCollections.map((dept) => (
                <Link key={dept.id} href={`/departamento/${dept.handle}`} onClick={closeMobileMenu} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors">
                  {dept.imageUrl ? (
                    <Image src={dept.imageUrl} alt={dept.title} width={24} height={24} className="w-6 h-6 rounded-full object-cover shrink-0" />
                  ) : (
                    <Package className="w-5 h-5 text-blue-200 shrink-0" />
                  )}
                  <span className="font-medium text-sm flex-1">{dept.title}</span>
                  <ChevronRight className="w-4 h-4 text-blue-200" />
                </Link>
              ))}
              {parentCollections.length === 0 && (
                <p className="px-4 py-3 text-sm text-blue-200">Carregando departamentos...</p>
              )}
            </div>

            {/* Logout */}
            {user && (
              <div className="border-t border-white/20">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-4 text-red-300 hover:bg-white/10 w-full transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium text-sm">Sair da conta</span>
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
