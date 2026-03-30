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

// 订单类型
export interface Order {
  id: string;
  items: OrderItem[];
  customer_info: CustomerInfo;
  shipping_info: ShippingInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  name_zh: string;
  price: number;
  quantity: number;
  image: string;
  specifications?: Record<string, string>;
}

export interface CustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
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

// ============== 前端专用类型（带方便使用的字段） ==============

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}
