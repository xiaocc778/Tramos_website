'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Search, Globe, Sun, Moon, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface NavItem {
  label: string;
  labelZh: string;
  href: string;
  children?: {
    label: string;
    labelZh: string;
    href: string;
    description?: string;
  }[];
}

const navItems: NavItem[] = [
  {
    label: 'Products',
    labelZh: '产品中心',
    href: '/products',
    children: [
      { label: 'Gas Water Heaters', labelZh: '燃气热水器', href: '/products?category=gas', description: 'Instant hot water with advanced safety' },
      { label: 'Electric Heaters', labelZh: '电热水器', href: '/products?category=electric', description: 'Compact and efficient' },
      { label: 'Solar Water Heaters', labelZh: '太阳能热水器', href: '/products?category=solar', description: 'Eco-friendly energy saving' },
      { label: 'Heat Pumps', labelZh: '空气能热泵', href: '/products?category=heat-pump', description: 'Smart temperature control' },
      { label: 'Commercial Boilers', labelZh: '商用锅炉', href: '/products?category=boiler', description: 'High capacity solutions' },
    ],
  },
  {
    label: 'Solutions',
    labelZh: '解决方案',
    href: '/solutions',
    children: [
      { label: 'Residential', labelZh: '住宅解决方案', href: '/solutions/residential' },
      { label: 'Commercial', labelZh: '商业解决方案', href: '/solutions/commercial' },
      { label: 'Industrial', labelZh: '工业解决方案', href: '/solutions/industrial' },
      { label: 'B2B Partnership', labelZh: 'B2B合作', href: '/solutions/b2b' },
    ],
  },
  {
    label: 'Projects',
    labelZh: '项目案例',
    href: '/projects',
  },
  {
    label: 'About',
    labelZh: '关于我们',
    href: '/about',
  },
  {
    label: 'Contact',
    labelZh: '联系我们',
    href: '/contact',
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items } = useCartStore();
  const { preferences, isMobileMenuOpen, setMobileMenuOpen, setCartOpen, setSearchOpen, setTheme, setLanguage } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isZh = preferences.language === 'zh';

  const handleDropdownToggle = (href: string) => {
    setActiveDropdown(activeDropdown === href ? null : href);
  };

  return (
    <header
      ref={dropdownRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">
              {isZh ? '热能科技' : 'HeatTech'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <button
                    onClick={() => handleDropdownToggle(item.href)}
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-surface-700 hover:text-primary-600 font-medium transition-colors rounded-lg',
                      activeDropdown === item.href && 'text-primary-600 bg-primary-50'
                    )}
                  >
                    {isZh ? item.labelZh : item.label}
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      activeDropdown === item.href && 'rotate-180'
                    )} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-surface-700 hover:text-primary-600 font-medium transition-colors rounded-lg hover:bg-primary-50"
                  >
                    {isZh ? item.labelZh : item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {(activeDropdown === item.href || activeDropdown === `${item.href}-hover`) && item.children && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setActiveDropdown(`${item.href}-hover`)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-surface-100 overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 hover:bg-primary-50 transition-colors group"
                          >
                            <div className="font-medium text-surface-900 group-hover:text-primary-600 transition-colors">
                              {isZh ? child.labelZh : child.label}
                            </div>
                            {child.description && (
                              <div className="text-sm text-surface-500 mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-surface-600 hover:text-primary-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(isZh ? 'en' : 'zh')}
              className="p-2 text-surface-600 hover:text-primary-600 transition-colors flex items-center"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm font-medium">{isZh ? '中' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(preferences.theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-surface-600 hover:text-primary-600 transition-colors"
              aria-label="Toggle theme"
            >
              {preferences.theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-surface-600 hover:text-primary-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-surface-600 hover:text-primary-600 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setMobileMenuOpen(false)}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ onClose, navItems }: { onClose: () => void; navItems: NavItem[] }) {
  const { preferences } = useUIStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isZh = preferences.language === 'zh';

  const toggleExpand = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto"
    >
      <div className="flex flex-col min-h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" onClick={onClose} className="text-xl font-bold text-primary-600">
            {isZh ? '热能科技' : 'HeatTech'}
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-surface-600 hover:text-primary-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.href)}
                    className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-surface-700 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
                  >
                    <span>{isZh ? item.labelZh : item.label}</span>
                    <ChevronDown className={cn(
                      'w-5 h-5 transition-transform',
                      expandedItems.includes(item.href) && 'rotate-180'
                    )} />
                  </button>
                  <AnimatePresence>
                    {expandedItems.includes(item.href) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className="block px-4 py-2 text-surface-600 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
                            >
                              {isZh ? child.labelZh : child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-lg font-medium text-surface-700 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
                >
                  {isZh ? item.labelZh : item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t space-y-2">
          <Link href="/inquiry" onClick={onClose}>
            <Button variant="primary" className="w-full">
              {isZh ? '获取报价' : 'Get Quote'}
            </Button>
          </Link>
          <Link href="/products" onClick={onClose}>
            <Button variant="secondary" className="w-full">
              {isZh ? '浏览产品' : 'Browse Products'}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
