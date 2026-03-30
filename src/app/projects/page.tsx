'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useArticles } from '@/hooks';

export default function ProjectsPage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const { data: caseStudies = [] } = useArticles({ type: 'case_study' });
  const { data: news = [] } = useArticles({ type: 'news' });

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '项目案例' : 'Our Projects'}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {isZh
                ? '全球各地的成功项目案例，展示我们在不同场景下的热水解决方案'
                : 'Global success stories showcasing our hot water solutions across different scenarios'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-surface-900 mb-8">
          {isZh ? '成功案例' : 'Case Studies'}
        </h2>
        {caseStudies.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/projects/${article.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all group h-full">
                    {article.featured_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.featured_image}
                          alt={isZh ? article.title_zh : article.title_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-surface-900 group-hover:text-primary-600 transition-colors mb-2">
                        {isZh ? article.title_zh : article.title_en}
                      </h3>
                      {article.excerpt_en && (
                        <p className="text-surface-600 text-sm line-clamp-3 mb-4">
                          {isZh ? article.excerpt_zh : article.excerpt_en}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-primary-600 text-sm font-medium">
                        {isZh ? '查看详情' : 'Read More'}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
            <p className="text-surface-500">
              {isZh ? '案例正在整理中...' : 'Case studies coming soon...'}
            </p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-surface-900 mb-8 mt-16">
          {isZh ? '最新动态' : 'Latest News'}
        </h2>
        {news.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blogs/${article.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all group">
                    {article.featured_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.featured_image}
                          alt={isZh ? article.title_zh : article.title_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-surface-400 mb-2">
                        {new Date(article.published_at ?? article.created_at).toLocaleDateString()}
                      </p>
                      <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {isZh ? article.title_zh : article.title_en}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-soft">
            <p className="text-surface-500">
              {isZh ? '新闻动态正在整理中...' : 'News coming soon...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
