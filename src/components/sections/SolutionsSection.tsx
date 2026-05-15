'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Factory, Home, Hotel } from 'lucide-react';
import { SectionHeader, ScrollReveal } from '@/components/shared';
import { imageAssets } from '@/lib/assets';

interface SolutionsSectionProps {
  isZh?: boolean;
}

const solutions = [
  {
    key: 'residential',
    icon: Home,
    title: 'Residential Bathrooms',
    titleZh: '家庭浴室',
    desc: 'Compact wall-mounted and storage heaters for apartments and renovation projects.',
    descZh: '适合公寓和改造项目的壁挂式、储水式热水器。',
    image: imageAssets.lifestyle.shower,
    product: 'Instant / storage heaters',
  },
  {
    key: 'kitchen',
    icon: Building2,
    title: 'Kitchen and Utility',
    titleZh: '厨房与小型用水点',
    desc: 'Fast hot water for sinks, utility rooms, and compact service areas.',
    descZh: '为水槽、工具间和小型服务区提供快速热水。',
    image: imageAssets.lifestyle.kitchen,
    product: 'Compact electric models',
  },
  {
    key: 'hotel',
    icon: Hotel,
    title: 'Hotels and Apartments',
    titleZh: '酒店与公寓',
    desc: 'Stable supply plans for guest rooms, shared facilities, and bulk replacement.',
    descZh: '面向客房、公共设施和批量替换项目的稳定供水方案。',
    image: imageAssets.lifestyle.hotel,
    product: 'Storage / commercial systems',
  },
  {
    key: 'industrial',
    icon: Factory,
    title: 'Industrial Projects',
    titleZh: '工业项目',
    desc: 'Higher-capacity boilers and project support for manufacturing environments.',
    descZh: '面向制造场景的大容量锅炉和项目支持。',
    image: imageAssets.lifestyle.factoryProduction,
    product: 'Boilers / heat systems',
  },
];

export function SolutionsSection({ isZh = false }: SolutionsSectionProps) {
  return (
    <section className="bg-surface-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-14">
          <SectionHeader
            title="Application Scenes With Product Context"
            titleZh="带产品语境的应用场景"
            subtitle="Scene images work harder when they point to a product family and an inquiry path."
            subtitleZh="场景图要对应产品系列和询盘路径，才不是装饰图。"
            isZh={isZh}
          />
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((sol, index) => (
            <ScrollReveal key={sol.key} delay={index * 0.06}>
              <Link href={`/solutions#${sol.key}`} className="group block h-full">
                <div className="relative h-full min-h-[420px] overflow-hidden rounded-lg">
                  <Image
                    src={sol.image}
                    alt={isZh ? sol.titleZh : sol.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/32 to-black/6" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/16 text-white backdrop-blur-sm">
                      <sol.icon className="h-5 w-5" />
                    </div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                      {sol.product}
                    </p>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {isZh ? sol.titleZh : sol.title}
                    </h3>
                    <p className="mb-4 text-sm leading-6 text-white/76">
                      {isZh ? sol.descZh : sol.desc}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-white">
                      {isZh ? '匹配方案' : 'Match solution'}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
