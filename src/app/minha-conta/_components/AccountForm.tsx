"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Loader2, Save, Lock } from "lucide-react";
import { CustomerFull, UpdateCustomerInput } from "@/types/shopify";
import { updateCustomer } from "@/services/customerService";
import { getAccessToken } from "@/utils/tokenUtils";
import { extractShopifyUserErrors, getErrorMessage } from "@/utils/errorUtils";
import { ChangePasswordModal } from "./ChangePasswordModal";

interface AccountFormProps {
  customer: CustomerFull;
  onUpdate: (updated: CustomerFull) => void;
  onToast: (message: string, type: "success" | "error") => void;
}

// --- Phone helpers ---

/**
 * Converte um número E.164 armazenado no Shopify (+5581992351167)
 * para o formato de exibição com máscara: (81) 99235-1167
 */
function e164ToDisplay(phone: string | undefined | null): string {
  if (!phone) return "";
  // Remove tudo que não é dígito
  const digits = phone.replace(/\D/g, "");
  // Remove prefixo "55" se tiver 13 dígitos (55 + 11 dígitos BR)
  const local =
    digits.startsWith("55") && digits.length === 13 ? digits.slice(2) : digits;
  return applyPhoneMask(local);
}

/**
 * Aplica máscara (DDD) NNNNN-NNNN nos dígitos puros (11 dígitos).
 */
function applyPhoneMask(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Converte o valor mascarado de volta para E.164 (+55DDDNNNNNNNNN).
 * Retorna undefined se não tiver os 11 dígitos completos.
 */
function displayToE164(masked: string): string | undefined {
  const digits = masked.replace(/\D/g, "");
  if (digits.length !== 11) return undefined;
  return `+55${digits}`;
}

// ----------------

export function AccountForm({ customer, onUpdate, onToast }: AccountFormProps) {
  const [form, setForm] = useState({
    firstName: customer.firstName ?? "",
    lastName: customer.lastName ?? "",
    email: customer.email ?? "",
    // Converte o telefone armazenado para exibição mascarada
    phone: e164ToDisplay(customer.phone),
  });

  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const masked = applyPhoneMask(e.target.value);
    setForm((prev) => ({ ...prev, phone: masked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Valida telefone se preenchido
    if (form.phone && form.phone.replace(/\D/g, "").length !== 11) {
      onToast(
        "Telefone inválido. Digite os 11 dígitos: DDD + número.",
        "error",
      );
      return;
    }

    setSaving(true);

    try {
      const token = getAccessToken();
      if (!token) throw new Error("Sessão expirada. Faça login novamente.");

      const payload: UpdateCustomerInput = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        // Converte para E.164 antes de enviar ao Shopify
        phone: form.phone ? displayToE164(form.phone) : undefined,
      };

      const result = await updateCustomer(token, payload);

      const shopifyError = extractShopifyUserErrors(result.userErrors);
      if (shopifyError) throw new Error(shopifyError);

      if (result.data) {
        onUpdate(result.data);
        onToast("Dados atualizados com sucesso!", "success");
      }
    } catch (err) {
      onToast(getErrorMessage(err), "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">
          Dados Cadastrais
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Nome"
              name="firstName"
              value={form.firstName ?? ""}
              onChange={handleChange}
              required
            />
            <InputField
              label="Sobrenome"
              name="lastName"
              value={form.lastName ?? ""}
              onChange={handleChange}
              required
            />
          </div>

          <InputField
            label="E-mail"
            name="email"
            type="email"
            value={form.email ?? ""}
            onChange={handleChange}
            required
          />

          {/* Campo de telefone com máscara dedicada */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-xs font-medium text-gray-600 uppercase tracking-wide"
            >
              Telefone
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-sm text-gray-400 select-none pointer-events-none">
                +55
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={handlePhoneChange}
                placeholder="(81) 99235-1167"
                maxLength={15}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0464D5] focus:border-transparent transition placeholder-gray-400"
              />
            </div>
            <p className="text-xs text-gray-400">
              Digite DDD + número — 11 dígitos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0464D5] hover:bg-[#0353b4] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>

            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium rounded-xl transition-colors"
            >
              <Lock className="w-4 h-4" />
              Alterar senha
            </button>
          </div>
        </form>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onToast={onToast}
        />
      )}
    </>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-xs font-medium text-gray-600 uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0464D5] focus:border-transparent transition placeholder-gray-400"
      />
    </div>
  );
}
