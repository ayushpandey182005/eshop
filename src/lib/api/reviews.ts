import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Review = Database['public']['Tables']['reviews']['Row'];
type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

export interface ReviewWithUser extends Review {
  user?: {
    full_name: string;
    avatar_url: string | null;
  };
}

// Get reviews for a product
export const getProductReviews = async (
  productId: string,
  limit?: number,
  offset?: number
): Promise<{
  reviews: ReviewWithUser[];
  total: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
}> => {
  try {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviews_user_id_fkey(full_name, avatar_url)
      `, { count: 'exact' })
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    if (offset) {
      query = query.range(offset, offset + (limit || 10) - 1);
    }

    const { data: reviews, error, count } = await query;

    if (error) throw error;

    // Calculate average rating and distribution
    const allReviews = reviews || [];
    const totalReviews = count || 0;
    
    const averageRating = totalReviews > 0 
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    const ratingDistribution = allReviews.reduce((dist, review) => {
      dist[review.rating] = (dist[review.rating] || 0) + 1;
      return dist;
    }, {} as Record<number, number>);

    // Ensure all ratings 1-5 are represented
    for (let i = 1; i <= 5; i++) {
      if (!ratingDistribution[i]) {
        ratingDistribution[i] = 0;
      }
    }

    const reviewsWithUser = allReviews.map(review => ({
      ...review,
      user: review.profiles ? {
        full_name: review.profiles.full_name || 'Anonymous',
        avatar_url: review.profiles.avatar_url
      } : undefined
    }));

    return {
      reviews: reviewsWithUser,
      total: totalReviews,
      averageRating,
      ratingDistribution
    };
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw error;
  }
};

// Create a new review
export const createReview = async (
  userId: string,
  productId: string,
  rating: number,
  title?: string,
  comment?: string,
  images?: string[],
  orderId?: string
): Promise<Review> => {
  try {
    // Check if user has already reviewed this product
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existingReview) {
      throw new Error('You have already reviewed this product');
    }

    // Verify if user has purchased this product (if orderId provided)
    let isVerified = false;
    if (orderId) {
      const { data: orderItem } = await supabase
        .from('order_items')
        .select('id')
        .eq('order_id', orderId)
        .eq('product_id', productId)
        .single();

      isVerified = !!orderItem;
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_id: userId,
        product_id: productId,
        order_id: orderId,
        rating,
        title,
        comment,
        images,
        is_verified: isVerified,
        is_approved: true // Auto-approve for now, can be changed to require moderation
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Update a review
export const updateReview = async (
  reviewId: string,
  userId: string,
  updates: {
    rating?: number;
    title?: string;
    comment?: string;
    images?: string[];
  }
): Promise<Review> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', reviewId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId: string, userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Get user's reviews
export const getUserReviews = async (
  userId: string,
  limit?: number,
  offset?: number
): Promise<ReviewWithUser[]> => {
  try {
    let query = supabase
      .from('reviews')
      .select(`
        *,
        products(name, images)
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
    console.error('Error fetching user reviews:', error);
    throw error;
  }
};

// Mark review as helpful
export const markReviewHelpful = async (reviewId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('increment_review_helpful', {
      review_id: reviewId
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    throw error;
  }
};

// Admin functions
export const approveReview = async (reviewId: string): Promise<Review> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error approving review:', error);
    throw error;
  }
};

export const rejectReview = async (reviewId: string): Promise<Review> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({ is_approved: false })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error rejecting review:', error);
    throw error;
  }
};

export const getPendingReviews = async (): Promise<ReviewWithUser[]> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviews_user_id_fkey(full_name, avatar_url),
        products(name)
      `)
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(review => ({
      ...review,
      user: review.profiles ? {
        full_name: review.profiles.full_name || 'Anonymous',
        avatar_url: review.profiles.avatar_url
      } : undefined
    }));
  } catch (error) {
    console.error('Error fetching pending reviews:', error);
    throw error;
  }
};
