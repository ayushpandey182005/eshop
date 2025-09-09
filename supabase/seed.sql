-- Insert sample data for eCommerce platform

-- Insert categories
INSERT INTO categories (id, name, slug, description, image_url, parent_id, is_active, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Electronics', 'electronics', 'Latest gadgets and electronic devices', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop', NULL, true, 1),
('550e8400-e29b-41d4-a716-446655440002', 'Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', NULL, true, 2),
('550e8400-e29b-41d4-a716-446655440003', 'Home & Kitchen', 'home-kitchen', 'Home appliances and kitchen essentials', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', NULL, true, 3),
('550e8400-e29b-41d4-a716-446655440004', 'Books', 'books', 'Wide collection of books and magazines', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop', NULL, true, 4),
('550e8400-e29b-41d4-a716-446655440005', 'Sports', 'sports', 'Sports equipment and fitness gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', NULL, true, 5),

-- Electronics subcategories
('550e8400-e29b-41d4-a716-446655440011', 'Smartphones', 'smartphones', 'Latest smartphones and accessories', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop', '550e8400-e29b-41d4-a716-446655440001', true, 1),
('550e8400-e29b-41d4-a716-446655440012', 'Laptops', 'laptops', 'Laptops and computers', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop', '550e8400-e29b-41d4-a716-446655440001', true, 2),
('550e8400-e29b-41d4-a716-446655440013', 'Headphones', 'headphones', 'Audio devices and headphones', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', '550e8400-e29b-41d4-a716-446655440001', true, 3),

-- Fashion subcategories
('550e8400-e29b-41d4-a716-446655440021', 'Men''s Clothing', 'mens-clothing', 'Men''s fashion and apparel', 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&h=300&fit=crop', '550e8400-e29b-41d4-a716-446655440002', true, 1),
('550e8400-e29b-41d4-a716-446655440022', 'Women''s Clothing', 'womens-clothing', 'Women''s fashion and apparel', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop', '550e8400-e29b-41d4-a716-446655440002', true, 2);

-- Insert brands
INSERT INTO brands (id, name, slug, logo_url, description, is_active) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Samsung', 'samsung', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=100&fit=crop', 'Leading electronics manufacturer', true),
('650e8400-e29b-41d4-a716-446655440002', 'Apple', 'apple', 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=200&h=100&fit=crop', 'Premium technology products', true),
('650e8400-e29b-41d4-a716-446655440003', 'Nike', 'nike', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop', 'Sports and lifestyle brand', true),
('650e8400-e29b-41d4-a716-446655440004', 'Adidas', 'adidas', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=100&fit=crop', 'Sports equipment and apparel', true),
('650e8400-e29b-41d4-a716-446655440005', 'Sony', 'sony', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=100&fit=crop', 'Electronics and entertainment', true);

-- Insert products
INSERT INTO products (id, name, slug, description, short_description, sku, price, compare_price, cost_price, track_inventory, inventory_quantity, category_id, brand_id, tags, images, is_active, is_featured, meta_title, meta_description) VALUES
-- Smartphones
('750e8400-e29b-41d4-a716-446655440001', 'Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'The most advanced Galaxy smartphone with AI-powered camera and S Pen functionality. Features a 6.8-inch Dynamic AMOLED display, 200MP camera system, and all-day battery life.', 'Latest Samsung flagship with AI camera and S Pen', 'SAM-S24U-256-BLK', 124999.00, 134999.00, 95000.00, true, 50, '550e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440001', ARRAY['smartphone', 'android', '5g', 'camera'], ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'], true, true, 'Samsung Galaxy S24 Ultra - Best Android Phone', 'Buy Samsung Galaxy S24 Ultra with AI camera, S Pen, and 5G connectivity'),

('750e8400-e29b-41d4-a716-446655440002', 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'The ultimate iPhone experience with titanium design, A17 Pro chip, and advanced camera system. Features Action Button and USB-C connectivity.', 'Latest iPhone with titanium design and A17 Pro chip', 'APL-IP15PM-256-NTL', 159900.00, 169900.00, 120000.00, true, 30, '550e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440002', ARRAY['iphone', 'ios', '5g', 'premium'], ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'], true, true, 'iPhone 15 Pro Max - Premium iOS Experience', 'Buy iPhone 15 Pro Max with titanium design and advanced camera system'),

-- Laptops
('750e8400-e29b-41d4-a716-446655440003', 'MacBook Pro 16-inch M3', 'macbook-pro-16-m3', 'Supercharged for pros with M3 chip, up to 22 hours of battery life, and stunning Liquid Retina XDR display. Perfect for creative professionals.', 'Professional laptop with M3 chip and XDR display', 'APL-MBP16-M3-512-SG', 249900.00, 259900.00, 180000.00, true, 15, '550e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440002', ARRAY['laptop', 'macbook', 'professional', 'm3'], ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop'], true, true, 'MacBook Pro 16-inch M3 - Pro Performance', 'Buy MacBook Pro 16-inch with M3 chip for professional workflows'),

-- Headphones
('750e8400-e29b-41d4-a716-446655440004', 'Sony WH-1000XM5', 'sony-wh-1000xm5', 'Industry-leading noise canceling headphones with exceptional sound quality, 30-hour battery life, and crystal-clear call quality.', 'Premium noise-canceling headphones', 'SNY-WH1000XM5-BLK', 29990.00, 34990.00, 22000.00, true, 25, '550e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440005', ARRAY['headphones', 'wireless', 'noise-canceling', 'premium'], ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'], true, false, 'Sony WH-1000XM5 - Best Noise Canceling Headphones', 'Buy Sony WH-1000XM5 with industry-leading noise cancellation'),

-- Fashion items
('750e8400-e29b-41d4-a716-446655440005', 'Nike Air Force 1', 'nike-air-force-1', 'The iconic basketball shoe that changed the game. Classic white leather upper with Nike Air cushioning for all-day comfort.', 'Classic Nike basketball shoes', 'NK-AF1-WHT-10', 7495.00, 8495.00, 5500.00, true, 100, '550e8400-e29b-41d4-a716-446655440021', '650e8400-e29b-41d4-a716-446655440003', ARRAY['shoes', 'sneakers', 'basketball', 'classic'], ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop'], true, true, 'Nike Air Force 1 - Classic Basketball Shoes', 'Buy Nike Air Force 1 classic white sneakers with Air cushioning'),

('750e8400-e29b-41d4-a716-446655440006', 'Adidas Ultraboost 22', 'adidas-ultraboost-22', 'Revolutionary running shoes with BOOST midsole technology and Primeknit upper for ultimate comfort and performance.', 'High-performance running shoes', 'ADS-UB22-BLK-9', 16999.00, 18999.00, 12000.00, true, 75, '550e8400-e29b-41d4-a716-446655440021', '650e8400-e29b-41d4-a716-446655440004', ARRAY['shoes', 'running', 'boost', 'performance'], ARRAY['https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'], true, false, 'Adidas Ultraboost 22 - Premium Running Shoes', 'Buy Adidas Ultraboost 22 with BOOST technology for runners');

-- Insert product variants
INSERT INTO product_variants (id, product_id, name, sku, price, compare_price, inventory_quantity, attributes, image_url, is_active) VALUES
-- Samsung Galaxy S24 Ultra variants
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Black - 256GB', 'SAM-S24U-256-BLK', 124999.00, 134999.00, 50, '{"color": "Black", "storage": "256GB"}', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', true),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'Titanium Gray - 512GB', 'SAM-S24U-512-TGR', 144999.00, 154999.00, 30, '{"color": "Titanium Gray", "storage": "512GB"}', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', true),

-- iPhone 15 Pro Max variants
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440002', 'Natural Titanium - 256GB', 'APL-IP15PM-256-NTL', 159900.00, 169900.00, 30, '{"color": "Natural Titanium", "storage": "256GB"}', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop', true),
('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440002', 'Blue Titanium - 512GB', 'APL-IP15PM-512-BLU', 179900.00, 189900.00, 20, '{"color": "Blue Titanium", "storage": "512GB"}', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop', true),

-- Nike Air Force 1 variants
('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440005', 'White - Size 9', 'NK-AF1-WHT-9', 7495.00, 8495.00, 25, '{"color": "White", "size": "9"}', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', true),
('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440005', 'White - Size 10', 'NK-AF1-WHT-10', 7495.00, 8495.00, 30, '{"color": "White", "size": "10"}', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', true),
('850e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440005', 'Black - Size 9', 'NK-AF1-BLK-9', 7495.00, 8495.00, 20, '{"color": "Black", "size": "9"}', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop', true);

-- Insert coupons
INSERT INTO coupons (id, code, name, description, type, value, minimum_amount, maximum_discount, usage_limit, is_active, starts_at, expires_at) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'WELCOME10', 'Welcome Discount', 'Get 10% off on your first order', 'percentage', 10.00, 1000.00, 5000.00, 1000, true, NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days'),
('950e8400-e29b-41d4-a716-446655440002', 'SAVE500', 'Flat ₹500 Off', 'Flat ₹500 discount on orders above ₹5000', 'fixed_amount', 500.00, 5000.00, 500.00, 500, true, NOW() - INTERVAL '1 day', NOW() + INTERVAL '15 days'),
('950e8400-e29b-41d4-a716-446655440003', 'FREESHIP', 'Free Shipping', 'Free shipping on all orders', 'free_shipping', 0.00, 999.00, NULL, NULL, true, NOW() - INTERVAL '1 day', NOW() + INTERVAL '60 days'),
('950e8400-e29b-41d4-a716-446655440004', 'ELECTRONICS20', 'Electronics Sale', '20% off on electronics', 'percentage', 20.00, 2000.00, 10000.00, 200, true, NOW() - INTERVAL '1 day', NOW() + INTERVAL '7 days');

-- Insert banners
INSERT INTO banners (id, title, subtitle, image_url, link_url, position, is_active, sort_order, starts_at, expires_at) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 'Mega Electronics Sale', 'Up to 50% off on smartphones, laptops & more', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop', '/category/electronics', 'hero', true, 1, NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days'),
('a50e8400-e29b-41d4-a716-446655440002', 'Fashion Week Special', 'Trendy styles at unbeatable prices', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop', '/category/fashion', 'hero', true, 2, NOW() - INTERVAL '1 day', NOW() + INTERVAL '15 days'),
('a50e8400-e29b-41d4-a716-446655440003', 'New Arrivals', 'Check out the latest products', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop', '/category/electronics', 'category', true, 1, NOW() - INTERVAL '1 day', NOW() + INTERVAL '60 days');
