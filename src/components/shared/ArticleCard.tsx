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
      <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 h-full flex flex-col">
        {imageUrl && (
          <div className="aspect-video overflow-hidden relative bg-surface-100">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized={imageUrl.startsWith('http')}
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          {showDate && dateStr && (
            <p className="text-xs text-surface-400 mb-2">
              {new Date(dateStr).toLocaleDateString()}
            </p>
          )}
          <h3 className="font-semibold text-surface-900 group-hover:text-orange-500 transition-colors mb-2 line-clamp-2">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-surface-500 line-clamp-3 flex-1 mb-3">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-1 text-orange-500 text-sm font-medium mt-auto">
            {isZh ? '查看详情' : 'Read More'}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
