'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Article } from '@/lib/types';
import { imageAssets } from '@/lib/assets';

interface ArticleCardProps {
  article: Article;
  isZh?: boolean;
  showDate?: boolean;
  className?: string;
}

export function ArticleCard({
  article,
  isZh = false,
  showDate = true,
  className = '',
}: ArticleCardProps) {
  const title = isZh ? article.title_zh : article.title_en;
  const excerpt = isZh ? article.excerpt_zh : article.excerpt_en;
  const imageUrl = article.featured_image || imageAssets.placeholder;
  const dateStr = article.published_at ?? article.created_at;

  return (
    <Link href={`/projects/${article.slug}`} className={`block ${className}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-md border border-surface-200 bg-white transition-colors duration-300 hover:border-surface-400">
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden bg-surface-100">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              unoptimized={imageUrl.startsWith('http')}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          {showDate && dateStr && (
            <p className="mb-2 text-xs text-surface-400">
              {new Date(dateStr).toLocaleDateString()}
            </p>
          )}
          <h3 className="mb-2 line-clamp-2 font-semibold text-surface-900 transition-colors group-hover:text-orange-700">
            {title}
          </h3>
          {excerpt && (
            <p className="mb-3 line-clamp-3 flex-1 text-sm leading-6 text-surface-500">
              {excerpt}
            </p>
          )}
          <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-orange-700">
            {isZh ? '查看详情' : 'Read More'}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
