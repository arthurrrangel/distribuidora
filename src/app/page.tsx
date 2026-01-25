import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { MobileNavigator } from "@/components/MobileNavigator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <Header />
      <Hero />
      <ProductGrid />
      <div className="bg-white py-4 shadow-sm relative">
        <Categories />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
      <MobileNavigator />
    </main>
  );
}

