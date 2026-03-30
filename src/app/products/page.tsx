'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Grid, List } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useProducts } from '@/hooks';
import { ScrollReveal } from '@/components/shared';
import { ProductSkeleton } from '@/components/shared';

const staticCategories = [
  { id: 'all', name: 'All Products', nameZh: '全部产品' },
  { id: 'gas', name: 'Gas Heaters', nameZh: '燃气热水器' },
  { id: 'electric', name: 'Electric Heaters', nameZh: '电热水器' },
  { id: 'solar', name: 'Solar Heaters', nameZh: '太阳能热水器' },
  { id: 'heat-pump', name: 'Heat Pumps', nameZh: '空气能热泵' },
  { id: 'boiler', name: 'Boilers', nameZh: '锅炉' },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const isZh = useUIStore.getState().preferences.language === 'zh';

  const { data: products = [], isLoading, error } = useProducts({
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' ||
      product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name_zh.includes(searchQuery);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {isZh ? '产品中心' : 'Products'}
            </h1>
            <p className="text-orange-200 text-lg max-w-2xl mx-auto">
              {isZh
                ? '探索我们全面的热水器解决方案'
                : 'Explore our comprehensive range of water heating solutions'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
              type="text"
              placeholder={isZh ? '搜索产品...' : 'Search products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {staticCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {isZh ? cat.nameZh : cat.name}
                </option>
              ))}
            </select>
            <div className="flex border border-surface-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-surface-600'}`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-surface-600'}`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg mb-4">
              {isZh ? '加载产品时出错' : 'Error loading products'}
            </p>
            <Link href="/products" className="text-orange-500 hover:underline">
              {isZh ? '重试' : 'Try again'}
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 0.05}>
                  <Link href={`/products/${product.slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden relative bg-surface-100">
                        <Image
                          src={product.images?.[0] || '/images/placeholder.png'}
                          alt={isZh ? product.name_zh : product.name_en}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized={!!product.images?.[0]?.startsWith('http')}
                        />
                        {product.compare_price && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
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
                        <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-orange-500 transition-colors">
                          {isZh ? product.name_zh : product.name_en}
                        </h3>
                        <p className="text-sm text-surface-500 mb-4 line-clamp-2 flex-1">
                          {isZh ? product.description_zh : product.description_en}
                        </p>
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="text-xl font-bold text-orange-500">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.compare_price && (
                            <span className="text-surface-400 line-through text-sm">
                              ${product.compare_price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-surface-500 text-lg mb-4">
                  {isZh ? '未找到相关产品' : 'No products found'}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="text-orange-500 hover:underline"
                >
                  {isZh ? '清除筛选条件' : 'Clear filters'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
