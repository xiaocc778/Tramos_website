'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  isZh?: boolean;
  className?: string;
}

export function ProductCard({ product, isZh = false, className = '' }: ProductCardProps) {
  const name = isZh ? product.name_zh : product.name_en;
  const description = isZh ? product.description_zh : product.description_en;
  const imageUrl = product.images?.[0] || '/images/placeholder.png';

  return (
    <Link href={`/products/${product.slug}`} className={`block ${className}`}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-orange-100 hover:border-orange-300 shadow-soft hover:shadow-orange-hover transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden relative bg-surface-100">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={imageUrl.startsWith('http')}
          />
          {product.compare_price && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {isZh ? '促销' : 'Sale'}
            </span>
          )}
          {product.stock_status === 'out_of_stock' && (
            <span className="absolute top-3 right-3 bg-surface-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {isZh ? '缺货' : 'Out of Stock'}
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-surface-900 group-hover:text-orange-500 transition-colors mb-2">
            {name}
          </h3>
          <p className="text-sm text-surface-500 mb-4 line-clamp-2 flex-1">
            {description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-orange-500">
                ${product.price.toLocaleString()}
              </span>
              {product.compare_price && (
                <span className="text-sm text-surface-400 line-through">
                  ${product.compare_price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {isZh ? '查看详情' : 'Details'}
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
