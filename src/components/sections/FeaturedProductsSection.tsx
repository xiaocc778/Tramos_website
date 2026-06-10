'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gauge, Ruler, ShieldCheck, Sparkles, ThermometerSun } from 'lucide-react';
import { Button } from '@/components/ui';
import { ScrollReveal } from '@/components/shared';
import { featuredModelAssets } from '@/lib/assets';
import { cn } from '@/lib/utils';

interface FeaturedProductsSectionProps {
  isZh?: boolean;
}

const modelDetails = [
  {
    ...featuredModelAssets[0],
    tagline: 'Compact horizontal heater for apartments, kitchens, and OEM programs.',
    taglineZh: '适合公寓、厨房和 OEM 项目的紧凑型卧式热水器。',
    specs: ['60L capacity', 'Digital display', 'Wall-mounted'],
    specsZh: ['60L 容量', '数字显示', '壁挂安装'],
    fit: 'Home / Apartment',
    fitZh: '家庭 / 公寓',
  },
  {
    ...featuredModelAssets[1],
    tagline: 'Slim instant heater with visible control panel and fast hot water delivery.',
    taglineZh: '纤薄即热机型，配备可视控制面板，快速供应热水。',
    specs: ['Instant heat', '6-8L/min', 'Compact body'],
    specsZh: ['即热供应', '6-8L/min', '紧凑机身'],
    fit: 'Kitchen / Utility',
    fitZh: '厨房 / 小型用水点',
  },
  {
    ...featuredModelAssets[2],
    tagline: 'Vertical storage family for stable daily hot water and apartment projects.',
    taglineZh: '立式储水系列，适合稳定日用热水和公寓项目。',
    specs: ['80-120L', 'Stable supply', 'Digital control'],
    specsZh: ['80-120L', '稳定供水', '数字温控'],
    fit: 'Residential Projects',
    fitZh: '住宅项目',
  },
  {
    ...featuredModelAssets[3],
    tagline: 'Premium safety series for buyers who need custom finish and supply options.',
    taglineZh: '高端安全系列，面向需要外观定制和批量供货的买家。',
    specs: ['Custom finish', 'Safety tank', 'Bulk inquiry'],
    specsZh: ['外观定制', '安全内胆', '批量询盘'],
    fit: 'B2B / OEM',
    fitZh: 'B2B / OEM',
  },
];

export function FeaturedProductsSection({ isZh = false }: FeaturedProductsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const active = modelDetails[activeIndex];
  const activeImage = active.gallery[activeImageIndex] || active.image;

  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              {isZh ? '产品展厅' : 'Interactive showroom'}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-surface-950 sm:text-4xl">
              {isZh ? '用真实型号讲清产品能力' : 'Let real models explain the product range'}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-surface-600 lg:justify-self-end">
            {isZh
              ? '点击不同型号查看对应图片、容量、场景和询盘入口，让首页更像产品展厅，而不是普通商品卡列表。'
              : 'Select a model to see the matching photography, capacity, use case, and inquiry path. It gives the homepage a product showroom rhythm instead of a plain card grid.'}
          </p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <ScrollReveal direction="right">
            <div className="space-y-3">
              {modelDetails.map((model, index) => (
                <button
                  key={model.key}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setActiveImageIndex(0);
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setActiveImageIndex(0);
                  }}
                  className={cn(
                    'group grid w-full grid-cols-[72px_1fr] gap-4 rounded-md border p-3 text-left transition-all duration-300',
                    activeIndex === index
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-surface-200 bg-white hover:border-orange-200 hover:bg-surface-50'
                  )}
                >
                  <span className="relative h-20 overflow-hidden rounded-md bg-surface-100">
                    <Image
                      src={model.image}
                      alt={isZh ? model.titleZh : model.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="72px"
                    />
                  </span>
                  <span className="min-w-0 py-1">
                    <span className="block text-sm font-bold text-surface-950">
                      {isZh ? model.titleZh : model.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-surface-500">
                      {isZh ? model.fitZh : model.fit}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
                      <Sparkles className="h-3.5 w-3.5" />
                      {model.capacity}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="relative overflow-hidden rounded-md bg-surface-950 text-white">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[460px] overflow-hidden bg-surface-900">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt={isZh ? active.titleZh : active.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      priority={activeIndex === 0}
                    />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 flex gap-2 overflow-x-auto bg-gradient-to-t from-black/70 to-transparent p-4">
                    {active.gallery.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={cn(
                          'relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-white/10 transition-colors',
                          activeImageIndex === index ? 'border-orange-300' : 'border-white/25 hover:border-white/60'
                        )}
                        aria-label={`${isZh ? active.titleZh : active.title} ${index + 1}`}
                      >
                        <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col p-7 lg:p-8">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                    {isZh ? active.fitZh : active.fit}
                  </p>
                  <h3 className="mb-4 text-3xl font-bold leading-tight">
                    {isZh ? active.titleZh : active.title}
                  </h3>
                  <p className="mb-7 text-sm leading-7 text-white/72">
                    {isZh ? active.taglineZh : active.tagline}
                  </p>

                  <div className="grid gap-3">
                    {(isZh ? active.specsZh : active.specs).map((spec, index) => {
                      const icons = [ThermometerSun, Gauge, Ruler];
                      const Icon = icons[index] || ShieldCheck;
                      return (
                        <div key={spec} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/8 p-3">
                          <Icon className="h-5 w-5 text-orange-300" />
                          <span className="text-sm font-medium text-white/86">{spec}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <Link href="/inquiry">
                      <Button size="lg">
                        {isZh ? '获取报价' : 'Request Quote'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link
                      href="/products"
                      className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      {isZh ? '查看全部产品' : 'View all products'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
