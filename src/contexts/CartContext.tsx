import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  image?: string;
  image_url?: string;
  originalPrice?: number;
  compare_price?: number;
  category?: string;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface WishlistItem {
  id: string;
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToWishlist: (productId: string) => void;
  moveToCart: (productId: string) => void;
  clearCart: () => void;
  clearUserData: () => void;
  loadUserData: (userId: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Helper functions for user-specific localStorage keys
  const getCartKey = (userId?: string) => userId ? `cart_${userId}` : 'cart_guest';
  const getWishlistKey = (userId?: string) => userId ? `wishlist_${userId}` : 'wishlist_guest';

  // Load user-specific data when user changes
  useEffect(() => {
    if (user) {
      loadUserData(user.id);
    } else {
      // Load guest data
      loadUserData();
    }
  }, [user]);

  const loadUserData = (userId?: string) => {
    const cartKey = getCartKey(userId);
    const wishlistKey = getWishlistKey(userId);
    
    const savedCart = localStorage.getItem(cartKey);
    const savedWishlist = localStorage.getItem(wishlistKey);
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
    
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        setWishlistItems([]);
      }
    } else {
      setWishlistItems([]);
    }
  };

  // Save to localStorage whenever cart changes
  useEffect(() => {
    const cartKey = getCartKey(user?.id);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, user]);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    const wishlistKey = getWishlistKey(user?.id);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
  }, [wishlistItems, user]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: `cart-${Date.now()}`, product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) return prev;
      return [...prev, { id: `wishlist-${Date.now()}`, product }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const moveToWishlist = (productId: string) => {
    const cartItem = cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      addToWishlist(cartItem.product);
      removeFromCart(productId);
    }
  };

  const moveToCart = (productId: string) => {
    const wishlistItem = wishlistItems.find(item => item.product.id === productId);
    if (wishlistItem) {
      addToCart(wishlistItem.product);
      removeFromWishlist(productId);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearUserData = () => {
    setCartItems([]);
    setWishlistItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product.id === productId);
  };

  const value: CartContextType = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    moveToWishlist,
    moveToCart,
    clearCart,
    clearUserData,
    loadUserData,
    getCartTotal,
    getCartCount,
    isInCart,
    isInWishlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
