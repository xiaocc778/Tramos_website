'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useArticles } from '@/hooks';
import { ScrollReveal, ArticleSkeleton } from '@/components/shared';

const typeFilters = [
  { key: 'all', label: 'All', labelZh: '全部' },
  { key: 'case_study', label: 'Case Studies', labelZh: '成功案例' },
  { key: 'news', label: 'News', labelZh: '新闻动态' },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const { data: allArticles = [], isLoading } = useArticles({});

  const filtered = activeFilter === 'all'
    ? allArticles
    : allArticles.filter(a => a.type === activeFilter);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '项目案例' : 'Our Projects'}
            </h1>
            <p className="text-orange-200 text-lg max-w-2xl mx-auto">
              {isZh
                ? '全球各地的成功项目案例，展示我们在不同场景下的热水解决方案'
                : 'Global success stories showcasing our hot water solutions across different scenarios'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {typeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.key
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-surface-600 hover:bg-surface-100'
              }`}
            >
              {isZh ? f.labelZh : f.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <ArticleSkeleton key={i} />)}
          </div>
        )}

        {/* Articles Grid */}
        {!isLoading && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <ScrollReveal key={article.id} delay={i * 0.06}>
                  <Link href={`/projects/${article.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all group h-full flex flex-col">
                      {article.featured_image && (
                        <div className="aspect-video overflow-hidden relative">
                          <Image
                            src={article.featured_image}
                            alt={isZh ? article.title_zh : article.title_en}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        {article.type && (
                          <span className="inline-block text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mb-2 w-fit">
                            {article.type === 'case_study'
                              ? (isZh ? '案例' : 'Case Study')
                              : (isZh ? '新闻' : 'News')}
                          </span>
                        )}
                        <p className="text-xs text-surface-400 mb-2">
                          {new Date(article.published_at ?? article.created_at).toLocaleDateString()}
                        </p>
                        <h3 className="font-bold text-surface-900 group-hover:text-orange-500 transition-colors mb-2 line-clamp-2">
                          {isZh ? article.title_zh : article.title_en}
                        </h3>
                        {article.excerpt_en && (
                          <p className="text-surface-600 text-sm line-clamp-3 mb-3 flex-1">
                            {isZh ? article.excerpt_zh : article.excerpt_en}
                          </p>
                        )}
                        <div className="flex items-center gap-1 text-orange-500 text-sm font-medium mt-auto">
                          {isZh ? '查看详情' : 'Read More'}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-surface-500 text-lg">
                  {isZh ? '暂无内容' : 'No content available'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}