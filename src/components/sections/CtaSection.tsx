'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { ScrollReveal } from '@/components/shared';

interface CtaSectionProps {
  isZh?: boolean;
}

export function CtaSection({ isZh = false }: CtaSectionProps) {
  return (
    <section className="border-t border-surface-800 bg-surface-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <ScrollReveal>
            <p className="mb-4 border-l border-orange-400 pl-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
              {isZh ? '项目询盘' : 'Project inquiry'}
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {isZh ? '需要定制方案？' : 'Need a Custom Solution?'}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/66">
              {isZh
                ? '我们的专业团队可以根据您的具体需求提供定制化的热水解决方案。'
                : 'Our professional team can provide customized hot water solutions tailored to your specific needs.'}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/inquiry">
                <Button size="lg" className="w-full px-8 sm:w-auto">
                  {isZh ? '立即咨询' : 'Contact Us Today'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="secondary" size="lg" className="w-full border-white/25 bg-transparent px-8 text-white hover:border-white hover:bg-white/10 sm:w-auto">
                  {isZh ? '浏览产品' : 'Browse Products'}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
