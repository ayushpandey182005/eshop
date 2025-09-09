import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Bell, Mail, MessageSquare, Package, Truck, CheckCircle, Gift } from 'lucide-react';
import { useToast } from './ui/use-toast';
import NotificationService, { type NotificationPreferences } from '../services/notificationService';
import { useAuth } from '../hooks/useAuth';

const NotificationSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    sms: true,
    orderConfirmation: true,
    shippingUpdates: true,
    deliveryNotifications: true,
    promotionalOffers: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    if (user?.id) {
      const userPreferences = notificationService.getNotificationPreferences(user.id);
      setPreferences(userPreferences);
    }
  }, [user?.id]);

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePreferences = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "Please log in to save preferences",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      notificationService.updateNotificationPreferences(user.id, preferences);
      toast({
        title: "Success",
        description: "Notification preferences saved successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testNotification = () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "Please log in to test notifications",
        variant: "destructive"
      });
      return;
    }

    const testData = {
      orderId: 'TEST123',
      customerName: user.name || 'Test User',
      customerEmail: user.email || 'test@example.com',
      customerPhone: user.phone || '+91 9876543210',
      orderTotal: 1299,
      items: [
        {
          product: { name: 'Test Product', price: 1299 },
          quantity: 1
        }
      ],
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      deliveryAddress: '123 Test Street, Test City'
    };

    notificationService.sendOrderNotification('order_confirmation', testData, user.id);
    toast({
      title: "Success",
      description: "Test notification sent! Check console for details."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose how you want to receive updates about your orders and account
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Communication Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Communication Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <Label htmlFor="email">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive detailed email updates</p>
                  </div>
                </div>
                <Switch
                  id="email"
                  checked={preferences.email}
                  onCheckedChange={(checked) => handlePreferenceChange('email', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                  <div>
                    <Label htmlFor="sms">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get quick SMS updates</p>
                  </div>
                </div>
                <Switch
                  id="sms"
                  checked={preferences.sms}
                  onCheckedChange={(checked) => handlePreferenceChange('sms', checked)}
                />
              </div>
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-orange-500" />
                  <div>
                    <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                    <p className="text-sm text-muted-foreground">When your order is confirmed</p>
                  </div>
                </div>
                <Switch
                  id="orderConfirmation"
                  checked={preferences.orderConfirmation}
                  onCheckedChange={(checked) => handlePreferenceChange('orderConfirmation', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div>
                    <Label htmlFor="shippingUpdates">Shipping Updates</Label>
                    <p className="text-sm text-muted-foreground">Tracking and shipping notifications</p>
                  </div>
                </div>
                <Switch
                  id="shippingUpdates"
                  checked={preferences.shippingUpdates}
                  onCheckedChange={(checked) => handlePreferenceChange('shippingUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <Label htmlFor="deliveryNotifications">Delivery Notifications</Label>
                    <p className="text-sm text-muted-foreground">When your order is delivered</p>
                  </div>
                </div>
                <Switch
                  id="deliveryNotifications"
                  checked={preferences.deliveryNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('deliveryNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-purple-500" />
                  <div>
                    <Label htmlFor="promotionalOffers">Promotional Offers</Label>
                    <p className="text-sm text-muted-foreground">Deals, discounts, and special offers</p>
                  </div>
                </div>
                <Switch
                  id="promotionalOffers"
                  checked={preferences.promotionalOffers}
                  onCheckedChange={(checked) => handlePreferenceChange('promotionalOffers', checked)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={savePreferences} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
            <Button 
              variant="outline" 
              onClick={testNotification}
              disabled={!user?.id}
            >
              Test Notification
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your recent notification history
          </p>
        </CardHeader>
        <CardContent>
          <NotificationHistory />
        </CardContent>
      </Card>
    </div>
  );
};

const NotificationHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    const notifications = notificationService.getNotificationHistory();
    setHistory(notifications.slice(0, 10)); // Show last 10 notifications
  }, []);

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No notifications yet</p>
        <p className="text-sm">Your notification history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((notification) => (
        <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
          <div className={`p-2 rounded-full ${
            notification.type === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
          }`}>
            {notification.type === 'email' ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">
                {notification.type === 'email' ? notification.subject : 'SMS Notification'}
              </p>
              <span className="text-xs text-muted-foreground">
                {new Date(notification.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              To: {notification.recipient}
            </p>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              notification.status === 'sent' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {notification.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSettings;
