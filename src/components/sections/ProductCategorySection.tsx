'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Flame, Zap, Sun, Wind } from 'lucide-react';
import { SectionHeader, ScrollReveal } from '@/components/shared';

interface ProductCategorySectionProps {
  isZh?: boolean;
}

const categories = [
  {
    id: 'gas',
    icon: Flame,
    name: 'Gas Water Heaters',
    nameZh: '燃气热水器',
    desc: 'Instant hot water with advanced safety features',
    descZh: '先进安全功能的即时热水',
    color: 'from-orange-500 to-red-500',
    image: '/images/products/wall-water-heater.jpg',
    features: ['Instant Heating', 'Smart Control', 'Safety Lock'],
  },
  {
    id: 'electric',
    icon: Zap,
    name: 'Electric Heaters',
    nameZh: '电热水器',
    desc: 'Compact and efficient for any space',
    descZh: '紧凑高效，适合任何空间',
    color: 'from-blue-500 to-cyan-500',
    image: '/images/products/water-heater-sink.jpg',
    features: ['Energy Saving', 'Quick Install', 'Quiet Operation'],
  },
  {
    id: 'solar',
    icon: Sun,
    name: 'Solar Heaters',
    nameZh: '太阳能热水器',
    desc: 'Eco-friendly with free energy',
    descZh: '环保节能，免费能源',
    color: 'from-yellow-500 to-amber-500',
    image: '/images/products/solar-house-roof.jpg',
    features: ['Zero Cost', 'Environmental', 'Long Lifespan'],
  },
  {
    id: 'heat-pump',
    icon: Wind,
    name: 'Heat Pumps',
    nameZh: '空气能热泵',
    desc: 'Smart temperature control technology',
    descZh: '智能温控技术',
    color: 'from-green-500 to-emerald-500',
    image: '/images/products/solar-panel-rooftop.jpg',
    features: ['AI Control', 'High Efficiency', 'All Weather'],
  },
];

export function ProductCategorySection({ isZh = false }: ProductCategorySectionProps) {
  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            title="Product Categories"
            titleZh="产品分类"
            subtitle="Comprehensive water heating solutions for every need"
            subtitleZh="全面的热水器解决方案，满足不同场景需求"
            isZh={isZh}
            className="mb-16"
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.id} delay={index * 0.08}>
              <Link href={`/products?category=${cat.id}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={isZh ? cat.nameZh : cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color}`} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-orange-500 transition-colors">
                      {isZh ? cat.nameZh : cat.name}
                    </h3>
                    <p className="text-sm text-surface-600 mb-4 flex-1">
                      {isZh ? cat.descZh : cat.desc}
                    </p>
                    <div className="space-y-1">
                      {cat.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-surface-500">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
