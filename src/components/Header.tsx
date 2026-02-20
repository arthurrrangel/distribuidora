"use client";

import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MapPin,
  ChevronDown,
  Briefcase,
  Tv,
  Monitor,
  Heart,
  CookingPot,
  Smartphone,
  ChevronRight,
  Check,
  LogOut,
  Package,
  LucideIcon,
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
interface Department {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
}

interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
}

interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: Array<{
        node: ShopifyCollectionNode;
      }>;
    };
  };
}

const iconMap: Record<string, LucideIcon> = {
  "papelaria-e-escritorio": Briefcase,
  "eletronicos-e-tvs": Tv,
  "informatica-e-acessorios": Monitor,
  "saude-nutricao-e-bem-estar": Heart,
  "utilidades-domesticas": CookingPot,
  "audio-video-e-mobile": Smartphone,
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Rio de Janeiro");
  const [departments, setDepartments] = useState<Department[]>([]);

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
    async function fetchDepartments() {
      const query = `
        query getHeaderCollections {
          collections(first: 10, sortKey: TITLE) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
        }
      `;

      try {
        const response = await api.post<ShopifyCollectionsResponse>("", {
          query,
        });
        const nodes = response.data.data.collections.edges.map(
          (edge) => edge.node,
        );
        const loadedDepartments: Department[] = nodes.map((node) => ({
          id: node.id,
          name: node.title,
          slug: node.handle,
          icon: iconMap[node.handle] || Package,
        }));
        setDepartments(loadedDepartments);
      } catch (error) {
        console.error("Erro ao carregar departamentos:", error);
      }
    }
    fetchDepartments();
  }, []);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    logout();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full relative">
      <div className="fixed top-0 left-0 right-0 z-50 md:relative w-full">
        {/* Top Bar - Mantive azul escuro com texto branco para contraste */}
        <div className="bg-[#1e3a8a] text-white text-xs py-1.5 px-4 flex justify-center items-center h-[28px] relative z-50">
          <button
            onClick={() => setIsRegionOpen(!isRegionOpen)}
            className="flex items-center gap-1 hover:text-blue-200 transition-colors"
          >
            <MapPin className="w-3 h-3" />
            <span className="font-medium">Região: {selectedRegion}</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${isRegionOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isRegionOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsRegionOpen(false)}
              ></div>
              <div className="absolute top-full mt-1 bg-white rounded-md shadow-lg py-1 text-gray-800 min-w-[150px] z-50 animate-slide-up border border-gray-100">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-blue-50 text-xs font-medium text-[#2563EB]"
                  onClick={() => {
                    setSelectedRegion("Rio de Janeiro");
                    setIsRegionOpen(false);
                  }}
                >
                  <span className="flex-1">Rio de Janeiro</span>
                  {selectedRegion === "Rio de Janeiro" && (
                    <Check className="w-3 h-3" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Main Header */}
        <header className="bg-white text-[#2563EB] py-2 md:py-4 px-4 h-[60px] md:h-[76px] border-b border-gray-100">
          <div className="container mx-auto flex items-center justify-between gap-2 md:gap-8 h-full">
            {/* Menu Hamburger Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-blue-50 rounded-md transition-colors text-[#2563EB]"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-start md:flex-none">
              <Link
                href="/"
                className="flex items-center gap-2 group bg-white p-1 rounded-lg"
              >
                <Image
                  src="/repon-logo.svg"
                  alt="Repon Distribuidora"
                  width={100}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Search Desktop - CLICÁVEL PARA ABRIR O MODAL */}
            <div className="flex-1 max-w-3xl relative hidden md:block">
              <div
                className="relative cursor-pointer group"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                <input
                  type="text"
                  readOnly
                  placeholder="Pesquisar produtos..."
                  className="w-full py-3 pl-10 pr-4 rounded-md bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none ring-0 border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-4">
              {/* Desktop: Link de Pedidos - Sempre visível */}
              <Link
                href={user ? "/meus-pedidos" : "/login"}
                className="hidden md:flex items-center gap-2 text-[#2563EB] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors"
              >
                <Package className="w-5 h-5" />
                <span className="text-sm font-medium">Pedidos</span>
              </Link>

              {/* Desktop: Login/Cadastro ou Menu do Usuário */}
              {!user ? (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-3 bg-[#facc15] text-[#1e3a8a] px-3 py-2 md:px-4 md:py-2 rounded-md font-medium hover:bg-[#ffe066] transition-colors"
                >
                  <User className="w-5 h-5" />
                  <div className="text-left leading-tight text-xs hidden sm:block">
                    <div className="font-bold">Cadastre-se</div>
                    <div>Ou faça Login</div>
                  </div>
                </Link>
              ) : (
                <div
                  className="relative hidden md:block"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button className="flex items-center gap-3 text-[#2563EB] hover:bg-blue-50 px-3 py-2 rounded-md transition-colors">
                    <div className="bg-blue-50 p-1.5 rounded-full">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="text-left leading-tight text-xs">
                      <div className="text-gray-600">
                        Olá, {user.firstName || "Cliente"}
                      </div>
                      <div className="font-bold flex items-center gap-1">
                        Minha Conta <ChevronDown className="w-3 h-3" />
                      </div>
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 w-65 bg-white shadow-xl rounded-md border border-gray-100 py-1 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                        <p className="text-xs text-gray-500">Logado como</p>
                        <p className="text-sm font-semibold small truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/minha-conta"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <User className="w-4 h-4" /> Meus Dados
                      </Link>
                      <Link
                        href="/meus-pedidos"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Package className="w-4 h-4" /> Meus Pedidos
                      </Link>
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sair
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile: Ícone de Pedidos */}
              <Link
                href={user ? "/meus-pedidos" : "/login"}
                className="md:hidden p-2 hover:bg-blue-50 rounded-full transition-colors text-[#2563EB]"
                aria-label="Meus Pedidos"
              >
                <Package className="w-5 h-5" />
              </Link>

              {/* Mobile: Ícone de Usuário */}
              <Link
                href={user ? "/minha-conta" : "/login"}
                className="md:hidden p-2 hover:bg-blue-50 rounded-full transition-colors text-[#2563EB]"
                aria-label={user ? "Minha conta" : "Login"}
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Carrinho - Visível em todas as telas */}
              <Link
                href="/carrinho"
                className="relative p-2 hover:bg-blue-50 rounded-full transition-colors text-[#2563EB]"
                aria-label="Carrinho"
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer para compensar header fixo no mobile (28px topbar + 60px header) */}
      <div className="h-[88px] md:hidden"></div>

      {/* Search Mobile - CLICÁVEL PARA ABRIR O MODAL */}
      <div className="bg-white px-4 pb-4 mt-4 md:hidden">
        <div className="relative" onClick={() => setIsSearchOpen(true)}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            readOnly
            placeholder="Pesquisar produtos..."
            className="w-full py-3 pl-10 pr-4 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none ring-0 border border-gray-200 shadow-sm text-base"
          />
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[110] md:hidden shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Header do Drawer */}
            <div className="bg-[#1e3a8a] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user ? (
                  <>
                    <div className="bg-white/20 p-2 rounded-full">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Olá, {user.firstName || "Cliente"}
                      </p>
                      <p className="text-xs text-blue-200 truncate max-w-[150px]">
                        {user.email}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white/20 p-2 rounded-full">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Bem-vindo!</p>
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
                className="p-2 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Drawer */}
            <div className="overflow-y-auto h-[calc(100%-72px)]">
              {/* Links da Conta (se logado) */}
              {user && (
                <div className="border-b border-gray-100">
                  <Link
                    href="/minha-conta"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-sm">Meus Dados</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                  </Link>
                  <Link
                    href="/meus-pedidos"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                  >
                    <Package className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-sm">Meus Pedidos</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                  </Link>
                </div>
              )}

              {/* Departamentos */}
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Departamentos
                </p>
                {departments.map((dept) => (
                  <Link
                    key={dept.id}
                    href={`/departamento/${dept.slug}`}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                  >
                    <dept.icon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-sm flex-1">
                      {dept.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </Link>
                ))}
                {departments.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    Carregando departamentos...
                  </div>
                )}
              </div>

              {/* Logout (se logado) */}
              {user && (
                <div className="border-t border-gray-100 mt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full transition-colors"
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
        <div className="container mx-auto flex items-center relative">
          <div
            className="relative"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-3 font-semibold px-4 py-3 hover:bg-gray-50 transition-colors whitespace-nowrap border-r border-gray-100 pr-6 mr-2 ${isMenuOpen ? "text-[#2563EB] bg-gray-50" : "text-[#2563EB]"}`}
            >
              <Menu className="w-5 h-5" />
              Todos os Departamentos
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-b-md border border-gray-100 py-2 z-50">
                {departments.map((dept) => (
                  <Link
                    key={dept.id}
                    href={`/departamento/${dept.slug}`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2563EB] transition-colors group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <dept.icon className="w-5 h-5 text-gray-400 group-hover:text-[#2563EB]" />
                    <span className="font-medium text-sm flex-1">
                      {dept.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2563EB]" />
                  </Link>
                ))}
                {departments.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    Carregando...
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center overflow-x-auto no-scrollbar mask-gradient">
            {departments.slice(0, 5).map((item) => (
              <Link
                key={item.id}
                href={`/departamento/${item.slug}`}
                className="px-4 py-3 text-gray-500 hover:text-[#2563EB] text-sm font-medium whitespace-nowrap transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 top-[170px] hidden md:block"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
