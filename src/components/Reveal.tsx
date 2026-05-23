"use client";

import type { ElementType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

/**
 * Reveal sutil quando o filho entra em viewport.
 * Translate Y + fade. Once = true (não re-anima).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const TagAny = Tag as ElementType;
  return (
    <TagAny
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 700ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms, transform 700ms cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </TagAny>
  );
}
