'use client';

import { CheckCircle, Shield, Truck, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';

interface FeaturesSectionProps {
  isZh?: boolean;
}

const features = [
  { icon: Shield, label: 'ISO 9001 Certified', labelZh: 'ISO 9001 认证' },
  { icon: Zap, label: 'Energy Efficient', labelZh: '节能高效' },
  { icon: Truck, label: 'Global Shipping', labelZh: '全球配送' },
  { icon: CheckCircle, label: '5-Year Warranty', labelZh: '五年质保' },
];

export function FeaturesSection({ isZh = false }: FeaturesSectionProps) {
  return (
    <section className="border-b border-surface-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-y divide-surface-200 border-y border-surface-200 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {features.map((item, index) => (
            <ScrollReveal
              key={item.label}
              delay={index * 0.08}
              className="flex items-center gap-3 px-4 py-5 transition-colors hover:bg-surface-50"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-surface-950 text-orange-300">
                <item.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-surface-800">
                {isZh ? item.labelZh : item.label}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
