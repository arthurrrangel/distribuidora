"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { X, Loader2, Eye, EyeOff, Lock } from "lucide-react";
import { updateCustomer } from "@/services/customerService";
import { getAccessToken } from "@/utils/tokenUtils";
import { extractShopifyUserErrors, getErrorMessage } from "@/utils/errorUtils";

interface ChangePasswordModalProps {
  onClose: () => void;
  onToast: (message: string, type: "success" | "error") => void;
}

export function ChangePasswordModal({
  onClose,
  onToast,
}: ChangePasswordModalProps) {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (form.password.length < 5) {
      setError("A senha deve ter no mínimo 5 caracteres.");
      return;
    }

    setSaving(true);
    try {
      const token = getAccessToken();
      if (!token) throw new Error("Sessão expirada.");

      const result = await updateCustomer(token, { password: form.password });
      const shopifyError = extractShopifyUserErrors(result.userErrors);
      if (shopifyError) throw new Error(shopifyError);

      onToast("Senha alterada com sucesso!", "success");
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Alterar Senha</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <PasswordField
            label="Nova senha"
            name="password"
            value={form.password}
            onChange={handleChange}
            show={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />
          <PasswordField
            label="Confirmar senha"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            show={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  show,
  onToggle,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-xs font-medium text-gray-600 uppercase tracking-wide"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          required
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
