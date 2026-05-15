'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { CheckCircle, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useProduct } from '@/hooks';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { Button } from '@/components/ui';
import { ScrollReveal } from '@/components/shared';
import { imageAssets } from '@/lib/assets';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: product, isLoading, error } = useProduct(slug);
  const [quantity, setQuantity] = useState(1);
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';
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
      quantity,
      image: product.images?.[0] || '',
      specifications: product.specifications,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-surface-500">{isZh ? '加载中...' : 'Loading...'}</p>
        </div>
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
            <Button variant="secondary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const specs = product.specifications || {};
  const specEntries = Object.entries(specs);
  const imageUrl = product.images?.[0] || imageAssets.placeholder;

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/products" className="flex items-center gap-2 text-surface-600 hover:text-orange-500 transition-colors">
            &larr; {isZh ? '返回产品列表' : 'Back to Products'}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-soft">
              <Image
                src={imageUrl}
                alt={isZh ? product.name_zh : product.name_en}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                unoptimized={imageUrl.startsWith('http')}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
                {isZh ? product.name_zh : product.name_en}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-orange-500">
                  ${product.price.toLocaleString()}
                </span>
                {product.compare_price && (
                  <span className="text-xl text-surface-400 line-through">
                    ${product.compare_price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-surface-600 text-lg mb-8 leading-relaxed">
                {isZh ? product.description_zh : product.description_en}
              </p>

              <div className="flex items-center gap-2 mb-6">
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

              {product.stock_status !== 'out_of_stock' && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-surface-600 font-medium">{isZh ? '数量' : 'Quantity'}</span>
                  <div className="flex items-center border border-surface-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-surface-50 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-medium min-w-[60px] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-surface-50 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart} disabled={product.stock_status === 'out_of_stock'}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isZh ? '加入购物车' : 'Add to Cart'}
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
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

              {specEntries.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-surface-900 mb-4">
                    {isZh ? '产品规格' : 'Specifications'}
                  </h3>
                  <div className="grid gap-3">
                    {specEntries.map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-surface-100 last:border-0">
                        <span className="text-surface-500 text-sm">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="font-medium text-surface-900 text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
