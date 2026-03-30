'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Globe, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface NavItem {
  label: string;
  labelZh: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Products', labelZh: '产品中心', href: '/products' },
  { label: 'Solutions', labelZh: '解决方案', href: '/solutions' },
  { label: 'Projects', labelZh: '项目案例', href: '/projects' },
  { label: 'About', labelZh: '关于我们', href: '/about' },
  { label: 'Contact', labelZh: '联系我们', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCartStore();
  const { preferences, setTheme, setLanguage } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isZh = preferences.language === 'zh';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-orange-500">
                <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z" fill="currentColor" opacity="0.8"/>
                  <path d="M12 14C9.33 14 4 17 4 21H20C20 17 14.67 14 12 14Z" fill="currentColor" opacity="0.9"/>
                  <path d="M12 14C14.67 14 20 17 20 21H4C4 17 9.33 14 12 14Z" fill="currentColor"/>
                  <circle cx="12" cy="9" r="2" fill="#FFFDF9" opacity="0.6"/>
                </svg>
              </span>
              <span className="text-2xl font-bold text-orange-500">
                {isZh ? '热能科技' : 'HeatTech'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-surface-700 hover:text-orange-500 font-medium transition-colors rounded-lg hover:bg-orange-50"
                >
                  {isZh ? item.labelZh : item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(isZh ? 'en' : 'zh')}
                className="p-2 text-surface-600 hover:text-orange-500 transition-colors flex items-center"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
                <span className="ml-1 text-sm font-medium">{isZh ? 'EN' : '中'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(preferences.theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-surface-600 hover:text-orange-500 transition-colors"
                aria-label="Toggle theme"
              >
                {preferences.theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-surface-600 hover:text-orange-500 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-surface-600 hover:text-orange-500 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="text-xl font-bold text-orange-500"
                  >
                    {isZh ? '热能科技' : 'HeatTech'}
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-surface-600 hover:text-orange-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-lg font-medium text-surface-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      {isZh ? item.labelZh : item.label}
                    </Link>
                  ))}
                </nav>

                <div className="p-4 border-t space-y-2">
                  <Link href="/inquiry" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" className="w-full">
                      {isZh ? '获取报价' : 'Get Quote'}
                    </Button>
                  </Link>
                  <Link href="/products" onClick={() => setMobileOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      {isZh ? '浏览产品' : 'Browse Products'}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
