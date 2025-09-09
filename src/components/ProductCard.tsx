import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import SustainabilityScore from "./SustainabilityScore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  compare_price?: number;
  discount?: number;
  rating?: number;
  review_count?: number;
  reviews?: number;
  image?: string;
  image_url?: string;
  images?: string[];
  badge?: string;
  category?: string;
  sustainability?: any;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useCart();
  
  const discountPercentage = (product.originalPrice || product.compare_price)
    ? Math.round(((((product.originalPrice || product.compare_price) - product.price) / (product.originalPrice || product.compare_price)) * 100))
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

    // Navigate to checkout with this specific product
    navigate(`/checkout?product=${product.id}&quantity=1`);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer">
        <CardContent className="p-0">
          {/* Image container */}
          <div className="relative overflow-hidden">
            <img
              src={product.images?.[0] || product.image || product.image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Badge */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.badge && (
                <Badge variant="secondary" className="text-xs">
                  {product.badge}
                </Badge>
              )}
              {product.sustainability && (
                <SustainabilityScore 
                  data={product.sustainability} 
                  variant="badge" 
                />
              )}
            </div>
            
            {/* Discount badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                {discountPercentage}% OFF
              </div>
            )}
            
            {/* Wishlist button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlist}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Product info */}
          <div className="p-4">
            <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-1 bg-accent text-accent-foreground px-2 py-1 rounded text-xs">
                <Star className="h-3 w-3 fill-current" />
                <span>{product.rating || 4.5}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({(product.reviews || product.review_count || 0).toLocaleString()} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-foreground">
                ₹{(product.price || 0).toLocaleString()}
              </span>
              {(product.originalPrice || product.compare_price) && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{(product.originalPrice || product.compare_price || 0).toLocaleString()}
                </span>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <Button variant="cart" size="sm" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
              <Button variant="buy-now" size="sm" className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;