'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useArticle } from '@/hooks';
import { Button } from '@/components/ui';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const { data: article, isLoading } = useArticle(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-surface-500">{isZh ? '加载中...' : 'Loading...'}</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '文章未找到' : 'Article Not Found'}
          </h2>
          <Link href="/blogs">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZh ? '返回博客' : 'Back to Blog'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blogs">
            <motion.button whileHover={{ x: -4 }} className="flex items-center gap-2 text-surface-600 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {isZh ? '返回博客' : 'Back to Blog'}
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {article.featured_image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-soft">
              <img
                src={article.featured_image}
                alt={isZh ? article.title_zh : article.title_en}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            {isZh ? article.title_zh : article.title_en}
          </h1>

          <div className="flex items-center gap-4 text-surface-400 text-sm mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.published_at ?? article.created_at).toLocaleDateString()}
            </div>
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <div className="text-surface-700 leading-relaxed whitespace-pre-wrap text-lg">
              {isZh ? article.content_zh : article.content_en}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 text-center">
          <Link href="/blogs">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZh ? '返回博客列表' : 'Back to Blog List'}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
