"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Profile = "comprador" | "fornecedor" | "outro";

export function ContactForm() {
  const [profile, setProfile] = useState<Profile>("comprador");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const cnpj = String(data.get("cnpj") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    const profileLabel =
      profile === "comprador"
        ? "Comprador B2B / Revendedor"
        : profile === "fornecedor"
        ? "Indústria / Fornecedor"
        : "Outro";

    const subject = `[Contato Site Repon] ${profileLabel} — ${company || name}`;
    const body = [
      `Perfil: ${profileLabel}`,
      ``,
      `Nome: ${name}`,
      `Empresa: ${company}`,
      `CNPJ: ${cnpj}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      ``,
      `Mensagem:`,
      message,
      ``,
      `---`,
      `Enviado pelo formulário do site institucional.`,
    ].join("\n");

    const recipient =
      profile === "fornecedor"
        ? site.contact.emails.comercial
        : site.contact.emails.comercial;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setTimeout(() => setSubmitting(false), 1200);
  }

  return (
    <form onSubmit={handleSubmit} className="card-hairline p-8 md:p-10">
      {/* Perfil */}
      <fieldset className="mb-8">
        <legend className="eyebrow mb-4">Perfil de contato</legend>
        <div className="grid grid-cols-3 gap-px bg-line border border-line">
          {(
            [
              ["comprador",  "Comprador B2B"],
              ["fornecedor", "Indústria"],
              ["outro",      "Outro"],
            ] as const
          ).map(([val, label]) => (
            <button
              type="button"
              key={val}
              onClick={() => setProfile(val)}
              className={`p-3 text-[0.875rem] font-medium transition-colors ${
                profile === val
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink-600 hover:bg-paper-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Nome completo" name="name" required />
        <Field label="Empresa" name="company" required />
        <Field
          label="CNPJ"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          required={profile === "comprador" || profile === "fornecedor"}
        />
        <Field label="E-mail" name="email" type="email" required />
        <Field
          label="Telefone"
          name="phone"
          placeholder="(00) 00000-0000"
          className="sm:col-span-2"
        />
        <FieldArea
          label="Mensagem"
          name="message"
          required
          className="sm:col-span-2"
          placeholder={
            profile === "fornecedor"
              ? "Marca, categoria, volume estimado, link de catálogo."
              : profile === "comprador"
              ? "Tipo de revenda, categorias de interesse, volume estimado."
              : "Conte como podemos ajudar."
          }
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[0.75rem] text-ink-500 leading-snug max-w-md">
          O envio abre o seu cliente de e-mail com os dados preenchidos. Sem
          armazenamento intermediário, sem rastreamento de terceiros.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary justify-center disabled:opacity-60"
        >
          {submitting ? "Abrindo cliente de e-mail…" : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={name} className="eyebrow">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="bg-transparent border-b border-line py-2.5 text-[0.9375rem] text-ink placeholder:text-ink-400 focus:border-ink focus:outline-none transition-colors"
      />
    </div>
  );
}

function FieldArea({
  label,
  name,
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={name} className="eyebrow">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        required={required}
        placeholder={placeholder}
        className="bg-transparent border border-line p-3.5 text-[0.9375rem] text-ink placeholder:text-ink-400 focus:border-ink focus:outline-none transition-colors resize-y min-h-[120px]"
      />
    </div>
  );
}
