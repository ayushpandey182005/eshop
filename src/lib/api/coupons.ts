import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Coupon = Database['public']['Tables']['coupons']['Row'];
type CouponInsert = Database['public']['Tables']['coupons']['Insert'];
type CouponUpdate = Database['public']['Tables']['coupons']['Update'];

// Get active coupons
export const getActiveCoupons = async (): Promise<Coupon[]> => {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('is_active', true)
      .or(`expires_at.is.null,expires_at.gte.${new Date().toISOString()}`)
      .or(`starts_at.is.null,starts_at.lte.${new Date().toISOString()}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching active coupons:', error);
    throw error;
  }
};

// Validate and apply coupon
export const validateCoupon = async (
  code: string,
  cartTotal: number
): Promise<{
  valid: boolean;
  coupon?: Coupon;
  discount?: number;
  message?: string;
}> => {
  try {
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return {
        valid: false,
        message: 'Invalid coupon code'
      };
    }

    const now = new Date();

    // Check if coupon has started
    if (coupon.starts_at && new Date(coupon.starts_at) > now) {
      return {
        valid: false,
        message: 'Coupon is not yet active'
      };
    }

    // Check if coupon has expired
    if (coupon.expires_at && new Date(coupon.expires_at) < now) {
      return {
        valid: false,
        message: 'Coupon has expired'
      };
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return {
        valid: false,
        message: 'Coupon usage limit exceeded'
      };
    }

    // Check minimum amount
    if (coupon.minimum_amount && cartTotal < coupon.minimum_amount) {
      return {
        valid: false,
        message: `Minimum order amount of ₹${coupon.minimum_amount} required`
      };
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (cartTotal * coupon.value) / 100;
    } else {
      discount = coupon.value;
    }

    // Apply maximum discount limit
    if (coupon.maximum_discount && discount > coupon.maximum_discount) {
      discount = coupon.maximum_discount;
    }

    return {
      valid: true,
      coupon,
      discount,
      message: `Coupon applied! You saved ₹${discount.toFixed(2)}`
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return {
      valid: false,
      message: 'Error validating coupon'
    };
  }
};

// Get coupon by code
export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Error fetching coupon by code:', error);
    return null;
  }
};

// Admin functions
export const createCoupon = async (coupon: CouponInsert): Promise<Coupon> => {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .insert({
        ...coupon,
        code: coupon.code.toUpperCase()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
};

export const updateCoupon = async (id: string, updates: CouponUpdate): Promise<Coupon> => {
  try {
    const updateData = { ...updates };
    if (updateData.code) {
      updateData.code = updateData.code.toUpperCase();
    }

    const { data, error } = await supabase
      .from('coupons')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating coupon:', error);
    throw error;
  }
};

export const deleteCoupon = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('coupons')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting coupon:', error);
    throw error;
  }
};

export const getAllCoupons = async (): Promise<Coupon[]> => {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all coupons:', error);
    throw error;
  }
};
