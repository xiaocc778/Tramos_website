'use client';

import { useState, useEffect, useRef } from 'react';
import { SectionHeader, ScrollReveal } from '@/components/shared';

interface StatsSectionProps {
  isZh?: boolean;
}

const stats = [
  { value: 20, suffix: '+', label: 'Years Experience', labelZh: '年行业经验' },
  { value: 50, suffix: '+', label: 'Countries Served', labelZh: '服务国家' },
  { value: 100, suffix: 'K+', label: 'Happy Customers', labelZh: '满意客户' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', labelZh: '满意度' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
    </div>
  );
}

export function StatsSection({ isZh = false }: StatsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1B2A4A] to-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12">
          <SectionHeader
            title="Trusted by Customers Worldwide"
            titleZh="全球客户信赖之选"
            subtitle="Our track record speaks for itself"
            subtitleZh="用实力说话，品质见证"
            isZh={isZh}
            light
          />
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-orange-200 font-medium mt-2">
                {isZh ? stat.labelZh : stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
