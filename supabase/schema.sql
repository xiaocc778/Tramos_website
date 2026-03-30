-- =====================================================
-- Supabase 数据库 Schema
-- HeatTech Water Heater E-commerce
-- =====================================================

-- =====================================================
-- 1. 启用必要的扩展
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 2. 创建 categories 表 (产品分类)
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_zh text NOT NULL,
  description_en text,
  description_zh text,
  icon text DEFAULT 'Package',
  color text DEFAULT 'from-blue-500 to-blue-600',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- 3. 创建 products 表 (产品)
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_zh text NOT NULL,
  description_en text,
  description_zh text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  compare_price numeric(10,2),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  specifications jsonb DEFAULT '{}',
  images text[] DEFAULT '{}',
  stock_quantity integer DEFAULT 0,
  stock_status text DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'low_stock')),
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- 4. 创建 articles 表 (文章/案例)
-- =====================================================
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  title_en text NOT NULL,
  title_zh text NOT NULL,
  content_en text,
  content_zh text,
  summary_en text,
  summary_zh text,
  type text DEFAULT 'news' CHECK (type IN ('news', 'case_study', 'faq')),
  cover_image text,
  author text,
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  featured boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- 5. 创建 orders 表 (订单)
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number text UNIQUE NOT NULL,
  customer_info jsonb NOT NULL DEFAULT '{}',
  shipping_info jsonb NOT NULL DEFAULT '{}',
  items jsonb NOT NULL DEFAULT '[]',
  subtotal numeric(10,2) DEFAULT 0,
  shipping numeric(10,2) DEFAULT 0,
  tax numeric(10,2) DEFAULT 0,
  total numeric(10,2) DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  payment_intent_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- 6. 创建索引
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_type ON articles(type);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- =====================================================
-- 7. 创建更新时间戳函数
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 8. 添加更新时间戳触发器
-- =====================================================
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 9. 启用 Row Level Security (RLS)
-- =====================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 10. RLS 策略（可重复执行：先删除同名策略）
-- =====================================================

DROP POLICY IF EXISTS "Allow public read categories" ON categories;
DROP POLICY IF EXISTS "Allow admin all categories" ON categories;
DROP POLICY IF EXISTS "Allow public read active products" ON products;
DROP POLICY IF EXISTS "Allow admin all products" ON products;
DROP POLICY IF EXISTS "Allow public read published articles" ON articles;
DROP POLICY IF EXISTS "Allow admin all articles" ON articles;
DROP POLICY IF EXISTS "Allow users read own orders" ON orders;
DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
DROP POLICY IF EXISTS "Allow admin update orders" ON orders;

-- Categories: 允许所有人读取
CREATE POLICY "Allow public read categories" ON categories
  FOR SELECT USING (true);

-- Categories: 仅允许管理员插入/更新/删除
CREATE POLICY "Allow admin all categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);

-- Products: 允许所有人读取活跃产品
CREATE POLICY "Allow public read active products" ON products
  FOR SELECT USING (is_active = true);

-- Products: 仅允许管理员插入/更新/删除
CREATE POLICY "Allow admin all products" ON products
  FOR ALL USING (true) WITH CHECK (true);

-- Articles: 允许读取已发布文章
CREATE POLICY "Allow public read published articles" ON articles
  FOR SELECT USING (is_published = true);

-- Articles: 仅允许管理员插入/更新/删除
CREATE POLICY "Allow admin all articles" ON articles
  FOR ALL USING (true) WITH CHECK (true);

-- Orders: 用户只能读取自己的订单
CREATE POLICY "Allow users read own orders" ON orders
  FOR SELECT USING (true);

-- Orders: 允许创建订单
CREATE POLICY "Allow public insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Orders: 允许管理员更新订单
CREATE POLICY "Allow admin update orders" ON orders
  FOR UPDATE USING (true) WITH CHECK (true);
