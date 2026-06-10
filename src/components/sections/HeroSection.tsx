'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Factory, Globe2, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui';
import { featuredModelAssets, imageAssets } from '@/lib/assets';

interface HeroSectionProps {
  isZh?: boolean;
}

const proofPoints = [
  {
    icon: Factory,
    value: '20+',
    label: 'Years manufacturing',
    labelZh: '20+ 年制造经验',
  },
  {
    icon: Globe2,
    value: '50+',
    label: 'Export markets',
    labelZh: '50+ 出口市场',
  },
  {
    icon: PackageCheck,
    value: 'OEM',
    label: 'Bulk and private-label support',
    labelZh: '批量与贴牌支持',
  },
];

export function HeroSection({ isZh = false }: HeroSectionProps) {
  return (
    <section className="relative min-h-[700px] overflow-hidden bg-surface-950 text-white lg:min-h-[760px]">
      <Image
        src={imageAssets.company.reception}
        alt={isZh ? 'Tramos 工厂接待区与品牌墙' : 'Tramos factory reception and brand wall'}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,9,0.84)_0%,rgba(12,10,9,0.6)_43%,rgba(12,10,9,0.16)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-surface-950 to-transparent" />

      <div className="relative mx-auto flex min-h-[700px] max-w-7xl flex-col justify-end px-4 pb-8 pt-24 sm:px-6 lg:min-h-[760px] lg:px-8 lg:pb-12">
        <div className="max-w-3xl pb-12">
          <p className="mb-5 max-w-xl border-l border-orange-400/70 pl-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-200 sm:text-sm">
            {isZh ? '真实工厂 · 产品系列 · 出口供货' : 'Factory proof · Product families · Export-ready supply'}
          </p>
          <h1 className="mb-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
            {isZh ? '让采购商看得见的热水器制造能力' : 'Water heating products buyers can verify'}
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            {isZh
              ? '用真实产品、工厂资料和出口规格，服务经销、工程与 OEM/ODM 采购。'
              : 'Real product images, factory proof, and export-ready specifications for distributors, projects, and OEM buyers.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products">
              <Button size="lg">
                {isZh ? '查看产品' : 'View Products'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button variant="secondary" size="lg">
                {isZh ? '获取报价' : 'Request Quote'}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 border-t border-white/14 pt-6 lg:grid-cols-[1fr_1.7fr] lg:items-end">
          <div className="grid grid-cols-3 gap-3">
            {proofPoints.map((item) => (
              <div key={item.label} className="border-l border-white/20 pl-3">
                <item.icon className="mb-3 h-4 w-4 text-orange-300" />
                <div className="text-xl font-semibold sm:text-2xl">{item.value}</div>
                <div className="mt-1 text-xs leading-5 text-white/68">
                  {isZh ? item.labelZh : item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden sm:block">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
              {isZh ? '主推产品系列' : 'Featured product families'}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {featuredModelAssets.map((model) => (
                <Link
                  key={model.key}
                  href="/products"
                  className="group relative aspect-[16/9] overflow-hidden rounded-md border border-white/12 bg-white/8"
                >
                  <Image
                    src={model.image}
                    alt={isZh ? model.titleZh : model.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 220px, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/8 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-sm font-semibold leading-5">{isZh ? model.titleZh : model.title}</div>
                    <div className="mt-1 text-xs text-orange-200">{model.capacity}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
