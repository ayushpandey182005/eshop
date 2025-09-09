import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { initiatePayment, createRazorpayOrder, verifyPayment } from "@/lib/payment/razorpay";
import NotificationService from "@/services/notificationService";

const Checkout = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);

  const addresses = [
    {
      id: "1",
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210"
    }
  ];

  // Check if this is a Buy Now checkout
  const productId = searchParams.get('product');
  const quantity = parseInt(searchParams.get('quantity') || '1');
  
  // Handle Buy Now product loading
  useEffect(() => {
    if (productId) {
      // In a real app, you'd fetch the product from an API
      // For now, we'll create a mock product or get it from localStorage
      const mockProducts = JSON.parse(localStorage.getItem('mockProducts') || '[]');
      const product = mockProducts.find((p: any) => p.id === productId);
      
      if (product) {
        setBuyNowProduct(product);
        setBuyNowQuantity(quantity);
      } else {
        // Fallback: redirect to cart if product not found
        navigate('/cart');
      }
    }
  }, [productId, quantity, navigate]);

  // Calculate totals based on checkout type
  const isBuyNow = !!buyNowProduct;
  const checkoutItems = isBuyNow 
    ? [{ product: buyNowProduct, quantity: buyNowQuantity, id: buyNowProduct?.id }]
    : cartItems;
  
  const subtotal = isBuyNow 
    ? (buyNowProduct?.price || 0) * buyNowQuantity
    : getCartTotal();
  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryCharges;

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to place an order",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (checkoutItems.length === 0) {
      toast({
        title: "No Items",
        description: "Please add items to cart before checkout",
        variant: "destructive",
      });
      navigate("/cart");
      return;
    }

    setIsProcessing(true);

    try {
      // Handle different payment methods
      if (paymentMethod === "card" || paymentMethod === "upi") {
        // Create Razorpay order
        const razorpayOrder = await createRazorpayOrder(total * 100); // Convert to paise
        
        // Initiate payment
        const paymentResult = await initiatePayment({
          amount: total * 100,
          currency: "INR",
          orderId: razorpayOrder.orderId,
          customerName: user.email || "Customer",
          customerEmail: user.email || "",
          description: `Payment for order items`,
        });

        if (!paymentResult.success) {
          throw new Error(paymentResult.error || "Payment failed");
        }

        // Verify payment
        if (paymentResult.paymentId && paymentResult.orderId && paymentResult.signature) {
          const isVerified = await verifyPayment(
            paymentResult.paymentId,
            paymentResult.orderId,
            paymentResult.signature
          );

          if (!isVerified) {
            throw new Error("Payment verification failed");
          }
        }
      }

      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        items: checkoutItems,
        address: selectedAddress,
        paymentMethod: paymentMethod,
        subtotal,
        deliveryCharges,
        total,
        status: paymentMethod === "cod" ? "Processing" : "Paid",
        createdAt: new Date().toISOString(),
      };

      // Save order to user-specific localStorage
      const ordersKey = `orders_${user.id}`;
      const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
      existingOrders.push(order);
      localStorage.setItem(ordersKey, JSON.stringify(existingOrders));

      // Send notifications
      const notificationService = NotificationService.getInstance();
      const notificationData = {
        orderId: order.id,
        customerName: user?.name || 'Customer',
        customerEmail: user?.email || 'customer@example.com',
        customerPhone: user?.phone || '+91 9876543210',
        orderTotal: total,
        items: checkoutItems,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        deliveryAddress: selectedAddress
      };

      // Send order confirmation and simulate order lifecycle
      notificationService.simulateOrderUpdates(order.id, notificationData, user?.id || 'guest');

      // Clear cart after successful order (only if it's a cart checkout)
      if (!isBuyNow) {
        clearCart();
      }

      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${order.id} has been confirmed`,
      });

      // Navigate to orders page
      navigate("/orders");

    } catch (error) {
      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to={isBuyNow ? "/" : "/cart"} className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            {isBuyNow ? "Back to Shopping" : "Back to Cart"}
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {addresses.map((address) => (
                    <div key={address.id} className="flex items-start space-x-2 p-4 border rounded">
                      <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                      <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{address.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {address.address}<br />
                          {address.city}, {address.state} - {address.pincode}<br />
                          Phone: {address.phone}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <Button variant="outline" className="mt-4">
                  + Add New Address
                </Button>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.product.images?.[0] || item.product.image || item.product.image_url || '/placeholder.svg'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-bold">₹{item.product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking">Net Banking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-3">
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVV" />
                    </div>
                    <Input placeholder="Cardholder Name" />
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="mt-4">
                    <Input placeholder="UPI ID (e.g., user@paytm)" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Price Breakdown */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Price Details</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Price ({checkoutItems.length} item{checkoutItems.length > 1 ? 's' : ''})</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full"
                  size="lg"
                  disabled={isProcessing || checkoutItems.length === 0}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  By placing your order, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;