"use client";
import { useState } from "react";
import { site } from "@/lib/site";

type Profile = "comprador" | "fornecedor" | "outro";

const inputStyle: React.CSSProperties = {
  background: "var(--color-iced-soft)",
  border: "1px solid var(--color-line)",
  padding: "0.75rem 1rem",
  fontSize: "16px",
  color: "var(--color-petrol)",
  fontFamily: "var(--font-sans)",
  borderRadius: 0,
  WebkitAppearance: "none",
  minHeight: 48,
  width: "100%",
};

export function ContactForm() {
  const [profile, setProfile] = useState<Profile>("comprador");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      cnpj: String(data.get("cnpj") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
      source:
        profile === "comprador"
          ? "contato-comprador"
          : profile === "fornecedor"
          ? "contato-fornecedor"
          : "contato-outro",
    };
    if (!payload.name || !payload.email || !payload.cnpj) {
      setStatus("error");
      setError("Preencha nome, e-mail e CNPJ.");
      return;
    }
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await r.json();
      if (!r.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Não foi possível enviar.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Erro de rede. Tente o WhatsApp ou copie nosso e-mail.");
    }
  }

  if (status === "ok") {
    return (
      <div className="card-hairline p-8 md:p-10">
        <div className="eyebrow mb-3" style={{ color: "var(--color-blue)" }}>Mensagem enviada</div>
        <h3 className="font-display" style={{ fontSize: "1.625rem", fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-petrol)", lineHeight: 1.1, marginBottom: 16 }}>Recebido. Resposta em até 24h úteis.</h3>
        <p className="text-[0.9375rem]" style={{ color: "var(--color-ink-700)", lineHeight: 1.6 }}>
          Você também pode falar agora pelo WhatsApp comercial.
        </p>
        <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">WhatsApp comercial</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-hairline p-6 md:p-10" noValidate>
      <fieldset className="mb-6">
        <legend className="eyebrow mb-4">Perfil de contato</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--color-line)", border: "1px solid var(--color-line)" }}>
          {([
            ["comprador", "Comprador B2B"],
            ["fornecedor", "Indústria"],
            ["outro", "Outro"],
          ] as const).map(([val, label]) => (
            <button
              type="button"
              key={val}
              onClick={() => setProfile(val)}
              aria-pressed={profile === val}
              className="transition-colors"
              style={{
                background: profile === val ? "var(--color-petrol)" : "var(--color-iced-soft)",
                color: profile === val ? "var(--color-iced)" : "var(--color-petrol)",
                padding: "14px 12px",
                fontSize: "0.875rem",
                fontWeight: 500,
                minHeight: 48,
                touchAction: "manipulation",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">Nome *</span>
          <input name="name" required autoComplete="name" autoCapitalize="words" style={inputStyle} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">Empresa</span>
          <input name="company" autoComplete="organization" style={inputStyle} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">CNPJ *</span>
          <input name="cnpj" required inputMode="numeric" placeholder="00.000.000/0000-00" autoComplete="off" style={inputStyle} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="eyebrow">E-mail *</span>
          <input name="email" type="email" required inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} style={inputStyle} />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="eyebrow">Telefone</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" style={inputStyle} />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="eyebrow">Mensagem</span>
          <textarea name="message" rows={4} style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-[0.8125rem]" style={{ color: "#A22", marginBottom: 12 }}>{error}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary"
          style={{ touchAction: "manipulation", opacity: status === "loading" ? 0.6 : 1 }}
        >
          {status === "loading" ? "Enviando…" : "Enviar mensagem"}
        </button>
        <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-[0.9375rem] font-medium inline-flex items-center gap-2 sm:ml-2" style={{ color: "var(--color-blue)", padding: "0.5rem" }}>
          Ou WhatsApp →
        </a>
      </div>
      <p className="text-[0.75rem]" style={{ color: "var(--color-ink-500)", marginTop: 12 }}>
        Seus dados são tratados conforme a <a href="/politica-privacidade" className="link-underline" style={{ color: "var(--color-blue)" }}>política de privacidade</a>.
      </p>
    </form>
  );
}
