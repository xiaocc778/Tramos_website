'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Package, TrendingUp, Shield, Headphones, Award } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { Button } from '@/components/ui';

export default function B2BPage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';

  const benefits = [
    { icon: TrendingUp, title: isZh ? '竞争优势' : 'Competitive Edge', desc: isZh ? '出厂价供货，支持品牌定制' : 'Factory-direct pricing, brand customization' },
    { icon: Shield, title: isZh ? '质量保障' : 'Quality Assurance', desc: isZh ? 'ISO9001认证，原厂质保' : 'ISO9001 certified, factory warranty' },
    { icon: Headphones, title: isZh ? '专属支持' : 'Dedicated Support', desc: isZh ? '专属客户经理，7×24小时服务' : 'Dedicated account manager, 7×24 support' },
    { icon: Package, title: isZh ? '灵活供货' : 'Flexible Supply', desc: isZh ? '小批量起订，快速交付' : 'Low MOQ, fast delivery' },
    { icon: Award, title: isZh ? 'OEM/ODM' : 'OEM/ODM', desc: isZh ? '自有品牌定制，全套解决方案' : 'Own brand customization, full solutions' },
    { icon: Users, title: isZh ? '市场拓展' : 'Market Expansion', desc: isZh ? '共享全球市场资源和销售线索' : 'Global market resources and leads sharing' },
  ];

  const steps = [
    { num: '01', title: isZh ? '联系我们' : 'Contact Us', desc: isZh ? '提交合作意向，了解合作方案' : 'Submit partnership intent, learn about options' },
    { num: '02', title: isZh ? '需求评估' : 'Needs Assessment', desc: isZh ? '我们的团队评估您的市场和产品需求' : 'Our team evaluates your market and product needs' },
    { num: '03', title: isZh ? '方案定制' : 'Customized Plan', desc: isZh ? '提供价格、交货期、品牌方案' : 'Provide pricing, delivery, and branding plan' },
    { num: '04', title: isZh ? '签订合同' : 'Sign Contract', desc: isZh ? '确认合作细节，签订合作协议' : 'Confirm partnership details and sign agreement' },
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

      <div className="bg-gradient-to-r from-primary-700 to-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? 'B2B 合作伙伴计划' : 'B2B Partnership Program'}
            </h1>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">
              {isZh
                ? '与全球经销商、批发商和品牌商建立长期互利合作关系'
                : 'Build long-term mutually beneficial partnerships with distributors, wholesalers, and brand partners worldwide'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-surface-900 mb-4">
            {isZh ? '为什么选择成为合作伙伴？' : 'Why Become a Partner?'}
          </h2>
          <p className="text-surface-600 max-w-xl mx-auto">
            {isZh
              ? '我们为合作伙伴提供极具竞争力的价格、全面的市场支持和专业的技术服务'
              : 'We offer highly competitive pricing, comprehensive market support, and professional technical services to our partners'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-soft"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-surface-900 mb-2">{b.title}</h3>
              <p className="text-surface-600 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h2 className="text-2xl font-bold text-surface-900 mb-8 text-center">
            {isZh ? '合作流程' : 'Partnership Process'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-3">{step.num}</div>
                  <h3 className="font-semibold text-surface-900 mb-2">{step.title}</h3>
                  <p className="text-surface-600 text-sm">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-surface-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="bg-primary-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '准备好开始了吗？' : 'Ready to Get Started?'}
          </h2>
          <p className="text-surface-600 mb-6">
            {isZh
              ? '填写询盘表单或直接联系我们，获取专属合作方案'
              : 'Fill out the inquiry form or contact us directly for an exclusive partnership plan'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inquiry">
              <Button size="lg">{isZh ? '提交合作意向' : 'Submit Partnership Inquiry'}</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary">{isZh ? '联系我们' : 'Contact Us'}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
