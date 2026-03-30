'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ShoppingCart, Loader2 } from 'lucide-react';
import { useProduct } from '@/hooks';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { Button } from '@/components/ui';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: product, isLoading, error } = useProduct(slug);
  const isZh = useUIStore.getState().preferences.language === 'zh';
  
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name_en,
      nameZh: product.name_zh,
      price: product.price,
      comparePrice: product.compare_price,
      quantity: 1,
      image: product.images?.[0] || '',
      specifications: product.specifications,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            {isZh ? '产品未找到' : 'Product Not Found'}
          </h2>
          <Link href="/products">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZh ? '返回产品列表' : 'Back to Products'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const specs = product.specifications || {};
  const specEntries = Object.entries(specs);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/products">
            <motion.button
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-surface-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {isZh ? '返回产品列表' : 'Back to Products'}
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-soft">
              <img
                src={product.images?.[0] || '/placeholder.png'}
                alt={isZh ? product.name_zh : product.name_en}
                className="w-full h-full object-cover"
              />
            </div>
            {product.compare_price && (
              <span className="absolute top-6 left-6 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-full">
                {isZh ? '促销' : 'Sale'}
              </span>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              {isZh ? product.name_zh : product.name_en}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-primary-600">
                ${product.price.toLocaleString()}
              </span>
              {product.compare_price && (
                <span className="text-xl text-surface-400 line-through">
                  ${product.compare_price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-surface-600 text-lg mb-8 leading-relaxed">
              {isZh ? product.description_zh : product.description_en}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-8">
              <div className={`w-3 h-3 rounded-full ${
                product.stock_status === 'in_stock' ? 'bg-green-500' :
                product.stock_status === 'low_stock' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-surface-600">
                {product.stock_status === 'in_stock' ? (isZh ? '有货' : 'In Stock') :
                 product.stock_status === 'low_stock' ? (isZh ? '库存紧张' : 'Low Stock') :
                 (isZh ? '缺货' : 'Out of Stock')}
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="mb-8">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleAddToCart}
                disabled={product.stock_status === 'out_of_stock'}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isZh ? '加入购物车' : 'Add to Cart'}
              </Button>
            </div>

            {/* Specifications */}
            {specEntries.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-surface-900 mb-4">
                  {isZh ? '产品规格' : 'Specifications'}
                </h3>
                <div className="grid gap-3">
                  {specEntries.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-surface-100 last:border-0">
                      <span className="text-surface-500">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      <span className="font-medium text-surface-900">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                isZh ? '免费配送' : 'Free Shipping',
                isZh ? '5年质保' : '5-Year Warranty',
                isZh ? '24/7 支持' : '24/7 Support',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-surface-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}