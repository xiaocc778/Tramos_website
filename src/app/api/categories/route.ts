import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { fallbackCategories } from '@/lib/fallback-data';

export async function GET(request: Request) {
  const supabase = await createServerClient();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  // 单个分类查询
  if (slug) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      const fallbackCategory = fallbackCategories.find((category) => category.slug === slug);
      if (fallbackCategory) return NextResponse.json(fallbackCategory);
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  // 列表查询
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json(fallbackCategories);
  }

  return NextResponse.json(data || []);
}
