'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Flame, Sun, Thermometer, Zap } from 'lucide-react';
import { SectionHeader, ScrollReveal } from '@/components/shared';
import { featuredModelAssets, imageAssets } from '@/lib/assets';

interface ProductCategorySectionProps {
  isZh?: boolean;
}

const categories = [
  {
    id: 'electric',
    icon: Zap,
    name: 'Electric Instant Heaters',
    nameZh: '即热式电热水器',
    desc: 'Compact wall-mounted heaters for kitchens, apartments, and retrofit projects.',
    descZh: '适合厨房、公寓和改造项目的紧凑型壁挂热水器。',
    image: featuredModelAssets[0].image,
    features: ['Fast heat-up', 'Wall-mounted', 'OEM options'],
  },
  {
    id: 'storage',
    icon: Thermometer,
    name: 'Storage Water Heaters',
    nameZh: '储水式热水器',
    desc: 'Vertical and horizontal tanks with stable temperature control.',
    descZh: '立式与卧式储水方案，提供稳定温控和多容量选择。',
    image: featuredModelAssets[2].image,
    features: ['60-120L', 'Digital control', 'Safety tank'],
  },
  {
    id: 'solar',
    icon: Sun,
    name: 'Solar Hot Water',
    nameZh: '太阳能热水系统',
    desc: 'Roof-mounted systems for residential and light commercial use.',
    descZh: '适用于住宅和轻商用场景的屋顶太阳能热水系统。',
    image: imageAssets.productGeneral.solarHeater,
    features: ['Roof systems', 'Energy saving', 'Long lifespan'],
  },
  {
    id: 'commercial',
    icon: Flame,
    name: 'Commercial Systems',
    nameZh: '商用热水系统',
    desc: 'Boilers and high-capacity systems for hotels, gyms, and factories.',
    descZh: '面向酒店、健身房和工厂的大容量锅炉与热水系统。',
    image: imageAssets.productGeneral.industrialBoiler,
    features: ['Bulk supply', 'Project support', 'Service-ready'],
  },
];

export function ProductCategorySection({ isZh = false }: ProductCategorySectionProps) {
  return (
    <section className="bg-[#f6f3ee] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            title="Product Lines Built From Real Models"
            titleZh="基于真实型号的产品系列"
            subtitle="Replace template imagery with actual heater families, application ranges, and proof points."
            subtitleZh="用真实产品系列、应用范围和制造证据替代模板图片。"
            isZh={isZh}
            className="mb-14"
          />
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.id} delay={index * 0.06}>
              <Link
                href={`/products?category=${cat.id}`}
                className="group grid h-full overflow-hidden rounded-lg border border-surface-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover sm:grid-cols-[0.92fr_1.08fr]"
              >
                <div className="relative min-h-[260px] overflow-hidden bg-surface-100">
                  <Image
                    src={cat.image}
                    alt={isZh ? cat.nameZh : cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 320px, 100vw"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-900 text-white">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-surface-950 transition-colors group-hover:text-orange-600">
                    {isZh ? cat.nameZh : cat.name}
                  </h3>
                  <p className="mb-5 text-sm leading-6 text-surface-600">
                    {isZh ? cat.descZh : cat.desc}
                  </p>
                  <div className="mt-auto space-y-2">
                    {cat.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs font-medium text-surface-600">
                        <CheckCircle className="h-3.5 w-3.5 text-orange-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600">
                    {isZh ? '查看系列' : 'Explore series'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
