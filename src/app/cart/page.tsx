'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const isZh = useUIStore.getState().preferences.language === 'zh';
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <ShoppingBag className="w-20 h-20 text-surface-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '购物车为空' : 'Your Cart is Empty'}
          </h2>
          <p className="text-surface-600 mb-8 max-w-md">
            {isZh
              ? '浏览我们的产品，找到适合您的热水器'
              : 'Browse our products to find the perfect water heater for you'}
          </p>
          <Link href="/products">
            <Button size="lg">
              {isZh ? '开始购物' : 'Start Shopping'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '购物车' : 'Shopping Cart'}
            </h1>
            <p className="text-orange-200 text-lg">
              {isZh
                ? `${items.length} 件商品`
                : `${items.length} items`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-soft flex gap-6"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-surface-100">
                  <img
                    src={item.image}
                    alt={isZh ? item.nameZh : item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-surface-900 mb-1">
                        {isZh ? item.nameZh : item.name}
                      </h3>
                      <p className="text-orange-500 font-bold">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-surface-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-surface-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-surface-600 hover:text-orange-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-surface-600 hover:text-orange-500 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-semibold text-surface-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-soft sticky top-24"
            >
              <h2 className="text-xl font-bold text-surface-900 mb-6">
                {isZh ? '订单摘要' : 'Order Summary'}
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-surface-600">
                  <span>{isZh ? '小计' : 'Subtotal'}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-surface-600">
                  <span>{isZh ? '运费' : 'Shipping'}</span>
                  <span>{isZh ? '计算中' : 'Calculated at checkout'}</span>
                </div>
                <div className="flex justify-between text-surface-600">
                  <span>{isZh ? '税费' : 'Tax'}</span>
                  <span>{isZh ? '计算中' : 'Calculated at checkout'}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>{isZh ? '总计' : 'Total'}</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  {isZh ? '去结账' : 'Proceed to Checkout'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <button
                onClick={clearCart}
                className="w-full mt-4 text-sm text-surface-500 hover:text-red-500 transition-colors"
              >
                {isZh ? '清空购物车' : 'Clear Cart'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
