export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: string;
  image?: string;
  packageSize?: string;
  discount?: number;
}

export const products: Product[] = [
  // Papelaria & Escritório
  { id: '1', name: "Papel A4 Chamex 75g 500fls", price: 28.90, originalPrice: 32.50, unit: "pct", category: "papelaria-e-escritorio", packageSize: "PC 500", discount: 11 },
  { id: '2', name: "Caneta Esferográfica Bic Cristal Azul", price: 1.20, originalPrice: 1.50, unit: "un", category: "papelaria-e-escritorio", packageSize: "CX 50", discount: 20 },
  { id: '3', name: "Caderno Tilibra Capa Dura 200fls", price: 22.90, unit: "un", category: "papelaria-e-escritorio", packageSize: "1 UN" },
  { id: '4', name: "Fita Adesiva Durex Transparente", price: 3.50, unit: "un", category: "papelaria-e-escritorio", packageSize: "45x45" },

  // Eletrônicos & TVs
  { id: '5', name: "Smart TV 50' 4K UHD Samsung", price: 2399.00, originalPrice: 2899.00, unit: "un", category: "eletronicos-e-tvs", discount: 17 },
  { id: '6', name: "Controle Remoto Universal", price: 25.90, unit: "un", category: "eletronicos-e-tvs" },
  { id: '7', name: "Suporte Articulado para TV", price: 89.90, originalPrice: 110.00, unit: "un", category: "eletronicos-e-tvs", discount: 18 },

  // Informática & Acessórios
  { id: '8', name: "Mouse Óptico USB Logitech", price: 39.90, originalPrice: 55.00, unit: "un", category: "informatica-e-acessorios", discount: 27 },
  { id: '9', name: "Teclado Mecânico Gamer Redragon", price: 189.90, unit: "un", category: "informatica-e-acessorios" },
  { id: '10', name: "Pendrive SanDisk 64GB", price: 45.00, unit: "un", category: "informatica-e-acessorios" },
  { id: '11', name: "Cabo HDMI 2.0 4K 2m", price: 19.90, unit: "un", category: "informatica-e-acessorios" },

  // Saúde, Nutrição & Bem-Estar
  { id: '12', name: "Whey Protein 900g Baunilha", price: 99.90, originalPrice: 129.90, unit: "un", category: "saude-nutricao-e-bem-estar", packageSize: "900g", discount: 23 },
  { id: '13', name: "Vitamina C 1g Efervescente", price: 12.50, unit: "tb", category: "saude-nutricao-e-bem-estar", packageSize: "TB 10" },
  { id: '14', name: "Barra de Proteína Bold", price: 8.90, unit: "un", category: "saude-nutricao-e-bem-estar" },

  // Utilidades Domésticas
  { id: '15', name: "Faqueiro Inox Tramontina 24pçs", price: 54.90, originalPrice: 69.90, unit: "jg", category: "utilidades-domesticas", discount: 21 },
  { id: '16', name: "Pote Vidro Hermético 800ml", price: 18.90, unit: "un", category: "utilidades-domesticas" },
  { id: '17', name: "Panela de Pressão 4.5L", price: 79.90, unit: "un", category: "utilidades-domesticas" },

  // Áudio, Vídeo & Mobile
  { id: '18', name: "Fone de Ouvido Bluetooth JBL", price: 149.90, originalPrice: 199.90, unit: "un", category: "audio-video-e-mobile", discount: 25 },
  { id: '19', name: "Carregador Rápido USB-C", price: 49.90, unit: "un", category: "audio-video-e-mobile" },
  { id: '20', name: "Caixa de Som Portátil", price: 89.90, unit: "un", category: "audio-video-e-mobile" },
  { id: '21', name: "Suporte Veicular para Celular", price: 29.90, unit: "un", category: "audio-video-e-mobile" },
];

export const categoriesMap = {
  "papelaria-e-escritorio": "Papelaria & Escritório",
  "eletronicos-e-tvs": "Eletrônicos & TVs",
  "informatica-e-acessorios": "Informática & Acessórios",
  "saude-nutricao-e-bem-estar": "Saúde, Nutrição & Bem-Estar",
  "utilidades-domesticas": "Utilidades Domésticas",
  "audio-video-e-mobile": "Áudio, Vídeo & Mobile",
};
