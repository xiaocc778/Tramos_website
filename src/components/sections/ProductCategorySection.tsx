'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Flame, Sun, ThermometerSun, Zap } from 'lucide-react';
import { SectionHeader, ScrollReveal } from '@/components/shared';
import { imageAssets } from '@/lib/assets';

interface ProductCategorySectionProps {
  isZh?: boolean;
}

const categories = [
  {
    id: 'electric',
    icon: Zap,
    name: 'Electric Water Heaters',
    nameZh: '电热水器',
    desc: 'Compact instant and storage models for apartments, kitchens, and distributor programs.',
    descZh: '覆盖即热与储水机型，适合公寓、厨房和经销项目。',
    image: imageAssets.productModels.product5[0],
    range: '30-100L / instant options',
    fit: 'Residential, retail, OEM',
  },
  {
    id: 'gas',
    icon: Flame,
    name: 'Gas Water Heaters',
    nameZh: '燃气热水器',
    desc: 'Wall-mounted gas models for fast hot water supply and regional market customization.',
    descZh: '壁挂式燃气机型，支持快速热水供应与区域市场定制。',
    image: imageAssets.productModels.product1[0],
    range: '10-16L/min',
    fit: 'Homes, apartments, distributors',
  },
  {
    id: 'solar',
    icon: Sun,
    name: 'Solar Water Heaters',
    nameZh: '太阳能热水系统',
    desc: 'Roof-mounted solar systems for energy-saving residential and light commercial projects.',
    descZh: '屋顶太阳能系统，面向节能住宅与轻商用项目。',
    image: imageAssets.productGeneral.solarHeater,
    range: '150-300L systems',
    fit: 'Residential, villa, project supply',
  },
  {
    id: 'heat-pump',
    icon: ThermometerSun,
    name: 'Heat Pump Water Heaters',
    nameZh: '空气能热泵热水器',
    desc: 'Energy-efficient hot water systems for markets with higher efficiency requirements.',
    descZh: '面向高能效要求市场的节能热水系统。',
    image: imageAssets.productModels.product9[0],
    range: '80-150L matching',
    fit: 'Homes, hotels, project tenders',
  },
  {
    id: 'commercial',
    icon: Building2,
    name: 'Commercial Systems',
    nameZh: '商用热水系统',
    desc: 'Higher-capacity heating solutions for hotels, factories, gyms, and building projects.',
    descZh: '面向酒店、工厂、健身房和建筑项目的大容量热水方案。',
    image: imageAssets.productModels.product10[0],
    range: 'Project-based supply',
    fit: 'Hotel, factory, commercial facility',
  },
];

export function ProductCategorySection({ isZh = false }: ProductCategorySectionProps) {
  return (
    <section className="border-y border-surface-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            title="Product Families for Export and Project Supply"
            titleZh="面向出口与工程采购的产品系列"
            subtitle="Browse real product families by energy source, installation type, and application scenario."
            subtitleZh="按能源类型、安装方式和应用场景快速查看真实产品系列。"
            isZh={isZh}
            className="mb-12"
          />
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <ScrollReveal direction="right">
            <div className="relative overflow-hidden rounded-md border border-surface-200 bg-surface-100">
              <div className="relative aspect-[4/5] min-h-[420px]">
                <Image
                  src={imageAssets.productModels.product1[0]}
                  alt={isZh ? 'Tramos 产品目录入口' : 'Tramos product catalogue entry'}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/82 via-surface-950/14 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                    {isZh ? '真实型号目录' : 'Real model catalogue'}
                  </p>
                  <h3 className="max-w-sm text-2xl font-bold leading-tight">
                    {isZh ? '从产品系列直接进入询盘路径' : 'Move from product family to inquiry faster'}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/72">
                    {isZh
                      ? '减少抽象宣传语，把容量、应用和采购入口放在同一层级。'
                      : 'Capacity, application, and quote actions stay visible for procurement review.'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-surface-200 border-y border-surface-200">
            {categories.map((cat, index) => (
              <ScrollReveal key={cat.id} delay={index * 0.05}>
                <Link
                  href={`/products?category=${cat.id}`}
                  className="group grid gap-4 py-5 transition-colors hover:bg-surface-50 sm:grid-cols-[116px_1fr_auto] sm:items-center sm:px-4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface-100">
                    <Image
                      src={cat.image}
                      alt={isZh ? cat.nameZh : cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="116px"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-950 text-white">
                        <cat.icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-xl font-bold text-surface-950 transition-colors group-hover:text-orange-600">
                        {isZh ? cat.nameZh : cat.name}
                      </h3>
                    </div>
                    <p className="max-w-2xl text-sm leading-6 text-surface-600">
                      {isZh ? cat.descZh : cat.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-surface-600">
                      <span className="rounded-md bg-surface-100 px-2.5 py-1">{cat.range}</span>
                      <span className="rounded-md bg-surface-100 px-2.5 py-1">{cat.fit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 sm:justify-self-end">
                    {isZh ? '查看系列' : 'Explore'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
