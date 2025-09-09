import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
  product_count?: number;
}

// Get all categories
export const getCategories = async (includeInactive: boolean = false): Promise<CategoryWithChildren[]> => {
  try {
    let query = supabase
      .from('categories')
      .select('*')
      .order('sort_order');

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Build category tree
    const categoryMap = new Map<string, CategoryWithChildren>();
    const rootCategories: CategoryWithChildren[] = [];

    // First pass: create all categories
    data?.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Second pass: build tree structure
    data?.forEach(category => {
      const categoryWithChildren = categoryMap.get(category.id)!;
      
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.children!.push(categoryWithChildren);
        }
      } else {
        rootCategories.push(categoryWithChildren);
      }
    });

    return rootCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get single category by ID or slug
export const getCategory = async (idOrSlug: string): Promise<Category | null> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Get category with product count
export const getCategoryWithProductCount = async (categoryId: string): Promise<CategoryWithChildren | null> => {
  try {
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .eq('is_active', true)
      .single();

    if (categoryError) throw categoryError;

    const { count, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId)
      .eq('is_active', true);

    if (countError) throw countError;

    return {
      ...category,
      product_count: count || 0
    };
  } catch (error) {
    console.error('Error fetching category with product count:', error);
    throw error;
  }
};

// Get featured categories
export const getFeaturedCategories = async (limit: number = 8): Promise<CategoryWithChildren[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .not('image_url', 'is', null)
      .order('sort_order')
      .limit(limit);

    if (error) throw error;

    // Get product counts for each category
    const categoriesWithCounts = await Promise.all(
      (data || []).map(async (category) => {
        const { count } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('is_active', true);

        return {
          ...category,
          product_count: count || 0
        };
      })
    );

    return categoriesWithCounts;
  } catch (error) {
    console.error('Error fetching featured categories:', error);
    throw error;
  }
};

// Admin functions
export const createCategory = async (category: CategoryInsert): Promise<Category> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id: string, updates: CategoryUpdate): Promise<Category> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('categories')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
