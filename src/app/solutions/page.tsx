'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, Users, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useArticles } from '@/hooks';
import { ScrollReveal } from '@/components/shared';

const tabs = [
  { key: 'residential', label: 'Residential', labelZh: '住宅', icon: Home },
  { key: 'commercial', label: 'Commercial', labelZh: '商业', icon: Building2 },
  { key: 'industrial', label: 'Industrial', labelZh: '工业', icon: Factory },
  { key: 'b2b', label: 'B2B Partnership', labelZh: 'B2B合作', icon: Users },
];

const solutions: Record<string, {
  title: string;
  titleZh: string;
  desc: string;
  descZh: string;
  image: string;
  features: { icon: string; label: string; labelZh: string }[];
  products: { label: string; labelZh: string; href: string }[];
  cta: { label: string; labelZh: string };
}> = {
  residential: {
    title: 'Residential Solutions',
    titleZh: '住宅解决方案',
    desc: 'Compact, safe, and energy-efficient water heaters designed for modern homes and apartments. From instant gas heaters to smart heat pumps, we have the perfect solution for every household.',
    descZh: '紧凑、安全、节能的热水器，专为现代家庭和公寓设计。从即时燃气热水器到智能热泵，我们为每个家庭提供完美的解决方案。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    features: [
      { icon: '⚡', label: 'Instant Heating', labelZh: '即时加热' },
      { icon: '🛡️', label: 'Multi-Point Protection', labelZh: '多点防护' },
      { icon: '🔇', label: 'Ultra-Quiet Operation', labelZh: '超静音运行' },
      { icon: '📱', label: 'Smart App Control', labelZh: 'APP智能控制' },
    ],
    products: [
      { label: 'Gas Water Heaters', labelZh: '燃气热水器', href: '/products?category=gas' },
      { label: 'Electric Water Heaters', labelZh: '电热水器', href: '/products?category=electric' },
      { label: 'Solar Water Heaters', labelZh: '太阳能热水器', href: '/products?category=solar' },
      { label: 'Heat Pump Water Heaters', labelZh: '空气能热泵', href: '/products?category=heat-pump' },
    ],
    cta: { label: 'Request a Quote', labelZh: '申请报价' },
  },
  commercial: {
    title: 'Commercial Solutions',
    titleZh: '商业解决方案',
    desc: 'High-capacity water heating systems engineered for hotels, hospitals, gyms, schools, and office buildings. Built for reliability and efficiency under heavy-demand conditions.',
    descZh: '专为酒店、医院、健身房、学校和办公大楼设计的高容量热水系统。在高需求条件下打造可靠高效的热水供应。',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop',
    features: [
      { icon: '🏨', label: 'Hotels & Resorts', labelZh: '酒店度假村' },
      { icon: '🏥', label: 'Hospitals & Clinics', labelZh: '医院诊所' },
      { icon: '🏋️', label: 'Gyms & Spas', labelZh: '健身房水疗' },
      { icon: '🏫', label: 'Schools & Universities', labelZh: '学校大学' },
    ],
    products: [
      { label: 'Commercial Gas Heaters', labelZh: '商用燃气热水器', href: '/products?category=gas' },
      { label: 'Commercial Electric Heaters', labelZh: '商用蓄热式电热水器', href: '/products?category=electric' },
      { label: 'Large Solar Systems', labelZh: '大型太阳能热水系统', href: '/products?category=solar' },
      { label: 'Commercial Heat Pumps', labelZh: '商用空气能热泵', href: '/products?category=heat-pump' },
    ],
    cta: { label: 'Get Custom Solution', labelZh: '获取定制方案' },
  },
  industrial: {
    title: 'Industrial Solutions',
    titleZh: '工业解决方案',
    desc: 'Heavy-duty boilers, steam systems, and industrial-grade heat pumps for manufacturing, food processing, pharmaceuticals, and chemical industries. Engineered for continuous operation.',
    descZh: '专为制造、食品加工、制药和化工行业设计的重型锅炉、蒸汽系统和工业级热泵。为连续运行而打造。',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
    features: [
      { icon: '🏭', label: 'Manufacturing Plants', labelZh: '生产工厂' },
      { icon: '💊', label: 'Pharmaceutical Industry', labelZh: '制药行业' },
      { icon: '🍽️', label: 'Food Processing', labelZh: '食品加工' },
      { icon: '⚗️', label: 'Chemical Industry', labelZh: '化工行业' },
    ],
    products: [
      { label: 'Industrial Boilers', labelZh: '工业锅炉', href: '/products?category=boiler' },
      { label: 'Steam Generators', labelZh: '蒸汽发生器', href: '/products?category=boiler' },
      { label: 'Industrial Heat Pumps', labelZh: '工业热泵', href: '/products?category=heat-pump' },
      { label: 'Process Heating', labelZh: '工艺加热系统', href: '/products?category=boiler' },
    ],
    cta: { label: 'Consult Our Engineers', labelZh: '咨询工程师' },
  },
  b2b: {
    title: 'B2B Partnership Program',
    titleZh: 'B2B合作伙伴计划',
    desc: 'Join our global network of distributors and partners. We offer OEM/ODM manufacturing, exclusive territory rights, marketing support, and dedicated technical teams.',
    descZh: '加入我们的全球经销商和合作伙伴网络。我们提供OEM/ODM制造、独家区域权、营销支持和专属技术支持团队。',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop',
    features: [
      { icon: '🔧', label: 'OEM / ODM Manufacturing', labelZh: 'OEM/ODM制造' },
      { icon: '🌍', label: 'Exclusive Territory Rights', labelZh: '独家区域权' },
      { icon: '📢', label: 'Marketing Support', labelZh: '营销支持' },
      { icon: '👨‍🔧', label: 'Dedicated Technical Team', labelZh: '专属技术团队' },
    ],
    products: [
      { label: 'Become a Distributor', labelZh: '成为经销商', href: '/inquiry' },
      { label: 'OEM/ODM Inquiry', labelZh: 'OEM/ODM询价', href: '/inquiry' },
      { label: 'Project Cooperation', labelZh: '项目合作', href: '/inquiry' },
      { label: 'View Case Studies', labelZh: '查看案例', href: '/projects' },
    ],
    cta: { label: 'Apply for Partnership', labelZh: '申请合作' },
  },
};

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('residential');
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const { data: caseStudies = [] } = useArticles({ type: 'case_study' });
  const active = solutions[activeTab];

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '解决方案' : 'Solutions'}
            </h1>
            <p className="text-orange-200 text-lg max-w-2xl mx-auto">
              {isZh
                ? '为住宅、商业和工业场景量身定制的热水解决方案'
                : 'Tailored hot water solutions for residential, commercial, and industrial applications'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-16 lg:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-surface-500 hover:text-surface-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {isZh ? tab.labelZh : tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden mb-12 relative h-64 sm:h-80 lg:h-96">
            <Image
              src={active.image}
              alt={isZh ? active.titleZh : active.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {isZh ? active.titleZh : active.title}
                </h2>
                <p className="text-white/80 leading-relaxed hidden sm:block">
                  {isZh ? active.descZh : active.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Features */}
            <div className="lg:col-span-2 space-y-8">
              {/* Application Areas */}
              <ScrollReveal>
                <h3 className="text-xl font-bold text-surface-900 mb-6">
                  {isZh ? '适用场景' : 'Application Areas'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {active.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-soft">
                      <span className="text-2xl">{f.icon}</span>
                      <span className="font-medium text-surface-800">
                        {isZh ? f.labelZh : f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={0.1}>
                <p className="text-surface-600 leading-relaxed">
                  {isZh ? active.descZh : active.desc}
                </p>
              </ScrollReveal>
            </div>

            {/* Right: Products & CTA */}
            <div className="space-y-6">
              <ScrollReveal>
                <h3 className="text-xl font-bold text-surface-900 mb-4">
                  {isZh ? '相关产品' : 'Related Products'}
                </h3>
                <div className="space-y-2">
                  {active.products.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      className="flex items-center justify-between p-3 bg-white rounded-xl shadow-soft hover:shadow-soft-hover hover:bg-primary-50 transition-all group"
                    >
                      <span className="text-surface-800 text-sm font-medium">
                        {isZh ? p.labelZh : p.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-surface-400 group-hover:text-orange-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Link href="/inquiry">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
                  >
                    {isZh ? active.cta.labelZh : active.cta.label}
                  </motion.button>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </motion.div>

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-surface-900 mb-8 text-center">
              {isZh ? '成功案例' : 'Case Studies'}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.slice(0, 3).map((article) => (
                <Link key={article.id} href={`/projects/${article.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all group">
                    {article.featured_image && (
                      <div className="aspect-video overflow-hidden relative">
                        <Image
                          src={article.featured_image}
                          alt={isZh ? article.title_zh : article.title_en}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h4 className="font-semibold text-surface-900 group-hover:text-orange-500 transition-colors">
                        {isZh ? article.title_zh : article.title_en}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
