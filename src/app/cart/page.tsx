'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, Send, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { imageAssets } from '@/lib/assets';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 text-center"
        >
          <ShoppingBag className="mx-auto mb-6 h-20 w-20 text-surface-300" />
          <h2 className="mb-4 text-2xl font-bold text-surface-900">
            {isZh ? '询盘清单为空' : 'Your inquiry list is empty'}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-surface-600">
            {isZh
              ? '先浏览产品，把感兴趣的型号加入清单，再提交给销售团队获取报价。'
              : 'Browse products, add the models you are interested in, then send the list to our sales team for a quote.'}
          </p>
          <Link href="/products">
            <Button size="lg">
              {isZh ? '浏览产品' : 'Browse Products'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-surface-950 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
              {isZh ? '询盘清单' : 'Inquiry list'}
            </p>
            <h1 className="mb-4 text-4xl font-bold text-white">
              {isZh ? '确认需要报价的产品' : 'Confirm Products for Quotation'}
            </h1>
            <p className="text-lg text-white/70">
              {isZh ? `${items.length} 个产品待询价` : `${items.length} products ready for inquiry`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="flex gap-5 rounded-lg border border-surface-200 bg-white p-5 shadow-soft"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-100 sm:h-32 sm:w-32">
                <Image
                  src={item.image || imageAssets.placeholder}
                  alt={isZh ? item.nameZh || item.name : item.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  unoptimized={!!item.image?.startsWith('http')}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="mb-1 font-semibold text-surface-900">
                      {isZh ? item.nameZh || item.name : item.name}
                    </h3>
                    <p className="text-sm text-surface-500">
                      {isZh ? '参考价' : 'Reference price'}: ${item.price}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-surface-400 transition-colors hover:text-red-500"
                    aria-label={isZh ? '移除产品' : 'Remove product'}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-surface-200">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-surface-600 transition-colors hover:text-orange-500"
                      aria-label={isZh ? '减少数量' : 'Decrease quantity'}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-surface-600 transition-colors hover:text-orange-500"
                      aria-label={isZh ? '增加数量' : 'Increase quantity'}
                    >
                      <Plus className="h-4 w-4" />
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

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="sticky top-24 rounded-lg border border-surface-200 bg-white p-6 shadow-soft"
          >
            <h2 className="mb-4 text-xl font-bold text-surface-900">
              {isZh ? '询盘摘要' : 'Inquiry Summary'}
            </h2>
            <div className="mb-6 space-y-3 text-sm text-surface-600">
              <div className="flex justify-between">
                <span>{isZh ? '产品数量' : 'Product count'}</span>
                <span>{items.length}</span>
              </div>
              <div className="flex justify-between">
                <span>{isZh ? '参考小计' : 'Reference subtotal'}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="border-t pt-4 leading-6">
                {isZh
                  ? '最终报价会根据采购数量、定制要求、运输方式和交付地区由销售团队确认。'
                  : 'Final pricing will be confirmed by our sales team based on quantity, customization, shipping method, and destination.'}
              </p>
            </div>
            <Link href="/inquiry">
              <Button size="lg" className="w-full">
                <Send className="mr-2 h-5 w-5" />
                {isZh ? '提交询盘' : 'Send Inquiry'}
              </Button>
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="mt-4 w-full text-sm text-surface-500 transition-colors hover:text-red-500"
            >
              {isZh ? '清空询盘清单' : 'Clear inquiry list'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
