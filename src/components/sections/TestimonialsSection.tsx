'use client';

import { CheckCircle, PackageCheck, ShieldCheck, Wrench } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';

interface TestimonialsSectionProps {
  isZh?: boolean;
}

const buyerConcerns = [
  {
    icon: ShieldCheck,
    title: 'Certification Fit',
    titleZh: '认证适配',
    content:
      'We help buyers confirm the certification route, destination-market requirements, and documents needed before bulk production.',
    contentZh: '协助采购商在批量生产前确认认证路径、目的地市场要求和所需资料。',
  },
  {
    icon: PackageCheck,
    title: 'Bulk Order Consistency',
    titleZh: '批量一致性',
    content:
      'Product configuration, packaging, voltage, and spare parts can be aligned before sampling to reduce order risk.',
    contentZh: '在打样阶段确认产品配置、包装、电压和备件，降低批量订单风险。',
  },
  {
    icon: Wrench,
    title: 'Project Support',
    titleZh: '项目支持',
    content:
      'For hotels, apartments, and facilities, we match product families to water demand, installation conditions, and maintenance access.',
    contentZh: '针对酒店、公寓和设施项目，按用水需求、安装条件和维护便利性匹配产品系列。',
  },
];

export function TestimonialsSection({ isZh = false }: TestimonialsSectionProps) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="mb-4 border-l border-orange-500 pl-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
              {isZh ? '采购关注点' : 'Buyer concerns'}
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-surface-950 sm:text-4xl">
              {isZh ? '我们解决的采购顾虑' : 'Buyer Concerns We Solve'}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-surface-600 lg:justify-self-end">
            {isZh
              ? '如果没有真实客户授权评价，就用更可核验的采购问题来建立信任。'
              : 'Instead of unverified testimonials, we show the practical issues global buyers need solved.'}
          </p>
        </ScrollReveal>

        <div className="divide-y divide-surface-200 border-y border-surface-200">
          {buyerConcerns.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <div className="grid gap-5 py-7 transition-colors hover:bg-surface-50 sm:grid-cols-[44px_0.8fr_1.2fr_auto] sm:items-center sm:px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-950 text-orange-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-surface-950">{isZh ? item.titleZh : item.title}</h3>
                <p className="text-sm leading-6 text-surface-600">{isZh ? item.contentZh : item.content}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
                  <CheckCircle className="h-4 w-4" />
                  {isZh ? '询盘前可确认' : 'Confirm before ordering'}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
