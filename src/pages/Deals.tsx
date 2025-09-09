import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Flame, Tag, Zap, Gift, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: number;
  originalPrice: number;
  dealPrice: number;
  endTime: Date;
  category: string;
  image: string;
  badge: string;
  soldCount: number;
  totalStock: number;
  rating: number;
  reviews: number;
}

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState<{[key: string]: string}>({});
  const [activeTab, setActiveTab] = useState<"flash" | "daily" | "mega" | "clearance">("flash");

  // Flash Sale Deals (limited time)
  const flashDeals: Deal[] = [
    {
      id: "flash-1",
      title: "Samsung Galaxy S24 Ultra 5G",
      description: "Latest flagship with 200MP camera and S Pen",
      discount: 25,
      originalPrice: 139999,
      dealPrice: 104999,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      badge: "Flash Sale",
      soldCount: 847,
      totalStock: 1000,
      rating: 4.5,
      reviews: 12847
    },
    {
      id: "flash-2", 
      title: "MacBook Air M2",
      description: "Ultra-thin laptop with M2 chip",
      discount: 15,
      originalPrice: 119900,
      dealPrice: 101915,
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      badge: "Limited Stock",
      soldCount: 234,
      totalStock: 500,
      rating: 4.6,
      reviews: 3421
    },
    {
      id: "flash-3",
      title: "Sony WH-1000XM5 Headphones", 
      description: "Industry-leading noise cancellation",
      discount: 30,
      originalPrice: 34990,
      dealPrice: 24493,
      endTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      badge: "Hot Deal",
      soldCount: 567,
      totalStock: 800,
      rating: 4.8,
      reviews: 6543
    }
  ];

  // Daily Deals
  const dailyDeals: Deal[] = [
    {
      id: "daily-1",
      title: "Nike Air Force 1",
      description: "Classic white sneakers",
      discount: 20,
      originalPrice: 8995,
      dealPrice: 7196,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      badge: "Daily Deal",
      soldCount: 1234,
      totalStock: 2000,
      rating: 4.3,
      reviews: 2341
    },
    {
      id: "daily-2",
      title: "IKEA HEMNES Bed Frame",
      description: "Solid wood bed frame",
      discount: 35,
      originalPrice: 14999,
      dealPrice: 9749,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      category: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      badge: "Best Value",
      soldCount: 456,
      totalStock: 1000,
      rating: 4.1,
      reviews: 876
    }
  ];

  // Mega Sale Deals
  const megaDeals: Deal[] = [
    {
      id: "mega-1",
      title: "iPhone 15 Pro Max",
      description: "Latest iPhone with titanium design",
      discount: 12,
      originalPrice: 179900,
      dealPrice: 158312,
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      category: "Electronics", 
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
      badge: "Mega Sale",
      soldCount: 2341,
      totalStock: 5000,
      rating: 4.7,
      reviews: 8934
    },
    {
      id: "mega-2",
      title: "Samsung 65\" 4K Smart TV",
      description: "Crystal UHD with smart features",
      discount: 40,
      originalPrice: 109999,
      dealPrice: 65999,
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
      badge: "Mega Discount",
      soldCount: 876,
      totalStock: 2000,
      rating: 4.4,
      reviews: 1876
    }
  ];

  // Clearance Deals
  const clearanceDeals: Deal[] = [
    {
      id: "clearance-1",
      title: "Levi's 501 Original Jeans",
      description: "Classic straight fit jeans",
      discount: 50,
      originalPrice: 4999,
      dealPrice: 2499,
      endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
      badge: "Clearance",
      soldCount: 1876,
      totalStock: 3000,
      rating: 4.2,
      reviews: 1876
    },
    {
      id: "clearance-2",
      title: "Lakme Absolute Foundation",
      description: "Full coverage foundation",
      discount: 45,
      originalPrice: 1599,
      dealPrice: 879,
      endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
      badge: "Final Sale",
      soldCount: 654,
      totalStock: 1000,
      rating: 4.0,
      reviews: 654
    }
  ];

  const getCurrentDeals = () => {
    switch (activeTab) {
      case "flash": return flashDeals;
      case "daily": return dailyDeals;
      case "mega": return megaDeals;
      case "clearance": return clearanceDeals;
      default: return flashDeals;
    }
  };

  // Timer countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: {[key: string]: string} = {};
      
      [...flashDeals, ...dailyDeals, ...megaDeals, ...clearanceDeals].forEach(deal => {
        const now = new Date().getTime();
        const endTime = deal.endTime.getTime();
        const difference = endTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          if (days > 0) {
            newTimeLeft[deal.id] = `${days}d ${hours}h ${minutes}m`;
          } else {
            newTimeLeft[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
          }
        } else {
          newTimeLeft[deal.id] = "Expired";
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get trending products with deals
  const trendingProducts = allProducts.slice(0, 8).map(product => ({
    ...product,
    originalPrice: product.price + Math.floor(product.price * 0.2),
    badge: "Trending"
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
                <Flame className="h-8 w-8" />
                Mega Deals & Offers
              </h1>
              <p className="text-xl opacity-90">Save up to 70% on top brands</p>
              <p className="opacity-75 mt-2">Limited time offers • Free shipping on all orders</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg p-4">
                <Clock className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">Flash Sale Ends In</p>
                <p className="text-2xl font-bold">{timeLeft["flash-1"] || "Loading..."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Categories Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <Button
            variant={activeTab === "flash" ? "default" : "outline"}
            onClick={() => setActiveTab("flash")}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Zap className="h-4 w-4" />
            Flash Sale
          </Button>
          <Button
            variant={activeTab === "daily" ? "default" : "outline"}
            onClick={() => setActiveTab("daily")}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Timer className="h-4 w-4" />
            Daily Deals
          </Button>
          <Button
            variant={activeTab === "mega" ? "default" : "outline"}
            onClick={() => setActiveTab("mega")}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Gift className="h-4 w-4" />
            Mega Sale
          </Button>
          <Button
            variant={activeTab === "clearance" ? "default" : "outline"}
            onClick={() => setActiveTab("clearance")}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Tag className="h-4 w-4" />
            Clearance
          </Button>
        </div>

        {/* Current Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {getCurrentDeals().map((deal) => (
            <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                  {deal.discount}% OFF
                </Badge>
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {deal.badge}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 truncate">{deal.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>{deal.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{deal.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({deal.reviews.toLocaleString()})</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-green-600">₹{deal.dealPrice.toLocaleString()}</span>
                  <span className="text-sm line-through text-muted-foreground">₹{deal.originalPrice.toLocaleString()}</span>
                </div>

                {/* Stock Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sold: {deal.soldCount}</span>
                    <span>Stock: {deal.totalStock}</span>
                  </div>
                  <Progress value={(deal.soldCount / deal.totalStock) * 100} className="h-2" />
                </div>

                {/* Timer */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-red-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{timeLeft[deal.id] || "Loading..."}</span>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Products */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Trending Deals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Deal Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Electronics</h3>
            <p className="text-sm text-muted-foreground">Up to 60% off</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="font-semibold mb-2">Fashion</h3>
            <p className="text-sm text-muted-foreground">Up to 70% off</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Home & Garden</h3>
            <p className="text-sm text-muted-foreground">Up to 50% off</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Beauty</h3>
            <p className="text-sm text-muted-foreground">Up to 45% off</p>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Deals;
