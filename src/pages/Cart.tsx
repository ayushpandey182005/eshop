import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { cartItems, updateQuantity, removeFromCart, moveToWishlist, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
    toast({
      title: "Cart Updated",
      description: "Item quantity updated successfully",
    });
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item Removed",
      description: "Item removed from cart successfully",
    });
  };

  const handleMoveToWishlist = (productId: string) => {
    if (!user) return;
    moveToWishlist(productId);
    toast({
      title: "Moved to Wishlist",
      description: "Item moved to wishlist successfully",
    });
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    
    // Simple coupon validation for demo
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      const discount = getCartTotal() * 0.1;
      setCouponDiscount(discount);
      setAppliedCoupon(couponCode.trim());
      toast({
        title: "Coupon Applied",
        description: `You saved ₹${discount.toFixed(2)}`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Coupon code is not valid",
        variant: "destructive",
      });
    }
  };

  const subtotal = getCartTotal();
  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryCharges - couponDiscount;


  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your cart</h1>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/">
            <Button>Continue Shopping</Button>
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
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h1>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <img
                          src={item.product.images?.[0] || item.product.image || item.product.image_url || '/placeholder.svg'}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link to={`/product/${item.product.id}`} className="block">
                          <h3 className="font-medium text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-lg font-bold text-foreground">
                          ₹{item.product.price.toLocaleString()}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoveToWishlist(item.product.id)}
                              className="text-primary hover:text-primary"
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Wishlist
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>{deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount ({appliedCoupon})</span>
                      <span>-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={applyCoupon}
                    disabled={!couponCode.trim() || appliedCoupon === couponCode.trim()}
                  >
                    {appliedCoupon === couponCode.trim() ? 'Coupon Applied' : 'Apply Coupon'}
                  </Button>
                </div>

                <Link to="/checkout">
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;