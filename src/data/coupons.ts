export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number; // percentage (0-100) or fixed amount
  minOrderValue: number;
  maxDiscount?: number; // for percentage coupons
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  applicableCategories?: string[];
  firstTimeOnly?: boolean;
}

export const availableCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME10",
    name: "Welcome Offer",
    description: "Get 10% off on your first order",
    type: "percentage",
    value: 10,
    minOrderValue: 500,
    maxDiscount: 1000,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 1000,
    usedCount: 245,
    isActive: true,
    firstTimeOnly: true
  },
  {
    id: "2",
    code: "SAVE20",
    name: "Flat 20% Off",
    description: "Get 20% off on orders above ₹1000",
    type: "percentage",
    value: 20,
    minOrderValue: 1000,
    maxDiscount: 2000,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 500,
    usedCount: 123,
    isActive: true
  },
  {
    id: "3",
    code: "FLAT500",
    name: "Flat ₹500 Off",
    description: "Get ₹500 off on orders above ₹2500",
    type: "fixed",
    value: 500,
    minOrderValue: 2500,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 300,
    usedCount: 87,
    isActive: true
  },
  {
    id: "4",
    code: "FREESHIP",
    name: "Free Shipping",
    description: "Get free shipping on all orders",
    type: "free_shipping",
    value: 0,
    minOrderValue: 0,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 1000,
    usedCount: 456,
    isActive: true
  },
  {
    id: "5",
    code: "ELECTRONICS15",
    name: "Electronics Special",
    description: "15% off on Electronics items",
    type: "percentage",
    value: 15,
    minOrderValue: 1500,
    maxDiscount: 1500,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 200,
    usedCount: 34,
    isActive: true,
    applicableCategories: ["Electronics"]
  },
  {
    id: "6",
    code: "FASHION25",
    name: "Fashion Fiesta",
    description: "25% off on Fashion items",
    type: "percentage",
    value: 25,
    minOrderValue: 800,
    maxDiscount: 1200,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 150,
    usedCount: 67,
    isActive: true,
    applicableCategories: ["Fashion"]
  },
  {
    id: "7",
    code: "MEGA50",
    name: "Mega Sale",
    description: "₹50 off on orders above ₹500",
    type: "fixed",
    value: 50,
    minOrderValue: 500,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 1000,
    usedCount: 234,
    isActive: true
  },
  {
    id: "8",
    code: "BOOKS10",
    name: "Book Lover's Deal",
    description: "10% off on Books",
    type: "percentage",
    value: 10,
    minOrderValue: 300,
    maxDiscount: 500,
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
    usageLimit: 100,
    usedCount: 23,
    isActive: true,
    applicableCategories: ["Books"]
  }
];

export const validateCoupon = (
  couponCode: string, 
  orderValue: number, 
  cartItems: any[], 
  isFirstTime: boolean = false
): { isValid: boolean; coupon?: Coupon; error?: string } => {
  const coupon = availableCoupons.find(c => 
    c.code.toLowerCase() === couponCode.toLowerCase() && c.isActive
  );

  if (!coupon) {
    return { isValid: false, error: "Invalid coupon code" };
  }

  // Check validity dates
  const now = new Date();
  const validFrom = new Date(coupon.validFrom);
  const validUntil = new Date(coupon.validUntil);

  if (now < validFrom || now > validUntil) {
    return { isValid: false, error: "Coupon has expired" };
  }

  // Check usage limit
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { isValid: false, error: "Coupon usage limit exceeded" };
  }

  // Check minimum order value
  if (orderValue < coupon.minOrderValue) {
    return { 
      isValid: false, 
      error: `Minimum order value of ₹${coupon.minOrderValue} required` 
    };
  }

  // Check first time user restriction
  if (coupon.firstTimeOnly && !isFirstTime) {
    return { isValid: false, error: "This coupon is only for first-time users" };
  }

  // Check category restrictions
  if (coupon.applicableCategories && coupon.applicableCategories.length > 0) {
    const hasApplicableItems = cartItems.some(item => 
      coupon.applicableCategories!.includes(item.product.category)
    );
    
    if (!hasApplicableItems) {
      return { 
        isValid: false, 
        error: `This coupon is only applicable for ${coupon.applicableCategories.join(', ')} items` 
      };
    }
  }

  return { isValid: true, coupon };
};

export const calculateDiscount = (coupon: Coupon, orderValue: number, cartItems: any[]): number => {
  let discount = 0;

  if (coupon.type === 'percentage') {
    // Calculate discount on applicable items only
    let applicableValue = orderValue;
    
    if (coupon.applicableCategories && coupon.applicableCategories.length > 0) {
      applicableValue = cartItems
        .filter(item => coupon.applicableCategories!.includes(item.product.category))
        .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }
    
    discount = (applicableValue * coupon.value) / 100;
    
    // Apply max discount limit
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
  } else if (coupon.type === 'fixed') {
    discount = coupon.value;
  }
  // free_shipping type doesn't provide monetary discount, handled separately

  return Math.round(discount);
};

export const getPopularCoupons = (): Coupon[] => {
  return availableCoupons
    .filter(coupon => coupon.isActive)
    .sort((a, b) => b.usedCount - a.usedCount)
    .slice(0, 4);
};

export const getCouponsForCategory = (category: string): Coupon[] => {
  return availableCoupons.filter(coupon => 
    coupon.isActive && 
    (!coupon.applicableCategories || coupon.applicableCategories.includes(category))
  );
};
