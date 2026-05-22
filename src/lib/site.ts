/**
 * Dados institucionais oficiais da Repon.
 * Fonte: comprovantes CNPJ matriz e filial (Receita Federal) + CCM SP.
 * Atualizado: 22/05/2026.
 *
 * IMPORTANTE: dados sensíveis (faturamento, número de clientes ativos,
 * volumes específicos) NÃO são publicados aqui enquanto o enquadramento
 * tributário e os contratos com fornecedores não estiverem alinhados.
 * Substituir por dado verificável é melhor que inflar.
 */

export const site = {
  brand: {
    name: "Repon",
    legalName: "Repon Plataforma de Comércio Ltda.",
    slogan: "O fluxo que mantém seu negócio ativo.",
    tagline: "Distribuidora atacadista B2B",
    descriptor:
      "Centros logísticos em Santa Catarina e São Paulo, atendendo Sudeste e Sul.",
  },

  fiscal: {
    matriz: {
      cnpj: "54.563.438/0001-07",
      cnpjRaw: "54563438000107",
      abertura: "02/04/2024",
      role: "Matriz",
    },
    filial: {
      cnpj: "54.563.438/0002-98",
      cnpjRaw: "54563438000298",
      abertura: "12/02/2025",
      role: "Filial",
      ccm: "1.893.628-8",
    },
    cnaePrincipal: {
      code: "4693-1/00",
      label:
        "Comércio atacadista de mercadorias em geral, sem predominância de alimentos ou de insumos agropecuários",
    },
    cnaeAtacadoCount: 7,
    cnaeTotalCount: 14,
  },

  locations: [
    {
      slug: "sc",
      label: "Centro Logístico Sul",
      city: "Navegantes",
      state: "SC",
      address: "Rodovia BR-470 (Ingo Hering), 4449 — Machados",
      zip: "88371-624",
      partner: "Simplilog",
      role: "Matriz",
      mapPin: { x: 0.560, y: 0.715 },
      coords: { lat: -26.8985, lng: -48.6584 },
    },
    {
      slug: "sp",
      label: "Centro Logístico Sudeste",
      city: "São Paulo",
      state: "SP",
      address: "R. Antonio Clemente, 119 — Jardim São Paulo (Zona Norte)",
      zip: "02039-020",
      partner: "Centralize Hub",
      role: "Filial",
      mapPin: { x: 0.500, y: 0.420 },
      coords: { lat: -23.4978, lng: -46.6196 },
    },
  ] as const,

  coverage: {
    label: "Sudeste e Sul",
    states: ["SP", "RJ", "MG", "ES", "PR", "SC", "RS"],
  },

  contact: {
    phone: "(21) 99594-6491",
    phoneRaw: "5521995946491",
    whatsappUrl: "https://wa.me/5521995946491",
    emails: {
      comercial: "comercial@repondistribuidora.com",
      sac: "sac@repondistribuidora.com",
    },
    domain: "repondistribuidora.com",
    siteUrl: "https://distribuidora-two.vercel.app",
    businessHours: "Segunda a sexta, das 8h às 18h (horário comercial)",
    social: {
      instagram: "@repon.distribui",
      instagramUrl: "https://instagram.com/repon.distribui",
    },
  },

  verticals: [
    {
      slug: "papelaria-escritorio",
      number: "01",
      title: "Papelaria & Escritório",
      summary:
        "Material escolar, suprimentos de papelaria e equipamentos de escritório. Vertical âncora do mix — onde a Repon nasceu.",
      examples: "Cadernos, lápis, canetas, mochilas, kits escolares, agendas, blocos, pastas, calculadoras, grampeadores, organizadores.",
      cnae: ["46.47-8/01", "47.89-0/07"],
      topics: [
        "Material escolar e didático",
        "Acessórios de escrita e desenho",
        "Suprimentos de escritório",
        "Equipamentos e mobiliário leve",
      ],
    },
    {
      slug: "higiene-pessoal",
      number: "02",
      title: "Higiene Pessoal",
      summary:
        "Linha completa de higiene e perfumaria. Mix curado para o revendedor que já vende papelaria e quer expandir ticket.",
      examples: "Cremes dentais, escovas, sabonetes, shampoos, condicionadores, desodorantes, fraldas, papel higiênico, absorventes, perfumaria leve.",
      cnae: ["46.46-0/02", "47.72-5/00"],
      topics: [
        "Higiene oral e cabelos",
        "Cuidado corporal",
        "Perfumaria leve e cosméticos",
        "Higiene infantil",
      ],
    },
    {
      slug: "informatica",
      number: "03",
      title: "Informática",
      summary:
        "Suprimentos, periféricos e conectividade. Para loja técnica e papelaria com setor digital.",
      examples: "Mouses, teclados, fones de ouvido, cabos USB e HDMI, adaptadores, pendrives, cartões SD, capas de notebook, hubs.",
      cnae: ["46.51-6/01", "46.51-6/02", "47.51-2/01"],
      topics: [
        "Suprimentos de informática",
        "Acessórios e periféricos",
        "Cabos, adaptadores e conectividade",
        "Armazenamento e mídias",
      ],
    },
    {
      slug: "eletroeletronicos",
      number: "04",
      title: "Eletroeletrônicos",
      summary:
        "Eletroportáteis e áudio-vídeo de uso pessoal. Mix orientado para bazar expandido e papelaria com setor de eletro.",
      examples: "Caixas de som Bluetooth, fones sem fio, ventiladores portáteis, secadores, depiladores, barbeadores, lâmpadas, pilhas, carregadores.",
      cnae: ["46.49-4/01", "46.49-4/02", "47.53-9/00", "47.57-1/00"],
      topics: [
        "Pequenos eletrodomésticos",
        "Áudio e vídeo doméstico",
        "Equipamentos elétricos de uso pessoal",
        "Peças e acessórios",
      ],
    },
  ] as const,

  pillars: [
    {
      eyebrow: "Operação",
      title: "Dois centros logísticos estratégicos",
      body:
        "Operação integrada em Navegantes (SC) e São Paulo (SP), conectada por parceiros 3PL especializados. Sem CapEx morto em armazém, com capilaridade real Sudeste e Sul.",
    },
    {
      eyebrow: "Canal",
      title: "Estrutura B2B de atacado",
      body:
        "Atendimento dedicado a revendedores, papelarias, lojas técnicas e bazaristas. Negociação direta, sem o ruído de marketplace e sem disputa de centavo.",
    },
    {
      eyebrow: "Mix",
      title: "Quatro verticais, um cliente",
      body:
        "Papelaria, higiene, informática e eletroeletrônicos — categorias que o mesmo revendedor compra. Profundidade vertical, simplicidade no relacionamento.",
    },
  ],

  // ============================================================
  // O que a Repon faz, na prática — copy explícito
  // ============================================================
  whatWeDo: {
    headline: "Repon compra com a indústria, estoca em SC e SP, e vende direto para o revendedor.",
    summary:
      "Atuamos como o elo entre fabricantes e revendedores que não cabem no atendimento das grandes redes nem encontram condição saudável em marketplace. Sem intermediário, sem leilão de centavo, com NF na entrega.",
    points: [
      {
        title: "O que distribuímos",
        body: "Papelaria, material escolar, higiene pessoal, informática, eletroportáteis e bazar leve.",
      },
      {
        title: "Quem atendemos",
        body: "Revendedor PJ com CNPJ ativo — papelaria, loja escolar, mini-mercado, bazar e loja técnica.",
      },
      {
        title: "Como entregamos",
        body: "Pedido direto via WhatsApp ou catálogo. Despacho em até 48h. Sudeste em 3 a 5 dias úteis, Sul em 2 a 3.",
      },
    ],
  },

  // ============================================================
  // Como funciona — 3 etapas concretas
  // ============================================================
  howItWorks: [
    {
      step: "01",
      title: "Cadastro PJ",
      body: "CNPJ ativo enviado por WhatsApp ou e-mail. Validação interna em até 24h. Sem mensalidade, sem fidelidade.",
    },
    {
      step: "02",
      title: "Pedido direto",
      body: "Pedido mínimo de R$ 800. Faça pelo WhatsApp comercial ou pelo catálogo digital. Tabela de preços por faixa de volume.",
    },
    {
      step: "03",
      title: "Entrega e pagamento",
      body: "Despacho em até 48h. Pagamento via PIX, boleto à vista ou prazo de 21 dias para clientes recorrentes.",
    },
  ],

  // ============================================================
  // Para quem é — 3 perfis concretos
  // ============================================================
  audience: [
    {
      icon: "01",
      profile: "Papelaria de bairro",
      pitch: "Reposição quinzenal de mix completo (escolar + escritório + higiene + bazar) em ticket entre R$ 800 e R$ 5 mil.",
      pain: "Distribuidor grande não atende. Marketplace mata margem.",
    },
    {
      icon: "02",
      profile: "Loja escolar",
      pitch: "Mix didático e escolar consolidado, pedidos maiores na sazonal (jan/fev e jul) com prazo no boleto.",
      pain: "Volta às aulas exige condição comercial real e prazo de pagamento.",
    },
    {
      icon: "03",
      profile: "Bazar expandido",
      pitch: "Mix multi-categoria (escolar + higiene + informática + eletroportátil) em um único fornecedor, sem dispersar pedidos.",
      pain: "Trabalhar com 4 distribuidores diferentes é caro e fragmenta logística.",
    },
  ],

  numbers: [
    { value: "02",  label: "Centros logísticos", sub: "Navegantes/SC + São Paulo/SP" },
    { value: "07",  label: "Estados de cobertura",  sub: "Sudeste + Sul" },
    { value: "04",  label: "Verticais ativas",      sub: "Atacado direto B2B" },
    { value: "14",  label: "CNAEs registradas",     sub: "Atacado e varejo especializado" },
  ],
} as const;

export type VerticalSlug = (typeof site.verticals)[number]["slug"];
export type LocationSlug = (typeof site.locations)[number]["slug"];
