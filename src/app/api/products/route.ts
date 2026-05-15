import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { fallbackProducts } from '@/lib/fallback-data';

export async function GET(request: Request) {
  const supabase = await createServerClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const slug = searchParams.get('slug');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const inStock = searchParams.get('inStock');
  const fallbackList = applyProductFallbackFilters({
    slug,
    category,
    featured,
    search,
    minPrice,
    maxPrice,
    inStock,
  });

  // 单个产品查询
  if (slug) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      const fallbackProduct = fallbackList[0];
      if (fallbackProduct) return NextResponse.json(fallbackProduct);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  // 列表查询
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category_id', category);
  }

  if (featured === 'true') {
    query = query.eq('is_featured', true);
  }

  if (search) {
    query = query.or(
      `name_en.ilike.%${search}%,name_zh.ilike.%${search}%,description_en.ilike.%${search}%,description_zh.ilike.%${search}%`
    );
  }

  if (minPrice) {
    query = query.gte('price', Number(minPrice));
  }

  if (maxPrice) {
    query = query.lte('price', Number(maxPrice));
  }

  if (inStock === 'true') {
    query = query.neq('stock_status', 'out_of_stock');
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json(fallbackList);
  }

  return NextResponse.json(data || []);
}

function applyProductFallbackFilters(filters: {
  slug: string | null;
  category: string | null;
  featured: string | null;
  search: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  inStock: string | null;
}) {
  return fallbackProducts.filter((product) => {
    if (filters.slug && product.slug !== filters.slug) return false;
    if (filters.category && filters.category !== 'all') {
      if (product.category_id !== filters.category && product.category_slug !== filters.category) return false;
    }
    if (filters.featured === 'true' && !product.is_featured) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${product.name_en} ${product.name_zh} ${product.description_en} ${product.description_zh}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
    if (filters.inStock === 'true' && product.stock_status === 'out_of_stock') return false;
    return true;
  });
}

export async function POST(request: Request) {
  const supabase = await createServerClient();

  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('products')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create product' }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
