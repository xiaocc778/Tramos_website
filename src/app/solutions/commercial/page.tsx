'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { Button } from '@/components/ui';

export default function CommercialPage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';

  const features = [
    { title: isZh ? '酒店行业' : 'Hotels', desc: isZh ? '大流量热水，24小时供应，满足客房和餐饮需求' : 'High-flow hot water, 24/7 supply for guest rooms and kitchens', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80' },
    { title: isZh ? '健身会所' : 'Gyms & Fitness', desc: isZh ? '满足淋浴和设施清洁的大量热水需求' : 'Meet high-volume hot water needs for showers and facilities', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80' },
    { title: isZh ? '医院医疗' : 'Hospitals', desc: isZh ? '严格的温度控制和卫生标准，保障医疗热水安全' : 'Strict temperature control and hygiene standards', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80' },
    { title: isZh ? '学校教育' : 'Schools & Universities', desc: isZh ? '集中供热系统，满足大量学生同时使用热水的需求' : 'Centralized heating for large student populations', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80' },
  ];

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

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '商业解决方案' : 'Commercial Solutions'}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              {isZh
                ? '为酒店、健身房、医院、写字楼等商业场所提供可靠的热水系统'
                : 'Reliable hot water systems for hotels, gyms, hospitals, and office buildings'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-soft h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-surface-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-surface-600">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-soft p-8 mb-16">
          <h2 className="text-2xl font-bold text-surface-900 mb-6 text-center">
            {isZh ? '商业热水系统优势' : 'Commercial Hot Water System Advantages'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: '01', title: isZh ? '大流量供水' : 'High Flow Rate', desc: isZh ? '专为商业场景设计，支持多点同时使用' : 'Designed for commercial use, supports multiple simultaneous outlets' },
              { num: '02', title: isZh ? '智能控制系统' : 'Smart Control System', desc: isZh ? '远程监控和智能调度，降低运营成本' : 'Remote monitoring and smart scheduling reduces operating costs' },
              { num: '03', title: isZh ? '稳定可靠' : 'Stable & Reliable', desc: isZh ? '工业级品质，确保持续不间断的热水供应' : 'Industrial-grade quality ensures uninterrupted hot water supply' },
            ].map((item) => (
              <div key={item.num} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-3">{item.num}</div>
                <h3 className="font-semibold text-surface-900 mb-2">{item.title}</h3>
                <p className="text-surface-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <Link href="/inquiry">
            <Button size="lg">{isZh ? '获取商业方案报价' : 'Get Commercial Quote'}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
