'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Mail, MessageCircle, Send } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import { useUIStore } from '@/lib/ui-store';

const productCategories = [
  'Electric Water Heaters',
  'Gas Water Heaters',
  'Solar Water Heaters',
  'Heat Pump Water Heaters',
  'Commercial Systems',
  'OEM / ODM Partnership',
];

export default function InquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);
  const [, setError] = useState<string | null>(null);
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const product = params.get('product');
    if (category) {
      const matched = productCategories.find((item) => item.toLowerCase().includes(category));
      if (matched) setSelectedCategory(matched);
    }
    if (product) setSelectedCategory(product);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const quantityValue = String(formData.get('quantity') || '').trim();

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          product_model: formData.get('product'),
          quantity: /^\d+$/.test(quantityValue) ? Number(quantityValue) : undefined,
          target_price: formData.get('targetPrice') ? Number(formData.get('targetPrice')) : undefined,
          message: `Quantity: ${quantityValue || 'Not specified'}\n\n${formData.get('message')}`,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="px-4 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-surface-900">
            {isZh ? '提交成功' : 'Submission Successful'}
          </h2>
          <p className="mb-8 max-w-md text-surface-600">
            {isZh
              ? '感谢您的询盘。Tramos 销售团队会在 24 小时内回复，并提供报价或选型建议。'
              : 'Thank you for your inquiry. The Tramos sales team will respond within 24 hours with a quote or product recommendation.'}
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
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white">
              {isZh ? '提交询盘' : 'Request a Quote'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-orange-200">
              {isZh
                ? '告诉我们容量、电压、数量、认证和目的地国家，获取更准确的产品建议与报价。'
                : 'Share capacity, voltage, quantity, certification needs, and destination country for a more accurate quote.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-white p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input label={isZh ? '姓名 *' : 'Name *'} name="name" required placeholder={isZh ? '请输入您的姓名' : 'Enter your name'} />
              <Input label={isZh ? '公司名称' : 'Company Name'} name="company" placeholder={isZh ? '请输入公司名称' : 'Enter company name'} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input label={isZh ? '邮箱 *' : 'Email *'} name="email" type="email" required placeholder="your@email.com" />
              <Input label={isZh ? '电话 / WhatsApp' : 'Phone / WhatsApp'} name="phone" type="tel" placeholder="+86 xxx xxxx xxxx" />
            </div>

            <div>
              <label htmlFor="product-category" className="mb-1.5 block text-sm font-medium text-surface-700">
                {isZh ? '产品型号 / 分类' : 'Product Model / Category'}
              </label>
              <select
                id="product-category"
                name="product"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-surface-900 transition-all duration-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {productCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label={isZh ? '数量' : 'Quantity'}
                name="quantity"
                placeholder="Sample / 10-50 / 50-200 / 200+"
              />
              <Input label={isZh ? '目标价格' : 'Target Price'} name="targetPrice" type="number" placeholder="$" />
            </div>

            <Textarea
              label={isZh ? '详细需求 *' : 'Detailed Requirements *'}
              name="message"
              required
              rows={6}
              placeholder={
                isZh
                  ? '请填写 voltage, capacity, application, certification, OEM needs, destination country。例如：220V, 80L, apartment project, CE required, logo/package OEM, Chile.'
                  : 'Please include voltage, capacity, application, certification, OEM needs, and destination country. Example: 220V, 80L, apartment project, CE required, logo/package OEM, Chile.'
              }
            />

            <p className="rounded-xl bg-orange-50 px-4 py-3 text-center text-sm font-medium text-orange-700">
              {isZh ? '我们的销售团队会在 24 小时内回复。' : 'Our sales team will respond within 24 hours.'}
            </p>

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              <Send className="mr-2 h-5 w-5" />
              {isZh ? '提交询盘' : 'Submit Inquiry'}
            </Button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow-soft">
            <MessageCircle className="mx-auto mb-3 h-6 w-6 text-orange-500" />
            <h3 className="mb-2 font-semibold text-surface-900">WhatsApp</h3>
            <p className="text-sm text-surface-600">+86 400-888-8888</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-soft">
            <Mail className="mx-auto mb-3 h-6 w-6 text-orange-500" />
            <h3 className="mb-2 font-semibold text-surface-900">{isZh ? '邮箱' : 'Email'}</h3>
            <p className="break-words text-sm text-surface-600">sales@tramos-heating.com</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-soft">
            <Clock className="mx-auto mb-3 h-6 w-6 text-orange-500" />
            <h3 className="mb-2 font-semibold text-surface-900">{isZh ? '工作时间' : 'Working Hours'}</h3>
            <p className="text-sm text-surface-600">Mon-Fri 9:00-18:00</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
