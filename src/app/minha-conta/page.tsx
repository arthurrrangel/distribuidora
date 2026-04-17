"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  LayoutDashboard,
  MapPin,
  LogOut,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import { useAuth } from "@/contexts/AuthContext";
import { getAccessToken } from "@/utils/tokenUtils";
import { getCustomer } from "@/services/customerService";
import { getErrorMessage } from "@/utils/errorUtils";
import { CustomerFull } from "@/types/shopify";

import { AccountSummary } from "./_components/AccountSummary";
import { AccountForm } from "./_components/AccountForm";
import { AddressList } from "./_components/AddressList";
import { Toast } from "./_components/Toast";

type Tab = "resumo" | "dados" | "enderecos";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "resumo",
    label: "Resumo",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "dados",
    label: "Dados Cadastrais",
    icon: <User className="w-4 h-4" />,
  },
  { id: "enderecos", label: "Endereços", icon: <MapPin className="w-4 h-4" /> },
];

interface ToastState {
  message: string;
  type: "success" | "error";
  id: number;
}

export default function MinhaContaPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const [customer, setCustomer] = useState<CustomerFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("resumo");
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type, id: Date.now() });
    },
    [],
  );

  const fetchCustomerData = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getCustomer(token);
      setCustomer(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  const handleUpdate = useCallback((updated: CustomerFull) => {
    setCustomer(updated);
  }, []);

  const handleLogout = () => {
    logout();
  };

  // ---- RENDER ----

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#0464D5]" />
            <span className="text-sm">Carregando sua conta...</span>
          </div>
        </div>
        <Footer />
        <MobileNavigator />
      </main>
    );
  }

  if (error || !customer) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <p className="text-red-500 text-sm mb-4">
              {error ?? "Não foi possível carregar sua conta."}
            </p>
            <button
              onClick={fetchCustomerData}
              className="px-4 py-2 bg-[#0464D5] text-white text-sm rounded-xl hover:bg-[#0353b4] transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
        <Footer />
        <MobileNavigator />
      </main>
    );
  }

  const fullName = [customer.firstName, customer.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Minha Conta</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Olá, <span className="font-medium text-gray-700">{fullName}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* ---- SIDEBAR (desktop) / TAB BAR (mobile) ---- */}
          <aside className="w-full md:w-56 shrink-0">
            {/* Mobile: horizontal tabs */}
            <div className="flex md:hidden gap-1 bg-white border border-gray-200 rounded-2xl p-1 overflow-x-auto no-scrollbar mb-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-[#0464D5] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop: vertical sidebar */}
            <div className="hidden md:flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#0464D5]">
                      {customer.firstName?.[0]?.toUpperCase() ?? "?"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="p-2 flex-1">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                      activeTab === tab.id
                        ? "bg-[#0464D5] text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {tab.icon}
                      {tab.label}
                    </span>
                    {activeTab === tab.id && (
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </div>
          </aside>

          {/* ---- CONTENT AREA ---- */}
          <div className="flex-1 min-w-0">
            {activeTab === "resumo" && (
              <div className="space-y-4">
                <AccountSummary customer={customer} />

                {/* Quick actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <QuickCard
                    icon={<User className="w-5 h-5 text-[#0464D5]" />}
                    title="Dados Cadastrais"
                    description="Edite seu nome, e-mail e telefone"
                    onClick={() => setActiveTab("dados")}
                  />
                  <QuickCard
                    icon={<MapPin className="w-5 h-5 text-[#0464D5]" />}
                    title="Endereços"
                    description="Gerencie seus endereços de entrega"
                    onClick={() => setActiveTab("enderecos")}
                  />
                </div>

                {/* Mobile logout */}
                <div className="md:hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair da conta
                  </button>
                </div>
              </div>
            )}

            {activeTab === "dados" && (
              <AccountForm
                customer={customer}
                onUpdate={handleUpdate}
                onToast={showToast}
              />
            )}

            {activeTab === "enderecos" && (
              <AddressList
                customer={customer}
                onUpdate={handleUpdate}
                onToast={showToast}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
      <MobileNavigator />

      {/* Toast */}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}

// --- Quick action card ---
function QuickCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 hover:border-[#0464D5]/30 hover:shadow-sm transition-all text-left w-full group"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto shrink-0" />
    </button>
  );
}
