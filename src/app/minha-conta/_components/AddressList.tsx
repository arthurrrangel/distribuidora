"use client";

import { useState } from "react";
import { Plus, MapPin, Star, Pencil, Trash2, Loader2 } from "lucide-react";
import { Address, AddressInput, CustomerFull } from "@/types/shopify";
import {
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/services/customerService";
import { getAccessToken } from "@/utils/tokenUtils";
import { extractShopifyUserErrors, getErrorMessage } from "@/utils/errorUtils";
import { AddressForm } from "./AddressForm";

interface AddressListProps {
  customer: CustomerFull;
  onUpdate: (updated: CustomerFull) => void;
  onToast: (message: string, type: "success" | "error") => void;
}

export function AddressList({ customer, onUpdate, onToast }: AddressListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

  const addresses =
    customer.addresses?.edges?.map((e) => ({
      ...e.node,
      isDefault: e.node.id === customer.defaultAddress?.id,
    })) ?? [];

  const handleCreate = async (data: AddressInput) => {
    const token = getAccessToken();
    if (!token) throw new Error("Sessão expirada.");

    const result = await createAddress(token, data);
    const shopifyError = extractShopifyUserErrors(result.userErrors);
    if (shopifyError) throw new Error(shopifyError);

    // Re-fetch via refresh pattern — update customer to trigger reload
    onToast("Endereço adicionado com sucesso!", "success");
    setShowForm(false);
    window.location.reload();
  };

  const handleUpdate = async (data: AddressInput) => {
    if (!editingAddress) return;
    const token = getAccessToken();
    if (!token) throw new Error("Sessão expirada.");

    const result = await updateAddress(token, editingAddress.id, data);
    const shopifyError = extractShopifyUserErrors(result.userErrors);
    if (shopifyError) throw new Error(shopifyError);

    onToast("Endereço atualizado com sucesso!", "success");
    setEditingAddress(null);
    window.location.reload();
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm("Tem certeza que deseja remover este endereço?")) return;
    setDeletingId(addressId);

    try {
      const token = getAccessToken();
      if (!token) throw new Error("Sessão expirada.");

      const result = await deleteAddress(token, addressId);
      const shopifyError = extractShopifyUserErrors(result.userErrors);
      if (shopifyError) throw new Error(shopifyError);

      onToast("Endereço removido.", "success");
      window.location.reload();
    } catch (err) {
      onToast(getErrorMessage(err), "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    setSettingDefaultId(addressId);
    try {
      const token = getAccessToken();
      if (!token) throw new Error("Sessão expirada.");

      const result = await setDefaultAddress(token, addressId);
      const shopifyError = extractShopifyUserErrors(result.userErrors);
      if (shopifyError) throw new Error(shopifyError);

      if (result.data) {
        onUpdate(result.data);
        onToast("Endereço padrão atualizado.", "success");
      }
    } catch (err) {
      onToast(getErrorMessage(err), "error");
    } finally {
      setSettingDefaultId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">Endereços</h3>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-[#0464D5] hover:text-gray-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo endereço
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <MapPin className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm">Nenhum endereço cadastrado.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm text-[#0464D5] hover:underline font-medium"
            >
              Adicionar endereço
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                isDefault={addr.isDefault ?? false}
                isDeleting={deletingId === addr.id}
                isSettingDefault={settingDefaultId === addr.id}
                onEdit={() => setEditingAddress(addr)}
                onDelete={() => handleDelete(addr.id)}
                onSetDefault={() => handleSetDefault(addr.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <AddressForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}

      {editingAddress && (
        <AddressForm
          address={editingAddress}
          onClose={() => setEditingAddress(null)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}

interface AddressCardProps {
  address: Address & { isDefault?: boolean };
  isDefault: boolean;
  isDeleting: boolean;
  isSettingDefault: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

function AddressCard({
  address,
  isDefault,
  isDeleting,
  isSettingDefault,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  const name = [address.firstName, address.lastName].filter(Boolean).join(" ");
  const line2 = [address.address2, address.city, address.province]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`relative rounded-xl border p-4 transition-all ${
        isDefault ? "border-[#0464D5]/30 bg-blue-50/50" : "border-gray-200 bg-white"
      }`}
    >
      {isDefault && (
        <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium text-[#0464D5] bg-blue-50 px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3 fill-[#0464D5] text-[#0464D5]" />
          Padrão
        </span>
      )}

      <div className="space-y-0.5 pr-16">
        {name && <p className="font-medium text-gray-900 text-sm">{name}</p>}
        <p className="text-sm text-gray-600">{address.address1}</p>
        {line2 && <p className="text-sm text-gray-600">{line2}</p>}
        <p className="text-sm text-gray-600">
          {address.country} — {address.zip}
        </p>
        {address.phone && (
          <p className="text-sm text-gray-500">{address.phone}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        {!isDefault && (
          <button
            onClick={onSetDefault}
            disabled={isSettingDefault}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#0464D5] transition-colors disabled:opacity-50"
          >
            {isSettingDefault ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Star className="w-3.5 h-3.5" />
            )}
            Definir como padrão
          </button>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#0464D5] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Editar
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
