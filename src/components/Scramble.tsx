"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Text scramble: substitui caracteres aleatórios até revelar o texto final.
 * Roda uma vez no mount. Caracteres não-alfanuméricos passam direto.
 */
export function Scramble({
  text,
  duration = 900,
  className,
  style,
}: {
  text: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chars = text.split("");
    const reveals = chars.map((c, i) =>
      /[a-zA-ZÀ-ÿ0-9]/.test(c) ? Math.floor((i / chars.length) * duration) + 80 : 0
    );
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const next = chars.map((c, i) =>
        elapsed > reveals[i] ? c : (/[a-zA-ZÀ-ÿ0-9]/.test(c) ? CHARS[Math.floor(Math.random() * CHARS.length)] : c)
      ).join("");
      setOut(next);
      if (elapsed < duration + 200) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return <span ref={ref} className={className} style={style} aria-label={text}>{out}</span>;
}
