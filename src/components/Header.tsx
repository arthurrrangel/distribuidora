"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

const navItems = [
  { href: "/sobre",        label: "A Repon" },
  { href: "/verticais",    label: "Verticais" },
  { href: "/fornecedores", label: "Fornecedores" },
  { href: "/contato",      label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll quando menu mobile aberto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "bg-iced/85 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-rp flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center" aria-label="Repon — página inicial" onClick={() => setOpen(false)}>
            <Logo variant="blue" shape="full" priority width={120} height={36} />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] font-medium hover:text-blue transition-colors duration-200"
                style={{ color: "var(--color-petrol)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`mailto:${site.contact.emails.comercial}`}
              className="text-[0.8125rem] hover:text-petrol transition-colors"
              style={{ color: "var(--color-petrol-60)" }}
            >
              {site.contact.emails.comercial}
            </a>
            <Link href="/fornecedores" className="btn-primary text-[0.8125rem] py-2.5 px-4">
              Apresentação
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span
              className="absolute block w-6 h-[1.5px] transition-transform duration-300"
              style={{
                background: "var(--color-petrol)",
                transform: open ? "rotate(45deg)" : "translateY(-6px)",
              }}
            />
            <span
              className="absolute block w-6 h-[1.5px] transition-opacity duration-300"
              style={{
                background: "var(--color-petrol)",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="absolute block w-6 h-[1.5px] transition-transform duration-300"
              style={{
                background: "var(--color-petrol)",
                transform: open ? "rotate(-45deg)" : "translateY(6px)",
              }}
            />
          </button>
        </div>
      </header>

      {/* Menu mobile slide-in premium */}
      <div
        className="md:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "var(--color-petrol)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: open
            ? "transform 480ms cubic-bezier(0.25, 1, 0.5, 1), opacity 280ms ease"
            : "transform 380ms cubic-bezier(0.76, 0, 0.24, 1), opacity 200ms ease 100ms",
        }}
      >
        <div className="container-rp pt-24 pb-12 h-full flex flex-col">
          <nav className="flex flex-col gap-1 mt-8">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 border-b font-display"
                style={{
                  borderColor: "var(--color-petrol-80)",
                  color: "var(--color-iced)",
                  fontSize: "1.875rem",
                  fontWeight: 500,
                  letterSpacing: "-0.022em",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 500ms ease ${100 + i * 80}ms, transform 500ms cubic-bezier(0.25, 1, 0.5, 1) ${100 + i * 80}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-12 flex flex-col gap-5">
            <a
              href={`mailto:${site.contact.emails.comercial}`}
              className="text-[0.9375rem] break-all"
              style={{ color: "rgba(243,241,237,0.82)" }}
              onClick={() => setOpen(false)}
            >
              {site.contact.emails.comercial}
            </a>
            <p className="text-[0.875rem] font-mono" style={{ color: "rgba(243,241,237,0.65)" }}>
              {site.contact.phone}
            </p>
            <a
              href={site.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.9375rem] font-bold mt-4"
              style={{
                background: "var(--color-blue)",
                color: "var(--color-iced)",
              }}
            >
              Falar pelo WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
