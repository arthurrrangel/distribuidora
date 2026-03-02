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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { SearchModal } from "@/components/SearchModal";

// --- TIPAGEM ESTRITA ---
interface Collection {
  id: string;
  title: string;
  handle: string;
  imageUrl: string | null;
  parentName: string | null; // null = é pai
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
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Impede scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    async function fetchCollections() {
      const query = `
        query getHeaderCollections {
          collections(first: 100, sortKey: TITLE) {
            edges {
              node {
                id
                title
                handle
                image { url }
                parentCollection: metafield(namespace: "custom", key: "parent_collection") {
                  value
                }
              }
            }
          }
        }
      `;
      try {
        const response = await api.post<ShopifyCollectionsResponse>("", {
          query,
        });
        const nodes = response.data.data.collections.edges.map((e) => e.node);
        const loaded: Collection[] = nodes.map((node) => ({
          id: node.id,
          title: node.title,
          handle: node.handle,
          imageUrl: node.image?.url ?? null,
          parentName: node.parentCollection?.value ?? null,
        }));
        setCollections(loaded);
        console.log(loaded);
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
      (c) =>
        !c.parentName || c.parentName.toLowerCase() === c.title.toLowerCase(),
    )
    .sort((a, b) => {
      const aHasChildren = childrenOf(a.title).length > 0 ? 0 : 1;
      const bHasChildren = childrenOf(b.title).length > 0 ? 0 : 1;
      return aHasChildren - bHasChildren;
    });

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    logout();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full">
      {/* Header fixo azul em todas as telas */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#2563EB] text-white">
        {/* Linha da logo — apenas mobile, ocupa a linha inteira */}
        <div className="md:hidden flex justify-center items-center h-[46px] border-b border-white/10">
          <Link href="/" className="flex items-center">
            <Image
              src="/repon-logo-branca.svg"
              alt="Logo AREL Distribuidora"
              width={100}
              height={30}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Linha principal: hamburger (mobile) + logo (desktop) + busca (desktop) + ícones */}
        <div className="flex items-center px-4 h-[48px] md:h-[72px] gap-2 md:gap-0">
          {/* Hamburger - apenas mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-white/10 transition-colors shrink-0"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            title={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo - apenas desktop */}
          <Link href="/" className="hidden md:flex items-center gap-2  ml-16">
            <Image
              src="/repon-logo-branca.svg"
              alt="Logo AREL Distribuidora"
              width={100}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Busca - apenas desktop */}
          <div className="hidden md:flex flex-1 justify-center mx-6">
            <div
              className="relative w-full max-w-2xl cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                readOnly
                placeholder="Pesquisar produtos..."
                className="w-full py-2.5 pl-10 pr-4 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none border-none shadow-sm text-sm cursor-pointer"
              />
            </div>
          </div>

          {/* Espaço para empurrar ícones para direita no mobile */}
          <div className="flex-1 md:hidden" />

