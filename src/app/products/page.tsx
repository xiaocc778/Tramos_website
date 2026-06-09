'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Grid, List, Search } from 'lucide-react';
import { ScrollReveal } from '@/components/shared';
import { imageAssets } from '@/lib/assets';
import { useUIStore } from '@/lib/ui-store';
import { cn } from '@/lib/utils';

type CategoryKey = 'all' | 'electric' | 'gas' | 'solar' | 'heat-pump' | 'commercial';

interface ProductCatalogItem {
  slug: string;
  category: Exclude<CategoryKey, 'all'>;
  categoryLabel: string;
  categoryLabelZh: string;
  name: string;
  nameZh: string;
  image: string;
  capacity: string;
  application: string;
  highlights: string[];
}

const categories: Array<{ key: CategoryKey; label: string; labelZh: string }> = [
  { key: 'all', label: 'All Products', labelZh: '全部产品' },
  { key: 'electric', label: 'Electric', labelZh: '电热水器' },
  { key: 'gas', label: 'Gas', labelZh: '燃气热水器' },
  { key: 'solar', label: 'Solar', labelZh: '太阳能热水器' },
  { key: 'heat-pump', label: 'Heat Pump', labelZh: '空气能热泵' },
  { key: 'commercial', label: 'Commercial Systems', labelZh: '商用系统' },
];

