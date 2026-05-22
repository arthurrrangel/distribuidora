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

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-iced/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-rp flex items-center justify-between h-20">
        <Link href="/" className="flex items-center" aria-label="Repon — página inicial">
          <span className="block">
            <Logo variant="blue" shape="full" priority width={136} height={40} />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] font-medium text-petrol hover:text-blue transition-colors duration-200"
              style={{ color: "var(--color-petrol)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={`mailto:${site.contact.emails.comercial}`}
            className="text-[0.8125rem] text-petrol-60 hover:text-petrol transition-colors"
            style={{ color: "var(--color-petrol-60)" }}
          >
            {site.contact.emails.comercial}
          </a>
          <Link href="/fornecedores" className="btn-primary text-[0.8125rem] py-2.5 px-4">
            Apresentação institucional
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 -mr-2"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <div className="w-6 h-px mb-1.5" style={{ background: "var(--color-petrol)" }} />
          <div className="w-6 h-px mb-1.5" style={{ background: "var(--color-petrol)" }} />
          <div className="w-6 h-px"        style={{ background: "var(--color-petrol)" }} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line" style={{ background: "var(--color-iced)" }}>
          <div className="container-rp py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium"
                style={{ color: "var(--color-petrol)" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.contact.emails.comercial}`}
              className="text-sm mt-2 break-all"
              style={{ color: "var(--color-petrol-60)" }}
            >
              {site.contact.emails.comercial}
            </a>
            <Link
              href="/fornecedores"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center mt-2"
            >
              Apresentação institucional
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
