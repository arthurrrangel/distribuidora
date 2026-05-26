import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do site e dos serviços de distribuição atacadista B2B da Repon.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <LegalPageLayout
      number="T1"
      label="Documento jurídico"
      title="Termos de Uso"
      subtitle="Condições aplicáveis ao acesso ao site e à contratação dos serviços de distribuição atacadista B2B da Repon."
      updatedAt="25 de maio de 2026"
    >
      <h2>1. Aceitação</h2>
      <p>
        Ao acessar ou utilizar o site {site.contact.siteUrl} e os canais oficiais
        de atendimento da {site.brand.legalName} (CNPJ {site.fiscal.matriz.cnpj}),
        você declara ter lido, compreendido e aceito integralmente estes Termos de
        Uso e a{" "}
        <Link
          href="/politica-privacidade"
          className="link-underline"
          style={{ color: "var(--color-blue)" }}
        >
          Política de Privacidade
        </Link>
        .
      </p>

      <h2>2. Natureza do serviço</h2>
      <p>
        A Repon é uma distribuidora atacadista B2B. Comercializa produtos
        exclusivamente para pessoa jurídica com CNPJ ativo, CNAE compatível com
        revenda e cadastro aprovado em processo interno de validação.
      </p>
      <p>
        Não vendemos diretamente ao consumidor final. Pedidos sem cadastro PJ
        aprovado não são processados.
      </p>

      <h2>3. Cadastro</h2>
      <p>
        O cadastro é gratuito e sem mensalidade. A aprovação depende da análise
        documental e fica a critério exclusivo da Repon. A Repon pode recusar
        cadastro sem necessidade de justificativa formal, sempre dentro do
        permitido em lei.
      </p>

      <h2>4. Pedidos e condições comerciais</h2>
      <ul>
        <li>
          Pedido mínimo: R$ 800 no primeiro pedido. Frete subsidiado em pedidos
          acima de R$ 1.500.
        </li>
        <li>
          Forma de pagamento: PIX e boleto à vista no primeiro pedido. Boleto com
          prazo de 21 dias a partir do segundo pedido, para clientes recorrentes
          em situação cadastral regular.
        </li>
        <li>
          Despacho em até 48 horas úteis após confirmação de pagamento ou
          aprovação de prazo.
        </li>
        <li>
          Prazos de entrega são estimados a partir do despacho e podem variar
          conforme transportadora e região.
        </li>
        <li>
          Preços, condições e disponibilidade de produto podem ser alterados sem
          aviso prévio. A condição válida é a confirmada no momento da emissão da
          ordem de pedido.
        </li>
      </ul>

      <h2>5. Política comercial e MAP</h2>
      <p>
        A Repon respeita política de Minimum Advertised Price (MAP) acordada com
        cada fornecedor. O cliente revendedor que receber produto sob política de
        MAP compromete-se a respeitar o preço-piso de revenda anunciada.
      </p>
      <p>
        O descumprimento de MAP pode resultar em suspensão do cadastro a critério
        da Repon ou do fornecedor.
      </p>

      <h2>6. Devolução, troca e cancelamento</h2>
      <ul>
        <li>
          Trocas e devoluções por avaria de transporte devem ser comunicadas em
          até 48 horas úteis após o recebimento, com fotos do produto e da
          embalagem.
        </li>
        <li>
          Devolução por divergência de pedido (item errado, quantidade incorreta)
          em até 5 dias úteis após o recebimento, com NF de devolução emitida
          pelo cliente.
        </li>
        <li>
          Cancelamento de pedido antes do despacho: sem custo. Após o despacho: o
          cliente arca com o frete de retorno.
        </li>
        <li>
          O cliente PJ é considerado profissional e não goza do direito de
          arrependimento previsto no CDC para consumidor pessoa física.
        </li>
      </ul>

      <h2>7. Inadimplência</h2>
      <p>
        Inadimplência superior a 30 dias pode resultar em suspensão do cadastro,
        comunicação a bureaus de crédito e protesto de título nos cartórios
        competentes, conforme legislação vigente.
      </p>

      <h2>8. Propriedade intelectual</h2>
      <p>
        Marca, logotipo, conteúdo, imagens, layout e código deste site são de
        propriedade da Repon ou de seus licenciantes. É proibida reprodução total
        ou parcial sem autorização expressa por escrito.
      </p>

      <h2>9. Limitação de responsabilidade</h2>
      <p>
        A Repon não se responsabiliza por danos indiretos, lucros cessantes ou
        perda de oportunidades comerciais decorrentes do uso do site, salvo nos
        casos previstos em lei.
      </p>

      <h2>10. Suspensão e encerramento</h2>
      <p>
        A Repon pode suspender ou encerrar o cadastro de cliente que descumprir
        estes Termos, a política comercial, política de MAP, ou que apresentar
        comportamento incompatível com a operação B2B.
      </p>

      <h2>11. Alterações dos Termos</h2>
      <p>
        Estes Termos podem ser atualizados a qualquer tempo. Mudanças relevantes
        serão comunicadas por e-mail aos clientes ativos. O uso continuado do
        site após alteração implica aceitação.
      </p>

      <h2>12. Lei aplicável e foro</h2>
      <p>
        Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da
        Comarca de Navegantes/SC como competente para dirimir controvérsias,
        renunciando-se a qualquer outro, por mais privilegiado que seja.
      </p>

      <h2>13. Contato</h2>
      <p>
        Dúvidas sobre estes Termos podem ser enviadas para{" "}
        <a
          href={`mailto:${site.contact.emails.comercial}`}
          className="link-underline"
          style={{ color: "var(--color-blue)" }}
        >
          {site.contact.emails.comercial}
        </a>
        .
      </p>
    </LegalPageLayout>
  );
}
