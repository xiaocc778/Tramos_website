'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui';
import { useUIStore } from '@/lib/ui-store';

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    titleZh: '卓越品质',
    desc: 'ISO 9001 certified manufacturing',
    descZh: 'ISO 9001认证生产',
  },
  {
    icon: Zap,
    title: 'Energy Efficient',
    titleZh: '节能高效',
    desc: 'Up to 40% energy savings',
    descZh: '最高节能40%',
  },
  {
    icon: Truck,
    title: 'Global Shipping',
    titleZh: '全球配送',
    desc: 'Fast delivery to 50+ countries',
    descZh: '快速配送至50+国家',
  },
  {
    icon: CheckCircle,
    title: '5-Year Warranty',
    titleZh: '五年质保',
    desc: 'Comprehensive warranty coverage',
    descZh: '全面质保服务',
  },
];

const featuredProducts = [
  {
    id: '1',
    name: 'Smart Gas Water Heater',
    nameZh: '智能燃气热水器',
    price: 599,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop',
    category: 'gas',
  },
  {
    id: '2',
    name: 'Solar Thermal System',
    nameZh: '太阳能热水系统',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
    category: 'solar',
  },
  {
    id: '3',
    name: 'Commercial Boiler',
    nameZh: '商用锅炉',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    category: 'boiler',
  },
  {
    id: '4',
    name: 'Heat Pump System',
    nameZh: '空气能热泵',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1631545806609-8da5563e6a5d?w=600&h=400&fit=crop',
    category: 'heat-pump',
  },
];

export default function HomePage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-surface-50 via-white to-primary-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                {isZh ? '专业热水器制造商' : 'Professional Water Heater Manufacturer'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 leading-tight mb-6">
                {isZh ? '为您的家提供' : 'Premium Hot Water'}
                <span className="text-primary-600 block mt-2">
                  {isZh ? '卓越热水解决方案' : 'Solutions for Your Home'}
                </span>
              </h1>
              <p className="text-lg text-surface-600 mb-8 max-w-lg">
                {isZh
                  ? '20年行业经验，专注研发高品质热水器产品。提供燃气、电热、太阳能等多种解决方案，满足全球家庭和商业需求。'
                  : '20 years of industry expertise in developing premium water heaters. Offering gas, electric, and solar solutions for homes and businesses worldwide.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="group">
                    {isZh ? '浏览产品' : 'Browse Products'}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/inquiry">
                  <Button variant="secondary" size="lg">
                    {isZh ? '获取报价' : 'Get Quote'}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl transform rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=800&fit=crop"
                  alt="Premium Water Heater"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-surface-50 hover:bg-surface-100 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-xl mb-4">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">
                  {isZh ? feature.titleZh : feature.title}
                </h3>
                <p className="text-surface-600">
                  {isZh ? feature.descZh : feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              {isZh ? '热门产品' : 'Featured Products'}
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              {isZh
                ? '精选高品质热水器产品，满足不同场景需求'
                : 'Curated selection of premium water heaters for every need'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={isZh ? product.nameZh : product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {isZh ? product.nameZh : product.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary-600">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="secondary" size="lg">
                {isZh ? '查看全部产品' : 'View All Products'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {isZh ? '需要定制方案？' : 'Need a Custom Solution?'}
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              {isZh
                ? '我们的专业团队可以根据您的具体需求提供定制化的热水解决方案。'
                : 'Our professional team can provide customized hot water solutions tailored to your specific needs.'}
            </p>
            <Link href="/inquiry">
              <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                {isZh ? '立即咨询' : 'Contact Us Today'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
