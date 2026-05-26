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
      address: "Rodovia BR-470 (Ingo Hering), 4449, Machados",
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
      address: "R. Antonio Clemente, 119, Jardim São Paulo (Zona Norte)",
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
      dpo: "dpo@repondistribuidora.com",
      ouvidoria: "ouvidoria@repondistribuidora.com",
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
        "Material escolar, suprimentos de papelaria e equipamentos de escritório. Vertical âncora do mix. Onde a Repon nasceu.",
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
        "Papelaria, higiene, informática e eletroeletrônicos. Categorias que o mesmo revendedor compra. Profundidade vertical, simplicidade no relacionamento.",
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
        body: "Revendedor PJ com CNPJ ativo. Atende papelaria, loja escolar, mini-mercado, bazar e loja técnica.",
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
  // FAQ — perguntas comuns do comprador B2B (28 perguntas, agrupadas)
  // ============================================================
  faqCategories: [
    {
      id: "cadastro",
      label: "Cadastro e PJ",
      title: "Antes de comprar.",
      items: [
        {
          q: "Qual a documentação necessária para o cadastro?",
          a: "Apenas CNPJ ativo com CNAE compatível com revenda. Validamos pela Receita Federal em até 24 horas úteis. Sem taxa, sem mensalidade.",
        },
        {
          q: "Aceitam MEI?",
          a: "Sim, desde que o CNAE registrado seja compatível com revenda. Mande o CNPJ pelo WhatsApp e validamos em até 24h.",
        },
        {
          q: "Vendem para pessoa física?",
          a: "Não. A Repon opera exclusivamente B2B. Toda venda exige cadastro PJ com CNPJ ativo.",
        },
        {
          q: "Posso ter mais de um CNPJ no mesmo cadastro?",
          a: "Sim. Cada CNPJ é uma conta separada com tabela e histórico próprios, mas pode ser administrada pela mesma pessoa.",
        },
        {
          q: "O cadastro tem prazo de validade?",
          a: "Cadastros ativos não expiram. Cadastros sem pedido por 24 meses são marcados como inativos e exigem revalidação rápida no próximo contato.",
        },
      ],
    },
    {
      id: "comercial",
      label: "Comercial",
      title: "Pedido e tabela.",
      items: [
        {
          q: "Qual o pedido mínimo?",
          a: "R$ 800 no primeiro pedido. A partir de R$ 1.500, frete subsidiado para Sudeste e Sul.",
        },
        {
          q: "Como recebo a tabela de preços?",
          a: "Após cadastro PJ aprovado, enviamos tabela em PDF pelo WhatsApp ou e-mail. Tabela por faixa de pedido, separada por vertical.",
        },
        {
          q: "A tabela varia por porte de cliente?",
          a: "Sim. Há faixa de tabela por volume mensal de compra. Quanto mais consolidado o pedido, melhor a condição.",
        },
        {
          q: "Posso negociar preço fora da tabela?",
          a: "Em pedidos consolidados acima de R$ 5.000 com mix definido, sim. A negociação é feita com o comercial pelo WhatsApp.",
        },
        {
          q: "Como faço o pedido?",
          a: "Pelo WhatsApp comercial, com a tabela em mãos. Confirmamos disponibilidade, emitimos a proforma, você aprova e segue para faturamento.",
        },
      ],
    },
    {
      id: "logistica",
      label: "Logística",
      title: "Prazo e entrega.",
      items: [
        {
          q: "Qual o prazo de despacho?",
          a: "Até 48 horas úteis após confirmação de pagamento ou aprovação de prazo.",
        },
        {
          q: "Qual o prazo de entrega após o despacho?",
          a: "Sul (PR, SC, RS): 2 a 3 dias úteis. Sudeste (SP, RJ, MG, ES): 3 a 5 dias úteis. Capitais costumam ser mais rápidas que interior.",
        },
        {
          q: "Vocês atendem fora do Sudeste e Sul?",
          a: "A operação está focada nessas duas regiões. Para outras regiões mande o CNPJ pra avaliarmos caso a caso.",
        },
        {
          q: "Qual transportadora vocês usam?",
          a: "Trabalhamos com múltiplas transportadoras conforme destino. A definição é feita pela operação logística (3PL) buscando melhor prazo e custo.",
        },
        {
          q: "Recebo código de rastreio?",
          a: "Sim. O código é enviado pelo mesmo canal do pedido (WhatsApp ou e-mail) no momento do despacho.",
        },
        {
          q: "O que faço se o produto chegar com avaria?",
          a: "Comunique em até 48h úteis pelo WhatsApp ou pelo SAC, com fotos do produto e da embalagem. Avaliamos e fazemos a troca ou devolução com custo coberto.",
        },
      ],
    },
    {
      id: "pagamento",
      label: "Pagamento e fiscal",
      title: "Como você paga.",
      items: [
        {
          q: "Quais as formas de pagamento?",
          a: "PIX e boleto à vista no primeiro pedido. A partir do segundo pedido, boleto com prazo de 21 dias para clientes recorrentes em situação cadastral regular.",
        },
        {
          q: "Existe taxa de boleto?",
          a: "Não cobramos taxa adicional. O valor do boleto é exatamente o valor do pedido.",
        },
        {
          q: "Como funciona a emissão de nota fiscal?",
          a: "Toda venda gera NF-e com destaque de ICMS conforme legislação. A nota é emitida no momento do despacho.",
        },
        {
          q: "E ICMS-ST?",
          a: "Repassamos ICMS-ST conforme regime tributário do destinatário e estado de destino. A composição vem detalhada na NF-e.",
        },
        {
          q: "O que acontece em caso de inadimplência?",
          a: "Suspensão de novos pedidos até regularização. Após 30 dias, comunicação a bureaus de crédito. Após 60 dias, protesto do título nos cartórios competentes.",
        },
      ],
    },
    {
      id: "catalogo",
      label: "Catálogo e produto",
      title: "O que vendemos.",
      items: [
        {
          q: "Quais categorias vocês têm?",
          a: "Quatro verticais ativas: papelaria e escritório, higiene pessoal, informática e eletroportátil. Veja detalhes na página de verticais.",
        },
        {
          q: "Vocês trabalham com marca X?",
          a: "Temos relacionamento direto com várias indústrias. Consulta de marca específica é feita pelo WhatsApp comercial, pois o mix varia por vertical e por mês.",
        },
        {
          q: "Qual a profundidade do mix?",
          a: "Curado, não pulverizado. Selecionamos SKUs com giro alto e que fazem sentido para revenda em loja física e marketplace.",
        },
        {
          q: "Posso solicitar produto que não está na tabela?",
          a: "Sob consulta. Pedidos não recorrentes podem ser atendidos via importação parceira ou redirecionamento para indústria conforme volume.",
        },
      ],
    },
    {
      id: "operacao",
      label: "Política e operação",
      title: "Como operamos.",
      items: [
        {
          q: "Vocês competem com revendedor em marketplace?",
          a: "Não. A Repon não vende em marketplace genérico. Atende exclusivamente B2B PJ por canal direto.",
        },
        {
          q: "Vocês respeitam política de MAP?",
          a: "Sim. Respeito formal a MAP (Minimum Advertised Price) em contrato com cada indústria. O preço de revenda anunciado é protegido em todos os pontos de contato.",
        },
        {
          q: "Como funciona a representação de marcas?",
          a: "Avaliamos novas representações nas quatro verticais ativas. Política de MAP formalizada em contrato. Apresentação institucional enviada por e-mail mediante contato.",
        },
      ],
    },
  ],


  // ============================================================
  // Para quem é — 3 perfis concretos
  // ============================================================
  audience: [
    {
      icon: "01",
      profile: "Reposição contínua",
      pitch: "Pedido recorrente quinzenal ou mensal, mix amplo, ticket de R$ 500 a R$ 5 mil. Papelaria, bazar, conveniência, presente, mini-mercado, qualquer loja física que abastece o tempo todo.",
      pain: "Distribuidor grande exige volume que loja pequena não dá. Marketplace mata margem.",
    },
    {
      icon: "02",
      profile: "Compra sazonal",
      pitch: "Pedidos grandes em janelas curtas: volta às aulas, fim de ano, datas comemorativas. Condição comercial e prazo no boleto pra encaixar no fluxo de caixa.",
      pain: "Sazonal exige capital de giro que a loja não tem na hora de comprar.",
    },
    {
      icon: "03",
      profile: "Pedido consolidado",
      pitch: "Escolar, escritório, higiene, informática, eletroportátil num fornecedor só. Mix multi-categoria sem precisar gerenciar 4 distribuidores diferentes.",
      pain: "Fragmentar compra encarece frete, embarala prazo e some com margem.",
    },
  ],

  numbers: [
    { value: "02",  label: "Centros logísticos", sub: "Navegantes/SC + São Paulo/SP" },
    { value: "07",  label: "Estados de cobertura",  sub: "Sudeste + Sul" },
    { value: "04",  label: "Verticais ativas",      sub: "Atacado direto B2B" },
    { value: "14",  label: "CNAEs registradas",     sub: "Atacado e varejo especializado" },
  ],

  // ============================================================
  // Fornecedores / indústrias representadas
  // ============================================================
  suppliers: [
    { name: "Filiperson", vertical: "Higiene e bazar" },
    { name: "Yins Brasil", vertical: "Eletro e informática" },
    { name: "TT Master", vertical: "Eletro e informática" },
    { name: "CCM", vertical: "Papelaria e bazar" },
    { name: "Toshiba", vertical: "Eletro e informática" },
  ],

  // Documentos jurídicos públicos
  legal: {
    privacyUpdatedAt: "25 de maio de 2026",
    termsUpdatedAt: "25 de maio de 2026",
    cookiesUpdatedAt: "25 de maio de 2026",
  },
} as const;

export type VerticalSlug = (typeof site.verticals)[number]["slug"];
export type LocationSlug = (typeof site.locations)[number]["slug"];
