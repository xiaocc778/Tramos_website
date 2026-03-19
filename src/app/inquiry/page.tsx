'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import { useUIStore } from '@/lib/ui-store';

export default function InquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isZh = useUIStore.getState().preferences.language === 'zh';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '提交成功！' : 'Submission Successful!'}
          </h2>
          <p className="text-surface-600 mb-8 max-w-md">
            {isZh
              ? '感谢您的询盘。我们的专业团队将在24小时内与您联系，提供详细的报价和解决方案。'
              : 'Thank you for your inquiry. Our professional team will contact you within 24 hours with a detailed quote and solution.'}
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            {isZh ? '提交新的询盘' : 'Submit Another Inquiry'}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '询盘中心' : 'Request a Quote'}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {isZh
                ? '告诉我们您的需求，获取专业定制方案和优惠报价'
                : 'Tell us your needs and get a customized solution with competitive pricing'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-soft p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label={isZh ? '姓名 *' : 'Name *'}
                name="name"
                required
                placeholder={isZh ? '请输入您的姓名' : 'Enter your name'}
              />
              <Input
                label={isZh ? '公司名称' : 'Company Name'}
                name="company"
                placeholder={isZh ? '请输入公司名称' : 'Enter company name'}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label={isZh ? '邮箱 *' : 'Email *'}
                name="email"
                type="email"
                required
                placeholder={isZh ? 'your@email.com' : 'your@email.com'}
              />
              <Input
                label={isZh ? '电话' : 'Phone'}
                name="phone"
                type="tel"
                placeholder={isZh ? '+86 xxx xxxx xxxx' : '+86 xxx xxxx xxxx'}
              />
            </div>

            <Input
              label={isZh ? '产品型号/类别' : 'Product Model/Category'}
              name="product"
              placeholder={isZh ? '例如：燃气热水器 12L' : 'e.g., Gas Water Heater 12L'}
            />

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label={isZh ? '数量' : 'Quantity'}
                name="quantity"
                type="number"
                placeholder="1"
              />
              <Input
                label={isZh ? '目标价格' : 'Target Price'}
                name="targetPrice"
                type="number"
                placeholder="$"
              />
            </div>

            <Textarea
              label={isZh ? '详细需求 *' : 'Detailed Requirements *'}
              name="message"
              required
              rows={5}
              placeholder={isZh 
                ? '请描述您的具体需求，包括应用场景、规格要求、交付时间等' 
                : 'Please describe your specific requirements, including application scenario, specifications, delivery time, etc.'}
            />

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              <Send className="w-5 h-5 mr-2" />
              {isZh ? '提交询盘' : 'Submit Inquiry'}
            </Button>

            <p className="text-sm text-surface-500 text-center">
              {isZh
                ? '提交表示您同意我们的隐私政策和服务条款'
                : 'By submitting, you agree to our Privacy Policy and Terms of Service'}
            </p>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid sm:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-soft">
            <h3 className="font-semibold text-surface-900 mb-2">
              {isZh ? '电话' : 'Phone'}
            </h3>
            <p className="text-surface-600">+86 400-888-8888</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-soft">
            <h3 className="font-semibold text-surface-900 mb-2">
              {isZh ? '邮箱' : 'Email'}
            </h3>
            <p className="text-surface-600">sales@heatertech.com</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-soft">
            <h3 className="font-semibold text-surface-900 mb-2">
              {isZh ? '工作时间' : 'Working Hours'}
            </h3>
            <p className="text-surface-600">Mon-Fri 9:00-18:00</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
