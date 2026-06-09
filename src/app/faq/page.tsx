'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';

const faqs = [
  {
    id: 'moq',
    question: 'What is the MOQ?',
    questionZh: '最小起订量是多少？',
    answer:
      'MOQ depends on the product family and customization level. Samples can usually be discussed first; distributor and OEM/ODM orders are quoted by model, packaging, and destination market.',
    answerZh:
      'MOQ 取决于产品系列和定制程度。通常可以先沟通样品；经销和 OEM/ODM 订单会按型号、包装和目的地市场单独报价。',
  },
  {
    id: 'delivery',
    question: 'What is the delivery time?',
    questionZh: '交货期多久？',
    answer:
      'Sample and standard orders are normally faster than customized orders. Bulk lead time depends on quantity, current production schedule, packaging, and certification requirements.',
    answerZh:
      '样品和标准订单通常更快，定制订单需要更多准备时间。批量交期取决于数量、生产排期、包装和认证要求。',
  },
  {
    id: 'oem',
    question: 'Do you support OEM/ODM?',
    questionZh: '是否支持 OEM/ODM？',
    answer:
      'Yes. Tramos can support logo, color, control panel, packaging, model configuration, voltage adaptation, and documentation for target markets.',
    answerZh:
      '支持。Tramos 可配合品牌标识、颜色、控制面板、包装、型号配置、电压适配，以及目标市场资料准备。',
  },
  {
    id: 'certification',
    question: 'Which certifications can be supported?',
    questionZh: '可以支持哪些认证？',
    answer:
      'Certification depends on product type and destination market. Share the country, product category, and expected standard so our team can confirm the available route and documents.',
    answerZh:
      '认证取决于产品类型和目的地市场。请提供国家、产品分类和目标标准，我们会确认可支持的认证路径和资料。',
  },
  {
    id: 'warranty',
    question: 'What warranty do you provide?',
    questionZh: '质保如何安排？',
    answer:
      'Warranty terms vary by product family, order type, and market requirements. For B2B orders, warranty parts, service documents, and after-sales process can be confirmed before production.',
    answerZh:
      '质保条款会因产品系列、订单类型和市场要求不同而变化。B2B 订单可在生产前确认备件、售后资料和服务流程。',
  },
  {
    id: 'shipping',
    question: 'Can you arrange shipping?',
    questionZh: '是否可以安排运输？',
    answer:
      'We can support export documentation and coordinate shipping options. Freight cost is affected by order volume, destination, shipping method, and incoterms.',
    answerZh:
      '我们可支持出口资料并协助协调运输方案。运费取决于订单体积、目的地、运输方式和贸易条款。',
  },
  {
    id: 'distributor',
    question: 'How do I become a distributor?',
    questionZh: '如何成为经销商？',
    answer:
      'Send your market, sales channel, preferred product families, estimated annual volume, and certification needs to sales@tramos-heating.com. Our team will review the cooperation fit.',
    answerZh:
      '请将市场区域、销售渠道、目标产品系列、预计年采购量和认证需求发送至 sales@tramos-heating.com，我们会评估合作适配度。',
  },
  {
    id: 'support',
    question: 'What technical support is available?',
    questionZh: '可以提供哪些技术支持？',
    answer:
      'We can help with product selection, specification matching, installation documents, spare-part planning, and project quotation structure for commercial and OEM/ODM buyers.',
    answerZh:
      '可协助产品选型、规格匹配、安装资料、备件规划，以及商用和 OEM/ODM 采购所需的项目报价结构。',
  },
];

export default function FAQPage() {
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';
  const [openId, setOpenId] = useState<string | null>('moq');

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-4xl font-bold text-white">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-orange-200">
              {isZh
                ? '围绕 MOQ、交期、OEM/ODM、认证、质保、运输和技术支持的采购问题。'
                : 'Buyer-focused answers about MOQ, delivery, OEM/ODM, certification, warranty, shipping, and technical support.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="overflow-hidden rounded-2xl bg-white shadow-soft"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-surface-50"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 font-semibold text-surface-900">
                    {isZh ? faq.questionZh : faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-orange-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-surface-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="leading-relaxed text-surface-600">
                      {isZh ? faq.answerZh : faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 rounded-2xl bg-orange-50 p-8 text-center">
          <HelpCircle className="mx-auto mb-4 h-10 w-10 text-orange-500" />
          <h2 className="mb-2 text-xl font-bold text-surface-900">
            {isZh ? '还有具体项目问题？' : "Can't find your project answer?"}
          </h2>
          <p className="mb-6 text-surface-600">
            {isZh
              ? '把产品分类、容量、电压、认证和目的地国家发给我们，销售团队会在 24 小时内回复。'
              : 'Send product category, capacity, voltage, certification, and destination country. Our sales team will respond within 24 hours.'}
          </p>
          <Link href="/inquiry" className="inline-block rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3 font-medium text-white transition-colors hover:from-orange-600 hover:to-amber-600">
            {isZh ? '提交询盘' : 'Request Quote'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
