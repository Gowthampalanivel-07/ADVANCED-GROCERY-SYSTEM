// Product Management
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  baseCost: number;
  basePrice: number;
  currentPrice: number;
  stock: number;
  reorderLevel: number;
  expiryDate: Date;
  daysUntilExpiry: number;
  daysToExpireAlert: number; // Alert if expires within X days
  isPerishable: boolean;
  supplier: Supplier;
  lastRestockDate: Date;
  turnoverRate: number; // times per month
}

// Dynamic Pricing
export interface PricingRule {
  id: string;
  productId: string;
  basePrice: number;
  demandMultiplier: number; // 0.8 - 1.5
  expiryDiscount: number; // 0 - 40%
  timeOfDayDiscount: {
    morningDisc: number; // 6am-12pm
    afternoonDisc: number; // 12pm-5pm
    eveningDisc: number; // 5pm-10pm
    nightDisc: number; // 10pm-6am
  };
  effectivePrice: number;
  lastUpdated: Date;
}

// Store Layout Optimization
export interface StoreZone {
  id: string;
  name: string;
  products: string[]; // Product IDs
  customerFlow: number; // 0-100 (foot traffic %)
  averageSpend: number; // Avg spend in this zone
  conversionRate: number; // % of visitors who buy
  suggestedProducts: string[]; // AI recommendations
}

// Customer Behavior Heatmap
export interface HeatmapData {
  timestamp: Date;
  customerId: string;
  zoneId: string;
  durationSeconds: number;
  productsViewed: string[];
  productsQueriedBySimilar: string[];
}

export interface AggregatedHeatmap {
  zoneId: string;
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  trafficScore: number; // 0-100
  avgDurationSeconds: number;
  mostViewedProducts: { id: string; count: number }[];
}

// Inventory & Supplier Integration
export interface Supplier {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  deliveryDays: number;
  minimumOrderQuantity: number;
  pricePerUnit: number;
  reliability: number; // 0-100
  lastOrderDate: Date;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  orderDate: Date;
  expectedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

// Profit Intelligence
export interface ProfitReport {
  id: string;
  productId: string;
  period: 'daily' | 'weekly' | 'monthly';
  totalRevenue: number;
  totalCost: number;
  grossProfit: number;
  profitMargin: number; // %
  unitsSold: number;
  generatedAt: Date;
}

// GST & Taxes
export interface TaxConfiguration {
  gstRate: number; // India GST rate
  category: string;
  lastUpdated: Date;
}

export interface TaxReport {
  id: string;
  periodStart: Date;
  periodEnd: Date;
  totalSales: number;
  gstCollected: number;
  taxableAmount: number;
  generatedAt: Date;
}

// Self-Checkout
export interface SelfCheckoutSession {
  id: string;
  customerId?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'active' | 'completed' | 'abandoned';
  startTime: Date;
  completionTime?: Date;
  paymentMethod: 'card' | 'upi' | 'cash' | 'wallet';
}

// Smart Promotions
export interface Promotion {
  id: string;
  type: 'bogo' | 'discount' | 'combo' | 'bundle';
  description: string;
  applicableProducts: string[];
  discountPercent?: number;
  discountValue?: number;
  minPurchaseAmount?: number;
  validFrom: Date;
  validTo: Date;
  maxRedemptions: number;
  redemptionCount: number;
  status: 'active' | 'expired' | 'paused';
}

// Communication
export interface NotificationQueue {
  id: string;
  customerId?: string;
  type: 'sms' | 'whatsapp' | 'email';
  content: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: Date;
  sentAt?: Date;
}

// Fraud Detection
export interface FraudAlert {
  id: string;
  type: 'unusual_refunds' | 'high_discount' | 'staff_anomaly' | 'price_tampering';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedRecords: string[];
  detectedAt: Date;
  resolvedAt?: Date;
  resolved: boolean;
}

// CCTV & AI
export interface CCTVAlert {
  id: string;
  timestamp: Date;
  alertType: 'shoplifting' | 'crowded' | 'emergency';
  severity: 'info' | 'warning' | 'critical';
  description: string;
  countersSuggested?: number;
  acknowledged: boolean;
}

// Sales Forecasting
export interface SalesForecast {
  id: string;
  productId: string;
  forecastDate: Date;
  expectedUnits: number;
  confidence: number; // 0-100
  factors: string[]; // Weather, promotions, etc.
}

// Cold Storage Monitoring
export interface ColdStorageMonitor {
  id: string;
  storageId: string;
  currentTemp: number;
  targetTemp: number;
  humidity: number;
  lastAlert?: string;
  productsStored: string[];
  isWarning: boolean;
  isCritical: boolean;
}

// Sustainability
export interface SustainabilityMetrics {
  id: string;
  period: Date;
  wasteReduced: number; // kg
  expiredProductsSaved: number; // kg
  carbonFootprint: number; // kg CO2
  ecoScore: number; // 0-100
}

// Gamification
export interface CustomerReward {
  id: string;
  customerId: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  spinTokens: number;
  lastSpinDate?: Date;
  referralBonusAwarded: boolean;
}

// Face Recognition Loyalty
export interface FaceProfile {
  id: string;
  customerId: string;
  faceEmbedding: string; // Encrypted facial data
  confidence: number;
  lastRecognized: Date;
  visitCount: number;
}

// Dashboard Analytics
export interface DashboardMetrics {
  totalRevenue: number;
  totalProfit: number;
  profitMargin: number;
  productsLowStock: string[];
  fraudAlerts: number;
  topSellingProducts: { id: string; sales: number }[];
  customerCount: number;
  avgTransactionValue: number;
  dashboardUpdatedAt: Date;
}

// User/Auth
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff' | 'customer';
  storeId?: string;
  createdAt: Date;
  isActive: boolean;
}

// Store
export interface Store {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  phonesConnected: string[]; // For self-checkout
  cctv: {
    enabled: boolean;
    cameraCount: number;
    aiDetectionEnabled: boolean;
  };
  createdAt: Date;
}
