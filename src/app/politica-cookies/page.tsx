import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Quais cookies o site da Repon utiliza, para que servem e como você pode gerenciá-los.",
  alternates: { canonical: "/politica-cookies" },
};

export default function PoliticaCookiesPage() {
  return (
    <LegalPageLayout
      number="C1"
      label="Documento jurídico"
      title="Política de Cookies"
      subtitle="Tipos de cookies usados pela Repon, finalidades e como você gerencia suas preferências."
      updatedAt="25 de maio de 2026"
    >
      <h2>1. O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos de texto armazenados no seu navegador
        quando você visita um site. Eles permitem que o site reconheça o seu
        dispositivo em visitas futuras e ofereça funcionalidades essenciais e
        opcionais.
      </p>

      <h2>2. Quais cookies a Repon usa</h2>

      <h3>Essenciais (não exigem consentimento)</h3>
      <ul>
        <li>
          <strong>repon-cookie-consent:</strong> registra sua preferência sobre
          cookies opcionais. Persistente, expira após 12 meses. Sem este cookie o
          banner reaparece em toda visita.
        </li>
      </ul>

      <h3>Analytics (mediante consentimento)</h3>
      <ul>
        <li>
          <strong>Vercel Web Analytics</strong> (caso ativado): coleta métricas
          agregadas de páginas vistas, tempo de sessão e referrer. Não usa
          cookies identificadores nem rastreia entre sites.
        </li>
      </ul>

      <p>
        A Repon <strong>não utiliza</strong> cookies de publicidade, remarketing
        ou rastreamento comportamental.
      </p>

      <h2>3. Como gerenciar suas preferências</h2>
      <p>
        Ao acessar o site, você verá um banner permitindo escolher entre:
      </p>
      <ul>
        <li>
          <strong>Aceitar todos:</strong> permite cookies essenciais e
          analíticos.
        </li>
        <li>
          <strong>Apenas essenciais:</strong> permite somente o cookie de
          consentimento.
        </li>
      </ul>
      <p>
        Você pode revogar o consentimento a qualquer momento limpando os cookies
        do navegador ou via configurações do seu browser. Após limpar, o banner
        aparece novamente em sua próxima visita.
      </p>

      <h2>4. Cookies de terceiros</h2>
      <p>
        Não permitimos cookies de terceiros sem necessidade clara. Caso usemos
        integrações futuras (CRM, formulários externos, agendamento), esta
        política será atualizada.
      </p>

      <h2>5. Mais informações</h2>
      <p>
        Para detalhes sobre como tratamos dados pessoais coletados via cookies,
        consulte a{" "}
        <Link
          href="/politica-privacidade"
          className="link-underline"
          style={{ color: "var(--color-blue)" }}
        >
          Política de Privacidade
        </Link>
        .
      </p>

      <h2>6. Contato</h2>
      <p>
        Dúvidas sobre esta política podem ser enviadas ao Encarregado de
        Proteção de Dados:{" "}
        <a
          href="mailto:dpo@repondistribuidora.com"
          className="link-underline"
          style={{ color: "var(--color-blue)" }}
        >
          dpo@repondistribuidora.com
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
