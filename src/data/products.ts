import { SustainabilityData } from '@/components/SustainabilityScore';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand?: string;
  badge?: string;
  description?: string;
  highlights?: string[];
  warranty?: string;
  sustainability?: SustainabilityData;
}

export const allProducts: Product[] = [
  // Electronics
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra 5G",
    price: 124999,
    originalPrice: 139999,
    rating: 4.5,
    reviews: 12847,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    badge: "Bestseller",
    category: "Electronics",
    brand: "Samsung",
    description: "Experience the ultimate in mobile technology with the Samsung Galaxy S24 Ultra. Featuring cutting-edge camera technology, powerful performance, and stunning display quality. The device combines premium design with innovative features including S Pen functionality, advanced AI capabilities, and exceptional battery life for all-day productivity.",
    highlights: [
      "6.8-inch Dynamic AMOLED 2X Display with 120Hz refresh rate",
      "200MP Triple Camera Setup with 100x Space Zoom",
      "5000mAh Battery with 45W Super Fast Charging",
      "Snapdragon 8 Gen 3 Processor for flagship performance",
      "12GB RAM + 256GB Storage with expandable memory",
      "Built-in S Pen with advanced productivity features",
      "IP68 Water and Dust Resistance",
      "5G connectivity for ultra-fast internet speeds"
    ],
    warranty: "1 Year Manufacturer Warranty + 6 Months Extended Warranty",
    sustainability: {
      ecoScore: 72,
      carbonFootprint: { value: 8.5, rating: 'medium' as const },
      recyclablePercentage: 85,
      fairTrade: false,
      sustainableMaterials: ['Recycled Aluminum', 'Bio-based Plastics'],
      certifications: ['EPEAT Gold', 'Energy Star'],
      waterUsage: 120,
      renewableEnergy: true
    }
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    price: 159900,
    originalPrice: 179900,
    rating: 4.7,
    reviews: 8934,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "Apple",
    description: "The most advanced iPhone ever created. iPhone 15 Pro Max features the revolutionary A17 Pro chip, professional camera system, and titanium design. Experience unprecedented performance, stunning photography capabilities, and seamless integration with the Apple ecosystem for the ultimate smartphone experience.",
    highlights: [
      "6.7-inch Super Retina XDR Display with ProMotion technology",
      "A17 Pro chip with 6-core GPU for console-quality gaming",
      "Pro camera system with 48MP Main, Ultra Wide, and Telephoto",
      "Action Button for customizable quick actions",
      "Titanium design with Ceramic Shield front",
      "Up to 29 hours video playback battery life",
      "USB-C connectivity with USB 3 support",
      "iOS 17 with advanced privacy and security features"
    ],
    warranty: "1 Year Limited Warranty + AppleCare+ eligible",
    sustainability: {
      ecoScore: 78,
      carbonFootprint: { value: 7.2, rating: 'low' as const },
      recyclablePercentage: 90,
      fairTrade: false,
      sustainableMaterials: ['100% Recycled Aluminum', 'Recycled Rare Earth Elements'],
      certifications: ['Carbon Neutral', 'EPEAT Gold'],
      waterUsage: 95,
      renewableEnergy: true
    }
  },
  {
    id: "3",
    name: "OnePlus 12 5G",
    price: 64999,
    originalPrice: 69999,
    rating: 4.4,
    reviews: 5672,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "OnePlus",
    description: "Never Settle with the OnePlus 12 5G. Powered by Snapdragon 8 Gen 3, this flagship delivers exceptional performance, lightning-fast charging, and premium camera capabilities. Experience the perfect balance of speed, style, and innovation with OxygenOS for a clean, fast Android experience.",
    highlights: [
      "6.82-inch 2K+ ProXDR Display with Dolby Vision",
      "Snapdragon 8 Gen 3 processor with up to 16GB RAM",
      "50MP Hasselblad Camera System with 3x telephoto",
      "100W SuperVOOC fast charging (1-100% in 26 minutes)",
      "5400mAh battery with 50W wireless charging",
      "OxygenOS 14 based on Android 14",
      "Alert Slider for instant notification control",
      "Premium glass and metal construction"
    ],
    warranty: "1 Year Manufacturer Warranty",
    sustainability: {
      ecoScore: 65,
      carbonFootprint: { value: 9.8, rating: 'medium' as const },
      recyclablePercentage: 75,
      fairTrade: false,
      sustainableMaterials: ['Recycled Plastics'],
      certifications: ['RoHS Compliant'],
      waterUsage: 140,
      renewableEnergy: false
    }
  },
  {
    id: "15",
    name: "Xiaomi 14 Ultra",
    price: 89999,
    originalPrice: 99999,
    rating: 4.3,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "Xiaomi",
    description: "Photography redefined with Xiaomi 14 Ultra. Co-engineered with Leica, this flagship smartphone delivers professional-grade photography, powerful Snapdragon performance, and premium design. Capture life's moments with unprecedented clarity and detail using advanced computational photography.",
    highlights: [
      "6.73-inch 2K LTPO AMOLED display with 120Hz",
      "Snapdragon 8 Gen 3 with advanced cooling system",
      "Leica Summilux lens system with 50MP quad cameras",
      "Professional photography modes and RAW support",
      "5300mAh battery with 90W wired + 80W wireless charging",
      "MIUI 15 with enhanced privacy features",
      "IP68 water resistance rating",
      "Ceramic back with premium metal frame"
    ],
    warranty: "1 Year Manufacturer Warranty + Mi Care Protection",
    sustainability: {
      ecoScore: 68,
      carbonFootprint: { value: 8.9, rating: 'medium' as const },
      recyclablePercentage: 80,
      fairTrade: false,
      sustainableMaterials: ['Recycled Aluminum'],
      certifications: ['Energy Star'],
      waterUsage: 130,
      renewableEnergy: true
    }
  },
  {
    id: "16",
    name: "Google Pixel 8 Pro",
    price: 106999,
    originalPrice: 119999,
    rating: 4.6,
    reviews: 3876,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "Google",
    description: "The most helpful Pixel yet. Google Pixel 8 Pro combines Google AI with advanced camera technology for the ultimate Android experience. Enjoy pure Android, guaranteed security updates, and innovative features powered by Google's Tensor G3 chip for intelligent performance.",
    highlights: [
      "6.7-inch Super Actua display with 120Hz LTPO",
      "Google Tensor G3 chip with Titan M security coprocessor",
      "Pro camera system with computational photography",
      "Magic Eraser, Best Take, and Audio Magic Eraser",
      "7 years of OS and security updates guaranteed",
      "5050mAh battery with 30W fast charging",
      "Pure Android experience with Pixel exclusive features",
      "Advanced Call Screen and spam protection"
    ],
    warranty: "1 Year Limited Warranty + Preferred Care available",
    sustainability: {
      ecoScore: 82,
      carbonFootprint: { value: 6.8, rating: 'low' as const },
      recyclablePercentage: 88,
      fairTrade: false,
      sustainableMaterials: ['100% Recycled Aluminum', 'Recycled Plastics'],
      certifications: ['Carbon Neutral', 'EPEAT Gold'],
      waterUsage: 85,
      renewableEnergy: true
    }
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
    category: "Electronics",
    brand: "Sony",
    description: "Industry-leading noise canceling with the Sony WH-1000XM5. Experience premium sound quality, exceptional comfort, and intelligent features. Perfect for travel, work, or daily listening with advanced noise cancellation technology and crystal-clear call quality.",
    highlights: [
      "Industry-leading noise canceling technology",
      "30-hour battery life with quick charge (3 min = 3 hours)",
      "Premium 30mm drivers for exceptional sound quality",
      "Multipoint Bluetooth connection for two devices",
      "Speak-to-Chat technology automatically pauses music",
      "Touch sensor controls for easy operation",
      "Lightweight and comfortable for all-day wear",
      "Compatible with Sony Headphones Connect app"
    ],
    warranty: "1 Year International Warranty",
    sustainability: {
      ecoScore: 75,
      carbonFootprint: { value: 3.2, rating: 'low' as const },
      recyclablePercentage: 85,
      fairTrade: false,
      sustainableMaterials: ['Recycled Plastics', 'Bio-based Materials'],
      certifications: ['EPEAT Silver'],
      waterUsage: 45,
      renewableEnergy: true
    }
  },
  {
    id: "18",
    name: "iPad Pro 12.9 M2",
    price: 112900,
    originalPrice: 119900,
    rating: 4.5,
    reviews: 2987,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "Apple",
    description: "Supercharged by M2 chip, iPad Pro delivers next-level performance for demanding workflows. With stunning Liquid Retina XDR display, advanced cameras, and all-day battery life, it's the ultimate creative powerhouse for professionals and creators.",
    highlights: [
      "12.9-inch Liquid Retina XDR display with ProMotion",
      "M2 chip with 8-core CPU and 10-core GPU",
      "12MP TrueDepth front camera with Center Stage",
      "12MP Wide and 10MP Ultra Wide back cameras",
      "Up to 10 hours of battery life",
      "Apple Pencil (2nd generation) support",
      "Magic Keyboard and Smart Keyboard Folio compatible",
      "Thunderbolt / USB 4 port for fast connectivity"
    ],
    warranty: "1 Year Limited Warranty + AppleCare+ eligible",
    sustainability: {
      ecoScore: 80,
      carbonFootprint: { value: 6.5, rating: 'low' as const },
      recyclablePercentage: 92,
      fairTrade: false,
      sustainableMaterials: ['100% Recycled Aluminum', 'Recycled Rare Earth Elements'],
      certifications: ['Carbon Neutral', 'EPEAT Gold'],
      waterUsage: 75,
      renewableEnergy: true
    }
  },
  {
    id: "19",
    name: "Samsung 65 4K Smart TV",
    price: 89999,
    originalPrice: 109999,
    rating: 4.4,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "Samsung",
    description: "Transform your living room with Samsung's 65-inch 4K Smart TV. Experience breathtaking picture quality with Quantum Dot technology, smart features powered by Tizen OS, and immersive audio. Perfect for movies, gaming, and streaming your favorite content.",
    highlights: [
      "65-inch 4K UHD display with Quantum Dot technology",
      "Crystal Processor 4K for enhanced picture quality",
      "Smart TV powered by Tizen OS with built-in apps",
      "Multiple HDR formats support (HDR10, HDR10+)",
      "Object Tracking Sound for immersive audio",
      "Gaming Hub with cloud gaming support",
      "Voice control with Bixby, Alexa, and Google Assistant",
      "Multiple connectivity options including 4 HDMI ports"
    ],
    warranty: "1 Year Comprehensive Warranty + Panel Protection",
    sustainability: {
      ecoScore: 70,
      carbonFootprint: { value: 12.5, rating: 'medium' as const },
      recyclablePercentage: 78,
      fairTrade: false,
      sustainableMaterials: ['Recycled Plastics'],
      certifications: ['Energy Star'],
      waterUsage: 200,
      renewableEnergy: true
    }
  },
  {
    id: "20",
    name: "JBL Charge 5 Speaker",
    price: 14999,
    originalPrice: 17999,
    rating: 4.2,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "JBL",
    description: "Take the party anywhere with JBL Charge 5. This portable Bluetooth speaker delivers bold JBL Original Pro Sound with deep bass, 20-hour battery life, and waterproof design. Perfect for outdoor adventures, pool parties, and everyday listening.",
    highlights: [
      "Bold JBL Original Pro Sound with deep bass",
      "20 hours of playtime on single charge",
      "IP67 waterproof and dustproof rating",
      "Wireless Bluetooth streaming from any device",
      "Built-in powerbank to charge your devices",
      "PartyBoost feature to connect multiple JBL speakers",
      "Durable fabric material and rugged rubber housing",
      "Available in multiple vibrant colors"
    ],
    warranty: "1 Year Manufacturer Warranty",
    sustainability: {
      ecoScore: 73,
      carbonFootprint: { value: 2.8, rating: 'low' as const },
      recyclablePercentage: 82,
      fairTrade: false,
      sustainableMaterials: ['Recycled Fabric', 'Recycled Plastics'],
      certifications: ['RoHS Compliant'],
      waterUsage: 35,
      renewableEnergy: false
    }
  },
  {
    id: "21",
    name: "Canon EOS R6 Camera",
    price: 189999,
    originalPrice: 209999,
    rating: 4.6,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
    category: "Electronics",
    brand: "Canon",
    description: "Professional photography meets innovation with Canon EOS R6. Featuring advanced autofocus, in-body image stabilization, and exceptional low-light performance. Perfect for photographers and videographers seeking professional results with mirrorless convenience.",
    highlights: [
      "20.1MP full-frame CMOS sensor",
      "DIGIC X image processor for fast performance",
      "Dual Pixel CMOS AF II with 1053 AF points",
      "In-body 5-axis image stabilization",
      "4K video recording at 60fps",
      "Up to 12fps continuous shooting",
      "3.0-inch vari-angle touchscreen LCD",
      "Weather-sealed magnesium alloy construction"
    ],
    warranty: "1 Year International Warranty + Canon India Support",
    sustainability: {
      ecoScore: 67,
      carbonFootprint: { value: 9.2, rating: 'medium' as const },
      recyclablePercentage: 75,
      fairTrade: false,
      sustainableMaterials: ['Recycled Metals'],
      certifications: ['RoHS Compliant'],
      waterUsage: 150,
      renewableEnergy: false
    }
  },

  // Fashion
  {
    id: "4",
    name: "Nike Air Force 1 '07",
    price: 7495,
    originalPrice: 8995,
    rating: 4.6,
    reviews: 15234,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    badge: "Bestseller",
    category: "Fashion",
    brand: "Nike",
    description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine. This timeless classic combines comfort, style, and versatility for everyday wear.",
    highlights: [
      "Classic leather upper for durability and premium feel",
      "Nike Air cushioning for all-day comfort",
      "Rubber outsole with pivot points for traction",
      "Perforations on toe for breathability",
      "Foam midsole for lightweight cushioning",
      "Iconic basketball silhouette with modern updates",
      "Available in multiple colorways",
      "Suitable for casual and athletic wear"
    ],
    warranty: "6 Months Manufacturer Warranty against defects",
    sustainability: {
      ecoScore: 85,
      carbonFootprint: { value: 4.2, rating: 'low' as const },
      recyclablePercentage: 70,
      fairTrade: true,
      sustainableMaterials: ['Organic Cotton', 'Recycled Polyester', 'Natural Rubber'],
      certifications: ['Fair Trade Certified', 'GOTS Certified'],
      waterUsage: 180,
      renewableEnergy: true
    }
  },
  {
    id: "5",
    name: "Adidas Ultraboost 22",
    price: 16999,
    originalPrice: 19999,
    rating: 4.5,
    reviews: 8765,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Adidas",
    description: "Experience endless energy with every step in the Adidas Ultraboost 22. Featuring responsive BOOST midsole technology, Primeknit upper, and Continental rubber outsole. Designed for runners who demand the perfect combination of comfort, performance, and style.",
    highlights: [
      "BOOST midsole for maximum energy return",
      "Primeknit upper adapts to foot shape",
      "Continental rubber outsole for superior grip",
      "Linear Energy Push system for forward motion",
      "Torsion System for midfoot stability",
      "Sock-like construction for comfortable fit",
      "Made with Parley Ocean Plastic",
      "Suitable for running and lifestyle wear"
    ],
    warranty: "6 Months Manufacturer Warranty",
    sustainability: {
      ecoScore: 88,
      carbonFootprint: { value: 3.8, rating: 'low' as const },
      recyclablePercentage: 85,
      fairTrade: true,
      sustainableMaterials: ['Ocean Plastic', 'Recycled Polyester', 'Bio-based TPU'],
      certifications: ['Fair Trade Certified', 'Cradle to Cradle'],
      waterUsage: 120,
      renewableEnergy: true
    }
  },
  {
    id: "6",
    name: "Levi's 511 Slim Jeans",
    price: 3999,
    originalPrice: 4999,
    rating: 4.3,
    reviews: 12456,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Levi's",
    description: "The Levi's 511 Slim Jeans offer a modern slim fit that's comfortable and versatile. Made with premium denim and classic five-pocket styling, these jeans are perfect for everyday wear. The slim cut provides a contemporary look while maintaining the authentic Levi's quality and craftsmanship.",
    highlights: [
      "Slim fit through hip and thigh with narrow leg opening",
      "Premium stretch denim for comfort and mobility",
      "Classic five-pocket styling with signature details",
      "Button fly closure with Levi's branded hardware",
      "Available in multiple washes and colors",
      "Machine washable for easy care",
      "Authentic Levi's red tab and back pocket stitching",
      "Versatile style suitable for casual and smart-casual looks"
    ],
    warranty: "90 Days Warranty against manufacturing defects",
    sustainability: {
      ecoScore: 79,
      carbonFootprint: { value: 5.5, rating: 'medium' as const },
      recyclablePercentage: 65,
      fairTrade: true,
      sustainableMaterials: ['Organic Cotton', 'Recycled Cotton'],
      certifications: ['Better Cotton Initiative', 'Fair Trade Certified'],
      waterUsage: 250,
      renewableEnergy: false
    }
  },

  // Home & Kitchen
  {
    id: "7",
    name: "Philips Air Fryer HD9252",
    price: 12995,
    originalPrice: 15995,
    rating: 4.4,
    reviews: 9876,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    badge: "Top Rated",
    category: "Home & Kitchen",
    brand: "Philips",
    description: "Experience healthier frying with the Philips Air Fryer HD9252. This innovative kitchen appliance uses little to no oil for crispy results, making it perfect for health-conscious cooking. With its compact design and easy-to-use interface, it's ideal for small kitchens and beginners alike.",
    highlights: [
      "Healthier frying with little to no oil",
      "Compact design for small kitchens",
      "Easy-to-use interface with preset settings",
      "Digital touchscreen display for precise control",
      "Non-stick basket for easy food release",
      "Dishwasher safe parts for easy cleaning",
      "Recipe book included for inspiration"
    ],
    warranty: "2 Years Manufacturer Warranty",
    sustainability: {
      ecoScore: 76,
      carbonFootprint: { value: 5.8, rating: 'medium' as const },
      recyclablePercentage: 85,
      fairTrade: false,
      sustainableMaterials: ['Recycled Plastics', 'Recycled Metals'],
      certifications: ['Energy Star', 'EPEAT Silver'],
      waterUsage: 25,
      renewableEnergy: true
    }
  },
  {
    id: "8",
    name: "Prestige Induction Cooktop",
    price: 3499,
    originalPrice: 4499,
    rating: 4.2,
    reviews: 6543,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    category: "Home & Kitchen",
    brand: "Prestige",
    description: "Experience the power of induction cooking with the Prestige Induction Cooktop. This energy-efficient appliance offers fast and precise heat control, making it perfect for busy home cooks. With its sleek design and easy-to-clean surface, it's a great addition to any modern kitchen.",
    highlights: [
      "Energy-efficient induction cooking technology",
      "Fast and precise heat control",
      "Sleek and modern design",
      "Easy-to-clean surface with touch controls",
      "Automatic shut-off for safety",
      "Multiple cooking modes for versatility",
      "Durable and long-lasting construction"
    ],
    warranty: "1 Year Manufacturer Warranty",
    sustainability: {
      ecoScore: 69,
      carbonFootprint: { value: 7.2, rating: 'medium' as const },
      recyclablePercentage: 75,
      fairTrade: false,
      sustainableMaterials: ['Recycled Steel'],
      certifications: ['Energy Star'],
      waterUsage: 15,
      renewableEnergy: false
    }
  },
  {
    id: "9",
    name: "Godrej 190L Refrigerator",
    price: 16999,
    originalPrice: 19999,
    rating: 4.3,
    reviews: 4321,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop",
    category: "Home & Kitchen",
    brand: "Godrej",
    description: "Experience the perfect blend of style and functionality with the Godrej 190L Refrigerator. This compact fridge offers ample storage space, advanced cooling technology, and a sleek design that fits perfectly in small kitchens.",
    highlights: [
      "Compact design for small kitchens",
      "Advanced cooling technology for efficient performance",
      "Ample storage space with adjustable shelves",
      "Sleek and modern design with digital display",
      "Energy-efficient with low power consumption",
      "Fast cooling and freezing capabilities",
      "Durable and long-lasting construction"
    ],
    warranty: "1 Year Comprehensive Warranty",
    sustainability: {
      ecoScore: 78,
      carbonFootprint: { value: 8.9, rating: 'medium' as const },
      recyclablePercentage: 88,
      fairTrade: false,
      sustainableMaterials: ['Recycled Steel', 'Eco-friendly Refrigerant'],
      certifications: ['Energy Star', 'BEE 5 Star'],
      waterUsage: 50,
      renewableEnergy: true
    }
  },
  {
    id: "29",
    name: "LG Microwave Oven",
    price: 8999,
    originalPrice: 10999,
    rating: 4.2,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=300&fit=crop",
    category: "Home & Kitchen",
    brand: "LG",
    description: "Experience the convenience of microwave cooking with the LG Microwave Oven. This compact appliance offers fast and efficient cooking, defrosting, and reheating capabilities, making it perfect for busy households.",
    highlights: [
      "Compact design for small kitchens",
      "Fast and efficient cooking, defrosting, and reheating",
      "Easy-to-use interface with preset settings",
      "Digital display for precise control",
      "Child safety lock for added security",
      "Durable and long-lasting construction",
      "Easy-to-clean interior with turntable"
    ],
    warranty: "1 Year Manufacturer Warranty",
    sustainability: {
      ecoScore: 72,
      carbonFootprint: { value: 6.5, rating: 'medium' as const },
      recyclablePercentage: 80,
      fairTrade: false,
      sustainableMaterials: ['Recycled Steel', 'Recycled Plastics'],
      certifications: ['Energy Star'],
      waterUsage: 20,
      renewableEnergy: true
    }
  },
  {
    id: "30",
    name: "Bajaj Mixer Grinder",
    price: 4999,
    originalPrice: 6999,
    rating: 4.1,
    reviews: 5678,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    category: "Home & Kitchen",
    brand: "Bajaj",
    description: "Experience the power of efficient grinding with the Bajaj Mixer Grinder. This compact appliance offers multiple grinding jars, easy-to-use interface, and durable construction, making it perfect for daily cooking needs.",
    highlights: [
      "Multiple grinding jars for versatility",
      "Easy-to-use interface with preset settings",
      "Durable and long-lasting construction",
      "Compact design for small kitchens",
      "Easy-to-clean jars and blades",
      "Multiple speed settings for precise control",
      "Overload protection for added safety"
    ],
    warranty: "1 Year Manufacturer Warranty",
    sustainability: {
      ecoScore: 65,
      carbonFootprint: { value: 4.8, rating: 'medium' as const },
      recyclablePercentage: 70,
      fairTrade: false,
      sustainableMaterials: ['Recycled Plastics'],
      certifications: ['ISI Mark'],
      waterUsage: 10,
      renewableEnergy: false
    }
  },

  // Books
  {
    id: "10",
    name: "The Alchemist by Paulo Coelho",
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    reviews: 23456,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    badge: "Bestseller",
    category: "Books",
    brand: "HarperCollins",
    description: "A fable about spiritual quest, love, and self-discovery. The Alchemist is a timeless tale that will transform your life. Paulo Coelho's masterpiece has inspired millions worldwide, and continues to be a beloved classic.",
    highlights: [
      "A timeless tale of spiritual quest and self-discovery",
      "Inspiring story of love, dreams, and perseverance",
      "Translated into over 80 languages worldwide",
      "A must-read for fans of philosophy and spirituality",
      "Beautifully written with poetic prose",
      "A classic that will transform your life",
      "Perfect for readers of all ages"
    ],
    warranty: "No Warranty",
    sustainability: {
      ecoScore: 95,
      carbonFootprint: { value: 0.8, rating: 'low' as const },
      recyclablePercentage: 100,
      fairTrade: true,
      sustainableMaterials: ['FSC Certified Paper', 'Soy-based Ink'],
      certifications: ['FSC Certified', 'Fair Trade Paper'],
      waterUsage: 12,
      renewableEnergy: true
    }
  },
  {
    id: "11",
    name: "Atomic Habits by James Clear",
    price: 499,
    originalPrice: 699,
    rating: 4.7,
    reviews: 18765,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    category: "Books",
    brand: "Random House",
    description: "Transform your life with Atomic Habits. James Clear's comprehensive guide to building good habits and breaking bad ones is a game-changer. Learn how to create a system that works for you, not against you.",
    highlights: [
      "A comprehensive guide to building good habits",
      "Learn how to create a system that works for you",
      "Break bad habits and create positive change",
      "Based on scientific research and real-life examples",
      "Easy-to-read and understand",
      "Perfect for self-improvement and personal growth",
      "A must-read for anyone looking to transform their life"
    ],
    warranty: "No Warranty",
    sustainability: {
      ecoScore: 93,
      carbonFootprint: { value: 0.9, rating: 'low' as const },
      recyclablePercentage: 100,
      fairTrade: true,
      sustainableMaterials: ['FSC Certified Paper', 'Vegetable-based Ink'],
      certifications: ['FSC Certified', 'Fair Trade Paper'],
      waterUsage: 15,
      renewableEnergy: true
    }
  },
  {
    id: "12",
    name: "Think and Grow Rich",
    price: 199,
    originalPrice: 299,
    rating: 4.5,
    reviews: 15432,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    category: "Books",
    brand: "Penguin",
    description: "Unlock the secrets to success with Think and Grow Rich. Napoleon Hill's timeless classic teaches you how to cultivate a wealth mindset and overcome obstacles to achieve your goals.",
    highlights: [
      "A timeless classic on personal development and wealth",
      "Learn how to cultivate a wealth mindset",
      "Overcome obstacles and achieve your goals",
      "Based on research and interviews with successful people",
      "Easy-to-read and understand",
      "Perfect for self-improvement and personal growth",
      "A must-read for anyone looking to succeed"
    ],
    warranty: "No Warranty",
    sustainability: {
      ecoScore: 91,
      carbonFootprint: { value: 0.7, rating: 'low' as const },
      recyclablePercentage: 100,
      fairTrade: true,
      sustainableMaterials: ['FSC Certified Paper', 'Soy-based Ink'],
      certifications: ['FSC Certified', 'Fair Trade Paper'],
      waterUsage: 10,
      renewableEnergy: true
    }
  },

  // Sports
  {
    id: "13",
    name: "Yonex Badminton Racket",
    price: 4999,
    originalPrice: 6999,
    rating: 4.5,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
    category: "Sports",
    brand: "Yonex",
    description: "Take your badminton game to the next level with the Yonex Badminton Racket. This high-quality racket features advanced technology and durable construction, making it perfect for players of all levels.",
    highlights: [
      "High-quality racket for players of all levels",
      "Advanced technology for improved performance",
      "Durable construction for long-lasting use",
      "Lightweight and balanced design",
      "Easy to maneuver and control",
      "Perfect for beginners and experienced players",
      "Available in multiple colors and sizes"
    ],
    warranty: "1 Year Manufacturer Warranty",
    sustainability: {
      ecoScore: 68,
      carbonFootprint: { value: 5.2, rating: 'medium' as const },
      recyclablePercentage: 65,
      fairTrade: false,
      sustainableMaterials: ['Recycled Carbon Fiber'],
      certifications: ['ISO 14001'],
      waterUsage: 80,
      renewableEnergy: false
    }
  },
  {
    id: "14",
    name: "Nike Football",
    price: 1999,
    originalPrice: 2499,
    rating: 4.3,
    reviews: 5678,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
    category: "Sports",
    brand: "Nike",
    description: "Experience the ultimate in football performance with the Nike Football. This high-quality ball features advanced technology and durable construction, making it perfect for players of all levels.",
    highlights: [
      "High-quality ball for players of all levels",
      "Advanced technology for improved performance",
      "Durable construction for long-lasting use",
      "Textured surface for better grip and control",
      "Aerodynamic design for consistent flight",
      "Perfect for training and competition",
      "Available in multiple sizes and colors"
    ],
    warranty: "1 Year Manufacturer Warranty",
    sustainability: {
      ecoScore: 83,
      carbonFootprint: { value: 2.8, rating: 'low' as const },
      recyclablePercentage: 75,
      fairTrade: true,
      sustainableMaterials: ['Recycled Polyester', 'Natural Rubber'],
      certifications: ['Fair Trade Certified'],
      waterUsage: 60,
      renewableEnergy: true
    }
  },
  {
    id: "22",
    name: "Puma RS-X Sneakers",
    price: 8999,
    originalPrice: 10999,
    rating: 4.2,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Puma",
    description: "Step into the future with Puma RS-X Sneakers. These retro-futuristic sneakers combine bold design with modern comfort technology. Perfect for streetwear enthusiasts who want to make a statement while enjoying all-day comfort and style.",
    highlights: [
      "Retro-futuristic design with bold colorways",
      "RS foam midsole for superior cushioning",
      "Durable rubber outsole with excellent grip",
      "Breathable mesh and synthetic upper",
      "Padded collar and tongue for comfort",
      "Iconic PUMA branding and design elements",
      "Perfect for casual wear and street style",
      "Available in multiple color combinations"
    ],
    warranty: "6 Months Manufacturer Warranty against defects",
    sustainability: {
      ecoScore: 71,
      carbonFootprint: { value: 6.2, rating: 'medium' as const },
      recyclablePercentage: 68,
      fairTrade: false,
      sustainableMaterials: ['Recycled Polyester'],
      certifications: ['PUMA Forever Better'],
      waterUsage: 200,
      renewableEnergy: true
    }
  },
  {
    id: "23",
    name: "H&M Cotton T-Shirt",
    price: 799,
    originalPrice: 999,
    rating: 4.0,
    reviews: 8765,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "H&M",
    description: "Essential wardrobe staple made from 100% organic cotton. This H&M Cotton T-Shirt offers comfort, breathability, and sustainable fashion. Perfect for layering or wearing alone, it's a versatile piece that works for any casual occasion.",
    highlights: [
      "Made from 100% organic cotton for sustainability",
      "Soft and breathable fabric for all-day comfort",
      "Classic fit suitable for all body types",
      "Pre-shrunk fabric maintains shape after washing",
      "Reinforced seams for durability",
      "Available in multiple colors and sizes",
      "Perfect for layering or standalone wear",
      "Machine washable for easy care"
    ],
    warranty: "30 Days Return Policy",
    sustainability: {
      ecoScore: 92,
      carbonFootprint: { value: 2.1, rating: 'low' as const },
      recyclablePercentage: 95,
      fairTrade: true,
      sustainableMaterials: ['100% Organic Cotton'],
      certifications: ['GOTS Certified', 'Fair Trade Certified', 'Cradle to Cradle'],
      waterUsage: 80,
      renewableEnergy: true
    }
  },
  {
    id: "24",
    name: "Zara Blazer",
    price: 4999,
    originalPrice: 6999,
    rating: 4.4,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Zara",
    description: "Elevate your professional wardrobe with this sophisticated Zara Blazer. Featuring a tailored fit and premium fabric blend, this blazer is perfect for business meetings, formal events, or adding polish to casual outfits.",
    highlights: [
      "Tailored fit for a professional silhouette",
      "Premium fabric blend for durability and comfort",
      "Structured shoulders for a polished look",
      "Functional pockets for practicality",
      "Versatile design suitable for work and casual wear",
      "Available in classic colors",
      "Dry clean recommended for best results",
      "Perfect for layering over shirts and dresses"
    ],
    warranty: "30 Days Return Policy",
    sustainability: {
      ecoScore: 58,
      carbonFootprint: { value: 8.7, rating: 'medium' as const },
      recyclablePercentage: 45,
      fairTrade: false,
      sustainableMaterials: ['Recycled Polyester'],
      certifications: [],
      waterUsage: 320,
      renewableEnergy: false
    }
  },
  {
    id: "25",
    name: "Uniqlo Heattech Innerwear",
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 5432,
    image: "https://images.unsplash.com/photo-1489987707025-d405d7d3b0a9?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Uniqlo",
    description: "Stay warm with Uniqlo's innovative Heattech technology. This thermal innerwear generates heat from your body's moisture, providing exceptional warmth without bulk. Perfect for cold weather layering and winter activities.",
    highlights: [
      "Heattech technology generates heat from body moisture",
      "Ultra-thin fabric provides warmth without bulk",
      "Moisture-wicking properties keep you dry",
      "Stretchy fabric moves with your body",
      "Odor-resistant treatment for freshness",
      "Perfect for layering under any outfit",
      "Machine washable for easy care",
      "Available in multiple colors and sizes"
    ],
    warranty: "90 Days Quality Guarantee",
    sustainability: {
      ecoScore: 74,
      carbonFootprint: { value: 3.9, rating: 'low' as const },
      recyclablePercentage: 78,
      fairTrade: false,
      sustainableMaterials: ['Recycled Polyester', 'Bio-based Fibers'],
      certifications: ['OEKO-TEX Standard 100'],
      waterUsage: 150,
      renewableEnergy: true
    }
  },
  {
    id: "26",
    name: "Forever 21 Dress",
    price: 1999,
    originalPrice: 2999,
    rating: 4.1,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Forever 21",
    description: "Express your style with this trendy Forever 21 Dress. Featuring contemporary design and comfortable fit, this dress is perfect for casual outings, parties, or everyday wear. A versatile addition to any fashion-forward wardrobe.",
    highlights: [
      "Contemporary design with trendy details",
      "Comfortable fit for all-day wear",
      "Versatile style suitable for multiple occasions",
      "Easy-care fabric for convenience",
      "Available in various sizes and colors",
      "Perfect for layering or standalone wear",
      "Affordable fashion without compromising style",
      "Machine washable for easy maintenance"
    ],
    warranty: "30 Days Return Policy",
    sustainability: {
      ecoScore: 42,
      carbonFootprint: { value: 12.3, rating: 'high' as const },
      recyclablePercentage: 35,
      fairTrade: false,
      sustainableMaterials: [],
      certifications: [],
      waterUsage: 450,
      renewableEnergy: false
    }
  },
  {
    id: "27",
    name: "Nike Dri-FIT Shorts",
    price: 2499,
    originalPrice: 2999,
    rating: 4.3,
    reviews: 4567,
    image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0a9?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Nike",
    description: "Stay cool and dry during workouts with Nike Dri-FIT Shorts. Featuring moisture-wicking technology and comfortable fit, these shorts are perfect for running, gym sessions, or casual athletic wear.",
    highlights: [
      "Dri-FIT technology wicks sweat away from skin",
      "Lightweight and breathable fabric",
      "Comfortable elastic waistband with drawcord",
      "Side pockets for convenient storage",
      "Reflective details for low-light visibility",
      "Perfect for running, gym, and casual wear",
      "Machine washable for easy care",
      "Available in multiple colors and sizes"
    ],
    warranty: "6 Months Manufacturer Warranty against defects",
    sustainability: {
      ecoScore: 81,
      carbonFootprint: { value: 3.5, rating: 'low' as const },
      recyclablePercentage: 80,
      fairTrade: true,
      sustainableMaterials: ['Recycled Polyester', 'Organic Cotton'],
      certifications: ['Fair Trade Certified'],
      waterUsage: 120,
      renewableEnergy: true
    }
  },
  {
    id: "28",
    name: "Adidas Track Jacket",
    price: 4999,
    originalPrice: 5999,
    rating: 4.4,
    reviews: 2345,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
    category: "Fashion",
    brand: "Adidas",
    description: "Classic athletic style meets modern sustainability with the Adidas Track Jacket. Made from ocean plastic, this jacket combines iconic design with environmental responsibility. Perfect for sports, casual wear, or streetwear styling.",
    highlights: [
      "Made from recycled ocean plastic materials",
      "Classic Adidas 3-Stripes design",
      "Full-zip closure with stand-up collar",
      "Ribbed cuffs and hem for secure fit",
      "Side pockets for convenient storage",
      "Breathable fabric for comfort during activity",
      "Perfect for sports and casual wear",
      "Available in multiple colors and sizes"
    ],
    warranty: "6 Months Manufacturer Warranty",
    sustainability: {
      ecoScore: 86,
      carbonFootprint: { value: 4.1, rating: 'low' as const },
      recyclablePercentage: 88,
      fairTrade: true,
      sustainableMaterials: ['Ocean Plastic', 'Recycled Polyester'],
      certifications: ['Fair Trade Certified', 'Cradle to Cradle'],
      waterUsage: 140,
      renewableEnergy: true
    }
  },
];

// Function to initialize all products in localStorage
export const initializeProducts = () => {
  localStorage.setItem('mockProducts', JSON.stringify(allProducts));
};

// Function to get all products
export const getAllProducts = () => {
  const stored = localStorage.getItem('mockProducts');
  if (stored) {
    return JSON.parse(stored);
  }
  initializeProducts();
  return allProducts;
};
