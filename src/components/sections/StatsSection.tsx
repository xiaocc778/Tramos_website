'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SectionHeader, ScrollReveal } from '@/components/shared';
import { imageAssets } from '@/lib/assets';

interface StatsSectionProps {
  isZh?: boolean;
}

const stats = [
  { value: 20, suffix: '+', label: 'Years in heating equipment', labelZh: '年热水设备经验' },
  { value: 6, suffix: '', label: 'Patent-backed systems', labelZh: '项专利技术背书' },
  { value: 4, suffix: '', label: 'Core product families', labelZh: '大核心产品系列' },
  { value: 2, suffix: '', label: 'B2B and B2C channels', labelZh: '类业务渠道' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = window.setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        window.clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => window.clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-4xl font-bold text-white sm:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export function StatsSection({ isZh = false }: StatsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-surface-950 py-20">
      <Image
        src={imageAssets.lifestyle.factoryMachinery}
        alt={isZh ? '工厂设备背景' : 'Factory machinery background'}
        fill
        className="object-cover opacity-30"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-surface-950/74" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12">
          <SectionHeader
            title="Operational Signals Buyers Can Verify"
            titleZh="买家可以验证的经营信号"
            subtitle="Use real factory, product, and certification assets as proof points across the site."
            subtitleZh="用真实工厂、产品和资质素材支撑网站可信度。"
            isZh={isZh}
            light
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.06}>
              <div className="min-h-[160px] bg-surface-950/58 p-6">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm font-medium leading-6 text-white/72">
                  {isZh ? stat.labelZh : stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
