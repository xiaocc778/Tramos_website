'use client';

import { useUIStore } from '@/lib/ui-store';
import {
  HeroSection,
  FeaturesSection,
  ProductCategorySection,
  StatsSection,
  FeaturedProductsSection,
  SolutionsSection,
  CaseStudiesSection,
  TestimonialsSection,
  CtaSection,
} from '@/components/sections';

export default function HomePage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';

  return (
    <div>
      <HeroSection isZh={isZh} />
      <FeaturesSection isZh={isZh} />
      <ProductCategorySection isZh={isZh} />
      <StatsSection isZh={isZh} />
      <FeaturedProductsSection isZh={isZh} />
      <SolutionsSection isZh={isZh} />
      <CaseStudiesSection isZh={isZh} />
      <TestimonialsSection isZh={isZh} />
      <CtaSection isZh={isZh} />
    </div>
  );
}
