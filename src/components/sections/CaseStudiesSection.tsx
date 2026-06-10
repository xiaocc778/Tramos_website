'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard, ArticleSkeleton, ScrollReveal } from '@/components/shared';
import { useArticles } from '@/hooks';

interface CaseStudiesSectionProps {
  isZh?: boolean;
}

export function CaseStudiesSection({ isZh = false }: CaseStudiesSectionProps) {
  const { data: caseStudies = [], isLoading } = useArticles({ type: 'case_study' });
  const display = caseStudies.slice(0, 3);

  return (
    <section className="bg-surface-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 border-l border-orange-500 pl-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
              {isZh ? '项目案例' : 'Project references'}
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-surface-950 sm:text-4xl">
              {isZh ? '项目与应用参考' : 'Case Studies'}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-surface-600">
              {isZh ? '展示热水系统在真实应用中的供应方式。' : 'Real-world projects showcasing our solutions.'}
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition-colors hover:text-orange-800"
          >
            {isZh ? '查看全部案例' : 'View All Cases'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <ArticleSkeleton key={i} />)
            : display.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 0.08}>
                  <ArticleCard article={article} isZh={isZh} />
                </ScrollReveal>
              ))}
        </div>

        {!isLoading && display.length === 0 && (
          <div className="border-y border-surface-200 py-16 text-center text-surface-500">
            {isZh ? '案例正在整理中...' : 'Case studies coming soon...'}
          </div>
        )}
      </div>
    </section>
  );
}
