import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Category = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  // Category-specific products
  const getCategoryProducts = (categoryName: string) => {
    const allProducts = {
      electronics: [
        {
          id: "1",
          name: "Samsung Galaxy S24 Ultra 5G",
          price: 124999,
          originalPrice: 139999,
          rating: 4.5,
          reviews: 12847,
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
          badge: "Bestseller",
          category: "Electronics"
        },
        {
          id: "2",
          name: "iPhone 15 Pro Max",
          price: 159900,
          originalPrice: 179900,
          rating: 4.7,
          reviews: 8934,
          image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
          category: "Electronics"
        },
        {
          id: "3",
          name: "OnePlus 12 5G",
          price: 64999,
          originalPrice: 69999,
          rating: 4.4,
          reviews: 5672,
          image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=300&h=300&fit=crop",
          category: "Electronics"
        },
        {
          id: "15",
          name: "Xiaomi 14 Ultra",
          price: 89999,
          originalPrice: 99999,
          rating: 4.3,
          reviews: 4521,
          image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop",
          category: "Electronics"
        },
        {
          id: "16",
          name: "Google Pixel 8 Pro",
          price: 106999,
          originalPrice: 119999,
          rating: 4.6,
          reviews: 3876,
          image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
          category: "Electronics"
        },
        {
          id: "17",
          name: "Sony WH-1000XM5 Headphones",
          price: 29990,
          originalPrice: 34990,
          rating: 4.8,
          reviews: 6543,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
          badge: "Top Rated",
          category: "Electronics"
        },
        {
          id: "18",
          name: "iPad Pro 12.9 M2",
          price: 112900,
          originalPrice: 119900,
          rating: 4.5,
          reviews: 2987,
          image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
          category: "Electronics"
        },
        {
          id: "19",
          name: "Samsung 65 4K Smart TV",
          price: 89999,
          originalPrice: 109999,
          rating: 4.4,
          reviews: 1876,
          image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
          category: "Electronics"
        },
        {
          id: "20",
          name: "JBL Charge 5 Speaker",
          price: 14999,
          originalPrice: 17999,
          rating: 4.2,
          reviews: 3421,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
          category: "Electronics"
        },
        {
          id: "21",
          name: "Canon EOS R6 Camera",
          price: 189999,
          originalPrice: 219999,
          rating: 4.7,
          reviews: 1543,
          image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop",
          category: "Electronics"
        }
      ],
      fashion: [
        {
          id: "4",
          name: "Nike Air Force 1",
          price: 7495,
          originalPrice: 8995,
          rating: 4.3,
          reviews: 2341,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "5",
          name: "Levi's 501 Original Jeans",
          price: 3999,
          originalPrice: 4999,
          rating: 4.2,
          reviews: 1876,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "8",
          name: "Adidas Ultraboost 22",
          price: 16999,
          originalPrice: 18999,
          rating: 4.4,
          reviews: 1543,
          image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "22",
          name: "H&M Cotton T-Shirt",
          price: 799,
          originalPrice: 999,
          rating: 4.0,
          reviews: 987,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "23",
          name: "Zara Formal Blazer",
          price: 4999,
          originalPrice: 6999,
          rating: 4.3,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "24",
          name: "Nike Pro Shorts",
          price: 2499,
          originalPrice: 2999,
          rating: 4.1,
          reviews: 1234,
          image: "https://images.unsplash.com/photo-1506629905607-c7f0b1d6f4b1?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "25",
          name: "Adidas Originals Hoodie",
          price: 5999,
          originalPrice: 7499,
          rating: 4.4,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "26",
          name: "Levi's Denim Jacket",
          price: 6999,
          originalPrice: 8999,
          rating: 4.2,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "27",
          name: "Nike Air Max 270",
          price: 12995,
          originalPrice: 14995,
          rating: 4.5,
          reviews: 2109,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
          category: "Fashion"
        },
        {
          id: "28",
          name: "H&M Skinny Fit Chinos",
          price: 1999,
          originalPrice: 2499,
          rating: 4.0,
          reviews: 765,
          image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop",
          category: "Fashion"
        }
      ],
      "home-garden": [
        {
          id: "9",
          name: "IKEA HEMNES Bed Frame",
          price: 12999,
          originalPrice: 14999,
          rating: 4.1,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "10",
          name: "Philips Air Purifier",
          price: 18999,
          originalPrice: 21999,
          rating: 4.3,
          reviews: 1234,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "29",
          name: "Urban Ladder Dining Table",
          price: 24999,
          originalPrice: 29999,
          rating: 4.2,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "30",
          name: "Godrej Steel Almirah",
          price: 15999,
          originalPrice: 18999,
          rating: 4.0,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "31",
          name: "Pepperfry Sofa Set",
          price: 39999,
          originalPrice: 49999,
          rating: 4.4,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "32",
          name: "IKEA Kitchen Cabinet",
          price: 8999,
          originalPrice: 10999,
          rating: 4.1,
          reviews: 321,
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "33",
          name: "Philips LED Ceiling Light",
          price: 2999,
          originalPrice: 3999,
          rating: 4.3,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "34",
          name: "Urban Ladder Office Chair",
          price: 11999,
          originalPrice: 14999,
          rating: 4.2,
          reviews: 789,
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "35",
          name: "Godrej Refrigerator 190L",
          price: 18999,
          originalPrice: 21999,
          rating: 4.0,
          reviews: 1098,
          image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop",
          category: "Home & Garden"
        },
        {
          id: "36",
          name: "IKEA Storage Boxes Set",
          price: 1999,
          originalPrice: 2499,
          rating: 4.1,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
          category: "Home & Garden"
        }
      ],
      sports: [
        {
          id: "11",
          name: "Nike Dri-FIT T-Shirt",
          price: 1999,
          originalPrice: 2499,
          rating: 4.2,
          reviews: 987,
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "37",
          name: "Adidas Football",
          price: 2999,
          originalPrice: 3499,
          rating: 4.3,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "38",
          name: "Puma Running Shoes",
          price: 8999,
          originalPrice: 10999,
          rating: 4.4,
          reviews: 1234,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "39",
          name: "Reebok Gym Bag",
          price: 2499,
          originalPrice: 2999,
          rating: 4.1,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "40",
          name: "Under Armour Compression Shirt",
          price: 3499,
          originalPrice: 3999,
          rating: 4.5,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "41",
          name: "Nike Basketball",
          price: 3999,
          originalPrice: 4499,
          rating: 4.2,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "42",
          name: "Adidas Track Pants",
          price: 4999,
          originalPrice: 5999,
          rating: 4.3,
          reviews: 765,
          image: "https://images.unsplash.com/photo-1506629905607-c7f0b1d6f4b1?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "43",
          name: "Puma Sports Watch",
          price: 6999,
          originalPrice: 7999,
          rating: 4.0,
          reviews: 321,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "44",
          name: "Reebok CrossFit Shoes",
          price: 12999,
          originalPrice: 14999,
          rating: 4.4,
          reviews: 987,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
          category: "Sports"
        },
        {
          id: "45",
          name: "Under Armour Backpack",
          price: 4999,
          originalPrice: 5999,
          rating: 4.2,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
          category: "Sports"
        }
      ],
      beauty: [
        {
          id: "12",
          name: "Lakme Absolute Foundation",
          price: 1299,
          originalPrice: 1599,
          rating: 4.0,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "46",
          name: "Maybelline Mascara",
          price: 899,
          originalPrice: 1099,
          rating: 4.2,
          reviews: 1234,
          image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "47",
          name: "L'Oreal Paris Lipstick",
          price: 799,
          originalPrice: 999,
          rating: 4.1,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "48",
          name: "MAC Studio Fix Powder",
          price: 2999,
          originalPrice: 3499,
          rating: 4.4,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "49",
          name: "Nykaa Face Serum",
          price: 1499,
          originalPrice: 1799,
          rating: 4.3,
          reviews: 765,
          image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "50",
          name: "Lakme Kajal",
          price: 299,
          originalPrice: 399,
          rating: 4.0,
          reviews: 1098,
          image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "51",
          name: "Maybelline Concealer",
          price: 999,
          originalPrice: 1199,
          rating: 4.2,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "52",
          name: "L'Oreal Hair Mask",
          price: 1299,
          originalPrice: 1599,
          rating: 4.1,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "53",
          name: "MAC Blush Palette",
          price: 3499,
          originalPrice: 3999,
          rating: 4.5,
          reviews: 321,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
          category: "Beauty"
        },
        {
          id: "54",
          name: "Nykaa Nail Polish Set",
          price: 899,
          originalPrice: 1199,
          rating: 4.0,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop",
          category: "Beauty"
        }
      ],
      watches: [
        {
          id: "13",
          name: "Apple Watch Series 9",
          price: 41900,
          originalPrice: 45900,
          rating: 4.6,
          reviews: 2341,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "55",
          name: "Rolex Submariner",
          price: 899999,
          originalPrice: 999999,
          rating: 4.9,
          reviews: 123,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          badge: "Luxury",
          category: "Watches"
        },
        {
          id: "56",
          name: "Casio G-Shock",
          price: 8999,
          originalPrice: 10999,
          rating: 4.3,
          reviews: 3456,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "57",
          name: "Titan Raga Women's Watch",
          price: 12999,
          originalPrice: 15999,
          rating: 4.2,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "58",
          name: "Fossil Gen 6 Smartwatch",
          price: 24999,
          originalPrice: 28999,
          rating: 4.4,
          reviews: 1543,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "59",
          name: "Casio Edifice",
          price: 18999,
          originalPrice: 21999,
          rating: 4.1,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "60",
          name: "Titan Edge Ultra Slim",
          price: 9999,
          originalPrice: 12999,
          rating: 4.0,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "61",
          name: "Fossil Leather Strap Watch",
          price: 14999,
          originalPrice: 17999,
          rating: 4.3,
          reviews: 765,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "62",
          name: "Apple Watch SE",
          price: 29900,
          originalPrice: 32900,
          rating: 4.5,
          reviews: 1876,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        },
        {
          id: "63",
          name: "Casio Digital Watch",
          price: 3999,
          originalPrice: 4999,
          rating: 4.1,
          reviews: 987,
          image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop",
          category: "Watches"
        }
      ],
      automotive: [
        {
          id: "14",
          name: "Bosch Car Battery",
          price: 4999,
          originalPrice: 5999,
          rating: 4.3,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "64",
          name: "MRF ZLX Tyres",
          price: 8999,
          originalPrice: 10999,
          rating: 4.4,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "65",
          name: "Michelin Pilot Sport 4",
          price: 12999,
          originalPrice: 14999,
          rating: 4.5,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "66",
          name: "Shell Helix Ultra Engine Oil",
          price: 2999,
          originalPrice: 3499,
          rating: 4.2,
          reviews: 1234,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "67",
          name: "Castrol GTX Motor Oil",
          price: 1999,
          originalPrice: 2499,
          rating: 4.1,
          reviews: 765,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "68",
          name: "Bosch Spark Plugs Set",
          price: 1499,
          originalPrice: 1799,
          rating: 4.3,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "69",
          name: "MRF Air Filter",
          price: 899,
          originalPrice: 1199,
          rating: 4.0,
          reviews: 321,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "70",
          name: "Michelin Wiper Blades",
          price: 1299,
          originalPrice: 1599,
          rating: 4.2,
          reviews: 432,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "71",
          name: "Shell Car Shampoo",
          price: 599,
          originalPrice: 799,
          rating: 4.1,
          reviews: 234,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        },
        {
          id: "72",
          name: "Bosch Brake Pads",
          price: 3999,
          originalPrice: 4999,
          rating: 4.4,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
          category: "Automotive"
        }
      ],
      laptops: [
        {
          id: "6",
          name: "MacBook Air M2",
          price: 114900,
          originalPrice: 119900,
          rating: 4.6,
          reviews: 3421,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "7",
          name: "Dell XPS 13",
          price: 89999,
          originalPrice: 99999,
          rating: 4.4,
          reviews: 2156,
          image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "73",
          name: "HP Pavilion Gaming",
          price: 65999,
          originalPrice: 74999,
          rating: 4.2,
          reviews: 1876,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "74",
          name: "Lenovo ThinkPad E14",
          price: 54999,
          originalPrice: 64999,
          rating: 4.3,
          reviews: 987,
          image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "75",
          name: "ASUS ROG Strix G15",
          price: 89999,
          originalPrice: 99999,
          rating: 4.5,
          reviews: 1543,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
          badge: "Gaming",
          category: "Laptops"
        },
        {
          id: "76",
          name: "MacBook Pro 14 M3",
          price: 199900,
          originalPrice: 219900,
          rating: 4.7,
          reviews: 2341,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "77",
          name: "Dell Inspiron 15",
          price: 45999,
          originalPrice: 54999,
          rating: 4.1,
          reviews: 765,
          image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "78",
          name: "HP Spectre x360",
          price: 124999,
          originalPrice: 139999,
          rating: 4.4,
          reviews: 1234,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "79",
          name: "Lenovo Legion 5 Pro",
          price: 109999,
          originalPrice: 124999,
          rating: 4.5,
          reviews: 876,
          image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
          category: "Laptops"
        },
        {
          id: "80",
          name: "ASUS ZenBook 14",
          price: 69999,
          originalPrice: 79999,
          rating: 4.2,
          reviews: 543,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
          category: "Laptops"
        }
      ]
    };

    const categoryKey = categoryName?.toLowerCase().replace(/-/g, '') as keyof typeof allProducts;
    return allProducts[categoryKey] || [];
  };

  const products = getCategoryProducts(category || "");

  // Store all products in localStorage when component loads
  useEffect(() => {
    const existingProducts = JSON.parse(localStorage.getItem('mockProducts') || '[]');
    const existingIds = new Set(existingProducts.map((p: any) => p.id));
    
    // Add new products that don't already exist
    const newProducts = products.filter(product => !existingIds.has(product.id));
    if (newProducts.length > 0) {
      const updatedProducts = [...existingProducts, ...newProducts];
      localStorage.setItem('mockProducts', JSON.stringify(updatedProducts));
    }
  }, [products]);

  // Get brands based on category
  const getCategoryBrands = (categoryName: string) => {
    const categoryBrands = {
      electronics: ["Samsung", "Apple", "OnePlus", "Xiaomi", "Realme"],
      fashion: ["Nike", "Adidas", "Levi's", "H&M", "Zara"],
      laptops: ["Apple", "Dell", "HP", "Lenovo", "ASUS"],
      "home-garden": ["IKEA", "Godrej", "Urban Ladder", "Pepperfry"],
      sports: ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"],
      beauty: ["Lakme", "Maybelline", "L'Oreal", "MAC", "Nykaa"],
      watches: ["Rolex", "Casio", "Titan", "Fossil", "Apple"],
      automotive: ["Bosch", "MRF", "Michelin", "Shell", "Castrol"]
    };
    
    const categoryKey = categoryName?.toLowerCase().replace(/-/g, '') as keyof typeof categoryBrands;
    return categoryBrands[categoryKey] || ["Samsung", "Apple", "OnePlus"];
  };

  const brands = getCategoryBrands(category || "");

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.some(brand => 
      product.name.toLowerCase().includes(brand.toLowerCase())
    );
    return priceInRange && brandMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price_low_high":
        return a.price - b.price;
      case "price_high_low":
        return b.price - a.price;
      case "popularity":
        return (b.reviews || 0) - (a.reviews || 0);
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

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

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold capitalize">{category?.replace(/-/g, ' ') || "Products"}</h1>
            <p className="text-muted-foreground">{sortedProducts.length} products found</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price_low_high">Price: Low to High</SelectItem>
                <SelectItem value="price_high_low">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
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

                {/* Brands */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                          {rating}★ & above
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 200000]);
                    setSelectedBrands([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or browse other categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;