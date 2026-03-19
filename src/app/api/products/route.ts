import { NextResponse } from 'next/server';

// Mock product data - in production, fetch from Supabase
const products = [
  {
    id: '1',
    slug: 'smart-gas-water-heater-12l',
    name_en: 'Smart Gas Water Heater 12L',
    name_zh: '智能燃气热水器 12L',
    description_en: 'Advanced smart gas water heater with digital temperature control and safety features.',
    description_zh: '先进的智能燃气热水器，配备数字温度控制和安全功能。',
    price: 599,
    compare_price: 699,
    category_id: 'gas',
    specifications: {
      capacity: '12L',
      type: 'Gas',
      'energy_rating': 'A+',
      warranty: '5 Years'
    },
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600'],
    stock_quantity: 50,
    stock_status: 'in_stock',
    is_featured: true,
    is_active: true
  },
  {
    id: '2',
    slug: 'electric-instant-water-heater',
    name_en: 'Electric Instant Water Heater',
    name_zh: '电即热式热水器',
    description_en: 'Compact electric instant water heater, perfect for small spaces.',
    description_zh: '紧凑型电即热式热水器，非常适合小空间。',
    price: 299,
    compare_price: 399,
    category_id: 'electric',
    specifications: {
      capacity: '6L',
      type: 'Electric',
      'energy_rating': 'A',
      warranty: '3 Years'
    },
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'],
    stock_quantity: 100,
    stock_status: 'in_stock',
    is_featured: true,
    is_active: true
  },
  {
    id: '3',
    slug: 'solar-thermal-system-300l',
    name_en: 'Solar Thermal System 300L',
    name_zh: '太阳能热水系统 300L',
    description_en: 'Eco-friendly solar thermal system with 300L capacity for whole home heating.',
    description_zh: '环保的太阳能热水系统，300L容量，可为整屋供暖。',
    price: 1299,
    compare_price: 1599,
    category_id: 'solar',
    specifications: {
      capacity: '300L',
      type: 'Solar',
      'energy_rating': 'A++',
      warranty: '10 Years'
    },
    images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600'],
    stock_quantity: 30,
    stock_status: 'in_stock',
    is_featured: true,
    is_active: true
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const slug = searchParams.get('slug');

  let filteredProducts = [...products];

  if (slug) {
    const product = filteredProducts.find(p => p.slug === slug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category_id === category);
  }

  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(p => p.is_featured);
  }

  return NextResponse.json(filteredProducts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In production, insert into Supabase
    const newProduct = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString()
    };

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
