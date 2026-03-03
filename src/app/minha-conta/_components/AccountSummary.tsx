"use client";

import { User, Mail, Phone, Calendar } from "lucide-react";
import { CustomerFull } from "@/types/shopify";

interface AccountSummaryProps {
  customer: CustomerFull;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function AccountSummary({ customer }: AccountSummaryProps) {
  const fullName = [customer.firstName, customer.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
      {/* Avatar + nome */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <span className="text-xl font-bold text-blue-600">
            {customer.firstName?.[0]?.toUpperCase() ?? "?"}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {fullName || "—"}
          </h2>
          <span className="text-sm text-gray-500">Cliente</span>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Info grid */}
      <div className="space-y-3">
        <SummaryRow
          icon={<Mail className="w-4 h-4" />}
          label="E-mail"
          value={customer.email}
        />
        {customer.phone && (
          <SummaryRow
            icon={<Phone className="w-4 h-4" />}
            label="Telefone"
            value={customer.phone}
          />
        )}
        <SummaryRow
          icon={<Calendar className="w-4 h-4" />}
          label="Membro desde"
          value={formatDate(customer.createdAt)}
        />
      </div>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 leading-none mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium break-all">{value}</p>
      </div>
    </div>
  );
}
