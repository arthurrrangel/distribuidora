import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import { getProductByHandle } from "@/services/productService";
import { ProductMainInfo } from "@/components/ProductMainInfo";
import { ChevronRight, Truck, ShieldCheck, Star, PackageX } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Garante que a página sempre busque dados novos se necessário
export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-white p-8 rounded-full shadow-sm mb-4">
            <PackageX className="w-12 h-12 text-gray-300" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Produto não encontrado
          </h1>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
          >
            Voltar para o Início
          </Link>
        </div>
        <Footer />
        <MobileNavigator />
      </main>
    );
  }

  // Extração segura de dados da primeira variante
  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant ? parseFloat(firstVariant.price.amount) : 0;
  const originalPrice = firstVariant?.compareAtPrice
    ? parseFloat(firstVariant.compareAtPrice.amount)
    : undefined;

  const mainImage = product.images.edges[0]?.node;

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 md:px-8 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">
            Início
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium truncate max-w-[300px]">
            {product.title}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4 w-full md:w-[450px] shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 aspect-square flex items-center justify-center relative overflow-hidden shadow-sm">
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  // CORREÇÃO: Fallback triplo (altText -> Title -> String Padrão)
                  alt={
                    mainImage.altText || product.title || "Imagem do Produto"
                  }
                  fill
                  className="object-contain p-4"
                  priority
                  // CORREÇÃO: Adicionado sizes para remover o aviso e melhorar performance
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              ) : (
                <div className="text-gray-300 font-bold text-2xl">SEM FOTO</div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {product.images.edges.map((img, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 border border-gray-200 rounded-md relative shrink-0 cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                  >
                    <Image
                      src={img.node.url}
                      // CORREÇÃO: Fallback específico para thumbnails
                      alt={
                        img.node.altText || `${product.title} - imagem ${i + 1}`
                      }
                      fill
                      className="object-contain p-1"
                      // CORREÇÃO: Adicionado sizes para thumbnails
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-2 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(Novo)</span>
            </div>

            <ProductMainInfo
              id={firstVariant?.id || ""}
              productId={product.id}
              handle={product.handle}
              title={product.title}
              price={price}
              originalPrice={originalPrice}
              image={mainImage?.url}
            />

            {/* Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Entrega Rápida
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Enviamos para todo o Brasil.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Garantia Repon
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Qualidade assegurada.
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Detalhes</h3>
              <div
                className="text-gray-600 text-sm leading-relaxed prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{
                  __html: product.descriptionHtml || product.description,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
