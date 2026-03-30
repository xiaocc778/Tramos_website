'use client';

import { Shield, Zap, Truck, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';

interface FeaturesSectionProps {
  isZh?: boolean;
}

const features = [
  { icon: Shield, label: 'ISO 9001 Certified', labelZh: 'ISO 9001认证' },
  { icon: Zap, label: 'Energy Efficient', labelZh: '节能高效' },
  { icon: Truck, label: 'Global Shipping', labelZh: '全球配送' },
  { icon: CheckCircle, label: '5-Year Warranty', labelZh: '五年质保' },
];

export function FeaturesSection({ isZh = false }: FeaturesSectionProps) {
  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 0.08} className="flex items-center gap-3 p-4 rounded-xl hover:bg-surface-50 transition-colors">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-surface-700">
                {isZh ? item.labelZh : item.label}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
