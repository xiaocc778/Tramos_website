'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Leaf, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui';
import { imageAssets } from '@/lib/assets';
import { useUIStore } from '@/lib/ui-store';

const stats = [
  { num: '20+', label: 'Years Experience', labelZh: '年制造经验' },
  { num: '50+', label: 'Export Markets', labelZh: '出口市场' },
  { num: '100+', label: 'B2B Customers', labelZh: 'B2B 客户' },
  { num: '500K+', label: 'Annual Capacity', labelZh: '年产能' },
];

const values = [
  {
    icon: Shield,
    title: 'Quality First',
    titleZh: '质量优先',
    desc: 'Incoming inspection, production checks, and final testing help keep product quality consistent across bulk orders.',
    descZh: '通过来料检验、过程巡检和出厂测试，保障批量订单的品质稳定。',
  },
  {
    icon: Zap,
    title: 'Practical R&D',
    titleZh: '实用研发',
    desc: 'We focus on safer heating structures, easier installation, energy efficiency, and market-ready OEM/ODM adaptation.',
    descZh: '聚焦安全结构、安装便利性、能效优化，以及适合目标市场的 OEM/ODM 适配。',
  },
  {
    icon: Globe,
    title: 'Export Mindset',
    titleZh: '出口协同',
    desc: 'Our team supports buyers with certifications, packaging, documentation, and destination-market requirements.',
    descZh: '协助采购商处理认证、包装、资料和目的地市场要求。',
  },
  {
    icon: Leaf,
    title: 'Efficient Heating',
    titleZh: '高效节能',
    desc: 'Electric, gas, solar, heat pump, and commercial systems can be matched to different budgets and energy conditions.',
    descZh: '电、燃气、太阳能、热泵与商用系统可按预算、能源条件和场景灵活匹配。',
  },
];

export default function AboutPage() {
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-4xl font-bold text-white">
              {isZh ? '关于 Tramos' : 'About Tramos'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-orange-200">
              {isZh
                ? '专注热水器与商用热水系统制造，为全球采购商提供稳定供货、项目配套与 OEM/ODM 支持。'
                : 'Focused on water heater and commercial hot water system manufacturing, with stable supply, project support, and OEM/ODM service for global buyers.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white p-6 text-center shadow-soft"
            >
              <div className="mb-2 text-3xl font-bold text-orange-500 lg:text-4xl">{s.num}</div>
              <div className="text-sm text-surface-600">{isZh ? s.labelZh : s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
              <Image
                src={imageAssets.lifestyle.factoryProduction}
                alt={isZh ? 'Tramos 工厂生产场景' : 'Tramos factory production scene'}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="mb-4 text-3xl font-bold text-surface-900">
              {isZh ? '制造商，而不是模板卖场' : 'A Manufacturer, Not a Template Storefront'}
            </h2>
            <p className="mb-4 leading-relaxed text-surface-600">
              {isZh
                ? 'Tramos 面向经销商、工程采购商、酒店公寓项目与品牌客户，提供电热水器、燃气热水器、太阳能热水系统、空气能热泵和商用热水系统。'
                : 'Tramos serves distributors, project buyers, hotels, apartment operators, and brand partners with electric water heaters, gas water heaters, solar systems, heat pumps, and commercial hot water systems.'}
            </p>
            <p className="mb-4 leading-relaxed text-surface-600">
              {isZh
                ? '我们更关注采购商真正需要核验的内容：产品系列是否完整、规格是否可落地、认证资料是否可配合、交期是否可控、售后资料是否清晰。'
                : 'We focus on the proof global buyers need: complete product families, practical specifications, certification support, controlled lead times, and clear after-sales documentation.'}
            </p>
            <p className="leading-relaxed text-surface-600">
              {isZh
                ? '如果您需要批量采购、渠道合作或项目方案，Tramos 可以按容量、功率、电压、包装、认证和目的地市场进行适配。'
                : 'For bulk sourcing, distribution, or project supply, Tramos can adapt capacity, power, voltage, packaging, certification, and destination-market requirements.'}
            </p>
          </motion.div>
        </div>

        <motion.div id="certifications" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-surface-900">
            {isZh ? '采购商关注的能力' : 'Capabilities Buyers Care About'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-white p-6 text-center shadow-soft"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                  <v.icon className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="mb-2 font-bold text-surface-900">{isZh ? v.titleZh : v.title}</h3>
                <p className="text-sm text-surface-600">{isZh ? v.descZh : v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-orange-50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-surface-900">
            {isZh ? '需要确认产品或项目方案？' : 'Need to Confirm a Product or Project Plan?'}
          </h2>
          <p className="mb-6 text-surface-600">
            {isZh
              ? '把容量、电压、应用场景、认证和目的地国家发给我们，销售团队会在 24 小时内回复。'
              : 'Share capacity, voltage, application, certification, and destination country. Our sales team will respond within 24 hours.'}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/products">
              <Button variant="secondary" size="lg">{isZh ? '浏览产品' : 'Browse Products'}</Button>
            </Link>
            <Link href="/inquiry">
              <Button size="lg">{isZh ? '提交询盘' : 'Request Quote'}</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
