"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Banner de consentimento de cookies — LGPD-aware.
 * - Persiste escolha em localStorage (chave 'repon-cookie-consent').
 * - Estado: 'all' (aceitou tudo) | 'essential' (só essenciais) | null (não escolheu).
 * - Não tracking ativo enquanto não consentir.
 * - Sutil, fica bottom, não bloqueia conteúdo.
 */
const STORAGE_KEY = "repon-cookie-consent";

type Consent = "all" | "essential" | null;

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "all" || stored === "essential") setConsent(stored as Consent);
    } catch {
      // localStorage indisponível (Safari privado, etc) — segue sem persistir
    }
  }, []);

  const accept = (value: Exclude<Consent, null>) => {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
  };

  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        maxWidth: 720,
        marginInline: "auto",
        background: "rgba(1,9,45,0.96)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(111,169,232,0.22)",
        zIndex: 120,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        color: "var(--color-iced)",
        fontSize: "0.875rem",
        lineHeight: 1.5,
      }}
    >
      <div>
        <strong style={{ fontWeight: 600 }}>Cookies essenciais.</strong>{" "}
        <span style={{ color: "rgba(243,241,237,0.78)" }}>
          A Repon usa cookies para manter o site funcionando. Cookies opcionais nos
          ajudam a entender uso agregado e melhorar a experiência. Veja a{" "}
          <Link
            href="/politica-cookies"
            className="link-underline"
            style={{ color: "var(--color-blue-300)" }}
          >
            política de cookies
          </Link>
          .
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => accept("essential")}
          style={{
            background: "transparent",
            color: "var(--color-iced)",
            border: "1px solid rgba(243,241,237,0.4)",
            padding: "0.5rem 0.9rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 200ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(243,241,237,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Apenas essenciais
        </button>
        <button
          onClick={() => accept("all")}
          style={{
            background: "var(--color-blue)",
            color: "var(--color-iced)",
            border: "1px solid var(--color-blue)",
            padding: "0.5rem 1.1rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 200ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-blue-700)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-blue)")}
        >
          Aceitar todos
        </button>
      </div>
    </div>
  );
}
