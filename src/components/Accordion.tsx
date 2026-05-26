"use client";

import { useState, ReactNode } from "react";

/**
 * Accordion expansível pra FAQ longo.
 * Animação suave de altura + chevron rotativo.
 */
export function Accordion({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="accordion-item"
      style={{
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "1.5rem 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          color: "var(--color-petrol)",
          transition: "color 220ms ease",
        }}
      >
        <span
          className="font-display"
          style={{
            fontWeight: 500,
            fontSize: "clamp(1.0625rem, 1.4vw, 1.1875rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          }}
        >
          {question}
        </span>
        <span
          aria-hidden
          style={{
            flexShrink: 0,
            width: 16,
            height: 16,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
            color: "var(--color-blue)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5V14.5M1.5 8H14.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "800px" : 0,
          overflow: "hidden",
          transition: "max-height 420ms cubic-bezier(0.22,1,0.36,1), opacity 280ms ease",
          opacity: open ? 1 : 0,
        }}
      >
        <div
          style={{
            paddingBottom: "1.75rem",
            paddingRight: "2rem",
            fontSize: "0.9375rem",
            lineHeight: 1.65,
            color: "var(--color-ink-700)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
