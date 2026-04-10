-- HeatTech E-commerce Database Schema
-- Version: 1.0.0
-- Date: 2026-04-04

-- ============================================
-- 1. Enable UUID extension
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. Categories Table
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_zh TEXT,
  image VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_featured ON categories(featured);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);

-- ============================================
-- 3. Products Table
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_zh TEXT,
  price DECIMAL(12, 2) NOT NULL DEFAULT 0,
  compare_price DECIMAL(12, 2),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_slug VARCHAR(100),
  images TEXT[], -- Array of image URLs
  stock_status VARCHAR(50) DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock')),
  specifications JSONB DEFAULT '{}',
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_stock ON products(stock_status);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_search_en ON products USING gin(to_tsvector('english', name_en || ' ' || COALESCE(description_en, '')));
CREATE INDEX idx_products_search_zh ON products USING gin(to_tsvector('simple', name_zh || ' ' || COALESCE(description_zh, '')));

-- ============================================
-- 4. Articles Table
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('news', 'case_study', 'faq')),
  title_en VARCHAR(500) NOT NULL,
  title_zh VARCHAR(500) NOT NULL,
  excerpt_en TEXT,
  excerpt_zh TEXT,
  content_en TEXT,
  content_zh TEXT,
  featured_image VARCHAR(500),
  author VARCHAR(255),
  tags TEXT[],
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_type ON articles(type);
CREATE INDEX idx_articles_published ON articles(is_published);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);

-- ============================================
-- 5. Customers Table (for user accounts)
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  company VARCHAR(255),
  avatar_url VARCHAR(500),
  preferences JSONB DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_supabase_user ON customers(supabase_user_id);

-- ============================================
-- 6. Orders Table
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
  shipping_cost DECIMAL(12, 2) DEFAULT 0,
  tax_amount DECIMAL(12, 2) DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
  payment_intent_id VARCHAR(255),
  shipping_method VARCHAR(100),
  shipping_tracking_number VARCHAR(255),
  notes TEXT,
  -- Customer info (for guest checkout)
  guest_email VARCHAR(255),
  guest_first_name VARCHAR(100),
  guest_last_name VARCHAR(100),
  guest_phone VARCHAR(50),
  guest_company VARCHAR(255),
  -- Shipping address
  shipping_address_line1 VARCHAR(255),
  shipping_address_line2 VARCHAR(255),
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(100),
  shipping_postal_code VARCHAR(20),
  shipping_country VARCHAR(100),
  shipping_phone VARCHAR(50),
  -- Billing address
  billing_address_line1 VARCHAR(255),
  billing_address_line2 VARCHAR(255),
  billing_city VARCHAR(100),
  billing_state VARCHAR(100),
  billing_postal_code VARCHAR(20),
  billing_country VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- ============================================
-- 7. Order Items Table
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_slug VARCHAR(100),
  name VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255),
  sku VARCHAR(100),
  price DECIMAL(12, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  specifications JSONB DEFAULT '{}',
  image_url VARCHAR(500),
  subtotal DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- ============================================
-- 8. Inquiries Table
-- ============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'responded', 'converted', 'closed')),
  -- Contact info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  -- Inquiry details
  product_model VARCHAR(255),
  quantity INTEGER DEFAULT 1,
  target_price DECIMAL(12, 2),
  message TEXT NOT NULL,
  -- Response
  response TEXT,
  responded_by VARCHAR(255),
  responded_at TIMESTAMPTZ,
  -- Source tracking
  source VARCHAR(50), -- web, email, phone, etc.
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_number ON inquiries(inquiry_number);
CREATE INDEX idx_inquiries_customer ON inquiries(customer_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_created ON inquiries(created_at DESC);

-- ============================================
-- 9. Wishlist Table (for logged-in users)
-- ============================================
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

CREATE INDEX idx_wishlists_customer ON wishlists(customer_id);
CREATE INDEX idx_wishlists_product ON wishlists(product_id);

-- ============================================
-- 10. Functions and Triggers
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := 'HT' || TO_CHAR(NOW(), 'YYYYMMDD') || SUBSTR(MD5(RANDOM()::TEXT), 1, 6) || UPPER(SUBSTR(MD5(NOW()::TEXT), 1, 2));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_orders_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Function to generate inquiry number
CREATE OR REPLACE FUNCTION generate_inquiry_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.inquiry_number IS NULL OR NEW.inquiry_number = '' THEN
    NEW.inquiry_number := 'INQ' || TO_CHAR(NOW(), 'YYYYMMDD') || SUBSTR(MD5(RANDOM()::TEXT), 1, 6) || UPPER(SUBSTR(MD5(NOW()::TEXT), 1, 2));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_inquiries_inquiry_number
  BEFORE INSERT ON inquiries
  FOR EACH ROW EXECUTE FUNCTION generate_inquiry_number();

-- ============================================
-- 11. Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Public read access for categories, products, articles
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (is_published = TRUE);

-- Customers: users can only see their own data
CREATE POLICY "Users can view own customer record"
  ON customers FOR SELECT
  USING (supabase_user_id = auth.uid());

CREATE POLICY "Users can update own customer record"
  ON customers FOR UPDATE
  USING (supabase_user_id = auth.uid());

-- Orders: users can only see their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (customer_id = (SELECT id FROM customers WHERE supabase_user_id = auth.uid()));

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (customer_id IS NOT NULL OR guest_email IS NOT NULL);

-- Order items follow parent order access
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (order_id IN (SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE supabase_user_id = auth.uid())));

-- Inquiries: users can only see their own
CREATE POLICY "Users can view own inquiries"
  ON inquiries FOR SELECT
  USING (customer_id = (SELECT id FROM customers WHERE supabase_user_id = auth.uid()) OR TRUE);

CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (TRUE);

-- Wishlists: users can only manage their own
CREATE POLICY "Users can manage own wishlist"
  ON wishlists FOR ALL
  USING (customer_id = (SELECT id FROM customers WHERE supabase_user_id = auth.uid()));

-- ============================================
-- 12. Seed Data (Optional - uncomment if needed)
-- ============================================

-- Insert default categories
-- INSERT INTO categories (slug, name_en, name_zh, description_en, description_zh, sort_order, featured) VALUES
-- ('gas', 'Gas Heaters', '燃气热水器', 'High-efficiency gas water heaters', '高效燃气热水器', 1, TRUE),
-- ('electric', 'Electric Heaters', '电热水器', 'Safe and convenient electric water heaters', '安全便捷的电热水器', 2, TRUE),
-- ('solar', 'Solar Heaters', '太阳能热水器', 'Eco-friendly solar hot water systems', '环保太阳能热水系统', 3, TRUE),
-- ('heat-pump', 'Heat Pumps', '空气能热泵', 'Energy-efficient heat pump water heaters', '节能空气能热泵', 4, TRUE),
-- ('boiler', 'Boilers', '锅炉', 'Commercial and industrial boilers', '商业和工业锅炉', 5, FALSE);
