'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { Button } from '@/components/ui';

export default function IndustrialPage() {
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

      <div className="bg-gradient-to-r from-surface-800 to-surface-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '工业解决方案' : 'Industrial Solutions'}
            </h1>
            <p className="text-surface-300 text-lg max-w-2xl mx-auto">
              {isZh
                ? '为制造工厂、工业园区和大型设施提供重型热水和蒸汽系统'
                : 'Heavy-duty hot water and steam systems for manufacturing plants and industrial facilities'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt="Industrial" className="rounded-2xl shadow-soft" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold text-surface-900 mb-4">
              {isZh ? '工业级热水系统' : 'Industrial Hot Water Systems'}
            </h2>
            <p className="text-surface-600 mb-6">
              {isZh
                ? '我们的工业级锅炉和热泵系统专为大型工厂、制药企业、食品加工厂等高要求场景设计，提供稳定可靠的高温热水和蒸汽。'
                : 'Our industrial-grade boilers and heat pump systems are designed for large factories, pharmaceutical companies, and food processing plants, providing stable and reliable high-temperature hot water and steam.'}
            </p>
            <ul className="space-y-3 mb-8">
              {[
                isZh ? '蒸汽锅炉：0.5T-20T 多种规格' : 'Steam boilers: 0.5T-20T various specifications',
                isZh ? '热水锅炉：满足大规模供热需求' : 'Hot water boilers: meet large-scale heating needs',
                isZh ? '余热回收系统：降低能耗成本' : 'Waste heat recovery systems: reduce energy costs',
                isZh ? '定制化方案：根据工艺需求设计' : 'Custom solutions: designed for your process needs',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-surface-700">
                  <span className="w-2 h-2 bg-primary-600 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/inquiry">
              <Button>{isZh ? '咨询工业方案' : 'Consult Industrial Solutions'}</Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: isZh ? '食品加工' : 'Food Processing', img: 'https://images.unsplash.com/photo-1574943320219-5ae8890d1b8b?w=400&q=80', desc: isZh ? '满足卫生标准的热水和蒸汽供应' : 'Hot water and steam meeting hygiene standards' },
            { title: isZh ? '制药行业' : 'Pharmaceutical', img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80', desc: isZh ? '精确温度控制和纯蒸汽系统' : 'Precise temperature control and pure steam systems' },
            { title: isZh ? '化工生产' : 'Chemical Industry', img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', desc: isZh ? '耐腐蚀材料和高温高压系统' : 'Corrosion-resistant materials and high-temp systems' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-soft">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-surface-900 mb-1">{item.title}</h3>
                <p className="text-sm text-surface-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
