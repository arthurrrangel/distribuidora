import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";
import { getProductByHandle } from "@/services/productService";
import { ProductMainInfo } from "@/components/ProductMainInfo";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ChevronRight, Truck, ShieldCheck, PackageX, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Garante que a página sempre busque dados novos se necessário
export const dynamic = "force-dynamic";

// ── SEO dinâmico por produto ───────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);

  if (!product) {
    return {
      title: "Produto não encontrado | Repon",
      description: "Este produto não está disponível no momento.",
    };
  }

  const price = product.variants.edges[0]?.node
    ? (parseFloat(product.variants.edges[0].node.price.amount) * 0.9).toFixed(2)
    : null;

  const description = product.description
    ? `${product.description.slice(0, 140)}...`
    : `Compre ${product.title} no atacado na Repon. Preço B2B exclusivo para CNPJ, frete grátis e entrega em 24h no Rio de Janeiro.`;

  const image = product.images.edges[0]?.node.url;

  return {
    title: `${product.title} | Repon Atacado`,
    description,
    openGraph: {
      title: `${product.title} | Repon Atacado`,
      description: price
        ? `${description} A partir de R$ ${price.replace(".", ",")}`
        : description,
      images: image ? [{ url: image, width: 800, height: 800, alt: product.title }] : [],
      type: "website",
      locale: "pt_BR",
      siteName: "Repon",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Repon Atacado`,
      description,
      images: image ? [image] : [],
    },
  };
}

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
            className="bg-[#0464D5] text-white px-6 py-3 rounded-md font-bold hover:bg-[#0353b4] transition-colors"
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

  const images = product.images.edges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText,
  }));

  // ── JSON-LD structured data ───────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images.map((i) => i.url),
    brand: {
      "@type": "Brand",
      name: product.vendor || "Repon",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: (price * 0.9).toFixed(2),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Repon Plataforma de Comércio Ltda",
      },
      url: `https://repon.com.br/produto/${product.handle}`,
    },
  };

  return (
    <main className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 md:px-8 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0464D5]">
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
          {/* Galeria de Imagens — agora interativa */}
          <ProductImageGallery images={images} productTitle={product.title} />

          {/* Informações do Produto */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {product.title}
            </h1>

            {/* Badge de marca/fornecedor no lugar das estrelas falsas */}
            {product.vendor && (
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                  <Tag className="w-3 h-3" />
                  {product.vendor}
                </span>
              </div>
            )}

            <ProductMainInfo
              id={firstVariant?.id || ""}
              productId={product.id}
              handle={product.handle}
              title={product.title}
              price={price}
              originalPrice={originalPrice}
              image={images[0]?.url}
            />

            {/* Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <Truck className="w-5 h-5 text-[#0464D5] shrink-0 mt-0.5" />
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
                <ShieldCheck className="w-5 h-5 text-[#0464D5] shrink-0 mt-0.5" />
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

      {/* Produtos Relacionados */}
      <div className="container mx-auto px-4 md:px-8 pb-8">
        <RelatedProducts productId={product.id} currentHandle={product.handle} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}
