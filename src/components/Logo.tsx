// src/components/Logo.tsx
// Logo Repon oficial — usa os SVGs em /public/.
// Variantes: azul (default), branca (sobre escuro), escura.
// Formato: full (logotipo Repon) ou mark (apenas R).

import Image from "next/image";

type LogoVariant = "azul" | "branca" | "escura";
type LogoShape = "full" | "mark";

interface LogoProps {
  variant?: LogoVariant;
  shape?: LogoShape;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

const SRC_MAP: Record<LogoVariant, Record<LogoShape, string>> = {
  azul: {
    full: "/repon-logo-azul.svg",
    mark: "/repon-logo-azul-r.svg",
  },
  branca: {
    full: "/repon-logo-branca.svg",
    mark: "/repon-logo-branca-r.svg",
  },
  escura: {
    full: "/repon-logo-escuro.svg",
    mark: "/repon-logo-escuro-r.svg",
  },
};

export function Logo({
  variant = "azul",
  shape = "full",
  className = "",
  priority = false,
  width,
  height,
}: LogoProps) {
  const src = SRC_MAP[variant][shape];
  const defaultWidth = shape === "full" ? 96 : 24;
  const defaultHeight = shape === "full" ? 28 : 24;

  return (
    <Image
      src={src}
      alt="Repon"
      width={width ?? defaultWidth}
      height={height ?? defaultHeight}
      priority={priority}
      className={className}
    />
  );
}
