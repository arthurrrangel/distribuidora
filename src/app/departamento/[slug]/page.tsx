import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categoriesMap } from "@/lib/products";
import { MobileNavigator } from "@/components/MobileNavigator";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = categoriesMap[slug as keyof typeof categoriesMap] || "Departamento";
  
  // Filter products by category slug
  const categoryProducts = products.filter(p => p.category === slug);
  const otherProducts = products.filter(p => p.category !== slug).slice(0, 4); // Suggest other products

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">{categoryName}</h1>
        <p className="text-gray-500 mb-8">Confira os melhores produtos de {categoryName.toLowerCase()} para o seu negócio.</p>

        {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">Nenhum produto encontrado neste departamento no momento.</p>
            </div>
        )}

        {/* You might also like section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
             <h2 className="text-xl font-bold text-gray-800 mb-6">Veja também</h2>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {otherProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
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
