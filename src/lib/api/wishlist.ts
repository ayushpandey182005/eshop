import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type WishlistItem = Database['public']['Tables']['wishlist_items']['Row'];
type WishlistItemInsert = Database['public']['Tables']['wishlist_items']['Insert'];

export interface WishlistItemWithDetails extends WishlistItem {
  product?: Database['public']['Tables']['products']['Row'];
}

// Get user's wishlist items
export const getWishlistItems = async (userId: string): Promise<WishlistItemWithDetails[]> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    throw error;
  }
};

// Add item to wishlist
export const addToWishlist = async (
  userId: string,
  productId: string
): Promise<WishlistItem> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .upsert({
        user_id: userId,
        product_id: productId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (
  userId: string,
  productId: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Check if product is in wishlist
export const isInWishlist = async (
  userId: string,
  productId: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

// Move item from wishlist to cart
export const moveToCart = async (
  userId: string,
  productId: string,
  quantity: number = 1
): Promise<void> => {
  try {
    // Add to cart
    const { error: cartError } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        quantity
      });

    if (cartError) throw cartError;

    // Remove from wishlist
    await removeFromWishlist(userId, productId);
  } catch (error) {
    console.error('Error moving to cart:', error);
    throw error;
  }
};

// Clear entire wishlist
export const clearWishlist = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    throw error;
  }
};
