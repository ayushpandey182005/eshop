import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type CartItem = Database['public']['Tables']['cart_items']['Row'];
type CartItemInsert = Database['public']['Tables']['cart_items']['Insert'];
type CartItemUpdate = Database['public']['Tables']['cart_items']['Update'];

export interface CartItemWithDetails extends CartItem {
  product?: Database['public']['Tables']['products']['Row'];
  variant?: Database['public']['Tables']['product_variants']['Row'];
}

// Get user's cart items
export const getCartItems = async (userId: string): Promise<CartItemWithDetails[]> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*),
        variant:product_variants(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (
  userId: string,
  productId: string,
  variantId?: string,
  quantity: number = 1
): Promise<CartItem> => {
  try {
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single();

    if (existingItem) {
      // Update quantity if item exists
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Add new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          variant_id: variantId || null,
          quantity
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number
): Promise<CartItem> => {
  try {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromCart(cartItemId);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (cartItemId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Get cart summary (total items, total price)
export const getCartSummary = async (userId: string): Promise<{
  totalItems: number;
  totalPrice: number;
  items: CartItemWithDetails[];
}> => {
  try {
    const items = await getCartItems(userId);
    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
      const price = item.variant?.price || item.product?.price || 0;
      return sum + (price * item.quantity);
    }, 0);

    return {
      totalItems,
      totalPrice,
      items
    };
  } catch (error) {
    console.error('Error getting cart summary:', error);
    throw error;
  }
};

// Move item from cart to wishlist
export const moveToWishlist = async (
  cartItemId: string,
  userId: string
): Promise<void> => {
  try {
    // Get cart item details
    const { data: cartItem, error: cartError } = await supabase
      .from('cart_items')
      .select('product_id')
      .eq('id', cartItemId)
      .single();

    if (cartError) throw cartError;

    // Add to wishlist (if not already exists)
    const { error: wishlistError } = await supabase
      .from('wishlist_items')
      .upsert({
        user_id: userId,
        product_id: cartItem.product_id
      });

    if (wishlistError) throw wishlistError;

    // Remove from cart
    await removeFromCart(cartItemId);
  } catch (error) {
    console.error('Error moving to wishlist:', error);
    throw error;
  }
};
