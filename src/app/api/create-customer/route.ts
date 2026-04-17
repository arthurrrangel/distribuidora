// src/app/api/create-customer/route.ts
import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const API_VERSION = "2024-01"; // Pode usar a versão mais recente que estiver utilizando

// Tipagem dos dados recebidos do frontend
interface EnderecoInput {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface CustomerRegistrationInput {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  nomeResponsavel: string;
  whatsapp: string;
  email: string;
  senha: string;
  endereco: EnderecoInput;
}

export async function POST(request: NextRequest) {
  // Validar configuração
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Configuração do Shopify não encontrada" },
      { status: 500 },
    );
  }

  try {
    const body: CustomerRegistrationInput = await request.json();

    // Separar o nome e sobrenome do responsável
    const nameParts = body.nomeResponsavel.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || firstName;

    // Montar o endereço no padrão Shopify
    const address1 = `${body.endereco.rua}, ${body.endereco.numero}`;
    const address2 = body.endereco.complemento || body.endereco.bairro; // Shopify não tem campo específico de bairro, enviamos no address2

    // Montar o Payload para a Admin API REST
    // A API REST permite enviar a senha, endereço e metafields em uma única requisição
    const payload = {
      customer: {
        first_name: firstName,
        last_name: lastName,
        email: body.email,
        phone: `+55${body.whatsapp}`, // Assumindo que o whatsapp vem limpo só com números
        password: body.senha,
        password_confirmation: body.senha,
        send_email_welcome: true, // Opcional: envia o e-mail de boas-vindas da Shopify
        addresses: [
          {
            address1: address1,
            address2: address2,
            city: body.endereco.cidade,
            province: body.endereco.uf,
            country: "BR",
            zip: body.endereco.cep,
            company: body.razaoSocial,
            phone: `+55${body.whatsapp}`,
            first_name: firstName,
            last_name: lastName,
          },
        ],
        metafields: [
          {
            namespace: "custom",
            key: "cnpj",
            value: body.cnpj,
            type: "single_line_text_field",
          },
          {
            namespace: "custom",
            key: "razao_social",
            value: body.razaoSocial,
            type: "single_line_text_field",
          },
          {
            namespace: "custom",
            key: "nome_fantasia",
            value: body.nomeFantasia,
            type: "single_line_text_field",
          },
          {
            namespace: "custom",
            key: "inscricao_estadual",
            value: body.inscricaoEstadual || "ISENTO",
            type: "single_line_text_field",
          },
        ],
      },
    };

    // Fazer request para Shopify Admin API (Endpoint REST)
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/customers.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      // O Shopify REST retorna erros no objeto 'errors'
      console.error("Shopify API error:", data.errors);

      // Tratamento para extrair a mensagem de erro do objeto (ex: "email: ['has already been taken']")
      let errorMessage = "Erro ao criar conta.";
      if (data.errors) {
        const errorKeys = Object.keys(data.errors);
        if (errorKeys.length > 0) {
          const firstKey = errorKeys[0];
          errorMessage = `${firstKey} ${data.errors[firstKey][0]}`;
        }
      }

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Cliente criado com sucesso
    const newCustomer = data.customer;

    return NextResponse.json({
      success: true,
      customer: {
        id: newCustomer.id, // ID no formato numérico (REST)
        email: newCustomer.email,
        firstName: newCustomer.first_name,
        lastName: newCustomer.last_name,
      },
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao criar cliente" },
      { status: 500 },
    );
  }
}
