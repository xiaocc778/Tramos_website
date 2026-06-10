'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Factory, Home, Hotel } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';
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
  const lead = solutions[0];
  const secondary = solutions.slice(1);

  return (
    <section className="bg-surface-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 max-w-3xl">
          <p className="mb-4 border-l border-orange-500 pl-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
            {isZh ? '应用场景' : 'Application scenes'}
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-surface-950 sm:text-4xl">
            {isZh ? '让场景图片对应产品和采购路径' : 'Application context with a clear product path'}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-surface-600">
            {isZh
              ? '场景图需要指向产品系列和询盘路径，才不是装饰图。'
              : 'Scene images work harder when they point to a product family and an inquiry path.'}
          </p>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <ScrollReveal direction="right">
            <Link href={`/solutions#${lead.key}`} className="group block">
              <div className="relative min-h-[520px] overflow-hidden rounded-md bg-surface-900">
                <Image
                  src={lead.image}
                  alt={isZh ? lead.titleZh : lead.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 max-w-xl p-6 text-white sm:p-8">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white">
                    <lead.icon className="h-5 w-5" />
                  </div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                    {lead.product}
                  </p>
                  <h3 className="mb-3 text-3xl font-semibold tracking-tight">{isZh ? lead.titleZh : lead.title}</h3>
                  <p className="text-sm leading-6 text-white/76">{isZh ? lead.descZh : lead.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    {isZh ? '匹配方案' : 'Match solution'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <div className="grid gap-4">
            {secondary.map((sol, index) => (
              <ScrollReveal key={sol.key} delay={index * 0.06} direction="left">
                <Link href={`/solutions#${sol.key}`} className="group grid min-h-[160px] grid-cols-[132px_1fr] overflow-hidden rounded-md border border-surface-200 bg-white transition-colors hover:border-surface-400 sm:grid-cols-[180px_1fr]">
                  <div className="relative overflow-hidden bg-surface-100">
                    <Image
                      src={sol.image}
                      alt={isZh ? sol.titleZh : sol.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="180px"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-950 text-orange-300">
                        <sol.icon className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">{sol.product}</p>
                    </div>
                    <h3 className="text-lg font-semibold text-surface-950">{isZh ? sol.titleZh : sol.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-surface-600">{isZh ? sol.descZh : sol.desc}</p>
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
