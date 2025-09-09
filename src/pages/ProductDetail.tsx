import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Star, ShoppingCart, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VirtualExperience from "@/components/VirtualExperience";
import SustainabilityScore from "@/components/SustainabilityScore";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { getAllProducts } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load product data
  useEffect(() => {
    const loadProduct = () => {
      // Try to get product from localStorage first (from category pages)
      const mockProducts = getAllProducts();
      let foundProduct = mockProducts.find((p: any) => p.id === id);
      
      // If not found, create a fallback product with sustainability data
      if (!foundProduct) {
        foundProduct = {
          id: id,
          name: "Samsung Galaxy S24 Ultra 5G",
          price: 124999,
          originalPrice: 139999,
          compare_price: 139999,
          rating: 4.5,
          reviews: 12847,
          review_count: 12847,
          images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&h=500&fit=crop"
          ],
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
          highlights: [
            "6.8-inch Dynamic AMOLED 2X Display",
            "200MP Triple Camera Setup",
            "5000mAh Battery with 45W Fast Charging",
            "Snapdragon 8 Gen 3 Processor",
            "12GB RAM + 256GB Storage"
          ],
          description: "Experience the ultimate in mobile technology with the Samsung Galaxy S24 Ultra. Featuring cutting-edge camera technology, powerful performance, and stunning display quality.",
          seller: "Samsung Official Store",
          warranty: "1 Year Manufacturer Warranty",
          inStock: true,
          category: "Electronics",
          sustainability: {
            ecoScore: 72,
            carbonFootprint: { value: 8.5, rating: 'medium' as const },
            recyclablePercentage: 85,
            fairTrade: false,
            sustainableMaterials: ['Recycled Aluminum', 'Bio-based Plastics'],
            certifications: ['EPEAT Gold', 'Energy Star'],
            waterUsage: 120,
            renewableEnergy: true
          }
        };
      }
      
      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Add product with selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast({
      title: "Added to Cart",
      description: `${product.name} (${quantity}) has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with purchase",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Store product data in localStorage for checkout page
    const existingProducts = JSON.parse(localStorage.getItem('mockProducts') || '[]');
    const productExists = existingProducts.find((p: any) => p.id === product.id);
    
    if (!productExists) {
      existingProducts.push(product);
      localStorage.setItem('mockProducts', JSON.stringify(existingProducts));
    }

    // Navigate to checkout with this specific product and quantity
    navigate(`/checkout?product=${product.id}&quantity=${quantity}`);
  };

  const handleWishlist = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to wishlist",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading product details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercentage = (product.originalPrice || product.compare_price)
    ? Math.round(((((product.originalPrice || product.compare_price) - product.price) / (product.originalPrice || product.compare_price)) * 100))
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images?.[selectedImage] || product.image || product.image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-2">
              {(product.images || [product.image || product.image_url]).filter(Boolean).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-accent text-accent-foreground px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-current" />
                <span>{product.rating || 4.5}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({(product.reviews || product.review_count || 0).toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {(product.originalPrice || product.compare_price) && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{(product.originalPrice || product.compare_price).toLocaleString()}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free delivery on orders above ₹500</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>{product.warranty || "1 Year Manufacturer Warranty"}</span>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex items-center border rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 p-0"
                >
                  -
                </Button>
                <span className="px-4 py-2">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 p-0"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <VirtualExperience product={product} />
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className={isInWishlist(product.id) ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <Button variant="secondary" size="lg" className="w-full" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="highlights">
              <TabsList>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                {product.sustainability && (
                  <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                )}
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="highlights" className="mt-6">
                <ul className="space-y-2">
                  {(product.highlights || []).map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="description" className="mt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "Product description will be available soon."}
                </p>
              </TabsContent>
              
              {product.sustainability && (
                <TabsContent value="sustainability" className="mt-6">
                  <SustainabilityScore 
                    data={product.sustainability} 
                    variant="detailed" 
                  />
                </TabsContent>
              )}
              
              <TabsContent value="reviews" className="mt-6">
                <div className="text-center text-muted-foreground">
                  Reviews will be loaded here from the database.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;