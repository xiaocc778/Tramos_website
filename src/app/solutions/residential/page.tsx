'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { Button } from '@/components/ui';

export default function ResidentialPage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/solutions">
            <motion.button whileHover={{ x: -4 }} className="flex items-center gap-2 text-surface-600 hover:text-primary-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {isZh ? '返回解决方案' : 'Back to Solutions'}
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '住宅解决方案' : 'Residential Solutions'}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {isZh
                ? '为您的家提供安全、可靠、节能的热水解决方案'
                : 'Safe, reliable, and energy-efficient hot water solutions for your home'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Residential water heating"
              className="rounded-2xl shadow-soft"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold text-surface-900 mb-4">
              {isZh ? '为什么选择家用热水器？' : 'Why Choose Our Home Water Heaters?'}
            </h2>
            <ul className="space-y-4">
              {[
                isZh ? '即热式技术，打开就有热水' : 'Instant heating — hot water on demand',
                isZh ? '多重安全保护，安心使用' : 'Multi-layer safety protection for peace of mind',
                isZh ? '节能省电，降低家庭开支' : 'Energy-efficient design reduces household bills',
                isZh ? '安装便捷，适用于各种户型' : 'Easy installation for all home types',
                isZh ? '智能控温，舒适体验' : 'Smart temperature control for comfort',
                isZh ? '5年质保，售后无忧' : '5-year warranty for worry-free service',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-surface-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/products?category=gas">
                <Button size="lg">{isZh ? '浏览家用产品' : 'Browse Home Products'}</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-surface-900 mb-8 text-center">
          {isZh ? '家用产品分类' : 'Home Product Categories'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { slug: 'gas', name: 'Gas Water Heaters', nameZh: '燃气热水器', desc: 'Instant hot water, compact design', descZh: '即热式，紧凑设计', img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
            { slug: 'electric', name: 'Electric Heaters', nameZh: '电热水器', desc: 'Safe and easy to install', descZh: '安全，安装简便', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80' },
            { slug: 'solar', name: 'Solar Water Heaters', nameZh: '太阳能热水器', desc: 'Eco-friendly, cost-saving', descZh: '环保节能', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&q=80' },
            { slug: 'heat-pump', name: 'Heat Pumps', nameZh: '空气能热泵', desc: 'Smart control, ultra-efficient', descZh: '智能控制，超高能效', img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80' },
          ].map((cat) => (
            <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.img} alt={isZh ? cat.nameZh : cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors mb-1">
                    {isZh ? cat.nameZh : cat.name}
                  </h3>
                  <p className="text-sm text-surface-500">{isZh ? cat.descZh : cat.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '需要定制方案？' : 'Need a Custom Solution?'}
          </h2>
          <p className="text-surface-600 mb-6">
            {isZh
              ? '我们的专业团队可以根据您的家庭情况提供最适合的热水方案'
              : 'Our professional team can provide the most suitable hot water solution based on your home'}
          </p>
          <Link href="/inquiry">
            <Button>{isZh ? '立即询价' : 'Get a Quote Now'}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
