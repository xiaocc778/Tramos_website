import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { fallbackArticles } from '@/lib/fallback-data';

export async function GET(request: Request) {
  const supabase = await createServerClient();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');
  const published = searchParams.get('published');
  const fallbackList = fallbackArticles.filter((article) => {
    if (slug && article.slug !== slug) return false;
    if (type && article.type !== type) return false;
    if (published !== 'false' && !article.is_published) return false;
    return true;
  });

  // 单篇文章查询
  if (slug) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      const fallbackArticle = fallbackList[0];
      if (fallbackArticle) return NextResponse.json(fallbackArticle);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  // 列表查询
  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  if (published !== 'false') {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json(fallbackList);
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const supabase = await createServerClient();

  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('articles')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create article' }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
