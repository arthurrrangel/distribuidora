"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Conta de 0 até `value` quando entra em viewport.
 * Mantém leading zeros se `pad` for true (ex: "02" → conta "00, 01, 02").
 * Use só pra números pequenos (até 99) — pra valores grandes usa formato seco.
 */
export function Counter({
  value,
  duration = 1400,
  pad = true,
}: {
  value: string;
  duration?: number;
  pad?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(pad ? "00" : "0");
  const target = parseInt(value, 10);
  const targetLen = value.length;

  useEffect(() => {
    if (!ref.current) return;
    if (isNaN(target)) {
      setDisplay(value);
      return;
    }

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out-quart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(eased * target);
            const str = pad
              ? String(current).padStart(targetLen, "0")
              : String(current);
            setDisplay(str);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, pad, value, targetLen]);

  return <span ref={ref}>{display}</span>;
}
