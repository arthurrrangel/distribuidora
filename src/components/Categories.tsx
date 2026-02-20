import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";

// --- 1. Tipagem Estrita (Zero ANY) ---

// Tipo da imagem da coleção
interface CollectionImage {
  url: string;
  altText: string | null;
}

// Tipo do "nó" da coleção
interface CollectionNode {
  id: string;
  title: string;
  handle: string;
  image: CollectionImage | null;
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

// Mapa de ícones
const iconMap: Record<string, LucideIcon> = {
  "papelaria-e-escritorio": Briefcase,
  "eletronicos-e-tvs": Tv,
  "informatica-e-acessorios": Monitor,
  "saude-nutricao-e-bem-estar": Heart,
  "utilidades-domesticas": CookingPot,
  "audio-video-e-mobile": Smartphone,
};

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
            image {
              url
              altText
            }
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
  // Filtra para remover 'Destaques' e pega só os 5 primeiros
  const filteredCollections = collections
    .filter((cat) => cat.title !== "Destaques")
    .slice(0, 5);

  return (
    <section
      id="categories"
      className="pt-0 pb-4 md:py-8 bg-white border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center">
          {filteredCollections.map((cat) => {
            // Seleciona o ícone ou usa o fallback
            const IconComponent = iconMap[cat.handle] || Package;
            const hasImage = cat.image?.url;

            return (
              <Link
                key={cat.id}
                href={`/departamento/${cat.handle}`}
                className="flex flex-col items-center gap-2 group min-w-[90px]"
              >
                <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors shadow-sm overflow-hidden">
                  {hasImage ? (
                    <Image
                      src={cat.image!.url}
                      alt={cat.image!.altText || cat.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconComponent strokeWidth={1.5} className="w-8 h-8" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-600 text-center group-hover:text-[#2563EB] transition-colors leading-tight max-w-[90px]">
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
