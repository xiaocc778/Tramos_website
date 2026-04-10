'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useUIStore } from '@/lib/ui-store';
import { useArticle } from '@/hooks';
import { Button } from '@/components/ui';
import { ScrollReveal } from '@/components/shared';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';
  const { data: article, isLoading } = useArticle(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-surface-500">{isZh ? '加载中...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '案例未找到' : 'Project Not Found'}
          </h2>
          <Link href="/projects">
            <Button>&larr; {isZh ? '返回项目列表' : 'Back to Projects'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = article.featured_image || '/images/placeholder.png';
  const content = isZh ? article.content_zh : article.content_en;
  const title = isZh ? article.title_zh : article.title_en;

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/projects" className="flex items-center gap-2 text-surface-600 hover:text-orange-500 transition-colors">
            &larr; {isZh ? '返回项目列表' : 'Back to Projects'}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>
          {imageUrl && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-soft">
              <Image
                src={imageUrl}
                alt={title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                unoptimized={imageUrl.startsWith('http')}
              />
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">{title}</h1>
          <p className="text-surface-400 text-sm mb-8">
            {new Date(article.published_at ?? article.created_at).toLocaleDateString()}
          </p>
          <div className="prose prose-lg max-w-none">
            <div className="text-surface-700 leading-relaxed whitespace-pre-wrap">{content}</div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}