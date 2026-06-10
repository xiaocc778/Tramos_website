'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { imageAssets } from '@/lib/assets';

interface ProductCardProps {
  product: Product;
  isZh?: boolean;
  className?: string;
}

export function ProductCard({ product, isZh = false, className = '' }: ProductCardProps) {
  const name = isZh ? product.name_zh : product.name_en;
  const description = isZh ? product.description_zh : product.description_en;
  const imageUrl = product.images?.[0] || imageAssets.placeholder;

  return (
    <Link href={`/products/${product.slug}`} className={`block ${className}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-md border border-surface-200 bg-white transition-colors duration-300 hover:border-surface-400">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-100">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized={imageUrl.startsWith('http')}
          />
          {product.compare_price && (
            <span className="absolute left-3 top-3 rounded-md bg-orange-700 px-2.5 py-1 text-xs font-semibold text-white">
              {isZh ? '促销' : 'Sale'}
            </span>
          )}
          {product.stock_status === 'out_of_stock' && (
            <span className="absolute right-3 top-3 rounded-md bg-surface-700 px-2.5 py-1 text-xs font-semibold text-white">
              {isZh ? '缺货' : 'Out of Stock'}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 text-lg font-semibold text-surface-900 transition-colors group-hover:text-orange-700">
            {name}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-6 text-surface-500">
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-surface-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-surface-950">
                ${product.price.toLocaleString()}
              </span>
              {product.compare_price && (
                <span className="text-sm text-surface-400 line-through">
                  ${product.compare_price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-orange-700">
              {isZh ? '查看详情' : 'Details'}
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
