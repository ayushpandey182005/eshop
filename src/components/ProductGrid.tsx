import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface ProductGridProps {
  title: string;
  viewAllLink?: string;
  category?: string;
}

const ProductGrid = ({ title, viewAllLink, category }: ProductGridProps) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      // For now, let's use dummy data since database might not be set up
      const dummyProducts = [
        {
          id: '1',
          name: 'Samsung Galaxy S24 Ultra',
          price: 124999,
          compare_price: 139999,
          images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'],
          category: 'electronics',
          brand: 'Samsung',
          rating: 4.5,
          reviews: 1250
        },
        {
          id: '2',
          name: 'iPhone 15 Pro',
          price: 134900,
          compare_price: 149900,
          images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop'],
          category: 'electronics',
          brand: 'Apple',
          rating: 4.7,
          reviews: 890
        },
        {
          id: '3',
          name: 'Sony WH-1000XM5',
          price: 29990,
          compare_price: 34990,
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
          category: 'electronics',
          brand: 'Sony',
          rating: 4.6,
          reviews: 567
        },
        {
          id: '4',
          name: 'MacBook Air M2',
          price: 114900,
          compare_price: 119900,
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop'],
          category: 'electronics',
          brand: 'Apple',
          rating: 4.8,
          reviews: 432
        },
        {
          id: '5',
          name: 'Nike Air Max 270',
          price: 12995,
          compare_price: 14995,
          images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'],
          category: 'fashion',
          brand: 'Nike',
          rating: 4.3,
          reviews: 789
        },
        {
          id: '6',
          name: 'Adidas Ultraboost 22',
          price: 16999,
          compare_price: 18999,
          images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop'],
          category: 'fashion',
          brand: 'Adidas',
          rating: 4.4,
          reviews: 654
        },
        {
          id: '7',
          name: 'Levi\'s 511 Slim Jeans',
          price: 3999,
          compare_price: 4999,
          images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop'],
          category: 'fashion',
          brand: 'Levi\'s',
          rating: 4.2,
          reviews: 345
        },
        {
          id: '8',
          name: 'Canon EOS R5',
          price: 329999,
          compare_price: 349999,
          images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop'],
          category: 'electronics',
          brand: 'Canon',
          rating: 4.9,
          reviews: 123
        }
      ];

      // Filter by category if specified
      let filteredProducts = dummyProducts;
      if (category) {
        filteredProducts = dummyProducts.filter(product => 
          product.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      setProducts(filteredProducts.slice(0, 8));
      
      // Store products in localStorage for ProductDetail page
      const existingProducts = JSON.parse(localStorage.getItem('mockProducts') || '[]');
      const existingIds = new Set(existingProducts.map((p: any) => p.id));
      
      const newProducts = filteredProducts.filter(product => !existingIds.has(product.id));
      if (newProducts.length > 0) {
        const updatedProducts = [...existingProducts, ...newProducts];
        localStorage.setItem('mockProducts', JSON.stringify(updatedProducts));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-primary hover:text-primary-dark font-medium">
            View All →
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;