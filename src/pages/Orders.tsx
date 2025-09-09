import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    product: {
      id: string;
      name: string;
      price: number;
      images?: string[];
    };
    quantity: number;
  }>;
  address: any;
  paymentMethod: string;
  subtotal: number;
  deliveryCharges: number;
  total: number;
  status: string;
  createdAt: string;
}

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user-specific orders from localStorage
  useEffect(() => {
    if (user) {
      const ordersKey = `orders_${user.id}`;
      const savedOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
      setOrders(savedOrders.reverse()); // Show newest first
    } else {
      setOrders([]);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return "success";
      case "shipped": return "secondary";
      case "processing": return "default";
      case "cancelled": return "destructive";
      default: return "default";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to view your orders</h1>
          <Link to="/login">
            <Button>Login</Button>
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
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-4">Start shopping to see your orders here!</p>
            <Link to="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Payment: {order.paymentMethod.toUpperCase()}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>₹{item.product.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-1 mb-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span>{order.deliveryCharges === 0 ? 'FREE' : `₹${order.deliveryCharges}`}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;