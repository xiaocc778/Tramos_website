'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useFAQs } from '@/hooks';
import type { Article } from '@/types';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  question_zh?: string;
  answer_zh?: string;
  question_en?: string;
  answer_en?: string;
}

export default function FAQPage() {
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const { data: faqs = [] } = useFAQs();
  const [openId, setOpenId] = useState<string | null>(null);

  const staticFAQs: FAQItem[] = [
    {
      id: '1',
      question: isZh ? '最小起订量是多少？' : 'What is the minimum order quantity?',
      answer: isZh
        ? '我们的最小起订量根据产品类型而不同。家用产品通常1台起订，商用产品5台起订。B2B合作客户可以根据合同享受更灵活的起订量政策。'
        : 'MOQ varies by product type. Usually 1 unit for home products and 5 units for commercial products. B2B partners enjoy more flexible MOQ policies under contract.',
    },
    {
      id: '2',
      question: isZh ? '交货期需要多长时间？' : 'How long is the delivery time?',
      answer: isZh
        ? '家用产品通常7-15个工作日，商用产品通常15-30个工作日。紧急订单可以支付加急费用缩短交货期。具体时间取决于订单数量和当前生产排期。'
        : 'Home products typically 7-15 working days, commercial products 15-30 working days. Rush orders can pay an express fee to shorten delivery. Actual time depends on order quantity and production schedule.',
    },
    {
      id: '3',
      question: isZh ? '你们提供OEM/ODM服务吗？' : 'Do you offer OEM/ODM services?',
      answer: isZh
        ? '是的，我们提供全面的OEM和ODM服务，包括品牌定制、包装设计、产品功能定制、模具开发等。我们有丰富的国际品牌代工经验。'
        : 'Yes, we offer full OEM and ODM services, including brand customization, packaging design, product feature customization, and mold development. We have extensive experience with international brand manufacturing.',
    },
    {
      id: '4',
      question: isZh ? '产品有哪些认证？' : 'What certifications do your products have?',
      answer: isZh
        ? '我们的产品已获得CE、CSA、ETL、SASO等国际认证，并通过了ISO9001质量管理体系认证。具体认证根据目标市场和产品类型而有所不同。'
        : 'Our products have obtained CE, CSA, ETL, SASO and other international certifications, and passed ISO9001 quality management system certification. Specific certifications vary by target market and product type.',
    },
    {
      id: '5',
      question: isZh ? '产品质保期是多久？' : 'What is the product warranty period?',
      answer: isZh
        ? '家用产品享受5年质保，商用产品享受2年质保。质保期内因产品质量问题造成的损坏，我们提供免费维修或更换服务。'
        : 'Home products have 5-year warranty, commercial products have 2-year warranty. During the warranty period, damage caused by product quality issues qualifies for free repair or replacement.',
    },
    {
      id: '6',
      question: isZh ? '运费如何计算？' : 'How are shipping costs calculated?',
      answer: isZh
        ? '运费根据订单重量、体积、目的地和运输方式计算。我们与多家国际物流公司合作，可以提供最具竞争力的运费报价。批量订单可协商免运费。'
        : 'Shipping costs are calculated based on order weight, volume, destination, and shipping method. We partner with multiple international logistics companies to offer competitive rates. Bulk orders may qualify for free shipping.',
    },
    {
      id: '7',
      question: isZh ? '如何申请成为经销商？' : 'How do I apply to become a distributor?',
      answer: isZh
        ? '您可以通过填写询盘表单选择"B2B合作"类型，或直接发送邮件至 sales@heatertech.com。我们的B2B团队将在2个工作日内与您联系。'
        : 'You can fill out our inquiry form selecting "B2B Partnership" or email sales@heatertech.com directly. Our B2B team will contact you within 2 working days.',
    },
    {
      id: '8',
      question: isZh ? '技术支持服务有哪些？' : 'What technical support services are available?',
      answer: isZh
        ? '我们提供全方位的技术支持，包括产品选型指导、安装调试支持、故障诊断和远程技术支持。B2B合作伙伴享有专属技术经理服务。'
        : 'We provide comprehensive technical support including product selection guidance, installation and commissioning support, fault diagnosis, and remote technical assistance. B2B partners enjoy dedicated technical manager services.',
    },
  ];

  const allFAQs: (FAQItem | Article)[] = faqs.length > 0 ? faqs : staticFAQs;

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {isZh
                ? '找到您关心的问题答案，如有更多疑问请随时联系我们'
                : 'Find answers to your questions. Contact us anytime if you have more inquiries'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {allFAQs.map((faq, i) => {
            const item = faq as FAQItem;
            const art = faq as Article;
            const question = ('question' in faq) ? (item.question_en || item.question) : art.title_en;
            const answer = ('answer' in faq) ? (item.answer_en || item.answer) : art.content_en;
            const displayQuestion = isZh ? (('question_zh' in faq && item.question_zh) ? item.question_zh : art.title_zh) : question;
            const displayAnswer = isZh ? (('answer_zh' in faq && item.answer_zh) ? item.answer_zh : art.content_zh) : answer;
            const id = ('id' in faq) ? item.id : String(i);

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === id ? null : id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-surface-50 transition-colors"
                >
                  <span className="font-semibold text-surface-900 pr-4">{displayQuestion}</span>
                  {openId === id ? (
                    <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-surface-400 flex-shrink-0" />
                  )}
                </button>
                {openId === id && (
                  <div className="px-6 pb-6">
                    <p className="text-surface-600 leading-relaxed">{displayAnswer}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-primary-50 rounded-2xl p-8 text-center"
        >
          <HelpCircle className="w-10 h-10 text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-surface-900 mb-2">
            {isZh ? '没找到答案？' : "Can't find what you're looking for?"}
          </h2>
          <p className="text-surface-600 mb-6">
            {isZh
              ? '我们的专业团队随时为您解答任何问题'
              : 'Our professional team is ready to answer any questions'}
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            {isZh ? '联系我们' : 'Contact Us'}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
