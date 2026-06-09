'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Factory, Hotel, PackageCheck } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';
import { Button } from '@/components/ui';
import { imageAssets } from '@/lib/assets';
import { useUIStore } from '@/lib/ui-store';

const projectReferences = [
  {
    icon: Hotel,
    title: 'Hotel Hot Water System',
    titleZh: '酒店热水系统',
    image: imageAssets.lifestyle.hotel,
    scene: 'Application Reference: mid-size hotel and guest-room hot water supply.',
    sceneZh: '应用参考：中型酒店客房与公共区域热水供应。',
    need: 'Stable hot water during morning and evening peak periods, with easy maintenance access.',
    needZh: '早晚高峰稳定供水，并且便于维护检修。',
    system: 'Commercial central hot water system with storage buffer and gas/electric backup options.',
    systemZh: '商用集中热水系统，搭配储水缓冲与燃气/电辅热备选方案。',
    result: 'More predictable supply planning, clearer installation zones, and a scalable product list for phased procurement.',
    resultZh: '供水规划更可控，安装分区更清晰，可支持分阶段采购。',
    product: 'Commercial Systems',
    href: '/products?category=commercial',
  },
  {
    icon: Building2,
    title: 'Apartment Residential Supply',
    titleZh: '公寓住宅供水',
    image: imageAssets.lifestyle.office,
    scene: 'Application Reference: apartment units, rental housing, and compact bathrooms.',
    sceneZh: '应用参考：公寓单元、租赁住宅与紧凑浴室。',
    need: 'Reliable unit-level hot water with compact installation, manageable cost, and simple replacement.',
    needZh: '单户稳定供水，安装紧凑，成本可控，后续更换方便。',
    system: 'Electric storage heaters and selected instant gas models matched by unit type and local energy supply.',
    systemZh: '按户型和当地能源条件匹配储水电热水器与部分即热燃气机型。',
    result: 'Standardized model selection, simpler stocking for property managers, and clearer after-sales parts planning.',
    resultZh: '型号标准化，方便物业备货，并利于售后备件规划。',
    product: 'Electric Water Heaters',
    href: '/products?category=electric',
  },
  {
    icon: Factory,
    title: 'Factory / Commercial Heating Project',
    titleZh: '工厂 / 商用加热项目',
    image: imageAssets.lifestyle.factoryProduction,
    scene: 'Application Reference: factories, facilities, workshops, and staff shower rooms.',
    sceneZh: '应用参考：工厂、设施、车间和员工淋浴间。',
    need: 'Large-volume, durable supply with practical installation support and equipment access.',
    needZh: '大水量、耐用供水，并兼顾安装支持和设备检修空间。',
    system: 'Commercial hot water system or heat pump configuration selected by load, ambient temperature, and energy cost.',
    systemZh: '根据负载、环境温度和能源成本选择商用热水系统或热泵配置。',
    result: 'Better energy matching, more organized equipment layout, and a quote structure suitable for procurement review.',
    resultZh: '能源匹配更合理，设备布局更有序，报价结构更适合采购评审。',
    product: 'Heat Pump / Commercial Systems',
    href: '/products?category=heat-pump',
  },
];

export default function ProjectsPage() {
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-4xl font-bold text-white">
              {isZh ? '项目与应用参考' : 'Projects & Application References'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-orange-200">
              {isZh
                ? '没有真实客户授权时，我们使用应用参考来展示 Tramos 如何为不同采购场景匹配产品和系统。'
                : 'When client names are not authorized, application references show how Tramos matches products and systems to buyer scenarios.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white">Application Reference</span>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-surface-600">Hotel</span>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-surface-600">Apartment</span>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-surface-600">Commercial</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projectReferences.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all hover:shadow-soft-hover">
                <div className="relative aspect-video bg-surface-100">
                  <Image
                    src={project.image}
                    alt={isZh ? project.titleZh : project.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-orange-700">
                    <project.icon className="h-4 w-4" />
                    Application Reference
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mb-3 text-xl font-bold text-surface-900">{isZh ? project.titleZh : project.title}</h2>
                  <div className="mb-5 space-y-3 text-sm leading-6 text-surface-600">
                    <p><strong className="text-surface-900">{isZh ? '场景：' : 'Scene: '}</strong>{isZh ? project.sceneZh : project.scene}</p>
                    <p><strong className="text-surface-900">{isZh ? '客户需求：' : 'Buyer Need: '}</strong>{isZh ? project.needZh : project.need}</p>
                    <p><strong className="text-surface-900">{isZh ? '推荐系统：' : 'Recommended System: '}</strong>{isZh ? project.systemZh : project.system}</p>
                    <p><strong className="text-surface-900">{isZh ? '交付结果：' : 'Result: '}</strong>{isZh ? project.resultZh : project.result}</p>
                  </div>
                  <div className="mt-auto rounded-xl bg-surface-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-surface-900">
                      <PackageCheck className="h-4 w-4 text-orange-500" />
                      {isZh ? '相关产品' : 'Related Product'}: {project.product}
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                      <Link href={project.href} className="inline-flex flex-1 items-center justify-center rounded-lg border border-orange-500 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50">
                        {isZh ? '查看产品' : 'View Products'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                      <Link href={`/inquiry?product=${encodeURIComponent(project.title)}`} className="inline-flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-medium text-white hover:from-orange-600 hover:to-amber-600">
                        {isZh ? '咨询方案' : 'Inquiry CTA'}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-orange-50 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-surface-900">
            {isZh ? '需要按您的项目重新选型？' : 'Need System Matching for Your Project?'}
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-surface-600">
            {isZh
              ? '发送项目类型、房间数或用水点、每日用水量、能源条件和目的地国家，我们会协助匹配产品和报价。'
              : 'Send project type, room count or water points, daily demand, energy conditions, and destination country. We will help match products and quote.'}
          </p>
          <Link href="/inquiry">
            <Button size="lg">{isZh ? '提交项目询盘' : 'Request Project Quote'}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
