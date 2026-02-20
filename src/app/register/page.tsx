"use client";

import { useState, FormEvent, ChangeEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  Building2,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";

import { getErrorMessage } from "@/utils/errorUtils";
import {
  validateRequired,
  validateEmail,
  validateCNPJ,
  validatePhone,
  validateCEP,
  validateIE,
  formatCNPJ,
  formatPhone,
  formatCEP,
} from "@/utils/validations";
import { CompanyRegistrationData, FormErrors } from "@/types/shopify";

// Estado inicial do formulário
const initialFormData: CompanyRegistrationData = {
  razaoSocial: "",
  nomeFantasia: "",
  cnpj: "",
  inscricaoEstadual: "",
  ieIsento: false,
  nomeResponsavel: "",
  whatsapp: "",
  email: "",
  senha: "",
  endereco: {
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  },
};

// Componente de campo de input isolado para não perder o foco
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = true,
  disabled = false,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: typeof Building2;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full ${Icon ? "pl-10" : "px-4"} pr-4 py-3 rounded-md border ${
          error ? "border-red-300 bg-red-50" : "border-gray-200"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
        placeholder={placeholder}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCEP, setLoadingCEP] = useState<boolean>(false);

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] =
    useState<CompanyRegistrationData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      if (parent === "endereco") {
        setFormData((prev) => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            [child]: value,
          },
        }));
      }

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (name === "ieIsento" && checked) {
        setFormData((prev) => ({ ...prev, inscricaoEstadual: "" }));
        setErrors((prev) => ({ ...prev, inscricaoEstadual: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCNPJChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData((prev) => ({ ...prev, cnpj: formatted }));
    if (errors.cnpj) setErrors((prev) => ({ ...prev, cnpj: "" }));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: "" }));
  };

  const handleCEPChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, cep: formatted },
    }));
    if (errors["endereco.cep"])
      setErrors((prev) => ({ ...prev, "endereco.cep": "" }));

    const cleanCEP = formatted.replace(/[^\d]/g, "");
    if (cleanCEP.length === 8) {
      setLoadingCEP(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCEP}/json/`,
        );
        const data = await response.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            endereco: {
              ...prev.endereco,
              rua: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              uf: data.uf || "",
            },
          }));
        }
      } catch {
        // Silencioso
      } finally {
        setLoadingCEP(false);
      }
    }
  };

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.razaoSocial)) {
      newErrors.razaoSocial = "Razão Social é obrigatória";
    }
    if (!validateRequired(formData.nomeFantasia)) {
      newErrors.nomeFantasia = "Nome Fantasia é obrigatório";
    }
    if (!validateRequired(formData.cnpj)) {
      newErrors.cnpj = "CNPJ é obrigatório";
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido";
    }
    if (
      !formData.ieIsento &&
      formData.inscricaoEstadual &&
      !validateIE(formData.inscricaoEstadual)
    ) {
      newErrors.inscricaoEstadual = "Inscrição Estadual inválida";
    }

    if (!validateRequired(formData.nomeResponsavel)) {
      newErrors.nomeResponsavel = "Nome do responsável é obrigatório";
    }
    if (!validateRequired(formData.whatsapp)) {
      newErrors.whatsapp = "WhatsApp/Telefone é obrigatório";
    } else if (!validatePhone(formData.whatsapp)) {
      newErrors.whatsapp = "Telefone inválido";
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!validateRequired(formData.senha)) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 5) {
      newErrors.senha = "Senha deve ter no mínimo 5 caracteres";
    }

    if (!validateRequired(formData.endereco.cep)) {
      newErrors["endereco.cep"] = "CEP é obrigatório";
    } else if (!validateCEP(formData.endereco.cep)) {
      newErrors["endereco.cep"] = "CEP inválido";
    }
    if (!validateRequired(formData.endereco.rua)) {
      newErrors["endereco.rua"] = "Rua é obrigatória";
    }
    if (!validateRequired(formData.endereco.numero)) {
      newErrors["endereco.numero"] = "Número é obrigatório";
    }
    if (!validateRequired(formData.endereco.bairro)) {
      newErrors["endereco.bairro"] = "Bairro é obrigatório";
    }
    if (!validateRequired(formData.endereco.cidade)) {
      newErrors["endereco.cidade"] = "Cidade é obrigatória";
    }
    if (!validateRequired(formData.endereco.uf)) {
      newErrors["endereco.uf"] = "UF é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({
        type: "error",
        message: "Por favor, corrija os erros no formulário.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    const cleanCNPJ = formData.cnpj.replace(/[^\d]/g, "");
    const cleanPhone = formData.whatsapp.replace(/[^\d]/g, "");
    const cleanCEP = formData.endereco.cep.replace(/[^\d]/g, "");

    const ieValue = formData.ieIsento
      ? "ISENTO"
      : formData.inscricaoEstadual || "";

    // Montando o payload para a sua rota interna (API do Next.js)
    const payload = {
      razaoSocial: formData.razaoSocial,
      nomeFantasia: formData.nomeFantasia,
      cnpj: cleanCNPJ,
      inscricaoEstadual: ieValue,
      nomeResponsavel: formData.nomeResponsavel,
      whatsapp: cleanPhone,
      email: formData.email,
      senha: formData.senha,
      endereco: {
        cep: cleanCEP,
        rua: formData.endereco.rua,
        numero: formData.endereco.numero,
        complemento: formData.endereco.complemento,
        bairro: formData.endereco.bairro,
        cidade: formData.endereco.cidade,
        uf: formData.endereco.uf,
      },
    };

    try {
      // Fazendo o fetch para a nossa própria rota API (/api/create-customer)
      const response = await fetch("/api/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível criar a conta.");
      }

      // Tudo deu certo via Admin API!
      setStatus({
        type: "success",
        message: "Conta criada com sucesso! Redirecionando para o login...",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setStatus({
        type: "error",
        message: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-[#1e3a8a] mb-2 text-center">
            Cadastre sua Empresa
          </h1>
          <p className="text-gray-500 text-sm mb-8 text-center">
            Preencha os dados abaixo para criar sua conta empresarial.
          </p>

          {status.message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 border ${
                status.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Dados da Empresa
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Razão Social"
                    name="razaoSocial"
                    placeholder="Empresa Ltda"
                    value={formData.razaoSocial}
                    onChange={handleChange}
                    error={errors.razaoSocial}
                    icon={Building2}
                  />
                  <InputField
                    label="Nome Fantasia"
                    name="nomeFantasia"
                    placeholder="Minha Empresa"
                    value={formData.nomeFantasia}
                    onChange={handleChange}
                    error={errors.nomeFantasia}
                    icon={Building2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="CNPJ"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={handleCNPJChange}
                    error={errors.cnpj}
                    icon={FileText}
                    maxLength={18}
                  />
                  <div>
                    <InputField
                      label="Inscrição Estadual"
                      name="inscricaoEstadual"
                      placeholder="000.000.000.000"
                      value={formData.inscricaoEstadual}
                      onChange={handleChange}
                      error={errors.inscricaoEstadual}
                      icon={FileText}
                      required={false}
                      disabled={formData.ieIsento}
                    />
                    <div className="mt-2">
                      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          name="ieIsento"
                          checked={formData.ieIsento}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Isento de Inscrição Estadual
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Dados do Responsável
              </h2>
              <div className="space-y-4">
                <InputField
                  label="Nome Completo do Responsável"
                  name="nomeResponsavel"
                  placeholder="João da Silva"
                  value={formData.nomeResponsavel}
                  onChange={handleChange}
                  error={errors.nomeResponsavel}
                  icon={User}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="WhatsApp / Telefone"
                    name="whatsapp"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={handlePhoneChange}
                    error={errors.whatsapp}
                    icon={Phone}
                    maxLength={15}
                  />
                  <InputField
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="empresa@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon={Mail}
                  />
                </div>

                <InputField
                  label="Senha"
                  name="senha"
                  type="password"
                  placeholder="Mínimo 5 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                  error={errors.senha}
                  icon={Lock}
                />
              </div>
            </section>

            <section>
              <h2 className="mt-4 text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Endereço de Entrega
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <InputField
                      label="CEP"
                      name="endereco.cep"
                      placeholder="00000-000"
                      value={formData.endereco.cep}
                      onChange={handleCEPChange}
                      error={errors["endereco.cep"]}
                      icon={MapPin}
                      maxLength={9}
                    />
                    {loadingCEP && (
                      <p className="mt-1 text-xs text-blue-600">
                        Buscando endereço...
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <InputField
                      label="Rua / Logradouro"
                      name="endereco.rua"
                      placeholder="Rua das Flores"
                      value={formData.endereco.rua}
                      onChange={handleChange}
                      error={errors["endereco.rua"]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <InputField
                    label="Número"
                    name="endereco.numero"
                    placeholder="123"
                    value={formData.endereco.numero}
                    onChange={handleChange}
                    error={errors["endereco.numero"]}
                  />
                  <InputField
                    label="Complemento"
                    name="endereco.complemento"
                    placeholder="Sala 1"
                    value={formData.endereco.complemento}
                    onChange={handleChange}
                    required={false}
                  />
                  <div className="col-span-2">
                    <InputField
                      label="Bairro"
                      name="endereco.bairro"
                      placeholder="Centro"
                      value={formData.endereco.bairro}
                      onChange={handleChange}
                      error={errors["endereco.bairro"]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <InputField
                      label="Cidade"
                      name="endereco.cidade"
                      placeholder="São Paulo"
                      value={formData.endereco.cidade}
                      onChange={handleChange}
                      error={errors["endereco.cidade"]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UF <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="endereco.uf"
                      value={formData.endereco.uf}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        errors["endereco.uf"]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                    >
                      <option value="">Selecione</option>
                      {estados.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                    {errors["endereco.uf"] && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors["endereco.uf"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2563EB] text-white py-4 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
              >
                {loading ? "Criando conta..." : "Criar Conta"}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-4">Já tem uma conta?</p>
            <Link
              href="/login"
              className="inline-block w-full bg-white border border-[#2563EB] text-[#2563EB] py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
