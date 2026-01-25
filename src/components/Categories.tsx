import Link from "next/link";
import api from "@/services/api"; // ✅ Usando seu api.ts
import {
  Briefcase,
  Tv,
  Monitor,
  Heart,
  CookingPot,
  Smartphone,
  Package,
  LucideIcon,
  Star,
  PenTool,
  BookOpen,
  ShoppingBag,
  Laptop,
  Headphones,
  Home,
  UtensilsCrossed,
  Dumbbell,
  Shirt,
  Gamepad2,
} from "lucide-react";

// --- 1. Tipagem Estrita (Zero ANY) ---

// Tipo do "nó" da coleção
interface CollectionNode {
  id: string;
  title: string;
  handle: string;
}

// Tipo da resposta completa do GraphQL
interface ShopifyCollectionsResponse {
  data: {
    collections: {
      edges: Array<{
        node: CollectionNode;
      }>;
    };
  };
}

// Mapa de ícones por handle
const iconMapByHandle: Record<string, LucideIcon> = {
  "papelaria-e-escritorio": PenTool,
  "eletronicos-e-tvs": Tv,
  "informatica-e-acessorios": Laptop,
  "saude-nutricao-e-bem-estar": Heart,
  "utilidades-domesticas": Home,
  "audio-video-e-mobile": Headphones,
  "destaques": Star,
  "papelaria": PenTool,
  "papelaria-escolar": BookOpen,
  "principais-produtos": ShoppingBag,
};

// Mapa de ícones por título (fallback)
const iconMapByTitle: Record<string, LucideIcon> = {
  "Destaques": Star,
  "Papelaria": PenTool,
  "Papelaria Escolar": BookOpen,
  "Principais Produtos": ShoppingBag,
  "Eletrônicos": Tv,
  "Informática": Laptop,
  "Áudio e Vídeo": Headphones,
  "Saúde": Heart,
  "Casa": Home,
  "Cozinha": UtensilsCrossed,
  "Esportes": Dumbbell,
  "Roupas": Shirt,
  "Games": Gamepad2,
};

// Função para obter o ícone apropriado
function getIconForCategory(handle: string, title: string): LucideIcon {
  // Primeiro tenta pelo handle
  if (iconMapByHandle[handle]) {
    return iconMapByHandle[handle];
  }
  
  // Depois tenta pelo título
  if (iconMapByTitle[title]) {
    return iconMapByTitle[title];
  }
  
  // Fallback padrão
  return Package;
}

export async function Categories() {
  // --- 2. Query GraphQL ---
  const query = `
    query getCollections {
      collections(first: 10, sortKey: TITLE) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  // --- 3. Chamada via api.ts ---
  // O tipo genérico <ShopifyCollectionsResponse> garante que o TS saiba o formato da resposta
  const response = await api.post<ShopifyCollectionsResponse>("", {
    query,
  });

  // Acessamos data.data porque o axios retorna .data e o GraphQL também tem um campo .data
  const collections =
    response.data.data.collections.edges.map((edge) => edge.node) || [];

  return (
    <section
      id="categories"
      className="pt-2 md:pt-0 pb-0 bg-white border-b border-gray-100"
    >
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-0 no-scrollbar justify-start md:justify-center pr-8 md:pr-12">
          {collections.map((cat) => {
            // Seleciona o ícone apropriado
            const IconComponent = getIconForCategory(cat.handle, cat.title);

            return (
              <Link
                key={cat.id}
                href={`/departamento/${cat.handle}`}
                className="flex flex-col items-center gap-1.5 group min-w-[80px]"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors shadow-sm">
                  <IconComponent strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-xs font-medium text-gray-600 text-center group-hover:text-[#2563EB] transition-colors leading-tight max-w-[80px]">
                  {cat.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
