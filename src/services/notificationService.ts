export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  orderConfirmation: boolean;
  shippingUpdates: boolean;
  deliveryNotifications: boolean;
  promotionalOffers: boolean;
}

export interface NotificationTemplate {
  id: string;
  type: 'email' | 'sms';
  event: 'order_confirmation' | 'order_shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  subject?: string;
  template: string;
}

export interface NotificationData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderTotal: number;
  items: any[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveryAddress?: string;
  courierPartner?: string;
}

// Email templates
const emailTemplates: NotificationTemplate[] = [
  {
    id: 'email_order_confirmation',
    type: 'email',
    event: 'order_confirmation',
    subject: 'Order Confirmation - {{orderId}}',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Order Confirmed!</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Hi {{customerName}},</p>
          
          <p>Thank you for your order! We've received your order and are preparing it for shipment.</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">Order Details</h3>
            <p><strong>Order ID:</strong> {{orderId}}</p>
            <p><strong>Total Amount:</strong> ₹{{orderTotal}}</p>
            <p><strong>Estimated Delivery:</strong> {{estimatedDelivery}}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Items Ordered:</h3>
            {{itemsList}}
          </div>
          
          <p>We'll send you another email when your order ships with tracking information.</p>
          
          <p>Thanks for shopping with us!</p>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center;">
          <p style="margin: 0;">Need help? Contact us at support@catalystmart.com</p>
        </div>
      </div>
    `
  },
  {
    id: 'email_order_shipped',
    type: 'email',
    event: 'order_shipped',
    subject: 'Your Order is on the Way! - {{orderId}}',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #28a745; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Your Order is Shipped!</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Hi {{customerName}},</p>
          
          <p>Great news! Your order has been shipped and is on its way to you.</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">Shipping Details</h3>
            <p><strong>Order ID:</strong> {{orderId}}</p>
            <p><strong>Tracking Number:</strong> {{trackingNumber}}</p>
            <p><strong>Courier Partner:</strong> {{courierPartner}}</p>
            <p><strong>Estimated Delivery:</strong> {{estimatedDelivery}}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
          </div>
          
          <p>Your package will be delivered to:</p>
          <div style="background: #f8f9fa; padding: 10px; border-left: 4px solid #007bff;">
            {{deliveryAddress}}
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'email_out_for_delivery',
    type: 'email',
    event: 'out_for_delivery',
    subject: 'Out for Delivery - {{orderId}}',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ffc107; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Out for Delivery!</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Hi {{customerName}},</p>
          
          <p>Your order is out for delivery and will reach you today!</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> {{orderId}}</p>
            <p><strong>Expected Delivery:</strong> Today</p>
            <p><strong>Tracking Number:</strong> {{trackingNumber}}</p>
          </div>
          
          <p>Please ensure someone is available to receive the package.</p>
        </div>
      </div>
    `
  },
  {
    id: 'email_delivered',
    type: 'email',
    event: 'delivered',
    subject: 'Order Delivered - {{orderId}}',
    template: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #28a745; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Order Delivered!</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Hi {{customerName}},</p>
          
          <p>Your order has been successfully delivered!</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> {{orderId}}</p>
            <p><strong>Delivered on:</strong> {{deliveryDate}}</p>
          </div>
          
          <p>We hope you love your purchase! If you have any issues, please don't hesitate to contact us.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 0 10px;">Rate Your Purchase</a>
            <a href="#" style="background: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 0 10px;">Need Help?</a>
          </div>
        </div>
      </div>
    `
  }
];

// SMS templates
const smsTemplates: NotificationTemplate[] = [
  {
    id: 'sms_order_confirmation',
    type: 'sms',
    event: 'order_confirmation',
    template: 'Hi {{customerName}}! Your order {{orderId}} worth ₹{{orderTotal}} has been confirmed. Expected delivery: {{estimatedDelivery}}. Track: catalystmart.com/track'
  },
  {
    id: 'sms_order_shipped',
    type: 'sms',
    event: 'order_shipped',
    template: 'Good news {{customerName}}! Your order {{orderId}} has been shipped. Tracking: {{trackingNumber}}. Expected delivery: {{estimatedDelivery}}. Track: catalystmart.com/track'
  },
  {
    id: 'sms_out_for_delivery',
    type: 'sms',
    event: 'out_for_delivery',
    template: 'Your order {{orderId}} is out for delivery and will reach you today! Please be available to receive it. Track: {{trackingNumber}}'
  },
  {
    id: 'sms_delivered',
    type: 'sms',
    event: 'delivered',
    template: 'Your order {{orderId}} has been delivered! Hope you love it. Rate your experience: catalystmart.com/review'
  }
];

class NotificationService {
  private static instance: NotificationService;
  
  private constructor() {}
  
  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Get user notification preferences
  getNotificationPreferences(userId: string): NotificationPreferences {
    const stored = localStorage.getItem(`notification_preferences_${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default preferences
    return {
      email: true,
      sms: true,
      orderConfirmation: true,
      shippingUpdates: true,
      deliveryNotifications: true,
      promotionalOffers: false
    };
  }

  // Update notification preferences
  updateNotificationPreferences(userId: string, preferences: NotificationPreferences): void {
    localStorage.setItem(`notification_preferences_${userId}`, JSON.stringify(preferences));
  }

  // Template rendering
  private renderTemplate(template: string, data: NotificationData): string {
    let rendered = template;
    
    // Replace placeholders
    rendered = rendered.replace(/\{\{customerName\}\}/g, data.customerName);
    rendered = rendered.replace(/\{\{orderId\}\}/g, data.orderId);
    rendered = rendered.replace(/\{\{orderTotal\}\}/g, data.orderTotal.toLocaleString());
    rendered = rendered.replace(/\{\{trackingNumber\}\}/g, data.trackingNumber || 'N/A');
    rendered = rendered.replace(/\{\{estimatedDelivery\}\}/g, data.estimatedDelivery || 'TBD');
    rendered = rendered.replace(/\{\{deliveryAddress\}\}/g, data.deliveryAddress || '');
    rendered = rendered.replace(/\{\{courierPartner\}\}/g, data.courierPartner || 'Standard Delivery');
    rendered = rendered.replace(/\{\{deliveryDate\}\}/g, new Date().toLocaleDateString());
    
    // Render items list for email
    if (template.includes('{{itemsList}}')) {
      const itemsHtml = data.items.map(item => 
        `<div style="border-bottom: 1px solid #eee; padding: 10px 0;">
          <strong>${item.product.name}</strong><br>
          Qty: ${item.quantity} | Price: ₹${item.product.price.toLocaleString()}
        </div>`
      ).join('');
      rendered = rendered.replace(/\{\{itemsList\}\}/g, itemsHtml);
    }
    
    return rendered;
  }

  // Send email notification (mock implementation)
  private async sendEmail(to: string, subject: string, content: string): Promise<boolean> {
    try {
      // In a real implementation, you would integrate with:
      // - SendGrid, AWS SES, Mailgun, etc.
      console.log('📧 Email sent to:', to);
      console.log('Subject:', subject);
      console.log('Content:', content);
      
      // Store notification in localStorage for demo
      this.storeNotification({
        id: Date.now().toString(),
        type: 'email',
        recipient: to,
        subject,
        content,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  // Send SMS notification (mock implementation)
  private async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      // In a real implementation, you would integrate with:
      // - Twilio, AWS SNS, TextLocal, etc.
      console.log('📱 SMS sent to:', to);
      console.log('Message:', message);
      
      // Store notification in localStorage for demo
      this.storeNotification({
        id: Date.now().toString(),
        type: 'sms',
        recipient: to,
        content: message,
        status: 'sent',
        timestamp: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      return false;
    }
  }

  // Store notification history
  private storeNotification(notification: any): void {
    const stored = JSON.parse(localStorage.getItem('notification_history') || '[]');
    stored.unshift(notification);
    
    // Keep only last 100 notifications
    if (stored.length > 100) {
      stored.splice(100);
    }
    
    localStorage.setItem('notification_history', JSON.stringify(stored));
  }

  // Main notification sending method
  async sendOrderNotification(
    event: NotificationTemplate['event'],
    data: NotificationData,
    userId: string
  ): Promise<void> {
    const preferences = this.getNotificationPreferences(userId);
    
    // Check if user wants this type of notification
    const eventPreferenceMap = {
      'order_confirmation': preferences.orderConfirmation,
      'order_shipped': preferences.shippingUpdates,
      'out_for_delivery': preferences.shippingUpdates,
      'delivered': preferences.deliveryNotifications,
      'cancelled': true // Always send cancellation notifications
    };
    
    if (!eventPreferenceMap[event]) {
      console.log(`User ${userId} has disabled ${event} notifications`);
      return;
    }

    // Send email if enabled
    if (preferences.email && data.customerEmail) {
      const emailTemplate = emailTemplates.find(t => t.event === event);
      if (emailTemplate) {
        const subject = this.renderTemplate(emailTemplate.subject || '', data);
        const content = this.renderTemplate(emailTemplate.template, data);
        await this.sendEmail(data.customerEmail, subject, content);
      }
    }

    // Send SMS if enabled
    if (preferences.sms && data.customerPhone) {
      const smsTemplate = smsTemplates.find(t => t.event === event);
      if (smsTemplate) {
        const message = this.renderTemplate(smsTemplate.template, data);
        await this.sendSMS(data.customerPhone, message);
      }
    }
  }

  // Get notification history
  getNotificationHistory(): any[] {
    return JSON.parse(localStorage.getItem('notification_history') || '[]');
  }

  // Simulate order status updates (for demo purposes)
  simulateOrderUpdates(orderId: string, data: NotificationData, userId: string): void {
    // Order confirmation (immediate)
    this.sendOrderNotification('order_confirmation', data, userId);
    
    // Order shipped (after 2 seconds for demo)
    setTimeout(() => {
      const shippedData = {
        ...data,
        trackingNumber: `TRK${Date.now()}`,
        courierPartner: 'FastTrack Express',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      this.sendOrderNotification('order_shipped', shippedData, userId);
    }, 2000);
    
    // Out for delivery (after 4 seconds for demo)
    setTimeout(() => {
      this.sendOrderNotification('out_for_delivery', data, userId);
    }, 4000);
    
    // Delivered (after 6 seconds for demo)
    setTimeout(() => {
      this.sendOrderNotification('delivered', data, userId);
    }, 6000);
  }
}

export default NotificationService;
