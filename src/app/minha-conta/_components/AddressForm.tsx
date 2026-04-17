"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { X, Loader2, MapPin } from "lucide-react";
import { Address, AddressInput } from "@/types/shopify";

interface AddressFormProps {
  address?: Address | null;
  onClose: () => void;
  onSubmit: (data: AddressInput) => Promise<void>;
}

const INITIAL_FORM: AddressInput = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  country: "Brazil",
  zip: "",
  phone: "",
};

export function AddressForm({ address, onClose, onSubmit }: AddressFormProps) {
  const [form, setForm] = useState<AddressInput>(
    address
      ? {
          firstName: address.firstName ?? "",
          lastName: address.lastName ?? "",
          address1: address.address1 ?? "",
          address2: address.address2 ?? "",
          city: address.city ?? "",
          province: address.province ?? "",
          country: address.country ?? "Brazil",
          zip: address.zip ?? "",
          phone: address.phone ?? "",
        }
      : INITIAL_FORM,
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(form);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar endereço.");
    } finally {
      setSaving(false);
    }
  };

  const isEditing = !!address;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0464D5]" />
            <h3 className="font-semibold text-gray-900">
              {isEditing ? "Editar Endereço" : "Novo Endereço"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 overflow-y-auto flex-1"
        >
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Nome"
              name="firstName"
              value={form.firstName ?? ""}
              onChange={handleChange}
            />
            <InputField
              label="Sobrenome"
              name="lastName"
              value={form.lastName ?? ""}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Endereço"
            name="address1"
            value={form.address1}
            onChange={handleChange}
            required
            placeholder="Rua, número"
          />
          <InputField
            label="Complemento"
            name="address2"
            value={form.address2 ?? ""}
            onChange={handleChange}
            placeholder="Apto, bloco, sala..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Cidade"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
            <InputField
              label="Estado"
              name="province"
              value={form.province ?? ""}
              onChange={handleChange}
              placeholder="SP"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="CEP"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              required
              placeholder="00000-000"
            />
            <InputField
              label="Telefone"
              name="phone"
              type="tel"
              value={form.phone ?? ""}
              onChange={handleChange}
              placeholder="+5511..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="country"
              className="text-xs font-medium text-gray-600 uppercase tracking-wide"
            >
              País
            </label>
            <select
              id="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0464D5] focus:border-transparent transition bg-white"
            >
              <option value="Brazil">Brasil</option>
              <option value="United States">Estados Unidos</option>
              <option value="Portugal">Portugal</option>
              <option value="Argentina">Argentina</option>
            </select>
          </div>

          {/* Footer actions */}
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
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0464D5] hover:bg-[#0353b4] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Salvando..." : isEditing ? "Salvar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
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
