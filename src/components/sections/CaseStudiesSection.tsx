'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader, ScrollReveal, ArticleCard } from '@/components/shared';
import { useArticles } from '@/hooks';
import { ArticleSkeleton } from '@/components/shared';

interface CaseStudiesSectionProps {
  isZh?: boolean;
}

export function CaseStudiesSection({ isZh = false }: CaseStudiesSectionProps) {
  const { data: caseStudies = [], isLoading } = useArticles({ type: 'case_study' });
  const display = caseStudies.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeader
            title="Case Studies"
            titleZh="成功案例"
            subtitle="Real-world projects showcasing our solutions"
            subtitleZh="展示我们解决方案的真实项目"
            isZh={isZh}
            centered={false}
            className="!text-left"
          />
          <Link
            href="/projects"
            className="flex items-center gap-2 text-orange-500 font-medium hover:text-orange-600 transition-colors flex-shrink-0"
          >
            {isZh ? '查看全部案例' : 'View All Cases'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <ArticleSkeleton key={i} />)
            : display.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 0.08}>
                  <ArticleCard article={article} isZh={isZh} />
                </ScrollReveal>
              ))
          }
        </div>

        {!isLoading && display.length === 0 && (
          <div className="text-center py-16 text-surface-500">
            {isZh ? '案例正在整理中...' : 'Case studies coming soon...'}
          </div>
        )}
      </div>
    </section>
  );
}
