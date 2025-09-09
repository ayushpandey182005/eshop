import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import HeroBanner from "@/components/HeroBanner";
import OfferBanner from "@/components/OfferBanner";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav />
      <main>
        <HeroBanner />
        <OfferBanner />
        <ProductGrid title="Best Deals for You" viewAllLink="/category/deals" />
        <ProductGrid title="Trending Electronics" viewAllLink="/category/electronics" category="electronics" />
        <ProductGrid title="Fashion Essentials" viewAllLink="/category/fashion" category="fashion" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
