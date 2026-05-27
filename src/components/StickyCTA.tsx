"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Barra de CTA fixa no bottom — aparece após scroll Y > 700px.
 * Sobe quando CookieBanner está ativo pra não sobrepor.
 */
export function StickyCTA() {
  const [show, setShow] = useState(false);
  const [cookieActive, setCookieActive] = useState(false);

  useEffect(() => {
    const checkCookie = () => {
      try {
        const v = localStorage.getItem("repon-cookie-consent");
        setCookieActive(v !== "all" && v !== "essential");
      } catch { setCookieActive(false); }
    };
    checkCookie();
    const interval = setInterval(checkCookie, 1000);
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const nearBottom = y + winH > docH - winH * 1.2;
      setShow(y > 700 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(interval); };
  }, []);

  // Em mobile, se cookie banner ativo, sobe acima dele (CookieBanner usa ~120px de altura no mobile)
  const bottomOffset = cookieActive ? "calc(env(safe-area-inset-bottom, 0px) + 152px)" : "env(safe-area-inset-bottom, 0px)";

  return (
    <div
      aria-hidden={!show}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: bottomOffset,
        zIndex: 90,
        padding: "10px 16px",
        background: "rgba(1,9,45,0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(82,159,237,0.22)",
        transform: show ? "translateY(0)" : "translateY(120%)",
        transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), bottom 320ms ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div
        style={{
          color: "var(--color-iced)",
          fontFamily: "var(--font-display)",
          fontSize: "0.875rem",
          letterSpacing: "-0.012em",
          lineHeight: 1.25,
          fontWeight: 400,
          minWidth: 0,
        }}
      >
        <span style={{ color: "var(--color-blue-300)" }}>Pronto pra abrir cadastro?</span>{" "}
        <span style={{ opacity: 0.65 }} className="hidden sm:inline">Resposta em 1 dia útil.</span>
      </div>
      <a
        href={site.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flexShrink: 0,
          background: "var(--color-blue)",
          color: "var(--color-iced)",
          fontWeight: 600,
          fontSize: "0.875rem",
          letterSpacing: "-0.005em",
          padding: "10px 16px",
          textDecoration: "none",
          transition: "background 220ms ease",
          whiteSpace: "nowrap",
        }}
      >
        Mandar CNPJ →
      </a>
    </div>
  );
}
