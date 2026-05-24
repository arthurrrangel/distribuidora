"use client";

import { useRef, MouseEvent, ReactNode } from "react";

/**
 * Wrapper magnético — segue sutilmente o cursor.
 * Em mobile/touch, vira passthrough (sem hover).
 */
export function MagneticButton({
  children,
  strength = 10,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (!innerRef.current) return;
    const rect = (e.currentTarget as HTMLSpanElement).getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    innerRef.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = "translate(0, 0)";
  };

  return (
    <span
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ display: "inline-block" }}
    >
      <span
        ref={innerRef}
        style={{
          display: "inline-block",
          transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
}
