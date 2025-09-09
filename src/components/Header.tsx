import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getAllProducts, initializeProducts } from "@/data/products";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  LogOut,
  Package,
  UserCircle,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { user, signOut } = useAuth();
  const { getCartCount, clearUserData } = useCart();
  const navigate = useNavigate();

  const cartCount = getCartCount();

  useEffect(() => {
    // Ensure all products are available for search
    initializeProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchProducts(searchQuery);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const searchProducts = (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const allProducts = getAllProducts();
      const filtered = allProducts.filter((product: any) =>
        product.name?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSearchResults(filtered);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    }
  };

  const handleSearchSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
    }
  };

  const handleSignOut = async () => {
    console.log('Header: handleSignOut clicked');
    try {
      // Clear current session data only (not user-specific data)
      clearUserData();
      
      // Sign out from Supabase
      await signOut();
      
      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error('Error during sign out:', error);
      // Even if signOut fails, navigate
      navigate("/");
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>Free Delivery</span>
            <span>•</span>
            <span>Return Policy</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Download App</span>
            <span>•</span>
            <span>Sell Online</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/">
              <h1 className="text-2xl font-bold text-primary">
                ShopMart
              </h1>
            </Link>
            
            {/* Categories dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="hidden lg:flex items-center gap-1 text-sm cursor-pointer hover:text-primary">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => navigate("/category/electronics")}>
                  📱 Electronics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/category/fashion")}>
                  👕 Fashion
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/category/home-garden")}>
                  🏠 Home & Garden
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/category/sports")}>
                  ⚽ Sports
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/category/beauty")}>
                  💄 Beauty
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/category/watches")}>
                  ⌚ Watches
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/category/automotive")}>
                  🚗 Automotive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/category/laptops")}>
                  💻 Laptops
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 py-2 w-full"
                onFocus={() => searchQuery.length > 2 && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-50 mt-1">
                  {searchResults.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer"
                      onClick={() => handleSearchSelect(product.id)}
                    >
                      <img
                        src={product.images?.[0] || product.image || product.image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop"}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">₹{product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Right navigation */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              </Link>
            )}
            
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden md:inline">Wishlist</span>
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden md:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;