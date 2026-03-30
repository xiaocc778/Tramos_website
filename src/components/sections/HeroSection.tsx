'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

interface HeroSectionProps {
  isZh?: boolean;
}

export function HeroSection({ isZh = false }: HeroSectionProps) {
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

          {/* Right: Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative shadow layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl transform rotate-3 translate-x-3 translate-y-3 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl transform -rotate-2 translate-x-1 translate-y-1 opacity-80" />
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop"
                  alt="Premium Water Heater"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                  unoptimized
                />
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
                  <div className="text-sm font-semibold text-white">ISO 9001</div>
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
