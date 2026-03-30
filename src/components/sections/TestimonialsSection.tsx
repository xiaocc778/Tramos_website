'use client';

import { ScrollReveal } from '@/components/shared';

interface TestimonialsSectionProps {
  isZh?: boolean;
}

const testimonials = [
  {
    name: 'John Smith',
    role: 'Operations Manager, ABC Hotels',
    content: 'HeatTech has been an excellent partner for our hotel chain. Their products are reliable and the after-sales support is outstanding.',
    contentZh: '热能科技是我们酒店集团的优秀合作伙伴。他们的产品可靠，售后服务也非常出色。',
  },
  {
    name: 'Sarah Chen',
    role: 'CEO, Green Energy Co',
    content: 'The solar water heaters have significantly reduced our energy costs. A game-changer for our business.',
    contentZh: '太阳能热水器大幅降低了我们的能源成本。这改变了我们的业务。',
  },
  {
    name: 'Michael Brown',
    role: 'Facility Director, Tech University',
    content: "We serve 10,000+ students daily. HeatTech's commercial solutions handle the demand perfectly.",
    contentZh: '我们每天为超过10,000名学生服务。热能科技的商业解决方案完美满足了需求。',
  },
];

export function TestimonialsSection({ isZh = false }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              {isZh ? '客户评价' : 'What Our Customers Say'}
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              {isZh
                ? '来自全球客户的口碑反馈'
                : 'Trusted by customers worldwide'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-soft h-full flex flex-col">
                {/* Quote mark */}
                <svg className="w-8 h-8 text-orange-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
                <p className="text-surface-700 mb-6 flex-1 italic">
                  &ldquo;{isZh ? t.contentZh : t.content}&rdquo;
                </p>
                <div className="border-t border-surface-100 pt-4">
                  <div className="font-semibold text-surface-900">{t.name}</div>
                  <div className="text-sm text-surface-500">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
