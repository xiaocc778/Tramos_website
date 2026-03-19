-- Database Schema for Heater Shop
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  company_name TEXT,
  is_b2b BOOLEAN DEFAULT FALSE,
  b2b_status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_en TEXT,
  description_zh TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brands
CREATE TABLE public.brands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  description_en TEXT,
  description_zh TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  description_en TEXT,
  description_zh TEXT,
  category_id UUID REFERENCES categories(id),
  brand_id UUID REFERENCES brands(id),
  
  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  wholesale_price DECIMAL(10,2),
  moq INT DEFAULT 1, -- Minimum Order Quantity for B2B
  
  -- Stock
  stock_quantity INT DEFAULT 0,
  stock_status TEXT DEFAULT 'in_stock', -- in_stock, low_stock, out_of_stock
  
  -- Flags
  is_featured BOOLEAN DEFAULT FALSE,
  is_b2b_only BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- SEO
  seo_title_en TEXT,
  seo_title_zh TEXT,
  seo_description_en TEXT,
  seo_description_zh TEXT,
  
  -- JSONB fields
  specifications JSONB DEFAULT '{}',
  images JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product Variants
CREATE TABLE public.product_variants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  price DECIMAL(10,2),
  compare_price DECIMAL(10,2),
  stock_quantity INT DEFAULT 0,
  attributes JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, processing, shipped, delivered, cancelled, refunded
  
  -- Amounts
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  -- Customer Info (for guests)
  customer_email TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  
  -- Addresses
  shipping_address JSONB,
  billing_address JSONB,
  
  -- Notes
  notes TEXT,
  customer_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  variant_id UUID REFERENCES product_variants(id),
  
  product_name_en TEXT NOT NULL,
  product_name_zh TEXT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) NOT NULL,
  
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_charge_id TEXT UNIQUE,
  
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- pending, succeeded, failed, refunded
  
  payment_method TEXT, -- card, alipay, etc
  receipt_url TEXT,
  
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries (B2B)
CREATE TABLE public.inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  
  -- Contact Info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  company_name TEXT,
  
  -- Inquiry Details
  product_id UUID REFERENCES products(id),
  message TEXT NOT NULL,
  quantity INT,
  target_price DECIMAL(10,2),
  
  -- Status
  status TEXT DEFAULT 'new', -- new, contacted, quoted, closed
  admin_notes TEXT,
  quote_amount DECIMAL(10,2),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blogs
CREATE TABLE public.blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt_en TEXT,
  excerpt_zh TEXT,
  content_en TEXT,
  content_zh TEXT,
  
  cover_image TEXT,
  author_id UUID REFERENCES profiles(id),
  
  category_id UUID REFERENCES categories(id),
  tags TEXT[],
  
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  seo_title_en TEXT,
  seo_title_zh TEXT,
  seo_description_en TEXT,
  seo_description_zh TEXT,
  
  view_count INT DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects (Case Studies)
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_en TEXT,
  description_zh TEXT,
  
  client_name TEXT,
  location_en TEXT,
  location_zh TEXT,
  
  cover_image TEXT,
  images JSONB DEFAULT '[]',
  
  product_ids UUID[] DEFAULT '{}',
  
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read for products, categories, brands
CREATE POLICY "Products are viewable by everyone" ON products 
  FOR SELECT USING (is_active = true);

CREATE POLICY "Categories are viewable by everyone" ON categories 
  FOR SELECT USING (is_active = true);

CREATE POLICY "Brands are viewable by everyone" ON brands 
  FOR SELECT USING (is_active = true);

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Users can read their own orders
CREATE POLICY "Users can read own orders" ON orders 
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create inquiries
CREATE POLICY "Anyone can create inquiries" ON inquiries 
  FOR INSERT WITH CHECK (true);

-- Admins can do everything (use service role for admin operations)
-- This will be handled in API routes with service role client

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
