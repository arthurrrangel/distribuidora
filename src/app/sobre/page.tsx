import { redirect } from "next/navigation";

/**
 * /sobre foi migrado pra / (home).
 * Redirect permanente 308 — preserva SEO e qualquer link externo apontando pra /sobre.
 */
export default function SobreRedirect() {
  redirect("/");
}
