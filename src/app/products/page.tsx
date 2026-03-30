'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Grid, List, Loader2 } from 'lucide-react';
import { useUIStore } from '@/lib/ui-store';
import { useProducts } from '@/hooks';

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
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">{isZh ? '产品中心' : 'Products'}</h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {isZh ? '探索我们全面的热水器解决方案' : 'Explore our comprehensive range of water heating solutions'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {isLoading && (
              <div className="flex items-center justify-center w-full py-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
              </div>
            )}
            {error && (
              <div className="text-red-500 py-4">
                {isZh ? '加载产品时出错' : 'Error loading products'}
              </div>
            )}
            {!isLoading && !error && (
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type="text"
                    placeholder={isZh ? '搜索产品...' : 'Search products...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-surface-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-surface-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-surface-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/products/${product.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={product.images?.[0] || product.images?.[0] || '/placeholder.png'}
                      alt={isZh ? product.name_zh : product.name_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.compare_price && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                        {isZh ? '促销' : 'Sale'}
                      </span>
                    )}
                    {product.stock_status === 'out_of_stock' && (
                      <span className="absolute top-4 right-4 bg-surface-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                        {isZh ? '缺货' : 'Out of Stock'}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {isZh ? product.name_zh : product.name_en}
                    </h3>
                    <p className="text-sm text-surface-500 mb-3 line-clamp-2">
                      {isZh ? product.description_zh : product.description_en}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary-600">${product.price.toLocaleString()}</span>
                      {product.compare_price && (
                        <span className="text-surface-400 line-through">${product.compare_price.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-surface-500 text-lg">
              {isZh ? '未找到相关产品' : 'No products found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
