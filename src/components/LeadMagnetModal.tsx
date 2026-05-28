"use client";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";

export function LeadMagnetModal({ open, onClose, source = "tabela" }: { open: boolean; onClose: () => void; source?: string }) {
  const [form, setForm] = useState({ name: "", email: "", cnpj: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Não foi possível enviar.");
        return;
      }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Erro de rede.");
    }
  };

  if (!open) return null;
  return (
    <div className="lead-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Receber tabela de preços">
      <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="eyebrow mb-2" style={{ color: "var(--color-blue)" }}>Receber tabela</div>
            <h3 className="font-display" style={{ fontSize: "1.625rem", fontWeight: 500, letterSpacing: "-0.022em", color: "var(--color-petrol)", lineHeight: 1.1 }}>Tabela em PDF<br/>direto no seu e-mail.</h3>
          </div>
          <button onClick={onClose} aria-label="Fechar" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "var(--color-ink-500)", fontSize: 24, lineHeight: 1 }}>×</button>
        </div>
        {status === "ok" ? (
          <div>
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--color-petrol)" }}>
              <strong>Recebido.</strong> Em até 24h úteis a tabela vai pro seu e-mail. Se preferir, manda CNPJ pelo WhatsApp agora pra agilizar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">WhatsApp comercial</a>
              <button onClick={onClose} className="btn-ghost">Fechar</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="Nome" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required autoComplete="name" />
            <Field label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required inputMode="email" autoComplete="email" />
            <Field label="CNPJ" value={form.cnpj} onChange={(v) => setForm({ ...form, cnpj: v })} required placeholder="00.000.000/0000-00" inputMode="numeric" autoComplete="off" />
            <Field label="Telefone (opcional)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} type="tel" inputMode="tel" autoComplete="tel" />
            {error && <p style={{ fontSize: "0.8125rem", color: "#A22", marginTop: 4 }}>{error}</p>}
            <button type="submit" disabled={status === "loading"} className="btn-primary mt-2" style={{ opacity: status === "loading" ? 0.6 : 1 }}>
              {status === "loading" ? "Enviando…" : "Receber tabela"}
            </button>
            <p className="text-[0.75rem]" style={{ color: "var(--color-ink-500)", marginTop: 4 }}>
              Seus dados são tratados conforme a <a href="/politica-privacidade" className="link-underline" style={{ color: "var(--color-blue)" }}>política de privacidade</a>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder, inputMode, autoComplete }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; inputMode?: "text"|"email"|"tel"|"numeric"|"decimal"|"url"; autoComplete?: string }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="eyebrow" style={{ color: "var(--color-petrol-60)" }}>{label}{required && " *"}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        autoCapitalize={type === "email" ? "none" : "sentences"}
        autoCorrect={type === "email" ? "off" : undefined}
        spellCheck={type === "email" ? false : undefined}
        style={{ background: "var(--color-iced-soft)", border: "1px solid var(--color-line)", padding: "0.75rem 1rem", fontSize: "16px", color: "var(--color-petrol)", fontFamily: "var(--font-sans)", borderRadius: 0, WebkitAppearance: "none" as React.CSSProperties["WebkitAppearance"], minHeight: 48 }}
      />
    </label>
  );
}
