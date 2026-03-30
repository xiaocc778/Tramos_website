'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, Building2, Factory } from 'lucide-react';
import { SectionHeader, ScrollReveal } from '@/components/shared';

interface SolutionsSectionProps {
  isZh?: boolean;
}

const solutions = [
  {
    key: 'residential',
    icon: Home,
    title: 'Residential',
    titleZh: '住宅',
    desc: 'Compact, safe, energy-efficient water heaters for homes and apartments.',
    descZh: '紧凑、安全、节能的家用热水器，适用于家庭和公寓。',
    image: '/images/lifestyle/modern-kitchen.jpg',
  },
  {
    key: 'commercial',
    icon: Building2,
    title: 'Commercial',
    titleZh: '商业',
    desc: 'High-capacity systems for hotels, gyms, hospitals, and office buildings.',
    descZh: '适用于酒店、健身房、医院和办公大楼的高容量系统。',
    image: '/images/lifestyle/hotel-lobby.jpg',
  },
  {
    key: 'industrial',
    icon: Factory,
    title: 'Industrial',
    titleZh: '工业',
    desc: 'Heavy-duty boilers and heat pump systems for manufacturing plants.',
    descZh: '适用于制造工厂的重型锅炉和热泵系统。',
    image: '/images/lifestyle/factory-machinery.jpg',
  },
];

export function SolutionsSection({ isZh = false }: SolutionsSectionProps) {
  return (
    <section className="py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16">
          <SectionHeader
            title="Industry Solutions"
            titleZh="行业解决方案"
            subtitle="Tailored hot water solutions for every application"
            subtitleZh="为各类应用场景量身定制的热水解决方案"
            isZh={isZh}
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol, index) => (
            <ScrollReveal key={sol.key} delay={index * 0.1}>
              <Link href={`/solutions#${sol.key}`} className="group block h-full">
                <div className="relative rounded-2xl overflow-hidden h-full min-h-[340px]">
                  <Image
                    src={sol.image}
                    alt={isZh ? sol.titleZh : sol.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                      <sol.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {isZh ? sol.titleZh : sol.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      {isZh ? sol.descZh : sol.desc}
                    </p>
                    <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
                      {isZh ? '了解更多' : 'Learn More'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