          {/* Ícones de ação */}
          <div className="flex items-center gap-3 md:gap-5 md:mr-12">
            <Link
              href="/meus-pedidos"
              title="Meus Pedidos"
              aria-label="Meus Pedidos"
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Package className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                title={
                  user
                    ? `Minha conta (${user.firstName || user.email})`
                    : "Entrar / Cadastrar"
                }
                aria-label={user ? "Minha conta" : "Entrar ou Cadastrar"}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    {user ? (
                      <>
                        {/* Info do usuário */}
                        <div className="bg-[#2563EB] px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white">
                                {user.firstName || "Cliente"}
                              </p>
                              <p className="text-xs text-blue-200 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Links */}
                        <div className="py-1">
                          <Link
                            href="/minha-conta"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors text-sm"
                          >
                            <User className="w-4 h-4 text-gray-400" />
                            Minha Conta
                            <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                          </Link>
                          <Link
                            href="/meus-pedidos"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors text-sm"
                          >
                            <Package className="w-4 h-4 text-gray-400" />
                            Meus Pedidos
                            <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                          </Link>
                          <div className="h-px bg-gray-100 mx-4" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full transition-colors text-sm"
                          >
                            <LogOut className="w-4 h-4" />
                            Sair da conta
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-2">
                        <div className="px-4 py-3 text-center">
                          <p className="text-sm text-gray-600 mb-3">
                            Faça login para continuar
                          </p>
                          <Link
                            href="/login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block w-full bg-[#2563EB] text-white text-sm font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors mb-2"
                          >
                            Entrar
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block w-full border border-[#2563EB] text-[#2563EB] text-sm font-semibold py-2 rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Cadastrar
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <Link
              href="/carrinho"
              title={
                cartCount > 0
                  ? `Carrinho (${cartCount} ${cartCount === 1 ? "item" : "itens"})`
                  : "Carrinho vazio"
              }
              aria-label="Carrinho de compras"
              className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Barra de busca - apenas mobile */}
        <div className="md:hidden px-4 pb-2.5">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              readOnly
              placeholder="Pesquisar produtos..."
              className="w-full py-2 pl-9 pr-4 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none border-none shadow-sm text-sm cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* Espaço para compensar header fixo: mobile = 46px logo + 48px ações + ~44px busca ≈ 138px; desktop = 72px */}
      <div className="h-[138px] md:h-[72px]"></div>
      {/* Modal de busca */}
      {/* Menu Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-[#2563EB] z-[110] md:hidden shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
            {/* Header do Drawer */}
            <div className="px-4 py-4 flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-3">
                {user ? (
                  <>
                    <div className="bg-white/20 p-2 rounded-full">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Olá, {user.firstName || "Cliente"}
                      </p>
                      <p className="text-xs text-blue-200 truncate max-w-[160px]">
                        {user.email}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white/20 p-2 rounded-full">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Bem-vindo!
                      </p>
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="text-xs text-blue-200 hover:text-white"
                      >
                        Faça login ou cadastre-se
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-white/10 rounded-md transition-colors text-white"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Drawer */}
            <div className="overflow-y-auto flex-1">
              {/* Links da Conta (se logado) */}
              {user && (
                <div className="border-b border-white/20 py-1">
                  <Link
                    href="/minha-conta"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                  >
                    <User className="w-5 h-5 text-blue-200" />
                    <span className="font-medium text-sm flex-1">
                      Minha Conta
                    </span>
                    <ChevronRight className="w-4 h-4 text-blue-200" />
                  </Link>
                  <Link
                    href="/meus-pedidos"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                  >
                    <Package className="w-5 h-5 text-blue-200" />
                    <span className="font-medium text-sm flex-1">
                      Meus Pedidos
                    </span>
                    <ChevronRight className="w-4 h-4 text-blue-200" />
                  </Link>
                </div>
              )}

              {/* Departamentos */}
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-blue-200 uppercase tracking-wider">
                  Departamentos
                </p>
                {parentCollections.map((dept) => (
                  <Link
                    key={dept.id}
                    href={`/departamento/${dept.handle}`}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                  >
                    {dept.imageUrl ? (
                      <Image
                        src={dept.imageUrl}
                        alt={dept.title}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <Package className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    )}
                    <span className="font-medium text-sm flex-1">
                      {dept.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-blue-200" />
                  </Link>
                ))}
                {parentCollections.length === 0 && (
                  <div className="px-4 py-3 text-sm text-blue-200">
                    Carregando departamentos...
                  </div>
                )}
              </div>

              {/* Logout (se logado) */}
              {user && (
                <div className="border-t border-white/20 mt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-white/10 w-full transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Sair da conta</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Nav Desktop */}
      <nav className="bg-white border-b border-gray-100 shadow-sm hidden md:block sticky top-0 z-40">
        <div className="container mx-auto flex items-center relative h-[40px]">
          {/* Botão Todos os Departamentos + Mega Menu */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => {
              setIsMenuOpen(true);
              const firstWithChildren = parentCollections.find(
                (p) => childrenOf(p.title).length > 0,
              );
              setHoveredParent(firstWithChildren?.title ?? null);
            }}
            onMouseLeave={() => {
              setIsMenuOpen(false);
              setHoveredParent(null);
            }}
          >
            <button
              className={`flex items-center gap-2 font-semibold px-4 py-2 h-full transition-colors whitespace-nowrap border-r border-gray-100 pr-6 mr-2 ${
                isMenuOpen ? "text-[#2563EB] bg-blue-50" : "text-[#2563EB]"
              }`}
            >
              <Menu className="w-5 h-5" />
              Todos os Departamentos
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mega Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 flex shadow-2xl border border-gray-100 rounded-b-md z-50 bg-white min-h-[420px]">
                {/* Painel esquerdo: pais */}
                <div className="w-64 border-r border-gray-100 py-2 overflow-y-auto max-h-[520px]">
                  {parentCollections.length === 0 && (
                    <p className="px-4 py-3 text-sm text-gray-400">
                      Carregando...
                    </p>
                  )}
                  {parentCollections.map((parent) => (
                    <div
                      key={parent.id}
                      onMouseEnter={() =>
                        setHoveredParent(
                          childrenOf(parent.title).length > 0
                            ? parent.title
                            : null,
                        )
                      }
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors group cursor-pointer ${
                        hoveredParent === parent.title
                          ? "bg-blue-50 text-[#2563EB]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#2563EB]"
                      }`}
                    >
                      {parent.imageUrl ? (
                        <Image
                          src={parent.imageUrl}
                          alt={parent.title}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-100"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Package className="w-4 h-4 text-[#2563EB]" />
                        </div>
                      )}
                      <span className="text-sm font-medium flex-1">
                        {parent.title}
                      </span>
                      <Link
                        href={`/departamento/${parent.handle}`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setHoveredParent(null);
                        }}
                        className="p-1 rounded hover:bg-blue-100 transition-colors shrink-0"
                        title={`Ir para ${parent.title}`}
                      >
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2563EB]" />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Painel direito: filhos do pai selecionado */}
                {hoveredParent && (
                  <div className="w-[560px] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800 text-base">
                        {hoveredParent}
                      </h3>
                      <Link
                        href={`/departamento/${
                          parentCollections.find(
                            (p) => p.title === hoveredParent,
                          )?.handle ?? ""
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setHoveredParent(null);
                        }}
                        className="text-sm font-semibold text-[#2563EB] hover:underline"
                      >
                        Ver Departamento &rsaquo;
                      </Link>
                    </div>

                    {childrenOf(hoveredParent).length === 0 ? (
                      <p className="text-sm text-gray-400 mt-8 text-center">
                        Nenhuma subcategoria encontrada.
                      </p>
                    ) : (
                      <div className="grid grid-cols-4 gap-4">
                        {childrenOf(hoveredParent).map((child) => (
                          <Link
                            key={child.id}
                            href={`/departamento/${child.handle}`}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setHoveredParent(null);
                            }}
                            className="flex flex-col items-center gap-2 group text-center"
                          >
                            <div className="w-16 h-16 rounded-full bg-[#2563EB] flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-transparent group-hover:border-[#2563EB] transition-all">
                              {child.imageUrl ? (
                                <Image
                                  src={child.imageUrl}
                                  alt={child.title}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="w-7 h-7 text-white" />
                              )}
                            </div>
                            <span className="text-xs text-gray-600 group-hover:text-[#2563EB] transition-colors leading-tight">
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

          {/* Links rápidos — todas as coleções na nav */}
          <div className="flex items-center overflow-x-auto no-scrollbar">
            {collections.map((item) => (
              <Link
                key={item.id}
                href={`/departamento/${item.handle}`}
                className="px-4 py-2 text-gray-500 hover:text-[#2563EB] text-sm font-medium whitespace-nowrap transition-colors h-full flex items-center"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
