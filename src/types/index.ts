// ============== 核心类型定义 ==============

// 产品类型
export interface Product {
  id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  description_en: string;
  description_zh: string;
  price: number;
  compare_price?: number;
  category_id: string;
  specifications: Record<string, string>;
  images: string[];
  stock_quantity: number;
  stock_status: 'in_stock' | 'out_of_stock' | 'low_stock';
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 分类类型
export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

// 文章/案例类型
export interface Article {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  excerpt_en?: string;
  excerpt_zh?: string;
  content_en: string;
  content_zh: string;
  type: 'news' | 'case_study' | 'faq';
  featured_image?: string;
  author?: string;
  published_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
}

// ============== 订单类型 ==============

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  total: number;
  currency: string;
  payment_method?: string;
  payment_status: PaymentStatus;
  payment_intent_id?: string;
  shipping_tracking_number?: string;
  notes?: string;
  guest_email?: string;
  guest_first_name?: string;
  guest_last_name?: string;
  guest_phone?: string;
  guest_company?: string;
  shipping_address_line1?: string;
  shipping_address_line2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
  shipping_phone?: string;
  order_items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  name_zh?: string;
  price: number;
  quantity: number;
  specifications?: Record<string, string>;
  image_url?: string;
  subtotal: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

// ============== 询盘类型 ==============

export interface Inquiry {
  id: string;
  inquiry_number: string;
  status: 'new' | 'reviewed' | 'responded' | 'converted' | 'closed';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product_model?: string;
  quantity?: number;
  target_price?: number;
  message: string;
  response?: string;
  responded_by?: string;
  responded_at?: string;
  created_at: string;
}

// ============== Stripe 类型 ==============

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

// ============== API 响应类型 ==============

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============== 查询参数类型 ==============

export interface ProductFilters {
  category?: string;
  featured?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface ArticleFilters {
  type?: 'news' | 'case_study' | 'faq';
  is_published?: boolean;
}

// ============== 前端专用类型 ==============

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}
