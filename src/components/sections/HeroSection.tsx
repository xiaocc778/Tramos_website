'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Factory, ShieldCheck, Wrench } from 'lucide-react';
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
    labelZh: '制造经验',
  },
  {
    icon: ShieldCheck,
    value: '6',
    label: 'Patent-backed systems',
    labelZh: '专利技术',
  },
  {
    icon: Wrench,
    value: 'B2B',
    label: 'OEM and bulk inquiry',
    labelZh: '定制与批量询盘',
  },
];

export function HeroSection({ isZh = false }: HeroSectionProps) {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-surface-950 text-white">
      <Image
        src={imageAssets.company.reception}
        alt={isZh ? '公司前台与品牌墙' : 'Company reception and brand wall'}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,9,0.88)_0%,rgba(12,10,9,0.68)_42%,rgba(12,10,9,0.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-surface-950 to-transparent" />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl flex-col justify-end px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pb-10">
        <div className="max-w-3xl pb-10">
          <div className="mb-7 inline-flex rounded-xl bg-white/94 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur">
            <Image
              src="/images/logo/3.png"
              alt="Tramos"
              width={300}
              height={75}
              priority
              className="h-14 w-auto object-contain sm:h-16 lg:h-[72px]"
            />
          </div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-orange-300">
            {isZh ? '真实制造商 · 热水系统 · 全球供应' : 'Real manufacturer · hot water systems · global supply'}
          </p>
          <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {isZh
              ? '把真实工厂、产品细节和热水方案放到台前'
              : 'Manufacturer-built water heating systems with visible proof'}
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            {isZh
              ? '从家用速热到商用热水系统，网站将围绕真实产品图、工厂素材、资质背书和询盘转化来呈现，而不是停留在模板式展示。'
              : 'From compact home heaters to commercial hot water systems, the site now leads with real product photography, factory evidence, certifications, and a stronger inquiry path.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products">
              <Button size="lg">
                {isZh ? '查看产品系列' : 'View Product Lines'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button variant="secondary" size="lg">
                {isZh ? '提交批量询盘' : 'Request Bulk Quote'}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/18 pt-6 lg:grid-cols-[1.2fr_2fr] lg:items-end">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {proofPoints.map((item) => (
              <div key={item.label} className="border-l border-white/20 pl-3">
                <item.icon className="mb-3 h-5 w-5 text-orange-300" />
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="mt-1 text-xs leading-5 text-white/68">
                  {isZh ? item.labelZh : item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-4">
            {featuredModelAssets.map((model) => (
              <Link
                key={model.key}
                href="/products"
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/14 bg-white/10"
              >
                <Image
                  src={model.image}
                  alt={isZh ? model.titleZh : model.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 220px, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-sm font-semibold leading-5">{isZh ? model.titleZh : model.title}</div>
                  <div className="mt-1 text-xs text-orange-200">{model.capacity}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
