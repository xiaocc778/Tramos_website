'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const router = useRouter();
  const total = getTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    clearCart();
    setIsComplete(true);
  };

  if (items.length === 0 && !isComplete) {
    router.push('/products');
    return null;
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4 max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '订单提交成功！' : 'Order Placed Successfully!'}
          </h2>
          <p className="text-surface-600 mb-8">
            {isZh
              ? '感谢您的购买！我们已收到您的订单，正在处理中。确认邮件已发送至您的邮箱。'
              : 'Thank you for your purchase! We have received your order and it is being processed. A confirmation email has been sent to your address.'}
          </p>
          <Button onClick={() => router.push('/')}>
            {isZh ? '返回首页' : 'Back to Home'}
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
              {isZh ? '结账' : 'Checkout'}
            </h1>
            <p className="text-primary-100 text-lg">
              {isZh ? '完成您的订单' : 'Complete your order'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-soft"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 mb-4">
                    {isZh ? '联系信息' : 'Contact Information'}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label={isZh ? '名字 *' : 'First Name *'}
                      required
                    />
                    <Input
                      label={isZh ? '姓氏 *' : 'Last Name *'}
                      required
                    />
                    <Input
                      label={isZh ? '邮箱 *' : 'Email *'}
                      type="email"
                      required
                      className="sm:col-span-2"
                    />
                    <Input
                      label={isZh ? '电话 *' : 'Phone *'}
                      type="tel"
                      required
                      className="sm:col-span-2"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 mb-4">
                    {isZh ? '收货地址' : 'Shipping Address'}
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label={isZh ? '地址 *' : 'Address *'}
                      required
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label={isZh ? '城市 *' : 'City *'}
                        required
                      />
                      <Input
                        label={isZh ? '省份/州 *' : 'State/Province *'}
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label={isZh ? '国家 *' : 'Country *'}
                        required
                      />
                      <Input
                        label={isZh ? '邮政编码 *' : 'Postal Code *'}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 mb-4">
                    {isZh ? '支付方式' : 'Payment Method'}
                  </h3>
                  <div className="border border-surface-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-5 h-5 text-primary-600" />
                      <span className="font-medium">{isZh ? '信用卡/借记卡' : 'Credit/Debit Card'}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label={isZh ? '卡号 *' : 'Card Number *'}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="sm:col-span-2"
                      />
                      <Input
                        label={isZh ? '有效期 *' : 'Expiry Date *'}
                        placeholder="MM/YY"
                        required
                      />
                      <Input
                        label={isZh ? 'CVC *' : 'CVC *'}
                        placeholder="123"
                        required
                      />
                      <Input
                        label={isZh ? '持卡人姓名 *' : 'Cardholder Name *'}
                        required
                        className="sm:col-span-2"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isProcessing}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {isZh ? `支付 $${total.toFixed(2)}` : `Pay $${total.toFixed(2)}`}
                </Button>

                <p className="text-xs text-surface-500 text-center flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" />
                  {isZh
                    ? '您的支付信息已加密保护'
                    : 'Your payment information is securely encrypted'}
                </p>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-soft sticky top-24"
            >
              <h2 className="text-lg font-semibold text-surface-900 mb-4">
                {isZh ? '订单摘要' : 'Order Summary'}
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={isZh ? item.nameZh : item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900 truncate">
                        {isZh ? item.nameZh : item.name}
                      </p>
                      <p className="text-sm text-surface-500">
                        {isZh ? '数量' : 'Qty'}: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-surface-600">
                  <span>{isZh ? '小计' : 'Subtotal'}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-surface-600">
                  <span>{isZh ? '运费' : 'Shipping'}</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-surface-600">
                  <span>{isZh ? '税费' : 'Tax'}</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>{isZh ? '总计' : 'Total'}</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
