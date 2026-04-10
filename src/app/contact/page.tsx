'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';

export default function ContactPage() {
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';

  const contactInfo = [
    { icon: Phone, label: isZh ? '电话' : 'Phone', value: '+86 400-888-8888' },
    { icon: Mail, label: isZh ? '邮箱' : 'Email', value: 'contact@heatertech.com' },
    { icon: MapPin, label: isZh ? '地址' : 'Address', value: isZh ? '广东省佛山市顺德区容桂街道' : 'RongGui Street, Shunde District, Foshan, Guangdong' },
    { icon: Clock, label: isZh ? '工作时间' : 'Hours', value: isZh ? '周一至周五 9:00-18:00' : 'Mon-Fri 9:00-18:00' },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '联系我们' : 'Contact Us'}
            </h1>
            <p className="text-orange-200 text-lg max-w-2xl mx-auto">
              {isZh
                ? '有任何问题或需求？我们随时为您服务'
                : 'Have questions or needs? We are always here to help'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-bold text-surface-900 mb-8">
              {isZh ? '联系方式' : 'Contact Information'}
            </h2>
            <div className="space-y-6 mb-12">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900 mb-1">{info.label}</div>
                    <div className="text-surface-600">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <h3 className="font-bold text-surface-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                {isZh ? '快速询价' : 'Quick Quote'}
              </h3>
              <p className="text-surface-600 text-sm mb-4">
                {isZh
                  ? '如果您有明确的产品需求，可以直接填写询盘表单，我们将在24小时内回复'
                  : 'If you have specific product needs, fill out our inquiry form and we will respond within 24 hours'}
              </p>
              <a href="/inquiry" className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition-colors">
                {isZh ? '填写询盘表单' : 'Fill Inquiry Form'}
              </a>
            </div>
          </motion.div>

          {/* Map / Image */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden h-full min-h-[400px]">
              <img
                src="/images/lifestyle/office-building.jpg"
                alt="Office"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* FAQ Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-2xl font-bold text-surface-900 mb-6 text-center">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { q: isZh ? '最小起订量是多少？' : 'What is the minimum order quantity?', a: isZh ? '我们的最小起订量根据产品类型而不同，家用产品通常1台起，商用产品5台起。具体请咨询我们的销售团队。' : 'MOQ varies by product type. Usually 1 unit for home products and 5 units for commercial products. Please contact our sales team for details.' },
              { q: isZh ? '交货期需要多长时间？' : 'How long is the delivery time?', a: isZh ? '家用产品通常7-15个工作日，商用产品通常15-30个工作日。具体时间取决于订单数量和当前生产排期。' : 'Home products typically 7-15 working days, commercial products 15-30 working days. Actual time depends on order quantity and production schedule.' },
              { q: isZh ? '你们提供OEM服务吗？' : 'Do you offer OEM services?', a: isZh ? '是的，我们提供OEM和ODM服务，支持品牌定制、包装设计和产品功能定制。' : 'Yes, we offer OEM and ODM services, supporting brand customization, packaging design, and product feature customization.' },
              { q: isZh ? '产品有质保期吗？' : 'Do you provide warranty?', a: isZh ? '是的，家用产品享受5年质保，商用产品享受2年质保。质保期内免费维修或更换。' : 'Yes, home products have 5-year warranty, commercial products have 2-year warranty. Free repair or replacement during warranty period.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-surface-50 rounded-xl p-5">
                <h3 className="font-semibold text-surface-900 mb-2">{faq.q}</h3>
                <p className="text-surface-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/faq" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
              {isZh ? '查看更多常见问题 →' : 'View all FAQs →'}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
