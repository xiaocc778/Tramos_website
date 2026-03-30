'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Home, Factory, Users } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useArticles } from '@/hooks';
import { useCategories } from '@/hooks';

const solutionCards = [
  {
    key: 'residential',
    icon: Home,
    title: 'Residential Solutions',
    titleZh: '住宅解决方案',
    desc: 'Compact, safe, energy-efficient water heaters for homes and apartments.',
    descZh: '紧凑、安全、节能的家用热水器，适用于家庭和公寓。',
    href: '/solutions/residential',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    key: 'commercial',
    icon: Building2,
    title: 'Commercial Solutions',
    titleZh: '商业解决方案',
    desc: 'High-capacity systems for hotels, gyms, hospitals, and office buildings.',
    descZh: '适用于酒店、健身房、医院和办公大楼的高容量系统。',
    href: '/solutions/commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    key: 'industrial',
    icon: Factory,
    title: 'Industrial Solutions',
    titleZh: '工业解决方案',
    desc: 'Heavy-duty boilers and heat pump systems for manufacturing plants.',
    descZh: '适用于制造工厂的重型锅炉和热泵系统。',
    href: '/solutions/industrial',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
  {
    key: 'b2b',
    icon: Users,
    title: 'B2B Partnership',
    titleZh: 'B2B 合作',
    desc: 'OEM/ODM services, distributor programs, and long-term partnership plans.',
    descZh: 'OEM/ODM 服务、经销商计划及长期合作伙伴方案。',
    href: '/solutions/b2b',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  },
];

export default function SolutionsPage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const { data: allArticles = [] } = useArticles({ type: 'case_study' });
  const articles = allArticles.slice(0, 3);
  const { data: categories = [] } = useCategories();

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '解决方案' : 'Solutions'}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {isZh
                ? '为住宅、商业和工业场景量身定制的热水解决方案'
                : 'Tailored hot water solutions for residential, commercial, and industrial applications'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutionCards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={card.href}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all group h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={isZh ? card.titleZh : card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                      <card.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-bold text-surface-900 mb-2">
                      {isZh ? card.titleZh : card.title}
                    </h3>
                    <p className="text-surface-600 text-sm flex-1">
                      {isZh ? card.descZh : card.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white rounded-2xl shadow-soft p-8"
        >
          <h2 className="text-2xl font-bold text-surface-900 mb-6 text-center">
            {isZh ? '行业分类' : 'Browse by Category'}
          </h2>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="text-center p-4 rounded-xl border border-surface-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <p className="font-medium text-surface-900">
                  {isZh ? cat.name_zh : cat.name_en}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>

        {articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-surface-900 mb-6">
              {isZh ? '成功案例' : 'Case Studies'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <Link href={`/projects/${article.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all group">
                      {article.featured_image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={article.featured_image}
                            alt={isZh ? article.title_zh : article.title_en}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">
                          {isZh ? article.title_zh : article.title_en}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
