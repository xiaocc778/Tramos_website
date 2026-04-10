'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  isZh?: boolean;
}

const HERO_SLIDES = [
  {
    src: '/images/products/solar-water-heater.jpg',
    altEn: 'Solar water heater installation',
    altZh: '太阳能热水器安装场景',
  },
  {
    src: '/images/products/wall-water-heater.jpg',
    altEn: 'Wall-mounted gas water heater',
    altZh: '壁挂式燃气热水器',
  },
  {
    src: '/images/products/water-heater-sink.jpg',
    altEn: 'Electric water heater above sink',
    altZh: '水槽上方电热水器',
  },
  {
    src: '/images/products/solar-house-roof.jpg',
    altEn: 'Residential solar hot water system',
    altZh: '住宅太阳能热水系统',
  },
] as const;

const INTERVAL_MS = 5500;

export function HeroSection({ isZh = false }: HeroSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(
      () => setSlideIndex((i) => (i + 1) % HERO_SLIDES.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, [reducedMotion, paused]);

  const goTo = useCallback((i: number) => {
    setSlideIndex(i);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#1B2A4A] via-[#1B3A5A] to-[#1B2A4A] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-sm font-medium mb-6">
              {isZh ? '专业热水器制造商' : 'Professional Water Heater Manufacturer'}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {isZh
                ? '为您的家提供卓越热水解决方案'
                : 'Premium Hot Water Solutions for Your Home'}
            </h1>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              {isZh
                ? '20年行业经验，专注研发高品质热水器产品。燃气、电热、太阳能等多种解决方案，满足全球家庭和商业需求。'
                : '20 years of industry expertise in developing premium water heaters. Gas, electric, and solar solutions for homes and businesses worldwide.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg">
                  {isZh ? '浏览产品' : 'Browse Products'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/inquiry">
                <Button variant="secondary" size="lg">
                  {isZh ? '获取报价' : 'Get Quote'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Hero image carousel (gas / electric / solar narrative) */}
          <div className="relative hidden lg:block">
            <div
              className="relative aspect-square max-w-lg mx-auto"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Decorative shadow layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl transform rotate-3 translate-x-3 translate-y-3 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl transform -rotate-2 translate-x-1 translate-y-1 opacity-80" />
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl aspect-square">
                {HERO_SLIDES.map((slide, i) => (
                  <div
                    key={slide.src}
                    className={cn(
                      'absolute inset-0 transition-opacity duration-700 ease-out',
                      i === slideIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
                    )}
                    aria-hidden={i !== slideIndex}
                  >
                    <Image
                      src={slide.src}
                      alt={isZh ? slide.altZh : slide.altEn}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}
                {/* Dots */}
                <div
                  className="absolute bottom-4 left-0 right-0 z-[2] flex justify-center gap-2"
                  role="tablist"
                  aria-label={isZh ? '轮播图' : 'Hero slides'}
                >
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === slideIndex}
                      aria-label={isZh ? `第 ${i + 1} 张` : `Slide ${i + 1}`}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        i === slideIndex
                          ? 'w-8 bg-white shadow-md'
                          : 'w-2 bg-white/50 hover:bg-white/80'
                      )}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">ISO 9001</div>
                  <div className="text-xs text-gray-400">{isZh ? '认证品质' : 'Certified'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