const productCatalog: ProductCatalogItem[] = [
  {
    slug: 'glass-panel-instant-16l',
    category: 'gas',
    categoryLabel: 'Gas Water Heaters',
    categoryLabelZh: '燃气热水器',
    name: 'Glass Panel Instant Gas Water Heater',
    nameZh: '玻璃面板即热燃气热水器',
    image: imageAssets.productModels.product1[0],
    capacity: '16L/min / LPG or NG',
    application: 'Apartments, villas, bathrooms, distributor programs',
    highlights: ['Premium glass front panel', 'Digital touch control layout', 'Modern retail and OEM appearance'],
  },
  {
    slug: 'slim-glass-instant-water-heater',
    category: 'gas',
    categoryLabel: 'Gas Water Heaters',
    categoryLabelZh: '燃气热水器',
    name: 'Slim Glass Instant Water Heater',
    nameZh: '纤薄玻璃即热热水器',
    image: imageAssets.productModels.product2[0],
    capacity: '12-16L/min / LPG or NG',
    application: 'Bathrooms, kitchens, apartments, export wholesale',
    highlights: ['Slim wall-mounted cabinet', 'Clean front control area', 'Suitable for private-label programs'],
  },
  {
    slug: 'premium-vertical-glass-heater',
    category: 'electric',
    categoryLabel: 'Electric Water Heaters',
    categoryLabelZh: '电热水器',
    name: 'Premium Vertical Glass Electric Heater',
    nameZh: '高端立式玻璃电热水器',
    image: imageAssets.productModels.product3[0],
    capacity: '40-80L / 1.5-2.5kW',
    application: 'Bathrooms, apartments, premium residential projects',
    highlights: ['Vertical space-saving profile', 'Premium dark glass finish', 'Stable storage hot water supply'],
  },
  {
    slug: 'compact-digital-wall-heater',
    category: 'electric',
    categoryLabel: 'Electric Water Heaters',
    categoryLabelZh: '电热水器',
    name: 'Compact Digital Wall-Mounted Heater',
    nameZh: '紧凑数显壁挂电热水器',
    image: imageAssets.productModels.product4[0],
    capacity: '30-60L / 1.5-2.0kW',
    application: 'Small bathrooms, rental apartments, compact spaces',
    highlights: ['Compact cabinet size', 'Digital display option', 'Fast specification matching for OEM orders'],
  },
  {
    slug: 'horizontal-storage-electric-heater',
    category: 'electric',
    categoryLabel: 'Electric Water Heaters',
    categoryLabelZh: '电热水器',
    name: 'Horizontal Storage Electric Water Heater',
    nameZh: '横式储水电热水器',
    image: imageAssets.productModels.product5[0],
    capacity: '40-100L / 1.5-2.5kW',
    application: 'Family bathrooms, apartments, retail channels',
    highlights: ['Classic horizontal installation', 'Multiple capacity options', 'OEM panel and packaging support'],
  },
  {
    slug: 'digital-horizontal-storage-heater',
    category: 'electric',
    categoryLabel: 'Electric Water Heaters',
    categoryLabelZh: '电热水器',
    name: 'Digital Horizontal Storage Heater',
    nameZh: '数显横式储水热水器',
    image: imageAssets.productModels.product6[0],
    capacity: '50-100L / 1.5-2.5kW',
    application: 'Bathrooms, apartment projects, distributor stock',
    highlights: ['Digital control panel', 'Clean rounded tank profile', 'Batch supply for project channels'],
  },
  {
    slug: 'slim-vertical-storage-heater',
    category: 'electric',
    categoryLabel: 'Electric Water Heaters',
    categoryLabelZh: '电热水器',
    name: 'Slim Vertical Storage Heater',
    nameZh: '纤薄立式储水热水器',
    image: imageAssets.productModels.product7[0],
    capacity: '40-80L / residential use',
    application: 'Compact bathrooms, apartments, retail showrooms',
    highlights: ['Vertical wall-mounted design', 'Narrow installation footprint', 'Modern front panel styling'],
  },
  {
    slug: 'rounded-horizontal-storage-series',
    category: 'electric',
    categoryLabel: 'Electric Water Heaters',
    categoryLabelZh: '电热水器',
    name: 'Rounded Horizontal Storage Series',
    nameZh: '圆角横式储水系列',
    image: imageAssets.productModels.product8[0],
    capacity: '50-100L / 1.5-2.5kW',
    application: 'Home bathrooms, apartments, OEM distributors',
    highlights: ['Rounded body design', 'Stable enamel tank option', 'Flexible appearance customization'],
  },
  {
    slug: 'premium-gold-storage-heater',
    category: 'heat-pump',
    categoryLabel: 'Heat Pump Water Heaters',
    categoryLabelZh: '空气能热泵热水器',
    name: 'Premium Gold Storage Water Heater',
    nameZh: '香槟金储水热水器',
    image: imageAssets.productModels.product9[0],
    capacity: '80-150L / system matching',
    application: 'Premium residential, apartments, light commercial supply',
    highlights: ['Premium finish for high-end projects', 'Storage supply compatibility', 'Can be matched with energy-saving systems'],
  },
  {
    slug: 'commercial-horizontal-hot-water-unit',
    category: 'commercial',
    categoryLabel: 'Commercial Systems',
    categoryLabelZh: '商用热水系统',
    name: 'Commercial Horizontal Hot Water Unit',
    nameZh: '商用横式热水单元',
    image: imageAssets.productModels.product10[0],
    capacity: 'Project-based / multi-unit matching',
    application: 'Hotels, apartments, schools, facilities, engineering projects',
    highlights: ['Suitable for multi-room supply', 'Project quantity matching', 'Distributor and engineering order support'],
  },
  {
    slug: 'solar-hot-water-roof-system',
    category: 'solar',
    categoryLabel: 'Solar Water Heaters',
    categoryLabelZh: '太阳能热水器',
    name: 'Roof-Mounted Solar Hot Water System',
    nameZh: '屋顶太阳能热水系统',
    image: imageAssets.productGeneral.solarRoof,
    capacity: '150-300L / electric backup optional',
    application: 'Homes, villas, low-rise apartments, sunny regions',
    highlights: ['Lower daily energy cost', 'Roof system configuration', 'Collector and tank matching support'],
  },
];

