import { supabase } from '@/integrations/supabase/client';

// Test database connection and basic operations
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test 1: Check if we can connect to Supabase
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Auth session:', session ? 'Active' : 'None');

    // Test 2: Try to fetch categories (should work even without auth)
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(5);

    if (categoriesError) {
      console.error('Categories error:', categoriesError);
    } else {
      console.log('Categories fetched:', categories?.length || 0);
    }

    // Test 3: Try to fetch products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5);

    if (productsError) {
      console.error('Products error:', productsError);
    } else {
      console.log('Products fetched:', products?.length || 0);
    }

    return {
      success: true,
      categoriesCount: categories?.length || 0,
      productsCount: products?.length || 0
    };
  } catch (error) {
    console.error('Database test failed:', error);
    return {
      success: false,
      error: error
    };
  }
};

// Add some test data if tables are empty
export const seedTestData = async () => {
  try {
    // Check if we already have data
    const { data: existingCategories } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (existingCategories && existingCategories.length > 0) {
      console.log('Data already exists, skipping seed');
      return;
    }

    console.log('Seeding test data...');

    // Add a test category
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .insert({
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        is_active: true,
        sort_order: 1
      })
      .select()
      .single();

    if (categoryError) {
      console.error('Category seed error:', categoryError);
      return;
    }

    console.log('Category created:', category.id);

    // Add a test brand
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .insert({
        name: 'Samsung',
        slug: 'samsung',
        description: 'Samsung Electronics',
        is_active: true
      })
      .select()
      .single();

    if (brandError) {
      console.error('Brand seed error:', brandError);
      return;
    }

    console.log('Brand created:', brand.id);

    // Add a test product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        name: 'Samsung Galaxy S24',
        slug: 'samsung-galaxy-s24',
        description: 'Latest Samsung flagship smartphone',
        short_description: 'Premium smartphone with advanced features',
        sku: 'SAM-S24-001',
        price: 79999,
        compare_price: 89999,
        inventory_quantity: 50,
        category_id: category.id,
        brand_id: brand.id,
        images: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'
        ],
        tags: ['smartphone', 'android', 'flagship'],
        is_active: true,
        is_featured: true
      })
      .select()
      .single();

    if (productError) {
      console.error('Product seed error:', productError);
      return;
    }

    console.log('Product created:', product.id);

    // Add a test coupon
    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .insert({
        code: 'WELCOME10',
        name: 'Welcome Discount',
        description: '10% off on first purchase',
        type: 'percentage',
        value: 10,
        minimum_amount: 1000,
        maximum_discount: 2000,
        usage_limit: 100,
        is_active: true,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      })
      .select()
      .single();

    if (couponError) {
      console.error('Coupon seed error:', couponError);
    } else {
      console.log('Coupon created:', coupon.id);
    }

    console.log('Test data seeded successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
  }
};
