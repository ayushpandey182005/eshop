import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Address = Database['public']['Tables']['addresses']['Row'];
type AddressInsert = Database['public']['Tables']['addresses']['Insert'];
type AddressUpdate = Database['public']['Tables']['addresses']['Update'];

// Get user's addresses
export const getUserAddresses = async (userId: string): Promise<Address[]> => {
  try {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    throw error;
  }
};

// Get default address
export const getDefaultAddress = async (userId: string): Promise<Address | null> => {
  try {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .eq('is_default', true)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Error fetching default address:', error);
    return null;
  }
};

// Create new address
export const createAddress = async (
  userId: string,
  addressData: Omit<AddressInsert, 'user_id' | 'id'>
): Promise<Address> => {
  try {
    // If this is set as default, unset other default addresses
    if (addressData.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', userId);
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        ...addressData,
        user_id: userId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

// Update address
export const updateAddress = async (
  addressId: string,
  userId: string,
  updates: Omit<AddressUpdate, 'user_id' | 'id'>
): Promise<Address> => {
  try {
    // If this is set as default, unset other default addresses
    if (updates.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', userId);
    }

    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', addressId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

// Delete address
export const deleteAddress = async (addressId: string, userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

// Set default address
export const setDefaultAddress = async (addressId: string, userId: string): Promise<Address> => {
  try {
    // First, unset all default addresses for the user
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', userId);

    // Then set the specified address as default
    const { data, error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', addressId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
};