function normalizeCategory(value: string | null): CategoryKey {
  const keys = categories.map((category) => category.key);
  return keys.includes(value as CategoryKey) ? (value as CategoryKey) : 'all';
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedCategory(normalizeCategory(params.get('category')));
    setSearchQuery(params.get('search') ?? '');
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return productCatalog.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const text = `${product.name} ${product.nameZh} ${product.categoryLabel} ${product.application}`.toLowerCase();
      return matchesCategory && (query === '' || text.includes(query));
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="bg-gradient-to-r from-[#1B2A4A] to-orange-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-4xl font-bold text-white">{isZh ? '产品中心' : 'Products'}</h1>
            <p className="mx-auto max-w-2xl text-lg text-orange-200">
              {isZh
                ? '覆盖电、燃气、太阳能、空气能热泵与商用热水系统，适合经销、工程和 OEM/ODM 采购。'
                : 'Electric, gas, solar, heat pump, and commercial hot water systems for distribution, projects, and OEM/ODM sourcing.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={category.key === 'all' ? '/products' : `/products?category=${category.key}`}
              onClick={() => setSelectedCategory(category.key)}
              aria-current={selectedCategory === category.key ? 'page' : undefined}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                selectedCategory === category.key
                  ? 'bg-orange-500 text-white shadow-soft'
                  : 'bg-white text-surface-600 hover:bg-orange-50 hover:text-orange-600'
              )}
            >
              {isZh ? category.labelZh : category.label}
            </Link>
          ))}
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder={isZh ? '搜索产品、分类或应用场景...' : 'Search product, category, or application...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-surface-200 bg-white py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex overflow-hidden rounded-xl border border-surface-200">
            <button
              onClick={() => setViewMode('grid')}
              className={cn('p-3 transition-colors', viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-surface-600 hover:text-orange-500')}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn('p-3 transition-colors', viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-surface-600 hover:text-orange-500')}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {filteredProducts.length === 1 && selectedCategory !== 'all' && (
          <div className="mb-6 rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-800">
            {isZh ? '当前分类有 1 个产品系列，可直接提交询盘获取规格建议。' : '1 product family available in this category. Send an inquiry for specification matching.'}
          </div>
        )}

        <div className={cn('grid gap-6', viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
          {filteredProducts.map((product, index) => (
            <ScrollReveal key={product.slug} delay={index * 0.05}>
              <article className={cn('group flex h-full min-h-[580px] flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-soft-hover', viewMode === 'list' && 'min-h-0 md:grid md:grid-cols-[300px_1fr]')}>
                <div className="relative aspect-[16/10] flex-shrink-0 overflow-hidden bg-surface-100">
                  <Image
                    src={product.image}
                    alt={isZh ? product.nameZh : product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes={viewMode === 'grid' ? '(min-width: 1024px) 33vw, 50vw' : '(min-width: 768px) 300px, 100vw'}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-orange-700 shadow-sm">
                    {isZh ? product.categoryLabelZh : product.categoryLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-lg font-semibold text-surface-900 transition-colors group-hover:text-orange-500">
                    {isZh ? product.nameZh : product.name}
                  </h3>
                  <div className="mb-3 grid gap-2 text-sm text-surface-600">
                    <p><span className="font-medium text-surface-900">{isZh ? '容量/功率：' : 'Capacity/Power: '}</span>{product.capacity}</p>
                    <p><span className="font-medium text-surface-900">{isZh ? '适用场景：' : 'Use Case: '}</span>{product.application}</p>
                  </div>
                  <ul className="mb-5 flex-1 space-y-2 text-sm text-surface-600">
                    {product.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-surface-100 pt-4">
                    <Link href={`/products/${product.slug}`} className="inline-flex items-center justify-center rounded-lg border-2 border-orange-500 px-3 py-2 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50">
                      {isZh ? '详情' : 'View Details'}
                    </Link>
                    <Link href={`/inquiry?category=${product.category}&product=${encodeURIComponent(product.name)}`} className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:from-orange-600 hover:to-amber-600">
                      {isZh ? '报价' : 'Request Quote'}
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="mb-4 text-lg text-surface-500">{isZh ? '没有找到匹配产品' : 'No products found'}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="font-medium text-orange-500 hover:underline"
            >
              {isZh ? '清除筛选条件' : 'Clear filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
