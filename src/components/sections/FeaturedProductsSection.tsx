'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader, ScrollReveal, ProductCard } from '@/components/shared';
import { useProducts } from '@/hooks';
import { ProductSkeleton } from '@/components/shared';

interface FeaturedProductsSectionProps {
  isZh?: boolean;
}

export function FeaturedProductsSection({ isZh = false }: FeaturedProductsSectionProps) {
  const { data: products = [], isLoading } = useProducts({});

  const displayProducts = products.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeader
            title="Featured Products"
            titleZh="精选产品"
            subtitle="Explore our best-selling water heating solutions"
            subtitleZh="浏览我们最畅销的热水解决方案"
            isZh={isZh}
            centered={false}
            className="!text-left"
          />
          <Link
            href="/products"
            className="flex items-center gap-2 text-orange-500 font-medium hover:text-orange-600 transition-colors flex-shrink-0"
          >
            {isZh ? '查看全部产品' : 'View All Products'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            : displayProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 0.06}>
                  <ProductCard product={product} isZh={isZh} />
                </ScrollReveal>
              ))
          }
        </div>

        {!isLoading && displayProducts.length === 0 && (
          <div className="text-center py-16 text-surface-500">
            {isZh ? '暂无产品' : 'No products available'}
          </div>
        )}
      </div>
    </section>
  );
}
