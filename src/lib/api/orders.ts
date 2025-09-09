import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];

export interface OrderWithDetails extends Order {
  order_items?: (OrderItem & {
    product?: Database['public']['Tables']['products']['Row'];
    variant?: Database['public']['Tables']['product_variants']['Row'];
  })[];
}

export interface CreateOrderData {
  items: {
    product_id: string;
    variant_id?: string;
    quantity: number;
    price: number;
  }[];
  shipping_address: any;
  billing_address: any;
  coupon_id?: string;
  payment_method: string;
  notes?: string;
}

// Generate unique order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp.slice(-6)}${random}`;
};

// Create new order
export const createOrder = async (
  userId: string,
  orderData: CreateOrderData
): Promise<OrderWithDetails> => {
  try {
    // Calculate totals
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotal * 0.18; // 18% GST
    const shippingAmount = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
    
    let discountAmount = 0;
    if (orderData.coupon_id) {
      // Apply coupon discount (simplified)
      const { data: coupon } = await supabase
        .from('coupons')
        .select('*')
        .eq('id', orderData.coupon_id)
        .eq('is_active', true)
        .single();
      
      if (coupon) {
        if (coupon.type === 'percentage') {
          discountAmount = (subtotal * coupon.value) / 100;
        } else {
          discountAmount = coupon.value;
        }
        
        if (coupon.maximum_discount && discountAmount > coupon.maximum_discount) {
          discountAmount = coupon.maximum_discount;
        }
      }
    }

    const totalAmount = subtotal + taxAmount + shippingAmount - discountAmount;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: generateOrderNumber(),
        user_id: userId,
        status: 'pending',
        payment_status: 'pending',
        subtotal,
        tax_amount: taxAmount,
        shipping_amount: shippingAmount,
        discount_amount: discountAmount,
        total_amount: totalAmount,
        currency: 'INR',
        coupon_id: orderData.coupon_id,
        shipping_address: orderData.shipping_address,
        billing_address: orderData.billing_address,
        payment_method: orderData.payment_method,
        notes: orderData.notes
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems: OrderItemInsert[] = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update coupon usage count
    if (orderData.coupon_id) {
      await supabase.rpc('increment_coupon_usage', { coupon_id: orderData.coupon_id });
    }

    // Get complete order with items
    return await getOrder(order.id);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get single order by ID
export const getOrder = async (orderId: string): Promise<OrderWithDetails> => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(*),
          variant:product_variants(*)
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// Get user's orders
export const getUserOrders = async (
  userId: string,
  limit?: number,
  offset?: number
): Promise<OrderWithDetails[]> => {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(*),
          variant:product_variants(*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.range(offset, offset + (limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: Order['status']
): Promise<Order> => {
  try {
    const updates: OrderUpdate = { status };
    
    if (status === 'shipped') {
      updates.shipped_at = new Date().toISOString();
    } else if (status === 'delivered') {
      updates.delivered_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Update payment status
export const updatePaymentStatus = async (
  orderId: string,
  paymentStatus: Order['payment_status'],
  paymentId?: string
): Promise<Order> => {
  try {
    const updates: OrderUpdate = { 
      payment_status: paymentStatus,
      payment_id: paymentId 
    };

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId: string): Promise<Order> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

// Get order analytics (admin)
export const getOrderAnalytics = async (
  startDate?: string,
  endDate?: string
): Promise<{
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
}> => {
  try {
    let query = supabase
      .from('orders')
      .select('status, total_amount');

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data: orders, error } = await query;

    if (error) throw error;

    const totalOrders = orders?.length || 0;
    const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const ordersByStatus = orders?.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      ordersByStatus
    };
  } catch (error) {
    console.error('Error fetching order analytics:', error);
    throw error;
  }
};
