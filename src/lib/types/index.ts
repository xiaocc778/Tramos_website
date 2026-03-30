export interface Product {
  id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  description_en: string;
  description_zh: string;
  price: number;
  compare_price?: number;
  category_id?: string;
  category_slug?: string;
  images?: string[];
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  specifications?: Record<string, string | number>;
  featured?: boolean;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ProductFilters {
  category?: string;
  featured?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  slug?: string;
}

export interface Article {
  id: string;
  slug: string;
  type: 'news' | 'case_study' | 'faq';
  title_en: string;
  title_zh: string;
  excerpt_en?: string;
  excerpt_zh?: string;
  content_en: string;
  content_zh: string;
  featured_image?: string;
  is_published?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleFilters {
  type?: 'news' | 'case_study' | 'faq';
  is_published?: boolean;
  slug?: string;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_zh: string;
  description_en?: string;
  description_zh?: string;
  image?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  customer_id?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  customer_info?: CustomerInfo;
  shipping_info?: ShippingInfo;
  payment_method?: string;
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_method?: string;
  shipping_cost?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  nameZh?: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  image?: string;
  specifications?: Record<string, string | number>;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

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

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  nameZh?: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  image?: string;
  specifications?: Record<string, string | number>;
}

export interface ProductCardProps {
  product: Product;
  isZh?: boolean;
  className?: string;
}

export interface ArticleCardProps {
  article: Article;
  isZh?: boolean;
  showDate?: boolean;
  className?: string;
}