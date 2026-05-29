"use client";
import { useRouter } from "next/navigation";
import Link, { type LinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Link com View Transition API (Chromium). Faz cross-fade entre páginas.
 * Em navegadores sem suporte, faz nav normal do Next.
 */
export const ViewTransitionLink = forwardRef<HTMLAnchorElement, Props>(function ViewTransitionLink(
  { href, onClick, prefetch = true, ...rest }, ref
) {
  const router = useRouter();
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (typeof href !== "string") return;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    const startVT = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
    if (typeof startVT === "function") {
      e.preventDefault();
      startVT.call(document, () => { router.push(href); });
    }
  };
  return <Link ref={ref} href={href} prefetch={prefetch} onClick={handleClick} {...rest} />;
});
