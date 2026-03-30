'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useArticle } from '@/hooks';
import { Button } from '@/components/ui';

export default function ProjectDetailPage() {
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
            {isZh ? '案例未找到' : 'Project Not Found'}
          </h2>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZh ? '返回项目列表' : 'Back to Projects'}
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
          <Link href="/projects">
            <motion.button whileHover={{ x: -4 }} className="flex items-center gap-2 text-surface-600 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {isZh ? '返回项目列表' : 'Back to Projects'}
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <p className="text-surface-400 text-sm mb-8">
            {new Date(article.published_at ?? article.created_at).toLocaleDateString()}
          </p>
          <div className="prose prose-lg max-w-none">
            <div
              className="text-surface-700 leading-relaxed whitespace-pre-wrap"
            >
              {isZh ? article.content_zh : article.content_en}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
