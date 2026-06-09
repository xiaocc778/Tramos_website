'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { imageAssets } from '@/lib/assets';
import { useUIStore } from '@/lib/ui-store';

const quickFaqs = [
  {
    q: 'What information should I send for a quote?',
    qZh: '询盘需要提供哪些信息？',
    a: 'Product category, capacity or power, voltage, quantity, certification needs, application, and destination country help us quote faster.',
    aZh: '建议提供产品分类、容量或功率、电压、数量、认证需求、应用场景和目的地国家，方便快速报价。',
  },
  {
    q: 'Do you support OEM/ODM?',
    qZh: '是否支持 OEM/ODM？',
    a: 'Yes. We can support logo, packaging, model configuration, voltage adaptation, and project-specific specification matching.',
    aZh: '支持。可配合品牌标识、包装、型号配置、电压适配和项目规格匹配。',
  },
  {
    q: 'Can you support commercial projects?',
    qZh: '是否支持商用项目？',
    a: 'Yes. We can recommend commercial hot water systems for hotels, apartments, factories, and facilities based on demand and installation conditions.',
    aZh: '支持。可根据用水需求和安装条件，为酒店、公寓、工厂和设施项目推荐商用热水系统。',
  },
  {
    q: 'How fast will the team respond?',
    qZh: '多久会回复？',
    a: 'Our sales team normally responds within 24 hours on working days.',
    aZh: '工作日通常 24 小时内回复。',
  },
];

export default function ContactPage() {
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';

  const contactInfo = [
    { icon: Phone, label: isZh ? '电话' : 'Phone', value: '+86 400-888-8888' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+86 400-888-8888' },
    { icon: Mail, label: isZh ? '邮箱' : 'Email', value: 'sales@tramos-heating.com' },
    { icon: MapPin, label: isZh ? '地址' : 'Address', value: isZh ? '广东佛山顺德' : 'Shunde District, Foshan, Guangdong' },
    { icon: Clock, label: isZh ? '工作时间' : 'Working Hours', value: isZh ? '周一至周五 9:00-18:00' : 'Mon-Fri 9:00-18:00' },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-4xl font-bold text-white">
              {isZh ? '联系 Tramos' : 'Contact Tramos'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-orange-200">
              {isZh
                ? '发送产品需求、项目参数或合作意向，我们会协助您确认产品、规格、交期与报价。'
                : 'Send product needs, project parameters, or partnership plans. We will help confirm products, specifications, lead time, and quote details.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="mb-8 text-2xl font-bold text-surface-900">
              {isZh ? '联系信息' : 'Contact Information'}
            </h2>
            <div className="mb-12 space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <info.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-surface-900">{info.label}</div>
                    <div className="text-surface-600">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-orange-50 p-6">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-surface-900">
                <MessageCircle className="h-5 w-5 text-orange-500" />
                {isZh ? '快速报价' : 'Quick Quote'}
              </h3>
              <p className="mb-4 text-sm text-surface-600">
                {isZh
                  ? '如果您已有产品型号、容量、数量或目的地国家，请直接提交询盘。我们的销售团队会在 24 小时内回复。'
                  : 'If you already know the product model, capacity, quantity, or destination country, submit an inquiry directly. Our sales team will respond within 24 hours.'}
              </p>
              <Link
                href="/inquiry"
                className="inline-block rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-medium text-white transition-colors hover:from-orange-600 hover:to-amber-600"
              >
                {isZh ? '填写询盘表单' : 'Fill Inquiry Form'}
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl bg-white shadow-soft">
              <Image
                src={imageAssets.company.reception}
                alt={isZh ? 'Tramos 接待与办公环境' : 'Tramos reception and office environment'}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16 rounded-2xl bg-white p-8 shadow-soft">
          <h2 className="mb-6 text-center text-2xl font-bold text-surface-900">
            {isZh ? '采购前常见问题' : 'Common Buyer Questions'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {quickFaqs.map((faq) => (
              <div key={faq.q} className="rounded-xl bg-surface-50 p-5">
                <h3 className="mb-2 font-semibold text-surface-900">{isZh ? faq.qZh : faq.q}</h3>
                <p className="text-sm text-surface-600">{isZh ? faq.aZh : faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/faq" className="font-medium text-orange-500 transition-colors hover:text-orange-600">
              {isZh ? '查看完整 FAQ' : 'View full FAQ'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
