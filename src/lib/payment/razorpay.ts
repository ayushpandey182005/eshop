// Razorpay Payment Gateway Integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number; // Amount in paise (multiply by 100)
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initiatePayment = async (options: PaymentOptions): Promise<PaymentResult> => {
  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Razorpay SDK failed to load');
    }

    return new Promise((resolve) => {
      const razorpayOptions = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: options.amount,
        currency: options.currency,
        name: 'ShopMart',
        description: options.description,
        order_id: options.orderId,
        prefill: {
          name: options.customerName,
          email: options.customerEmail,
          contact: options.customerPhone || '',
        },
        theme: {
          color: '#3B82F6',
        },
        handler: (response: any) => {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: () => {
            resolve({
              success: false,
              error: 'Payment cancelled by user',
            });
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    };
  }
};

// Create order (mock implementation - replace with actual backend call)
export const createRazorpayOrder = async (amount: number): Promise<{ orderId: string; amount: number }> => {
  // In a real implementation, this would call your backend to create a Razorpay order
  // For now, we'll simulate it
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId: `order_${Date.now()}`,
        amount: amount,
      });
    }, 500);
  });
};

// Verify payment (mock implementation - replace with actual backend verification)
export const verifyPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  // In a real implementation, this would verify the payment signature on your backend
  // For now, we'll simulate successful verification
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
