import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  AppRole,
  AppViewport,
  UserProfile,
  CartItem,
  Product,
  Order,
  ServiceBooking,
  NotificationItem,
  Address,
  PaymentMethod,
  TrackingStage
} from '../types';
import { INITIAL_USER, INITIAL_ORDERS, MOCK_PRODUCTS, MOCK_SERVICES } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  appRole: AppRole;
  setAppRole: (role: AppRole) => void;
  viewport: AppViewport;
  setViewport: (vp: AppViewport) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  placeOrder: (
    address: Address,
    paymentMethod: PaymentMethod,
    discountAmount: number,
    couponCode?: string
  ) => Order;
  serviceBookings: ServiceBooking[];
  createServiceBooking: (
    serviceId: string,
    address: Address,
    date: string,
    timeSlot: string
  ) => ServiceBooking;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  addWalletMoney: (amount: number) => void;
  t: (keyHi: string, keyEn: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hi'); // Default Hindi for Rural UP
  const [appRole, setAppRole] = useState<AppRole>('customer');
  const [viewport, setViewport] = useState<AppViewport>('mobile'); // Default mobile framing, easily toggleable
  const [activeTab, setActiveTab] = useState<string>('home');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod_2', 'prod_5']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([
    {
      id: 'sb_301',
      bookingNumber: 'SB-2026-301',
      service: MOCK_SERVICES[0],
      customerName: INITIAL_USER.fullName,
      customerMobile: INITIAL_USER.mobile,
      address: INITIAL_USER.addresses[0],
      date: '2026-07-24',
      timeSlot: 'आज सुबह 10:00',
      totalAmount: 250,
      status: 'confirmed',
      otp: '7819',
      createdAt: new Date().toISOString()
    }
  ]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(
    INITIAL_ORDERS[0]
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'ऑर्डर आउट फॉर डिलीवरी! 🛵',
      message: 'आपका गेहूं बीज एवं नैनो यूरिया ऑर्डर PM-UP-2026-9012 डिलीवरी पार्टनर सतीश यादव द्वारा आपके गांव मलिहाबाद लाया जा रहा है। OTP: 4829',
      time: '10 मिनट पहले',
      read: false,
      type: 'order'
    },
    {
      id: 'notif_2',
      title: 'पीएम किसान 17वीं किश्त अपडेट',
      message: 'ई-केवाईसी कराने पर ₹2000 की सम्मान निधि सीधे आपके बैंक खाते में भेजी जाएगी। सीएससी सेंटर से अपडेट करें।',
      time: '2 घंटे पहले',
      read: true,
      type: 'alert'
    },
    {
      id: 'notif_3',
      title: 'प्राइममार्केट वॉलेट कैश बैक ₹50 🎉',
      message: 'आपके प्रथम ऑर्डर पर ₹50 वॉलेट कैशबैक क्रेडिट कर दिया गया है।',
      time: '1 दिन पहले',
      read: true,
      type: 'wallet'
    }
  ]);

  // Real-time GPS Delivery Tracking Simulation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prevOrders => {
        let newlyDeliveredList: Order[] = [];

        const nextOrders = prevOrders.map(ord => {
          if (ord.trackingStage === 'out_for_delivery') {
            const newProgress = Math.min(100, ord.riderProgressPercentage + 4);
            const remainingMins = Math.max(1, Math.ceil((100 - newProgress) * 0.3));
            let newStage: TrackingStage = ord.trackingStage;

            if (newProgress >= 100) {
              newStage = 'delivered';
              newlyDeliveredList.push(ord);
            }

            return {
              ...ord,
              riderProgressPercentage: newProgress,
              estimatedDeliveryMinutes: remainingMins,
              trackingStage: newStage
            };
          }
          return ord;
        });

        if (newlyDeliveredList.length > 0) {
          setTimeout(() => {
            setNotifications(nList => {
              const existingIds = new Set(nList.map(n => n.id));
              const freshNotifs: NotificationItem[] = [];
              for (const ord of newlyDeliveredList) {
                const notifId = `notif_del_${ord.id}`;
                if (!existingIds.has(notifId)) {
                  freshNotifs.push({
                    id: notifId,
                    title: 'ऑर्डर सफलतापूर्वक डिलीवर हुआ! ✅',
                    message: `ऑर्डर ${ord.orderNumber} आपके पते ${ord.address.village} पर डिलीवर हो गया है। खरीदारी के लिए धन्यवाद!`,
                    time: 'अभी',
                    read: false,
                    type: 'order'
                  });
                }
              }
              return freshNotifs.length > 0 ? [...freshNotifs, ...nList] : nList;
            });
          }, 0);
        }

        return nextOrders;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Language translation helper
  const t = (keyHi: string, keyEn: string) => {
    if (language === 'hi' || language === 'awa' || language === 'bho') return keyHi;
    return keyEn;
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.product.id === product.id);
      if (existing) {
        return prevCart.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.product.id === productId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const placeOrder = (
    address: Address,
    paymentMethod: PaymentMethod,
    discountAmount: number,
    couponCode?: string
  ): Order => {
    const rawTotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const deliveryFee = rawTotal > 500 ? 0 : 30;
    const taxAmount = Math.round(rawTotal * 0.05); // Average 5% GST
    const finalAmount = Math.max(0, rawTotal - discountAmount + deliveryFee + taxAmount);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `PM-UP-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      items: [...cart],
      totalAmount: rawTotal,
      discountAmount,
      deliveryFee,
      taxAmount,
      finalAmount,
      paymentMethod,
      paymentStatus: 'success',
      transactionId: `TXN_${paymentMethod.toUpperCase()}_${Date.now()}`,
      address,
      trackingStage: 'out_for_delivery', // Start with out_for_delivery for instant demo tracking
      rider: {
        id: 'rdr_502',
        name: 'अजय कुमार शर्मा (Ajay Sharma)',
        phone: '9839100223',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
        vehicleNo: 'UP 32 BK 4012',
        vehicleType: 'Hero Splendor Plus',
        rating: 4.8,
        totalDeliveries: 520
      },
      deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      estimatedDeliveryMinutes: 18,
      riderProgressPercentage: 15,
      couponApplied: couponCode,
      invoiceNumber: `INV-2026-${randomSuffix}`
    };

    // Update wallet if paid with wallet
    if (paymentMethod === 'wallet') {
      setUser(prev => ({
        ...prev,
        walletBalance: Math.max(0, prev.walletBalance - finalAmount)
      }));
    }

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveTrackingOrder(newOrder);

    // Push order notification
    setNotifications(prev => [
      {
        id: `notif_ord_${newOrder.id}`,
        title: 'ऑर्डर सफलतापूर्वक दर्ज हुआ! 📦',
        message: `आपका ऑर्डर ${orderNum} (₹${finalAmount}) स्वीकार कर लिया गया है। सतीश यादव आपके पते ${address.village} पर आ रहे हैं।`,
        time: 'अभी',
        read: false,
        type: 'order'
      },
      ...prev
    ]);

    return newOrder;
  };

  const createServiceBooking = (
    serviceId: string,
    address: Address,
    date: string,
    timeSlot: string
  ): ServiceBooking => {
    const service = MOCK_SERVICES.find(s => s.id === serviceId) || MOCK_SERVICES[0];
    const newBooking: ServiceBooking = {
      id: `sb_${Date.now()}`,
      bookingNumber: `SB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      service,
      customerName: user.fullName,
      customerMobile: user.mobile,
      address,
      date,
      timeSlot,
      totalAmount: service.price,
      status: 'confirmed',
      otp: `${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };

    setServiceBookings(prev => [newBooking, ...prev]);

    setNotifications(prev => [
      {
        id: `notif_srv_${newBooking.id}`,
        title: 'सेवा बुकिंग कन्फर्म हुई! 🛠️',
        message: `${service.title} (${service.providerName}) हेतु बुकिंग संख्या ${newBooking.bookingNumber} स्वीकार की गई है।`,
        time: 'अभी',
        read: false,
        type: 'service'
      },
      ...prev
    ]);

    return newBooking;
  };

  const addWalletMoney = (amount: number) => {
    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + amount
    }));
    setNotifications(prev => [
      {
        id: `notif_wal_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        title: 'वॉलेट रिचार्ज सफल! 💳',
        message: `₹${amount} आपके प्राइममार्केट वॉलेट में जमा कर दिए गए हैं। वर्तमान बैलेंस: ₹${user.walletBalance + amount}`,
        time: 'अभी',
        read: false,
        type: 'wallet'
      },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        appRole,
        setAppRole,
        viewport,
        setViewport,
        activeTab,
        setActiveTab,
        user,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        serviceBookings,
        createServiceBooking,
        activeTrackingOrder,
        setActiveTrackingOrder,
        notifications,
        markNotificationRead,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addWalletMoney,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
