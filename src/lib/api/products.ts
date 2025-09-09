import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];
type ProductVariant = Database['public']['Tables']['product_variants']['Row'];

export interface ProductWithDetails extends Product {
  category?: Database['public']['Tables']['categories']['Row'];
  brand?: Database['public']['Tables']['brands']['Row'];
  variants?: ProductVariant[];
  reviews?: Database['public']['Tables']['reviews']['Row'][];
  average_rating?: number;
  review_count?: number;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
  sortBy?: 'name' | 'price' | 'created_at' | 'rating';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Get all products with filters and pagination
export const getProducts = async (filters: ProductFilters = {}): Promise<{
  products: ProductWithDetails[];
  total: number;
}> => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        brand:brands(*),
        variants:product_variants(*),
        reviews:reviews(rating, is_approved)
      `)
      .eq('is_active', true);

    // Apply filters
    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters.brand) {
      query = query.eq('brand_id', filters.brand);
    }

    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,tags.cs.{${filters.search}}`);
    }

    if (filters.tags && filters.tags.length > 0) {
      query = query.overlaps('tags', filters.tags);
    }

    // Apply sorting
    if (filters.sortBy) {
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data: products, error, count } = await query;

    if (error) throw error;

    // Calculate average ratings
    const productsWithRatings = products?.map(product => {
      const approvedReviews = product.reviews?.filter(review => review.is_approved) || [];
      const average_rating = approvedReviews.length > 0 
        ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length 
        : 0;
      
      return {
        ...product,
        average_rating,
        review_count: approvedReviews.length
      };
    }) || [];

    return {
      products: productsWithRatings,
      total: count || 0
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get single product by ID or slug
export const getProduct = async (idOrSlug: string): Promise<ProductWithDetails | null> => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        brand:brands(*),
        variants:product_variants(*),
        reviews:reviews(*, profiles(full_name, avatar_url))
      `)
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    if (!product) return null;

    // Calculate average rating
    const approvedReviews = product.reviews?.filter(review => review.is_approved) || [];
    const average_rating = approvedReviews.length > 0 
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length 
      : 0;

    return {
      ...product,
      average_rating,
      review_count: approvedReviews.length
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async (limit: number = 8): Promise<ProductWithDetails[]> => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        brand:brands(*),
        reviews:reviews(rating, is_approved)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Calculate average ratings
    const productsWithRatings = products?.map(product => {
      const approvedReviews = product.reviews?.filter(review => review.is_approved) || [];
      const average_rating = approvedReviews.length > 0 
        ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length 
        : 0;
      
      return {
        ...product,
        average_rating,
        review_count: approvedReviews.length
      };
    }) || [];

    return productsWithRatings;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categorySlug: string, limit?: number): Promise<ProductWithDetails[]> => {
  try {
    // First get the category
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .eq('is_active', true)
      .single();

    if (categoryError) throw categoryError;

    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        brand:brands(*),
        reviews:reviews(rating, is_approved)
      `)
      .eq('category_id', category.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data: products, error } = await query;

    if (error) throw error;

    // Calculate average ratings
    const productsWithRatings = products?.map(product => {
      const approvedReviews = product.reviews?.filter(review => review.is_approved) || [];
      const average_rating = approvedReviews.length > 0 
        ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length 
        : 0;
      
      return {
        ...product,
        average_rating,
        review_count: approvedReviews.length
      };
    }) || [];

    return productsWithRatings;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (searchTerm: string, limit: number = 20): Promise<ProductWithDetails[]> => {
  return getProducts({
    search: searchTerm,
    limit,
    sortBy: 'name',
    sortOrder: 'asc'
  }).then(result => result.products);
};

// Admin functions
export const createProduct = async (product: ProductInsert): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, updates: ProductUpdate): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Product variants
export const getProductVariants = async (productId: string): Promise<ProductVariant[]> => {
  try {
    const { data, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching product variants:', error);
    throw error;
  }
};
