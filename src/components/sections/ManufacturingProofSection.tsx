'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Building2, Factory, FileCheck2 } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';
import { imageAssets } from '@/lib/assets';

interface ManufacturingProofSectionProps {
  isZh?: boolean;
}

const proofItems = [
  {
    icon: Building2,
    label: 'Company presence',
    labelZh: '真实公司场景',
    text: 'Reception and brand wall imagery anchors the site in a real manufacturer.',
    textZh: '用公司前台与品牌墙素材建立真实制造商印象。',
  },
  {
    icon: Factory,
    label: 'Production evidence',
    labelZh: '生产制造证据',
    text: 'Factory photography supports project buyers evaluating supply capability.',
    textZh: '工厂实拍支撑项目买家对供货能力的判断。',
  },
  {
    icon: FileCheck2,
    label: 'Certificates and catalogs',
    labelZh: '资质与资料',
    text: 'Qualification sheets become trust assets instead of hidden file dumps.',
    textZh: '资质页作为信任资产展示，而不是散落的文件素材。',
  },
];

export function ManufacturingProofSection({ isZh = false }: ManufacturingProofSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <ScrollReveal direction="right">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                {isZh ? '制造商背书' : 'Manufacturer proof'}
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-surface-950 sm:text-4xl">
                {isZh ? '让买家看到产品背后的公司与产线' : 'Show the company behind the heater, not just the heater'}
              </h2>
              <p className="mb-8 max-w-2xl text-base leading-7 text-surface-600">
                {isZh
                  ? '现有素材里最有价值的是“真实感”：公司、工厂、资质和产品细节。首页需要把这些证据串起来，帮助访客从浏览转向询盘。'
                  : 'The strongest asset in the current library is authenticity: company space, production scenes, certifications, and close product details. This section turns those into a buying signal.'}
              </p>

              <div className="space-y-5">
                {proofItems.map((item) => (
                  <div key={item.label} className="grid grid-cols-[44px_1fr] gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-950 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-950">{isZh ? item.labelZh : item.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-surface-600">{isZh ? item.textZh : item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                {isZh ? '查看公司实力' : 'View company capability'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-lg bg-surface-100">
                <Image
                  src={imageAssets.lifestyle.factoryProduction}
                  alt={isZh ? '生产现场' : 'Factory production scene'}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-white/90 px-3 py-2 text-xs font-semibold text-surface-900">
                  <BadgeCheck className="h-4 w-4 text-orange-600" />
                  {isZh ? '生产能力' : 'Production capability'}
                </div>
              </div>
              {[imageAssets.company.introduction, imageAssets.company.qualificationA].map((src, index) => (
                <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-surface-200 bg-surface-100">
                  <Image
                    src={src}
                    alt={index === 0 ? (isZh ? '公司介绍资料' : 'Company introduction sheet') : (isZh ? '资质证书' : 'Qualification sheet')}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 270px, 50vw"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
