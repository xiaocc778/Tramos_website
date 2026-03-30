import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

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

  // 单个产品查询
  if (slug) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
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
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }

  return NextResponse.json(data || []);
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
