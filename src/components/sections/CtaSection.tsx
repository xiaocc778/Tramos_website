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
    <section className="py-24 bg-gradient-to-r from-[#1B2A4A] to-orange-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {isZh ? '需要定制方案？' : 'Need a Custom Solution?'}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-orange-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '我们的专业团队可以根据您的具体需求提供定制化的热水解决方案。'
              : 'Our professional team can provide customized hot water solutions tailored to your specific needs.'}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inquiry">
              <Button variant="secondary" size="lg" className="bg-white text-[#1B2A4A] hover:bg-orange-50 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto btn-shimmer">
                {isZh ? '立即咨询' : 'Contact Us Today'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="ghost" size="lg" className="text-white border border-white/30 hover:bg-white/10 text-lg px-10 py-4 w-full sm:w-auto">
                {isZh ? '浏览产品' : 'Browse Products'}
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
