import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Repon coleta, usa e protege dados pessoais e empresariais, em conformidade com a LGPD (Lei 13.709/2018).",
  alternates: { canonical: "/politica-privacidade" },
};

export default function PoliticaPrivacidadePage() {
  return (
    <LegalPageLayout
      number="P1"
      label="Documento jurídico"
      title="Política de Privacidade"
      subtitle="Como a Repon coleta, usa e protege dados em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
      updatedAt="25 de maio de 2026"
    >
      <h2>1. Quem somos</h2>
      <p>
        Esta política aplica-se a{" "}
        <strong>{site.brand.legalName}</strong>, inscrita no CNPJ sob nº{" "}
        {site.fiscal.matriz.cnpj} (matriz) e {site.fiscal.filial.cnpj}{" "}
        (filial), com sede em {site.locations[0].address}, {site.locations[0].city}/
        {site.locations[0].state}, CEP {site.locations[0].zip}.
      </p>
      <p>
        Atuamos como <strong>controladora</strong> dos dados pessoais coletados
        através deste site e dos canais de atendimento comercial (WhatsApp, e-mail
        e telefone).
      </p>

      <h2>2. Dados que coletamos</h2>
      <p>Em razão da nossa operação atacadista B2B, coletamos:</p>
      <ul>
        <li>
          <strong>Dados cadastrais empresariais:</strong> CNPJ, razão social, nome
          fantasia, inscrição estadual ou municipal, endereço de entrega e
          faturamento.
        </li>
        <li>
          <strong>Dados de contato comercial:</strong> nome completo, cargo ou
          função, telefone fixo ou celular, e-mail corporativo, perfil profissional.
        </li>
        <li>
          <strong>Conteúdo de conversas e formulários:</strong> mensagens enviadas
          via WhatsApp, e-mail comercial ou formulário do site.
        </li>
        <li>
          <strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo,
          navegador, páginas visitadas, tempo de sessão, fonte do tráfego
          (mediante consentimento de cookies).
        </li>
      </ul>

      <h2>3. Para que usamos seus dados</h2>
      <p>
        Tratamos dados pessoais e empresariais exclusivamente para as seguintes
        finalidades, com as respectivas bases legais previstas no artigo 7º da
        LGPD:
      </p>
      <ul>
        <li>
          <strong>Cadastro e validação de PJ:</strong> verificação da regularidade
          do CNPJ, compatibilidade de CNAE com revenda. Base legal: execução de
          contrato e procedimentos preliminares (art. 7º, V).
        </li>
        <li>
          <strong>Atendimento comercial:</strong> envio de tabela, catálogo,
          condição comercial e resposta a dúvidas. Base legal: execução de
          contrato (art. 7º, V).
        </li>
        <li>
          <strong>Emissão fiscal:</strong> faturamento, emissão de NF-e,
          recolhimento de tributos. Base legal: cumprimento de obrigação legal
          (art. 7º, II).
        </li>
        <li>
          <strong>Logística e expedição:</strong> compartilhamento de endereço e
          contato com transportadora e operador logístico parceiro. Base legal:
          execução de contrato.
        </li>
        <li>
          <strong>Prevenção a fraude e inadimplência:</strong> consulta a bureaus
          de crédito quando aplicável. Base legal: legítimo interesse (art. 7º, IX).
        </li>
        <li>
          <strong>Análise agregada e melhoria do site:</strong> métricas anônimas
          de uso. Base legal: legítimo interesse (mediante consentimento de
          cookies).
        </li>
      </ul>

      <h2>4. Com quem compartilhamos</h2>
      <p>
        Compartilhamos dados estritamente com terceiros essenciais à operação:
      </p>
      <ul>
        <li>
          <strong>Operadores logísticos (3PL):</strong> Simplilog (CD Navegantes/
          SC) e Centralize Hub (CD São Paulo/SP), para armazenagem e expedição.
        </li>
        <li>
          <strong>Transportadoras:</strong> dados de entrega para conclusão de
          remessa.
        </li>
        <li>
          <strong>Instituições financeiras:</strong> dados para emissão de boleto e
          conciliação de pagamento.
        </li>
        <li>
          <strong>Plataformas de comunicação:</strong> WhatsApp Business (Meta),
          conforme política do próprio aplicativo.
        </li>
        <li>
          <strong>Autoridades:</strong> mediante ordem judicial, requisição
          legítima ou cumprimento de obrigação legal.
        </li>
      </ul>
      <p>
        <strong>Não vendemos, alugamos ou cedemos dados</strong> para fins de
        marketing de terceiros.
      </p>

      <h2>5. Tempo de armazenamento</h2>
      <p>
        Mantemos dados pelo período necessário ao cumprimento da finalidade:
      </p>
      <ul>
        <li>
          Dados cadastrais e fiscais: pelo prazo de guarda obrigatório legal
          (mínimo 5 anos para escrituração).
        </li>
        <li>
          Dados de contato sem pedido finalizado: até 24 meses após o último
          contato.
        </li>
        <li>
          Conteúdo de conversas: 18 meses, salvo necessidade legal de retenção
          adicional.
        </li>
      </ul>

      <h2>6. Seus direitos como titular</h2>
      <p>
        Você (ou o representante legal da empresa cliente) tem os seguintes
        direitos garantidos pela LGPD (art. 18):
      </p>
      <ul>
        <li>Confirmação da existência de tratamento.</li>
        <li>Acesso aos dados tratados.</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
        <li>
          Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados
          em desconformidade.
        </li>
        <li>Portabilidade dos dados.</li>
        <li>Eliminação dos dados tratados com seu consentimento.</li>
        <li>Informação sobre compartilhamentos.</li>
        <li>Revogação do consentimento.</li>
      </ul>

      <h2>7. Como exercer seus direitos</h2>
      <p>
        Solicitações devem ser enviadas ao Encarregado de Proteção de Dados (DPO)
        pelo e-mail{" "}
        <a
          href="mailto:dpo@repondistribuidora.com"
          className="link-underline"
          style={{ color: "var(--color-blue)" }}
        >
          dpo@repondistribuidora.com
        </a>
        . Responderemos em até 15 dias úteis.
      </p>

      <h2>8. Segurança</h2>
      <p>
        Aplicamos medidas técnicas e administrativas para proteger dados contra
        acesso não autorizado, perda, alteração ou destruição. Isso inclui
        criptografia em trânsito (TLS), controle de acesso por função, backup
        regular e treinamento da equipe.
      </p>
      <p>
        Nenhum sistema é 100% seguro. Em caso de incidente que envolva risco aos
        titulares, comunicaremos a Autoridade Nacional de Proteção de Dados
        (ANPD) e os titulares afetados no prazo legal.
      </p>

      <h2>9. Cookies</h2>
      <p>
        O uso de cookies está detalhado na{" "}
        <Link href="/politica-cookies" className="link-underline" style={{ color: "var(--color-blue)" }}>
          Política de Cookies
        </Link>
        .
      </p>

      <h2>10. Crianças e adolescentes</h2>
      <p>
        Nosso serviço é destinado exclusivamente a pessoas jurídicas e a
        representantes maiores de 18 anos. Não coletamos intencionalmente dados de
        menores de idade.
      </p>

      <h2>11. Atualizações desta política</h2>
      <p>
        Esta política pode ser atualizada periodicamente. Mudanças relevantes
        serão comunicadas por e-mail aos clientes ativos e publicadas com nova
        data de versão acima.
      </p>

      <h2>12. Contato</h2>
      <p>
        Encarregado de Proteção de Dados:{" "}
        <a
          href="mailto:dpo@repondistribuidora.com"
          className="link-underline"
          style={{ color: "var(--color-blue)" }}
        >
          dpo@repondistribuidora.com
        </a>
        <br />
        Comercial:{" "}
        <a
          href={`mailto:${site.contact.emails.comercial}`}
          className="link-underline"
          style={{ color: "var(--color-blue)" }}
        >
          {site.contact.emails.comercial}
        </a>
        <br />
        Endereço: {site.locations[0].address}, {site.locations[0].city}/
        {site.locations[0].state}, CEP {site.locations[0].zip}.
      </p>
    </LegalPageLayout>
  );
}
