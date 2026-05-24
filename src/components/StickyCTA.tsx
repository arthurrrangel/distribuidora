"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Barra de CTA fixa no bottom — aparece após scroll Y > 600px.
 * Esconde quando o user está perto do footer (last 200vh) pra não competir com CTA final.
 */
export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const nearBottom = y + winH > docH - winH * 1.2;
      setShow(y > 600 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="sticky-cta"
      data-show={show}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        padding: "14px 20px",
        background: "rgba(1,9,45,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(82,159,237,0.25)",
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 420ms cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div
        style={{
          color: "var(--color-iced)",
          fontFamily: "var(--font-display, inherit)",
          fontSize: "0.9375rem",
          letterSpacing: "-0.005em",
          lineHeight: 1.25,
        }}
      >
        <span style={{ color: "var(--color-blue-300)", fontWeight: 700 }}>Pronto pra abrir cadastro?</span>{" "}
        <span style={{ opacity: 0.7 }}>Resposta em 1 dia útil.</span>
      </div>
      <a
        href={site.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flexShrink: 0,
          background: "var(--color-green)",
          color: "var(--color-petrol)",
          fontWeight: 700,
          fontSize: "0.9375rem",
          padding: "12px 22px",
          borderRadius: 4,
          textDecoration: "none",
          letterSpacing: "-0.005em",
          transition: "background 220ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-green-700)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-green)")}
      >
        Mandar CNPJ →
      </a>
    </div>
  );
}
