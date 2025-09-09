import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Grid, List, Filter, X, Star, Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, initializeProducts } from '@/data/products';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ecoFilters, setEcoFilters] = useState({
    minEcoScore: 0,
    fairTradeOnly: false,
    lowCarbonOnly: false,
    highRecyclableOnly: false
  });

  useEffect(() => {
    performSearch();
  }, [query, priceRange, selectedBrands, selectedCategories, sortBy, ecoFilters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      // Get all products from centralized data
      const allProducts = getAllProducts();
      
      // Filter products based on search query
      let filtered = allProducts.filter((product: any) =>
        product.name?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );

      // Apply filters
      filtered = filtered.filter((product: any) => {
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        // Eco filters
        const ecoScoreMatch = !product.sustainability || product.sustainability.ecoScore >= ecoFilters.minEcoScore;
        const fairTradeMatch = !ecoFilters.fairTradeOnly || (product.sustainability?.fairTrade === true);
        const lowCarbonMatch = !ecoFilters.lowCarbonOnly || (product.sustainability?.carbonFootprint.rating === 'low');
        const recyclableMatch = !ecoFilters.highRecyclableOnly || (product.sustainability?.recyclablePercentage >= 80);
        
        return priceMatch && brandMatch && categoryMatch && ecoScoreMatch && fairTradeMatch && lowCarbonMatch && recyclableMatch;
      });

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a: any, b: any) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a: any, b: any) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'eco-score':
          filtered.sort((a: any, b: any) => (b.sustainability?.ecoScore || 0) - (a.sustainability?.ecoScore || 0));
          break;
        case 'newest':
          // For demo purposes, sort by id (assuming higher id = newer)
          filtered.sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id));
          break;
        default:
          // Relevance - no additional sorting needed
          break;
      }

      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique brands and categories from search results
  const getBrandsAndCategories = () => {
    const allProducts = getAllProducts();
    const brands = [...new Set(allProducts.map((p: any) => p.brand).filter(Boolean))] as string[];
    const categories = [...new Set(allProducts.map((p: any) => p.category).filter(Boolean))] as string[];
    return { brands, categories };
  };

  const { brands, categories } = getBrandsAndCategories();

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Searching for "{query}"...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Sort and View Options */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="eco-score">Eco Score</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5" />
                  <h2 className="font-semibold">Filters</h2>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cat-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brands */}
                {brands.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Brand</h3>
                    <div className="space-y-2">
                      {brands.slice(0, 10).map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => handleBrandToggle(brand)}
                          />
                          <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Eco Filters */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Eco Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="eco-score"
                        checked={ecoFilters.minEcoScore > 0}
                        onCheckedChange={() => setEcoFilters(prev => ({ ...prev, minEcoScore: prev.minEcoScore > 0 ? 0 : 50 }))}
                      />
                      <label htmlFor="eco-score" className="text-sm cursor-pointer">
                        Eco Score: {ecoFilters.minEcoScore > 0 ? '50+' : 'All'}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fair-trade"
                        checked={ecoFilters.fairTradeOnly}
                        onCheckedChange={() => setEcoFilters(prev => ({ ...prev, fairTradeOnly: !prev.fairTradeOnly }))}
                      />
                      <label htmlFor="fair-trade" className="text-sm cursor-pointer">
                        Fair Trade Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="low-carbon"
                        checked={ecoFilters.lowCarbonOnly}
                        onCheckedChange={() => setEcoFilters(prev => ({ ...prev, lowCarbonOnly: !prev.lowCarbonOnly }))}
                      />
                      <label htmlFor="low-carbon" className="text-sm cursor-pointer">
                        Low Carbon Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="high-recyclable"
                        checked={ecoFilters.highRecyclableOnly}
                        onCheckedChange={() => setEcoFilters(prev => ({ ...prev, highRecyclableOnly: !prev.highRecyclableOnly }))}
                      />
                      <label htmlFor="high-recyclable" className="text-sm cursor-pointer">
                        High Recyclable Only
                      </label>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 200000]);
                    setSelectedBrands([]);
                    setSelectedCategories([]);
                    setEcoFilters({
                      minEcoScore: 0,
                      fairTradeOnly: false,
                      lowCarbonOnly: false,
                      highRecyclableOnly: false
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {searchResults.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No products found for "{query}"
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try different keywords or check your spelling
                </p>
                <Button onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
