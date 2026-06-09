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
    <section className="bg-surface-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-surface-900 sm:text-4xl">
              {isZh ? '我们解决的采购顾虑' : 'Buyer Concerns We Solve'}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-surface-600">
              {isZh
                ? '如果没有真实客户授权评价，就用更可核验的采购问题来建立信任。'
                : 'Instead of unverified testimonials, we show the practical issues global buyers need solved.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {buyerConcerns.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                  <item.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-surface-900">{isZh ? item.titleZh : item.title}</h3>
                <p className="flex-1 text-sm leading-6 text-surface-600">
                  {isZh ? item.contentZh : item.content}
                </p>
                <div className="mt-6 flex items-center gap-2 border-t border-surface-100 pt-4 text-sm font-medium text-orange-600">
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
