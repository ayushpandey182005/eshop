import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";

const Wishlist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { wishlistItems, removeFromWishlist, moveToCart } = useCart();

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from Wishlist",
      description: "Item removed from wishlist successfully",
    });
  };

  const handleMoveToCart = (productId: string) => {
    moveToCart(productId);
    toast({
      title: "Added to Cart",
      description: "Item moved to cart successfully",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your wishlist</h1>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <Link to="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlistItems.length} items)</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={item.product.images?.[0] || item.product.image || item.product.image_url || '/placeholder.svg'}
                    alt={item.product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(item.product.id)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                    {item.product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-foreground">
                      ₹{item.product.price.toLocaleString()}
                    </span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{item.product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleMoveToCart(item.product.id)}
                      className="w-full"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;