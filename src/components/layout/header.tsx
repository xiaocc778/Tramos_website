'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Search, Globe, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

const navLinks = [
  { href: '/products', label: 'Products', labelZh: '产品' },
  { href: '/projects', label: 'Projects', labelZh: '项目案例' },
  { href: '/blogs', label: 'Blogs', labelZh: '博客' },
  { href: '/about', label: 'About', labelZh: '关于我们' },
  { href: '/contact', label: 'Contact', labelZh: '联系我们' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCartStore();
  const { preferences, setMobileMenuOpen, setCartOpen, setTheme, setLanguage } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isZh = preferences.language === 'zh';

  return (
    <header
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
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-surface-700 hover:text-primary-600 font-medium transition-colors"
              >
                {isZh ? link.labelZh : link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button
              onClick={() => useUIStore.getState().setSearchOpen(true)}
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
        {useUIStore.getState().isMobileMenuOpen && (
          <MobileMenu
            onClose={() => useUIStore.getState().setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { preferences } = useUIStore();
  const isZh = preferences.language === 'zh';

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-0 bg-white z-50 lg:hidden"
    >
      <div className="flex flex-col h-full">
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
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-4 py-3 text-lg font-medium text-surface-700 hover:text-primary-600 hover:bg-surface-50 rounded-lg transition-colors"
            >
              {isZh ? link.labelZh : link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t space-y-2">
          <Button variant="primary" className="w-full">
            {isZh ? '获取报价' : 'Get Quote'}
          </Button>
          <Button variant="secondary" className="w-full">
            {isZh ? '浏览产品' : 'Browse Products'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
