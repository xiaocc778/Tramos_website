'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Leaf, Zap, Shield } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';

export default function AboutPage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';

  const stats = [
    { num: '20+', label: isZh ? '年行业经验' : 'Years Experience', en: '20+' },
    { num: '50+', label: isZh ? '出口国家' : 'Countries Exported', en: '50+' },
    { num: '100+', label: isZh ? '企业客户' : 'Enterprise Clients', en: '100+' },
    { num: '500K+', label: isZh ? '年产能（台）' : 'Annual Capacity', en: '500K+' },
  ];

  const values = [
    { icon: Shield, title: isZh ? '品质第一' : 'Quality First', desc: isZh ? '严格的质量控制体系，确保每一台产品都达到国际标准' : 'Rigorous quality control ensures every product meets international standards' },
    { icon: Zap, title: isZh ? '创新驱动' : 'Innovation Driven', desc: isZh ? '持续投入研发，拥有50+项专利技术' : 'Continuously invested in R&D with 50+ patents' },
    { icon: Globe, title: isZh ? '全球视野' : 'Global Vision', desc: isZh ? '产品远销50+个国家和地区，深受国际客户信赖' : 'Products exported to 50+ countries, trusted globally' },
    { icon: Leaf, title: isZh ? '绿色环保' : 'Eco-Friendly', desc: isZh ? '致力于节能减排，推动可持续发展' : 'Committed to energy saving and sustainable development' },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '关于我们' : 'About Us'}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {isZh
                ? '专注热水器研发制造，为全球客户提供可靠的热水解决方案'
                : 'Dedicated to water heater R&D and manufacturing, providing reliable hot water solutions for global customers'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-soft"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">{s.num}</div>
              <div className="text-surface-600 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
              alt="Factory"
              className="rounded-2xl shadow-soft"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold text-surface-900 mb-4">
              {isZh ? '我们的故事' : 'Our Story'}
            </h2>
            <p className="text-surface-600 mb-4 leading-relaxed">
              {isZh
                ? '热能科技成立于2003年，是一家专业从事热水器研发、生产和销售的高新技术企业。公司总部位于广东省佛山市，拥有现代化生产基地和完善的质量管理体系。'
                : 'Founded in 2003, HeatTech is a high-tech enterprise specializing in R&D, production, and sales of water heaters. Our headquarters and modern manufacturing base are located in Foshan, Guangdong.'}
            </p>
            <p className="text-surface-600 mb-4 leading-relaxed">
              {isZh
                ? '20年来，我们始终坚持技术创新和品质优先，产品涵盖燃气热水器、电热水器、太阳能热水器、空气能热泵和商用锅炉等多个品类，广泛应用于家庭、酒店、医院、学校和工业领域。'
                : 'For 20 years, we have adhered to technological innovation and quality priority. Our products cover gas water heaters, electric heaters, solar heaters, heat pumps, and commercial boilers, widely used in homes, hotels, hospitals, schools, and industry.'}
            </p>
            <p className="text-surface-600 leading-relaxed">
              {isZh
                ? '如今，我们的产品已出口到全球50多个国家和地区，与众多国际知名品牌建立了长期合作关系。'
                : 'Today, our products are exported to more than 50 countries and regions worldwide, establishing long-term partnerships with many international brands.'}
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-surface-900 mb-8 text-center">
            {isZh ? '核心价值观' : 'Core Values'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-soft text-center"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-surface-900 mb-2">{v.title}</h3>
                <p className="text-surface-600 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 bg-primary-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '想了解更多？' : 'Want to Know More?'}
          </h2>
          <p className="text-surface-600 mb-6">
            {isZh ? '浏览我们的产品或联系我们的专业团队' : 'Browse our products or contact our professional team'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
                {isZh ? '浏览产品' : 'Browse Products'}
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium border border-primary-200 hover:bg-primary-50 transition-colors">
                {isZh ? '联系我们' : 'Contact Us'}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
