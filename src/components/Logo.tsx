import Image from "next/image";

/**
 * Logo oficial Repon.
 * Variantes oficiais (Apresentação Pavloworks 2026):
 *   - blue    : azul Repon #0464D5 (default, sobre fundos claros/petrol)
 *   - petrol  : azul escuro #01092D (sobre fundos iced/verde)
 *   - white   : branco/iced (sobre fundos azul/petrol)
 *   - green   : verde #A6D97A (variante secundária)
 *
 * Formato:
 *   - full : logotipo completo "Repon"
 *   - mark : símbolo "R" (uso compacto)
 */

type LogoVariant = "blue" | "petrol" | "white" | "green";
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
  blue:   { full: "/repon-logo-blue.svg",   mark: "/repon-mark-blue.svg"   },
  petrol: { full: "/repon-logo-petrol.svg", mark: "/repon-mark-petrol.svg" },
  white:  { full: "/repon-logo-white.svg",  mark: "/repon-mark-white.svg"  },
  green:  { full: "/repon-logo-green.svg",  mark: "/repon-mark-green.svg"  },
};

export function Logo({
  variant = "blue",
  shape = "full",
  className = "",
  priority = false,
  width,
  height,
}: LogoProps) {
  const src = SRC_MAP[variant][shape];
  const defaultWidth  = shape === "full" ? 120 : 32;
  const defaultHeight = shape === "full" ? 36  : 32;

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
