"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Headline com letras revelando palavra-a-palavra em sequência
 * conforme o usuário entra na seção. IntersectionObserver dispara o estado.
 * Graceful: sem JS, exibe o texto final estático.
 */
export function KineticHeadline({
  lines,
  color = "var(--color-iced)",
  accent = "var(--color-blue-300)",
  accentLine,
  className,
}: {
  lines: string[];
  color?: string;
  accent?: string;
  accentLine?: number;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wordCounter = 0;
  return (
    <h2 ref={ref} className={className} aria-label={lines.join(" ")}
        style={{ color }}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} style={{ display: "block", overflow: "hidden", color: accentLine === li ? accent : undefined }}>
            {words.map((w, wi) => {
              const i = wordCounter++;
              return (
                <span
                  key={`${li}-${wi}`}
                  aria-hidden
                  style={{
                    display: "inline-block",
                    transform: active ? "translateY(0) skewY(0deg)" : "translateY(110%) skewY(3deg)",
                    opacity: active ? 1 : 0,
                    transition: `transform 760ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, opacity 600ms ease ${i * 80}ms`,
                    willChange: "transform, opacity",
                    marginRight: wi < words.length - 1 ? "0.32em" : 0,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}
