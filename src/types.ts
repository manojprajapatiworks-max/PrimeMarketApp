export type Language = 'hi' | 'en' | 'awa' | 'bho';

export type AppRole = 'customer' | 'seller' | 'delivery' | 'provider' | 'admin';

export type AppViewport = 'mobile' | 'desktop';

export interface Category {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  image: string;
  itemCount: number;
  subcategories?: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  mrp: number;
  stock: number;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  brand: string;
  name: string;
  nameHi: string;
  category: string;
  subCategory: string;
  price: number;
  mrp: number;
  unit: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  descriptionHi: string;
  hsnCode: string;
  gstRate: number; // e.g. 5, 12, 18
  village: string;
  district: string;
  isFeatured?: boolean;
  isOrganic?: boolean;
  badge?: string;
  variants?: ProductVariant[];
}

export interface ServiceItem {
  id: string;
  providerId: string;
  providerName: string;
  providerPhoto: string;
  title: string;
  titleHi: string;
  category: string;
  price: number;
  rating: number;
  experienceYears: number;
  district: string;
  block: string;
  availableSlots: string[];
  mobile: string;
  verified: boolean;
}

export interface GovtServiceItem {
  id: string;
  title: string;
  titleHi: string;
  dept: string;
  deptHi: string;
  fee: number;
  docRequired: string[];
  icon: string;
  urlLabel?: string;
}

export interface JobItem {
  id: string;
  title: string;
  titleHi: string;
  company: string;
  type: 'daily_wage' | 'skilled' | 'full_time';
  salary: string;
  village: string;
  district: string;
  contact: string;
  openings: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  house: string;
  village: string;
  post: string;
  block: string;
  district: string;
  pinCode: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';

export type PaymentStatus = 'pending' | 'success' | 'failed';

export type TrackingStage = 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface DeliveryRider {
  id: string;
  name: string;
  phone: string;
  photo: string;
  vehicleNo: string;
  vehicleType: string;
  rating: number;
  totalDeliveries: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  taxAmount: number;
  finalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  address: Address;
  trackingStage: TrackingStage;
  rider?: DeliveryRider;
  deliveryOtp: string;
  estimatedDeliveryMinutes: number;
  riderProgressPercentage: number; // 0 to 100
  couponApplied?: string;
  invoiceNumber: string;
}

export interface ServiceBooking {
  id: string;
  bookingNumber: string;
  service: ServiceItem;
  customerName: string;
  customerMobile: string;
  address: Address;
  date: string;
  timeSlot: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  otp: string;
  createdAt: string;
}

export interface Seller {
  id: string;
  shopName: string;
  ownerName: string;
  gst: string;
  pan: string;
  district: string;
  village: string;
  rating: number;
  totalOrders: number;
  revenue: number;
  walletBalance: number;
  commissionRate: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'offer' | 'wallet' | 'service' | 'alert';
}

export interface UserProfile {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  village: string;
  block: string;
  district: string;
  state: string;
  walletBalance: number;
  addresses: Address[];
  aadhaarVerified: boolean;
}
